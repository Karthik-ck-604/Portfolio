import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Mail, MapPin, Calendar, CheckCircle2, ArrowRight, Github, Linkedin, HelpCircle, Copy, Check } from "lucide-react";
import { contactDetails, socialLinks } from "@/data/socials";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { TextArea } from "@/components/common/TextArea";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormData = z.infer<typeof contactSchema>;
const contactApiUrl = import.meta.env.VITE_CONTACT_API_URL || "/api/contact";

export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    if (emailCopied) {
      const timer = setTimeout(() => setEmailCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [emailCopied]);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(contactDetails.email);
      setEmailCopied(true);
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    mode: "onTouched"
  });

  const onSubmit = async (data: ContactFormData) => {
    // Validate using Zod schema as safety wrapper
    const validationResult = contactSchema.safeParse(data);
    if (!validationResult.success) return;

    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const response = await fetch(contactApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) throw new Error("Contact form submission failed");

      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#050505] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#DC2626]/2 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto z-10">
        
        {/* Section Header */}
        <SectionHeading
          eyebrow="Connect"
          title="Let's build something together"
          subtitle="Open to professional internships, full-time developer opportunities, and research collaborations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start mt-12 sm:mt-16 md:mt-24">
          
          {/* Left Column: Contact details details */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-left">
            <p className="text-sm sm:text-base text-[#A8A8A8] leading-relaxed">
              If you have an opening for a Full Stack Developer, need assistance building a MERN or Spring Boot product, or want to collaborate on research, reach out via the form or email!
            </p>

            <div className="flex flex-col gap-5 border-t border-[#2A2A2A]/60 pt-6 sm:pt-8 font-sans text-sm text-[#A8A8A8] select-none">
              
              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="min-w-11 h-11 w-11 rounded-lg bg-[#0F0F0F] border border-[#2A2A2A] flex items-center justify-center text-[#DC2626] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-[#A8A8A8]/60">Email Address</span>
                  <div className="flex items-center gap-2">
                    <a href={`mailto:${contactDetails.email}`} data-cursor="pointer" className="text-[#F8F8F8] hover:text-[#DC2626] transition-colors outline-none">
                      {contactDetails.email}
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      data-cursor="pointer"
                      className="min-w-11 h-11 w-11 p-2 text-[#A8A8A8] hover:text-white hover:bg-[#2A2A2A]/40 rounded transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#DC2626] relative group flex items-center justify-center"
                      aria-label="Copy email address"
                      title="Copy email to clipboard"
                    >
                      {emailCopied ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />}
                      
                      {/* Tooltip */}
                      {emailCopied && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-[#161616] border border-[#2A2A2A] text-[9px] text-[#F8F8F8] px-1.5 py-0.5 rounded shadow-lg pointer-events-none select-none z-30 whitespace-nowrap animate-in fade-in zoom-in duration-200">
                          Copied!
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3.5">
                <div className="min-w-11 h-11 w-11 rounded-lg bg-[#0F0F0F] border border-[#2A2A2A] flex items-center justify-center text-[#DC2626] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-[#A8A8A8]/60">Current Location</span>
                  <span className="text-[#F8F8F8]">{contactDetails.location}</span>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-start gap-3.5">
                <div className="min-w-11 h-11 w-11 rounded-lg bg-[#0F0F0F] border border-[#2A2A2A] flex items-center justify-center text-[#DC2626] shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] uppercase tracking-wider text-[#A8A8A8]/60">Availability Status</span>
                    <span title="Current employment search status" data-cursor="help" className="inline-flex items-center">
                      <HelpCircle className="w-3.5 h-3.5 text-[#A8A8A8]/60 cursor-help" />
                    </span>
                  </div>
                  <span className="text-[#F8F8F8] font-semibold">{contactDetails.availability}</span>
                </div>
              </div>

            </div>

            {/* Social profiles linking */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4">
              {socialLinks.map((link) => {
                const Icon = link.name === "GitHub" ? Github : link.name === "LinkedIn" ? Linkedin : Mail;
                if (link.name === "Email") return null;
                return (
                  <Button
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="sm"
                    icon={<Icon className="w-3.5 h-3.5" />}
                    ariaLabel={link.tooltip}
                  >
                    {link.name}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Form submissions */}
          <div className="lg:col-span-7">
            <Card hoverGlow={false} borderAccentOnHover={false} translateOnHover={false} className="p-5 sm:p-6 md:p-8">
              {isSuccess ? (
                // Success State Notification
                <div role="alert" className="flex flex-col items-center justify-center text-center py-10 select-none">
                  <div className="w-16 h-16 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-[#22C55E]" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-[#F8F8F8] mb-2">Message sent!</h3>
                  <p className="text-sm text-[#A8A8A8] max-w-sm leading-relaxed mb-6">
                    I'll get back to you soon.
                  </p>
                  <Button
                    onClick={() => setIsSuccess(false)}
                    variant="secondary"
                    size="sm"
                    ariaLabel="Reset contact form"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                // Contact Form Element
                <form onSubmit={handleSubmit(onSubmit)} className="contact-form flex flex-col gap-6" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <Input
                      id="name"
                      label="Full Name"
                      type="text"
                      placeholder="Your full name"
                      error={errors.name?.message}
                      {...register("name", {
                        required: "Name is required",
                        minLength: { value: 2, message: "Name must be at least 2 characters" }
                      })}
                      disabled={isSubmitting}
                    />
                    <Input
                      id="email"
                      label="Email Address"
                      type="email"
                      placeholder="youremail@example.com"
                      error={errors.email?.message}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address"
                        }
                      })}
                      disabled={isSubmitting}
                    />
                  </div>

                  <Input
                    id="subject"
                    label="Subject"
                    type="text"
                    placeholder="e.g. Full Stack Developer Opening"
                    error={errors.subject?.message}
                    {...register("subject", {
                      required: "Subject is required",
                      minLength: { value: 5, message: "Subject must be at least 5 characters" }
                    })}
                    disabled={isSubmitting}
                  />

                  <TextArea
                    id="message"
                    label="Message Description"
                    placeholder="e.g. Hi Karthik, I viewed your portfolio and..."
                    error={errors.message?.message}
                    {...register("message", {
                      required: "Message is required",
                      minLength: { value: 10, message: "Message must be at least 10 characters" }
                    })}
                    disabled={isSubmitting}
                  />

                  <div className="flex justify-end pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      loading={isSubmitting}
                      icon={<ArrowRight className="w-4 h-4" />}
                      ariaLabel="Submit contact form details"
                      className="w-full sm:w-auto"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>

                  {submitError && (
                    <p role="alert" className="text-sm text-[#EF4444] text-center sm:text-right">
                      Something went wrong. Please email me directly at <a href="mailto:karthikeyan610204@gmail.com" className="underline hover:text-[#F8F8F8]">karthikeyan610204@gmail.com</a>.
                    </p>
                  )}
                </form>
              )}
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
};
