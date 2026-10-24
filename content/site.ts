// All site copy and media in one place, so the Drakken team can edit content
// without touching components.
//
// Everything here comes from drakken.co (home, About, service pages, news posts,
// testimonials, contact details) or from the designer brief. Where the brief asks
// for something the current site does not publish (years in business, projects
// delivered, a safety figure, ISO certificates) it is left out rather than
// invented: add it to `proof` or `credentials` once Drakken supplies it.
// Photos are Drakken's own, from drakken.co, in /public/photos.

const SITE = "https://drakken.co";

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
    // Out of scope for this design phase: these stay on the current site.
    { label: "About", href: `${SITE}/about-us/` },
    { label: "News", href: `${SITE}/news` },
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
  image: {
    src: "/photos/emem-exterior.webp",
    alt: "A Drakken E-house module on a self-propelled transporter, ready for shipment",
  },
};

export const proof = {
  label: "Proof",
  // Every figure is published on drakken.co (mission statement, EMEM and NEOM posts, power page).
  stats: [
    { value: 18, suffix: "", label: "Countries, 4 continents" },
    { value: 33, suffix: "kV", label: "Power distribution designed up to" },
    { value: 140, suffix: "km", label: "NEOM pipeline automated" },
    { value: 300, suffix: "t", label: "EMEM FPSO E-house module" },
  ],
  strip: "Clients and partners",
  // One-colour logos (official files from each company's own site or Wikimedia Commons;
  // Emerson, Weatherford and BW Energy from drakken.co). `ratio` is width/height and
  // `height` balances visual weight across very different shapes.
  clients: [
    { name: "NEOM", logo: "/clients/neom.svg", ratio: 1000 / 150, height: 30 },
    { name: "Pearl Petroleum", logo: "/clients/pearl-petroleum.png", ratio: 150 / 91, height: 58 },
    { name: "DEWA", logo: "/clients/dewa.webp", ratio: 422 / 100, height: 50 },
    { name: "Weatherford", logo: "/clients/weatherford.png", ratio: 1.489, height: 40 },
    { name: "BW Energy", logo: "/clients/bw-energy.png", ratio: 0.865, height: 50 },
    { name: "Emerson", logo: "/clients/emerson.png", ratio: 0.684, height: 50 },
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
      solutions: ["E-houses", "LV/MV switchgear up to 33kV", "Power management systems", "Arc-flash protection"],
      href: "/projects?service=Power%20Distribution%20%26%20E-Houses",
      image: { src: "/photos/emem-switchgear.webp", alt: "Switchgear corridor inside a Drakken E-house" },
    },
    {
      title: "SCADA & Control Systems",
      icon: "scada" as ServiceIcon,
      solutions: ["SCADA & DCS", "PLC programming", "Safety instrumented systems (IEC 61511)", "High-performance HMI (ISA 101)"],
      href: "/projects?service=SCADA%20%26%20Control%20Systems",
      image: { src: "/photos/service-scada.webp", alt: "An engineer monitoring a power management system on control screens" },
    },
    {
      title: "Instrumentation",
      icon: "instrument" as ServiceIcon,
      solutions: ["Sizing & detailed design", "Procurement & vendor management", "Hazardous-area instrumentation", "Calibration & loop verification"],
      href: "/projects?service=Instrumentation",
      image: { src: "/photos/service-instrumentation.webp", alt: "A technician configuring a field instrument with a handheld communicator" },
    },
    {
      title: "High Risk Environments",
      icon: "hazard" as ServiceIcon,
      solutions: ["Factory acceptance testing", "On-site integration & black start", "Logistics, security & compliance", "HSSE & local talent"],
      href: "/projects?service=High%20Risk%20Environments",
      image: { src: "/photos/service-high-risk.webp", alt: "Offshore crew working at height over open water" },
    },
  ],
};

export const process = {
  label: "How We Deliver",
  title: "One team, FEED to first power",
  // Wording follows the service pages on drakken.co.
  steps: [
    { title: "Engineering", text: "FEED, detailed design and construction work packages, for greenfield and brownfield projects." },
    { title: "Fabrication", text: "Fully integrated E-houses engineered, fabricated and deployed for upstream oil and gas facilities." },
    { title: "Procurement", text: "Vendor-agnostic: equipment specified and procured from all major manufacturers, on project requirements." },
    { title: "FAT", text: "The primary risk-transfer point: exhaustive testing at our UAE and Turkey facilities before anything ships." },
    { title: "Commissioning", text: "Our design engineers lead first energization, black start and loop checking, through to the signed ITR." },
  ],
};

