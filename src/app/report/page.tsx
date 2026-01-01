import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
    {
        step: 1,
        title: "Gather Evidence",
        description: "Take screenshots of suspicious messages, emails, or profiles. Note down relevant details like phone numbers, UPI IDs, website URLs, and the date and time of the incident."
    },
    {
        step: 2,
        "title": "Contact Your Bank (for Financial Fraud)",
        "description": "If the incident involves financial loss, immediately contact your bank or the digital payment service provider to report the fraud, block your card, or freeze the account."
    },
    {
        step: 3,
        "title": "Report on the National Cyber Crime Reporting Portal",
        "description": "This is the official Government of India portal for reporting all types of cybercrime. You can file a complaint anonymously if you prefer."
    },
    {
        step: 4,
        "title": "Report to the Platform",
        "description": "Report the fraudulent profile, post, or message directly on the social media platform (like Facebook, Instagram, Twitter) or e-commerce site where the incident occurred."
    }
]

export default function ReportPage() {
    return (
        <div className="container py-12 md:py-16">
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline">How to Report Cybercrime</h1>
                <p className="text-lg text-muted-foreground mt-4">
                    If you are a victim of a cybercrime, taking swift action is crucial. Here is a step-by-step guide on how to report an incident.
                </p>
            </div>
            <div className="max-w-4xl mx-auto space-y-8">
                {steps.map((item) => (
                    <Card key={item.step}>
                        <CardHeader className="flex flex-row items-start gap-4">
                            <div className="flex-shrink-0 bg-primary text-primary-foreground h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg">
                                {item.step}
                            </div>
                            <div>
                                <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                                <p className="text-muted-foreground mt-1">{item.description}</p>
                            </div>
                        </CardHeader>
                    </Card>
                ))}

                <Card className="bg-primary/10 border-primary/20">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Official Reporting Portal</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            File your complaint directly with the Government of India's National Cyber Crime Reporting Portal.
                        </p>
                        <Button asChild>
                            <Link href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer">
                                Go to cybercrime.gov.in <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
