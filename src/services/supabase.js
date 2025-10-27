import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://uuhmrdduhevwrnkajfed.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1aG1yZGR1aGV2d3Jua2FqZmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MjkwMjIsImV4cCI6MjA3NjEwNTAyMn0.WHdQMSmH1sK9ZBdjtSjsxKAy_ptQpuL2NffcV2Gsmmg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