export const credentials = {
  label: "Credentials",
  title: "Engineered to the standards the work demands",
  // Standards and certifications named on drakken.co. The brief also asks for ISO and HSE
  // credentials, which the site does not publish: add them here once supplied.
  items: [
    { kind: "Safety", title: "IEC 61511", text: "SIL-rated safety instrumented systems, to IEC 61508 and 61511" },
    { kind: "HMI", title: "ISA 101", text: "High-performance HMI design for operators" },
    { kind: "Hazardous areas", title: "IEC 60079", text: "Area classification with ATEX / IECEx rated equipment" },
    { kind: "Cybersecurity", title: "Achilles 2", text: "Certified control-system security on NEOM's Internet of Water" },
    { kind: "OEM", title: "GE Vernova", text: "OEM partnership" },
  ],
};

export const testimonials = {
  label: "Testimonials",
  title: "What clients say once the power is on",
  // The four quotes published on drakken.co, with the same logos and attributions.
  items: [
    {
      quote:
        "By integrating Emerson’s control solutions, we’ve fully connected NEOM’s distribution network through an advanced 'Internet of Water' infrastructure. This collaboration ensures minimum water loss and positions the network at the absolute forefront of global water technology and sustainability.",
      name: "Emerson Control Solutions",
      project: "NEOM Internet of Water",
      logo: { src: "/clients/emerson.png", ratio: 0.684 },
    },
    {
      quote:
        "Drakken showed excellent expertise and dedication from start to finish. They addressed challenges proactively and ensured the project was delivered to our expectations.",
      name: "VP, Engineering",
      project: "",
      logo: { src: "/clients/bw-energy.png", ratio: 0.865 },
    },
    {
      quote:
        "Drakken is one of the best performing subcontractors who teamed up with Weatherford to deliver Garraf First Commercial Production. Their many attributes include technical competence, responsiveness, versatility & leadership.",
      name: "Paul Stewart, PM",
      project: "Weatherford · Garraf First Commercial Production",
      logo: { src: "/clients/weatherford.png", ratio: 1.489 },
    },
    {
      quote:
        "Drakken successfully executed several projects for us in Iraq, their scope included detailed E&I engineering for a large EPC project as well as the E&I engineering & procurement services for a brownfield wellsite production facility. Drakken were particularly exceptional in sourcing instruments on extremely short lead times.",
      name: "Phil Boustead, Engineering Manager",
      project: "Iraq",
      logo: { src: "/clients/acwa.png", ratio: 1.108 },
    },
  ],
};

export const news = {
  label: "Latest News",
  title: "From the field",
  // The three most recent posts on drakken.co; each links to the full article.
  items: [
    {
      date: "2026-05-04",
      title: "Drakken Expands Presence in Kurdistan with Chemchemal Project Award",
      href: `${SITE}/2026/05/04/pearlpetroleum_chemchemal/`,
    },
    {
      date: "2026-03-29",
      title: "Driving Smarter Power in a Complex Energy World",
      href: `${SITE}/2026/03/29/driving-smarter-power-in-a-complex-energy-world/`,
    },
    {
      date: "2026-02-27",
      title: "Drakken and CarbonAi: Accelerating Global Greenhouse Gas Reduction via Integrated Automation",
      href: `${SITE}/2026/02/27/drakken-and-carbonai-accelerating-global-greenhouse-gas-reduction-via-integrated-automation/`,
    },
  ],
};

export const contact = {
  label: "Get in Touch",
  title: "Have a project in a hard place? Let's talk.",
  ctas: [
    { label: "Request a Proposal", href: "mailto:info@drakken.co?subject=Request%20for%20proposal" },
    { label: "Request a Capability Review", href: "mailto:info@drakken.co?subject=Capability%20review" },
  ],
};

export const contactDetails = {
  email: "info@drakken.co",
  phone: "+971 4 421 8332",
  phoneHref: "tel:+97144218332",
};

export const offices = [
  {
    city: "Dubai",
    role: "Headquarters",
    timeZone: "Asia/Dubai",
    clock: true,
    lat: 25.07,
    lon: 55.14,
    address: "Unit 2304, SABA 1 Tower, Cluster E, Jumeirah Lakes Towers, Dubai, UAE",
  },
  {
    city: "Calgary",
    role: "Office",
    timeZone: "America/Edmonton",
    clock: true,
    lat: 51.0,
    lon: -114.1,
    address: "Third Floor, 14505 Bannister Road SE, Calgary, Alberta T2X 3J3",
  },
  {
    city: "Cheltenham",
    role: "UK address",
    timeZone: "Europe/London",
    clock: false,
    lat: 51.9,
    lon: -2.07,
    address: "Northfield House, Shurdington Road, Bentham, Cheltenham GL51 4UA",
  },
];

// The places listed on the About page of drakken.co, as written there.
export const workedInList = [
  "Dubai",
  "Finland",
  "Alberta",
  "British Columbia",
  "UK",
  "USA",
  "Gulf of Mexico",
  "Venezuela",
  "Ghana",
  "Gulf of Guinea",
  "Nigeria",
  "Cameroon",
  "Caspian Sea",
  "Turkmenistan",
  "Kurdistan",
  "Iraq",
  "Yemen",
  "Pakistan",
  "Saudi Arabia",
  "Thailand",
  "South China Sea",
];

