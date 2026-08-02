(function() {
    'use strict';

    // ============================================================
    // DOM 引用
    // ============================================================
    const timeEl = document.getElementById('time');
    const dateEl = document.getElementById('date');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const engineTrigger = document.getElementById('engineTrigger');
    const currentEngineLabel = document.getElementById('currentEngineLabel');
    const popup = document.getElementById('enginePopup');
    const overlay = document.getElementById('popupOverlay');
    const engineItems = popup.querySelectorAll('.engine-item');
    const historyDropdown = document.getElementById('historyDropdown');
    const shortcutsGrid = document.getElementById('shortcutsGrid');

    const modal = document.getElementById('shortcutModal');
    const nameInput = document.getElementById('shortcutNameInput');
    const urlInput = document.getElementById('shortcutUrlInput');
    const cancelBtn = document.getElementById('shortcutCancelBtn');
    const saveBtn = document.getElementById('shortcutSaveBtn');

    const bgLayer = document.getElementById('bgLayer');
    const bgToggleBtn = document.getElementById('bgToggleBtn');
    const bgModal = document.getElementById('bgModal');
    const bgUploadBtn = document.getElementById('bgUploadBtn');
    const bgResetBtn = document.getElementById('bgResetBtn');
    const bgModalCloseBtn = document.getElementById('bgModalCloseBtn');
    const bgFileInput = document.getElementById('bgFileInput');

    const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];
    const BG_STORAGE_KEY = 'customBackground';

    // ============================================================
    // 时钟
    // ============================================================
    function pad(n) { return String(n).padStart(2, '0'); }

    function updateClock() {
        const now = new Date();
        const h = now.getHours(),
            m = now.getMinutes(),
            s = now.getSeconds();
        timeEl.textContent = pad(h) + ':' + pad(m) + ':' + pad(s);
        const year = now.getFullYear(),
            month = now.getMonth() + 1,
            day = now.getDate(),
            wd = WEEKDAYS[now.getDay()];
        dateEl.textContent = year + '年' + month + '月' + day + '日 星期' + wd;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // ============================================================
    // 搜索引擎
    // ============================================================
    const ENGINES = {
        bing: {
            url: 'https://www.bing.com/search',
            param: 'q',
            placeholder: '在 Bing 中搜索…',
            label: '✦ &nbsp;Bing'
        },
        baidu: {
            url: 'https://www.baidu.com/s',
            param: 'wd',
            placeholder: '在 百度 中搜索…',
            label: '✦ &nbsp;百度'
        },
        yandex: {
            url: 'https://yandex.com/search/',
            param: 'text',
            placeholder: '在 Yandex 中搜索…',
            label: '✦ &nbsp;Yandex'
        },
        google: {
            url: 'https://www.google.com/search',
            param: 'q',
            placeholder: '在 Google 中搜索…',
            label: '✦ &nbsp;Google'
        }
    };

    let currentEngine = 'bing';

    function setEngine(engineKey) {
        if (!ENGINES[engineKey]) return;
        const config = ENGINES[engineKey];
        currentEngine = engineKey;
        searchForm.action = config.url;
        searchInput.name = config.param;
        searchInput.placeholder = config.placeholder;
        currentEngineLabel.innerHTML = config.label;
        engineItems.forEach(item => {
            const key = item.dataset.engine;
            if (key === engineKey) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        closePopup();
        searchInput.style.transition = 'box-shadow 0.25s ease';
        searchInput.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.25)';
        setTimeout(() => { searchInput.style.boxShadow = 'none'; }, 400);
        try {
            localStorage.setItem('preferredEngine', engineKey);
        } catch (_) {}
    }

    function openPopup() {
        popup.classList.add('show');
        overlay.classList.add('show');
        engineTrigger.classList.add('active');
    }

    function closePopup() {
        popup.classList.remove('show');
        overlay.classList.remove('show');
        engineTrigger.classList.remove('active');
    }

    function togglePopup() {
        if (popup.classList.contains('show')) {
            closePopup();
        } else {
            openPopup();
        }
    }

    engineTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        togglePopup();
    });
    overlay.addEventListener('click', closePopup);
    engineItems.forEach(item => {
        item.addEventListener('click', function() {
            const key = this.dataset.engine;
            if (key) setEngine(key);
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (popup.classList.contains('show')) closePopup();
            if (historyDropdown.classList.contains('show')) hideHistory();
            if (modal.classList.contains('show')) closeModal();
            if (bgModal.classList.contains('show')) closeBgModal();
        }
    });

    // ============================================================
    // 搜索历史
    // ============================================================
    const STORAGE_KEY = 'searchHistory';
    const MAX_HISTORY = 30;

    function getHistory() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (_) { return []; }
    }

    function saveHistory(history) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        } catch (_) {}
    }

    function addHistoryItem(query) {
        query = query.trim();
        if (!query) return;
        let history = getHistory();
        history = history.filter(item => item !== query);
        history.unshift(query);
        if (history.length > MAX_HISTORY) {
            history = history.slice(0, MAX_HISTORY);
        }
        saveHistory(history);
        renderHistory();
    }

    function deleteHistoryItem(query) {
        let history = getHistory();
        history = history.filter(item => item !== query);
        saveHistory(history);
        renderHistory();
    }

    function clearAllHistory() {
        saveHistory([]);
        renderHistory();
        hideHistory();
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function renderHistory() {
        const history = getHistory();
        if (history.length === 0) {
            historyDropdown.innerHTML = `<div class="history-empty">暂无搜索历史</div>`;
            return;
        }
        let html = '';
        history.forEach(item => {
            html += `
                <div class="history-item">
                    <span class="history-text">${escapeHtml(item)}</span>
                    <button class="history-delete" aria-label="删除">✕</button>
                </div>
            `;
        });
        html += `
            <div class="history-actions">
                <button class="history-clear-btn" id="clearHistoryBtn">清空全部</button>
            </div>
        `;
        historyDropdown.innerHTML = html;

        historyDropdown.querySelectorAll('.history-item').forEach(itemEl => {
            const textSpan = itemEl.querySelector('.history-text');
            itemEl.addEventListener('click', function(e) {
                if (e.target.classList.contains('history-delete')) return;
                const query = textSpan.textContent;
                if (query) {
                    searchInput.value = query;
                    searchForm.submit();
                    hideHistory();
                }
            });
            const delBtn = itemEl.querySelector('.history-delete');
            if (delBtn) {
                delBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const query = textSpan.textContent;
                    if (query) deleteHistoryItem(query);
                });
            }
        });

        const clearBtn = document.getElementById('clearHistoryBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                clearAllHistory();
            });
        }
    }

    let hideTimeout = null;

    function showHistory() {
        renderHistory();
        historyDropdown.classList.add('show');
    }

    function hideHistory() {
        if (hideTimeout) clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            historyDropdown.classList.remove('show');
        }, 150);
    }

    searchInput.addEventListener('focus', function() {
        if (hideTimeout) clearTimeout(hideTimeout);
        showHistory();
    });

    document.addEventListener('click', function(e) {
        const isSearchSection = searchInput.closest('.search-section')?.contains(e.target);
        const isDropdown = historyDropdown.contains(e.target);
        if (!isSearchSection && !isDropdown) {
            hideHistory();
        }
    });

    searchForm.addEventListener('submit', function(e) {
        const val = searchInput.value.trim();
        if (val === '') {
            e.preventDefault();
            searchInput.style.transition = 'box-shadow 0.2s ease';
            searchInput.style.boxShadow = '0 0 0 3px rgba(255, 100, 100, 0.2)';
            setTimeout(() => { searchInput.style.boxShadow = 'none'; }, 600);
            return;
        }
        addHistoryItem(val);
        hideHistory();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            searchInput.value = '';
            searchInput.blur();
            hideHistory();
        }
    });

    // ============================================================
    // 快捷链接
    // ============================================================
    const SHORTCUTS_KEY = 'shortcuts';

    function getShortcuts() {
        try {
            const data = localStorage.getItem(SHORTCUTS_KEY);
            return data ? JSON.parse(data) : [];
        } catch (_) { return []; }
    }

    function saveShortcuts(list) {
        try {
            localStorage.setItem(SHORTCUTS_KEY, JSON.stringify(list));
        } catch (_) {}
    }

    function getFavicon(url) {
        try {
            const u = new URL(url);
            return `https://${u.hostname}/favicon.ico`;
        } catch (_) {
            return '';
        }
    }

    function createShortcutIcon(url, name) {
        const container = document.createElement('div');
        container.style.cssText = 'position:relative;display:flex;align-items:center;justify-content:center;';

        const img = document.createElement('img');
        img.className = 'shortcut-icon';
        img.src = getFavicon(url);
        img.alt = name;
        img.loading = 'lazy';

        const fallback = document.createElement('span');
        fallback.className = 'shortcut-fallback';
        fallback.textContent = name.charAt(0).toUpperCase();
        fallback.style.display = 'none';

        img.onerror = function() {
            this.style.display = 'none';
            fallback.style.display = 'flex';
        };

        container.appendChild(img);
        container.appendChild(fallback);
        return container;
    }

    function renderShortcuts() {
        const list = getShortcuts();
        shortcutsGrid.innerHTML = '';

        list.forEach((item, index) => {
            const a = document.createElement('a');
            a.href = item.url;
            a.target = '_blank';
            a.className = 'shortcut-item';
            a.dataset.index = index;

            const iconContainer = createShortcutIcon(item.url, item.name);
            a.appendChild(iconContainer);

            const nameSpan = document.createElement('span');
            nameSpan.className = 'shortcut-name';
            nameSpan.textContent = item.name;
            a.appendChild(nameSpan);

            const del = document.createElement('span');
            del.className = 'shortcut-delete';
            del.dataset.index = index;
            del.textContent = '✕';
            a.appendChild(del);

            shortcutsGrid.appendChild(a);
        });

        const addBtn = document.createElement('div');
        addBtn.className = 'shortcuts-add-btn';
        addBtn.id = 'addShortcutBtn';
        addBtn.innerHTML = `<span class="add-icon">+</span><span>添加</span>`;
        addBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            openModal();
        });
        shortcutsGrid.appendChild(addBtn);

        shortcutsGrid.querySelectorAll('.shortcut-delete').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const idx = parseInt(this.dataset.index);
                if (!isNaN(idx)) {
                    deleteShortcut(idx);
                }
            });
        });
    }

    function deleteShortcut(index) {
        let list = getShortcuts();
        if (index >= 0 && index < list.length) {
            list.splice(index, 1);
            saveShortcuts(list);
            renderShortcuts();
        }
    }

    function addShortcut(name, url) {
        name = name.trim();
        url = url.trim();
        if (!name || !url) return false;
        if (!/^https?:\/\//i.test(url)) {
            url = 'https://' + url;
        }
        try {
            new URL(url);
        } catch (_) {
            return false;
        }
        let list = getShortcuts();
        const existing = list.findIndex(item => item.url === url);
        if (existing !== -1) {
            list[existing].name = name;
        } else {
            list.push({ name, url });
        }
        saveShortcuts(list);
        renderShortcuts();
        return true;
    }

    // ============================================================
    // 快捷链接弹窗控制
    // ============================================================
    function openModal() {
        searchInput.blur();
        hideHistory();
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }
        nameInput.value = '';
        urlInput.value = '';
        modal.classList.add('show');
        setTimeout(() => nameInput.focus(), 100);
    }

    function closeModal() {
        modal.classList.remove('show');
    }

    function handleSave() {
        const name = nameInput.value.trim();
        const url = urlInput.value.trim();
        if (!name) {
            nameInput.focus();
            nameInput.style.boxShadow = '0 0 0 3px rgba(255,100,100,0.2)';
            setTimeout(() => { nameInput.style.boxShadow = 'none'; }, 600);
            return;
        }
        if (!url) {
            urlInput.focus();
            urlInput.style.boxShadow = '0 0 0 3px rgba(255,100,100,0.2)';
            setTimeout(() => { urlInput.style.boxShadow = 'none'; }, 600);
            return;
        }
        const success = addShortcut(name, url);
        if (success) {
            closeModal();
        } else {
            urlInput.focus();
            urlInput.style.boxShadow = '0 0 0 3px rgba(255,100,100,0.2)';
            setTimeout(() => { urlInput.style.boxShadow = 'none'; }, 600);
        }
    }

    cancelBtn.addEventListener('click', closeModal);
    saveBtn.addEventListener('click', handleSave);

    urlInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSave();
        }
    });
    nameInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            urlInput.focus();
        }
    });

    modal.addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });

    // ============================================================
    // 自定义背景控制（右下角弹窗版）
    // ============================================================

    function openBgModal() {
        bgModal.classList.add('show');
    }

    function closeBgModal() {
        bgModal.classList.remove('show');
    }

    bgToggleBtn.addEventListener('click', openBgModal);
    bgModalCloseBtn.addEventListener('click', closeBgModal);

    bgModal.addEventListener('click', function(e) {
        if (e.target === this) closeBgModal();
    });

    function loadCustomBackground() {
        try {
            const data = localStorage.getItem(BG_STORAGE_KEY);
            if (data) {
                bgLayer.style.backgroundImage = `url(${data})`;
                bgLayer.style.backgroundSize = 'cover';
                bgLayer.style.backgroundPosition = 'center';
                bgLayer.classList.add('has-custom-bg');
            }
        } catch (_) {}
    }

    function saveCustomBackground(imageData) {
        try {
            localStorage.setItem(BG_STORAGE_KEY, imageData);
            bgLayer.style.backgroundImage = `url(${imageData})`;
            bgLayer.style.backgroundSize = 'cover';
            bgLayer.style.backgroundPosition = 'center';
            bgLayer.classList.add('has-custom-bg');
            closeBgModal();
        } catch (_) {}
    }

    function resetBackground() {
        try {
            localStorage.removeItem(BG_STORAGE_KEY);
            bgLayer.style.backgroundImage = '';
            bgLayer.style.backgroundSize = '';
            bgLayer.style.backgroundPosition = '';
            bgLayer.classList.remove('has-custom-bg');
            closeBgModal();
        } catch (_) {}
    }

    bgUploadBtn.addEventListener('click', function() {
        bgFileInput.click();
    });

    bgFileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(ev) {
            saveCustomBackground(ev.target.result);
            bgFileInput.value = '';
        };
        reader.readAsDataURL(file);
    });

    bgResetBtn.addEventListener('click', resetBackground);

    // ============================================================
    // 恢复搜索引擎
    // ============================================================
    try {
        const saved = localStorage.getItem('preferredEngine');
        if (saved && ENGINES[saved]) {
            setEngine(saved);
        }
    } catch (_) {}

    // ============================================================
    // 初始化
    // ============================================================
    renderHistory();
    renderShortcuts();
    loadCustomBackground();

    console.log('✦ 极光起始页已加载 · v2.0.0 ✦');
})();