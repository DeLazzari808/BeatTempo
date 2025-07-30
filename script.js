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
                    if (!headerLogo.src.includes('SIMBOLO')) headerLogo.src = scrolledLogoSrc;
                } else {
                    if (!headerLogo.src.includes('LOGO')) headerLogo.src = initialLogoSrc;
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

    // --- FUNÇÕES GLOBAIS PARA CONTROLE DE MODAIS ---
    function openModal(modal) {
        if (modal) {
            modal.classList.remove('hidden');
            document.body.classList.add('modal-open');
            
            // Animar entrada do modal
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.animation = 'modalFadeIn 0.3s ease-out forwards';
            }
        }
    }

    function closeModal(modal) {
        if (modal) {
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.classList.add('closing');
                setTimeout(() => {
                    modal.classList.add('hidden');
                    modalContent.classList.remove('closing');
                    if (document.querySelectorAll('.fixed.inset-0:not(.hidden)').length === 0) {
                        document.body.classList.remove('modal-open');
                    }
                }, 300);
            } else {
                modal.classList.add('hidden');
                if (document.querySelectorAll('.fixed.inset-0:not(.hidden)').length === 0) {
                    document.body.classList.remove('modal-open');
                }
            }
        }
    }
    function fillModalData(modalId, data) {
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
                img: document.getElementById('modal-production-img'),
                title: document.getElementById('modal-production-title'),
                description: document.getElementById('modal-production-description'),
                spotify: document.getElementById('modal-spotify-link'),
                youtube: document.getElementById('modal-youtube-link')
            };
            if(elements.img) elements.img.src = data.img || '';
            if(elements.title) elements.title.textContent = data.title || '';
            if(elements.description) elements.description.textContent = data.description || '';
            if(elements.spotify) elements.spotify.href = data.spotifyLink || data['spotify-link'] || '#';
            if(elements.youtube) elements.youtube.href = data.youtubeLink || data['youtube-link'] || '#';
        }
    }
// --- LÓGICA DOS MODAIS SIMPLES (Info, Produções, etc.) ---
const simpleModalTriggers = {
    'info-modal': '.info-trigger',
    'production-modal': '.production-trigger',
    'all-productions-modal': '#open-all-productions-modal',
};

for (const modalId in simpleModalTriggers) {
    const modal = document.getElementById(modalId);
    const triggerQuery = simpleModalTriggers[modalId];
    const triggers = document.querySelectorAll(triggerQuery);
    if (modal && triggers.length > 0) {
        const closeButton = modal.querySelector('#close-' + modalId);
        
        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                const data = e.currentTarget.dataset;
                fillModalData(modalId, data); // Preenche os dados
                openModal(modal); // Abre o modal
            });
        });

        if (closeButton) {
            closeButton.addEventListener('click', () => closeModal(modal));
        }
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    }
}

    // --- LÓGICA DO FLUXO DE ORÇAMENTO (COM MÚLTIPLOS MODAIS) ---
    const detailsProjetoModal = document.getElementById('details-projeto-modal');
    const detailsAgenciamentoModal = document.getElementById('details-agenciamento-modal');
    const detailsEnsinaModal = document.getElementById('details-ensina-modal');
    const orcamentoModal = document.getElementById('orcamento-modal');
    const allDetailModals = [detailsProjetoModal, detailsAgenciamentoModal, detailsEnsinaModal];

    // 1. Abrir os modais de DETALHES
    document.getElementById('btn-projeto')?.addEventListener('click', () => openModal(detailsProjetoModal));
    document.getElementById('btn-agenciamento')?.addEventListener('click', () => openModal(detailsAgenciamentoModal));
    document.getElementById('btn-ensina')?.addEventListener('click', () => openModal(detailsEnsinaModal));

    // 2. Abrir o FORMULÁRIO a partir das opções FINAIS
    document.querySelectorAll('.budget-option-final').forEach(option => {
        option.addEventListener('click', () => {
            const h4 = option.querySelector('h4');
            const serviceTitle = h4 ? h4.textContent.trim() : 'Serviço Personalizado';
            const parentModal = option.closest('.fixed.inset-0');
            
            closeModal(parentModal);
            
            const modalServiceTitle = document.getElementById('modal-service-title');
            const hiddenServiceInput = document.getElementById('servico_desejado');
            if (modalServiceTitle) modalServiceTitle.textContent = serviceTitle;
            if (hiddenServiceInput) hiddenServiceInput.value = serviceTitle;
            
            openModal(orcamentoModal);
        });
    });

    // 2.1 Lógica do botão da CHECKLIST
    document.getElementById('solicitar-projeto-btn')?.addEventListener('click', () => {
        const checklist = document.getElementById('projeto-checklist');
        if (checklist) {
            const selectedItems = Array.from(checklist.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
            const serviceTitle = "Projeto Beatempo: " + (selectedItems.length > 0 ? selectedItems.join(', ') : "Nenhum item selecionado");
            
            closeModal(detailsProjetoModal);

            const modalServiceTitle = document.getElementById('modal-service-title');
            const hiddenServiceInput = document.getElementById('servico_desejado');
            if (modalServiceTitle) modalServiceTitle.textContent = "Projeto Beatempo";
            if (hiddenServiceInput) hiddenServiceInput.value = serviceTitle;

            openModal(orcamentoModal);
        }
    });
    
    // 3. Lógica para fechar TODOS os modais com botão 'X', clique fora ou tecla ESC
    const allModals = document.querySelectorAll('.fixed.inset-0');
    allModals.forEach(modal => {
        const closeButton = modal.querySelector('.close-details-modal, #close-orcamento-modal');
        if (closeButton) {
            closeButton.addEventListener('click', () => closeModal(modal));
        }
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            allModals.forEach(modal => closeModal(modal));
        }
    });

    // 4. Lógica de envio do FORMULÁRIO para o Formspree
    const form = document.getElementById('orcamento-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const action = e.target.action;
            const submitButton = form.querySelector('button[type="submit"]');

            if (!action || action.includes("xxxxxxxx")) {
                alert("Erro: O URL de envio do formulário não está configurado corretamente no HTML.");
                return;
            }

            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = `Enviando...`;
            submitButton.disabled = true;

            fetch(action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    alert('Obrigado! Sua solicitação foi enviada com sucesso.');
                    form.reset();
                    closeModal(orcamentoModal);
                } else {
                    alert('Ocorreu um problema ao enviar seu formulário. Tente novamente.');
                }
            }).catch(error => {
                alert('Ocorreu um problema de conexão. Tente novamente.');
            }).finally(() => {
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            });
        });
    }

    // 5. Animação dos cards de agenciamento mensal
    const agenciamentoCards = document.querySelectorAll('.agenciamento-card');
    
    agenciamentoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Remove a borda de todos os outros cards
            agenciamentoCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('border-green-500', 'border-blue-500', 'border-purple-500');
                    otherCard.classList.add('border-transparent');
                }
            });
            
            // Adiciona a borda colorida ao card atual
            const color = this.getAttribute('data-color');
            this.classList.remove('border-transparent');
            this.classList.add(`border-${color}-500`);
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove a borda do card atual
            this.classList.remove('border-green-500', 'border-blue-500', 'border-purple-500');
            this.classList.add('border-transparent');
        });
    });

});