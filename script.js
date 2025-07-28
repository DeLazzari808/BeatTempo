document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DO HEADER ---
    const header = document.getElementById('main-header');
    const headerLogo = document.getElementById('header-logo');
    if (header && headerLogo) {
        const initialLogoSrc = './assets/PNG_LOGO_BRANCO.png';
        const scrolledLogoSrc = './assets/PNG_SIMBOLO_BRANCO.png';
        
        window.addEventListener('scroll', () => {
            try {
                if (window.scrollY > 50) {
                    if (!headerLogo.src.includes('SIMBOLO')) {
                        headerLogo.src = scrolledLogoSrc;
                    }
                } else {
                    if (!headerLogo.src.includes('LOGO')) {
                        headerLogo.src = initialLogoSrc;
                    }
                }
            } catch (error) {
                console.error("Erro na lógica do header:", error);
            }
        });
    }

    // --- LÓGICA DO SLIDESHOW DO HERO ---
    const slideshow = document.getElementById('hero-slideshow');
    if (slideshow) {
        const slides = slideshow.querySelectorAll('.hero-slide');
        if (slides.length > 1) {
            let currentSlide = 0;
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
            const elements = {
                img: document.getElementById('modal-img'),
                name: document.getElementById('modal-name'),
                role: document.getElementById('modal-role'),
                bio: document.getElementById('modal-bio'),
            };
            if(elements.img) elements.img.src = data.img || '';
            if(elements.name) elements.name.textContent = data.name || '';
            if(elements.role) elements.role.textContent = data.role || '';
            if(elements.bio) elements.bio.textContent = data.bio || '';
            
            const socialLinks = {
                'modal-spotify': data.spotify,
                'modal-youtube': data.youtube,
                'modal-soundcloud': data.soundcloud,
                'modal-instagram': data.instagram
            };

            for (const [id, link] of Object.entries(socialLinks)) {
                const element = document.getElementById(id);
                if (element) {
                    element.style.display = (link && link !== '#') ? 'inline-block' : 'none';
                    if (link && link !== '#') element.href = link;
                }
            }
        }
        if (modalId === 'production-modal') {
             const elements = {
                title: document.getElementById('modal-production-title'),
                description: document.getElementById('modal-production-description'),
                spotify: document.getElementById('modal-spotify-link'),
                youtube: document.getElementById('modal-youtube-link')
            };
            if(elements.title) elements.title.textContent = data.title || '';
            if(elements.description) elements.description.textContent = data.description || '';
            if(elements.spotify) elements.spotify.href = data.spotifyLink || '#';
            if(elements.youtube) elements.youtube.href = data.youtubeLink || '#';
        }
    };
    
    // --- INICIALIZAÇÃO DOS MODAIS EXISTENTES ---
    setupModal('info-modal', '.info-trigger', 'close-info-modal');
    setupModal('production-modal', '.production-trigger', 'close-production-modal');
    setupModal('all-productions-modal', '#open-all-productions-modal', 'close-all-productions-modal');
    setupModal('ensina-modal', '#open-ensina-modal', 'close-ensina-modal');

    // --- LÓGICA DO MODAL DE ORÇAMENTO (VERSÃO FINAL E FUNCIONAL) ---
    const orcamentoModal = document.getElementById('orcamento-modal');
    if (orcamentoModal) {
        const budgetOptions = document.querySelectorAll('.budget-option');
        const closeBtn = document.getElementById('close-orcamento-modal');
        const form = document.getElementById('orcamento-form');
        const modalServiceTitle = document.getElementById('modal-service-title');
        const hiddenServiceInput = document.getElementById('servico_desejado');

        const openOrcamentoModal = (serviceTitle) => {
            if(modalServiceTitle) modalServiceTitle.textContent = serviceTitle;
            if(hiddenServiceInput) hiddenServiceInput.value = serviceTitle;
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
                e.preventDefault();
                
                const formData = new FormData(form);
                const action = e.target.action;
                const submitButton = form.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.innerHTML;

                if (!action) {
                    console.error("Formspree 'action' URL não está definida no formulário HTML.");
                    alert("Erro de configuração: O formulário não pode ser enviado.");
                    return;
                }

                submitButton.innerHTML = `Enviando...`;
                submitButton.disabled = true;

                fetch(action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                }).then(response => {
                    if (response.ok) {
                        alert(`Obrigado! Sua solicitação foi enviada com sucesso.`);
                        form.reset();
                        closeOrcamentoModal();
                        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
                    } else {
                        response.json().then(data => {
                            if (Object.hasOwn(data, 'errors')) {
                                alert(data["errors"].map(error => error["message"]).join(", "));
                            } else {
                                alert('Oops! Ocorreu um problema ao enviar seu formulário. Tente novamente.');
                            }
                        });
                    }
                }).catch(error => {
                    alert('Oops! Ocorreu um problema de conexão. Tente novamente.');
                }).finally(() => {
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                });
            });
        }
    }
});