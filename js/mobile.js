// Mobile Initialization
function initializeMobileComponents() {
    // Setup modals for mobile
    const modals = document.querySelectorAll('.modal-content');
    modals.forEach(modal => {
        setupModalForMobile(modal);
    });

    // Setup touch areas
    const touchTargets = document.querySelectorAll('button, .clickable');
    touchTargets.forEach(target => {
        ensureMinimumTouchArea(target);
    });

    // Setup forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        setupMobileForm(form);
    });
}

function setupModalForMobile(modal) {
    if (!modal) return;

    // Add touch handling
    let startY = 0;
    let currentY = 0;

    modal.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    }, { passive: true });

    modal.addEventListener('touchmove', (e) => {
        currentY = e.touches[0].clientY;
        const deltaY = currentY - startY;

        // If scrolling down and at top of content, allow drag
        if (deltaY > 0 && modal.scrollTop === 0) {
            e.preventDefault();
            modal.style.transform = `translateY(${deltaY}px)`;
        }
    }, { passive: false });

    modal.addEventListener('touchend', () => {
        const deltaY = currentY - startY;
        
        if (deltaY > 100) {
            // Close modal if dragged down far enough
            closeModal(modal.closest('.modal'));
        } else {
            // Reset position
            modal.style.transform = '';
        }
    }, { passive: true });
}

function ensureMinimumTouchArea(element) {
    const rect = element.getBoundingClientRect();
    if (rect.width < 44 || rect.height < 44) {
        element.style.minWidth = '44px';
        element.style.minHeight = '44px';
    }
}

function setupMobileForm(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Ensure proper touch target size
        input.style.minHeight = '44px';
        
        // Improve keyboard experience
        if (input.type === 'text' || input.type === 'email' || input.type === 'tel') {
            input.setAttribute('inputmode', input.type === 'tel' ? 'numeric' : 'text');
        }
        
        // Add touch feedback
        input.addEventListener('touchstart', () => {
            input.style.transform = 'scale(0.98)';
        });
        
        input.addEventListener('touchend', () => {
            input.style.transform = '';
        });
    });
    
    // Handle form submission
    form.addEventListener('submit', (e) => {
        const submitButton = form.querySelector('[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.classList.add('loading');
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeMobileComponents);
