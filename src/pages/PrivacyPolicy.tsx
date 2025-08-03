import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
            <p className="text-muted-foreground">Last updated: August 3, 2025</p>
          </CardHeader>
          
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <p>
              This Privacy Policy explains how we collect and use data on this website. By giving your consent, you agree to the practices described below.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">1. Data We Collect</h2>
            
            <p>
              <strong>Cookies & Similar Technologies:</strong> With your explicit consent, we use cookies to gather information about site usage and visitor behavior. No personal data beyond basic site metrics is stored.
            </p>
            
            <p>
              <strong>IP Addresses:</strong> We collect and analyze your IP address solely to estimate general geographic location (city, region, country). IP anonymization is applied immediately upon collection.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">2. Purpose of Data Collection</h2>
            
            <p>
              <strong>Analytics:</strong> The information collected (cookies, anonymized IPs) is used only to generate aggregate reports on:
            </p>
            
            <ul className="list-disc ml-6 mb-4">
              <li>Number of visitors and page views</li>
              <li>Geographic distribution of site traffic</li>
              <li>Browsing patterns and device types</li>
            </ul>
            
            <p>
              No data is used for marketing, profiling, or sharing with third parties beyond the analytics provider under their standard data-processing agreement.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">3. Google Analytics</h2>
            
            <p>
              This site uses Google Analytics (GA4) to produce analytics reports. We have configured GA4 to:
            </p>
            
            <p>
              <strong>Anonymize IP Addresses:</strong> GA's anonymize_ip feature is enabled, masking the final octet of your IP address before storage.
            </p>
            
            <p>
              <strong>Limit Data Retention:</strong> Data retention in Google Analytics is set to the minimum term allowed (2 months).
            </p>
            
            <p>
              <strong>Data Processing Amendment:</strong> We have accepted Google's Data Processing Amendment to ensure all data handling meets EU/UKGDPR requirements.
            </p>
            
            <p>
              For more details, see <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google's Privacy Policy</a>.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">4. Consent</h2>
            
            <p>
              Before any analytics cookies or scripts load, a consent banner will appear. No analytics cookies are placed without your affirmative opt‑in.
            </p>
            
            <p>
              You may withdraw or modify your consent at any time by clicking the "Cookie Settings" link in the footer.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">5. Your Rights</h2>
            
            <p>
              Under EU/UK data protection laws, you have the right to:
            </p>
            
            <ul className="list-disc ml-6 mb-4">
              <li>Access the data we hold about you</li>
              <li>Correct any inaccurate data</li>
              <li>Erase or restrict processing of your data</li>
              <li>Opt Out of analytics tracking entirely (for example, by installing <a href="https://tools.google.com/dlpage/gaoptout/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google's opt‑out browser add‑on</a>)</li>
            </ul>
            
            <p>
              To exercise any of these rights, please contact us at: <a href="mailto:privacy@example.com" className="text-primary hover:underline">privacy@example.com</a>
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">6. Changes to This Policy</h2>
            
            <p>
              We may update this policy occasionally. When significant changes occur, we will post a prominent notice on the site and update the "Last updated" date above.
            </p>
            
            <p>
              If you have questions about this policy, please reach out via links provided on the main site.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;