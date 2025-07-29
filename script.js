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
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.classList.add('hidden');
            if (document.querySelectorAll('.fixed.inset-0:not(.hidden)').length === 0) {
                document.body.classList.remove('modal-open');
            }
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
        const closeButton = modal?.querySelector('.close-details-modal, #close-info-modal, #close-production-modal, #close-all-productions-modal');

        if (modal && triggers.length > 0) {
            triggers.forEach(trigger => trigger.addEventListener('click', () => openModal(modal)));
        }
        if (closeButton) {
            closeButton.addEventListener('click', () => closeModal(modal));
        }
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
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
});