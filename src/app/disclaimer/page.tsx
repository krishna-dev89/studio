import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DisclaimerPage() {
    return (
        <div className="container py-12 md:py-16">
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Disclaimer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>The information provided on the CybersafeIndia website is for educational and general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.</p>
                    <p>Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.</p>
                    <p>This platform is an educational resource and does not, under any circumstances, replace the need to contact official law enforcement agencies. All cybercrime incidents should be reported to the appropriate authorities through official channels, such as the National Cyber Crime Reporting Portal (cybercrime.gov.in).</p>
                </CardContent>
            </Card>
        </div>
    );
}
