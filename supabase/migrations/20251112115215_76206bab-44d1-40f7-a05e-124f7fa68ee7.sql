-- Fix 1: Restrict profile reads to authenticated users only
DROP POLICY "Profiles are viewable by everyone" ON public.profiles;

CREATE POLICY "Authenticated users can view profiles"
ON public.profiles
FOR SELECT
USING (auth.role() = 'authenticated');

-- Fix 2: Add database constraints for username validation
ALTER TABLE public.profiles
ADD CONSTRAINT username_format CHECK (username ~ '^[a-z0-9_]{3,20}$');

ALTER TABLE public.profiles
ADD CONSTRAINT username_unique UNIQUE (username);