import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
    return (
        <div className="container py-12 md:py-16">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Contact Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>For general inquiries, feedback, or partnership opportunities, please reach out to us. We value your input in making this platform better.</p>
                    <p className="font-semibold">Email: <a href="mailto:contact@cybersafeindia.example.org" className="text-primary hover:underline">contact@cybersafeindia.example.org</a></p>
                    <p><strong>Please Note:</strong> We are an educational platform. For reporting cybercrimes, please use the <a href="/report" className="text-primary hover:underline">official channels</a> outlined on our reporting page. We cannot process or act on individual crime reports.</p>
                </CardContent>
            </Card>
        </div>
    );
}
