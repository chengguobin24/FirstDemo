import { FenceDetail, generateFenceMetadata, type FencePageProps } from "./FenceDetail";

export function generateMetadata({ searchParams }: FencePageProps) {
  return generateFenceMetadata({
    variant: "systems",
    searchParams,
    title: "Aluminum Fence Systems | Privacy, Slat & Boundary",
    description: "Explore durable 6063-T5 aluminum fence systems in open-slat, semi-privacy and closed privacy layouts with powder coating and project-specific spacing.",
    canonical: "/products/aluminum-fences",
  });
}

export default function AluminumFenceSystemsPage(props: FencePageProps) {
  return <FenceDetail variant="systems" {...props} />;
}
