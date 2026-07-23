export type FenceVariant = "systems" | "open" | "privacy" | "semi-privacy";

export const fenceHeroImages = {
  "fence-01": ["/images/product-gallery/fences/fence-01.jpg", "Dark aluminum fence with solid lower panels and louvered upper sections beside a residence"],
  "fence-02": ["/images/product-gallery/fences/fence-02.png", "Dark aluminum louver semi-privacy fence enclosing a landscaped patio"],
  "fence-03": ["/images/product-gallery/fences/fence-03.jpg", "Vertical open-slat aluminum boundary fence in front of a residence"],
  "fence-04": ["/images/product-gallery/fences/fence-04.png", "Horizontal open-slat aluminum boundary fence around a residential property"],
  "fence-05": ["/images/product-gallery/fences/fence-05.png", "Solid horizontal aluminum privacy fence panels"],
} as const;

export type FenceImageKey = keyof typeof fenceHeroImages;

export const fenceHeroContent = {
  "fence-01": {
    seoTitle: "Louvered & Solid Semi-Privacy Aluminum Fence",
    seoDescription: "Louvered and solid aluminum semi-privacy fence panels with adjustable screening, powder coating and project-specific sizing for residential boundaries.",
    eyebrow: "Layered privacy for residential boundaries",
    title: "Louvered Semi-Privacy Fence with Solid Screening",
    configuration: "Solid lower panels · Louvered upper sections",
    paragraphs: [
      "This mixed aluminum fence design combines solid lower panels with louvered upper sections, creating stronger screening at eye level while keeping the boundary visually lighter above. The alternating panel treatment gives a long residential edge more rhythm than one uninterrupted closed surface.",
      "Louver angle, visible spacing, panel proportions and the transition between solid and ventilated sections are developed around the approved elevation. The result can be adjusted for a more filtered view or stronger privacy without changing the complete fence system.",
      "Manufactured from 6063-T5 aluminum with a powder-coated finish, the panels insert into the post channels for a coordinated installation. This direction suits villa side boundaries, residential gardens and custom fence projects that need privacy, airflow and a matching gate design.",
    ],
    tags: ["Mixed privacy layout", "Louvered airflow", "Residential boundary"],
  },
  "fence-02": {
    seoTitle: "Modern Louvered Aluminum Fence for Patio Privacy",
    seoDescription: "Powder-coated louvered aluminum semi-privacy fencing with filtered views, airflow and customized panel spacing for patios, gardens and villa boundaries.",
    eyebrow: "Ventilated screening for outdoor spaces",
    title: "Louvered Aluminum Fence for Filtered Privacy",
    configuration: "Angled louver infill · Controlled views and airflow",
    paragraphs: [
      "Angled aluminum louvers create a filtered boundary around this landscaped outdoor area, reducing direct sightlines without turning the patio into a fully closed enclosure. The horizontal rhythm works especially well beside modern paving, planting and low residential architecture.",
      "The screening level is controlled through the louver profile, angle, panel height and spacing shown on the approved drawing. Customers can request a tighter visual filter or a lighter, more ventilated layout according to the location and desired privacy level.",
      "The powder-coated 6063-T5 aluminum panels are prepared to suit the confirmed posts, dimensions and site arrangement. This semi-privacy fence design is suited to villa gardens, residential patios, side boundaries and commercial landscape areas that benefit from airflow and durable outdoor screening.",
    ],
    tags: ["Louvered screening", "Filtered privacy", "Garden airflow"],
  },
  "fence-03": {
    seoTitle: "Vertical Open-Slat Aluminum Boundary Fence",
    seoDescription: "Vertical open-slat aluminum boundary fencing with customizable gaps, powder coating and project-specific panels for residential and commercial perimeters.",
    eyebrow: "Vertical rhythm for open boundaries",
    title: "Vertical Open-Slat Aluminum Boundary Fence",
    configuration: "Open visibility · Project-specific vertical spacing",
    paragraphs: [
      "Closely repeated vertical slats give this aluminum boundary fence a clear architectural rhythm while retaining visibility through the perimeter. The upright proportions help define a residential frontage without creating the visual weight of a solid privacy wall.",
      "Slat width, gap spacing, panel height and post positions are reviewed around the façade, landscape and required level of separation. Wider gaps create a lighter boundary, while a tighter arrangement increases visual filtering without misrepresenting the system as a full privacy fence.",
      "Each panel uses powder-coated 6063-T5 aluminum and inserts into the post channels for a clean connection. Vertical open-slat fencing is suitable for residential front boundaries, villa gardens, landscape divisions and commercial perimeter projects requiring durable customized separation.",
    ],
    tags: ["Vertical slat fence", "Open boundary", "Adjustable spacing"],
  },
  "fence-04": {
    seoTitle: "Horizontal Slat Aluminum Boundary Fence",
    seoDescription: "Modern horizontal slat aluminum fencing with customizable spacing, powder-coated panels and coordinated gate options for landscape and residential boundaries.",
    eyebrow: "Wide architectural lines for landscape edges",
    title: "Horizontal Slat Aluminum Boundary Fence",
    configuration: "Horizontal panel layout · Adjustable open spacing",
    paragraphs: [
      "Horizontal aluminum slats give this boundary fence a wider, more continuous expression that follows the landscape instead of emphasizing height. The open gaps preserve light and visibility, making the design useful where separation is required without full visual screening.",
      "The distance between slats, panel length, post rhythm and overall height are customized through the project elevation. Spacing can be coordinated with planting, wall modules and a matching pedestrian or driveway gate so the complete boundary reads as one system.",
      "The 6063-T5 aluminum panels receive a powder-coated finish and insert into the post channels for project-specific assembly. This horizontal open-slat fence suits residential gardens, villa boundaries, landscape separation and selected commercial perimeter applications.",
    ],
    tags: ["Horizontal slats", "Landscape boundary", "Coordinated gate design"],
  },
  "fence-05": {
    seoTitle: "Solid Horizontal Aluminum Privacy Fence Panels",
    seoDescription: "Solid horizontal aluminum privacy fence panels with closed screening, powder coating and customized dimensions for villas, courtyards and commercial boundaries.",
    eyebrow: "Closed screening for private boundaries",
    title: "Solid Horizontal Aluminum Privacy Fence",
    configuration: "Closed infill · Full visual screening",
    paragraphs: [
      "This solid horizontal aluminum fence creates a calm, continuous privacy surface with no intentional open gap between the main infill lines. The restrained panel design is suited to projects where visual screening is more important than maintaining an open view through the boundary.",
      "Panel width, height, horizontal proportions, post locations and connection details are developed around the approved site drawing rather than a fixed catalogue size. The same direction and powder-coated color can be coordinated with pedestrian gates and driveway entrances.",
      "Made from 6063-T5 aluminum with panels inserted into the post channels, this closed privacy fence is intended for villa courtyards, private residential edges, landscaped outdoor rooms and commercial screening areas requiring a durable customized boundary system.",
    ],
    tags: ["Full privacy", "Solid horizontal infill", "Custom panel sizing"],
  },
} as const;

