// All site copy and media in one place, so the Drakken team can edit content
// without touching components. Photos are free-licence Unsplash placeholders
// until Drakken supplies its own project footage.
//
// Anything marked `tbc: true` is placeholder content that Drakken must confirm
// or replace (numbers, quotes, case-study narratives). While SHOW_TBC is on,
// the site shows a small "TBC" marker next to it.
export const SHOW_TBC = true;

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80`;

export const brand = "Drakken";

export const nav = {
  links: [
    {
      label: "Services",
      href: "/#services",
      children: [
        { label: "Power Distribution & E-Houses", href: "/#services" },
        { label: "SCADA & Control Systems", href: "/#services" },
        { label: "Instrumentation", href: "/#services" },
        { label: "High Risk Environments", href: "/#services" },
      ],
    },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/#credentials" },
    { label: "News", href: "/#news" },
  ],
  cta: { label: "Speak to an Engineer", href: "/#contact" },
};

export const hero = {
  // Shown as two lines on desktop; wraps naturally on small screens.
  title: ["E&I and automation EPC for the world's", "toughest oil, gas and power projects"],
  // Two lines on desktop. "E‑houses" uses a non-breaking hyphen so it never splits.
  subtitle: [
    "We engineer, fabricate, procure and commission power distribution, E‑houses,",
    "control systems and instrumentation — from Dubai and Calgary to the field.",
  ],
  ctas: [
    { label: "See Our Projects", href: "/projects", variant: "green" as const },
    { label: "Speak to an Engineer", href: "/#contact", variant: "glass" as const },
  ],
  // Set `video` to an MP4 in /public (e.g. "/media/hero.mp4") to switch the hero to video.
  video: null as string | null,
  image: { src: u("photo-1509390288171-ce2088f7d08e"), alt: "Process plant lit up at night" },
};

export const proof = {
  label: "Proof",
  stats: [
    { value: 18, suffix: "", label: "Countries", tbc: false },
    { value: 120, suffix: "+", label: "Projects delivered", tbc: true },
    { value: 60, suffix: "+", label: "E-houses delivered", tbc: true },
    { value: 5, suffix: "M", label: "Safe man-hours", tbc: true },
  ],
  // Client and partner logos (official files from each company's site or
  // Wikimedia Commons). `ratio` is width/height; `height` balances visual weight.
  clients: [
    { name: "Pearl Petroleum", logo: "/clients/pearl-petroleum.png", ratio: 150 / 91, height: 58 },
    { name: "NEOM", logo: "/clients/neom.svg", ratio: 1000 / 150, height: 30 },
    { name: "DEWA", logo: "/clients/dewa.webp", ratio: 422 / 100, height: 50 },
    { name: "GE Vernova", logo: "/clients/ge-vernova.svg", ratio: 1274 / 281.3, height: 38 },
  ],
};

export type ServiceIcon = "ehouse" | "scada" | "instrument" | "hazard";

export const services = {
  label: "What We Deliver",
  title: "Four service lines, one accountable integrator",
  items: [
    {
      title: "Power Distribution & E-Houses",
      icon: "ehouse" as ServiceIcon,
      solutions: ["E-houses", "MV/LV switchgear", "PMS", "UPS & DC systems"],
      href: "/projects?service=Power%20Distribution%20%26%20E-Houses",
      image: { src: u("photo-1509390221805-d1c887a72a00"), alt: "Transformer insulators against a blue sky" },
    },
    {
      title: "SCADA & Control Systems",
      icon: "scada" as ServiceIcon,
      solutions: ["ICSS", "DCS & SIS (IEC 61511)", "SCADA", "HMI to ISA-101"],
      href: "/projects?service=SCADA%20%26%20Control%20Systems",
      image: { src: u("photo-1652145595413-0a79398e5888"), alt: "Control room with operator consoles" },
    },
    {
      title: "Instrumentation",
      icon: "instrument" as ServiceIcon,
      solutions: ["Field instruments", "Analyser shelters", "Metering skids", "Loop checks"],
      href: "/projects?service=Instrumentation",
      image: { src: u("photo-1781330169385-8df0629c99b6"), alt: "Industrial pipework with valves and gauges" },
    },
    {
      title: "High Risk Environments",
      icon: "hazard" as ServiceIcon,
      solutions: ["Hazardous areas (IEC 60079)", "Remote sites", "Brownfield tie-ins", "Fast-track mobilisation"],
      href: "/projects?service=High%20Risk%20Environments",
      image: { src: u("photo-1754112180893-9d22b4275074"), alt: "Gas flare stacks in a desert landscape" },
    },
  ],
};

export const process = {
  label: "How We Deliver",
  title: "One team from first drawing to first power",
  steps: [
    { title: "Engineering", text: "Basic and detailed E&I design, load studies and control philosophy." },
    { title: "Fabrication", text: "E-houses, panels and skids built and pre-wired in our partner yards." },
    { title: "Procurement", text: "Vendor packages sourced, expedited and inspected against spec." },
    { title: "FAT", text: "Full factory acceptance testing with the client before anything ships." },
    { title: "Commissioning", text: "Site installation support, loop checks, start-up and handover." },
  ],
};

export const credentials = {
  label: "Credentials",
  title: "Certified, audited and backed by the OEMs we integrate",
  // TBC: confirm the exact ISO standards, HSE figures and partner list.
  items: [
    { kind: "ISO", title: "ISO 9001", text: "Quality management", tbc: true },
    { kind: "ISO", title: "ISO 14001", text: "Environmental management", tbc: true },
    { kind: "ISO", title: "ISO 45001", text: "Occupational health & safety", tbc: true },
    { kind: "HSE", title: "Zero LTI", text: "HSE record across active sites", tbc: true },
    { kind: "OEM", title: "GE Vernova", text: "OEM partnership", tbc: false },
  ],
};

export const testimonials = {
  label: "Testimonials",
  // TBC: sample quotes only. Replace with real, approved client quotes.
  items: [
    {
      quote: "Drakken mobilised in weeks, not months, and the E-house passed FAT first time.",
      name: "Project Manager",
      company: "International operator",
      project: "Upstream gas facility, Kurdistan",
      tbc: true,
    },
    {
      quote: "A single E&I partner who owned the interfaces made our commissioning schedule possible.",
      name: "Engineering Manager",
      company: "EPC contractor",
      project: "Offshore FPSO, Nigeria",
      tbc: true,
    },
    {
      quote: "Their control-system team understood both the process and the site realities.",
      name: "Operations Director",
      company: "Utility owner",
      project: "RO plant, UAE",
      tbc: true,
    },
  ],
};

export const news = {
  label: "Latest News",
  // TBC: placeholder headlines until the news feed is connected.
  items: [
    { date: "2026-10-02", title: "Drakken completes FAT on E-house package for Nigerian FPSO", href: "#", tbc: true },
    { date: "2026-09-14", title: "Calgary office expands automation engineering team", href: "#", tbc: true },
    { date: "2026-08-21", title: "SCADA upgrade goes live at UAE desalination plant", href: "#", tbc: true },
  ],
};

export const contact = {
  label: "Get in Touch",
  title: "Have a project in a hard place? Let's talk.",
  ctas: [
    { label: "Request a Proposal", href: "mailto:info@drakken.co?subject=Request%20for%20proposal" },
    { label: "Get the Capability Statement", href: "#" },
  ],
};

export const offices = [
  { city: "Dubai", role: "Headquarters", timeZone: "Asia/Dubai", lat: 25.2, lon: 55.3 },
  { city: "Calgary", role: "Office", timeZone: "America/Edmonton", lat: 51.0, lon: -114.1 },
];

export const footer = {
  blurb: "Owner-led E&I and automation EPC integrator for oil, gas and power.",
  cta: { label: "Speak to an Engineer", href: "/#contact" },
  pages: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/#services" },
    { label: "About", href: "/#credentials" },
    { label: "News", href: "/#news" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "/#contact" },
  ],
  social: [{ label: "LinkedIn", href: "#" }],
};

/* ------------------------------------------------------------------------ */
/* Case studies                                                              */
/* ------------------------------------------------------------------------ */

export const serviceLines = services.items.map((s) => s.title);
export const regions = ["GCC", "Iraq & Kurdistan", "West Africa"] as const;
export const facilityTypes = ["Upstream", "Offshore / FPSO", "Power & Utilities", "Water"] as const;

export type CaseStudy = {
  slug: string;
  title: string;
  client: string; // named, or anonymised e.g. "International operator"
  country: string;
  region: (typeof regions)[number];
  facility: (typeof facilityTypes)[number];
  services: string[];
  scope: string[];
  summary: string; // one-line result for cards
  challenge: string;
  delivered: string;
  equipment: string[];
  result: { value: string; label: string };
  image: { src: string; alt: string };
  gallery: { src: string; alt: string }[];
  testimonial?: { quote: string; name: string; company: string };
  lat: number;
  lon: number;
  tbc: boolean;
};

// Project names, clients and countries come from the brief. Every narrative
// field below is draft copy for layout only (tbc: true); Drakken supplies the
// final text, scope and results.
export const caseStudies: CaseStudy[] = [
  {
    slug: "emem-fpso-nigeria",
    title: "EMEM FPSO E-house",
    client: "International operator",
    country: "Nigeria",
    region: "West Africa",
    facility: "Offshore / FPSO",
    services: ["Power Distribution & E-Houses"],
    scope: ["Engineering", "Fabrication", "FAT", "Commissioning"],
    summary: "Topsides E-house delivered and commissioned for offshore start-up.",
    challenge:
      "A fixed offshore start-up date, a compact topsides footprint and marine-grade requirements left no room for rework once the module shipped.",
    delivered:
      "A fully integrated E-house with switchgear, PMS and UPS, designed, built and tested as one module so offshore hook-up was limited to interconnects.",
    equipment: ["E-house module", "MV/LV switchgear", "Power management system", "UPS & battery systems"],
    result: { value: "1st time", label: "FAT pass before sail-away" },
    image: { src: u("photo-1690508313456-bf8c851e8319"), alt: "Offshore production platform at sea" },
    gallery: [
      { src: u("photo-1749073668528-38ab64575f5d"), alt: "Offshore platform with a supply vessel" },
      { src: u("photo-1576446470246-499c738d1c8e"), alt: "Low-voltage circuit breakers" },
    ],
    lat: 4.4,
    lon: 7.2,
    tbc: true,
  },
  {
    slug: "chemchemal-ler-kurdistan",
    title: "Chemchemal LER",
    client: "Pearl Petroleum",
    country: "Kurdistan Region of Iraq",
    region: "Iraq & Kurdistan",
    facility: "Upstream",
    services: ["Power Distribution & E-Houses", "High Risk Environments"],
    scope: ["Engineering", "Procurement", "Commissioning"],
    summary: "E&I scope delivered for a remote upstream gas facility.",
    challenge:
      "A remote site, extreme temperature swings and tight logistics meant every package had to arrive complete, tested and ready to connect.",
    delivered:
      "Electrical and instrumentation engineering, procurement and commissioning support for the facility's power and control infrastructure.",
    equipment: ["Power distribution", "Field instrumentation", "Hazardous-area equipment"],
    result: { value: "On time", label: "Energisation against a fixed schedule" },
    image: { src: u("photo-1764455489322-a1cd4b08844c"), alt: "Industrial process plant at sunset" },
    gallery: [{ src: u("photo-1776524039930-ea1ed83b0f97"), alt: "Industrial pipework and machinery" }],
    lat: 35.5,
    lon: 44.8,
    tbc: true,
  },
  {
    slug: "demir-dagh-kurdistan",
    title: "Demir Dagh",
    client: "International operator",
    country: "Kurdistan Region of Iraq",
    region: "Iraq & Kurdistan",
    facility: "Upstream",
    services: ["Instrumentation", "High Risk Environments"],
    scope: ["Engineering", "Procurement", "Commissioning"],
    summary: "Instrumentation and control works for an oil field development.",
    challenge:
      "Brownfield tie-ins on a producing field had to be completed without unplanned shutdowns, in hazardous areas with strict permit control.",
    delivered:
      "Instrumentation design, supply and loop-check commissioning across wellsite and process areas, certified for hazardous-area operation.",
    equipment: ["Field instruments", "Junction boxes", "Instrument cabling", "IEC 60079 certified equipment"],
    result: { value: "0", label: "Unplanned shutdowns during tie-ins" },
    image: { src: u("photo-1754112180893-9d22b4275074"), alt: "Gas flare stacks in a desert landscape" },
    gallery: [{ src: u("photo-1781330169385-8df0629c99b6"), alt: "Pipework with valves and gauges" }],
    lat: 36.4,
    lon: 43.6,
    tbc: true,
  },
  {
    slug: "neom-internet-of-water",
    title: "NEOM Internet of Water",
    client: "NEOM",
    country: "Saudi Arabia",
    region: "GCC",
    facility: "Water",
    services: ["SCADA & Control Systems"],
    scope: ["Engineering", "FAT", "Commissioning"],
    summary: "Control and monitoring for a smart water network.",
    challenge:
      "A greenfield smart-water network needed control systems that could scale with the city and integrate many vendors' equipment.",
    delivered:
      "SCADA and control-system engineering, FAT and commissioning for monitoring and control across the network.",
    equipment: ["SCADA servers", "PLC panels", "Telemetry", "HMI to ISA-101"],
    result: { value: "1 platform", label: "Unified monitoring across sites" },
    image: { src: u("photo-1774789599304-cca1e1ffbb95"), alt: "Aerial view of a water treatment plant" },
    gallery: [{ src: u("photo-1652145595413-0a79398e5888"), alt: "Control room with consoles" }],
    lat: 28.0,
    lon: 35.2,
    tbc: true,
  },
  {
    slug: "dewa-ro-plant-plc",
    title: "DEWA RO Plant PLC System",
    client: "DEWA",
    country: "United Arab Emirates",
    region: "GCC",
    facility: "Power & Utilities",
    services: ["SCADA & Control Systems"],
    scope: ["Engineering", "Fabrication", "FAT", "Commissioning"],
    summary: "PLC control system for a reverse-osmosis desalination plant.",
    challenge:
      "The plant had to keep supplying water while its control system was replaced, with a tightly sequenced cut-over.",
    delivered:
      "PLC panels engineered, built and factory-tested, then cut over in stages with the operator to keep the plant online.",
    equipment: ["PLC panels", "Remote I/O", "HMI", "Network infrastructure"],
    result: { value: "0 h", label: "Production lost during cut-over" },
    image: { src: u("photo-1533163238111-4a7ced54f2e4"), alt: "Aerial view of water treatment tanks" },
    gallery: [{ src: u("photo-1576446470246-499c738d1c8e"), alt: "Control panel breakers" }],
    lat: 25.1,
    lon: 55.2,
    tbc: true,
  },
];

export const featuredSlugs = ["emem-fpso-nigeria", "chemchemal-ler-kurdistan", "neom-internet-of-water"];
