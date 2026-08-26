function toggleCodeBlock(id) {
    const codeBlock = document.getElementById(id);
    if (codeBlock) {
        codeBlock.style.display = codeBlock.style.display === 'block' ? 'none' : 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const desktop = document.getElementById('desktop');
    const startBtn = document.getElementById('btn-start');
    const startMenu = document.getElementById('start-menu');
    const openAppsContainer = document.getElementById('open-apps-container');
    const taskbarHeight = 48;

    const iconesDesktop = document.querySelectorAll('.icone');
    const arquivosNaPasta = document.querySelectorAll('.janela.explorador .arquivo');
    const appsNoStartMenu = document.querySelectorAll('.start-menu-app-item');
    const wallpaperInput = document.getElementById('wallpaper-input');
    const mudarWallpaperBtn = document.getElementById('abrir-wallpaper');

    const currentTimeElement = document.getElementById('current-time');
    const currentDateElement = document.getElementById('current-date');

    let activeJanela = null;
    let offsetX, offsetY;

    function getNextZIndex() {
        let maxZ = 10;
        document.querySelectorAll('.janela').forEach(j => {
            let z = parseInt(j.style.zIndex) || 10;
            if (z > maxZ) maxZ = z;
        });
        return maxZ + 1;
    }

    function adicionarIconeTaskbar(janelaId) {
        let taskbarIcon = document.getElementById(`taskbar-icon-${janelaId}`);
        if (!taskbarIcon) {
            const janela = document.getElementById(janelaId);
            if (!janela) return;

            const iconHeader = janela.querySelector('.janela-header i');
            const iconHtml = iconHeader ? iconHeader.outerHTML : '<i class="fas fa-window-maximize"></i>';

            taskbarIcon = document.createElement('div');
            taskbarIcon.id = `taskbar-icon-${janelaId}`;
            taskbarIcon.className = 'taskbar-item';
            taskbarIcon.setAttribute('data-janela', `#${janelaId}`);
            taskbarIcon.innerHTML = iconHtml;

            openAppsContainer.appendChild(taskbarIcon);

            taskbarIcon.addEventListener('click', () => {
                alternarJanela(janelaId);
            });
        }
        return taskbarIcon;
    }

    function alternarJanela(janelaId) {
        const janela = document.getElementById(janelaId);
        const taskbarIcon = document.getElementById(`taskbar-icon-${janelaId}`);

        if (!janela) return;

        if (janela.style.display === 'flex') {
            janela.style.display = 'none';
            if (taskbarIcon) taskbarIcon.classList.remove('taskbar-ativo');
        } else {
            janela.style.display = 'flex';
            janela.style.zIndex = getNextZIndex();
            janela.classList.remove('maximizado');
            if (taskbarIcon) taskbarIcon.classList.add('taskbar-ativo');
        }
    }

    function abrirJanela(janelaId) {
        const janela = document.getElementById(janelaId);
        if (janela) {
            janela.style.display = 'flex';
            janela.style.zIndex = getNextZIndex();
            janela.classList.remove('maximizado');
            const icon = adicionarIconeTaskbar(janelaId);
            if (icon) icon.classList.add('taskbar-ativo');
        }
    }

    function updateClock() {
        const now = new Date();
        if (currentTimeElement) {
            currentTimeElement.textContent = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        }
        if (currentDateElement) {
            currentDateElement.textContent = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        }
    }

    updateClock();
    setInterval(updateClock, 1000);

    const savedWallpaper = localStorage.getItem('portfolioWallpaper');
    if (savedWallpaper && desktop) {
        desktop.style.backgroundImage = `url(${savedWallpaper})`;
    }

    if (wallpaperInput) {
        wallpaperInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (readerEvent) => {
                    const base64Image = readerEvent.target.result;
                    desktop.style.backgroundImage = `url(${base64Image})`;
                    localStorage.setItem('portfolioWallpaper', base64Image);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (mudarWallpaperBtn) {
        mudarWallpaperBtn.addEventListener('click', () => wallpaperInput.click());
    }

    if (startBtn) {
        startBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            startMenu.style.display = startMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    document.addEventListener('click', (e) => {
        if (startMenu && e.target !== startBtn && !startMenu.contains(e.target)) {
            startMenu.style.display = 'none';
        }
    });

    appsNoStartMenu.forEach(appItem => {
        appItem.addEventListener('click', () => {
            const janelaId = appItem.getAttribute('data-janela-alvo').substring(1);
            abrirJanela(janelaId);
            if (startMenu) startMenu.style.display = 'none';
        });
    });

    iconesDesktop.forEach(icone => {
        icone.addEventListener('dblclick', () => {
            const janelaId = icone.id.replace('icone-', 'janela-');
            abrirJanela(janelaId);
        });
    });

    arquivosNaPasta.forEach(arquivo => {
        arquivo.addEventListener('click', (e) => {
            if (e.currentTarget.id === 'abrir-wallpaper') return;
            const janelaAlvoId = arquivo.getAttribute('data-janela-alvo').substring(1);
            abrirJanela(janelaAlvoId);
        });
    });

    // Evento de clique para fechar, meximizar e minimizar
    desktop.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn || !btn.closest('.janela-controles')) return;

        const janela = btn.closest('.janela');
        if (!janela) return;

        const janelaId = janela.id;
        const taskbarIcon = document.getElementById(`taskbar-icon-${janelaId}`);

        if (btn.classList.contains('fechar')) {
            janela.style.display = 'none';
            if (taskbarIcon) taskbarIcon.remove();
        } else if (btn.classList.contains('minimizar')) {
            janela.style.display = 'none';
            if (taskbarIcon) taskbarIcon.classList.remove('taskbar-ativo');
        } else if (btn.classList.contains('maximizar')) {
            if (janela.classList.contains('maximizado')) {
                janela.classList.remove('maximizado');
                janela.style.width = janela.getAttribute('data-prev-width') || '750px';
                janela.style.height = janela.getAttribute('data-prev-height') || '500px';
                janela.style.top = janela.getAttribute('data-prev-top') || '50%';
                janela.style.left = janela.getAttribute('data-prev-left') || '50%';
            } else {
                janela.setAttribute('data-prev-width', janela.style.width);
                janela.setAttribute('data-prev-height', janela.style.height);
                janela.setAttribute('data-prev-top', janela.style.top);
                janela.setAttribute('data-prev-left', janela.style.left);

                janela.classList.add('maximizado');
                janela.style.width = '100vw';
                janela.style.height = `calc(100vh - ${taskbarHeight}px)`;
                janela.style.top = '0';
                janela.style.left = '0';
            }
        }
    });

    // Arrasto de Janelas
    desktop.addEventListener('mousedown', (e) => {
        const header = e.target.closest('.janela-header');
        if (header && !header.closest('.janela').classList.contains('maximizado')) {
            activeJanela = header.closest('.janela');
            activeJanela.style.zIndex = getNextZIndex();
            offsetX = e.clientX - activeJanela.getBoundingClientRect().left;
            offsetY = e.clientY - activeJanela.getBoundingClientRect().top;
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (!activeJanela) return;

        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        const maxX = window.innerWidth - activeJanela.offsetWidth;
        const maxY = window.innerHeight - activeJanela.offsetHeight - taskbarHeight;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        activeJanela.style.left = newX + 'px';
        activeJanela.style.top = newY + 'px';
    });

    document.addEventListener('mouseup', () => {
        activeJanela = null;
    });

    document.querySelectorAll('.janela').forEach(janela => {
        janela.addEventListener('mousedown', () => {
            janela.style.zIndex = getNextZIndex();
        });
    });

    // Arrasto dos Ícones do Desktop
    let activeIcon = null;
    let iconOffsetX, iconOffsetY;

    desktopIcons.forEach(icon => {
        const id = icon.id;
        const savedPosition = localStorage.getItem(`iconPosition-${id}`);
        if (savedPosition) {
            const { x, y } = JSON.parse(savedPosition);
            icon.style.position = 'absolute';
            icon.style.left = `${x}px`;
            icon.style.top = `${y}px`;
        }
    });

    desktop.addEventListener('mousedown', (e) => {
        const icon = e.target.closest('.icone');
        if (icon && e.detail === 1) {
            activeIcon = icon;
            activeIcon.style.zIndex = 50;
            activeIcon.style.position = 'absolute';
            const rect = activeIcon.getBoundingClientRect();
            iconOffsetX = e.clientX - rect.left;
            iconOffsetY = e.clientY - rect.top;
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (!activeIcon) return;
        let newX = e.clientX - iconOffsetX;
        let newY = e.clientY - iconOffsetY;
        const maxX = desktop.clientWidth - activeIcon.offsetWidth;
        const maxY = desktop.clientHeight - activeIcon.offsetHeight - taskbarHeight;

        activeIcon.style.left = Math.max(0, Math.min(newX, maxX)) + 'px';
        activeIcon.style.top = Math.max(0, Math.min(newY, maxY)) + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (activeIcon) {
            localStorage.setItem(`iconPosition-${activeIcon.id}`, JSON.stringify({
                x: activeIcon.offsetLeft,
                y: activeIcon.offsetTop
            }));
            activeIcon.style.zIndex = 1;
            activeIcon = null;
        }
    });
});