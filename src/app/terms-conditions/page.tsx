import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function TermsConditions() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container mx-auto max-w-3xl px-4 py-20">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-8">Terms & Conditions</h1>
          <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-loose space-y-6">
            <p>Last updated: April 2026</p>
            <p>
              Please read these Terms and Conditions carefully before using the website operated by Anand Kumar.
            </p>
            <h2 className="text-2xl font-bold text-foreground">1. Intellectual Property</h2>
            <p>
              The Site and its original content, features, and functionality are owned by Anand Kumar and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. 
              The technical tutorials provide open source code snippets which you are free to use.
            </p>
            <h2 className="text-2xl font-bold text-foreground">2. User Conduct</h2>
            <p>
              You agree not to use the website in a way that may cause the website to be interrupted, damaged, rendered less efficient or such that the effectiveness or functionality of the website is in any way impaired.
            </p>
            <h2 className="text-2xl font-bold text-foreground">3. Disclaimers</h2>
            <p>
              The information is provided by Anand Kumar on an "as is" and "as available" basis. We make no representations or warranties of any kind, express or implied, as to the operation of the site or the information, content, materials, or products included on this site.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
