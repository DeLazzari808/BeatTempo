document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DO MODAL DE INFORMAÇÃO (ARTISTAS E PARCEIROS) ---
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

                // Esconde a secção de links se não houver nenhum
                const socialLinksContainer = document.getElementById('modal-social-links');
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

    // --- LÓGICA DO MODAL DE PRODUÇÃO ---
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

                if(modalProductionTitle) modalProductionTitle.textContent = trigger.dataset.title;
                if(modalProductionDescription) modalProductionDescription.textContent = trigger.dataset.description;
                
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
    
    // --- CARROSSEL DE ARTISTAS (CORRIGIDO) ---
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
});