import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fish, CreditCard, KeyRound, User, MessageCircle, EyeOff } from "lucide-react";
import Link from "next/link";

const threats = [
  {
    icon: Fish,
    title: "Phishing",
    description: "Fraudulent attempts to obtain sensitive information like usernames and passwords by pretending to be a trustworthy entity.",
  },
  {
    icon: CreditCard,
    title: "UPI & Digital Payment Fraud",
    description: "Scams targeting users of digital payment platforms, often tricking them into authorizing payments or revealing OTPs.",
  },
  {
    icon: KeyRound,
    title: "Weak Passwords",
    description: "Using simple, easy-to-guess passwords that make your accounts vulnerable to unauthorized access.",
  },
  {
    icon: User,
    title: "Identity Theft",
    description: "When someone steals your personal information to commit fraud, such as opening accounts in your name.",
  },
  {
    icon: MessageCircle,
    title: "Cyberbullying",
    description: "Harassment or bullying that takes place over digital devices like phones, computers, and tablets.",
  },
  {
    icon: EyeOff,
    title: "Privacy Leaks",
    description: "The unintentional or intentional exposure of sensitive information to an untrusted environment.",
  },
];

export function CommonThreatsSection() {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Common Cyber Threats</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
            Stay informed about prevalent cyber risks to better protect yourself and your family.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {threats.map((threat) => (
            <Card key={threat.title} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <threat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-headline">{threat.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{threat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
