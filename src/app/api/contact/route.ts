import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Inquiry from "@/lib/models/Inquiry";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, collectionInterest, requirements, weddingDate, guestCount, cardCount } = body;

  if (!name || !email || !requirements) {
    return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
  }

  const message = [
    requirements,
    weddingDate ? `Wedding Date: ${weddingDate}` : "",
    guestCount ? `Guest Count: ${guestCount}` : "",
    cardCount ? `Card Count: ${cardCount}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  await connectDB();

  const inquiry = await Inquiry.create({
    name,
    email,
    phone: phone || "",
    interest: collectionInterest || "General Inquiry",
    message,
    status: "new",
    source: "contact-form",
  });

  // Notify admin via email
  try {
    await resend.emails.send({
      from: `Mira Cards Website <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL!,
      subject: `New Inquiry from ${name} — ${collectionInterest || "General"}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;">
          <h2 style="color:#C9A227;margin-bottom:4px;">New Inquiry Received</h2>
          <table style="width:100%;border-collapse:collapse;margin-top:16px;">
            <tr><td style="padding:8px 0;color:#718096;font-size:13px;width:120px;">Name</td><td style="font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#718096;font-size:13px;">Email</td><td>${email}</td></tr>
            <tr><td style="padding:8px 0;color:#718096;font-size:13px;">Phone</td><td>${phone || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#718096;font-size:13px;">Interest</td><td>${collectionInterest || "General"}</td></tr>
            ${weddingDate ? `<tr><td style="padding:8px 0;color:#718096;font-size:13px;">Wedding Date</td><td>${weddingDate}</td></tr>` : ""}
            ${guestCount ? `<tr><td style="padding:8px 0;color:#718096;font-size:13px;">Guest Count</td><td>${guestCount}</td></tr>` : ""}
            ${cardCount ? `<tr><td style="padding:8px 0;color:#718096;font-size:13px;">Card Count</td><td>${cardCount}</td></tr>` : ""}
          </table>
          <div style="background:#F8F9FA;border-left:3px solid #C9A227;padding:16px;margin-top:16px;border-radius:4px;">
            <p style="margin:0;white-space:pre-line;">${requirements}</p>
          </div>
          <p style="color:#999;font-size:12px;margin-top:24px;">View in admin: ${process.env.NEXTAUTH_URL}/admin/inquiries</p>
        </div>
      `,
    });
  } catch {
    // Email failure should not block inquiry save
  }

  return NextResponse.json({ success: true, id: inquiry._id.toString() }, { status: 201 });
}
