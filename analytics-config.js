// CONFIGURAÇÃO DO GOOGLE ANALYTICS
// ======================================

// INSTRUÇÕES PARA CONFIGURAR:
// 1. Substitua 'G-XXXXXXXXXX' pelo seu ID do Google Analytics 4
// 2. Substitua 'GTM-XXXXXXX' pelo seu ID do Google Tag Manager
// 3. Atualize os arquivos index.html com os IDs corretos

// CONFIGURAÇÕES ATUAIS:
const ANALYTICS_CONFIG = {
    // Google Analytics 4
    GA4_ID: 'G-XXXXXXXXXX', // Substitua pelo seu ID real
    
    // Google Tag Manager
    GTM_ID: 'GTM-XXXXXXX', // Substitua pelo seu ID real
    
    // Eventos personalizados
    CUSTOM_EVENTS: {
        AI_TEST: 'ai_test_clicked',
        BUTTON_CLICK: 'button_click',
        FORM_SUBMIT: 'form_submit',
        PAGE_VIEW: 'page_view',
        TIME_ON_PAGE: 'time_on_page'
    },
    
    // Categorias de eventos
    EVENT_CATEGORIES: {
        AI: 'AI',
        ENGAGEMENT: 'Engagement',
        LEAD_GENERATION: 'Lead Generation'
    }
};

// FUNÇÕES DE TRACKING PERSONALIZADAS
function trackCustomEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
}

function trackPageView(pageTitle, pageLocation) {
    trackCustomEvent(ANALYTICS_CONFIG.CUSTOM_EVENTS.PAGE_VIEW, {
        'page_title': pageTitle,
        'page_location': pageLocation
    });
}

function trackButtonClick(buttonLabel, category = 'Engagement') {
    trackCustomEvent(ANALYTICS_CONFIG.CUSTOM_EVENTS.BUTTON_CLICK, {
        'event_category': category,
        'event_label': buttonLabel,
        'value': 1
    });
}

function trackFormSubmission(formName) {
    trackCustomEvent(ANALYTICS_CONFIG.CUSTOM_EVENTS.FORM_SUBMIT, {
        'event_category': ANALYTICS_CONFIG.EVENT_CATEGORIES.LEAD_GENERATION,
        'event_label': formName,
        'value': 1
    });
}

// EXPORTAR CONFIGURAÇÕES
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ANALYTICS_CONFIG;
} else {
    window.ANALYTICS_CONFIG = ANALYTICS_CONFIG;
    window.trackCustomEvent = trackCustomEvent;
    window.trackPageView = trackPageView;
    window.trackButtonClick = trackButtonClick;
    window.trackFormSubmission = trackFormSubmission;
}