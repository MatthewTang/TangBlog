import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Github, Linkedin, Mail } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#blog", label: "Blog" },
    { href: "#contact", label: "Contact" }
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/matthewtang", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/matthew-tang-siu-hin/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hello@matthewtang.xyz", label: "Email" }
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-xl font-semibold text-slate-800 hover:text-blue-600 transition-colors">
                Matthew
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex space-x-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4 text-slate-600" />
              </a>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-6 mt-6">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className="text-lg text-slate-600 hover:text-blue-600 transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  ))}
                  <div className="flex space-x-4 pt-6 border-t">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5 text-slate-600" />
                      </a>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
