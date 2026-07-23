import { FenceDetail, generateFenceMetadata, type FencePageProps } from "../FenceDetail";

export function generateMetadata({ searchParams }: FencePageProps) {
  return generateFenceMetadata({
    variant: "semi-privacy",
    searchParams,
    title: "Semi-Privacy Aluminum Fences | Louver & Slat",
    description: "Louvered and spaced semi-privacy aluminum fences that balance filtered views and airflow with horizontal or vertical project-specific layouts.",
    canonical: "/products/aluminum-fences/semi-privacy-fences",
  });
}

export default function SemiPrivacyFencePage(props: FencePageProps) {
  return <FenceDetail variant="semi-privacy" {...props} />;
}
