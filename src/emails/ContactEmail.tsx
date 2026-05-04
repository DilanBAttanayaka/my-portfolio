import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactEmail = ({
  name,
  email,
  subject,
  message,
}: ContactEmailProps) => (
  <Html>
    <Head />
    <Preview>New message from {name} via your portfolio</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Contact Form Submission</Heading>
        <Text style={text}>
          You have received a new message from your portfolio contact form.
        </Text>
        <Section style={section}>
          <Text style={label}>From:</Text>
          <Text style={value}>
            {name} ({email})
          </Text>

          <Hr style={hr} />

          <Text style={label}>Subject:</Text>
          <Text style={value}>{subject}</Text>

          <Hr style={hr} />

          <Text style={label}>Message:</Text>
          <Text style={messageText}>{message}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          This email was sent from your portfolio contact form.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ContactEmail;

const main = {
  backgroundColor: "#0c0a09",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const h1 = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "40px",
  margin: "0 0 20px",
};

const section = {
  backgroundColor: "#1c1917",
  borderRadius: "8px",
  padding: "24px",
  border: "1px solid #292524",
};

const text = {
  color: "#d6d3d1",
  fontSize: "16px",
  lineHeight: "24px",
};

const label = {
  color: "#78716c",
  fontSize: "12px",
  fontWeight: "bold",
  textTransform: "uppercase" as const,
  margin: "12px 0 4px",
};

const value = {
  color: "#ffffff",
  fontSize: "16px",
  margin: "0 0 12px",
};

const messageText = {
  color: "#ffffff",
  fontSize: "16px",
  lineHeight: "24px",
  whiteSpace: "pre-wrap" as const,
};

const hr = {
  borderColor: "#292524",
  margin: "20px 0",
};

const footer = {
  color: "#57534e",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "20px",
};
