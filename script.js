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

    // --- LÓGICA GERAL DOS MODAIS SIMPLES (info, produções, etc.) ---
    function setupSimpleModal(modalId, openTriggersQuery, closeBtnId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        const openTriggers = document.querySelectorAll(openTriggersQuery);
        const closeBtn = document.getElementById(closeBtnId);

        const open = () => {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        };
        const close = () => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        };

        openTriggers.forEach(trigger => trigger.addEventListener('click', open));
        if (closeBtn) closeBtn.addEventListener('click', close);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) close();
        });
    }

    setupSimpleModal('info-modal', '.info-trigger', 'close-info-modal');
    setupSimpleModal('production-modal', '.production-trigger', 'close-production-modal');
    setupSimpleModal('all-productions-modal', '#open-all-productions-modal', 'close-all-productions-modal');
    setupSimpleModal('ensina-modal', '#open-ensina-modal', 'close-ensina-modal');


    // --- LÓGICA DO FLUXO DE ORÇAMENTO (COM MÚLTIPLOS MODAIS) ---
    const detailsProjetoModal = document.getElementById('details-projeto-modal');
    const detailsAgenciamentoModal = document.getElementById('details-agenciamento-modal');
    const detailsEnsinaModal = document.getElementById('details-ensina-modal');
    const orcamentoModal = document.getElementById('orcamento-modal');
    const allDetailModals = [detailsProjetoModal, detailsAgenciamentoModal, detailsEnsinaModal];

    // Função para fechar todos os modais de detalhes
    function closeAllDetailModals() {
        allDetailModals.forEach(m => m?.classList.add('hidden'));
    }

    // 1. Abrir os modais de DETALHES
    document.getElementById('btn-projeto')?.addEventListener('click', () => {
        closeAllDetailModals();
        detailsProjetoModal?.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });
    document.getElementById('btn-agenciamento')?.addEventListener('click', () => {
        closeAllDetailModals();
        detailsAgenciamentoModal?.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });
    document.getElementById('btn-ensina')?.addEventListener('click', () => {
        closeAllDetailModals();
        detailsEnsinaModal?.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    // 2. Abrir o FORMULÁRIO a partir das opções FINAIS
    document.querySelectorAll('.budget-option-final').forEach(option => {
        option.addEventListener('click', () => {
            const h4 = option.querySelector('h4');
            const serviceTitle = h4 ? h4.textContent.trim() : 'Serviço Personalizado';
            
            closeAllDetailModals();
            
            const modalServiceTitle = document.getElementById('modal-service-title');
            const hiddenServiceInput = document.getElementById('servico_desejado');
            if (modalServiceTitle) modalServiceTitle.textContent = serviceTitle;
            if (hiddenServiceInput) hiddenServiceInput.value = serviceTitle;
            
            orcamentoModal?.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    // 3. Lógica para fechar TODOS os modais
    function closeAllModals() {
        closeAllDetailModals();
        orcamentoModal?.classList.add('hidden');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.close-details-modal').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    document.getElementById('close-orcamento-modal')?.addEventListener('click', closeAllModals);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
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
                    closeAllModals();
                } else {
                    alert('Ocorreu um problema ao enviar seu formulário. Por favor, tente novamente.');
                }
            }).catch(error => {
                alert('Ocorreu um problema de conexão. Por favor, verifique sua internet e tente novamente.');
            }).finally(() => {
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            });
        });
    }
});