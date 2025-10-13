import ProjectDetail from "@/components/ProjectDetail";
import { notFound } from "next/navigation";

const projectsData = {
  "bean-empire": {
    title: "Bean Empire",
    techs: [
      { name: "Next.js 14", icon: "/svgs/nextjs.svg" },
      { name: "React 18", icon: "/svgs/react.svg" },
      { name: "TypeScript", icon: "/svgs/typescript.svg" },
      { name: "Tailwind CSS", icon: "/svgs/tailwind.svg" },
      { name: "Redux Toolkit", icon: "/svgs/redux.svg" },
      { name: "Ant Design", icon: "/svgs/antdesign.svg" },
      { name: "PayHere", icon: "/svgs/payhere.png" },
    ],
    description:
      "A full-stack e-commerce platform for premium coffee beans and barista equipment targeting the Sri Lankan HoReCa industry (cafes, hotels, restaurants).",
    features: [
      {
        title: "Shopping Cart",
        description:
          "Built persistent shopping cart with Redux Toolkit state management and local storage for seamless user experience across sessions",
      },
      {
        title: "Payment Integration",
        description:
          "Integrated PayHere payment gateway with secure checkout forms, validation, and error handling for Sri Lankan market",
      },
      {
        title: "Responsive Design",
        description:
          "Implemented mobile-first responsive design ensuring seamless experience across all devices with optimized layouts",
      },
      {
        title: "SEO Optimization",
        description:
          "Enhanced frontend with meta tags, structured data, Open Graph, and Twitter Cards for better search engine visibility",
      },
    ],
    role: `Led frontend development for a premium coffee e-commerce platform using Next.js 14, React 18, and TypeScript. Built responsive UI components with Ant Design and Tailwind CSS, implemented Redux Toolkit for state management, and integrated PayHere payment processing. Delivered optimized user experiences across all devices with intuitive shopping flows and form validation.`,
  },
  "ai-content-writer": {
    title: "AI Content Writer",
    techs: [
      { name: "Next.js 14", icon: "/svgs/nextjs.svg" },
      { name: "React", icon: "/svgs/react.svg" },
      { name: "TypeScript", icon: "/svgs/typescript.svg" },
      { name: "Tailwind CSS", icon: "/svgs/tailwind.svg" },
      { name: "Radix UI", icon: "/svgs/radixui.svg" },
      { name: "TipTap", icon: "/svgs/tipTap.svg" },
    ],
    description:
      "A comprehensive AI-powered SEO content generation and optimization platform that revolutionizes content creation for businesses and marketers.",
    features: [
      {
        title: "AI-Powered Content Generation",
        description:
          "One-click article generation, advanced content creation with customizable structure, social media content generation, product reviews, content humanizer, and real-time generation with WebSocket subscriptions",
      },
      {
        title: "AI Image Generation & Integration",
        description:
          "Text-to-image generation with multiple art styles, Unsplash integration for stock photos, smart image sizing, and seamless integration into content creation workflow",
      },
      {
        title: "Advanced Rich Text Editor",
        description:
          "TipTap-powered professional editor with visual heading indicators, advanced formatting options, AI content enhancement tools, and in-editor AI assistance for rephrasing and summarizing",
      },
      {
        title: "Modern User Experience",
        description:
          "Responsive design with dark/light mode support, real-time chat interface, generation history tracking, and optimized performance across all devices",
      },
    ],
    role: `Front End Developer for an AI-powered SEO content generation platform using Next.js 14, React, and TypeScript. Built responsive UI components with Radix UI and Shadcn/ui, implemented ProseMirror rich text editor with advanced formatting, and integrated real-time WebSocket connections for live content generation. Created intuitive user interfaces for AI content enhancement tools, developed theme switching functionality, and optimized frontend performance for handling complex content workflows.`,
  },
  "cafe-finder": {
    title: "Cafe Finder",
    techs: [
      { name: "Next.js 14", icon: "/svgs/nextjs.svg" },
      { name: "React", icon: "/svgs/react.svg" },
      { name: "TypeScript", icon: "/svgs/typescript.svg" },
      { name: "Tailwind CSS", icon: "/svgs/tailwind.svg" },
      { name: "Radix UI", icon: "/svgs/radixui.svg" },
      { name: "Supabase", icon: "/svgs/supabase.svg" },
    ],
    description:
      "A modern web application for discovering and reviewing coffee shops, built with cutting-edge technologies and serverless architecture.",
    features: [
      {
        title: "Interactive Cafe Discovery",
        description:
          "Advanced search with filters, interactive Google Maps integration, location-based discovery, and comprehensive cafe profiles with detailed information and reviews",
      },
      {
        title: "Complete User Experience",
        description:
          "Full authentication system with login/signup, password reset, user profiles, review and rating system, plus business management dashboard for cafe owners",
      },
      {
        title: "Rich Content Platform",
        description:
          "Integrated blog system, news section, TinyMCE rich text editing, and comprehensive image upload and management capabilities for engaging content",
      },
      {
        title: "Modern Technical Architecture",
        description:
          "Responsive design with dark mode, SEO optimization, type-safe database queries, automated migrations, cookie consent management, and email notifications with Resend",
      },
    ],
    role: `Front End Developer for a comprehensive cafe discovery platform using Next.js 14, TypeScript, and Supabase. Integrated Supabase API calls for authentication, data fetching, and real-time updates. Implemented Google Maps API integration for location services and interactive mapping features. Built responsive UI components with Radix UI, React Hook Form for form handling, and Zod for schema validation. Delivered optimized user experiences with modern frontend architecture and performance optimization.`,
  },
  twost: {
    title: "Twost",
    techs: [
      { name: "Next.js 15", icon: "/svgs/nextjs.svg" },
      { name: "React 19", icon: "/svgs/react.svg" },
      { name: "TypeScript", icon: "/svgs/typescript.svg" },
      { name: "Tailwind CSS", icon: "/svgs/tailwind.svg" },
      { name: "Radix UI", icon: "/svgs/radixui.svg" },
      { name: "AWS Amplify", icon: "/svgs/amplify.svg" },
    ],
    description:
      "A centralized management system for food delivery service orders from Uber Eats and other platforms, designed for restaurants to efficiently manage their delivery operations.",
    features: [
      {
        title: "Real-time Order Management",
        description:
          "Complete order lifecycle tracking through multiple statuses with real-time updates, detailed order views, and comprehensive filtering capabilities for efficient restaurant operations",
      },
      {
        title: "Multi-Platform Integration",
        description:
          "Seamless Uber Eats integration with OAuth authentication, DoorDash-ready infrastructure, and Square POS connectivity for comprehensive delivery service management",
      },
      {
        title: "Restaurant Management Dashboard",
        description:
          "Store profile management, provider dashboard for service connections, real-time integration status monitoring, and intuitive restaurant settings interface",
      },
      {
        title: "Modern User Experience",
        description:
          "Responsive design with dark/light theme support, intuitive animations, efficient pagination, smooth loading states, and optimized mobile experience",
      },
    ],
    role: `Front End Developer for a food delivery order management system using Next.js 15, React 19, and TypeScript. Built responsive UI components with Radix UI, implemented React Hook Form for form validation, and integrated AWS Amplify for authentication flows. Created real-time order tracking interface with status animations, developed theme switching functionality, and optimized performance for handling large order datasets with efficient pagination and loading states.`,
  },
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectsData[slug as keyof typeof projectsData];

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}

export async function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug,
  }));
}
