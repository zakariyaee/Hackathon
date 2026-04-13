import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-bold text-sm">CW</span>
          </div>
          <span className="text-lg font-heading font-bold text-foreground">Code Wars</span>
          <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium">2026</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
          <Link to="/#schedule" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Schedule</Link>
          <Link to="/#prizes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Prizes</Link>
          <Link to="/#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          <Link to="/track" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Suivre mon inscription</Link>
          <Link to="/register">
            <Button size="sm" className="group">
              Register
              <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 space-y-3 animate-fade-in">
          <Link to="/#about" className="block text-sm text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/#schedule" className="block text-sm text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)}>Schedule</Link>
          <Link to="/#prizes" className="block text-sm text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)}>Prizes</Link>
          <Link to="/#contact" className="block text-sm text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to="/track" className="block text-sm font-medium text-secondary" onClick={() => setIsOpen(false)}>Suivre mon inscription</Link>
          <Link to="/register" onClick={() => setIsOpen(false)}>
            <Button size="sm" className="w-full">Register</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
