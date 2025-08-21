import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Upload, Trash2, Save, Image as ImageIcon } from "lucide-react";

const updateFavicon = (logoUrl: string) => {
  // Remove favicon existente
  const existingFavicon = document.querySelector('link[rel="icon"]');
  if (existingFavicon) {
    existingFavicon.remove();
  }

  // Adiciona novo favicon
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/png';
  link.href = logoUrl;
  document.head.appendChild(link);
};

const LogoUpload = () => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [configId, setConfigId] = useState<string | null>(null);

  useEffect(() => {
    const loadCurrentLogo = async () => {
      const { data, error } = await supabase
        .from('site_config')
        .select('id, logo_url')
        .single();

      if (error) {
        console.error('Erro ao carregar logo:', error);
        return;
      }

      if (data) {
        setConfigId(data.id);
        setLogoUrl(data.logo_url);
      }
    };

    loadCurrentLogo();
  }, []);

  const uploadLogo = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Selecione um arquivo para upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `logo.${fileExt}`;
      const filePath = `${fileName}`;

      // Remove logo anterior se existir
      if (logoUrl) {
        const oldPath = logoUrl.split('/').pop();
        if (oldPath) {
          await supabase.storage.from('logos').remove([oldPath]);
        }
      }

      const { error: uploadError } = await supabase.storage
        .from('logos')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('logos').getPublicUrl(filePath);

      // Atualizar URL no banco
      const { error: updateError } = await supabase
        .from('site_config')
        .update({ logo_url: data.publicUrl })
        .eq('id', configId);

      if (updateError) {
        throw updateError;
      }

      // Comentado: Não atualizar favicon automaticamente
      // updateFavicon(data.publicUrl);

      setLogoUrl(data.publicUrl);

      toast({
        title: "Logo atualizada!",
        description: "A nova logo foi salva e aparecerá no cabeçalho do site.",
      });
    } catch (error: any) {
      toast({
        title: "Erro no upload",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const removeLogo = async () => {
    if (!logoUrl || !confirm('Tem certeza que deseja remover a logo?')) return;

    try {
      const fileName = logoUrl.split('/').pop();
      if (fileName) {
        await supabase.storage.from('logos').remove([fileName]);
      }

      const { error } = await supabase
        .from('site_config')
        .update({ logo_url: null })
        .eq('id', configId);

      if (error) throw error;

      setLogoUrl(null);

      toast({
        title: "Logo removida!",
        description: "A logo foi removida com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao remover",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label htmlFor="logo-upload" className="flex items-center space-x-2">
          <ImageIcon className="h-4 w-4" />
          <span>Logo do Site</span>
        </Label>

        {logoUrl && (
          <Card className="p-4">
            <CardContent className="p-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={logoUrl} 
                    alt="Logo atual" 
                    className="h-16 w-auto object-contain border rounded"
                  />
                  <div>
                    <p className="font-medium">Logo atual</p>
                    <p className="text-sm text-muted-foreground">Clique para alterar ou remover</p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={removeLogo}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remover
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
          <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <div className="space-y-2">
            <Label htmlFor="logo-upload" className="cursor-pointer">
              <Button variant="outline" disabled={uploading} asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? "Carregando..." : logoUrl ? "Alterar Logo" : "Escolher Logo"}
                </span>
              </Button>
            </Label>
            <Input
              id="logo-upload"
              type="file"
              accept="image/*"
              onChange={uploadLogo}
              disabled={uploading}
              className="hidden"
            />
            <p className="text-sm text-muted-foreground">
              Formatos aceitos: JPG, PNG, SVG (máx. 2MB)
            </p>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-medium mb-2">Dicas para melhor resultado:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Use imagens com fundo transparente (PNG)</li>
            <li>• Recomendado: 200x60px ou proporção similar</li>
            <li>• A logo será exibida no cabeçalho e rodapé do site</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LogoUpload;