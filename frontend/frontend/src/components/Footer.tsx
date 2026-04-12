import { Mail, Phone, Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground py-14">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-primary-foreground/15 rounded-lg flex items-center justify-center">
                <span className="font-heading font-bold text-sm">CW</span>
              </div>
              <h3 className="font-heading font-bold text-lg">Code Wars 2026</h3>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              An event organized by the Computer Science Club of ENSA Tetouan.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm tracking-wider uppercase opacity-80">Contact</h4>
            <div className="space-y-3 text-sm opacity-70">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <span>codewars@ensatetouan.ma</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <span>+212 6 00 00 00 00</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm tracking-wider uppercase opacity-80">Follow Us</h4>
            <div className="flex gap-3">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/15 mt-10 pt-6 text-center text-sm opacity-50">
          © 2026 Code Wars — ENSA Tetouan. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
