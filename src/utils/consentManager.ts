
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const updateGoogleAnalyticsConsent = (accepted: boolean) => {
  if (typeof window.gtag === 'function') {
    window.gtag("consent", "update", {
      analytics_storage: accepted ? "granted" : "denied",
      ad_storage: accepted ? "denied" : "denied",
      ad_user_data: accepted ? "granted" : "denied",
      ad_personalization: accepted ? "denied" : "denied",
    });
    
    console.log(`Google Analytics consent ${accepted ? 'granted' : 'denied'}`);
  }
};

export const initializeConsentFromStorage = () => {
  const consent = localStorage.getItem('cookie-consent');
  if (consent === 'accepted') {
    updateGoogleAnalyticsConsent(true);
  }
};
