import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, MessageSquareIcon, Link as LinkIcon, Smartphone, FileImage } from "lucide-react";

const tools = [
  {
    href: "/tools/message-scanner",
    icon: MessageSquareIcon,
    title: "Message Scam Detector",
    description: "Paste a suspicious SMS, email, or chat message to check for signs of a scam.",
    status: "active"
  },
  {
    href: "/tools/phone-checker",
    icon: Smartphone,
    title: "Phone Number Risk Checker",
    description: "Enter a phone number to see if it has been reported for spam or fraudulent activity.",
    status: "active"
  },
  {
    href: "/tools/url-scanner",
    icon: LinkIcon,
    title: "URL Safety Scanner",
    description: "Check a website link for phishing, malware, or other security red flags before you click.",
    status: "active"
  },
  {
    href: "#",
    icon: FileImage,
    title: "AI Content Detector",
    description: "Upload an image or video to analyze it for indicators of AI generation or deepfakes.",
    status: "soon"
  },
]

export default function ToolsPage() {
  return (
    <div className="bg-background">
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Security Tools</h1>
          <p className="text-lg text-muted-foreground mt-4">
            Use our free tools to check for common scams and digital threats. Get instant guidance to help you stay safe online.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {tools.map((tool) => (
            <Card key={tool.title} className="flex flex-col">
              <CardHeader>
                  <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                          <tool.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="font-headline text-xl">{tool.title}</CardTitle>
                        <CardDescription className="mt-1">{tool.description}</CardDescription>
                      </div>
                  </div>
              </CardHeader>
              <CardContent className="flex-grow flex items-end">
                {tool.status === 'active' ? (
                  <Button asChild>
                    <Link href={tool.href}>
                      Open Tool <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button disabled variant="secondary">
                    Coming Soon
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center mt-16">
          <Card className="bg-muted border-dashed">
            <CardHeader>
              <CardTitle className="font-headline text-lg">Important Disclaimer</CardTitle>
              <CardContent className="text-muted-foreground text-sm p-0 pt-2">
                <p>These tools provide automated guidance and are not 100% accurate. Always be cautious and use your judgment. CybersafeIndia is not responsible for any actions taken based on the results.</p>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
