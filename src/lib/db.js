import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
   'https://cbkicvbtrhtumwquirqm.supabase.co',
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTcwMjk4OSwiZXhwIjoxOTU1Mjc4OTg5fQ.0L1TghWsJkcAi1LYmHWNWkGMhpmSes-i5-99oH9aHac'
)
export default supabase

// .env wont work for some reason
// import.meta.env.VITE_SUPABASE_URL
// https://vitejs.dev/guide/env-and-mode.html#env-files