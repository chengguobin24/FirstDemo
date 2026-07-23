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

export const applicationGallery = [
  {
    category: "Pergola",
    title: "Freestanding louvered garden pergola",
    context: "Outdoor living application reference",
    image: "/images/product-gallery/pergolas/pergola-04.jpg",
    alt: "White freestanding pergola with a dark adjustable louvered roof in a landscaped garden",
    shape: "wide",
  },
  {
    category: "Fence",
    title: "Louvered residential privacy boundary",
    context: "Residential application reference",
    image: "/images/product-gallery/fences/fence-01.jpg",
    alt: "Dark aluminum privacy fence with angled upper louvers beside a residence",
    shape: "tall",
  },
  {
    category: "Gate",
    title: "Decorative pedestrian entrance",
    context: "Entrance application reference",
    image: "/images/product-gallery/gates/gate-03.jpg",
    alt: "Dark aluminum pedestrian entrance gate with a geometric decorative border",
    shape: "tall",
  },
  {
    category: "Pergola",
    title: "Motorized terrace shade system",
    context: "Terrace application reference",
    image: "/images/product-gallery/pergolas/pergola-02.jpg",
    alt: "Aluminum pergola providing adjustable shade over a modern terrace",
    shape: "wide",
  },
  {
    category: "Gate",
    title: "Coordinated sliding driveway gate",
    context: "Residential entrance reference",
    image: "/images/product-gallery/gates/gate-07.jpg",
    alt: "Modern aluminum sliding driveway gate coordinated with the surrounding fence",
    shape: "wide",
  },
  {
    category: "Fence",
    title: "Contemporary vertical slat fence",
    context: "Boundary application reference",
    image: "/images/product-gallery/fences/fence-03.jpg",
    alt: "Contemporary vertical aluminum slat fence around a landscaped property",
    shape: "wide",
  },
] as const;

export const videoSlots = [
  { slug: "factory-tour", title: "Factory tour", category: "Manufacturing", description: "Production areas, equipment and workflow.", src: null, poster: "/images/junsu-hero.jpg" },
  { slug: "powder-coating", title: "Surface preparation & coating", category: "Manufacturing", description: "Verified footage of preparation, coating and inspection.", src: null, poster: "/images/junsu-hero.jpg" },
  { slug: "fence-installation", title: "Fence installation", category: "Installation", description: "Site preparation, post alignment and panel installation.", src: null, poster: "/images/junsu-hero.jpg" },
  { slug: "gate-installation", title: "Gate installation", category: "Installation", description: "Gate assembly, hardware and automation preparation.", src: null, poster: "/images/junsu-hero.jpg" },
  { slug: "pergola-installation", title: "Pergola installation", category: "Installation", description: "Frame assembly, louver installation and final checks.", src: null, poster: "/images/junsu-hero.jpg" },
] as const;

export const searchablePages = [
  { title: "Aluminum fence systems", href: "/products/aluminum-fences", text: "privacy louver boundary residential commercial distributor" },
  { title: "Aluminum gate systems", href: "/products/aluminum-gates", text: "sliding swing pedestrian automation entrance" },
  { title: "Custom aluminum pergola systems", href: "/products/aluminum-pergolas", text: "custom aluminum pergola manufacturer motorized louvered pergola adjustable louvered roof retractable pergola residential patio hospitality commercial outdoor shade" },
  { title: "OEM / ODM workflow", href: "/oem-odm", text: "custom engineering sample drawing production inspection packaging" },
  { title: "Factory and quality", href: "/about", text: "manufacturing inspection coating packaging company" },
  { title: "Project gallery", href: "/projects", text: "case study fence gate pergola" },
  { title: "Factory and installation videos", href: "/videos", text: "factory production installation video" },
  { title: "Contact export team", href: "/#quote", text: "inquiry quotation drawing email" },
];

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "OEM / ODM", href: "/oem-odm" },
  { label: "Projects", href: "/projects" },
  { label: "Videos", href: "/videos" },
  { label: "About", href: "/about" },
];
