-- Allow public read access to site_config
CREATE POLICY IF NOT EXISTS "Site config is publicly readable"
ON public.site_config
FOR SELECT
USING (true);

-- Ensure realtime delivers full row data on updates
ALTER TABLE public.site_config REPLICA IDENTITY FULL;