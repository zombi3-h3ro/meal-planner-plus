// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hmkyiwfrxlmqsxvdmbud.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhta3lpd2ZyeGxtcXN4dmRtYnVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5ODg0OTYsImV4cCI6MjA1NzU2NDQ5Nn0.zkKpOr_JdIpxnFglx6tp8wtl-Otj5Aw7GZQw0CrM3eE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);