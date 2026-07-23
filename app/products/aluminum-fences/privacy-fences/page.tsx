import { FenceDetail, generateFenceMetadata, type FencePageProps } from "../FenceDetail";

export function generateMetadata({ searchParams }: FencePageProps) {
  return generateFenceMetadata({
    variant: "privacy",
    searchParams,
    title: "Aluminum Privacy Fences | Solid Slat Systems",
    description: "Closed aluminum privacy fence systems in project-specific horizontal or vertical layouts, made from 6063-T5 aluminum with a powder-coated finish.",
    canonical: "/products/aluminum-fences/privacy-fences",
  });
}

export default function PrivacyFencePage(props: FencePageProps) {
  return <FenceDetail variant="privacy" {...props} />;
}
