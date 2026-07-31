import Link from "next/link";

export function FloatingInquiryButton() {
  return (
    <Link
      className="floating-inquiry"
      href="/#quote"
      aria-label="Go to the inquiry form"
      title="Send an inquiry"
    >
      <span className="floating-inquiry-icon" aria-hidden="true" />
      <span className="sr-only">Inquiry</span>
    </Link>
  );
}
