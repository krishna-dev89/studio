import { ScamDetectorClient } from "./components/scam-detector-client";

export default function MessageScannerPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Message Scam Detector</h1>
        <p className="text-lg text-muted-foreground mt-4">
          Received a suspicious message? Paste it below to check for common scam patterns. Our AI will analyze the text for red flags like urgent requests, fake offers, and suspicious links.
        </p>
      </div>
      <ScamDetectorClient />
    </div>
  );
}
