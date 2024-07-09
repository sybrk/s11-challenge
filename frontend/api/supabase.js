import { createClient } from "@supabase/supabase-js";

export const supabase = createClient("https://vwbgnvhwehuoxlycqtya.supabase.co",`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3Ymdudmh3ZWh1b3hseWNxdHlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAzNzcwNTMsImV4cCI6MjAzNTk1MzA1M30._yrjJ7YdrdNb7Jl7oegU8gBCB7buiNcMw0MSx1weWG0`);

export const supaHelpers = {
    getArticles: async () => {
        const { data } = await supabase.from("articles").select()
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
        const response = await supabase.from("articles").update([{title, text, topic}]).eq("id", id).select()
        console.log(response)
       
        return response
    },
    deleteArticle: async (id) => {
        const response = await supabase.from("articles").delete().eq("id", id)
        console.log(response)
        if (response) {
            return response
        } else {
            return true
        }
    },
}