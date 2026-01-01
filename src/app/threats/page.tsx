import { AiThreatExplainer } from "@/components/ai/ai-threat-explainer";

export default function FutureThreatsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">The Horizon of Cyber Threats</h1>
        <p className="text-lg text-muted-foreground mt-4">
          The digital world is constantly evolving, and so are the threats within it. Understand the next wave of cybersecurity challenges with our AI-powered explainer. Select a topic to get a simple, clear explanation.
        </p>
      </div>
      <AiThreatExplainer />
    </div>
  );
}
