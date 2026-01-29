import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jliheydrgkpadsmuomtw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsaWhleWRyZ2twYWRzbXVvbXR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1NzIyMjUsImV4cCI6MjA4NTE0ODIyNX0.VHh5joSCKTTV8D8V1zYvIzhQAHJ4BH1_AwBOHRXN8ws'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
