import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface SiteConfig {
  telefone: string;
  email: string;
  horario_funcionamento: string;
  localizacao: string;
}

const SiteConfigForm = () => {
  const [loading, setLoading] = useState(false);
  const [configId, setConfigId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SiteConfig>();

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const { data, error } = await supabase
          .from('site_config')
          .select('id, telefone, email, horario_funcionamento, localizacao')
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
            horario_funcionamento: data.horario_funcionamento || '',
            localizacao: data.localizacao || '',
          });
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      }
    };

    loadConfig();
  }, [reset]);

  const onSubmit = async (formData: SiteConfig) => {
    if (!configId) {
      toast({
        title: "Erro",
        description: "ID da configuração não encontrado",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase
        .from('site_config')
        .update({
          telefone: formData.telefone,
          email: formData.email,
          horario_funcionamento: formData.horario_funcionamento,
          localizacao: formData.localizacao,
        })
        .eq('id', configId);

      if (error) {
        throw error;
      }

      toast({
        title: "Configurações atualizadas!",
        description: "As informações do site foram salvas com sucesso.",
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
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            {...register("telefone", {
              required: "Telefone é obrigatório",
            })}
            placeholder="(48) 99999-9999"
          />
          {errors.telefone && (
            <span className="text-destructive text-sm">
              {errors.telefone.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            {...register("email", {
              required: "E-mail é obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "E-mail inválido",
              },
            })}
            type="email"
            placeholder="contato@empresa.com"
          />
          {errors.email && (
            <span className="text-destructive text-sm">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="horario_funcionamento">Horário de Funcionamento</Label>
        <Textarea
          {...register("horario_funcionamento", {
            required: "Horário de funcionamento é obrigatório",
          })}
          placeholder="Ex: Segunda à Sexta: 8h às 18h"
          rows={3}
        />
        {errors.horario_funcionamento && (
          <span className="text-destructive text-sm">
            {errors.horario_funcionamento.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="localizacao">Localização</Label>
        <Textarea
          {...register("localizacao", {
            required: "Localização é obrigatória",
          })}
          placeholder="Ex: Rua Exemplo, 123 - Centro, Cidade - SC"
          rows={2}
        />
        {errors.localizacao && (
          <span className="text-destructive text-sm">
            {errors.localizacao.message}
          </span>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting || loading} className="w-full">
        {(isSubmitting || loading) && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Salvar Configurações
      </Button>
    </form>
  );
};

export default SiteConfigForm;