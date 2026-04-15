import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container mx-auto max-w-3xl px-4 py-20">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-8">Privacy Policy</h1>
          <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-loose space-y-6">
            <p>Last updated: April 2026</p>
            <p>
              Welcome to TheWhy, Anand Kumar's blog. I respect your privacy and am committed to protecting your personal data.
              This privacy policy explains how I look after your personal data when you visit my website.
            </p>
            <h2 className="text-2xl font-bold text-foreground">1. Data We Collect</h2>
            <p>
              We only collect data that you provide directly to us (e.g., when signing up for the newsletter or filling out the contact form).
              This consists of your name, email address, and message.
            </p>
            <h2 className="text-2xl font-bold text-foreground">2. Cookies</h2>
            <p>
              We use minimal cookies necessary for the basic functioning of the website, such as remembering your light/dark mode preference via local storage. 
              We do not use invasive third-party tracking algorithms.
            </p>
            <h2 className="text-2xl font-bold text-foreground">3. Newsletter</h2>
            <p>
              If you subscribe to the newsletter, your email address is stored securely and used only to send you new articles and updates from TheWhy.
              You can unsubscribe at any time by contacting me directly.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
