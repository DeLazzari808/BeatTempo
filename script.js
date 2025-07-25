document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DA NOVA SEÇÃO DE ORÇAMENTO ---
    const budgetOptions = document.querySelectorAll('.budget-option');
    const detailSections = {
        'btn-projeto': document.getElementById('details-projeto'),
        'btn-agenciamento': document.getElementById('details-agenciamento'),
        'btn-ensina': document.getElementById('details-ensina')
    };

    budgetOptions.forEach(option => {
        option.addEventListener('click', () => {
            const targetId = option.id;
            
            // Esconde todas as seções de detalhe
            Object.values(detailSections).forEach(section => {
                if(section) section.classList.add('hidden');
            });

            // Remove a borda de todos os botões
            budgetOptions.forEach(btn => btn.classList.remove('border-white'));

            // Mostra a seção de detalhe clicada e adiciona a borda
            if (detailSections[targetId]) {
                detailSections[targetId].classList.remove('hidden');
                option.classList.add('border-white');
            }
        });
    });

    // --- LÓGICA DO MODAL DE PRODUÇÃO (PRODUÇÕES) ---
    const productionModal = document.getElementById('production-modal');
    if (productionModal) {
        const closeProductionModalBtn = document.getElementById('close-production-modal');
        const closeProductionModal = () => productionModal.classList.add('hidden');

        document.body.addEventListener('click', function(event) {
            const trigger = event.target.closest('.production-trigger');
            if(trigger) {
                const modalProductionTitle = document.getElementById('modal-production-title');
                const modalProductionDescription = document.getElementById('modal-production-description');
                const modalSpotifyLink = document.getElementById('modal-spotify-link');
                const modalYoutubeLink = document.getElementById('modal-youtube-link');

                // Ajuste: só o nome da música no título, integrantes na descrição
                let title = trigger.dataset.title || '';
                let description = '';
                // Se o título contém ' - ', separa música e integrantes
                if (title.includes(' - ')) {
                    const [music, members] = title.split(' - ');
                    title = music.trim();
                    description = members ? members.trim() : '';
                }
                if(modalProductionTitle) modalProductionTitle.textContent = title;
                if(modalProductionDescription) modalProductionDescription.textContent = description;
                if(modalSpotifyLink) {
                    const spotifyLink = trigger.dataset.spotifyLink;
                    if (spotifyLink && spotifyLink !== '#') {
                        modalSpotifyLink.href = spotifyLink;
                        modalSpotifyLink.style.display = 'flex';
                    } else {
                        modalSpotifyLink.style.display = 'none';
                    }
                }
                if(modalYoutubeLink) {
                    const youtubeLink = trigger.dataset.youtubeLink;
                    if (youtubeLink && youtubeLink !== '#') {
                        modalYoutubeLink.href = youtubeLink;
                        modalYoutubeLink.style.display = 'flex';
                    } else {
                        modalYoutubeLink.style.display = 'none';
                    }
                }
                productionModal.classList.remove('hidden');
            }
        });
        if(closeProductionModalBtn) closeProductionModalBtn.addEventListener('click', closeProductionModal);
        productionModal.addEventListener('click', (e) => {
            if (e.target === productionModal) closeProductionModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !productionModal.classList.contains('hidden')) closeProductionModal();
        });
    }
    
    // --- LÓGICA DO MODAL DE INFORMAÇÕES (ARTISTAS, PARCEIROS, CEO, CO.FOUNDER) ---
    const infoModal = document.getElementById('info-modal');
    if (infoModal) {
        const closeInfoModalBtn = document.getElementById('close-info-modal');
        const infoTriggers = document.querySelectorAll('.info-trigger');
        const modalImg = document.getElementById('modal-img');
        const modalName = document.getElementById('modal-name');
        const modalRole = document.getElementById('modal-role');
        const modalBio = document.getElementById('modal-bio');
        const modalSpotify = document.getElementById('modal-spotify');
        const modalYoutube = document.getElementById('modal-youtube');
        const modalSoundcloud = document.getElementById('modal-soundcloud');
        const modalInstagram = document.getElementById('modal-instagram');
        const socialLinksContainer = document.getElementById('modal-social-links');

        const closeInfoModal = () => infoModal.classList.add('hidden');

        document.body.addEventListener('click', function(event) {
            const trigger = event.target.closest('.info-trigger');
            if (trigger) {
                if (modalImg) modalImg.src = trigger.dataset.img;
                if (modalName) modalName.textContent = trigger.dataset.name;
                if (modalRole) modalRole.textContent = trigger.dataset.role;
                if (modalBio) modalBio.textContent = trigger.dataset.bio;

                // Atualiza e mostra/esconde os links das redes sociais
                const socialLinks = [
                    { el: modalSpotify, link: trigger.dataset.spotify },
                    { el: modalYoutube, link: trigger.dataset.youtube },
                    { el: modalSoundcloud, link: trigger.dataset.soundcloud },
                    { el: modalInstagram, link: trigger.dataset.instagram }
                ];
                let hasSocialLinks = false;
                socialLinks.forEach(item => {
                    if (item.el) {
                        if (item.link && item.link !== '#') {
                            item.el.href = item.link;
                            item.el.classList.remove('hidden');
                            hasSocialLinks = true;
                        } else {
                            item.el.classList.add('hidden');
                        }
                    }
                });
                if(socialLinksContainer) {
                    socialLinksContainer.classList.toggle('hidden', !hasSocialLinks);
                }
                infoModal.classList.remove('hidden');
            }
        });
        if(closeInfoModalBtn) closeInfoModalBtn.addEventListener('click', closeInfoModal);
        infoModal.addEventListener('click', (e) => {
            if (e.target === infoModal) closeInfoModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !infoModal.classList.contains('hidden')) closeInfoModal();
        });
    }
    
    // --- LÓGICA DO CARROSSEL DE ARTISTAS ---
    const artistsCarouselContainer = document.getElementById('artists-carousel-container');
    if (artistsCarouselContainer) {
        const carousel = document.getElementById('artists-carousel');
        const items = Array.from(carousel.children);
        const itemCount = items.length;

        if (itemCount > 0) {
            // Duplica os itens para um loop infinito e suave
            items.forEach(item => {
                const clone = item.cloneNode(true);
                carousel.appendChild(clone);
            });

            // Adiciona a animação de scroll ao CSS
            const style = document.createElement('style');
            const animationName = 'scroll';
            
            // O carrossel tem N itens visíveis, cada um com uma largura de X%.
            // Neste caso, 5 itens visíveis, cada um com 20% (1/5) da largura.
            const totalWidthOfOriginalItems = 20 * itemCount;

            style.innerHTML = `
                @keyframes ${animationName} {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-${totalWidthOfOriginalItems}%)); }
                }
                #artists-carousel {
                    /* AUMENTEI A DURAÇÃO PARA 80s PARA DEIXAR MAIS LENTO */
                    animation: ${animationName} 80s linear infinite;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // --- LÓGICA DO NOVO MODAL (TODOS OS LANÇAMENTOS) ---
    const allProductionsModal = document.getElementById('all-productions-modal');
    if (allProductionsModal) {
        const openBtn = document.getElementById('open-all-productions-modal');
        const closeBtn = document.getElementById('close-all-productions-modal');

        const openModal = () => {
            allProductionsModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // trava scroll do body
        };
        const closeModal = () => {
            allProductionsModal.classList.add('hidden');
            document.body.style.overflow = '';
        };

        if(openBtn) openBtn.addEventListener('click', openModal);
        if(closeBtn) closeBtn.addEventListener('click', closeModal);

        // Fechar ao clicar fora
        allProductionsModal.addEventListener('click', (e) => {
            if (e.target === allProductionsModal) {
                closeModal();
            }
        });

        // Fechar com a tecla Esc
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !allProductionsModal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }// --- LÓGICA DO SLIDESHOW DA SEÇÃO HERO ---
    const heroSlideshow = document.getElementById('hero-slideshow');
    if (heroSlideshow) {
        const slides = heroSlideshow.querySelectorAll('.hero-slide');
        let currentSlide = 0;
        const slideInterval = 5000; // Muda de imagem a cada 5 segundos

        const nextSlide = () => {
            // Esconde o slide atual
            slides[currentSlide].classList.remove('opacity-100');
            slides[currentSlide].classList.add('opacity-0');

            // Calcula o próximo slide
            currentSlide = (currentSlide + 1) % slides.length;

            // Mostra o próximo slide
            slides[currentSlide].classList.remove('opacity-0');
            slides[currentSlide].classList.add('opacity-100');
        };

        // Inicia o slideshow
        setInterval(nextSlide, slideInterval);
    }
    // --- LÓGICA DO MODAL BEATEMPO ENSINA ---
const ensinaModal = document.getElementById('ensina-modal');
if (ensinaModal) {
    const openBtn = document.getElementById('open-ensina-modal');
    const closeBtn = document.getElementById('close-ensina-modal');

    const openModal = () => {
        ensinaModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Trava o scroll do fundo
    };
    const closeModal = () => {
        ensinaModal.classList.add('hidden');
        document.body.style.overflow = ''; // Libera o scroll do fundo
    };

    if(openBtn) openBtn.addEventListener('click', openModal);
    if(closeBtn) closeBtn.addEventListener('click', closeModal);

    // Fechar ao clicar fora ou com a tecla Esc
    ensinaModal.addEventListener('click', (e) => {
        if (e.target === ensinaModal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !ensinaModal.classList.contains('hidden')) closeModal();
    });
}
});