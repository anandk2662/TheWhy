"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container mx-auto max-w-2xl px-4 py-20 md:py-32">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Get in Touch
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Have a question or want to work together? Leave a message below!
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-8 shadow-sm">
              {status === "success" ? (
                <div className="text-center py-10">
                  <h3 className="text-2xl font-bold text-foreground">Message Sent!</h3>
                  <p className="mt-2 text-muted-foreground">Thanks for reaching out. I'll get back to you soon.</p>
                  <button onClick={() => setStatus("idle")} className="mt-6 text-primary hover:underline">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-foreground">
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="block w-full rounded-md border-0 bg-background py-2 px-3 text-foreground shadow-sm ring-1 ring-inset ring-border focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-foreground">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="block w-full rounded-md border-0 bg-background py-2 px-3 text-foreground shadow-sm ring-1 ring-inset ring-border focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium leading-6 text-foreground">
                      Message
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="block w-full rounded-md border-0 bg-background py-2 px-3 text-foreground shadow-sm ring-1 ring-inset ring-border focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full flex justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 transition-colors"
                  >
                    {status === "submitting" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
