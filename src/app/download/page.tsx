
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { promises as fs } from 'fs';
import path from 'path';

async function getFileContent(filePath: string) {
    try {
        const fullPath = path.join(process.cwd(), filePath);
        const content = await fs.readFile(fullPath, 'utf-8');
        return content;
    } catch (error) {
        console.error(`Could not read file: ${filePath}`, error);
        return `Error: Could not load file content for ${filePath}.`;
    }
}

const filePaths = [
  ".env",
  "README.md",
  "apphosting.yaml",
  "components.json",
  "next.config.ts",
  "package.json",
  "src/ai/dev.ts",
  "src/ai/flows/analyze-message.ts",
  "src/ai/flows/check-phone-risk.ts",
  "src/ai/flows/explain-future-threats.ts",
  "src/ai/flows/scan-url-safety.ts",
  "src/ai/genkit.ts",
  "src/ai/tools/locate-phone-number.ts",
  "src/app/about/page.tsx",
  "src/app/actions.ts",
  "src/app/contact/page.tsx",
  "src/app/disclaimer/page.tsx",
  "src/app/download/page.tsx",
  "src/app/globals.css",
  "src/app/layout.tsx",
  "src/app/learn/page.tsx",
  "src/app/page.tsx",
  "src/app/quiz/page.tsx",
  "src/app/report/page.tsx",
  "src/app/threats/page.tsx",
  "src/app/tools/ai-content-detector/components/ai-content-detector-client.tsx",
  "src/app/tools/ai-content-detector/page.tsx",
  "src/app/tools/message-scanner/actions.ts",
  "src/app/tools/message-scanner/components/scam-detector-client.tsx",
  "src/app/tools/message-scanner/page.tsx",
  "src/app/tools/page.tsx",
  "src/app/tools/phone-checker/actions.ts",
  "src/app/tools/phone-checker/components/phone-checker-client.tsx",
  "src/app/tools/phone-checker/page.tsx",
  "src/app/tools/url-scanner/actions.ts",
  "src/app/tools/url-scanner/components/url-scanner-client.tsx",
  "src/app/tools/url-scanner/page.tsx",
  "src/components/ai/ai-threat-explainer.tsx",
  "src/components/layout/footer.tsx",
  "src/components/layout/header.tsx",
  "src/components/newsletter-form.tsx",
  "src/components/quiz/quiz-client.tsx",
  "src/components/sections/common-threats-section.tsx",
  "src/components/sections/hero-section.tsx",
  "src/components/sections/mission-section.tsx",
  "src/components/sections/newsletter-section.tsx",
  "src/components/sections/safe-habits-section.tsx",
  "src/components/sections/why-us-section.tsx",
  "src/components/ui/accordion.tsx",
  "src/components/ui/alert-dialog.tsx",
  "src/components/ui/alert.tsx",
  "src/components/ui/avatar.tsx",
  "src/components/ui/badge.tsx",
  "src/components/ui/button.tsx",
  "src/components/ui/calendar.tsx",
  "src/components/ui/card.tsx",
  "src/components/ui/carousel.tsx",
  "src/components/ui/chart.tsx",
  "src/components/ui/checkbox.tsx",
  "src/components/ui/collapsible.tsx",
  "src/components/ui/dialog.tsx",
  "src/components/ui/dropdown-menu.tsx",
  "src/components/ui/form.tsx",
  "src/components/ui/input.tsx",
  "src/components/ui/label.tsx",
  "src/components/ui/menubar.tsx",
  "src/components/ui/popover.tsx",
  "src/components/ui/progress.tsx",
  "src/components/ui/radio-group.tsx",
  "src/components/ui/scroll-area.tsx",
  "src/components/ui/select.tsx",
  "src/components/ui/separator.tsx",
  "src/components/ui/sheet.tsx",
  "src/components/ui/sidebar.tsx",
  "src/components/ui/skeleton.tsx",
  "src/components/ui/slider.tsx",
  "src/components/ui/switch.tsx",
  "src/components/ui/table.tsx",
  "src/components/ui/tabs.tsx",
  "src/components/ui/textarea.tsx",
  "src/components/ui/toast.tsx",
  "src/components/ui/toaster.tsx",
  "src/components/ui/tooltip.tsx",
  "src/hooks/use-mobile.tsx",
  "src/hooks/use-toast.ts",
  "src/lib/placeholder-images.json",
  "src/lib/placeholder-images.ts",
  "src/lib/utils.ts",
  "tailwind.config.ts",
  "tsconfig.json"
];

async function FileDisplay({ filePath }: { filePath: string }) {
    const content = await getFileContent(filePath);
    return (
        <AccordionItem value={filePath}>
            <AccordionTrigger>{filePath}</AccordionTrigger>
            <AccordionContent>
                <ScrollArea className="h-96 w-full rounded-md border bg-muted">
                    <pre className="p-4 text-sm font-code">{content}</pre>
                </ScrollArea>
            </AccordionContent>
        </AccordionItem>
    );
}

export default async function DownloadPage() {
    return (
        <div className="container py-12 md:py-16">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Download Project Files</CardTitle>
                    <p className="text-muted-foreground pt-2">
                        Below is a list of all files in this prototype. You can expand each section to view and copy the full source code.
                    </p>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {filePaths.map(filePath => <FileDisplay key={filePath} filePath={filePath} />)}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}
