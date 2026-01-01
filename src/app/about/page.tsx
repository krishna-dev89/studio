import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
    return (
        <div className="container py-12 md:py-16">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">About CybersafeIndia</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>CybersafeIndia is a public awareness initiative designed to empower every Indian citizen with the knowledge and tools to navigate the digital world safely and securely.</p>
                    <p>Our mission is to make cybersecurity accessible, understandable, and actionable for everyone—from young students and their families to seniors embracing digital services for the first time.</p>
                    <p>We believe that a cyber-resilient India is built on the foundation of an informed public. By providing clear guides, timely information, and easy-to-use resources, we aim to foster a culture of digital responsibility and proactive defense against online threats.</p>
                    <p>This platform is a not-for-profit educational effort and is not affiliated with any government body, though it is inspired by the vision of a Digital India.</p>
                </CardContent>
            </Card>
        </div>
    );
}
