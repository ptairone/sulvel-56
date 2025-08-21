-- Criar tabela para configurações gerais do site
CREATE TABLE public.site_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  telefone TEXT,
  email TEXT,
  horario_funcionamento TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Inserir configurações iniciais
INSERT INTO public.site_config (telefone, email, horario_funcionamento) 
VALUES (
  '(11) 99999-9999',
  'contato@sulvel.com.br',
  'Segunda a Sexta: 08:00 às 18:00'
);

-- Criar tabela para serviços administrativos
CREATE TABLE public.admin_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Settings',
  features TEXT[] NOT NULL DEFAULT '{}',
  active BOOLEAN NOT NULL DEFAULT true,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Inserir serviços existentes
INSERT INTO public.admin_services (title, description, icon, features, order_index) VALUES
('Instalação de Tacógrafos', 'Instalação profissional de tacógrafos de velocidade com certificação INMETRO', 'Gauge', ARRAY['Instalação certificada', 'Calibração precisa', 'Documentação completa'], 1),
('Manutenção e Calibração', 'Serviços de manutenção preventiva e calibração para garantir precisão', 'Settings', ARRAY['Manutenção preventiva', 'Calibração oficial', 'Relatórios técnicos'], 2),
('Verificação e Certificação', 'Verificação oficial e emissão de certificados de conformidade', 'FileCheck', ARRAY['Verificação INMETRO', 'Certificados oficiais', 'Conformidade garantida'], 3),
('Reparo e Ajustes', 'Reparo especializado e ajustes técnicos em tacógrafos', 'Wrench', ARRAY['Reparo especializado', 'Peças originais', 'Garantia de qualidade'], 4);

-- Enable RLS
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_services ENABLE ROW LEVEL SECURITY;

-- Criar políticas RLS - apenas usuários autenticados podem editar
CREATE POLICY "Authenticated users can read site config" 
ON public.site_config 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update site config" 
ON public.site_config 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Everyone can read services" 
ON public.admin_services 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can manage services" 
ON public.admin_services 
FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Criar bucket para logos
INSERT INTO storage.buckets (id, name, public) VALUES ('logos', 'logos', true);

-- Criar políticas para upload de logos
CREATE POLICY "Authenticated users can upload logos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'logos' AND auth.uid() IS NOT NULL);

CREATE POLICY "Everyone can view logos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'logos');

CREATE POLICY "Authenticated users can update logos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'logos' AND auth.uid() IS NOT NULL);

-- Criar trigger para updated_at
CREATE TRIGGER update_site_config_updated_at
BEFORE UPDATE ON public.site_config
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_services_updated_at
BEFORE UPDATE ON public.admin_services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();