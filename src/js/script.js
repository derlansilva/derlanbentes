document.addEventListener('DOMContentLoaded', () => {
    const desktop = document.getElementById('desktop');
    const startBtn = document.getElementById('btn-start');
    const startMenu = document.getElementById('start-menu');
    const openAppsContainer = document.getElementById('open-apps-container');
    const taskbarHeight = 48; // Altura da taskbar em px
    
    const iconesDesktop = document.querySelectorAll('.icone');
    const arquivosNaPasta = document.querySelectorAll('.janela.explorador .arquivo');
    const appsNoStartMenu = document.querySelectorAll('.start-menu-app-item');
    const wallpaperInput = document.getElementById('wallpaper-input');
    const mudarWallpaperBtn = document.getElementById('abrir-wallpaper');
    
    // Elementos do Relógio
    const currentTimeElement = document.getElementById('current-time');
    const currentDateElement = document.getElementById('current-date');

    // Variáveis globais para o arrasto de janelas
    let activeJanela = null;
    let offsetX, offsetY;
    
    // --- Funções de Utilitário ---

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

            const iconHtml = janela.querySelector('.janela-header i').outerHTML;
            
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
            // Minimizar
            janela.style.display = 'none';
            if (taskbarIcon) taskbarIcon.classList.remove('taskbar-ativo');
        } else {
            // Restaurar/Abrir
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
            adicionarIconeTaskbar(janelaId).classList.add('taskbar-ativo');
        }
    }

    // --- Relógio e Data (Funcionalidade) ---
    function updateClock() {
        const now = new Date();
        
        const timeOptions = { hour: '2-digit', minute: '2-digit' };
        const timeString = now.toLocaleTimeString('pt-BR', timeOptions);
        currentTimeElement.textContent = timeString;

        const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const dateString = now.toLocaleDateString('pt-BR', dateOptions);
        currentDateElement.textContent = dateString.substring(0, 5); // Exibe apenas dia/mês
    }

    updateClock();
    setInterval(updateClock, 1000); // Atualiza a cada segundo
    
    // --- Fundo (Wallpaper) ---

    // Carregar Wallpaper Salvo
    const savedWallpaper = localStorage.getItem('portfolioWallpaper');
    if (savedWallpaper) {
        desktop.style.backgroundImage = `url(${savedWallpaper})`;
    }

    // Ouvir a seleção de arquivo
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

    // Clique no arquivo "Mudar_Wallpaper"
    if (mudarWallpaperBtn) {
        mudarWallpaperBtn.addEventListener('click', () => {
            wallpaperInput.click();
        });
    }

    // --- Menu Iniciar ---

    startBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        startMenu.style.display = startMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Fechar Menu Iniciar ao clicar fora dele
    document.addEventListener('click', (e) => {
        if (e.target !== startBtn && !startMenu.contains(e.target)) {
            startMenu.style.display = 'none';
        }
    });

    // Abrir janela pelo ícone no Menu Iniciar
    appsNoStartMenu.forEach(appItem => {
        appItem.addEventListener('click', () => {
            const janelaId = appItem.getAttribute('data-janela-alvo').substring(1);
            abrirJanela(janelaId);
            startMenu.style.display = 'none';
        });
    });

    // --- Janelas (Interação) ---

    // Abrir janela por Ícone do Desktop (duplo clique)
    iconesDesktop.forEach(icone => {
        icone.addEventListener('dblclick', () => {
            const janelaId = icone.id.replace('icone-', 'janela-');
            abrirJanela(janelaId);
        });
    });

    // Abrir/Alternar por Arquivo dentro da Janela "Pastas" (clique simples)
    arquivosNaPasta.forEach(arquivo => {
        arquivo.addEventListener('click', (e) => {
            if (e.currentTarget.id === 'abrir-wallpaper') return;
            
            const janelaAlvoId = arquivo.getAttribute('data-janela-alvo').substring(1);
            abrirJanela(janelaAlvoId);
        });
    });

    // Manipulação dos botões do Header (Fechar/Minimizar/Maximizar)
    desktop.addEventListener('click', (e) => {
        if (e.target.closest('.janela-controles')) {
            const btn = e.target;
            const janela = btn.closest('.janela');
            const janelaId = janela.id;
            const taskbarIcon = document.getElementById(`taskbar-icon-${janelaId}`);

            if (btn.classList.contains('fechar')) {
                janela.style.display = 'none';
                if (taskbarIcon) taskbarIcon.remove();
                
            } else if (btn.classList.contains('minimizar')) {
                janela.style.display = 'none';
                if (taskbarIcon) taskbarIcon.classList.remove('taskbar-ativo');
            
            } else if (btn.classList.contains('maximizar')) {
                // Lógica de maximizar/restaurar
                if (janela.classList.contains('maximizado')) {
                    janela.classList.remove('maximizado');
                    janela.style.width = janela.getAttribute('data-prev-width') || '600px';
                    janela.style.height = janela.getAttribute('data-prev-height') || '300px';
                    janela.style.top = janela.getAttribute('data-prev-top') || '10%';
                    janela.style.left = janela.getAttribute('data-prev-left') || '10%';
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
        }
    });

    // --- Arrastar Janelas (Mouse Events) ---

    // 1. Início do Arrastamento (Mouse Down)
    desktop.addEventListener('mousedown', (e) => {
        const header = e.target.closest('.janela-header');
        if (header && !header.closest('.janela').classList.contains('maximizado')) {
            const janela = header.closest('.janela');
            activeJanela = janela;
            activeJanela.style.zIndex = getNextZIndex(); 
            offsetX = e.clientX - activeJanela.getBoundingClientRect().left;
            offsetY = e.clientY - activeJanela.getBoundingClientRect().top;
        }
    });

    // 2. Movimento (Mouse Move)
    document.addEventListener('mousemove', (e) => {
        if (!activeJanela) return;

        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        // Limites
        const maxX = window.innerWidth - activeJanela.offsetWidth;
        const maxY = window.innerHeight - activeJanela.offsetHeight - taskbarHeight; 

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        activeJanela.style.left = newX + 'px';
        activeJanela.style.top = newY + 'px';
    });

    // 3. Fim do Arrastamento (Mouse Up)
    document.addEventListener('mouseup', () => {
        activeJanela = null;
    });

    // Traz a janela clicada para o topo (foco)
    document.querySelectorAll('.janela').forEach(janela => {
        janela.addEventListener('mousedown', () => {
            janela.style.zIndex = getNextZIndex();
        });
    });

    // Ação de Desligar (apenas um alerta)
    const btnShutDown = document.querySelector('.btn-shut-down');
    if (btnShutDown) {
        btnShutDown.addEventListener('click', () => {
            alert('Desligando... Obrigado por visitar meu Portfólio!');
            startMenu.style.display = 'none';
        });
    }

});


