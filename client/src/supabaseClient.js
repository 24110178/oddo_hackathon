import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://durgbqmyevxqoqytvzaf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1cmdicW15ZXZ4cW9xeXR2emFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1NTQyNDcsImV4cCI6MjA3NTEzMDI0N30.OqL2rOygDCcFBVLMTWpSzc-rg3vB-6Pz6gnMnbUENeA'
export const supabase = createClient(supabaseUrl, supabaseKey)