// Map dots for those places that no project or office pin already covers (Dubai, Alberta,
// the UK, Kurdistan, Iraq, Saudi Arabia and Nigeria are shown by the pins). Positions are
// approximate, for the map only.
export const workedIn = [
  { name: "Finland", lat: 64.0, lon: 26.0 },
  { name: "British Columbia", lat: 54.0, lon: -125.0 },
  { name: "USA", lat: 39.0, lon: -98.0 },
  { name: "Gulf of Mexico", lat: 25.5, lon: -90.0 },
  { name: "Venezuela", lat: 7.0, lon: -66.0 },
  { name: "Ghana", lat: 7.9, lon: -1.0 },
  { name: "Gulf of Guinea", lat: 1.5, lon: 2.0 },
  { name: "Cameroon", lat: 5.7, lon: 12.5 },
  { name: "Caspian Sea", lat: 41.5, lon: 50.5 },
  { name: "Turkmenistan", lat: 39.0, lon: 59.0 },
  { name: "Yemen", lat: 15.5, lon: 47.5 },
  { name: "Pakistan", lat: 30.0, lon: 70.0 },
  { name: "Thailand", lat: 15.0, lon: 101.0 },
  { name: "South China Sea", lat: 12.0, lon: 114.0 },
];

export const footer = {
  blurb: "Owner-led E&I and automation EPC integrator for oil, gas and power.",
  cta: { label: "Speak to an Engineer", href: "/#contact" },
  pages: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/#services" },
    { label: "About", href: `${SITE}/about-us/` },
    { label: "News", href: `${SITE}/news` },
    { label: "Careers", href: "mailto:career@drakken.co" },
    { label: "Contact", href: "/#contact" },
    { label: "Privacy policy", href: `${SITE}/privacy-policy/` },
  ],
  social: [{ label: "LinkedIn", href: "https://www.linkedin.com/company/drakken" }],
};

/* ------------------------------------------------------------------------ */
/* Case studies                                                              */
/* ------------------------------------------------------------------------ */

export const serviceLines = services.items.map((s) => s.title);
export const regions = ["GCC", "Iraq & Kurdistan", "West Africa"] as const;
export const facilityTypes = ["Upstream", "Offshore / FPSO", "Water"] as const;

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
  /** Wider or sharper image for the page header, when the card image is not suited to it. */
  hero?: { src: string; alt: string };
  gallery: { src: string; alt: string }[];
  testimonial?: { quote: string; name: string; company: string };
  lat: number;
  lon: number;
};

