import ProjectDetail from "@/components/ProjectDetail";
import { notFound } from "next/navigation";

const projectsData = {
  "mti-electronics": {
    title: "MTI Electronics",
    tech: "Next.js, Payload CMS, Tailwind CSS, shadcn, Swiper.js, React Hook Form, Vercel",
    description:
      "A complete agency portfolio platform built for MTI Electronics to showcase their services, blog content, and product offerings.",
    features: `Service Display System: Interactive service showcase with synchronized sliders
Blog Management: SEO-friendly blog with categorization and search
Product Catalog: Organized product display with filtering capabilities
Fully Responsive: Optimized for all device sizes
Fast Performance: Optimized Next.js frontend with ISR (Incremental Static Regeneration)`,
    technical: `Implemented complex slider synchronization logic using Swiper.js
Customized Payload CMS admin panel for intuitive content management
Developed reusable UI components with shadcn for design consistency
Configured efficient data fetching strategies in Next.js`,
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
