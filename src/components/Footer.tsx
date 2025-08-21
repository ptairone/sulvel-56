import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 2L26 8V16C26 22 20 28 16 30C12 28 6 22 6 16V8L16 2Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
                  <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M16 12V16L19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">Sulvel Tacógrafos</h3>
              </div>
            </div>
            <p className="text-background/80 mb-4">
              Especialistas em tacógrafos de velocidade com autorização oficial do INMETRO. 
              Garantindo precisão e conformidade para sua frota.
            </p>
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
              <Shield className="h-4 w-4 mr-2" />
              Autorizado INMETRO
            </Badge>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2 text-background/80">
              <li>Instalação de Tacógrafos</li>
              <li>Manutenção e Calibração</li>
              <li>Verificação e Certificação</li>
              <li>Reparo e Ajustes</li>
              <li>Consultoria Técnica</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-background/80">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-background/80">contato@sulvel.com</span>
              </div>
              <div className="text-background/80">
                <strong>Horário:</strong> Segunda à Sexta, 8h às 18h
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center">
          <p className="text-background/60">
            © {new Date().getFullYear()} Sulvel Tacógrafos. Todos os direitos reservados. | Autorizado INMETRO
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;