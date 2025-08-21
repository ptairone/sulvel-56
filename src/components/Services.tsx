import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gauge, Settings, FileCheck, Wrench, Phone, CheckCircle, Shield, Award, Clipboard, Hammer } from "lucide-react";
import { useSiteConfig } from "@/hooks/useSiteConfig";

const iconMap: { [key: string]: any } = {
  Gauge,
  Settings,
  FileCheck,
  Wrench,
  Shield,
  Award,
  Clipboard,
  Tool: Hammer
};

const Services = () => {
  const { services, loading } = useSiteConfig();

  if (loading) {
    return (
      <section id="servicos" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-1/3 mx-auto"></div>
              <div className="h-4 bg-muted rounded w-2/3 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="servicos" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Nossos Serviços
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Serviços Especializados em Tacógrafos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Oferecemos uma gama completa de serviços para tacógrafos de velocidade, 
            todos com certificação INMETRO e a garantia de qualidade Sulvel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Settings;
            return (
              <Card key={service.id} className="shadow-soft hover:shadow-medium transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="cta" 
                    className="w-full"
                    onClick={() => window.open(`https://wa.me/554835249958?text=Olá! Gostaria de solicitar o serviço: ${service.title}`, '_blank')}
                  >
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    Solicitar Serviço
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-gradient-subtle rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-6">
            Precisa de um Serviço Personalizado?
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nossa equipe técnica está preparada para atender necessidades específicas 
            e desenvolver soluções customizadas para sua empresa.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => window.open('https://wa.me/554835249958?text=Olá! Preciso de um serviço personalizado para tacógrafos. Gostaria de falar com um especialista.', '_blank')}
            >
              Falar com Especialista
            </Button>
            <Button 
              variant="contact" 
              size="lg"
              onClick={() => window.open('https://wa.me/554835249958?text=Olá! Gostaria de conhecer todos os serviços disponíveis para tacógrafos.', '_blank')}
            >
              Ver Todos os Serviços
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;