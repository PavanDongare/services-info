"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { contactForm } from "@/data/content";
import { Send, CheckCircle, Mail } from "lucide-react";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Visual-only submission (no backend)
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm text-muted-foreground mb-4">
            <Mail className="w-4 h-4" />
            Contact Us
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {contactForm.title}
          </h2>
          <p className="text-muted-foreground">{contactForm.description}</p>
        </div>

        {submitted ? (
          <div className="bg-card border border-accent-green/30 rounded-xl p-8 text-center">
            <div
              className="inline-flex p-4 rounded-full mb-4"
              style={{ backgroundColor: "rgba(16, 185, 129, 0.15)" }}
            >
              <CheckCircle className="w-8 h-8 text-accent-green" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Message Received
            </h3>
            <p className="text-muted-foreground">
              Thank you for reaching out. We&apos;ll get back to you shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-xl p-6 sm:p-8"
          >
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Name <span className="text-accent-red">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 focus:border-accent-cyan transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email <span className="text-accent-red">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 focus:border-accent-cyan transition-all"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="company"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 focus:border-accent-cyan transition-all"
                placeholder="Your company name"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Message <span className="text-accent-red">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 focus:border-accent-cyan transition-all resize-none"
                placeholder="Tell us about your analytics and compliance challenges..."
              />
            </div>

            <Button type="submit" size="lg" className="w-full gap-2">
              <Send className="w-4 h-4" />
              {contactForm.submitText}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
