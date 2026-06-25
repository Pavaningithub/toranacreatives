import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, phone, email, eventType, eventDate, location, message } = req.body || {};

  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone are required" });
  }

  const stored = await storeEnquiry({ name, phone, email, eventType, eventDate, location, message });
  const notified = await sendTelegram({ name, phone, email, eventType, eventDate, location, message });

  return res.status(200).json({ ok: true, stored, notified });
}

async function storeEnquiry(data) {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return false;

  try {
    const supabase = createClient(url, key);
    const { error } = await supabase.from("enquiries").insert([{
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || null,
      event_type: data.eventType || null,
      event_date: data.eventDate || null,
      location: data.location?.trim() || null,
      message: data.message?.trim() || null,
    }]);
    return !error;
  } catch {
    return false;
  }
}

async function sendTelegram(data) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const lines = [
    "🎉 <b>NEW ENQUIRY — Torana Creatives</b>",
    "",
    `👤 <b>Name:</b> ${data.name}`,
    `📱 <b>Phone:</b> ${data.phone}`,
    data.email    ? `📧 <b>Email:</b> ${data.email}`       : null,
    data.eventType ? `🎊 <b>Event:</b> ${data.eventType}`  : null,
    data.eventDate ? `📅 <b>Date:</b> ${data.eventDate}`   : null,
    data.location  ? `📍 <b>Area:</b> ${data.location}`    : null,
    data.message   ? `💬 <b>Note:</b> ${data.message}`     : null,
  ].filter(Boolean).join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: lines, parse_mode: "HTML" }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
