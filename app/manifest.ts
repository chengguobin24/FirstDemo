import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "JUNSU Aluminum Systems", short_name: "JUNSU", description: "Project-specific aluminum fence, gate and pergola systems.", start_url: "/", display: "standalone", background_color: "#ffffff", theme_color: "#171a18", icons: [{ src: "/favicon.png", sizes: "1254x1254", type: "image/png" }] };
}
