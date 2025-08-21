import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Award } from "lucide-react";
import heroImage from "@/assets/hero-tacografo.jpg";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-secondary/30 to-accent/20">
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70 z-10" />
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl">
          <div className="flex items-center space-x-2 mb-6">
            <Badge variant="secondary" className="flex items-center space-x-2 px-4 py-2 text-sm font-medium">
              <Shield className="h-4 w-4 text-primary" />
              <span>Autorizado INMETRO</span>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-2 px-4 py-2 text-sm">
              <Award className="h-4 w-4 text-primary" />
              <span>Certificação Técnica</span>
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Sulvel
            <span className="block text-primary">Tacógrafos</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            Especialistas em tacógrafos de velocidade com autorização oficial do INMETRO. 
            Garantindo precisão e conformidade para sua frota.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-8 py-4"
              onClick={() => window.open('https://wa.me/554835249958?text=Olá! Gostaria de solicitar um orçamento para tacógrafos.', '_blank')}
            >
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Solicitar Orçamento
            </Button>
            <Button variant="contact" size="lg" className="text-lg px-8 py-4" asChild>
              <a href="#servicos">
                Nossos Serviços
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
            <div className="flex items-center space-x-3 bg-background/80 backdrop-blur-sm rounded-lg p-4 shadow-soft">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Certificação INMETRO</h3>
                <p className="text-sm text-muted-foreground">Autorização oficial</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-background/80 backdrop-blur-sm rounded-lg p-4 shadow-soft">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Expertise Técnica</h3>
                <p className="text-sm text-muted-foreground">Anos de experiência</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-background/80 backdrop-blur-sm rounded-lg p-4 shadow-soft">
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Atendimento Ágil</h3>
                <p className="text-sm text-muted-foreground">Suporte completo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;