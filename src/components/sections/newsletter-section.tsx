import { NewsletterForm } from "@/components/newsletter-form";

export function NewsletterSection() {
  return (
    <section className="container">
      <div className="bg-primary text-primary-foreground rounded-xl p-8 md:p-12 lg:p-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Stay Updated, Stay Safe</h2>
            <p className="mt-2 opacity-80 max-w-lg">
              Subscribe to our newsletter for the latest cybersecurity news, threat alerts, and safety tips delivered directly to your inbox.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>
    </section>
  )
}
