import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "JUNSU Aluminum Systems", short_name: "JUNSU", description: "Project-specific aluminum fence, gate and pergola systems.", start_url: "/", display: "standalone", background_color: "#f4f1e9", theme_color: "#171a18", icons: [{ src: "/favicon.png", sizes: "64x64", type: "image/png" }] };
}
