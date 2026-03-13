import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function test() {
  console.log("Fetching products...")
  const { data, error } = await supabase
    .from('products')
    .select('*, profiles:user_id(*)')
    
  if (error) {
    console.error("Error:", error)
  } else {
    console.log(`Found ${data.length} products total`)
    console.log("Available products:", data.filter(p => p.available === true).length)
    if (data.length > 0) {
      console.log("First product sample:", JSON.stringify(data[0], null, 2))
    }
  }
}

test()
