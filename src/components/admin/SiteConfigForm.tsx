import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Phone, Mail, Clock, Save } from "lucide-react";

interface SiteConfig {
  telefone: string;
  email: string;
  horario_funcionamento: string;
}

const SiteConfigForm = () => {
  const [loading, setLoading] = useState(false);
  const [configId, setConfigId] = useState<string | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SiteConfig>();

  useEffect(() => {
    const loadConfig = async () => {
      const { data, error } = await supabase
        .from('site_config')
        .select('*')
        .single();

      if (error) {
        console.error('Erro ao carregar configurações:', error);
        return;
      }

      if (data) {
        setConfigId(data.id);
        reset({
          telefone: data.telefone || '',
          email: data.email || '',
          horario_funcionamento: data.horario_funcionamento || ''
        });
      }
    };

    loadConfig();
  }, [reset]);

  const onSubmit = async (formData: SiteConfig) => {
    setLoading(true);

    try {
      const { error } = await supabase
        .from('site_config')
        .update({
          telefone: formData.telefone,
          email: formData.email,
          horario_funcionamento: formData.horario_funcionamento
        })
        .eq('id', configId);

      if (error) throw error;

      toast({
        title: "Configurações salvas!",
        description: "As informações de contato foram atualizadas com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="telefone" className="flex items-center space-x-2">
            <Phone className="h-4 w-4" />
            <span>Telefone</span>
          </Label>
          <Input
            id="telefone"
            {...register("telefone", { required: "Telefone é obrigatório" })}
            placeholder="(11) 99999-9999"
          />
          {errors.telefone && (
            <p className="text-sm text-destructive">{errors.telefone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email", { 
              required: "Email é obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido"
              }
            })}
            placeholder="contato@sulvel.com.br"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="horario_funcionamento" className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>Horário de Funcionamento</span>
        </Label>
        <Textarea
          id="horario_funcionamento"
          {...register("horario_funcionamento", { required: "Horário é obrigatório" })}
          placeholder="Segunda a Sexta: 08:00 às 18:00&#10;Sábado: 08:00 às 12:00"
          rows={3}
        />
        {errors.horario_funcionamento && (
          <p className="text-sm text-destructive">{errors.horario_funcionamento.message}</p>
        )}
      </div>

      <Button type="submit" disabled={loading} className="flex items-center space-x-2">
        <Save className="h-4 w-4" />
        <span>{loading ? "Salvando..." : "Salvar Configurações"}</span>
      </Button>
    </form>
  );
};

export default SiteConfigForm;