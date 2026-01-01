import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, AtSign, CreditCard, ShieldCheck } from "lucide-react";

const guides = [
  {
    id: "password-safety",
    icon: Lock,
    title: "The Ultimate Guide to Password Safety",
    content: "Strong passwords are your first line of defense. A strong password should be at least 12 characters long and include a mix of uppercase letters, lowercase letters, numbers, and symbols. Avoid using personal information like birthdays or names. Consider using a password manager to generate and store complex passwords securely. Enable Two-Factor Authentication (2FA) wherever possible for an extra layer of security."
  },
  {
    id: "social-media-safety",
    icon: AtSign,
    title: "How to Stay Safe on Social Media",
    content: "Be mindful of what you share online. Adjust your privacy settings to control who sees your posts. Be wary of friend requests from strangers. Think twice before clicking on links shared in messages, even from friends, as their accounts could be compromised. Regularly review the apps and services that have access to your social media accounts and remove any you don't recognize or use."
  },
  {
    id: "online-transactions",
    icon: CreditCard,
    title: "Best Practices for Safe Online Transactions",
    content: "When shopping online, ensure the website's URL starts with 'https://'—the 's' stands for secure. Look for a padlock icon in the address bar. Avoid using public Wi-Fi for financial transactions. Use credit cards instead of debit cards for better fraud protection. Regularly monitor your bank and card statements for any unauthorized charges."
  },
  {
    id: "identifying-scams",
    icon: ShieldCheck,
    title: "A Beginner's Guide to Identifying Scams",
    content: "Scammers often create a sense of urgency, pressuring you to act quickly. Be suspicious of unsolicited emails, messages, or calls asking for personal information or money. Check for poor grammar and spelling in communications. Hover over links before clicking to see the actual destination URL. If an offer seems too good to be true, it probably is."
  },
]

export default function LearnPage() {
    return (
        <div className="container py-12 md:py-16">
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline">Learn Safe Digital Habits</h1>
                <p className="text-lg text-muted-foreground mt-4">
                    Empower yourself with knowledge. These guides provide simple, actionable steps to enhance your online security.
                </p>
            </div>
            <div className="max-w-4xl mx-auto space-y-8">
                {guides.map((guide) => (
                    <Card key={guide.id} id={guide.id}>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-3 rounded-lg">
                                    <guide.icon className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-2xl">{guide.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed">{guide.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
