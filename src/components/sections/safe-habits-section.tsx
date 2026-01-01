import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Lock, ShieldCheck, CreditCard, AtSign } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const habits = [
  {
    icon: Lock,
    title: "Password Safety",
    description: "Learn how to create and manage strong, unique passwords for all your accounts.",
    link: "/learn#password-safety",
  },
  {
    icon: AtSign,
    title: "Social Media Safety",
    description: "Protect your privacy and personal information on social media platforms.",
    link: "/learn#social-media-safety",
  },
  {
    icon: CreditCard,
    title: "Safe Online Transactions",
    description: "Master the best practices for secure online shopping and digital payments.",
    link: "/learn#online-transactions",
  },
  {
    icon: ShieldCheck,
    title: "Identifying Scams",
    description: "Develop the skills to spot and avoid phishing emails, fake websites, and other online scams.",
    link: "/learn#identifying-scams",
  },
];

export function SafeHabitsSection() {
  return (
    <section className="container">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Learn Safe Digital Habits</h2>
        <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
          Simple guides to help you build a strong foundation for digital safety.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {habits.map((habit) => (
          <Card key={habit.title} className="flex flex-col">
            <CardHeader>
              <div className="bg-primary/10 p-3 rounded-lg w-fit">
                <habit.icon className="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <CardTitle className="font-headline text-lg mb-2">{habit.title}</CardTitle>
                <p className="text-muted-foreground text-sm">{habit.description}</p>
            </CardContent>
            <CardFooter>
                 <Button variant="ghost" asChild className="p-0 h-auto">
                    <Link href={habit.link} className="text-primary hover:text-primary/80">
                        Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