// --- Lógica de Arrasto de Ícones do Desktop (NOVO) ---
const desktopIcons = document.querySelectorAll('.icone');

// Variáveis para arrasto de ícones
let activeIcon = null;
let iconOffsetX, iconOffsetY;

// 1. Carregar posições salvas
function loadIconPositions() {
    desktopIcons.forEach(icon => {
        const id = icon.id;
        const savedPosition = localStorage.getItem(`iconPosition-${id}`);
        if (savedPosition) {
            const { x, y } = JSON.parse(savedPosition);
            icon.style.position = 'absolute';
            icon.style.left = `${x}px`;
            icon.style.top = `${y}px`;
        } else {
            // Se não houver posição salva, use o layout padrão (mas torne absoluto para arrastar)
            icon.style.position = 'absolute'; 
            // Calcula a posição inicial baseada na ordem de renderização (aproximação)
            const index = Array.from(desktopIcons).indexOf(icon);
            icon.style.left = '10px';
            icon.style.top = `${10 + index * 95}px`;
        }
    });
}

// 2. Início do Arrastamento (Mouse Down)
desktop.addEventListener('mousedown', (e) => {
    const icon = e.target.closest('.icone');
    if (icon) {
        // Ignorar clique se for um duplo clique para abrir a janela (simulação)
        if (e.detail > 1) return;

        activeIcon = icon;
        activeIcon.style.zIndex = 50; // Z-index alto para arrasto
        activeIcon.classList.add('dragging'); // Classe para feedback visual (opcional)

        // Certifique-se de que o ícone está posicionado absolutamente
        activeIcon.style.position = 'absolute'; 

        // Calcula o offset
        const rect = activeIcon.getBoundingClientRect();
        iconOffsetX = e.clientX - rect.left;
        iconOffsetY = e.clientY - rect.top;
    }
});

// 3. Movimento (Mouse Move)
document.addEventListener('mousemove', (e) => {
    if (!activeIcon) return;

    let newX = e.clientX - iconOffsetX;
    let newY = e.clientY - iconOffsetY;

    // Limites da tela
    const maxX = desktop.clientWidth - activeIcon.offsetWidth;
    const maxY = desktop.clientHeight - activeIcon.offsetHeight - taskbarHeight;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    activeIcon.style.left = newX + 'px';
    activeIcon.style.top = newY + 'px';
});

// 4. Fim do Arrastamento (Mouse Up)
document.addEventListener('mouseup', () => {
    if (activeIcon) {
        // Salva a posição no Local Storage
        const finalX = activeIcon.offsetLeft;
        const finalY = activeIcon.offsetTop;
        localStorage.setItem(`iconPosition-${activeIcon.id}`, JSON.stringify({ x: finalX, y: finalY }));
        
        activeIcon.style.zIndex = 1; // Volta ao z-index normal
        activeIcon.classList.remove('dragging');
        activeIcon = null;
    }
});

// Chamar para carregar as posições na inicialização
loadIconPositions();

// O restante do seu script.js (lógica de janelas, clock, taskbar...) permanece o mesmo.