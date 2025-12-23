import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nzfbkemncvycztinewqu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56ZmJrZW1uY3Z5Y3p0aW5ld3F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NDE5NDUsImV4cCI6MjA4MjAxNzk0NX0.2CyTdF2cV2qfVYSded83mUcB9Ng_ZpJOkCtWVKJh11Y'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
