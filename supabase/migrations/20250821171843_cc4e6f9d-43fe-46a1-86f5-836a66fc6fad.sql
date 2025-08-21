-- Adicionar campo de localização na tabela site_config
ALTER TABLE public.site_config 
ADD COLUMN localizacao text;