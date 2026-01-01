"use client";

import Link from "next/link";
import { Menu, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learn" },
  { href: "/tools", label: "Security Tools"},
  { href: "/threats", label: "Future Threats" },
  { href: "/quiz", label: "Quiz" },
  { href: "/report", label: "Report Crime" },
];

export function Header() {
  const pathname = usePathname();

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn("flex items-center gap-4 lg:gap-6", className)}>
      {navLinks.map((link) => {
        const isActive = pathname === '/' ? pathname === link.href : pathname.startsWith(link.href) && link.href !== '/';
        const isHome = link.href === '/';
        const isCurrentPage = isHome ? pathname === '/' : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isCurrentPage ? "text-primary font-semibold" : "text-muted-foreground"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-6 flex items-center">
          <Link href="/" className="flex items-center gap-2 font-bold font-headline">
            <Shield className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline-block text-lg">CybersafeIndia</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <NavLinks className="hidden md:flex" />
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Link href="/" className="flex items-center gap-2 font-bold font-headline text-lg mb-6">
                  <Shield className="h-6 w-6 text-primary" />
                  <span>CybersafeIndia</span>
                </Link>
                <nav className="grid gap-6 text-lg font-medium">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                       <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <Button asChild>
            <Link href="/report">Report Now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
