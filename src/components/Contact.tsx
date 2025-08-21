import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  return (
    <section id="contato" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Contato
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Entre em Contato Conosco
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nossa equipe está pronta para atender suas necessidades em tacógrafos de velocidade. 
            Entre em contato e solicite seu orçamento.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="text-center shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader>
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-lg">Telefone</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base font-medium text-foreground mb-2">
                (11) 99999-9999
              </CardDescription>
              <CardDescription>
                Atendimento de segunda à sexta
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader>
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-lg">E-mail</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base font-medium text-foreground mb-2">
                contato@sulvel.com
              </CardDescription>
              <CardDescription>
                Resposta em até 24 horas
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader>
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-lg">Horário</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base font-medium text-foreground mb-2">
                8h às 18h
              </CardDescription>
              <CardDescription>
                Segunda à Sexta-feira
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Solicite seu Orçamento
            </h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" placeholder="Seu nome completo" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="company">Empresa</Label>
                  <Input id="company" placeholder="Nome da empresa" className="mt-2" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(11) 99999-9999" className="mt-2" />
                </div>
              </div>

              <div>
                <Label htmlFor="service">Tipo de Serviço</Label>
                <Input id="service" placeholder="Instalação, manutenção, calibração..." className="mt-2" />
              </div>

              <div>
                <Label htmlFor="message">Mensagem</Label>
                <Textarea 
                  id="message" 
                  placeholder="Descreva suas necessidades ou dúvidas sobre tacógrafos..." 
                  className="mt-2 min-h-[120px]"
                />
              </div>

              <Button variant="hero" size="lg" className="w-full">
                <Send className="h-5 w-5 mr-2" />
                Enviar Solicitação
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Localização e Atendimento
              </h3>
              <Card className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Nossa Sede</h4>
                      <p className="text-muted-foreground">
                        São Paulo - SP<br/>
                        Atendemos toda a região metropolitana
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-primary rounded-xl p-8 text-primary-foreground">
              <h4 className="text-xl font-bold mb-4">Atendimento Especializado</h4>
              <p className="text-primary-foreground/90 mb-6">
                Nossa equipe técnica está pronta para atender suas necessidades com a qualidade 
                e certificação que só a autorização INMETRO pode garantir.
              </p>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
                  Resposta Rápida
                </Badge>
                <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
                  Orçamento Gratuito
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;