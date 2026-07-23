import { FenceDetail, generateFenceMetadata, type FencePageProps } from "../FenceDetail";

export function generateMetadata({ searchParams }: FencePageProps) {
  return generateFenceMetadata({
    variant: "open",
    searchParams,
    title: "Open-Slat Aluminum Fences | Boundary Systems",
    description: "Open-slat 6063-T5 aluminum boundary fences with horizontal or vertical layouts, powder coating and spacing prepared around residential or commercial projects.",
    canonical: "/products/aluminum-fences/open-slat-fences",
  });
}

export default function OpenSlatFencePage(props: FencePageProps) {
  return <FenceDetail variant="open" {...props} />;
}
