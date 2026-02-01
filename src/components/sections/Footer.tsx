import { siteConfig, footer } from "@/data/content";

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and copyright */}
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center group-hover:bg-accent-cyan transition-colors">
                <span className="text-background font-bold text-sm">PS</span>
              </div>
              <span className="font-semibold text-foreground">
                {siteConfig.name}
              </span>
            </a>
            <span className="text-muted-foreground text-sm hidden sm:inline">
              |
            </span>
            <span className="text-muted-foreground text-sm">
              {footer.copyright}
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {footer.links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            {footer.social.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-sm text-muted-foreground hover:text-accent-cyan transition-colors"
                aria-label={social.name}
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
