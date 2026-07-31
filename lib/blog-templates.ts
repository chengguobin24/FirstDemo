import type { BlogBlock } from "./blog-types";

function id(): string {
  return crypto.randomUUID();
}

export const blogTemplates = [
  {
    id: "buyer-guide",
    name: "Buyer guide",
    description: "Introduction, decision checklist, comparison, FAQ and inquiry.",
  },
  {
    id: "technical-guide",
    name: "Technical guide",
    description: "Technical explanation, image, data table, note and FAQ.",
  },
  {
    id: "case-study",
    name: "Project case study",
    description: "Project context, image-led story, process, gallery and result.",
  },
  {
    id: "company-news",
    name: "Company news",
    description: "Short announcement with an optional event gallery.",
  },
  {
    id: "short-answer",
    name: "Short answer",
    description: "A concise knowledge-base answer with practical points.",
  },
] as const;

export type BlogTemplateId = (typeof blogTemplates)[number]["id"];

export function blocksForTemplate(template: BlogTemplateId): BlogBlock[] {
  switch (template) {
    case "buyer-guide":
      return [
        { id: id(), type: "paragraph", text: "" },
        { id: id(), type: "checklist", title: "What buyers should prepare", items: [""] },
        {
          id: id(),
          type: "imageText",
          url: "",
          alt: "",
          heading: "A key decision",
          text: "",
          imagePosition: "left",
        },
        { id: id(), type: "table", caption: "Comparison", headers: ["Option", "Best for", "Consider"], rows: [["", "", ""]] },
        { id: id(), type: "faq", title: "Frequently asked questions", items: [{ question: "", answer: "" }] },
        { id: id(), type: "inquiry", heading: "Discuss your project with JUNSU", text: "", label: "Start a project" },
      ];
    case "technical-guide":
      return [
        { id: id(), type: "paragraph", text: "" },
        { id: id(), type: "heading", text: "Technical overview", level: 2 },
        { id: id(), type: "image", url: "", alt: "", caption: "" },
        { id: id(), type: "table", caption: "Technical reference", headers: ["Item", "What to confirm"], rows: [["", ""]] },
        { id: id(), type: "callout", heading: "Project note", text: "", tone: "warm" },
        { id: id(), type: "faq", title: "Technical questions", items: [{ question: "", answer: "" }] },
      ];
    case "case-study":
      return [
        { id: id(), type: "paragraph", text: "" },
        {
          id: id(),
          type: "imageText",
          url: "",
          alt: "",
          heading: "Project requirement",
          text: "",
          imagePosition: "left",
        },
        {
          id: id(),
          type: "steps",
          title: "How the project progressed",
          items: [{ title: "Requirement review", text: "" }],
        },
        { id: id(), type: "gallery", images: [{ url: "", alt: "", caption: "" }] },
        { id: id(), type: "quote", text: "", attribution: "" },
        { id: id(), type: "inquiry", heading: "Planning a similar project?", text: "", label: "Send project details" },
      ];
    case "company-news":
      return [
        { id: id(), type: "paragraph", text: "" },
        { id: id(), type: "image", url: "", alt: "", caption: "" },
        { id: id(), type: "gallery", images: [{ url: "", alt: "", caption: "" }] },
        { id: id(), type: "callout", heading: "Contact the team", text: "", tone: "warm" },
      ];
    case "short-answer":
      return [
        { id: id(), type: "paragraph", text: "" },
        { id: id(), type: "checklist", title: "Key points", items: [""] },
        { id: id(), type: "products", title: "Related systems", links: [{ label: "View products", url: "/products" }] },
      ];
  }
}

export const addableBlockTypes = [
  ["paragraph", "Paragraph"],
  ["heading", "Heading"],
  ["image", "Full-width image"],
  ["imageText", "Image + text"],
  ["gallery", "Image gallery"],
  ["table", "Comparison / data table"],
  ["checklist", "Checklist"],
  ["steps", "Numbered steps"],
  ["callout", "Highlighted note"],
  ["quote", "Quote"],
  ["video", "Video"],
  ["download", "Download / PDF"],
  ["products", "Related products"],
  ["inquiry", "Inquiry call-to-action"],
  ["faq", "FAQ"],
] as const;

export type AddableBlockType = (typeof addableBlockTypes)[number][0];

export function createEmptyBlock(type: AddableBlockType): BlogBlock {
  const blockId = id();
  switch (type) {
    case "heading": return { id: blockId, type, text: "", level: 2 };
    case "paragraph": return { id: blockId, type, text: "" };
    case "image": return { id: blockId, type, url: "", alt: "", caption: "" };
    case "imageText": return { id: blockId, type, url: "", alt: "", heading: "", text: "", imagePosition: "left" };
    case "gallery": return { id: blockId, type, images: [{ url: "", alt: "", caption: "" }] };
    case "table": return { id: blockId, type, caption: "", headers: ["Column 1", "Column 2"], rows: [["", ""]] };
    case "checklist": return { id: blockId, type, title: "", items: [""] };
    case "steps": return { id: blockId, type, title: "", items: [{ title: "", text: "" }] };
    case "callout": return { id: blockId, type, heading: "", text: "", tone: "warm" };
    case "quote": return { id: blockId, type, text: "", attribution: "" };
    case "video": return { id: blockId, type, url: "", title: "" };
    case "download": return { id: blockId, type, url: "", label: "Download resource", note: "" };
    case "products": return { id: blockId, type, title: "Related systems", links: [{ label: "", url: "" }] };
    case "inquiry": return { id: blockId, type, heading: "Discuss your project with JUNSU", text: "", label: "Start a project" };
    case "faq": return { id: blockId, type, title: "Frequently asked questions", items: [{ question: "", answer: "" }] };
  }
}
