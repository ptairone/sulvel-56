import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gauge, Settings, FileCheck, Wrench, Phone, CheckCircle } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Gauge,
      title: "Instalação de Tacógrafos",
      description: "Instalação profissional de tacógrafos de velocidade com certificação INMETRO",
      features: ["Instalação certificada", "Calibração precisa", "Documentação completa"]
    },
    {
      icon: Settings,
      title: "Manutenção e Calibração",
      description: "Serviços de manutenção preventiva e calibração para garantir precisão",
      features: ["Manutenção preventiva", "Calibração oficial", "Relatórios técnicos"]
    },
    {
      icon: FileCheck,
      title: "Verificação e Certificação",
      description: "Verificação oficial e emissão de certificados de conformidade",
      features: ["Verificação INMETRO", "Certificados oficiais", "Conformidade garantida"]
    },
    {
      icon: Wrench,
      title: "Reparo e Ajustes",
      description: "Reparo especializado e ajustes técnicos em tacógrafos",
      features: ["Reparo especializado", "Peças originais", "Garantia de qualidade"]
    }
  ];

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
          {services.map((service, index) => (
            <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
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
                <Button variant="cta" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Solicitar Serviço
                </Button>
              </CardContent>
            </Card>
          ))}
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
            <Button variant="hero" size="lg">
              Falar com Especialista
            </Button>
            <Button variant="contact" size="lg">
              Ver Todos os Serviços
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;