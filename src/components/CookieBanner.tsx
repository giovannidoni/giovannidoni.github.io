
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Cookie } from "lucide-react";
import { updateGoogleAnalyticsConsent, initializeConsentFromStorage } from "@/utils/consentManager";

const COOKIE_CONSENT_KEY = "cookie-consent";

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Initialize consent from storage on app load
    initializeConsentFromStorage();
    
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay to avoid flash on page load
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    updateGoogleAnalyticsConsent(true);
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    updateGoogleAnalyticsConsent(false);
    setShowBanner(false);
  };

  const handleClose = () => {
    // If they close without choosing, we'll ask again next time
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-in-right">
      <Card className="bg-background/95 backdrop-blur-sm border-border shadow-elegant">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Cookie className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-sm text-foreground">
                    We use cookies
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    We use analytics cookies to understand how you use our site only if you allow us to.{" "}
                    <a href="/privacy" className="text-primary hover:underline">Read our Privacy Policy</a>.
                  </p>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="flex gap-2 pt-1">
                <Button
                  onClick={handleAccept}
                  size="sm"
                  className="h-7 px-3 text-xs"
                >
                  Accept
                </Button>
                <Button
                  onClick={handleDecline}
                  variant="outline"
                  size="sm"
                  className="h-7 px-3 text-xs"
                >
                  Decline
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieBanner;
