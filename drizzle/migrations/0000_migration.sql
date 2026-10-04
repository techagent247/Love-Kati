CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact text NOT NULL,
  event_type text NOT NULL,
  event_date date,
  guests integer,
  message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT name_len CHECK (char_length(name) BETWEEN 1 AND 100),
  CONSTRAINT contact_len CHECK (char_length(contact) BETWEEN 3 AND 200),
  CONSTRAINT type_len CHECK (char_length(event_type) BETWEEN 1 AND 60),
  CONSTRAINT msg_len CHECK (message IS NULL OR char_length(message) <= 2000),
  CONSTRAINT guests_range CHECK (guests IS NULL OR guests BETWEEN 1 AND 5000)
);
GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send an enquiry" ON public.enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);