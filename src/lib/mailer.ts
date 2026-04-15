import { Resend } from "resend";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set in .env.local");
  return new Resend(apiKey);
}

// The "from" address must be a verified domain in your Resend account.
// During development you can use: onboarding@resend.dev (Resend's test sender)
const FROM = process.env.EMAIL_FROM ?? "onboarding@resend.dev";

export async function sendWelcomeEmail(to: string) {
  const resend = getResend();
  await resend.emails.send({
    from: `Anand's TheWhy <${FROM}>`,
    to,
    subject: "Welcome to TheWhy! 🎉",
    html: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:linear-gradient(135deg,#2563eb 0%,#7c3aed 100%);padding:40px 40px 60px;border-radius:12px 12px 0 0;">
          <h1 style="color:#ffffff;font-size:28px;font-weight:800;margin:0;">TheWhy</h1>
          <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:15px;">By Anand Kumar</p>
        </div>
        <div style="padding:40px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;">
          <h2 style="font-size:22px;color:#0a0a0f;font-weight:700;margin:0 0 16px;">Welcome aboard! 🚀</h2>
          <p style="color:#475569;line-height:1.7;margin:0 0 24px;">
            Thanks for subscribing to my newsletter. You'll get the latest articles on
            <strong>web development, React, Next.js</strong>, and career tips — delivered straight to your inbox.
          </p>
          <p style="color:#475569;line-height:1.7;margin:0 0 32px;">
            No spam, ever. Just quality content when I have something worth sharing.
          </p>
          <a href="https://TheWhy.com/blog"
             style="display:inline-block;background:linear-gradient(135deg,#2563eb 0%,#7c3aed 100%);color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">
            Read the Blog →
          </a>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:40px 0 24px;" />
          <p style="color:#94a3b8;font-size:13px;margin:0;">
            You're receiving this because you subscribed at TheWhy.com.
            If you didn't subscribe, you can safely ignore this email.
          </p>
        </div>
      </div>
    `,
  });
}

export async function sendNewPostEmail(
  subscribers: string[],
  post: { title: string; description: string; slug: string }
) {
  if (subscribers.length === 0) return;
  const resend = getResend();
  const postUrl = `https://TheWhy.com/blog/${post.slug}`;

  // Resend supports batch sending — send to all at once using bcc to keep it private
  await resend.emails.send({
    from: `Anand's TheWhy <${FROM}>`,
    to: FROM,          // send to yourself
    bcc: subscribers,  // blind-carbon-copy all subscribers
    subject: `New Post: ${post.title}`,
    html: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:linear-gradient(135deg,#2563eb 0%,#7c3aed 100%);padding:40px;border-radius:12px 12px 0 0;">
          <p style="color:rgba(255,255,255,0.8);font-size:13px;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.1em;">New Article</p>
          <h1 style="color:#ffffff;font-size:24px;font-weight:800;margin:0;line-height:1.3;">${post.title}</h1>
        </div>
        <div style="padding:40px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;">
          <p style="color:#475569;line-height:1.7;margin:0 0 28px;font-size:16px;">${post.description}</p>
          <a href="${postUrl}"
             style="display:inline-block;background:linear-gradient(135deg,#2563eb 0%,#7c3aed 100%);color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">
            Read Article →
          </a>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:40px 0 24px;" />
          <p style="color:#94a3b8;font-size:13px;margin:0;">TheWhy by Anand Kumar · You received this because you subscribed.</p>
        </div>
      </div>
    `,
  });
}