type FenceApplication = {
  src: string;
  alt: string;
  title: string;
  contain?: boolean;
};

type FenceContent = {
  activeLabel: string;
  defaultImage: keyof typeof fenceHeroImages;
  eyebrow: string;
  h1: string;
  configuration: string;
  introduction: readonly [string, string, string];
  heroTags: readonly [string, string, string];
  showcaseEyebrow: string;
  showcaseTitle: string;
  showcaseCopy: string;
  spacingTitle: string;
  spacingCopy: string;
  fenceType: string;
  privacyLevel: string;
  applicationTitle: string;
  applicationCopy: string;
  applications: readonly FenceApplication[];
  faqHeading: string;
  typeFaqs: readonly (readonly [string, string])[];
  schemaName: string;
  schemaCategory: string;
  schemaDescription: string;
};

export const fenceContent: Record<FenceVariant, FenceContent> = {
  systems: {
    activeLabel: "All systems",
    defaultImage: "fence-01",
    eyebrow: "Project-specific aluminum boundaries",
    h1: "Durable Aluminum Fence Systems",
    configuration: "Open, semi-private or private · Horizontal or vertical",
    introduction: [
      "JUNSU aluminum fence systems are developed for residential boundaries, villa courtyards, landscaped spaces and commercial perimeters. One coordinated system can be prepared as an open-slat protective boundary, a ventilated semi-privacy fence or a closed privacy screen according to the required balance of visibility, airflow and separation.",
      "Horizontal and vertical layouts are available, and the spacing between slats is confirmed around the customer’s visual reference and project requirements. Louvered panels form part of the semi-privacy range, while closed infill can be used where stronger visual screening is required.",
      "Fence panels use 6063-T5 aluminum with a powder-coated finish. Panel dimensions, post arrangement, color and connection details are reviewed through the approved project drawing, and matching gates can be coordinated with the same slat direction and finish.",
    ],
    heroTags: ["Custom fence system", "Adjustable spacing", "Powder-coated aluminum"],
    showcaseEyebrow: "Aluminum fence design families",
    showcaseTitle: "Set the Privacy Level, Then Shape the Lines",
    showcaseCopy: "Choose the amount of visual screening first, then coordinate horizontal or vertical slats, louvered sections, panel proportions and project-specific spacing. This keeps the fence system flexible without turning every visual combination into a separate product.",
    spacingTitle: "Custom Aluminum Fence Panels, Built Around Your Spacing",
    spacingCopy: "Our aluminum fence factory produces open-slat, louvered, semi-privacy and closed privacy panels around the approved project drawing. Slat direction, visible gap, panel proportions and powder-coated color can be controlled for custom residential boundaries, commercial perimeter fencing and OEM fence programs.",
    fenceType: "Open-slat, semi-privacy or privacy fence",
    privacyLevel: "Selected for each project",
    applicationTitle: "One system, different boundaries.",
    applicationCopy: "The same material and finish language can move from open residential boundaries to private courtyard screening and coordinated gate systems.",
    applications: [
      { src: "/images/product-gallery/fences/fence-01.jpg", alt: "Mixed privacy aluminum fence beside a residence", title: "Residential boundaries" },
      { src: "/images/product-gallery/fences/fence-04.png", alt: "Horizontal aluminum slat fence around a landscaped property", title: "Landscape separation" },
      { src: "/images/product-gallery/fences/fence-05.png", alt: "Solid aluminum privacy fence panel system", title: "Private outdoor spaces" },
    ],
    faqHeading: "Plan the complete fence system.",
    typeFaqs: [
      ["How should the privacy level be selected?", "Start with the amount of visual screening and airflow required at the site. Open-slat fences retain visibility, semi-privacy layouts filter the view, and closed panels create stronger privacy. The final arrangement is confirmed with the project drawing."],
      ["Can different fence styles be coordinated in one project?", "Yes. Open, louvered, semi-private and closed panels can be reviewed as part of one visual system, subject to the confirmed layout and connection details."],
    ],
    schemaName: "Aluminum Fence Systems",
    schemaCategory: "Aluminum fence systems",
    schemaDescription: "Project-specific aluminum boundary, semi-privacy and privacy fence systems with horizontal or vertical layouts and customizable slat spacing.",
  },
  open: {
    activeLabel: "Open-slat",
    defaultImage: "fence-03",
    eyebrow: "Open aluminum boundary systems",
    h1: "Open-Slat Aluminum Boundary Fences",
    configuration: "Protective separation · Horizontal or vertical spacing",
    introduction: [
      "JUNSU open-slat aluminum fences create a clear protective boundary without turning the site into a closed privacy enclosure. The visible spacing makes this system suitable for residential front boundaries, villa gardens, landscape separation and commercial perimeter projects where an open architectural character is preferred.",
      "Slats can run vertically or horizontally, and the gap between profiles is prepared around the customer’s design reference and approved project elevation. This allows the fence to coordinate with the building façade, planting, pedestrian gate and driveway entrance instead of relying on one fixed spacing standard.",
      "The panels are manufactured from 6063-T5 aluminum and finished with powder coating. Fence panels insert into the post channels for a clean system connection, while embedded-post installation, panel dimensions and matching gate details are confirmed for the site before production.",
    ],
    heroTags: ["Open-slat boundary", "Horizontal or vertical", "Project-specific gaps"],
    showcaseEyebrow: "Open-slat aluminum fencing",
    showcaseTitle: "Protection Without Closing the View",
    showcaseCopy: "Vertical lines create a traditional boundary rhythm, while horizontal slats produce a wider architectural expression. Both directions retain visible spacing and can be aligned with matching pedestrian or driveway gates.",
    spacingTitle: "Open-Slat Fence Spacing Made to Your Elevation",
    spacingCopy: "These factory samples show that vertical and horizontal aluminum fence gaps do not need to follow one catalogue standard. We review the required visibility, slat direction, panel proportion and boundary drawing before producing custom open-slat fence panels for residential or commercial perimeter projects.",
    fenceType: "Open-slat aluminum boundary fence",
    privacyLevel: "Open visibility / non-privacy",
    applicationTitle: "Defined edges with an open character.",
    applicationCopy: "Open spacing is suited to front boundaries, villa gardens, landscape divisions and commercial perimeters that require separation without full visual screening.",
    applications: [
      { src: "/images/product-gallery/fences/fence-03.jpg", alt: "Vertical open-slat aluminum fence at a residential boundary", title: "Residential front boundaries" },
      { src: "/images/product-gallery/fences/fence-04.png", alt: "Horizontal open-slat aluminum fence around landscaping", title: "Landscape separation" },
      { src: "/images/product-gallery/fences/fence-options-compact.png", alt: "Compact reference sheet of aluminum boundary fence styles", title: "Boundary design planning", contain: true },
    ],
    faqHeading: "Open-slat fence questions.",
    typeFaqs: [
      ["Does an open-slat fence provide privacy?", "No. This category is intended to define and protect the boundary while retaining visibility through the fence. For filtered or closed views, use a semi-privacy or privacy configuration."],
      ["Can the open spacing be adjusted?", "Yes. Slat direction and spacing are reviewed around the required appearance and approved elevation rather than one fixed gap."],
    ],
    schemaName: "Open-Slat Aluminum Boundary Fences",
    schemaCategory: "Open-slat aluminum fences",
    schemaDescription: "Powder-coated 6063-T5 aluminum boundary fences with project-specific horizontal or vertical slat spacing for residential and commercial perimeters.",
  },
  privacy: {
    activeLabel: "Privacy",
    defaultImage: "fence-05",
    eyebrow: "Closed aluminum screening systems",
    h1: "Architectural Aluminum Privacy Fences",
    configuration: "Closed visual screening · Project-specific panel layout",
    introduction: [
      "JUNSU aluminum privacy fences use closed or closely coordinated infill to create a stronger visual barrier around villa courtyards, residential boundaries, landscaped outdoor rooms and commercial screening areas. The system focuses on privacy while maintaining a clean architectural relationship with the surrounding gate and building.",
      "Horizontal or vertical panel expressions can be reviewed according to the approved design. Closed infill can be prepared without visible slat gaps, while panel height, width, proportions and post positions are confirmed around the project rather than presented as one fixed catalogue size.",
      "The fence system uses 6063-T5 aluminum with a powder-coated finish. Panels insert into the post channels, and the color, embedded-post arrangement and matching entrance components can be coordinated through the project drawing before production.",
    ],
    heroTags: ["Closed screening", "Custom proportions", "Coordinated gate finish"],
    showcaseEyebrow: "Aluminum privacy fence systems",
    showcaseTitle: "Closed Screening With an Architectural Finish",
    showcaseCopy: "Privacy panels can use calm horizontal lines, vertical proportions or coordinated louver details. The design remains visually connected to matching gates while the panel arrangement reduces direct views into the site.",
    spacingTitle: "Custom Privacy Panels Beyond One Standard Pattern",
    spacingCopy: "Our factory sample range includes solid, closely spaced and alternative aluminum fence panel arrangements. For a custom privacy fence project, the screening level, panel direction, proportions, post layout and powder-coated finish are confirmed through the approved elevation before production.",
    fenceType: "Closed aluminum privacy fence",
    privacyLevel: "Full privacy / closed infill",
    applicationTitle: "Privacy for outdoor living and boundaries.",
    applicationCopy: "Closed aluminum panels are suited to villa courtyards, private residential edges and commercial areas that need visual screening with a coordinated architectural finish.",
    applications: [
      { src: "/images/product-gallery/fences/fence-05.png", alt: "Solid horizontal aluminum privacy fence panels", title: "Private residential boundaries" },
      { src: "/images/product-gallery/fences/fence-01.jpg", alt: "Aluminum fence combining solid and louvered privacy sections", title: "Villa courtyards" },
      { src: "/images/product-gallery/fences/fence-02.png", alt: "Dark aluminum screening fence around an outdoor area", title: "Commercial screening" },
    ],
    faqHeading: "Privacy fence questions.",
    typeFaqs: [
      ["Can the fence be prepared without visible gaps?", "Yes. A closed infill arrangement can be reviewed for full-privacy projects. Final joints and panel details are confirmed through the approved drawing."],
      ["Can a privacy fence match the entrance gate?", "Yes. Slat direction, color, panel rhythm and overall proportions can be coordinated with the confirmed gate design."],
    ],
    schemaName: "Architectural Aluminum Privacy Fences",
    schemaCategory: "Aluminum privacy fences",
    schemaDescription: "Closed powder-coated aluminum privacy fence systems with project-specific horizontal or vertical panel layouts for residential and commercial screening.",
  },
  "semi-privacy": {
    activeLabel: "Semi-privacy",
    defaultImage: "fence-02",
    eyebrow: "Filtered-view aluminum boundaries",
    h1: "Ventilated Semi-Privacy Aluminum Fences",
    configuration: "Louvered or spaced infill · Privacy with airflow",
    introduction: [
      "JUNSU semi-privacy aluminum fences filter direct views while retaining controlled spacing and airflow. The category includes louvered panels as well as horizontal or vertical slat arrangements, making it suitable for residential side boundaries, villa gardens, landscaped outdoor spaces and selected commercial perimeters.",
      "The degree of screening is adjusted through the infill form, slat direction and spacing shown on the approved elevation. Customers can choose a more open rhythm or a tighter visual filter without changing to a completely different fence system.",
      "Panels use 6063-T5 aluminum with powder coating and insert into the post channels for a clean connection. Dimensions, embedded-post installation, color and matching gate details are confirmed around the site and project requirements before production.",
    ],
    heroTags: ["Filtered views", "Louvered airflow", "Adjustable screening"],
    showcaseEyebrow: "Semi-privacy and louvered fencing",
    showcaseTitle: "Filter the View, Keep the Boundary Light",
    showcaseCopy: "Louvered profiles and adjustable slat spacing create a middle ground between an open boundary and a fully closed screen. Horizontal or vertical lines can be selected to suit the architecture and matching gate system.",
    spacingTitle: "Control Louver Spacing, Screening and Airflow",
    spacingCopy: "The factory samples demonstrate different louver openings and aluminum fence constructions produced for project-specific requirements. Louver angle, visible gap, airflow, panel size and powder-coated finish can be adjusted to create a custom semi-privacy fence for villa gardens, residential boundaries or commercial landscape screening.",
    fenceType: "Louvered or spaced semi-privacy fence",
    privacyLevel: "Filtered view / semi-private",
    applicationTitle: "Screening without a fully closed edge.",
    applicationCopy: "Semi-private and louvered panels suit villa gardens, residential side boundaries, landscaped outdoor rooms and commercial edges that benefit from filtered views and airflow.",
    applications: [
      { src: "/images/product-gallery/fences/fence-02.png", alt: "Louvered aluminum semi-privacy fence around a landscaped patio", title: "Landscaped outdoor spaces" },
      { src: "/images/product-gallery/fences/fence-01.jpg", alt: "Mixed solid and louvered aluminum fence beside a residence", title: "Residential side boundaries" },
      { src: "/images/product-gallery/fences/fence-options-compact.png", alt: "Compact reference sheet of semi-privacy aluminum fence layouts", title: "Project layout options", contain: true },
    ],
    faqHeading: "Semi-privacy fence questions.",
    typeFaqs: [
      ["Is a louvered fence considered semi-private?", "Yes. Louvered panels are presented as part of the semi-privacy range because they filter direct views while retaining a lighter, ventilated boundary expression."],
      ["Can the amount of screening be adjusted?", "Yes. The infill form, orientation and spacing are reviewed to create a more open or more filtered result for the approved project layout."],
    ],
    schemaName: "Semi-Privacy Aluminum Fences",
    schemaCategory: "Semi-privacy aluminum fences",
    schemaDescription: "Louvered and spaced semi-privacy aluminum fences with customizable horizontal or vertical layouts for filtered views and airflow.",
  },
};

export const commonFenceFaqs = [
  ["Can the spacing between fence slats be customized?", "Yes. Slat spacing is confirmed around the privacy requirement, visual reference and approved project elevation. No fixed spacing is assumed before the design is reviewed."],
  ["Are horizontal and vertical fence layouts available?", "Yes. Horizontal and vertical layouts are available, subject to the confirmed panel design, dimensions and connection arrangement."],
  ["How are the panels connected to the posts?", "The fence panels insert into the post channels to create a coordinated system connection. Embedded-post installation and the final interface are confirmed for the project."],
  ["Which material and finish are used?", "The fence system uses 6063-T5 aluminum with a powder-coated surface finish. Color is reviewed with the project and can be coordinated with matching gates."],
  ["What information is needed for a quotation?", "Please provide the fence length and height, site photographs, preferred privacy level, horizontal or vertical direction, spacing reference, color, quantity, installation conditions and destination. Drawings or reference images are helpful."],
] as const;
