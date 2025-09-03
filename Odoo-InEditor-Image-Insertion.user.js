// ==UserScript==
// @name            Odoo In-Editor Image Insertion
// @name:tr         Odoo Editör İçi Görsel Ekleme
// @namespace       https://github.com/sipsak
// @version         1.1
// @description     Allows you to insert the selected product’s image from the list that appears after typing "//" in Odoo editors.
// @description:tr  Odoo'daki editörlerde "//" ifadesini yazdıktan sonra açılan listeden seçilen ürünün görselini eklemenizi sağlar.
// @author          Burak Şipşak
// @match           https://portal.bskhvac.com.tr/*
// @match           https://*.odoo.com/*
// @grant           none
// @run-at          document-idle
// @icon            data:image/png;base64,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
// @updateURL       https://raw.githubusercontent.com/sipsak/Odoo-InEditor-Image-Insertion/main/Odoo-InEditor-Image-Insertion.user.js
// @downloadURL     https://raw.githubusercontent.com/sipsak/Odoo-InEditor-Image-Insertion/main/Odoo-InEditor-Image-Insertion.user.js
// ==/UserScript==

(function() {
    'use strict';

    const urunListesi = [
        { code: "2000277", name: "ALM. PROFİL / 100LÜK HAVADAMPERKANADI (55034/9617)" },
        { code: "2000141", name: "ALM. PROFİL / 11,5 YER KONVEKTÖRÜ KASA (55806-AN)" },
        { code: "2000142", name: "ALM. PROFİL / 125 LİK HAVA DAMPER KANADI (55628)" },
        { code: "2000144", name: "ALM. PROFİL / 150 LİK HAVA DAMPER KANADI (M5980)" },
        { code: "2000145", name: "ALM. PROFİL / 17mm LİNEER KASA (55843)" },
        { code: "2000139", name: "ALM. PROFİL / 20mm YER LİNEER KANAT (4300/55728/10526)" },
        { code: "2000138", name: "ALM. PROFİL / 20mm YER LİNEER KANAT (4300/55728/10526-EL)" },
        { code: "2000152", name: "ALM. PROFİL / 22mm LM KASASI (55776/5477)" },
        { code: "2000153", name: "ALM. PROFİL / 22mm LM KASASI (55776/5477-EL)" },
        { code: "2000154", name: "ALM. PROFİL / 22mm ÇSK MENFEZ KASASI (55733)" },
        { code: "2000161", name: "ALM. PROFİL / 28 KARE PETEK MENFEZ KASASI (55802)" },
        { code: "2000164", name: "ALM. PROFİL / 28mm LM KASASI (55803)" },
        { code: "2000165", name: "ALM. PROFİL / 28mm LM KASASI (55803-EL)" },
        { code: "2000140", name: "ALM. PROFİL / 28mm TSK MENFEZ KASASI (4201/55791)" },
        { code: "2000166", name: "ALM. PROFİL / 28mm TSK MENFEZ KASASI (4201/55791-EL)" },
        { code: "2000162", name: "ALM. PROFİL / 28mm ÇSK MENFEZ KASA (4419/55826)" },
        { code: "2000163", name: "ALM. PROFİL / 28mm ÇSK MENFEZ KASA (4419/55826-EL)" },
        { code: "2000167", name: "ALM. PROFİL / 30mm YER LİNEER KANAT (4299/55729)" },
        { code: "2000168", name: "ALM. PROFİL / 30mm YER LİNEER KANAT (4299/55729-EL)" },
        { code: "2000169", name: "ALM. PROFİL / 30mm YER LİNEER KASA (4297/55727)" },
        { code: "2000170", name: "ALM. PROFİL / 30mm YER LİNEER KASA (4297/55727-EL)" },
        { code: "2000176", name: "ALM. PROFİL / 32 LİNEER MENFEZ KASASI (2777/55715)" },
        { code: "2000177", name: "ALM. PROFİL / 32 LİNEER MENFEZ KASASI (2777/55715-EL)" },
        { code: "2000179", name: "ALM. PROFİL / 32mm KARE PETEK MENEZ KASASI (55755)" },
        { code: "2000279", name: "ALM. PROFİL / 32mm TEKSIRA KANATLI MENFEZ (2778/55704)" },
        { code: "2000180", name: "ALM. PROFİL / 32mm TEKSIRA KANATLI MENFEZ (2778/55704-EL)" },
        { code: "2000182", name: "ALM. PROFİL / 32mm TEKTIRNAK KPM CUP-İN KASA (55842)" },
        { code: "2000175", name: "ALM. PROFİL / 32mm ÇİFT SIRA KANATLI MENFEZ (2779/55707)" },
        { code: "2000178", name: "ALM. PROFİL / 32mm ÇİFT SIRA KANATLI MENFEZ (2779/55707-EL)" },
        { code: "2000181", name: "ALM. PROFİL / 32mm ÇIFTTIRNAK KPM CUP-İN KASA (55703)" },
        { code: "2000184", name: "ALM. PROFİL / 40mm YER LİNEER KASA (4298/55726)" },
        { code: "2004525", name: "ALM. PROFİL / 40mm YER LİNEER KASA (4298/55726-EL)" },
        { code: "2000280", name: "ALM. PROFİL / 45GENİŞKASA PANJUR KANADI (563/55694)" },
        { code: "2000281", name: "ALM. PROFİL / 45GENİŞKASA PANJURKANADI (563/55694-EL)" },
        { code: "2000194", name: "ALM. PROFİL / 8,5 YER KONVEKTÖRÜ KASA (55807-AN)" },
        { code: "2000201", name: "ALM. PROFİL / DRUM DİFÜZÖR DIŞ KASASI (55656)" },
        { code: "2000206", name: "ALM. PROFİL / EĞRİSEL PANJUR KANADI (580/55775)" },
        { code: "2000207", name: "ALM. PROFİL / EĞRİSEL PANJUR KANADI (580/55775-EL)" },
        { code: "2000209", name: "ALM. PROFİL / GENİŞ KANAT PANJUR KASASI (55708)" },
        { code: "2000210", name: "ALM. PROFİL / GENİŞ KANAT PANJUR KASASI (55708-EL)" },
        { code: "2000213", name: "ALM. PROFİL / HAVA APAREY KANADI (15-3577)" },
        { code: "2000285", name: "ALM. PROFİL / HAVA DAMPER VİDA YUV.KASA (540/55080)" },
        { code: "2000214", name: "ALM. PROFİL / HAVA DAMPERİ DÜZ KASA (539/21012/9226)" },
        { code: "2000215", name: "ALM. PROFİL / HEPA FİLTRE KASA (55739)" },
        { code: "2000218", name: "ALM. PROFİL / KAPI T. MENFEZ KANADI (55438)" },
        { code: "2000219", name: "ALM. PROFİL / KAPI T. MENFEZ KANADI (55438-EL)" },
        { code: "2000220", name: "ALM. PROFİL / KARE PETEK VİDA YUVALI KASA (55756)" },
        { code: "2000221", name: "ALM. PROFİL / KARE PETEK VİDA YUVALI KASA (55756-EL)" },
        { code: "2000225", name: "ALM. PROFİL / KTA CUP-İN KASA (4036/55713)" },
        { code: "2000226", name: "ALM. PROFİL / KTA DIŞ KASA (2776/55725)" },
        { code: "2000229", name: "ALM. PROFİL / KTA İÇ KASA (4200/55732)" },
        { code: "2000230", name: "ALM. PROFİL / KTM KASASI (55808)" },
        { code: "2000231", name: "ALM. PROFİL / KTM KASASI (55808-EL)" },
        { code: "2000222", name: "ALM. PROFİL / KÖR KASALI KTA KASASI (55500)" },
        { code: "2000235", name: "ALM. PROFİL / LM MÜDAHALE KAPAĞI VİDA YUVALI (55812)" },
        { code: "2000236", name: "ALM. PROFİL / LM1 KANADI (2955/55695)" },
        { code: "2000237", name: "ALM. PROFİL / LM1 KANADI (2955/55695-EL)" },
        { code: "2000238", name: "ALM. PROFİL / LM3 KANADI (55338)" },
        { code: "2000239", name: "ALM. PROFİL / LM3 KANADI (55338-EL)" },
        { code: "2000240", name: "ALM. PROFİL / MAKARALI SLOT ARA PARÇASI (55529)" },
        { code: "2000242", name: "ALM. PROFİL / MAKARALI SLOT DIŞ KASASI (55762)" },
        { code: "2000243", name: "ALM. PROFİL / MAKARALI SLOT İÇ KASASI (55761)" },
        { code: "2000286", name: "ALM. PROFİL / PARALEL KANAT DAMPER KANADI (510/55811/9119)" },
        { code: "2000287", name: "ALM. PROFİL / PARALEL KANAT DAMPER KASASI (548/55709/9177)" },
        { code: "2000292", name: "ALM. PROFİL / PARALELKANAT DAMPERKANADI (510/55811-EL)" },
        { code: "2000246", name: "ALM. PROFİL / Q4*14,27 MENFEZ KANADI (512/55001/9174)" },
        { code: "2000247", name: "ALM. PROFİL / Q4*14,27 MENFEZ KANADI (512/55001/9174-EL)" },
        { code: "2000248", name: "ALM. PROFİL / Q6*Q7,7 ANEMOSTAD BORUSU (35014)" },
        { code: "2000249", name: "ALM. PROFİL / Q7*Q5 LİNEER BORUSU (35027)" },
        { code: "2000251", name: "ALM. PROFİL / Q8*10 LİNEER DIŞ BORUSU (35028/1726-AN)" },
        { code: "2000250", name: "ALM. PROFİL / Q8*10 LİNEER DIŞ KASASI (35028/1726-EL)" },
        { code: "2000253", name: "ALM. PROFİL / SARKMA KTA DIŞ KASASI (55716)" },
        { code: "2000288", name: "ALM. PROFİL / SIZDIRMAZ H. DAMPERİ DÜZKASA (55885)" },
        { code: "2000293", name: "ALM. PROFİL / SIZDIRMAZ H.DAMP.VİDAYUV.KASA (55884)" },
        { code: "2000256", name: "ALM. PROFİL / SIZDIRMAZ H.DAMPERİ ARAKAYIT (55886)" },
        { code: "2000258", name: "ALM. PROFİL / SLOT DAMPER DIŞ KASA (2773/55710)" },
        { code: "2000259", name: "ALM. PROFİL / SLOT DAMPER DIŞ KASA (2773/55710-AN)" },
        { code: "2000260", name: "ALM. PROFİL / SLOT DAMPER İÇ KASA (2900/55711)" },
        { code: "2000261", name: "ALM. PROFİL / SLOT DİFÜZÖR BAŞLIĞI (55795)" },
        { code: "2000263", name: "ALM. PROFİL / SLOT DİFÜZÖR DIŞ KASA (2775/55700)" },
        { code: "2000264", name: "ALM. PROFİL / SLOT DİFÜZÖR DIŞ KASA (2775/55700-EL)" },
        { code: "2000268", name: "ALM. PROFİL / SLOT DİFÜZÖR KANAT (545/55699)" },
        { code: "2000269", name: "ALM. PROFİL / SLOT DİFÜZÖR KANAT (545/55699-AN)" },
        { code: "2000266", name: "ALM. PROFİL / SLOT DİFÜZÖR İÇ KASA (2774/55712)" },
        { code: "2000267", name: "ALM. PROFİL / SLOT DİFİZÖR İÇ KASA (2774/55712-EL)" },
        { code: "2000271", name: "ALM. PROFİL / SWIRL DİFÜZÖR ORTA ÇITASI (25027)" },
        { code: "2000273", name: "ALM. PROFİL / TSK YUVARLAK (55821)" },
        { code: "2000274", name: "ALM. PROFİL / YER KONVEK. LİNEER DIŞ KASA (55805-EL)" },
        { code: "2000275", name: "ALM. PROFİL / ZIT KANAT DAMPER KANADI (55751)" },
        { code: "2000276", name: "ALM. PROFİL / ZIT KANAT DAMPER KASASI (55752)" },
        { code: "2000200", name: "ALM. PROFİL / ÇSK YUVARLAK (55820)" }
    ];

    let currentItems = [];
    let currentFocusIndex = -1;

    function escapeHtml(str) {
        return (str + '').replace(/[&<>"']/g, function(s) {
            return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]);
        });
    }

    function escapeRegExp(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

    function addListItems(listElement, itemsToRender, query) {
        listElement.innerHTML = '';
        const q = (query || '').toString().trim();
        currentItems = itemsToRender.slice();
        currentFocusIndex = -1;

        itemsToRender.forEach((urun, idx) => {
            const listItem = document.createElement('a');
            listItem.dataset.code = urun.code;
            listItem.dataset.index = idx;
            listItem.classList.add('dropdown-item');
            listItem.setAttribute('role', 'menuitem');
            listItem.setAttribute('tabindex', '-1');
            listItem.href = 'javascript:void(0)';

            const nameHtml = escapeHtml(urun.name || '');
            const codeHtml = escapeHtml(urun.code || '');

            if (q) {
                const pattern = escapeRegExp(q);
                const reInsensitive = new RegExp(pattern, 'i');
                const reGlobal = new RegExp(pattern, 'gi');
                if (reInsensitive.test(nameHtml)) {
                    listItem.innerHTML = nameHtml.replace(reGlobal, (m) => `<b class="text-primary">${m}</b>`);
                } else if (reInsensitive.test(codeHtml)) {
                    listItem.innerHTML = `${nameHtml} <span style="opacity:.8">(${codeHtml.replace(reGlobal, (m)=>`<b class="text-primary">${m}</b>`)})</span>`;
                } else {
                    listItem.textContent = urun.name;
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
        const items = document.querySelectorAll('#note-item-list .dropdown-item');
        items.forEach(item => {
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
                it.setAttribute('aria-selected', 'false');
            }
        });
    }

    function handleKeyNavigation(event) {
        const listDiv = document.getElementById('note-item-list');
        if (!listDiv) return;
        const items = listDiv.querySelectorAll('.dropdown-item');
        if (items.length === 0) return;

        const key = event.key;
        if (key === 'ArrowDown') {
            event.preventDefault();
            currentFocusIndex = (currentFocusIndex + 1) % items.length;
            updateFocusVisual();
        } else if (key === 'ArrowUp') {
            event.preventDefault();
            currentFocusIndex = (currentFocusIndex - 1 + items.length) % items.length;
            updateFocusVisual();
        } else if (key === 'Enter') {
            event.preventDefault();
            if (currentFocusIndex >= 0 && currentFocusIndex < items.length) {
                const selectedItem = items[currentFocusIndex];
                const idx = Number(selectedItem.dataset.index);
                const urun = currentItems[idx];
                if (urun) insertImage(urun);
            }
        } else if (key === 'Escape') {
            event.preventDefault();
            closeListIfAny();
        }
    }

    function filterAndRenderList(queryText) {
        const listDiv = document.getElementById('note-item-list');
        if (!listDiv) return;
        const queryRaw = (queryText || '').trim();
        const qLower = queryRaw.toLowerCase();
        const filtered = queryRaw
            ? urunListesi.filter(u => (u.name && u.name.toLowerCase().includes(qLower)))
            : urunListesi.slice();
        addListItems(listDiv, filtered, queryRaw);
    }

    function getQueryFromSelection(range) {
        const editor = document.querySelector('.odoo-editor-editable');
        if (!editor || !range) return null;
        try {
            const temp = document.createRange();
            temp.setStart(editor, 0);
            temp.setEnd(range.startContainer, range.startOffset);
            const preceding = temp.toString();
            const idx = preceding.lastIndexOf('//');
            if (idx === -1) return null;
            return preceding.substring(idx + 2);
        } catch (e) {
            return null;
        }
    }

    function insertImage(urun) {
        const editor = document.querySelector('.odoo-editor-editable');
        if (!editor) return;

        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;
        const range = selection.getRangeAt(0);

        const preRange = document.createRange();
        preRange.setStart(editor, 0);
        preRange.setEnd(range.startContainer, range.startOffset);
        const precedingText = preRange.toString();
        const idx = precedingText.lastIndexOf('//');

        let startNode = null, startOffset = 0;
        if (idx !== -1) {
            const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, null, false);
            let accum = 0;
            let node;
            while ((node = walker.nextNode())) {
                const ln = node.textContent.length;
                if (accum + ln > idx) {
                    startNode = node;
                    startOffset = idx - accum;
                    break;
                }
                accum += ln;
            }
        }

        const delRange = document.createRange();
        try {
            if (startNode) {
                delRange.setStart(startNode, startOffset);
            } else {
                const sc = range.startContainer;
                const offs = Math.max(0, range.startOffset - 2);
                delRange.setStart(sc, offs);
            }
            delRange.setEnd(range.startContainer, range.startOffset);
            delRange.deleteContents();
        } catch (e) {
            console.warn('deleteRange failed', e);
        }

        const code = urun.code;
        const imageUrl = `https://bskhvac.com.tr/product_images/${code}.jpg`;
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = urun.name || code;
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        img.dataset.insertedBy = 'odoo-note-list-script';

        const sel = window.getSelection();
        if (!sel.rangeCount) return;
        const insertRange = sel.getRangeAt(0);
        insertRange.collapse(true);
        insertRange.insertNode(img);

        const newRange = document.createRange();
        newRange.setStartAfter(img);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);

        closeListIfAny();
    }

    function createList(positionRect, noteElement, initialQuery) {
        closeListIfAny();

        const parentContainer = noteElement.closest('.o_field_html') || document.body;
        const listDiv = document.createElement('div');
        listDiv.id = 'note-item-list';
        listDiv.setAttribute('role', 'menu');
        listDiv.classList.add('o-dropdown--menu', 'dropdown-menu', 'd-block');

        if (parentContainer !== document.body) {
            const parentRect = parentContainer.getBoundingClientRect();
            const topPos = (positionRect.bottom - parentRect.top) + 5;
            const leftPos = (positionRect.left - parentRect.left);
            listDiv.style.position = 'absolute';
            listDiv.style.top = `${topPos}px`;
            listDiv.style.left = `${leftPos}px`;
        } else {
            listDiv.style.position = 'fixed';
            listDiv.style.top = `${positionRect.bottom + 5}px`;
            listDiv.style.left = `${positionRect.left}px`;
        }

        listDiv.style.maxHeight = '256px';
        listDiv.style.overflowY = 'auto';
        listDiv.style.zIndex = 10000;
        listDiv.style.minWidth = '240px';

        if (!document.getElementById('note-item-list-style')) {
            const style = document.createElement('style');
            style.id = 'note-item-list-style';
            style.textContent = `#note-item-list .dropdown-item { color: inherit !important; }`;
            document.head.appendChild(style);
        }

        parentContainer.appendChild(listDiv);

        setTimeout(() => {
            function onDocClick(ev) {
                if (!listDiv.contains(ev.target) && !noteElement.contains(ev.target)) {
                    closeListIfAny();
                    document.removeEventListener('click', onDocClick);
                }
            }
            document.addEventListener('click', onDocClick);
        }, 50);

        const initialQueryTrimmed = (initialQuery || '').trim();
        const initial = initialQueryTrimmed
            ? urunListesi.filter(u => (u.name && u.name.toLowerCase().includes(initialQueryTrimmed.toLowerCase())))
            : urunListesi.slice();
        addListItems(listDiv, initial, initialQueryTrimmed);

        return listDiv;
    }

    function closeListIfAny() {
        const existing = document.getElementById('note-item-list');
        if (existing) existing.remove();
    }

    function updateListFromSelection(noteElement) {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) {
            closeListIfAny();
            return;
        }
        const range = sel.getRangeAt(0);
        const query = getQueryFromSelection(range);
        if (query !== null) {
            const rect = range.getBoundingClientRect();
            let listDiv = document.getElementById('note-item-list');
            if (!listDiv) {
                listDiv = createList(rect, noteElement, query);
            }
            filterAndRenderList(query);
        } else {
            closeListIfAny();
        }
    }

    function initScriptForEditor(noteElement) {
        if (!noteElement || noteElement.dataset.scriptInitialized) return;
        noteElement.dataset.scriptInitialized = 'true';

        noteElement.addEventListener('input', () => {
            updateListFromSelection(noteElement);
        });

        noteElement.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' || e.key === 'Delete') {
                setTimeout(() => updateListFromSelection(noteElement), 0);
            }
        });

        document.addEventListener('keydown', (event) => {
            const listDiv = document.getElementById('note-item-list');
            if (listDiv && ['ArrowUp', 'ArrowDown', 'Enter', 'Escape'].includes(event.key)) {
                handleKeyNavigation(event);
            }
        }, true);
    }

    const observer = new MutationObserver(() => {
        const noteElement = document.querySelector('.odoo-editor-editable');
        if (noteElement) initScriptForEditor(noteElement);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const initialEditor = document.querySelector('.odoo-editor-editable');
    if (initialEditor) initScriptForEditor(initialEditor);

})();
