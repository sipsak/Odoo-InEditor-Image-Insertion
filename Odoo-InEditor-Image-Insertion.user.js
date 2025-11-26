// ==UserScript==
// @name            Odoo In-Editor Image Insertion
// @name:tr         Odoo Editör İçi Görsel Ekleme
// @namespace       https://github.com/sipsak
// @version         1.3
// @description     Allows you to insert the selected product’s image from the list that appears after typing "//" in Odoo editors.
// @description:tr  Odoo'daki editörlerde "//" ifadesini yazdıktan sonra açılan listeden seçilen ürünün görselini eklemenizi sağlar.
// @author          Burak Şipşak
// @match           *://*/*
// @grant           none
// @run-at          document-idle
// @icon            data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNDQuNTIxIDUuNWE0LjQ3NyA0LjQ3NyAwIDAgMSAwIDYuMzMybC0zNC4xOSAzNC4xOUg0VjM5LjY5TDM4LjE5IDUuNWE0LjQ3NyA0LjQ3NyAwIDAgMSA2LjMzMSAwWiIgZmlsbD0iIzJFQkNGQSIvPjxwYXRoIGQ9Ik0xMC45IDE1LjEyMiA0Ljg5OCA5LjEyYTkuMDA0IDkuMDA0IDAgMCAwIDEwLjQ4IDEyLjU2OGwyMy4wMDEgMjNhNC40NzcgNC40NzcgMCAwIDAgNi4zMzEtNi4zM2wtMjMtMjMuMDAxQTkuMDA0IDkuMDA0IDAgMCAwIDkuMTQxIDQuODc3bDYuMDAyIDYuMDAyLTQuMjQzIDQuMjQzWiIgZmlsbD0iIzk4NTE4NCIvPjxwYXRoIGQ9Ik0yNS4wMjMgMTguNjcgMTguNjkgMjVsNi4zMzIgNi4zMzFMMzEuMzUyIDI1bC02LjMzLTYuMzMxWiIgZmlsbD0iIzE0NDQ5NiIvPjwvc3ZnPgo=
// @updateURL       https://raw.githubusercontent.com/sipsak/Odoo-InEditor-Image-Insertion/main/Odoo-InEditor-Image-Insertion.user.js
// @downloadURL     https://raw.githubusercontent.com/sipsak/Odoo-InEditor-Image-Insertion/main/Odoo-InEditor-Image-Insertion.user.js
// ==/UserScript==

