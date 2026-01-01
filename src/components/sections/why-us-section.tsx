import { MapPin, BookOpen, Heart, Users } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "India-Focused",
    description: "Content and examples tailored to the Indian digital landscape, including UPI and local platforms.",
  },
  {
    icon: BookOpen,
    title: "Simple Language",
    description: "We avoid technical jargon, making cybersecurity concepts easy for everyone to grasp.",
  },
  {
    icon: Heart,
    title: "Prevention-Driven",
    description: "Our primary goal is to equip you with the knowledge to prevent incidents before they happen.",
  },
  {
    icon: Users,
    title: "Community Learning",
    description: "A platform for all Indians—students, parents, and seniors—to learn and grow together safely.",
  },
];

export function WhyUsSection() {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Why CybersafeIndia is Different</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
            Our approach is built on simplicity, relevance, and a commitment to proactive education.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold font-headline">{feature.title}</h3>
              <p className="text-muted-foreground mt-1 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
