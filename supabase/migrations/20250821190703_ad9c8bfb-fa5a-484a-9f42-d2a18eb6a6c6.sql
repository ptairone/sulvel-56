-- Remove the existing policy that requires authentication
DROP POLICY IF EXISTS "Authenticated users can read site config" ON public.site_config;

-- Allow public read access to site_config
CREATE POLICY "Site config is publicly readable"
ON public.site_config
FOR SELECT
USING (true);

-- Ensure realtime delivers full row data on updates
ALTER TABLE public.site_config REPLICA IDENTITY FULL;