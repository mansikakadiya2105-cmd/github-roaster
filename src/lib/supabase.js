import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

let cachedCount = null
let cacheTime = null

export async function saveRoast(username, score, roastText, languages) {
  try {
    const languageString = Array.isArray(languages)
      ? languages.map(l => l.language || l).join(",")
      : String(languages || "")
    
    const { data, error } = await supabase
      .from("roasts")
      .insert({
        github_username: username,
        developer_score: score,
        roast_text: roastText,
        top_languages: languageString
      })
    
    if (error) {
      console.error("Supabase save error:", error)
      return null
    }
    cachedCount = null
    return data
  } catch (err) {
    console.error("saveRoast failed:", err)
    return null
  }
}

export async function getRoastCount() {
  try {
    const now = Date.now()
    if (cachedCount !== null && cacheTime && (now - cacheTime) < 60000) {
      return cachedCount
    }
    
    const { count, error } = await supabase
      .from("roasts")
      .select("*", { count: "exact", head: true })
    
    if (error) {
      console.error("Supabase count error:", error)
      return 0
    }
    
    cachedCount = count || 0
    cacheTime = now
    return cachedCount
  } catch (err) {
    console.error("getRoastCount failed:", err)
    return 0
  }
}
