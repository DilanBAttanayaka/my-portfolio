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
    images: [1, 2, 3, 4],
  },
  "hospital-management": {
    title: "Hospital Management",
    techs: [
      { name: "Next.js 14", icon: "/svgs/nextjs.svg" },
      { name: "React", icon: "/svgs/react.svg" },
      { name: "TypeScript", icon: "/svgs/typescript.svg" },
      { name: "Tailwind CSS", icon: "/svgs/tailwind.svg" },
      { name: "Material UI", icon: "/svgs/materialui2.svg" },
    ],
    description:
      "A comprehensive, robust platform designed to streamline healthcare operations through integrated inventory, staff, and financial management modules.",
    features: [
      {
        title: "Integrated POS System",
        description:
          "Full-featured Point of Sale system for pharmacy and hospital services, integrated with inventory and financial records for real-time tracking.",
      },
      {
        title: "Offline App Capability",
        description:
          "Enabling offline access and local data storage, ensuring critical hospital functions remain available during connectivity issues.",
      },
      {
        title: "Comprehensive Resource Management",
        description:
          "Advanced modules for inventory tracking, supplier management, employee scheduling, and financial accounting integrated into a single unified dashboard.",
      },
      {
        title: "Modern UI/UX with MUI",
        description:
          "Built with Material UI to provide a clean and functional interface for healthcare professionals to navigate complex data efficiently.",
      },
    ],
    role: `Front End Developer for a robust Hospital Management System using Next.js 14, TypeScript, and Material UI. Developed an integrated POS system for hospital services and implemented features for offline capability. Built complex management modules for inventory, staff, and finance, ensuring a seamless and reliable user experience for healthcare providers.`,
    images: [1],
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
    images: [1, 2, 3, 4],
  },
  twostapp: {
    title: "TwoStapp",
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
    images: [1, 2, 3, 4],
  },
  miiroom: {
    title: "MiiRoom",
    techs: [
      { name: "Next.js 15", icon: "/svgs/nextjs.svg" },
      { name: "React 19", icon: "/svgs/react.svg" },
      { name: "TypeScript", icon: "/svgs/typescript.svg" },
      { name: "Tailwind CSS 4", icon: "/svgs/tailwind.svg" },
      { name: "AWS Amplify", icon: "/svgs/amplify.svg" },
      { name: "Framer Motion", icon: "/svgs/framer.svg" },
    ],
    description:
      "A premium short-term rental marketplace connecting property hosts with travelers, featuring a robust booking system, real-time availability tracking, and integrated map discovery.",
    features: [
      {
        title: "Interactive Map Discovery",
        description:
          "Integrated Google Maps API to provide a seamless property search experience with location-based filtering and custom map markers for enhanced spatial awareness",
      },
      {
        title: "Secure Authentication & AWS Integration",
        description:
          "Implemented robust user authentication and cloud connectivity using AWS Amplify and Cognito, ensuring secure guest and host account management with seamless data synchronization",
      },
      {
        title: "Advanced Booking & Availability",
        description:
          "Developed a real-time reservation system with complex availability logic, automated booking flows, and status tracking for properties to ensure conflict-free scheduling",
      },
      {
        title: "Data-Driven Host Dashboard",
        description:
          "Built a comprehensive dashboard for hosts using Recharts for analytics, property listing management, and earning tracking with a modern, high-performance user interface",
      },
    ],
    role: `Lead Frontend Developer for a premium short-term rental platform using Next.js 15, React 19, and TypeScript. Architected the core application structure with SST (Serverless Stack) and integrated AWS Amplify for secure authentication and cloud services. Developed high-performance UI components using Tailwind CSS 4 and Framer Motion for smooth transitions. Implemented interactive mapping features with Google Maps API and complex state management using Zustand, delivering a polished, high-performance user experience for both hosts and guests.`,
    images: [1, 2, 3, 4],
    mobile: {
      title: "MiiRoom Mobile App",
      techs: [
        { name: "React Native", icon: "/svgs/react.svg" },
        { name: "Expo", icon: "/svgs/expo.svg" },
        { name: "TypeScript", icon: "/svgs/typescript.svg" },
        { name: "AWS Amplify", icon: "/svgs/amplify.svg" },
        { name: "Zustand", icon: "/svgs/zustand.svg" },
      ],
      description:
        "A dedicated mobile application for MiiRoom, optimized for on-the-go property management and instant guest communication.",
      features: [
        {
          title: "Real-time Push Notifications",
          description:
            "Instant alerts for new bookings, guest messages, and check-in reminders to keep hosts and guests synchronized at all times.",
        },
        {
          title: "In-App Chat System",
          description:
            "Seamless messaging interface for guests to communicate directly with hosts, featuring image sharing and quick-reply templates.",
        },
        {
          title: "Offline Booking Access",
          description:
            "Enables guests to access their reservation details and check-in instructions even without an active internet connection.",
        },
        {
          title: "Mobile Listing Management",
          description:
            "Allow hosts to capture and upload property photos directly from their camera and update pricing on the fly.",
        },
      ],
      role: `Lead Developer for MiiRoom Mobile App. Built the cross-platform application using React Native and Expo. Implemented real-time messaging using AWS AppSync and Push Notifications with Pinpoint. Focused on creating a high-fidelity mobile experience with smooth gesture-driven interactions and offline-first data persistence.`,
      images: [1, 2, 3, 4],
    },
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

  return <ProjectDetail project={{ ...project, slug }} />;
}

export async function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug,
  }));
}
