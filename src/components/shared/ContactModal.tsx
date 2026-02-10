"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Send, CheckCircle } from "lucide-react";

interface ContactModalProps {
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function ContactModal({ trigger, open, onOpenChange }: ContactModalProps) {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // In a real app, you'd send this data to an API
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
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border-border bg-card">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        Book a Demo
                    </DialogTitle>
                    <DialogDescription>
                        See how PrivacyStack can secure your analytics.
                    </DialogDescription>
                </DialogHeader>

                {submitted ? (
                    <div className="py-8 text-center animate-in fade-in zoom-in duration-300">
                        <div
                            className="inline-flex p-3 rounded-full mb-4"
                            style={{ backgroundColor: "rgba(16, 185, 129, 0.15)" }}
                        >
                            <CheckCircle className="w-8 h-8 text-accent-green" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                            Request Sent!
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            We&apos;ll be in touch shortly to schedule your demo.
                        </p>
                        <Button
                            className="w-full"
                            variant="outline"
                            onClick={() => setSubmitted(false)}
                        >
                            Send Another
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="grid gap-6 py-4">
                        <div className="grid gap-2">
                            <label htmlFor="name" className="text-sm font-medium">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="e.g. Jane Smith"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Work Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="e.g. jane@company.com"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="company" className="text-sm font-medium">
                                Company Name
                            </label>
                            <input
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="e.g. Acme Enterprise"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="message" className="text-sm font-medium">
                                How can we help?
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                placeholder="Tell us about your compliance needs or specific questions..."
                            />
                        </div>
                        <Button type="submit" className="w-full mt-2 gap-2" size="lg">
                            <Send className="w-4 h-4" />
                            Request Demo
                        </Button>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
