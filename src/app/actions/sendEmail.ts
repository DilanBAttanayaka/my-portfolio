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
