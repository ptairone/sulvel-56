import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Clock, Award, CheckCircle2 } from "lucide-react";

const About = () => {
  return (
    <section id="sobre" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Sobre a Sulvel
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Autorização INMETRO e Expertise Técnica
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A Sulvel Tacógrafos é uma empresa especializada em tacógrafos de velocidade, 
            oficialmente autorizada pelo INMETRO para garantir a conformidade e precisão dos equipamentos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader>
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-lg">Autorização INMETRO</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Certificação oficial que garante a conformidade e qualidade dos nossos serviços
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader>
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-lg">Equipe Especializada</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Profissionais qualificados e experientes em tacógrafos de velocidade
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader>
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-lg">Atendimento Rápido</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Processos otimizados para atender suas necessidades com agilidade
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader>
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-lg">Qualidade Garantida</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Comprometimento com a excelência em todos os nossos serviços
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="bg-background rounded-2xl shadow-medium p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Por que escolher a Sulvel?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Autorização Oficial</h4>
                    <p className="text-muted-foreground">Somos oficialmente autorizados pelo INMETRO, garantindo total conformidade regulatória.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Experiência Comprovada</h4>
                    <p className="text-muted-foreground">Anos de experiência no mercado de tacógrafos e instrumentos de medição.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Suporte Técnico Especializado</h4>
                    <p className="text-muted-foreground">Equipe técnica qualificada para atender todas as suas necessidades.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Processos Certificados</h4>
                    <p className="text-muted-foreground">Seguimos rigorosamente os padrões de qualidade exigidos pelo INMETRO.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-primary rounded-xl p-8 text-center text-primary-foreground">
              <Shield className="h-16 w-16 mx-auto mb-6" />
              <h4 className="text-2xl font-bold mb-4">Certificação INMETRO</h4>
              <p className="text-primary-foreground/90 mb-6">
                Nossa autorização oficial do Instituto Nacional de Metrologia, Qualidade e Tecnologia 
                garante que todos os nossos serviços atendem aos mais rigorosos padrões de qualidade.
              </p>
              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
                Autorizado Oficialmente
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;