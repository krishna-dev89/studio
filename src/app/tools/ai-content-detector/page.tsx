import { AiContentDetectorClient } from "./components/ai-content-detector-client";

export default function AiContentDetectorPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">AI Content Detector</h1>
        <p className="text-lg text-muted-foreground mt-4">
          Worried a photo or video might be a deepfake? Our AI analysis tool will check for signs of digital manipulation. (This feature is coming soon!)
        </p>
      </div>
      <AiContentDetectorClient />
    </div>
  );
}
