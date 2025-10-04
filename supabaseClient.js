import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hsldohwbuflogccangnv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzbGRvaHdidWZsb2djY2FuZ252Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1NTIzOTMsImV4cCI6MjA3NTEyODM5M30.lsD9ql9Ix-zRJJTRPTNz_-ZrAvMD5u0aIIrc1jKCmjE'
export const supabase = createClient(supabaseUrl, supabaseKey)
