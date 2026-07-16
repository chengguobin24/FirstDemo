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

export type Solution = {
  slug: string;
  name: string;
  summary: string;
  needs: string[];
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

export const solutions: Solution[] = [
  { slug: "distributors", name: "Distributor Programs", summary: "Coordinated product, packaging and documentation support for repeat market programs.", needs: ["Market-specific product selection", "Sample and finish confirmation", "Branded documentation", "Repeat-order consistency"] },
  { slug: "contractors", name: "Contractor Projects", summary: "Drawing-led review and practical installation preparation for project delivery teams.", needs: ["Drawing and dimension review", "Installation condition checks", "Component labeling", "Installation references"] },
  { slug: "architectural-projects", name: "Architectural Projects", summary: "Custom configurations aligned with the visual language and technical constraints of a project.", needs: ["Profile and proportion review", "Finish matching", "Interface coordination", "Project-specific submittals"] },
];

export const projectPlaceholders = [
  { category: "Pergola", title: "Hospitality outdoor dining", location: "Project details pending", shape: "wide" },
  { category: "Fence", title: "Residential privacy boundary", location: "Project details pending", shape: "tall" },
  { category: "Gate", title: "Custom villa entrance", location: "Project details pending", shape: "tall" },
  { category: "Fence", title: "Commercial perimeter system", location: "Project details pending", shape: "wide" },
];

export const videoSlots = [
  { slug: "factory-tour", title: "Factory tour", category: "Manufacturing", description: "Production areas, equipment and workflow.", src: null, poster: "/images/junsu-hero.jpg" },
  { slug: "powder-coating", title: "Surface preparation & coating", category: "Manufacturing", description: "Verified footage of preparation, coating and inspection.", src: null, poster: "/images/junsu-hero.jpg" },
  { slug: "fence-installation", title: "Fence installation", category: "Installation", description: "Site preparation, post alignment and panel installation.", src: null, poster: "/images/junsu-hero.jpg" },
  { slug: "gate-installation", title: "Gate installation", category: "Installation", description: "Gate assembly, hardware and automation preparation.", src: null, poster: "/images/junsu-hero.jpg" },
  { slug: "pergola-installation", title: "Pergola installation", category: "Installation", description: "Frame assembly, louver installation and final checks.", src: null, poster: "/images/junsu-hero.jpg" },
] as const;

export const faqs = [
  { question: "Can products be customized for our market?", answer: "Yes. Dimensions, profiles, finish references and project interfaces can be reviewed before quotation. Final capability depends on the confirmed drawing and order requirements." },
  { question: "What information is needed for a quotation?", answer: "Please send the product type, dimensions, quantity, application, destination country and preferred finish. Drawings or reference images help us prepare a more accurate response." },
  { question: "Can you work from architectural drawings?", answer: "Yes. PDF, DWG and DXF references can be attached to the inquiry form. Our team will review the available information before confirming the proposal." },
  { question: "Do you provide installation guidance?", answer: "Installation references can be prepared for the confirmed system. The exact document set will be agreed during project confirmation." },
  { question: "How quickly will we receive a response?", answer: "The export team targets an initial response within one business day. Complex drawing reviews may require additional time." },
];

export const searchablePages = [
  { title: "Aluminum fence systems", href: "/products/aluminum-fences", text: "privacy louver boundary residential commercial distributor" },
  { title: "Aluminum gate systems", href: "/products/aluminum-gates", text: "sliding swing pedestrian automation entrance" },
  { title: "Aluminum pergola systems", href: "/products/aluminum-pergolas", text: "louvered outdoor hospitality residential drainage shade" },
  { title: "OEM / ODM workflow", href: "/oem-odm", text: "custom engineering sample drawing production inspection packaging" },
  { title: "Distributor solutions", href: "/solutions/distributors", text: "repeat order branding documentation market" },
  { title: "Contractor solutions", href: "/solutions/contractors", text: "installation drawing project delivery" },
  { title: "Architectural project support", href: "/solutions/architectural-projects", text: "finish profile interface submittal" },
  { title: "Factory and quality", href: "/about", text: "manufacturing inspection coating packaging company" },
  { title: "Project gallery", href: "/projects", text: "case study fence gate pergola" },
  { title: "Factory and installation videos", href: "/videos", text: "factory production installation video" },
  { title: "Downloads and FAQ", href: "/resources", text: "catalog specification installation faq download" },
  { title: "Contact export team", href: "/contact", text: "inquiry quotation drawing email" },
];

export const navItems = [
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "OEM / ODM", href: "/oem-odm" },
  { label: "Projects", href: "/projects" },
  { label: "Videos", href: "/videos" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];
