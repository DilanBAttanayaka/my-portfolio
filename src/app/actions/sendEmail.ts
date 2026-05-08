"use server";

import { Resend } from "resend";
import ContactEmail from "@/emails/ContactEmail";
import React from "react";
import { render } from "@react-email/render";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;
  const honeypot = formData.get("confirm_email") as string;
  const turnstileToken = formData.get("turnstileToken") as string;

  // 1. Honeypot check
  if (honeypot) {
    console.log("Honeypot triggered! Bot detected.");
    return { success: true };
  }

  // 2. Turnstile Verification
  if (!turnstileToken) {
    return { error: "Security check failed. Please try again." };
  }

  try {
    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${turnstileToken}`,
      }
    );

    const verifyData = await verifyResponse.json();

    if (!verifyData.success) {
      return { error: "Security verification failed. Are you a bot?" };
    }
  } catch (error) {
    console.error("Turnstile Error:", error);
    return { error: "Verification service unavailable." };
  }

  if (!name || !email || !subject || !message) {
    return { error: "All fields are required." };
  }

  try {
    const emailHtml = await render(
      React.createElement(ContactEmail, {
        name,
        email,
        subject,
        message,
      })
    );

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL || "dilanattanayakaya@gmail.com"],
      subject: `New Message: ${subject}`,
      replyTo: email,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Unexpected Error:", error);
    return { error: error.message || "An unexpected error occurred." };
  }
}
