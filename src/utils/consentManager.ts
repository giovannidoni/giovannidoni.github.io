
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    gaMeasurementId?: string;
  }
}

export const updateGoogleAnalyticsConsent = (accepted: boolean) => {
  if (typeof window.gtag === 'function') {
    window.gtag("consent", "update", {
      analytics_storage: accepted ? "granted" : "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });

    // After granting consent, reconfigure GA to start tracking
    if (accepted && window.gaMeasurementId) {
      // Send config again to reinitialize with granted consent
      window.gtag('config', window.gaMeasurementId, {
        'anonymize_ip': true,
        'page_path': window.location.pathname,
        'page_title': document.title
      });
    }

    console.log(`Google Analytics consent ${accepted ? 'granted' : 'denied'}`);
  }
};

export const initializeConsentFromStorage = () => {
  const consent = localStorage.getItem('cookie-consent');
  if (consent === 'accepted') {
    // Wait for gtag to be available before updating consent
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max (50 * 100ms)

    const checkGtag = () => {
      if (typeof window.gtag === 'function') {
        updateGoogleAnalyticsConsent(true);
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(checkGtag, 100);
      } else {
        console.warn('Google Analytics failed to load within timeout period');
      }
    };
    checkGtag();
  }
};
