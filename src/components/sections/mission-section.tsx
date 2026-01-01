import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target } from "lucide-react";

export function MissionSection() {
  return (
    <section className="container">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Mission</h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
                To build a cyber-resilient India by making cybersecurity accessible to everyone.
            </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                        <Users className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline">Understanding User Risks</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        We are dedicated to deeply understanding the unique cyber risks faced by different segments of Indian society—from students exploring the internet to seniors adopting digital payments. Our content is tailored to address these specific challenges.
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                        <Target className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline">Accessible Awareness</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        We believe knowledge is the best defense. Our goal is to break down complex cybersecurity topics into simple, actionable guidance that anyone can understand and apply, regardless of their technical expertise.
                    </p>
                </CardContent>
            </Card>
        </div>
    </section>
  )
}