// Written from the three news posts on drakken.co that describe a Drakken project in depth.
// Other projects the site names (Demir Dagh, DEWA, Guinea, Niger Delta) are in `moreProjects`:
// the site gives them a line or two, which is not enough for a case-study page.
export const caseStudies: CaseStudy[] = [
  {
    slug: "emem-fpso-nigeria",
    title: "EMEM FPSO E-house",
    client: "International operator",
    country: "Nigeria",
    region: "West Africa",
    facility: "Offshore / FPSO",
    services: ["Power Distribution & E-Houses", "SCADA & Control Systems"],
    scope: ["Engineering", "Fabrication", "Integration", "Commissioning"],
    summary: "A 300-tonne E-house with over 100 pieces of equipment, delivered on track for First Oil in 2025.",
    challenge:
      "A mid-sized, 300-tonne module had to house a high-density configuration of over 100 individual pieces of equipment and more than 20 km of power and control cabling, and still arrive on schedule for First Oil.",
    delivered:
      "A fit-for-purpose power and automation hub: MV/LV transformers and switchgear fused with an Emerson DeltaV integrated control and safety system. 3D modelling and Human Factors Engineering resolved clashes between HVAC ducting, piping and structure before fabrication, and the well-head platform is integrated through umbilical systems so DeltaV stays a single source of truth for operators.",
    equipment: [
      "MV/LV transformers & switchgear",
      "Emerson DeltaV control & safety system",
      "20 km+ power & control cabling",
      "Segregated cable void",
      "HVAC",
    ],
    result: { value: "First Oil 2025", label: "Vessel delivered on track after final construction works in Dubai" },
    image: { src: "/photos/emem-transformers.webp", alt: "MV/LV transformers inside the EMEM FPSO E-house" },
    hero: { src: "/photos/emem-exterior.webp", alt: "The EMEM FPSO E-house on a transporter, ready for shipment" },
    gallery: [
      { src: "/photos/emem-exterior.webp", alt: "The EMEM FPSO E-house on a transporter" },
      { src: "/photos/emem-switchgear.webp", alt: "Switchgear corridor inside the E-house" },
    ],
    testimonial: {
      quote:
        "This project highlights our unwavering commitment to field development over the past five years. Reaching this milestone showcases the tenacity of our team. But the real work continues as we move into the commissioning phase with the same professional enthusiasm.",
      name: "Richard Walker",
      company: "Project Manager, Drakken",
    },
    lat: 4.2,
    lon: 6.5,
  },
  {
    slug: "neom-internet-of-water",
    title: "NEOM Internet of Water",
    client: "NEOM",
    country: "Saudi Arabia",
    region: "GCC",
    facility: "Water",
    services: ["SCADA & Control Systems"],
    scope: ["Main automation contractor", "Control system engineering", "Cybersecurity"],
    summary: "Main Automation Contractor for the network moving 50,600 m³ of desalinated water a day over 140 km.",
    challenge:
      "A greenfield network of 140 km of pipeline (65 km coastal, 75 km mountain) had to run 24/7 across some of Saudi Arabia's most challenging terrain, with control systems that operate from −40 °C to 70 °C from first start-up and no tolerance for downtime.",
    delivered:
      "Redundant PACSystems RX3i controllers across more than 20 pumping stations, so a secondary takes over instantly if one fails. Movicon.NExT leak detection analyses the pipeline every 10 metres, and Emerson PACEdge with MQTT turns five years of historised data into failure prediction. The solution carries Achilles 2 cybersecurity certification.",
    equipment: [
      "PACSystems RX3i redundant controllers",
      "Movicon.NExT SCADA",
      "Emerson PACEdge",
      "MQTT edge gateways",
      "Achilles 2 certified",
    ],
    result: { value: "140 km", label: "of pipeline monitored, carrying 50,600 m³ of desalinated water a day" },
    image: { src: "/photos/neom-pipeline.webp", alt: "Aerial view of the pipeline trench through the Saudi desert" },
    gallery: [],
    testimonial: {
      quote:
        "Through an advanced Internet of Water infrastructure, we are ensuring minimum water loss and putting NEOM at the forefront of water technology and sustainability.",
      name: "Ritesh Contractor",
      company: "Business Development Manager, Drakken",
    },
    lat: 28.0,
    lon: 35.2,
  },
  {
    slug: "chemchemal-ler-kurdistan",
    title: "Chemchemal LER",
    client: "Pearl Petroleum",
    country: "Kurdistan Region of Iraq",
    region: "Iraq & Kurdistan",
    facility: "Upstream",
    services: ["Power Distribution & E-Houses", "High Risk Environments"],
    scope: ["Design", "Fabrication", "Supply"],
    summary: "Awarded by Pearl Petroleum in May 2026: a prefabricated Local Electrical Room for the Chemchemal gas field.",
    challenge:
      "Pearl Petroleum is expanding the Chemchemal gas field, raising production capacity, debottlenecking infrastructure and supporting reliable gas supply for power generation. The electrical room has to be easy to deploy and keep running in a harsh desert environment.",
    delivered:
      "A compact, prefabricated electrical substation integrating LV power distribution and UPS systems within a single Local Electrical Room, designed for reliability, maintainability and operational continuity.",
    equipment: ["LV power distribution", "UPS systems", "Prefabricated Local Electrical Room"],
    result: { value: "May 2026", label: "Contract awarded by Pearl Petroleum for the Chemchemal development" },
    image: { src: "/photos/chemchemal-plant.webp", alt: "The Chemchemal gas processing plant in the Kurdistan Region" },
    hero: { src: "/photos/chemchemal-panels.webp", alt: "Low-voltage distribution panels of the type housed in a Local Electrical Room" },
    gallery: [],
    lat: 35.5,
    lon: 44.8,
  },
];

export const featuredSlugs = ["emem-fpso-nigeria", "neom-internet-of-water", "chemchemal-ler-kurdistan"];

// Projects the current site names with a line of description: shown on the index as a
// short list until Drakken supplies case-study content for them.
export const moreProjects = [
  {
    title: "Demir Dagh",
    client: "Oryx Petroleum",
    location: "Kurdistan Region of Iraq",
    text: "Oil and gas facilities delivered through bespoke fast-track engineering services.",
  },
  {
    title: "Reverse osmosis plant",
    client: "DEWA",
    location: "Dubai, UAE",
    text: "Programmable logic controller (PLC) automation system for the RO plant.",
  },
  {
    title: "Upstream fuel farm",
    client: "",
    location: "Guinea",
    text: "Control system for an upstream fuel farm delivering fuel to a 16 MW HFO power station.",
  },
  {
    title: "Modular E-houses",
    client: "",
    location: "Niger Delta, Nigeria",
    text: "Switchgear, MCC, UPS, ICSS and a communication network in modular, climate-controlled, containerised buildings.",
  },
];
