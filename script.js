document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DO HEADER ---
    const header = document.getElementById('main-header');
    const headerLogo = document.getElementById('header-logo');
    if (header && headerLogo) {
        const initialLogoSrc = './assets/PNG_LOGO_BRANCO.png';
        const scrolledLogoSrc = './assets/PNG_SIMBOLO_BRANCO.png';
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                if (!headerLogo.src.includes('SIMBOLO')) {
                    headerLogo.src = scrolledLogoSrc;
                }
            } else {
                if (!headerLogo.src.includes('LOGO')) {
                    headerLogo.src = initialLogoSrc;
                }
            }
        });
    }

    // --- LÓGICA DO SLIDESHOW DO HERO ---
    const slideshow = document.getElementById('hero-slideshow');
    if (slideshow) {
        const slides = slideshow.querySelectorAll('.hero-slide');
        let currentSlide = 0;
        if (slides.length > 1) {
            setInterval(() => {
                slides[currentSlide].style.opacity = '0';
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].style.opacity = '1';
            }, 5000);
        }
    }

    // --- LÓGICA GERAL DOS MODAIS (Reutilizável) ---
    const setupModal = (modalId, openTriggersQuery, closeBtnId) => {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        const openTriggers = document.querySelectorAll(openTriggersQuery);
        const closeBtn = document.getElementById(closeBtnId);

        const openModalAction = (data) => {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            if (data && typeof fillModalData === 'function') {
                fillModalData(modalId, data);
            }
        };

        const closeModalAction = () => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        };

        openTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                let data = e.currentTarget.dataset;
                openModalAction(data);
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModalAction);
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModalAction();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModalAction();
            }
        });
    };
    
    // Função para preencher os dados dos modais
    const fillModalData = (modalId, data) => {
        if (modalId === 'info-modal') {
            document.getElementById('modal-img').src = data.img;
            document.getElementById('modal-name').textContent = data.name;
            document.getElementById('modal-role').textContent = data.role;
            document.getElementById('modal-bio').textContent = data.bio;
            
            const socialLinks = {
                'modal-spotify': data.spotify,
                'modal-youtube': data.youtube,
                'modal-soundcloud': data.soundcloud,
                'modal-instagram': data.instagram
            };

            for (const [id, link] of Object.entries(socialLinks)) {
                const element = document.getElementById(id);
                if (element) {
                    if (link && link !== '#') {
                        element.href = link;
                        element.style.display = 'inline-block';
                    } else {
                        element.style.display = 'none';
                    }
                }
            }
        }
        if (modalId === 'production-modal') {
            document.getElementById('modal-production-title').textContent = data.title;
            document.getElementById('modal-production-description').textContent = data.description || '';
            document.getElementById('modal-spotify-link').href = data.spotifyLink || '#';
            document.getElementById('modal-youtube-link').href = data.youtubeLink || '#';
        }
    };
    
    // --- INICIALIZAÇÃO DOS MODAIS EXISTENTES ---
    setupModal('info-modal', '.info-trigger', 'close-info-modal');
    setupModal('production-modal', '.production-trigger', 'close-production-modal');
    setupModal('all-productions-modal', '#open-all-productions-modal', 'close-all-productions-modal');
    setupModal('ensina-modal', '#open-ensina-modal', 'close-ensina-modal');

    // --- LÓGICA DO MODAL DE ORÇAMENTO (VERSÃO CORRIGIDA E SEM CONFLITOS) ---
    const orcamentoModal = document.getElementById('orcamento-modal');
    if (orcamentoModal) {
        const budgetOptions = document.querySelectorAll('.budget-option');
        const closeBtn = document.getElementById('close-orcamento-modal');
        const form = document.getElementById('orcamento-form');
        const modalServiceTitle = document.getElementById('modal-service-title');
        const hiddenServiceInput = document.getElementById('servico_desejado');

        const openOrcamentoModal = (serviceTitle) => {
            modalServiceTitle.textContent = serviceTitle;
            hiddenServiceInput.value = serviceTitle;
            orcamentoModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        };

        const closeOrcamentoModal = () => {
            orcamentoModal.classList.add('hidden');
            document.body.style.overflow = '';
        };

        budgetOptions.forEach(option => {
            option.addEventListener('click', () => {
                const serviceTitle = option.querySelector('h3').textContent;
                openOrcamentoModal(serviceTitle);
            });
        });

        if (closeBtn) {
          closeBtn.addEventListener('click', closeOrcamentoModal);
        }

        orcamentoModal.addEventListener('click', (e) => {
            if (e.target === orcamentoModal) {
                closeOrcamentoModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !orcamentoModal.classList.contains('hidden')) {
                closeOrcamentoModal();
            }
        });

        if (form) {
            form.addEventListener('submit', function(e) {
                // Este listener está aqui para o caso de você querer reativar
                // o envio via JavaScript (AJAX) no futuro. Por enquanto,
                // para garantir a ativação do Formspree, o ideal é deixar
                // o JavaScript não interferir no envio padrão.
            });
        }
    }
});