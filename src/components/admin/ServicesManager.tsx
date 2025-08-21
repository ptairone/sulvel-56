import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Plus, Trash2, Edit, Save, X, ArrowUp, ArrowDown } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  active: boolean;
  order_index: number;
}

interface ServiceFormData {
  title: string;
  description: string;
  icon: string;
  features: string;
}

const iconOptions = [
  { value: "Gauge", label: "Velocímetro" },
  { value: "Settings", label: "Configurações" },
  { value: "FileCheck", label: "Verificação" },
  { value: "Wrench", label: "Chave" },
  { value: "Shield", label: "Escudo" },
  { value: "Award", label: "Prêmio" },
  { value: "Clipboard", label: "Prancheta" },
  { value: "Tool", label: "Ferramenta" }
];

const ServicesManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ServiceFormData>();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const { data, error } = await supabase
      .from('admin_services')
      .select('*')
      .order('order_index');

    if (error) {
      console.error('Erro ao carregar serviços:', error);
      return;
    }

    setServices(data || []);
  };

  const onSubmit = async (formData: ServiceFormData) => {
    setLoading(true);

    try {
      const featuresArray = formData.features
        .split('\n')
        .map(f => f.trim())
        .filter(f => f.length > 0);

      if (editingId) {
        const { error } = await supabase
          .from('admin_services')
          .update({
            title: formData.title,
            description: formData.description,
            icon: formData.icon,
            features: featuresArray
          })
          .eq('id', editingId);

        if (error) throw error;

        toast({
          title: "Serviço atualizado!",
          description: "O serviço foi atualizado com sucesso.",
        });
      } else {
        const maxOrder = Math.max(...services.map(s => s.order_index), 0);
        
        const { error } = await supabase
          .from('admin_services')
          .insert({
            title: formData.title,
            description: formData.description,
            icon: formData.icon,
            features: featuresArray,
            order_index: maxOrder + 1
          });

        if (error) throw error;

        toast({
          title: "Serviço criado!",
          description: "O novo serviço foi adicionado com sucesso.",
        });
      }

      reset();
      setEditingId(null);
      setShowForm(false);
      loadServices();
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

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setShowForm(true);
    reset({
      title: service.title,
      description: service.description,
      icon: service.icon,
      features: service.features.join('\n')
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este serviço?')) return;

    const { error } = await supabase
      .from('admin_services')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Erro ao excluir",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Serviço excluído!",
        description: "O serviço foi removido com sucesso.",
      });
      loadServices();
    }
  };

  const handleToggleActive = async (id: string, active: boolean) => {
    const { error } = await supabase
      .from('admin_services')
      .update({ active: !active })
      .eq('id', id);

    if (error) {
      toast({
        title: "Erro ao atualizar",
        description: error.message,
        variant: "destructive",
      });
    } else {
      loadServices();
    }
  };

  const moveService = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = services.findIndex(s => s.id === id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (targetIndex < 0 || targetIndex >= services.length) return;

    const currentService = services[currentIndex];
    const targetService = services[targetIndex];

    const { error } = await supabase
      .from('admin_services')
      .update({ order_index: targetService.order_index })
      .eq('id', currentService.id);

    if (!error) {
      await supabase
        .from('admin_services')
        .update({ order_index: currentService.order_index })
        .eq('id', targetService.id);
    }

    if (error) {
      toast({
        title: "Erro ao reordenar",
        description: error.message,
        variant: "destructive",
      });
    } else {
      loadServices();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Serviços Cadastrados</h3>
        <Button onClick={() => { setShowForm(true); setEditingId(null); reset(); }}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Serviço
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Editar Serviço" : "Novo Serviço"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    {...register("title", { required: "Título é obrigatório" })}
                    placeholder="Nome do serviço"
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="icon">Ícone</Label>
                  <Select onValueChange={(value) => setValue("icon", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um ícone" />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  {...register("description", { required: "Descrição é obrigatória" })}
                  placeholder="Descrição do serviço"
                  rows={3}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Características (uma por linha)</Label>
                <Textarea
                  id="features"
                  {...register("features", { required: "Pelo menos uma característica é obrigatória" })}
                  placeholder="Característica 1&#10;Característica 2&#10;Característica 3"
                  rows={4}
                />
                {errors.features && (
                  <p className="text-sm text-destructive">{errors.features.message}</p>
                )}
              </div>

              <div className="flex space-x-2">
                <Button type="submit" disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? "Salvando..." : "Salvar"}
                </Button>
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingId(null); }}>
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {services.map((service, index) => (
          <Card key={service.id} className={!service.active ? "opacity-50" : ""}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold">{service.title}</h4>
                    <Badge variant={service.active ? "default" : "secondary"}>
                      {service.active ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {service.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveService(service.id, 'up')}
                    disabled={index === 0}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveService(service.id, 'down')}
                    disabled={index === services.length - 1}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleActive(service.id, service.active)}
                  >
                    {service.active ? "Desativar" : "Ativar"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(service)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(service.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServicesManager;