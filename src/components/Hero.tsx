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
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              Solicitar Orçamento
            </Button>
            <Button variant="contact" size="lg" className="text-lg px-8 py-4">
              Nossos Serviços
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