document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DO HEADER ---
    const header = document.getElementById('main-header');
    const headerLogo = document.getElementById('header-logo');
    const initialLogoSrc = 'assets/PNG_LOGO_BRANCO.png';
    const scrolledLogoSrc = 'assets/PNG_SIMBOLO_BRANCO.png';
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            if (headerLogo.src !== scrolledLogoSrc) {
                headerLogo.src = scrolledLogoSrc;
            }
        } else {
            header.classList.remove('scrolled');
            if (headerLogo.src !== initialLogoSrc) {
                headerLogo.src = initialLogoSrc;
            }
        }
    });

    // --- LÓGICA DO SLIDESHOW DO HERO ---
    const slideshow = document.getElementById('hero-slideshow');
    if (slideshow) {
        const slides = slideshow.querySelectorAll('.hero-slide');
        let currentSlide = 0;
        
        setInterval(() => {
            slides[currentSlide].style.opacity = '0';
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].style.opacity = '1';
        }, 5000); // Muda a cada 5 segundos
    }

    // --- LÓGICA GERAL DOS MODAIS ---
    const setupModal = (modalId, openTriggers, closeBtnId) => {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        const triggers = document.querySelectorAll(openTriggers);
        const closeBtn = document.getElementById(closeBtnId);

        const openModal = (data) => {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            if (data) {
                // Preencher dados específicos do modal se necessário
                fillModalData(modalId, data);
            }
        };

        const closeModal = () => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        };

        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                let data = e.currentTarget.dataset;
                openModal(data);
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
    };
    
    const fillModalData = (modalId, data) => {
        if (modalId === 'info-modal') {
            document.getElementById('modal-img').src = data.img;
            document.getElementById('modal-name').textContent = data.name;
            document.getElementById('modal-role').textContent = data.role;
            document.getElementById('modal-bio').textContent = data.bio;
            
            // Lógica para mostrar/esconder links sociais
            const socialLinks = {
                'modal-spotify': data.spotify,
                'modal-youtube': data.youtube,
                'modal-soundcloud': data.soundcloud,
                'modal-instagram': data.instagram
            };

            for (const [id, link] of Object.entries(socialLinks)) {
                const element = document.getElementById(id);
                if (link && link !== '#') {
                    element.href = link;
                    element.style.display = 'inline-block';
                } else {
                    element.style.display = 'none';
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
    
    // --- INICIALIZAÇÃO DOS MODAIS ---
    setupModal('info-modal', '.info-trigger', 'close-info-modal');
    setupModal('production-modal', '.production-trigger', 'close-production-modal');
    setupModal('all-productions-modal', '#open-all-productions-modal', 'close-all-productions-modal');
    setupModal('ensina-modal', '#open-ensina-modal', 'close-ensina-modal');


    // --- LÓGICA DO MODAL DE ORÇAMENTO ---
    const orcamentoModal = document.getElementById('orcamento-modal');
    if (orcamentoModal) {
        const budgetOptions = document.querySelectorAll('.budget-option');
        const closeBtn = document.getElementById('close-orcamento-modal');
        const form = document.getElementById('orcamento-form');
        const modalServiceTitle = document.getElementById('modal-service-title');
        const hiddenServiceInput = document.getElementById('servico_desejado');

        const openModal = (serviceTitle) => {
            modalServiceTitle.textContent = serviceTitle;
            hiddenServiceInput.value = serviceTitle;
            orcamentoModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            orcamentoModal.classList.add('hidden');
            document.body.style.overflow = '';
        };

        budgetOptions.forEach(option => {
            option.addEventListener('click', () => {
                const serviceTitle = option.querySelector('h3').textContent;
                openModal(serviceTitle);
            });
        });

        if (closeBtn) {
          closeBtn.addEventListener('click', closeModal);
        }

        orcamentoModal.addEventListener('click', (e) => {
            if (e.target === orcamentoModal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !orcamentoModal.classList.contains('hidden')) {
                closeModal();
            }
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            console.log('Dados do Orçamento:', data);
            alert(`Obrigado, ${data.nome}! Sua solicitação para "${data.servico_desejado}" foi enviada. Entraremos em contato em breve.`);
            
            form.reset();
            closeModal();
        });
    }

});