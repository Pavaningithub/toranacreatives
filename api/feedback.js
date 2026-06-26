import { createClient } from "@supabase/supabase-js";

const RATING_LABELS = { 1: "Poor", 2: "Fair", 3: "Good", 4: "Very Good", 5: "Excellent!" };

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { project_id, reviewer_name, phone, event_type, rating, review_text } = req.body || {};

  if (!reviewer_name || !review_text) {
    return res.status(400).json({ error: "Name and review are required" });
  }

  const stored = await storeReview({ project_id, reviewer_name, phone, event_type, rating, review_text });
  const notified = await sendTelegram({ project_id, reviewer_name, phone, event_type, rating, review_text });

  return res.status(200).json({ ok: true, stored, notified });
}

async function storeReview(data) {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return false;

  try {
    const supabase = createClient(url, key);
    const { error } = await supabase.from("reviews").insert([{
      project_id:    data.project_id,
      reviewer_name: data.reviewer_name,
      phone:         data.phone || null,
      event_type:    data.event_type || null,
      rating:        data.rating,
      review_text:   data.review_text,
    }]);
    return !error;
  } catch {
    return false;
  }
}

async function sendTelegram(data) {
  const token  = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const stars = "⭐".repeat(data.rating);
  const lines = [
    "⭐ <b>NEW FEEDBACK — Torana Creatives</b>",
    data.project_id ? `📋 <b>Project:</b> ${data.project_id}` : null,
    "",
    `👤 <b>Name:</b> ${data.reviewer_name}`,
    data.phone      ? `📱 <b>Phone:</b> ${data.phone}`       : null,
    data.event_type ? `🎊 <b>Event:</b> ${data.event_type}`  : null,
    `${stars} <b>Rating:</b> ${RATING_LABELS[data.rating] || data.rating}`,
    "",
    `💬 "${data.review_text}"`,
  ].filter(Boolean).join("\n");

  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ chat_id: chatId, text: lines, parse_mode: "HTML" }),
    });
    return r.ok;
  } catch {
    return false;
  }
}
