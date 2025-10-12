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
      { name: "Ant Design", icon: "/svgs/radixui.svg" },
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
  "mti-electronics": {
    title: "MTI Electronics",
    tech: "Next.js, Payload CMS, Tailwind CSS, shadcn, Swiper.js, React Hook Form, Vercel",
    description:
      "A complete agency portfolio platform built for MTI Electronics to showcase their services, blog content, and product offerings.",
    features: `☁️Service Display System: Interactive service showcase with synchronized sliders
☁️Blog Management: SEO-friendly blog with categorization and search
☁️Product Catalog: Organized product display with filtering capabilities
Fully Responsive: Optimized for all device sizes
Fast Performance: Optimized Next.js frontend with ISR (Incremental Static Regeneration)`,
    role: `Full-Stack Developer
Owned the entire development lifecycle:
Backend: Configured Payload CMS with custom collections for services, blogs, and products
Frontend: Built all UI components using Tailwind CSS and shadcn
State Management: Implemented client-side data fetching and caching
CMS Customization: Created admin interfaces for content editors
Deployment: Set up CI/CD pipeline for Vercel hosting
Third-Party Integration: Added Swiper.js for interactive sliders`,
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