(function() {
    'use strict';

    function init() {
        const scriptTag = document.getElementById('web.layout.odooscript');
        if (!scriptTag) {
            return;
        }

        const ODOO_CONFIG = {
            url: window.location.origin,
            csrf_token: null,
            context: {},
            products: []
        };

        let currentItems = [];
        let currentFocusIndex = -1;
        let selectionChangeAttached = false;
        let currentTriggerRange = null;
        let repositionAttached = false;
        let repositionRaf = null;
        let lastPosition = { top: null, left: null };

        function extractCsrfToken() {
            const scriptTag = document.getElementById('web.layout.odooscript');
            if (scriptTag) {
                const m = scriptTag.textContent.match(/csrf_token:\s*"([^"]+)"/);
                return m ? m[1] : null;
            }
            return null;
        }

        async function fetchProducts() {
            if (!ODOO_CONFIG.csrf_token) ODOO_CONFIG.csrf_token = extractCsrfToken();

            try {
                const domain = [['categ_id.id', 'in', [56, 57]], ['image_1920', '!=', false]];
                const turkceContext = { ...ODOO_CONFIG.context, lang: 'tr_TR' };

                const response = await fetch(`${ODOO_CONFIG.url}/web/dataset/call_kw`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': ODOO_CONFIG.csrf_token },
                    body: JSON.stringify({
                        jsonrpc: '2.0',
                        method: 'call',
                        params: {
                            model: 'product.template',
                            method: 'search_read',
                            args: [],
                            kwargs: {
                                domain: domain,
                                fields: ['id', 'display_name', 'default_code'],
                                context: turkceContext
                            }
                        },
                        id: Math.random()
                    })
                });
                const data = await response.json();
                if (data.result) {
                    ODOO_CONFIG.products = data.result.map(p => ({
                        id: p.id,
                        name: p.display_name,
                        code: p.default_code || ''
                    }));
                }
            } catch (e) {}
        }

        function escapeHtml(str) {
            return (str + '').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
        }

        function escapeRegExp(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

        function addListItems(listElement, itemsToRender, query) {
            listElement.innerHTML = '';
            const q = (query || '').toString().trim();
            currentItems = itemsToRender.slice();
            currentFocusIndex = -1;

            itemsToRender.forEach((urun, idx) => {
                const listItem = document.createElement('a');
                listItem.dataset.index = idx;
                listItem.classList.add('dropdown-item');
                listItem.setAttribute('role', 'menuitem');
                listItem.href = 'javascript:void(0)';

                const nameHtml = escapeHtml(urun.name || '');
                const codeHtml = escapeHtml(urun.code || '');

                if (q) {
                    const pattern = escapeRegExp(q);
                    const reGlobal = new RegExp(pattern, 'gi');
                    if (new RegExp(pattern, 'i').test(nameHtml)) {
                        listItem.innerHTML = nameHtml.replace(reGlobal, m => `<b class="text-primary">${m}</b>`);
                    } else {
                        listItem.innerHTML = `${nameHtml} <span style="opacity:.8">(${codeHtml.replace(reGlobal, m=>`<b class="text-primary">${m}</b>`)})</span>`;
                    }
                } else {
                    listItem.textContent = urun.name;
                }

                listItem.addEventListener('mouseenter', () => {
                    removeAllFocus();
                    listItem.classList.add('focus');
                    currentFocusIndex = idx;
                });

                listItem.addEventListener('click', (ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    insertImage(urun);
                });

                listElement.appendChild(listItem);
            });
            updateFocusVisual();
        }

        function removeAllFocus() {
            document.querySelectorAll('#note-item-list .dropdown-item').forEach(item => {
                item.classList.remove('focus');
                item.setAttribute('aria-selected', 'false');
            });
        }

        function updateFocusVisual() {
            const listDiv = document.getElementById('note-item-list');
            if (!listDiv) return;
            const items = Array.from(listDiv.querySelectorAll('.dropdown-item'));
            items.forEach((it, i) => {
                if (i === currentFocusIndex) {
                    it.classList.add('focus');
                    it.setAttribute('aria-selected', 'true');
                    it.scrollIntoView({ block: 'nearest' });
                } else {
                    it.classList.remove('focus');
                }
            });
        }

        function handleKeyNavigation(event) {
            const listDiv = document.getElementById('note-item-list');
            if (!listDiv) return;
            const items = listDiv.querySelectorAll('.dropdown-item');
            if (items.length === 0) return;

            if (event.key === 'ArrowDown') {
                event.preventDefault();
                currentFocusIndex = (currentFocusIndex + 1) % items.length;
                updateFocusVisual();
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                currentFocusIndex = (currentFocusIndex - 1 + items.length) % items.length;
                updateFocusVisual();
            } else if (event.key === 'Enter') {
                event.preventDefault();
                if (currentFocusIndex >= 0 && currentFocusIndex < items.length) {
                    insertImage(currentItems[items[currentFocusIndex].dataset.index]);
                }
            } else if (event.key === 'Escape') {
                event.preventDefault();
                closeListIfAny();
            }
        }

        function filterAndRenderList(queryText) {
            const listDiv = document.getElementById('note-item-list');
            if (!listDiv) return;
            const queryRaw = (queryText || '').trim();
            const qLower = queryRaw.toLowerCase();

            if (ODOO_CONFIG.products.length === 0) fetchProducts();

            const filtered = queryRaw
                ? ODOO_CONFIG.products.filter(u => (u.name && u.name.toLowerCase().includes(qLower)) || (u.code && u.code.toLowerCase().includes(qLower)))
                : ODOO_CONFIG.products.slice();
            addListItems(listDiv, filtered, queryRaw);
        }

        function getQueryFromSelection(range) {
            const editor = document.querySelector('.odoo-editor-editable');
            if (!editor || !range || !range.collapsed) return null;
            try {
                const startNode = range.startContainer;
                const text = startNode.textContent.slice(0, range.startOffset);
                const m = text.match(/\/\/([^\s]*)$/);
                return m ? m[1] : null;
            } catch (e) { return null; }
        }

        function insertImage(urun) {
            const editor = document.querySelector('.odoo-editor-editable');
            if (!editor) return;

            const selection = window.getSelection();
            if (!selection.rangeCount) return;
            const range = selection.getRangeAt(0);
            const startNode = range.startContainer;
            const text = startNode.textContent;
            const match = text.slice(0, range.startOffset).match(/\/\/([^\s]*)$/);

            if (match) {
                const matchLength = match[0].length;
                const newRange = document.createRange();
                newRange.setStart(startNode, range.startOffset - matchLength);
                newRange.setEnd(startNode, range.startOffset);
                newRange.deleteContents();
            }

            const imageUrl = `${ODOO_CONFIG.url}/web/image?model=product.template&id=${urun.id}&field=image_1920`;
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = urun.name;
            img.style.maxWidth = '100%';
            img.style.height = 'auto';

            const sel = window.getSelection();
            if (sel.rangeCount) {
                const insertRange = sel.getRangeAt(0);
                insertRange.insertNode(img);
                insertRange.collapse(false);
            }

            closeListIfAny();
        }

        function getRectForRange(range) {
            try {
                const rect = range.getBoundingClientRect();
                if (rect && (rect.width || rect.height || rect.top || rect.left)) return rect;
            } catch (e) {}

            const span = document.createElement('span');
            span.textContent = '\u200b';
            range.insertNode(span);
            const rect = span.getBoundingClientRect();
            span.remove();
            return rect;
        }

        function repositionList() {
            const listDiv = document.getElementById('note-item-list');
            if (!listDiv || !currentTriggerRange) return;
            const rect = getRectForRange(currentTriggerRange);
            if (!rect) { closeListIfAny(); return; }
            listDiv.style.top = `${Math.round(rect.bottom + 5)}px`;
            listDiv.style.left = `${Math.round(rect.left)}px`;
        }

        function rAFLoop() {
            if (!repositionAttached) return;
            if (!repositionRaf) {
                repositionRaf = requestAnimationFrame(() => {
                    repositionRaf = null;
                    repositionList();
                    if (repositionAttached) rAFLoop();
                });
            }
        }

        function createList(positionRect, query, triggerRange) {
            closeListIfAny();
            const listDiv = document.createElement('div');
            listDiv.id = 'note-item-list';
            listDiv.className = 'o-dropdown--menu dropdown-menu d-block';
            listDiv.style.cssText = `position:fixed; top:${Math.round(positionRect.bottom + 5)}px; left:${Math.round(positionRect.left)}px; max-height:256px; overflow-y:auto; z-index:10000; min-width:240px;`;

            if (!document.getElementById('note-item-list-style')) {
                const style = document.createElement('style');
                style.id = 'note-item-list-style';
                style.textContent = `#note-item-list .dropdown-item { color: inherit !important; }`;
                document.head.appendChild(style);
            }

            document.body.appendChild(listDiv);

            setTimeout(() => {
                const clickHandler = (ev) => {
                    if (!listDiv.contains(ev.target)) {
                        closeListIfAny();
                        document.removeEventListener('click', clickHandler);
                    }
                };
                document.addEventListener('click', clickHandler);
            }, 50);

            filterAndRenderList(query);

            if (triggerRange) {
                try { currentTriggerRange = triggerRange.cloneRange(); } catch(e){ currentTriggerRange = triggerRange; }
                repositionAttached = true;
                rAFLoop();
                window.addEventListener('resize', repositionList);
            }
        }

        function closeListIfAny() {
            const el = document.getElementById('note-item-list');
            if (el) el.remove();
            repositionAttached = false;
            if (repositionRaf) { cancelAnimationFrame(repositionRaf); repositionRaf = null; }
            window.removeEventListener('resize', repositionList);
        }

        function updateListFromSelection(noteElement) {
            const sel = window.getSelection();
            if (!sel || !sel.rangeCount || !sel.getRangeAt(0).collapsed) {
                closeListIfAny();
                return;
            }

            const range = sel.getRangeAt(0);
            const query = getQueryFromSelection(range);

            if (query !== null) {
                const rect = getRectForRange(range);
                if (!rect) return;

                let listDiv = document.getElementById('note-item-list');
                if (!listDiv) {
                    createList(rect, query, range);
                } else {
                    try { currentTriggerRange = range.cloneRange(); } catch(e){}
                    listDiv.style.top = `${Math.round(rect.bottom + 5)}px`;
                    listDiv.style.left = `${Math.round(rect.left)}px`;
                    filterAndRenderList(query);
                }
            } else {
                closeListIfAny();
            }
        }

        function initScriptForEditor(noteElement) {
            if (!noteElement || noteElement.dataset.imgScriptInit) return;
            noteElement.dataset.imgScriptInit = 'true';
            noteElement.addEventListener('input', () => updateListFromSelection(noteElement));
            noteElement.addEventListener('keydown', (e) => {
                 if (e.key === 'Backspace' || e.key === 'Delete') setTimeout(() => updateListFromSelection(noteElement), 0);
            });
        }

        document.addEventListener('keydown', (event) => {
            if (document.getElementById('note-item-list') && ['ArrowUp', 'ArrowDown', 'Enter', 'Escape'].includes(event.key)) {
                handleKeyNavigation(event);
            }
        }, true);

        document.addEventListener('selectionchange', () => {
            const sel = window.getSelection();
            const node = sel ? sel.anchorNode : null;
            const editor = node && node.nodeType === 3 ? node.parentElement.closest('.odoo-editor-editable') : (node ? node.closest('.odoo-editor-editable') : null);

            if (editor && editor.dataset.imgScriptInit) setTimeout(() => updateListFromSelection(editor), 0);
            else closeListIfAny();
        });

        const observer = new MutationObserver(() => {
            const el = document.querySelector('.odoo-editor-editable');
            if (el) initScriptForEditor(el);
        });
        observer.observe(document.body, { childList: true, subtree: true });

        fetchProducts();
    }

    init();
})();
