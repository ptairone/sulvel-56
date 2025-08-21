import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SiteConfig {
  telefone: string;
  email: string;
  horario_funcionamento: string;
  logo_url: string | null;
}

interface AdminService {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  active: boolean;
  order_index: number;
}

export const useSiteConfig = () => {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [services, setServices] = useState<AdminService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Carregar configurações do site
        const { data: configData, error: configError } = await supabase
          .from('site_config')
          .select('*')
          .single();

        if (configError) {
          console.error('Erro ao carregar configurações:', configError);
        } else {
          setConfig(configData);
        }

        // Carregar serviços ativos
        const { data: servicesData, error: servicesError } = await supabase
          .from('admin_services')
          .select('*')
          .eq('active', true)
          .order('order_index');

        if (servicesError) {
          console.error('Erro ao carregar serviços:', servicesError);
        } else {
          setServices(servicesData || []);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { config, services, loading };
};