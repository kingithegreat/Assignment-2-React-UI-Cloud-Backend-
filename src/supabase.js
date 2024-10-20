import { createClient } from "@supabase/supabase-js"; // Importing the createClient function from the supabase-js library

// URL of your Supabase project
const supabaseUrl = 'https://kmftvkygybaefqiyqapv.supabase.co';

// Public API key for your Supabase project
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttZnR2a3lneWJhZWZxaXlxYXB2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTkyMTU3NSwiZXhwIjoyMDQxNDk3NTc1fQ.meZMWknCJGwBHCaS7tf5t5EY2o5gVjDnzZUv-rSyIHQ';

// Creating a Supabase client instance using the project URL and API key
export const supabase = createClient(supabaseUrl, supabaseKey);
