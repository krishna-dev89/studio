import Link from "next/link";
import { Shield, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted py-8 mt-16 md:mt-24">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold font-headline text-lg">
              <Shield className="h-6 w-6 text-primary" />
              <span>CybersafeIndia</span>
            </Link>
            <p className="text-muted-foreground max-w-md text-center md:text-left text-sm">
              Securing Our Digital Future. An initiative to educate and empower Indian citizens against cyber threats.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 text-center md:text-left">
            <div className="grid gap-2">
              <h4 className="font-semibold">Quick Links</h4>
              <Link href="/learn" className="text-sm text-muted-foreground hover:text-primary">Learn</Link>
              <Link href="/threats" className="text-sm text-muted-foreground hover:text-primary">Future Threats</Link>
              <Link href="/report" className="text-sm text-muted-foreground hover:text-primary">Report Crime</Link>
            </div>
            <div className="grid gap-2">
              <h4 className="font-semibold">Legal</h4>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link>
              <Link href="/disclaimer" className="text-sm text-muted-foreground hover:text-primary">Disclaimer</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} CybersafeIndia. All rights reserved. <br/>
            <span className="font-semibold">Disclaimer:</span> This platform is for educational purposes and does not replace law enforcement.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
