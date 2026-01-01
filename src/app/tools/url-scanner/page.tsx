import { UrlScannerClient } from "./components/url-scanner-client";

export default function UrlScannerPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">URL Safety Scanner</h1>
        <p className="text-lg text-muted-foreground mt-4">
          Got a suspicious link? Paste it here to check for phishing, malware, and other security risks before you click.
        </p>
      </div>
      <UrlScannerClient />
    </div>
  );
}
