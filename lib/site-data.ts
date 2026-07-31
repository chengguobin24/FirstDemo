export type Product = {
  slug: string;
  number: string;
  name: string;
  shortName: string;
  eyebrow: string;
  summary: string;
  description: string;
  applications: string[];
  capabilities: string[];
};

export const products: Product[] = [
  {
    slug: "aluminum-fences",
    number: "01",
    name: "Aluminum Fence Systems",
    shortName: "Fences",
    eyebrow: "Boundary systems",
    summary: "Modular privacy, louver and boundary systems for residential and commercial projects.",
    description: "Project-specific aluminum fence systems developed around dimensions, privacy requirements, finish references and installation conditions.",
    applications: ["Residential boundaries", "Commercial perimeters", "Landscape projects", "Distributor programs"],
    capabilities: ["Custom width and height", "Horizontal, vertical and louver profiles", "RAL-referenced powder coating", "Installation documentation"],
  },
  {
    slug: "aluminum-gates",
    number: "02",
    name: "Aluminum Gate Systems",
    shortName: "Gates",
    eyebrow: "Entrance systems",
    summary: "Sliding, swing and pedestrian entrances prepared for project hardware and automation.",
    description: "Coordinated aluminum gate systems for villas, communities and commercial entrances, matched to fence profiles and project requirements.",
    applications: ["Villa entrances", "Residential communities", "Commercial access", "Pedestrian gates"],
    capabilities: ["Sliding and swing configurations", "Automation-ready options", "Custom infill patterns", "Coordinated fence and gate finishes"],
  },
  {
    slug: "aluminum-pergolas",
    number: "03",
    name: "Aluminum Pergola Systems",
    shortName: "Pergolas",
    eyebrow: "Outdoor systems",
    summary: "Louvered outdoor structures for residential, hospitality and commercial applications.",
    description: "Manual and motorized pergola configurations designed around shade, ventilation, rain management and the architectural context of each project.",
    applications: ["Residential terraces", "Hospitality spaces", "Commercial courtyards", "Outdoor dining"],
    capabilities: ["Motorized or manual options", "Integrated drainage concepts", "Lighting and screen options", "Freestanding or wall-mounted layouts"],
  },
];

export const searchablePages = [
  { title: "Aluminum fence systems", href: "/products/aluminum-fences", text: "privacy louver boundary residential commercial distributor" },
  { title: "Aluminum gate systems", href: "/products/aluminum-gates", text: "sliding swing pedestrian automation entrance" },
  { title: "Custom aluminum pergola systems", href: "/products/aluminum-pergolas", text: "custom aluminum pergola manufacturer motorized louvered pergola adjustable louvered roof retractable pergola residential patio hospitality commercial outdoor shade" },
  { title: "OEM / ODM workflow", href: "/oem-odm", text: "custom engineering sample drawing production inspection packaging" },
  { title: "Factory and quality", href: "/about", text: "manufacturing inspection coating packaging company" },
  { title: "Factory and installation videos", href: "/videos", text: "factory production installation video" },
  { title: "Buyer guides and project insights", href: "/blog", text: "blog journal buyer guide aluminum fence gate pergola sourcing design project" },
  { title: "Contact export team", href: "/#quote", text: "inquiry quotation drawing email" },
];

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "OEM / ODM", href: "/oem-odm" },
  { label: "Videos", href: "/videos" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];
