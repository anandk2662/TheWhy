import { NextRequest, NextResponse } from "next/server";
import { addSubscriber } from "@/lib/subscribers";
import { sendWelcomeEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || "").trim().toLowerCase();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const result = await addSubscriber(email);

    if (result.alreadyExists) {
      return NextResponse.json({ error: "This email is already subscribed!" }, { status: 409 });
    }

    // Send welcome email (best effort — don't fail subscription if email fails)
    try {
      await sendWelcomeEmail(email);
    } catch (emailError) {
      console.error("[mailer] Failed to send welcome email:", emailError);
    }

    return NextResponse.json({ success: true, message: "You're subscribed! Check your inbox for a welcome email." });
  } catch (err) {
    console.error("[subscribe]", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
