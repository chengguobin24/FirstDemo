import type { BlogPostInput } from "./blog-types";

export const demoPost: BlogPostInput = {
  slug: "prepare-an-aluminum-fence-project-brief",
  title: "How to Prepare an Aluminum Fence Project Brief",
  excerpt:
    "A practical starting point for distributors, contractors and project teams preparing dimensions, layout references and finish requirements.",
  category: "Buyer guides",
  coverImage: "/images/product-gallery/fences/fence-03.jpg",
  coverAlt: "Contemporary vertical aluminum slat fence around a landscaped property",
  seoTitle: "How to Prepare an Aluminum Fence Project Brief",
  seoDescription:
    "Prepare dimensions, layout, finish references and installation information for a custom aluminum fence project.",
  status: "published",
  publishedAt: Date.UTC(2026, 6, 28),
  blocks: [
    {
      id: "demo-intro",
      type: "paragraph",
      text: "A useful project brief does not need to be a finished engineering package. It should give the manufacturer enough verified information to understand the application, review the requested configuration and identify which details still need confirmation.",
    },
    {
      id: "demo-checklist",
      type: "checklist",
      title: "Information to prepare",
      items: [
        "Overall fence length and the required height",
        "Site photographs, drawings or a marked layout",
        "Preferred privacy level and slat direction",
        "Finish or colour references",
        "Gate positions and opening requirements",
        "Installation conditions and destination market",
        "Expected quantity and target schedule",
      ],
    },
    {
      id: "demo-image-text",
      type: "imageText",
      url: "/images/product-gallery/fences/fence-01.jpg",
      alt: "Dark aluminum privacy fence with angled upper louvers beside a residence",
      heading: "Start with the application",
      text: "Residential boundaries, landscape divisions and commercial perimeters may require different levels of privacy, visibility and coordination with gates. Clear application information helps focus the first technical discussion.",
      imagePosition: "left",
    },
    {
      id: "demo-callout",
      type: "callout",
      tone: "warm",
      heading: "Editorial preview",
      text: "This sample article exists only in the local development database so the new blog layout and editor can be reviewed. It will not be inserted into the production database.",
    },
    {
      id: "demo-inquiry",
      type: "inquiry",
      heading: "Planning an aluminum fence program?",
      text: "Send the available dimensions, drawings and finish references. JUNSU will review the information and identify the next confirmation points.",
      label: "Start a project",
    },
  ],
};
