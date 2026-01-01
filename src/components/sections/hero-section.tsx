import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function HeroSection() {
  const heroImage = PlaceHolderImages.find(p => p.id === "hero-image-1");
  return (
    <section className="container pt-12">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
            Securing India’s Digital Future, Together.
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            As India embraces the digital age, cyber risks are growing. CybersafeIndia is your trusted guide to navigating the online world safely and responsibly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/learn">Start Learning</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/quiz">Test Your Knowledge</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-80 lg:h-[400px] w-full">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover rounded-xl shadow-lg"
                data-ai-hint={heroImage.imageHint}
              />
            )}
        </div>
      </div>
    </section>
  );
}
