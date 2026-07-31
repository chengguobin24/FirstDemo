import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Contact JUNSU",
  description: "Contact JUNSU for aluminum fence, gate and pergola project quotations.",
  alternates: { canonical: "/#quote" },
  robots: { index: false, follow: true },
};

export default function ContactPage() {
  redirect("/#quote");
}
