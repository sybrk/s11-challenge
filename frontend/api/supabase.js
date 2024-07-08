import { createClient } from "@supabase/supabase-js";

export const supabase = createClient("https://vwbgnvhwehuoxlycqtya.supabase.co",`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3Ymdudmh3ZWh1b3hseWNxdHlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAzNzcwNTMsImV4cCI6MjAzNTk1MzA1M30._yrjJ7YdrdNb7Jl7oegU8gBCB7buiNcMw0MSx1weWG0`);

export const supaHelpers = {
    getArticles: async () => {
        const { data } = await supabase.from("articles").select()
        console.log("helper supa", data)
        return data
    },
    postArticle: async ({title, text, topic}) => {
        const { data, error } = await supabase.from("articles").insert([{title, text, topic}]).select()
        if (data) {
            return data
        }
        return error
    },
    updateArticle: async (id, article) => {
        const {title, text, topic} = article
        const { data, error } = await supabase.from("articles").update([{title, text, topic}]).eq("id", id).select()
        if (data) {
            return data
        }
        return error
    },
    deleteArticle: async (id) => {
        const {error } = await supabase.from("articles").delete().eq("id", id)
        if (error) {
            return error
        } else {
            return true
        }
    },
}