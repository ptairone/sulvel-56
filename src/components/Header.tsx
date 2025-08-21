import { Button } from "@/components/ui/button";
import { Phone, Mail, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteConfig } from "@/hooks/useSiteConfig";

const Header = () => {
  const { config, loading } = useSiteConfig();
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground p-2 rounded-lg">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2L26 8V16C26 22 20 28 16 30C12 28 6 22 6 16V8L16 2Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
                <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M16 12V16L19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Sulvel</h1>
              <p className="text-sm text-muted-foreground">Tacógrafos</p>
            </div>
          </div>
          
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#inicio" className="text-foreground hover:text-primary transition-colors font-medium">
                Início
              </a>
              <a href="#sobre" className="text-foreground hover:text-primary transition-colors font-medium">
                Sobre
              </a>
              <a href="#servicos" className="text-foreground hover:text-primary transition-colors font-medium">
                Serviços
              </a>
              <a href="#contato" className="text-foreground hover:text-primary transition-colors font-medium">
                Contato
              </a>
              <Link to="/auth" className="text-muted-foreground hover:text-primary transition-colors">
                <Settings className="h-4 w-4" />
              </Link>
            </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4 text-sm">
              {!loading && config && (
                <>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{config.telefone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{config.email}</span>
                  </div>
                </>
              )}
            </div>
            <Button variant="cta" size="sm">
              Orçamento
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;