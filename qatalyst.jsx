import { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  Sun, Moon, LayoutDashboard, Building2, TreePine, GitMerge, Briefcase,
  Bell, Settings, Leaf, MapPin, Award, Search, RefreshCw,
  Sparkles, CheckCircle, Plus, Wind, Zap, Droplets, Flame,
  Activity, ArrowRight, Brain, SlidersHorizontal,
  Newspaper, ChevronRight, Star, Globe, GripVertical,
  MessageSquare, Send, CornerDownLeft, Layers, Zap as Flash, ChevronDown,
  Compass, Target, Users, FolderOpen, FileText, Mail, TrendingUp,
  BarChart2, Calendar, Clock, Filter, Download, Upload, Eye,
  Folder, File, Lock, Unlock, UserCheck, Phone, MoreHorizontal, ExternalLink
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

// ─── DATA ────────────────────────────────────────────────────────────────────

const LEADS = [
  {
    id: 1, company: "Microsoft", ticker: "MSFT", industry: "Technology", flag: "🇺🇸",
    commitment: "Carbon Negative by 2030", emissions: "15.9M tCO₂e/yr", need: "2–5M credits/yr",
    esg: 94, warmth: "hot",
    rationale: "Announced $1B Climate Innovation Fund; Q4 ESG report shows 23% reduction gap requiring offsets",
    signals: ["Microsoft doubles carbon removal commitment for FY2025","CFO confirms Q4 budget for carbon credit procurement","Climate team expanding — 3 new sustainability hires announced"],
    contact: { name: "Melanie Nakagawa", title: "Chief Sustainability Officer", url: "https://linkedin.com/in/melanienakagawa" },
    score: 96
  },
  {
    id: 2, company: "Shell PLC", ticker: "SHEL", industry: "Oil & Gas", flag: "🇳🇱",
    commitment: "Net Zero by 2050", emissions: "1.45B tCO₂e/yr", need: "10–20M credits/yr",
    esg: 71, warmth: "warm",
    rationale: "Activist pressure on Scope 3; recently retired 8.5M Verra credits; Nature-based Solutions strategy published",
    signals: ["Shell NbS report targets 120M offsets by 2030","Activist Motion 29 forces Scope 3 emissions disclosure","Shell exploring direct investment in REDD+ projects"],
    contact: { name: "Anna Mascolo", title: "President – Nature-Based Solutions", url: "https://linkedin.com/in/annamascolo" },
    score: 88
  },
  {
    id: 3, company: "Amazon", ticker: "AMZN", industry: "E-Commerce / Cloud", flag: "🇺🇸",
    commitment: "Net Zero by 2040 (The Climate Pledge)", emissions: "71.5M tCO₂e/yr", need: "5–15M credits/yr",
    esg: 78, warmth: "hot",
    rationale: "Climate Pledge signatories ramping; logistics electrification behind schedule; active procurement RFP open",
    signals: ["Amazon Climate Pledge Fund reaches $2B","Logistics fleet electrification 4 years behind schedule","Issued carbon credit RFP with Q1 close deadline"],
    contact: { name: "Kara Hurst", title: "VP Worldwide Sustainability", url: "https://linkedin.com/in/karahurst" },
    score: 93
  },
  {
    id: 4, company: "BP PLC", ticker: "BP", industry: "Oil & Gas", flag: "🇬🇧",
    commitment: "Net Zero by 2050", emissions: "370M tCO₂e/yr", need: "8–12M credits/yr",
    esg: 67, warmth: "warm",
    rationale: "Revised green investment down 40%; still committed to offset retirement program; active regulatory scrutiny",
    signals: ["BP revises down green investment targets by 40%","UK regulatory probe into greenwashing claims","Carbon credit retirement program continues at scale"],
    contact: { name: "Giulia Chierchia", title: "EVP Strategy, Sustainability & Ventures", url: "https://linkedin.com/in/giuliachierchia" },
    score: 74
  },
  {
    id: 5, company: "Unilever", ticker: "ULVR", industry: "FMCG", flag: "🇬🇧",
    commitment: "Net Zero by 2039", emissions: "61M tCO₂e/yr", need: "3–8M credits/yr",
    esg: 85, warmth: "warm",
    rationale: "SBTi-aligned targets just validated; new CSO mandate includes carbon credit sourcing; CTAP published",
    signals: ["Unilever publishes 2025 Climate Transition Action Plan","SBTi validates Unilever net-zero targets","New CSO mandate includes carbon credit sourcing strategy"],
    contact: { name: "Rebecca Marmot", title: "Chief Sustainability Officer", url: "https://linkedin.com/in/rebeccamarmot" },
    score: 81
  },
  {
    id: 6, company: "Apple Inc", ticker: "AAPL", industry: "Technology", flag: "🇺🇸",
    commitment: "Carbon Neutral across supply chain by 2030", emissions: "22.6M tCO₂e/yr", need: "1–3M credits/yr",
    esg: 90, warmth: "cold",
    rationale: "Credits as last resort per policy; primarily reduction-focused; potential engagement window in Q4 2025",
    signals: ["2024 Environmental Report: credits only for residual emissions","Lisa Jackson speaks at COP on avoiding offset over-reliance","Supply chain decarbonization gaps create potential window"],
    contact: { name: "Lisa Jackson", title: "VP Environment, Policy & Social Initiatives", url: "https://linkedin.com/in/lisapjackson" },
    score: 62
  }
];

const PROJECTS = [
  {
    id: 1, name: "Amazon Rainforest REDD+", subtitle: "Primary forest conservation",
    country: "Brazil", flag: "🇧🇷", type: "Forestry / REDD+", icon: "tree", registry: "Verra",
    vintages: "2022–2035", credits: "2.4M tCO₂e/yr", size: "412,000 ha", price: "$12–18", quality: 97,
    cobenefits: ["Biodiversity", "Indigenous Rights", "Water Security"],
    description: "Protects primary Amazon rainforest with CCBS gold-level community & biodiversity certification."
  },
  {
    id: 2, name: "Kenya Turkana Wind", subtitle: "Africa's largest wind farm",
    country: "Kenya", flag: "🇰🇪", type: "Renewable Energy", icon: "wind", registry: "Gold Standard",
    vintages: "2023–2032", credits: "850K tCO₂e/yr", size: "310 MW", price: "$8–12", quality: 91,
    cobenefits: ["Energy Access", "SDG 7", "Job Creation"],
    description: "Powers 300,000 homes with clean wind energy. Highest SDG impact score in Gold Standard registry."
  },
  {
    id: 3, name: "Indonesia Blue Carbon", subtitle: "Mangrove restoration & conservation",
    country: "Indonesia", flag: "🇮🇩", type: "Blue Carbon", icon: "droplets", registry: "Verra",
    vintages: "2021–2036", credits: "1.2M tCO₂e/yr", size: "98,000 ha", price: "$22–35", quality: 95,
    cobenefits: ["Coastal Protection", "Fisheries", "Biodiversity"],
    description: "Premium blue carbon mangrove restoration. Highest carbon density per hectare in SE Asia."
  },
  {
    id: 4, name: "India Solar Initiative", subtitle: "Distributed solar for rural communities",
    country: "India", flag: "🇮🇳", type: "Solar Energy", icon: "solar", registry: "Gold Standard",
    vintages: "2023–2033", credits: "500K tCO₂e/yr", size: "200 MW", price: "$6–10", quality: 84,
    cobenefits: ["Energy Access", "SDG 7", "Poverty Reduction"],
    description: "Distributed solar serving 400+ rural communities. Verified SDG contributions across 7 goals."
  },
  {
    id: 5, name: "Congo Basin Forest", subtitle: "World's second largest rainforest",
    country: "DRC", flag: "🇨🇩", type: "Forestry / REDD+", icon: "tree", registry: "Verra",
    vintages: "2022–2032", credits: "3.1M tCO₂e/yr", size: "1.2M ha", price: "$10–15", quality: 89,
    cobenefits: ["Biodiversity", "Indigenous Rights", "Congo Basin"],
    description: "REDD+ protecting the second-largest tropical rainforest. Critical carbon sink globally."
  },
  {
    id: 6, name: "Morocco Noor Solar", subtitle: "World-scale concentrated solar power",
    country: "Morocco", flag: "🇲🇦", type: "Solar Energy", icon: "solar", registry: "Gold Standard",
    vintages: "2023–2030", credits: "750K tCO₂e/yr", size: "580 MW", price: "$9–13", quality: 88,
    cobenefits: ["Energy Independence", "Technology Transfer", "SDGs"],
    description: "Among world's largest CSP projects. Enables technology transfer to North Africa."
  }
];

const MATCHES = [
  { id: 1, demandId: 1, supplyId: 1, score: 97, reason: "Microsoft's nature-based, high-quality preference aligns perfectly. Volume matches their 2–5M need. REDD+ biodiversity standards align with Microsoft's AI for Earth commitments. CCB Gold rating meets internal policy." },
  { id: 2, demandId: 1, supplyId: 3, score: 91, reason: "Blue carbon premium quality aligns with Microsoft's quality-first approach. Unique asset class diversifies portfolio. Indonesian geography adds regional spread to their carbon strategy." },
  { id: 3, demandId: 3, supplyId: 5, score: 95, reason: "Congo Basin 3.1M credits/yr perfectly matches Amazon's high-volume need. REDD+ type preferred in The Climate Pledge framework. Verified additionality and strong permanence rating." },
  { id: 4, demandId: 3, supplyId: 1, score: 88, reason: "Iconic brand alignment — Amazon.com protecting the Amazon rainforest. Forestry focus matches Climate Pledge commitments. Meets quality threshold." },
  { id: 5, demandId: 2, supplyId: 5, score: 86, reason: "Congo Basin volume helps Shell's large-scale demand. Nature-based type aligns with Shell's published NbS strategy. Price range competitive for Shell's procurement targets." },
  { id: 6, demandId: 5, supplyId: 2, score: 84, reason: "Unilever's African supply chain aligns with Kenya Wind's community co-benefits. SDG benefits match Unilever's human rights commitments. Gold Standard preferred by Unilever policy." }
];

const DEMAND_NEWS = [
  { time: "2h ago", source: "Bloomberg ESG", headline: "Microsoft expands carbon removal portfolio, targets REDD+ allocation in 2025", tag: "MSFT" },
  { time: "4h ago", source: "Reuters", headline: "Shell faces record pressure from activist investors over Scope 3 emissions", tag: "SHEL" },
  { time: "6h ago", source: "Financial Times", headline: "Amazon Climate Pledge reaches 450 corporate signatories globally", tag: "AMZN" },
  { time: "1d ago", source: "ESG Dive", headline: "Unilever SBTi targets validated — carbon credit sourcing phase officially begins", tag: "ULVR" },
  { time: "1d ago", source: "Carbon Brief", headline: "Corporate carbon credit demand projected +38% in 2025 as net-zero deadlines approach", tag: "Market" },
  { time: "2d ago", source: "S&P Global", headline: "BP reaffirms large-scale offset program despite capex budget cuts", tag: "BP" },
];

const SUPPLY_NEWS = [
  { time: "1h ago", source: "Verra Registry", headline: "New REDD+ methodology VM0048 approved for tropical forest conservation", tag: "Verra" },
  { time: "3h ago", source: "Gold Standard", headline: "Enhanced SDG impact verification framework launched for renewable projects", tag: "GS" },
  { time: "5h ago", source: "ICVCM", headline: "Core Carbon Principles: 8 new projects receive CCB gold-level status", tag: "ICVCM" },
  { time: "8h ago", source: "Reuters", headline: "Carbon credit prices up 18% YTD on tightening supply and quality standards", tag: "Market" },
  { time: "1d ago", source: "Forest Trends", headline: "Brazil REDD+ issuances hit record 45M credits in 2024, demand outpacing supply", tag: "Brazil" },
  { time: "2d ago", source: "Bloomberg", headline: "Indonesia Blue Carbon projects see 3x demand surge from corporate buyers in Q1", tag: "Indonesia" },
];

// ─── CHAT BRAIN ──────────────────────────────────────────────────────────────

function processChat(msg, setPage, addLead, addProject) {
  const q = msg.toLowerCase().trim();

  if (q.includes("demand") && (q.includes("run") || q.includes("open") || q.includes("agent") || q.includes("show"))) {
    setTimeout(() => setPage("discovery"), 400);
    return "Opening the Agents view → Demand column. Scanning 6 corporate leads across Technology, Oil & Gas, and FMCG sectors. 2 hot leads ready for immediate outreach.";
  }
  if (q.includes("supply") && (q.includes("run") || q.includes("open") || q.includes("agent") || q.includes("show"))) {
    setTimeout(() => setPage("discovery"), 400);
    return "Opening the Agents view → Supply column. 6 high-quality projects verified by Verra and Gold Standard across Brazil, Kenya, Indonesia, India, DRC, and Morocco.";
  }
  if (q.includes("match") || q.includes("matchmak")) {
    setTimeout(() => setPage("discovery"), 400);
    return "Opening the Agents view → Matchmaking column. Generated 6 high-confidence matches. Top match: Microsoft × Amazon REDD+ at 97% confidence.";
  }
  if (q.includes("pipeline") || q.includes("deals")) {
    setTimeout(() => setPage("pipeline"), 400);
    return "Opening the Sales Pipeline. Deals move through: Prospect → Qualified → Negotiating → Closed. Add leads and projects from Discovery.";
  }
  if (q.includes("campaign")) {
    setTimeout(() => setPage("campaigns"), 400);
    return "Opening Campaigns. Manage your outreach sequences, track email opens, and monitor engagement with carbon credit buyers.";
  }
  if (q.includes("client") || q.includes("crm") || q.includes("account")) {
    setTimeout(() => setPage("clients"), 400);
    return "Opening Client Management. View all accounts, relationship health, and deal history in one place.";
  }
  if (q.includes("data room") || q.includes("dataroom") || q.includes("document") || q.includes("file")) {
    setTimeout(() => setPage("dataroom"), 400);
    return "Opening Data Room. Access project documents, term sheets, registry certificates, and due diligence files.";
  }
  if (q.includes("dashboard") || q.includes("home") || q.includes("overview")) {
    setTimeout(() => setPage("dashboard"), 400);
    return "Showing Dashboard. Market pulse: Carbon prices up 18% YTD, corporate demand projected +38% in 2025.";
  }
  if (q.includes("hot lead") || q.includes("best lead") || q.includes("top lead")) {
    setTimeout(() => setPage("demand"), 400);
    return "The 2 hottest leads are Microsoft (score 96 — budget confirmed for Q4) and Amazon (score 93 — active RFP open with Q1 deadline). Both have verified carbon procurement mandates.";
  }
  if (q.includes("microsoft") || q.includes("msft")) {
    return "Microsoft: Carbon Negative by 2030. Needs 2–5M credits/yr. ESG 94/100. HOT lead 🔴\nContact: Melanie Nakagawa (CSO). $1B Climate Innovation Fund announced. Q4 budget confirmed.";
  }
  if (q.includes("amazon") || q.includes("amzn")) {
    return "Amazon: Net Zero by 2040 via The Climate Pledge. Needs 5–15M credits/yr. ESG 78/100. HOT lead 🔴\nContact: Kara Hurst (VP Sustainability). Active RFP open — Q1 close deadline.";
  }
  if (q.includes("shell") || q.includes("shel")) {
    return "Shell PLC: Net Zero by 2050. Needs 10–20M credits/yr. ESG 71/100. WARM lead 🟡\nContact: Anna Mascolo (President, NbS). Recently retired 8.5M Verra credits. NbS strategy published.";
  }
  if (q.includes(" bp ") || q.includes("bp plc") || q.startsWith("bp")) {
    return "BP PLC: Net Zero by 2050. Needs 8–12M credits/yr. ESG 67/100. WARM lead 🟡\nContact: Giulia Chierchia (EVP Strategy). Active offset program despite 40% capex cuts.";
  }
  if (q.includes("unilever") || q.includes("ulvr")) {
    return "Unilever: Net Zero by 2039. Needs 3–8M credits/yr. ESG 85/100. WARM lead 🟡\nContact: Rebecca Marmot (CSO). SBTi targets just validated. CTAP 2025 published.";
  }
  if (q.includes("apple") || q.includes("aapl")) {
    return "Apple Inc: Carbon Neutral by 2030. Needs 1–3M credits/yr. ESG 90/100. COLD lead 🔵\nContact: Lisa Jackson (VP Environment). Uses credits only as last resort — engagement window in Q4 2025.";
  }
  if (q.includes("redd") || q.includes("forest") || q.includes("forestry")) {
    return "Top REDD+ projects:\n• Amazon Rainforest, Brazil — 2.4M t/yr, Quality 97, Verra\n• Congo Basin, DRC — 3.1M t/yr, Quality 89, Verra\nBoth have CCBS certification and strong additionality.";
  }
  if (q.includes("blue carbon") || q.includes("mangrove")) {
    return "Indonesia Blue Carbon (Kalimantan): 1.2M tCO₂e/yr, Quality 95/100, Verra. Premium pricing $22–35/t. 3x demand surge in Q1. Highest carbon density per hectare in SE Asia.";
  }
  if (q.includes("solar") || q.includes("wind") || q.includes("renewable")) {
    return "Renewable projects:\n• Kenya Turkana Wind — 850K t/yr, Q91, Gold Standard\n• Morocco Noor Solar — 750K t/yr, Q88, Gold Standard\n• India Solar Initiative — 500K t/yr, Q84, Gold Standard";
  }
  if (q.includes("verra")) {
    return "Verra-certified projects: Amazon REDD+ (Q97), Indonesia Blue Carbon (Q95), Congo Basin (Q89). New VM0048 methodology approved this week for tropical forests.";
  }
  if (q.includes("gold standard")) {
    return "Gold Standard projects: Kenya Wind (Q91), Morocco Solar (Q88), India Solar (Q84). Enhanced SDG verification framework just launched this week.";
  }
  if (q.includes("best match") || q.includes("top match") || q.includes("highest match")) {
    setTimeout(() => setPage("matching"), 400);
    return "Best match: Microsoft × Amazon Rainforest REDD+ at 97% confidence. Nature-based preference aligns perfectly, volume matches 2–5M need, and CCB Gold meets their internal policy requirements.";
  }
  if (q.includes("add microsoft") || q.includes("pipeline microsoft")) {
    const lead = LEADS.find(l => l.company === "Microsoft");
    addLead(lead);
    return "Added Microsoft to your pipeline as a Prospect. Navigate to the Pipeline view to advance them through stages.";
  }
  if (q.includes("add amazon") || q.includes("pipeline amazon")) {
    const lead = LEADS.find(l => l.company === "Amazon");
    addLead(lead);
    return "Added Amazon to your pipeline as a Prospect. They have an active RFP — move to Qualified quickly.";
  }
  if (q.includes("run all") || q.includes("run agents") || q.includes("start agents")) {
    setTimeout(() => setPage("discovery"), 400);
    return "Opening the unified Agents view. Demand, Supply, and Matchmaking are all running side by side — use the Refresh buttons to re-scan each column.";
  }
  if (q.includes("help") || q.includes("what can") || q.includes("commands")) {
    return "I can help you:\n• Run agents: 'Run demand agent', 'Open supply agent'\n• Find leads: 'Show hot leads', 'Tell me about Microsoft'\n• Find projects: 'Show REDD+ projects', 'Verra projects'\n• Matchmaking: 'Show best match', 'Run matching'\n• Pipeline: 'Add Microsoft to pipeline'\n• Navigate: 'Show dashboard'";
  }
  return "Got it. You can ask me to run agents, find specific leads or projects, show matches, or navigate to any section. Type 'help' to see all commands.";
}

// ─── THEME ────────────────────────────────────────────────────────────────────
// dark=true → dark mode (black bg)   dark=false → light mode (white bg)
// Sidebar is ALWAYS black in both modes.
// AI CTAs / important info → orange #E8601C  |  Normal CTAs → green #00897B

const Th = (dark = true) => ({
  // ── Main areas ──
  bg:         dark ? "bg-[#0D0F14]"                       : "bg-white",
  sidebar:    "bg-[#0D0F14]",                               // always black
  chat:       dark ? "bg-[#090B0F] border-r border-[#1C1F28]" : "bg-[#F5F6F8] border-r border-[#E4E6EA]",
  topbar:     dark ? "bg-[#0D0F14] border-b border-[#1C1F28]" : "bg-white border-b border-[#E4E6EA]",
  card:       dark ? "bg-[#141820] border border-[#1C1F28]"   : "bg-white border border-[#E4E6EA]",
  cardHov:    "transition-all duration-200 hover:shadow-md hover:border-[#E8601C]/30",
  // ── Text ──
  text:       dark ? "text-white"           : "text-gray-900",
  sub:        dark ? "text-white/65"        : "text-gray-500",
  muted:      dark ? "text-white/38"        : "text-gray-400",
  border:     dark ? "border-[#1C1F28]"     : "border-[#E4E6EA]",
  // ── Inputs ──
  input:      dark
    ? "bg-[#090B0F] border border-[#1C1F28] text-white placeholder:text-white/30 focus:border-[#E8601C] focus:outline-none rounded-lg px-3 py-2 text-sm"
    : "bg-white border border-[#D1D5DB] text-gray-900 placeholder:text-gray-400 focus:border-[#E8601C] focus:outline-none rounded-lg px-3 py-2 text-sm",
  chatInput:  dark
    ? "bg-[#090B0F] border border-[#1C1F28] text-white placeholder:text-white/30 focus:border-[#E8601C] focus:outline-none"
    : "bg-white border border-[#D1D5DB] text-gray-900 placeholder:text-gray-400 focus:border-[#E8601C] focus:outline-none",
  // ── Sidebar nav (sidebar always black → always white text; selected = solid orange pill) ──
  navOn:      "bg-[#E8601C] text-white font-semibold rounded-lg",
  navOff:     "text-white/45 hover:bg-white/[0.06] hover:text-white/80 rounded-lg",
  logoText:   "text-white",
  logoGrad:   "from-[#E8601C] to-[#A84232]",
  // ── Tags / pills ──
  tag:        dark
    ? "bg-[#00897B]/20 text-white/60 text-xs px-2 py-0.5 rounded-full border border-[#00897B]/30"
    : "bg-[#00897B]/10 text-[#00796B] text-xs px-2 py-0.5 rounded-full border border-[#00897B]/25",
  pill:       dark ? "bg-[#141820] text-white/55"    : "bg-gray-100 text-gray-600",
  hover:      dark ? "hover:bg-white/[0.05]"          : "hover:bg-black/[0.04]",
  // ── Status badges ──
  hot:        "bg-[#E8601C]/15 text-[#E8601C] border border-[#E8601C]/35",
  warm:       dark ? "bg-[#A84232]/15 text-[#E8A080] border border-[#A84232]/30"  : "bg-orange-50 text-orange-700 border border-orange-200",
  cold:       dark ? "bg-[#1C1F28]/60 text-white/50 border border-[#1C1F28]"      : "bg-gray-100 text-gray-500 border border-gray-200",
  verra:      dark ? "bg-[#00897B]/25 text-[#80CBC4] border border-[#00897B]/50"  : "bg-[#00897B]/12 text-[#00897B] border border-[#00897B]/30",
  gold:       dark ? "bg-[#A84232]/15 text-[#E8A080] border border-[#A84232]/30"  : "bg-amber-50 text-amber-700 border border-amber-200",
  // ── AI: always orange ──
  statusBar:  "bg-[#E8601C]/10 border border-[#E8601C]/20 text-[#E8601C]",
  aiAccent:   "text-[#E8601C]",
  aiBadge:    "bg-[#E8601C]/10 text-[#E8601C] border border-[#E8601C]/20 text-[10px] px-1.5 py-0.5 rounded-full font-bold",
  aiSection:  "bg-[#E8601C]/8 border border-[#E8601C]/15",
  aiBtn:      "bg-[#E8601C] hover:bg-[#D04D0A] text-white shadow-[0_2px_10px_rgba(232,96,28,0.35)] hover:shadow-[0_3px_14px_rgba(232,96,28,0.50)]",
  accent:     "text-[#E8601C]",
  accentBg:   "bg-[#E8601C]",
  // ── Normal CTAs: green #00897B ──
  ctaBg:      "bg-[#00897B] hover:bg-[#00796B] text-white",
  ctaText:    "text-white",
  inPipeline: dark ? "bg-[#00897B]/25 text-[#80CBC4] border border-[#00897B]/45" : "bg-[#00897B]/12 text-[#00897B] border border-[#00897B]/30",
  verified:   dark ? "text-[#80CBC4]" : "text-[#00897B]",
  // ── Misc panels ──
  newsCard:   dark ? "bg-[#141820] border border-[#1C1F28] hover:border-[#252A38] transition-colors"         : "bg-white border border-[#E4E6EA] hover:border-[#D1D5DB] transition-colors",
  matchPanel: dark ? "bg-[#090B0F] border border-[#1C1F28]"    : "bg-[#F5F6F8] border border-[#E4E6EA]",
  kCol:       dark ? "bg-[#090B0F] border border-[#1C1F28]"    : "bg-[#F5F6F8] border border-[#E4E6EA]",
  kCard:      dark ? "bg-[#141820] border border-[#1C1F28] hover:border-[#E8601C]/35 transition-all" : "bg-white border border-[#E4E6EA] hover:border-[#E8601C]/35 transition-all",
  divider:    dark ? "bg-[#1C1F28] hover:bg-[#E8601C]/12"      : "bg-[#E4E6EA] hover:bg-[#E8601C]/10",
  dividerDot: dark ? "bg-[#252A38]"                             : "bg-[#D1D5DB]",
  msgUser:    dark ? "bg-[#E8601C]/10 text-white border border-[#E8601C]/20"          : "bg-[#E8601C]/8 text-gray-900 border border-[#E8601C]/18",
  msgAi:      dark ? "bg-[#141820] text-white border border-[#1C1F28]"                : "bg-[#F5F6F8] text-gray-900 border border-[#E4E6EA]",
  chipBg:     dark
    ? "bg-[#141820] hover:bg-[#E8601C]/10 text-white/50 hover:text-[#E8601C] border border-[#1C1F28] hover:border-[#E8601C]/25"
    : "bg-gray-100 hover:bg-[#E8601C]/8 text-gray-500 hover:text-[#E8601C] border border-gray-200 hover:border-[#E8601C]/25",
});

// ─── MICRO COMPONENTS ────────────────────────────────────────────────────────

function WarmthBadge({ w, t }) {
  const cfgs = {
    hot:  { cls: t.hot,  label: "Hot",  icon: <Flame className="w-3 h-3" /> },
    warm: { cls: t.warm, label: "Warm", icon: <span className="text-[10px]">●</span> },
    cold: { cls: t.cold, label: "Cold", icon: <span className="text-[10px]">○</span> },
  };
  const c = cfgs[w];
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${c.cls}`}>{c.icon}{c.label}</span>;
}

function RegistryBadge({ r, t }) {
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${r === "Verra" ? t.verra : t.gold}`}><Award className="w-3 h-3" />{r}</span>;
}

function QScore({ score }) {
  const cls = score >= 95 ? "text-[#E8601C] bg-[#E8601C]/15 border-[#E8601C]/30"
    : score >= 88 ? "text-[#E8A080] bg-[#A84232]/15 border-[#A84232]/25"
    : score >= 80 ? "text-amber-400 bg-[#A84232]/10 border-[#A84232]/25"
    : "text-red-400 bg-[#A84232]/10 border-[#A84232]/25";
  return <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-bold border ${cls}`}><Star className="w-3 h-3" />{score}</span>;
}

function PIcon({ icon, className = "w-5 h-5" }) {
  if (icon === "tree")     return <TreePine className={className} />;
  if (icon === "wind")     return <Wind className={className} />;
  if (icon === "droplets") return <Droplets className={className} />;
  return <Zap className={className} />;
}

function AiMatchScore({ score }) {
  const ring = score >= 93 ? "border-[#E8601C] text-[#E8601C] bg-[#E8601C]/10"
    : score >= 85 ? "border-[#E8601C] text-[#E8601C] bg-[#E8601C]/10"
    : "border-[#E8A080] text-[#E8A080] bg-[#E8A080]/10";
  return (
    <div className={`flex flex-col items-center justify-center w-20 h-20 rounded-2xl border-2 ${ring} shrink-0`}>
      <span className="text-2xl font-black">{score}</span>
      <span className="text-[10px] font-semibold uppercase tracking-wide opacity-70">Match</span>
    </div>
  );
}

function ESGBar({ score, t }) {
  const color = score >= 85 ? "bg-[#E8601C]" : score >= 70 ? "bg-[#A84232]" : "bg-[#A84232]";
  return (
    <div className="space-y-1">
      <div className="flex justify-between"><span className={`text-xs ${t.muted}`}>ESG Score</span><span className={`text-xs font-bold ${t.sub}`}>{score}/100</span></div>
      <div className={`h-1.5 rounded-full ${t.pill} overflow-hidden`}><div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} /></div>
    </div>
  );
}

function InPipelineBadge({ t }) {
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${t.inPipeline}`}><CheckCircle className="w-3 h-3" />In Pipeline</span>;
}

function AgentStatusBar({ label, t }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${t.statusBar} text-xs shrink-0`}>
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8601C] opacity-60"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8601C]"></span>
      </span>
      <Brain className="w-3.5 h-3.5 shrink-0" />
      <span className="font-medium truncate">{label}</span>
      <span className="ml-auto opacity-60 shrink-0">just now</span>
      <button className={`p-0.5 rounded ${t.hover} shrink-0`}><RefreshCw className="w-3 h-3" /></button>
    </div>
  );
}

function CtaButton({ children, onClick, className = "" }) {
  return (
    <button onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#E8601C] hover:bg-[#D04D0A] text-white transition-colors ${className}`}>
      {children}
    </button>
  );
}

// ─── RESIZE HANDLE ───────────────────────────────────────────────────────────

function ResizeHandle({ onMouseDown, t, vertical = false }) {
  return (
    <div
      onMouseDown={onMouseDown}
      className={`${vertical ? "h-1 w-full cursor-row-resize" : "w-1 h-full cursor-col-resize"} shrink-0 flex items-center justify-center group transition-colors z-10 ${t.divider}`}
      style={{ userSelect: "none" }}
    >
      <div className={`${vertical ? "w-8 h-0.5" : "w-0.5 h-8"} rounded-full transition-colors group-hover:bg-[#E8601C]/50 ${t.dividerDot}`} />
    </div>
  );
}

// ─── CHAT PANEL ──────────────────────────────────────────────────────────────

const CHAT_SCAN_MSGS = [
  "Scanning global carbon markets… activating intelligence grid",
  "Detecting high-potential signals across registries, satellite data, and developer pipelines…",
  "Deploying expert agents to evaluate project integrity, risk, and potential…",
  "Filtering through thousands of projects to identify the highest-quality opportunities…",
  "Matching projects to your investment strategy, risk appetite, and compliance needs…",
  "Top opportunities identified. Ready for deeper diligence.",
];

function ScanMarketWidget({ dark }) {
  const [msgIdx, setMsgIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const isLast = msgIdx === CHAT_SCAN_MSGS.length - 1;
    const timer = setTimeout(() => {
      if (isLast) {
        setDone(true);
      } else {
        setVisible(false);
        setTimeout(() => { setMsgIdx(i => i + 1); setVisible(true); }, 300);
      }
    }, 2600);
    return () => clearTimeout(timer);
  }, [msgIdx, done]);

  return (
    <div style={{
      background: dark ? "rgba(26,29,36,0.97)" : "rgba(245,246,248,0.97)",
      border: `1px solid ${dark ? "rgba(232,96,28,0.30)" : "rgba(232,96,28,0.22)"}`,
      borderRadius: 12,
      padding: "10px 12px",
      minWidth: 230,
      maxWidth: 280,
    }}>
      {/* Header row */}
      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:7 }}>
        <Activity style={{
          width: 13, height: 13,
          color: done ? "#00897B" : "#E8601C",
          flexShrink: 0,
          animation: done ? "none" : "qBlink 1.1s ease-in-out infinite",
        }} />
        <span style={{
          fontSize: 10, fontWeight: 800,
          color: dark ? "rgba(255,255,255,0.85)" : "#1a1a1a",
          fontFamily: "monospace", letterSpacing: "0.09em",
        }}>
          MARKET SCANNER
        </span>
        {done && (
          <span style={{
            marginLeft: "auto", fontSize: 9, fontWeight: 700,
            color: "#00897B", fontFamily: "monospace", letterSpacing: "0.06em",
          }}>COMPLETE</span>
        )}
      </div>

      {/* Animated message */}
      <div style={{ minHeight: 30, overflow: "hidden", marginBottom: 7 }}>
        <div
          key={msgIdx}
          style={{
            fontSize: 10,
            color: dark ? "rgba(255,255,255,0.60)" : "rgba(0,0,0,0.60)",
            lineHeight: 1.55,
            display: "flex", alignItems: "flex-start", gap: 5,
            animation: visible ? "qMsgIn 0.35s ease-out both" : "qMsgOut 0.35s ease-in both",
          }}
        >
          {done
            ? <span style={{ color: "#00897B", fontSize: 11, flexShrink: 0 }}>✓</span>
            : <span style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "#E8601C", flexShrink: 0, marginTop: 3,
                display: "inline-block",
                animation: "qDotPulse 1s ease-in-out infinite",
              }} />
          }
          <span>{CHAT_SCAN_MSGS[msgIdx]}</span>
        </div>
      </div>

      {/* Progress bar dots */}
      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
        {CHAT_SCAN_MSGS.map((_, i) => (
          <span key={i} style={{
            height: 3, borderRadius: 999, display: "inline-block",
            width: (!done && i === msgIdx) ? 14 : 4,
            background: (done || i < msgIdx)
              ? "#E8601C"
              : (!done && i === msgIdx)
                ? "#E8601C"
                : dark ? "rgba(232,96,28,0.18)" : "rgba(232,96,28,0.22)",
            transition: "all 0.3s",
          }} />
        ))}
      </div>
    </div>
  );
}

const QUICK_ACTIONS = [
  { label: "Scan Market",    msg: "Open discovery agents" },
  { label: "Hot Leads",      msg: "Show hot leads" },
  { label: "Best Match",     msg: "What is the best match?" },
  { label: "Campaigns",      msg: "Open campaigns" },
  { label: "Clients",        msg: "Open client management" },
  { label: "Data Room",      msg: "Open data room" },
];

function ChatPanel({ t, dark, messages, setMessages, setPage, addLead, addProject, page, openNewCampaign, addAgent }) {
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [agentFlow, setAgentFlow] = useState(null); // { step, type, name, markets }
  const bottomRef = useRef(null);

  // Top 3 historical campaigns sorted by successRate
  const TOP_TEMPLATES = [...HISTORICAL_CAMPAIGNS]
    .sort((a, b) => b.successRate - a.successRate)
    .slice(0, 3);

  const requestNewCampaign = () => {
    const analysisText =
      `Here's an analysis of your best-performing campaigns:\n\n` +
      TOP_TEMPLATES.map((c, i) =>
        `${["🏆","🥈","🥉"][i]} ${c.name}\n   ${c.successRate}% success · ${c.volume.toLocaleString()} units · ${c.strategy}`
      ).join("\n\n") +
      `\n\nWould you like to use one of these as a template, or start a brand new campaign from scratch?`;

    const actions = [
      ...TOP_TEMPLATES.map(c => ({
        label: `Use "${c.name.split(" ").slice(0, 3).join(" ")}…" as template`,
        template: { name: c.name + " (Copy)", strategy: c.strategy, volume: String(c.volume) },
        primary: false,
      })),
      { label: "Start from scratch", template: null, primary: true },
    ];

    setMessages(prev => [...prev, { role: "ai", text: analysisText, actions }]);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // ── Agent creation flow helpers ─────────────────────────────────────────────
  const AGENT_TYPES = ["ARBITRAGE_SCANNER","COMPLIANCE_TRACKER","REGISTRY_MONITOR","PRICE_FEED"];
  const AGENT_MARKETS = ["EU_ETS","VCM","CORSIA","GEO","ACR","REGEN_AG","BLUE_C"];
  const AGENT_SUGGESTIONS = ["NEXUS_V1","DELTA_PRIME","ALPHA_HUNT","SIGMA_X","AURORA_02"];

  const pushAI = (text, actions) => {
    setTyping(false);
    setMessages(prev => [...prev, { role:"ai", text, actions }]);
  };

  const startAgentFlow = () => {
    setAgentFlow({ step:1, type:null, name:null, markets:[] });
    setTimeout(() => pushAI(
      `I can help you deploy a new scanning agent. Before we configure it, here are my recommendations to make it highly effective:\n\n` +
      `💡 MULTI-REGISTRY SCANNING — target 3+ registries (Verra + Gold Standard + ACR) for 40% higher match rates\n` +
      `⚡ ARBITRAGE MODE — enable cross-market price spread detection. EU_ETS vs VCM spread is currently +4.2%\n` +
      `🎯 CONFIDENCE THRESHOLD — set to 0.85+ to reduce false positives while still capturing strong signals\n` +
      `🔄 AUTO-EXECUTE — enable with a $50K/cycle cap to capture time-sensitive opportunities\n` +
      `📡 SCAN INTERVAL — 400–450ms balances thoroughness with speed\n\n` +
      `What type of agent would you like to create?`,
      AGENT_TYPES.map(t => ({ label: t, agentAction: { kind:"setType", value:t } }))
    ), 680);
  };

  const handleAgentAction = (action, msg) => {
    if (!agentFlow) return false;
    const { step, type, name, markets } = agentFlow;

    if (action?.agentAction?.kind === "setType") {
      const chosen = action.agentAction.value;
      setAgentFlow(f => ({...f, step:2, type:chosen}));
      setMessages(prev => [...prev, { role:"user", text: chosen }]);
      setTimeout(() => pushAI(
        `${chosen} — excellent choice. This will monitor price dislocations and opportunities in real-time.\n\n` +
        `What should we name this agent? Here are some ideas:\n` +
        `• ${AGENT_SUGGESTIONS[0]} — for cross-market nexus scanning\n` +
        `• ${AGENT_SUGGESTIONS[1]} — for price delta detection\n` +
        `• ${AGENT_SUGGESTIONS[2]} — for opportunity hunting\n\n` +
        `💡 TIP: Use a short all-caps name ending in a version number (e.g. ORION_03) so you can deploy variants later.\n\n` +
        `Type any name you'd like, or pick one above.`,
        AGENT_SUGGESTIONS.slice(0,3).map(n => ({ label:n, agentAction:{ kind:"setName", value:n } }))
      ), 600);
      return true;
    }

    if (step === 2 || action?.agentAction?.kind === "setName") {
      const chosen = action?.agentAction?.value || msg.toUpperCase().replace(/[^A-Z0-9_]/g,"").slice(0,16) || "AGENT_X";
      setAgentFlow(f => ({...f, step:3, name:chosen}));
      if (!action?.agentAction) setMessages(prev => [...prev, { role:"user", text: msg }]);
      else setMessages(prev => [...prev, { role:"user", text: chosen }]);
      setTimeout(() => pushAI(
        `${chosen} — great name. Now, which markets should it target?\n\n` +
        `Currently active markets:\n` +
        `• EU_ETS — highest volume, €68/t, trending ↑ — strong arb potential\n` +
        `• VCM (Verra) — nature-based premium, $18–35/t\n` +
        `• CORSIA — aviation sector compliance, fast-growing demand\n` +
        `• GEO — voluntary offset exchange\n\n` +
        `💡 TIP: EU_ETS + VCM combination gives the best arbitrage right now (spread +4.2%). Adding CORSIA triples the addressable volume.\n\n` +
        `Select your target markets:`,
        AGENT_MARKETS.map(m => ({ label: m, agentAction:{ kind:"toggleMarket", value:m } }))
      ), 620);
      return true;
    }

    if (step === 3 && action?.agentAction?.kind === "toggleMarket") {
      const m = action.agentAction.value;
      const newMarkets = markets.includes(m) ? markets.filter(x=>x!==m) : [...markets, m];
      setAgentFlow(f => ({...f, markets: newMarkets}));
      return true; // no message push, just update selection
    }

    return false;
  };

  const confirmMarkets = () => {
    const { type, name, markets } = agentFlow;
    const finalMarkets = markets.length ? markets : ["EU_ETS","VCM"];
    setMessages(prev => [...prev, { role:"user", text:`Confirm: ${name} targeting ${finalMarkets.join(", ")}` }]);
    setAgentFlow(null);
    setTyping(true);

    // Build new agent object
    const icons = { ARBITRAGE_SCANNER:"◈", COMPLIANCE_TRACKER:"◉", REGISTRY_MONITOR:"▣", PRICE_FEED:"✦" };
    const newAgent = {
      id: name,
      code: `AG-${Math.floor(1000+Math.random()*8999)}`,
      status: "ACTIVE",
      icon: icons[type] || "⚙",
      successRate: parseFloat((88 + Math.random()*8).toFixed(1)),
      trend: "up",
      efficiency: parseFloat((0.70+Math.random()*0.45).toFixed(2)),
      markets: finalMarkets,
      uptime: "0D 00H",
      lastActive: null,
      desc: `${type} scanning ${finalMarkets.join(", ")} for arbitrage and matching opportunities.`,
    };

    setTimeout(() => {
      addAgent(newAgent);
      setTimeout(() => setPage("terminal"), 300);
      pushAI(
        `⚡ Deploying ${name}...\n\n` +
        `✅ AGENT INITIALIZED\n` +
        `• Type: ${type}\n` +
        `• Markets: ${finalMarkets.join(", ")}\n` +
        `• Scan interval: 420ms\n` +
        `• Confidence threshold: 0.85\n` +
        `• Auto-execute: ENABLED ($50K cap)\n` +
        `• Risk profile: BALANCED\n\n` +
        `${name} is now live in your Agent Fleet. I've switched you to the Agent Terminal so you can monitor it.`
      );
    }, 1200);
  };

  const send = (text) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setInput("");

    // ── Agent creation flow ──────────────────────────────────────────────────
    const lower = msg.toLowerCase();
    const isAgentCreate = lower.includes("create agent") || lower.includes("new agent") ||
      lower.includes("deploy agent") || lower.includes("build agent") || lower.includes("launch agent") ||
      lower.includes("add agent") || lower.includes("initialize agent");
    if (isAgentCreate && !agentFlow) {
      setMessages(prev => [...prev, { role:"user", text: msg }]);
      setTyping(true);
      startAgentFlow();
      return;
    }

    // If in step 2 (naming), treat raw text as a name
    if (agentFlow?.step === 2) {
      handleAgentAction(null, msg);
      return;
    }

    // Intercept Scan Market quick action → inline scanner widget
    if (msg === "Open discovery agents") {
      setMessages(prev => [...prev, { role: "user", text: "Scan Market" }]);
      setTimeout(() => {
        setMessages(prev => [...prev, { role: "ai", scannerWidget: true }]);
      }, 350);
      return;
    }

    setMessages(prev => [...prev, { role:"user", text: msg }]);

    // Intercept campaign creation intent
    if ((lower.includes("create") && lower.includes("campaign")) || lower.includes("new campaign") || lower.includes("launch campaign")) {
      setTyping(true);
      setTimeout(() => { setTyping(false); requestNewCampaign(); }, 520);
      return;
    }

    setTyping(true);
    setTimeout(() => {
      const reply = processChat(msg, setPage, addLead, addProject);
      setMessages(prev => [...prev, { role:"ai", text: reply }]);
      setTyping(false);
    }, 520);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className={`flex flex-col h-full ${t.chat} overflow-hidden`}>
      {/* Header */}
      <div className={`px-3 py-2.5 border-b ${t.border} shrink-0 flex items-center gap-2`}>
        <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${t.logoGrad} flex items-center justify-center shadow shadow-[#E8601C]/20`}>
          <Brain className="w-3 h-3 text-white" />
        </div>
        <span className={`text-xs font-bold ${t.text}`}>Qatalyst</span>
        <div className="flex items-center gap-1 ml-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8601C] animate-pulse"></span>
          <span className={`text-[10px] ${t.aiAccent}`}>Active</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 min-h-0">

        {/* Dynamic contextual greeting */}
        <div className="flex justify-start">
          <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${t.logoGrad} flex items-center justify-center shrink-0 mt-0.5 mr-2`}>
            <Brain className="w-2.5 h-2.5 text-white" />
          </div>
          <div className={`max-w-[90%] px-3 py-2.5 rounded-2xl text-xs leading-relaxed ${t.msgAi} border`}>
            {page === "campaigns"
              ? <><span className={`block font-bold ${t.text} mb-1`}>Tell me your objective</span>What are you trying to achieve?</>
              : page === "terminal"
              ? <><span className={`block font-bold ${t.text} mb-1`}>Agent Terminal ready.</span>I can deploy new scanning agents for you. Just say <span className="text-[#E8601C] font-bold">"create agent"</span> and I'll guide you through the configuration with smart recommendations.</>
              : <><span className={`block font-bold ${t.text} mb-1`}>Let's get you to a decision faster.</span>What would you like to start with?</>
            }
          </div>
        </div>

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "ai" && (
              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${t.logoGrad} flex items-center justify-center shrink-0 mt-0.5 mr-2`}>
                <Brain className="w-2.5 h-2.5 text-white" />
              </div>
            )}
            {m.scannerWidget ? (
              <ScanMarketWidget dark={dark} />
            ) : (
            <div className={`max-w-[90%] px-3 py-2 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${m.role === "user" ? t.msgUser : t.msgAi} border`}>
              {m.text}
              {m.actions && m.actions.length > 0 && (
                <div className="mt-3 border-t border-[#2A2D38] pt-2.5">
                  {/* Agent-type chips */}
                  {m.actions[0]?.agentAction?.kind === "setType" && (
                    <div className="flex flex-wrap gap-1.5">
                      {m.actions.map((action, ai) => (
                        <button key={ai} onClick={() => { setTyping(true); handleAgentAction(action, action.label); }}
                          className="px-2.5 py-1 rounded text-[10px] font-bold font-mono tracking-wider transition-all border hover:bg-[#E8601C]/15 hover:border-[#E8601C]/50 hover:text-[#E8601C]"
                          style={{background:"var(--c-card2)", border:"1px solid var(--c-border2)", color:"var(--c-sub)"}}>
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                  {/* Agent name chips */}
                  {m.actions[0]?.agentAction?.kind === "setName" && (
                    <div className="flex flex-wrap gap-1.5">
                      {m.actions.map((action, ai) => (
                        <button key={ai} onClick={() => { setTyping(true); handleAgentAction(action, action.label); }}
                          className="px-2.5 py-1 rounded text-[10px] font-bold font-mono tracking-wider transition-all border hover:bg-[#E8601C]/15 hover:border-[#E8601C]/50 hover:text-[#E8601C]"
                          style={{background:"var(--c-card2)", border:"1px solid var(--c-border2)", color:"var(--c-sub)"}}>
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                  {/* Market toggle chips */}
                  {m.actions[0]?.agentAction?.kind === "toggleMarket" && (
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        {m.actions.map((action, ai) => {
                          const selected = agentFlow?.markets?.includes(action.label);
                          return (
                            <button key={ai} onClick={() => handleAgentAction(action, action.label)}
                              className={`px-2.5 py-1 rounded text-[10px] font-bold font-mono tracking-wider transition-all border`}
                              style={{
                                background: selected ? "rgba(232,96,28,0.20)" : "#1A1D24",
                                border: selected ? "1px solid rgba(232,96,28,0.50)" : "1px solid var(--c-border2)",
                                color: selected ? "#E8601C" : "rgba(255,255,255,0.55)",
                              }}>
                              {selected ? "✓ " : ""}{action.label}
                            </button>
                          );
                        })}
                      </div>
                      {agentFlow?.step === 3 && (
                        <button onClick={confirmMarkets}
                          className="w-full px-3 py-2 rounded text-[11px] font-bold tracking-widest transition-all mt-1"
                          style={{background:"#E8601C", color:"var(--c-text)", fontFamily:"monospace", boxShadow:"0 2px 8px rgba(232,96,28,0.35)"}}>
                          ⚡ DEPLOY AGENT {agentFlow.markets.length ? `(${agentFlow.markets.join(", ")})` : "(EU_ETS, VCM)"}
                        </button>
                      )}
                    </div>
                  )}
                  {/* Campaign actions */}
                  {!m.actions[0]?.agentAction && m.actions.map((action, ai) => (
                    <button key={ai}
                      onClick={() => openNewCampaign(action.template)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all mb-1.5
                        ${action.primary
                          ? "bg-[#E8601C] hover:bg-[#D04D0A] text-white shadow-[0_2px_6px_rgba(232,96,28,0.35)]"
                          : "bg-[#252830] hover:bg-[#E8601C]/10 text-white/60 border border-[#2A2D38] hover:border-[#E8601C]/30"}`}>
                      {action.primary ? <span className="flex items-center gap-1.5"><Plus className="w-3 h-3 inline" />{action.label}</span> : action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            )}
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${t.logoGrad} flex items-center justify-center shrink-0 mt-0.5 mr-2`}>
              <Brain className="w-2.5 h-2.5 text-white" />
            </div>
            <div className={`px-3 py-2 rounded-2xl border ${t.msgAi}`}>
              <span className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8601C] animate-bounce" style={{animationDelay:"0ms"}}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8601C] animate-bounce" style={{animationDelay:"150ms"}}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8601C] animate-bounce" style={{animationDelay:"300ms"}}></span>
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick actions */}
      <div className={`px-3 pb-2 flex flex-wrap gap-1.5 shrink-0`}>
        {page === "terminal" && (
          <button onClick={() => send("create agent")}
            className="text-[10px] px-2.5 py-1 rounded-full border transition-colors font-mono tracking-wider"
            style={{background:"rgba(232,96,28,0.12)", border:"1px solid rgba(232,96,28,0.35)", color:"#E8601C"}}>
            ⚡ Create agent
          </button>
        )}
        {QUICK_ACTIONS.map(({ label, msg }) => (
          <button key={label} onClick={() => send(msg)}
            className={`text-[10px] px-2 py-1 rounded-full border transition-colors ${t.chipBg}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className={`px-3 pb-3 shrink-0`}>
        <div className={`flex items-end gap-2 rounded-xl border ${t.border} p-2 ${dark ? "bg-[#1a1a1a]" : "bg-[#252830]"}`}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask anything or give instructions…"
            rows={2}
            className={`flex-1 resize-none text-xs bg-transparent focus:outline-none ${t.text} placeholder:${t.muted} leading-relaxed`}
            style={{ maxHeight: 80 }}
          />
          <button onClick={() => send()}
            disabled={!input.trim()}
            className="w-7 h-7 rounded-lg bg-[#E8601C] hover:bg-[#D04D0A] disabled:opacity-30 flex items-center justify-center transition-all shadow-[0_2px_8px_rgba(232,96,28,0.40)] hover:shadow-[0_3px_12px_rgba(232,96,28,0.55)] shrink-0">
            <Send className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
        <div className={`text-[10px] ${t.muted} mt-1.5 text-center`}>Press Enter to send · Shift+Enter for newline</div>
      </div>
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────

function Sidebar({ t, page, setPage, pipelineCount, dark, setDark }) {
  const nav = [
    { id: "dashboard", label: "Dashboard",        icon: LayoutDashboard },
    { id: "discovery", label: "Discovery",         icon: Compass },
    { id: "campaigns", label: "Campaigns",         icon: Target },
    { id: "clients",   label: "Client Management", icon: Users },
    { id: "dataroom",  label: "Data Room",         icon: FolderOpen },
    { id: "terminal",  label: "Agent Terminal",    icon: Activity },
  ];
  return (
    <aside className={`w-[210px] shrink-0 flex flex-col h-full ${t.sidebar}`}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4">
        <div className="w-8 h-8 rounded-xl bg-white/[0.10] flex items-center justify-center shrink-0">
          <Leaf className="w-4 h-4 text-white" />
        </div>
        <div>
          <span className="font-extrabold text-[15px] tracking-tight text-white leading-none">Qatalyst</span>
          <div className="text-[10px] text-white/35 mt-0.5 leading-none">Carbon Intelligence</div>
        </div>
      </div>

      {/* Workspace label */}
      <div className="px-4 pb-1">
        <span className="text-[9px] font-bold text-white/25 tracking-[0.14em] uppercase">Workspace</span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-2 pb-2 space-y-0.5 overflow-y-auto">
        {nav.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setPage(id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs transition-all duration-150 ${page === id ? t.navOn : t.navOff}`}>
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <span className="flex-1 text-left font-medium">{label}</span>
          </button>
        ))}
      </nav>

      {/* Footer — settings, dark toggle, notifications, profile */}
      <div className="px-2 pb-3 border-t border-white/[0.06] pt-2 space-y-0.5">
        {/* Settings */}
        <button className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs ${t.navOff} transition-all`}>
          <Settings className="w-3.5 h-3.5 shrink-0" /><span className="font-medium">Settings</span>
        </button>

        {/* User profile */}
        <div className="flex items-center gap-2.5 px-3 py-2 mt-1 rounded-lg mx-0 cursor-pointer hover:bg-white/[0.05] transition-colors">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#E8601C] to-[#A84232] flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-[0_2px_6px_rgba(232,96,28,0.35)]">KA</div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-semibold text-white leading-none truncate">Kopal Agarwal</div>
            <div className="text-[9px] text-white/35 mt-0.5 truncate">Admin</div>
          </div>
          <MoreHorizontal className="w-3.5 h-3.5 text-white/25 shrink-0" />
        </div>
      </div>
    </aside>
  );
}

// ─── TOPBAR ──────────────────────────────────────────────────────────────────

function Topbar({ t, page, dark, setDark }) {
  const titles = {
    dashboard: "Dashboard",
    discovery: "Discovery",
    campaigns: "Campaigns",
    clients:   "Client Management",
    dataroom:  "Data Room",
    pipeline:  "Sales Pipeline",
    terminal:  "Agent Terminal",
  };
  return (
    <header className={`h-11 flex items-center gap-3 px-4 ${t.topbar} shrink-0`}>
      <h1 className={`text-sm font-bold ${t.text}`}>{titles[page] || "Qatalyst"}</h1>
      <div className="flex-1" />

      {/* Dark / Light toggle */}
      <button
        onClick={() => setDark(d => !d)}
        className={`relative flex items-center rounded-full border transition-all duration-300 ${t.card} overflow-hidden`}
        style={{ width:44, height:22, padding:0, flexShrink:0 }}
      >
        <span style={{ position:"absolute", inset:0, background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,137,123,0.12)", transition:"background 0.3s" }} />
        <span style={{
          position:"absolute", top:2,
          left: dark ? "calc(100% - 19px)" : 2,
          width:18, height:18, borderRadius:"50%",
          background: dark ? "#E8601C" : "#00897B",
          display:"flex", alignItems:"center", justifyContent:"center",
          transition:"left 0.25s cubic-bezier(0.34,1.56,0.64,1), background 0.3s",
          boxShadow: dark ? "0 1px 4px rgba(232,96,28,0.5)" : "0 1px 4px rgba(0,137,123,0.5)",
        }}>
          {dark ? <Moon style={{ width:9, height:9, color:"#fff" }} /> : <Sun style={{ width:9, height:9, color:"#fff" }} />}
        </span>
      </button>

      {/* Notifications */}
      <button className={`relative p-1.5 rounded-lg ${t.card} border`}>
        <Bell className={`w-3.5 h-3.5 ${t.sub}`} />
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#E8601C]" />
      </button>
    </header>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────

function Dashboard({ t, dark, pipeline, setPage }) {
  const stats = [
    { label: "Corporate Leads",  value: LEADS.length,    sub: "+3 this week",    icon: Building2, color: t.aiAccent, bg: dark ? "bg-[#E8601C]/10" : "bg-[#E8601C]/10" },
    { label: "Carbon Projects",  value: PROJECTS.length, sub: "4 registries",    icon: TreePine,  color: t.verified, bg: dark ? "bg-[#E8601C]/10" : "bg-[#2D3C29]/25"  },
    { label: "Matches Found",    value: MATCHES.length,  sub: "High confidence", icon: GitMerge,  color: t.aiAccent, bg: dark ? "bg-[#E8601C]/10" : "bg-[#E8601C]/10" },
    { label: "In Pipeline",      value: pipeline.length, sub: pipeline.length === 0 ? "Add items" : "Active deals", icon: Briefcase, color: t.verified, bg: dark ? "bg-[#E8601C]/10" : "bg-[#2D3C29]/25" },
  ];
  return (
    <div className="p-4 space-y-3 max-w-6xl mx-auto">
      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3">
        {stats.map(({ label, value, sub, icon: Icon, color, bg }) => (
          <div key={label} className={`rounded-xl p-3.5 ${t.card} border flex items-center gap-3`}>
            <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center shrink-0`}><Icon className={`w-4 h-4 ${color}`} /></div>
            <div className="min-w-0">
              <div className={`text-xl font-black ${t.text} leading-none`}>{value}</div>
              <div className={`text-xs font-medium ${t.sub} mt-0.5`}>{label}</div>
              <div className={`text-[10px] ${t.muted}`}>{sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Agents + Market Pulse */}
      <div className="grid grid-cols-3 gap-3">
        <div className={`col-span-2 rounded-xl p-3.5 ${t.card} border`}>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5"><Brain className={`w-3.5 h-3.5 ${t.aiAccent}`} /><span className={`text-xs font-bold ${t.text}`}>Agent Modules</span></div>
            <button onClick={() => setPage("discovery")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#E8601C] hover:bg-[#D04D0A] text-white transition-all shadow-[0_2px_8px_rgba(232,96,28,0.40)] hover:shadow-[0_3px_12px_rgba(232,96,28,0.55)]">
              <Sparkles className="w-3 h-3" />Open Agents
            </button>
          </div>
          <div className="space-y-1.5">
            {[
              { id: "discovery", label: "Demand Agent",       desc: "Analyzes corporate ESG news, identifies buyers, assesses lead warmth, maps contacts", icon: Building2 },
              { id: "discovery", label: "Supply Agent",       desc: "Reviews Verra & Gold Standard registries, scores projects against user benchmarks", icon: TreePine   },
              { id: "discovery", label: "Matchmaking Engine", desc: "Cross-references demand profiles with supply to surface highest-value deal matches", icon: GitMerge   },
            ].map(({ id, label, desc, icon: Icon }) => (
              <button key={label} onClick={() => setPage(id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left ${t.card} ${t.cardHov} border`}>
                <div className={`w-7 h-7 rounded-lg ${dark ? "bg-[#E8601C]/10" : "bg-[#E8601C]/10"} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-3.5 h-3.5 ${t.aiAccent}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-semibold ${t.text}`}>{label}</div>
                  <p className={`text-[11px] ${t.muted} mt-0.5 leading-relaxed`}>{desc}</p>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 ${t.muted} shrink-0`} />
              </button>
            ))}
          </div>
        </div>

        <div className={`rounded-xl p-3.5 ${t.card} border`}>
          <div className="flex items-center justify-between mb-2.5">
            <span className={`text-xs font-bold ${t.text}`}>Market Pulse</span>
            <Activity className={`w-3.5 h-3.5 ${t.aiAccent}`} />
          </div>
          <div className="space-y-2">
            {[
              ["Carbon Price Index", "+18% YTD"],
              ["Verra Issuances YTD", "142M t"],
              ["Corp Demand 2025E",   "+38%"],
              ["Avg Credit Quality",  "88 / 100"],
              ["Hot Leads Found",     `${LEADS.filter(l=>l.warmth==="hot").length}`],
              ["Top Match Score",     `${Math.max(...MATCHES.map(m=>m.score))}%`],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between">
                <span className={`text-xs ${t.sub}`}>{label}</span>
                <span className={`text-xs font-bold ${t.aiAccent}`}>{value}</span>
              </div>
            ))}
          </div>
          <div className={`mt-3 pt-3 border-t ${t.border}`}>
            <div className={`text-[10px] ${t.muted} text-center leading-relaxed`}>Verra · Gold Standard · Bloomberg ESG · Reuters</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DEMAND AGENT ────────────────────────────────────────────────────────────

function DemandAgent({ t, dark, pipeline, addLead }) {
  const [filter, setFilter] = useState("all");
  const [leftW, setLeftW] = useState(230);
  const resizing = useRef(false);

  useEffect(() => {
    const onMove = (e) => { if (resizing.current) setLeftW(w => Math.max(160, Math.min(380, w + e.movementX))); };
    const onUp   = () => { resizing.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  const filtered = filter === "all" ? LEADS : LEADS.filter(l => l.warmth === filter);

  return (
    <div className="flex flex-col h-full p-3 gap-2.5 overflow-hidden">
      <AgentStatusBar label="Scanning corporate ESG signals, news & carbon retirement history…" t={t} />
      <div className="flex flex-1 gap-0 overflow-hidden rounded-2xl border" style={{ borderColor: dark ? "#252525" : "#2A2D38" }}>
        {/* Left: news */}
        <div className="flex flex-col h-full overflow-hidden shrink-0" style={{ width: leftW }}>
          <div className={`px-3 py-2.5 border-b ${t.border} flex items-center gap-1.5 shrink-0`}>
            <Newspaper className={`w-3.5 h-3.5 ${t.aiAccent}`} />
            <span className={`text-xs font-bold ${t.text}`}>Market Signals</span>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {DEMAND_NEWS.map((n, i) => (
              <div key={i} className={`p-2.5 rounded-xl ${t.newsCard} cursor-pointer`}>
                <div className="flex justify-between mb-1">
                  <span className={`text-[10px] font-bold ${t.aiAccent}`}>{n.source}</span>
                  <span className={`text-[10px] ${t.muted}`}>{n.time}</span>
                </div>
                <p className={`text-xs ${t.sub} leading-relaxed`}>{n.headline}</p>
                <span className={`inline-block mt-1 ${t.tag}`}>{n.tag}</span>
              </div>
            ))}
          </div>
        </div>

        <ResizeHandle onMouseDown={() => { resizing.current = true; }} t={t} />

        {/* Right: leads */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <div className={`px-3 py-2.5 border-b ${t.border} flex items-center gap-2 shrink-0 flex-wrap`}>
            <span className={`text-xs font-bold ${t.text}`}>Corporate Leads</span>
            <span className={t.tag}>{LEADS.length}</span>
            <div className="ml-auto flex gap-1">
              {["all","hot","warm","cold"].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-colors
                    ${filter === f ? "bg-[#E8601C] text-white" : `${t.card} ${t.sub} ${t.hover} border ${t.border}`}`}>{f}</button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            <div className="grid grid-cols-2 gap-3">
              {filtered.map(lead => {
                const inPipe = pipeline.some(p => p.type === "demand" && p.id === lead.id);
                return (
                  <div key={lead.id} className={`rounded-2xl p-4 ${t.card} ${t.cardHov} border flex flex-col gap-2.5`}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span>{lead.flag}</span>
                          <span className={`text-sm font-bold ${t.text}`}>{lead.company}</span>
                          <span className={`text-xs ${t.muted}`}>{lead.ticker}</span>
                        </div>
                        <span className={t.tag}>{lead.industry}</span>
                      </div>
                      <WarmthBadge w={lead.warmth} t={t} />
                    </div>
                    <ESGBar score={lead.esg} t={t} />
                    <div className={`text-xs ${t.sub} space-y-0.5`}>
                      <div className="flex gap-1 flex-wrap"><span className={t.muted}>Commitment:</span><span className="font-medium">{lead.commitment}</span></div>
                      <div className="flex gap-1"><span className={t.muted}>Needs:</span><span className={`font-bold ${t.verified}`}>{lead.need}</span></div>
                    </div>
                    <div className={`text-xs rounded-xl p-2.5 ${t.aiSection} border`}>
                      <div className={`text-[10px] font-bold uppercase tracking-wide mb-0.5 ${t.aiAccent}`}>Agent Signal</div>
                      <p className={`${t.sub} leading-relaxed`}>{lead.rationale}</p>
                    </div>
                    <div className={`flex items-center gap-2 p-2 rounded-xl ${dark ? "bg-[#141414]" : "bg-[#1A1D24]"} border ${t.border}`}>
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#E8601C] to-[#A84232] flex items-center justify-center text-[9px] font-bold text-white shrink-0">
                        {lead.contact.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-semibold ${t.text} truncate`}>{lead.contact.name}</div>
                        <div className={`text-[10px] ${t.muted} truncate`}>{lead.contact.title}</div>
                      </div>
                      <a href={lead.contact.url} target="_blank" rel="noopener noreferrer"
                        className={`p-1.5 rounded-lg ${dark ? "bg-[#1d4ed8]/20 text-blue-400 hover:bg-[#1d4ed8]/30" : "bg-[#1A1D24] text-[#E8601C]"} transition-colors`}>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="flex items-center justify-between pt-0.5">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${dark ? "bg-[#E8601C]/10 text-[#E8601C] border border-[#E8601C]/20" : "bg-[#E8601C]/10 text-[#E8601C] border border-[#E8601C]/25"}`}>
                        Score {lead.score}
                      </span>
                      {inPipe ? <InPipelineBadge t={t} /> : <CtaButton onClick={() => addLead(lead)}><Plus className="w-3 h-3" />Add to Pipeline</CtaButton>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SUPPLY AGENT ────────────────────────────────────────────────────────────

function SupplyAgent({ t, dark, pipeline, addProject }) {
  const [filters, setFilters] = useState({ location: "Global", type: "All", registry: "Both", minQuality: 80 });
  const [leftW, setLeftW] = useState(230);
  const resizing = useRef(false);

  useEffect(() => {
    const onMove = (e) => { if (resizing.current) setLeftW(w => Math.max(160, Math.min(380, w + e.movementX))); };
    const onUp   = () => { resizing.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  const filtered = PROJECTS.filter(p => {
    if (filters.registry !== "Both" && p.registry !== filters.registry) return false;
    if (p.quality < filters.minQuality) return false;
    if (filters.type !== "All" && !p.type.includes(filters.type)) return false;
    return true;
  });

  return (
    <div className="flex flex-col h-full p-3 gap-2.5 overflow-hidden">
      <AgentStatusBar label="Scanning Verra & Gold Standard registries, evaluating market events…" t={t} />

      {/* Benchmarks */}
      <div className={`rounded-lg px-3 py-2 ${t.card} border shrink-0 flex items-center gap-3 flex-wrap`}>
        <div className="flex items-center gap-1.5 shrink-0">
          <SlidersHorizontal className={`w-3 h-3 ${t.aiAccent}`} />
          <span className={`text-xs font-bold ${t.text}`}>Benchmarks</span>
        </div>
        {[
          { label: "Location", key: "location", opts: ["Global","Africa","Latin America","Asia Pacific","MENA","Europe"] },
          { label: "Type",     key: "type",     opts: ["All","Forestry","Renewable Energy","Blue Carbon","Solar","Wind"] },
          { label: "Registry", key: "registry", opts: ["Both","Verra","Gold Standard"] },
        ].map(({ label, key, opts }) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className={`text-[10px] ${t.muted} shrink-0`}>{label}:</span>
            <select value={filters[key]} onChange={e => setFilters(f => ({...f, [key]: e.target.value}))}
              className={`${t.input} py-1 text-xs`} style={{ minWidth: 90 }}>
              {opts.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className={`text-[10px] ${t.muted} shrink-0`}>Quality ≥ <strong className={t.aiAccent}>{filters.minQuality}</strong></span>
          <input type="range" min="60" max="100" value={filters.minQuality}
            onChange={e => setFilters(f => ({...f, minQuality: Number(e.target.value)}))}
            className="w-20 accent-[#E8601C]" />
        </div>
        <span className={`text-[10px] ${t.muted} ml-auto shrink-0`}><strong className={t.verified}>{filtered.length}</strong>/{PROJECTS.length} match</span>
      </div>

      <div className="flex flex-1 gap-0 overflow-hidden rounded-2xl border" style={{ borderColor: dark ? "#252525" : "#2A2D38" }}>
        {/* Left: feed */}
        <div className="flex flex-col h-full overflow-hidden shrink-0" style={{ width: leftW }}>
          <div className={`px-3 py-2.5 border-b ${t.border} flex items-center gap-1.5 shrink-0`}>
            <Globe className={`w-3.5 h-3.5 ${t.aiAccent}`} />
            <span className={`text-xs font-bold ${t.text}`}>Registry Feed</span>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {SUPPLY_NEWS.map((n, i) => (
              <div key={i} className={`p-2.5 rounded-xl ${t.newsCard}`}>
                <div className="flex justify-between mb-1">
                  <span className={`text-[10px] font-bold ${n.tag === "Verra" ? t.verified : n.tag === "GS" ? "text-yellow-400" : t.aiAccent}`}>{n.source}</span>
                  <span className={`text-[10px] ${t.muted}`}>{n.time}</span>
                </div>
                <p className={`text-xs ${t.sub} leading-relaxed`}>{n.headline}</p>
                <span className={`inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded-full ${n.tag === "Verra" ? t.verra : n.tag === "GS" ? t.gold : t.tag}`}>{n.tag}</span>
              </div>
            ))}
          </div>
        </div>

        <ResizeHandle onMouseDown={() => { resizing.current = true; }} t={t} />

        {/* Right: projects */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <div className={`px-3 py-2.5 border-b ${t.border} flex items-center gap-2 shrink-0`}>
            <span className={`text-xs font-bold ${t.text}`}>High-Quality Projects</span>
            <span className={t.tag}>{filtered.length} found</span>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            <div className="grid grid-cols-2 gap-3">
              {filtered.map(proj => {
                const inPipe = pipeline.some(p => p.type === "supply" && p.id === proj.id);
                return (
                  <div key={proj.id} className={`rounded-2xl p-4 ${t.card} ${t.cardHov} border flex flex-col gap-2.5`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${dark ? "bg-[#E8601C]/10 text-[#E8601C]" : "bg-[#2D3C29]/25 text-[#80CBC4]"}`}>
                          <PIcon icon={proj.icon} className="w-4 h-4" />
                        </div>
                        <div>
                          <div className={`text-sm font-bold ${t.text} leading-tight`}>{proj.name}</div>
                          <div className={`text-[11px] ${t.muted}`}>{proj.subtitle}</div>
                        </div>
                      </div>
                      <QScore score={proj.quality} />
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <RegistryBadge r={proj.registry} t={t} />
                      <span className={`text-[11px] ${t.tag} flex items-center gap-1`}><MapPin className="w-3 h-3" />{proj.flag} {proj.country}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[["Credits/yr", proj.credits],["Size", proj.size],["Vintages", proj.vintages],["Price/t", proj.price]].map(([l, v]) => (
                        <div key={l} className={`rounded-lg p-2 text-center ${dark ? "bg-[#141414]" : "bg-[#1A1D24]"} border ${t.border}`}>
                          <div className={`text-[10px] ${t.muted}`}>{l}</div>
                          <div className={`text-xs font-bold ${t.text}`}>{v}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {proj.cobenefits.map(cb => (
                        <span key={cb} className={`text-[10px] px-1.5 py-0.5 rounded-full ${dark ? "bg-[#E8601C]/10 text-[#E8601C] border border-[#E8601C]/20" : "bg-[#2D3C29]/25 text-[#80CBC4] border border-[#2D3C29]/50"}`}>{cb}</span>
                      ))}
                    </div>
                    <p className={`text-xs ${t.muted} leading-relaxed`}>{proj.description}</p>
                    <div className="flex items-center justify-between pt-0.5">
                      <span className={`text-xs font-medium ${t.verified}`}>✓ Active & Verified</span>
                      {inPipe ? <InPipelineBadge t={t} /> : <CtaButton onClick={() => addProject(proj)}><Plus className="w-3 h-3" />Add to Pipeline</CtaButton>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MATCHMAKING ─────────────────────────────────────────────────────────────

function Matchmaking({ t, dark, pipeline, addLead, addProject }) {
  const [minScore, setMinScore] = useState(80);
  const visible = MATCHES.filter(m => m.score >= minScore).sort((a,b) => b.score - a.score);
  const bothIn = (m) => pipeline.some(p => p.type==="demand"&&p.id===m.demandId) && pipeline.some(p => p.type==="supply"&&p.id===m.supplyId);

  return (
    <div className="flex flex-col h-full p-3 gap-2.5 overflow-hidden">
      <AgentStatusBar label="Cross-referencing demand profiles with supply projects…" t={t} />
      <div className={`flex items-center gap-3 px-3 py-2 rounded-lg ${t.card} border shrink-0`}>
        <Sparkles className={`w-3.5 h-3.5 ${t.aiAccent} shrink-0`} />
        <span className={`text-xs font-semibold ${t.text}`}>Threshold:</span>
        <input type="range" min="60" max="98" value={minScore} onChange={e => setMinScore(Number(e.target.value))} className="w-28 accent-[#E8601C]" />
        <span className={`text-xs font-black px-2 py-0.5 rounded-lg ${dark ? "bg-[#E8601C]/10 text-[#E8601C]" : "bg-[#E8601C]/10 text-[#E8601C]"}`}>{minScore}%</span>
        <span className={`text-xs ${t.muted}`}>{visible.length} match{visible.length!==1?"es":""}</span>
      </div>

      <div className="grid grid-cols-[1fr_80px_1fr] gap-3 px-1 shrink-0">
        <div className={`text-[10px] font-bold ${t.muted} uppercase tracking-widest text-center`}>Demand — Buyer</div>
        <div />
        <div className={`text-[10px] font-bold ${t.muted} uppercase tracking-widest text-center`}>Supply — Project</div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {visible.map(m => {
          const lead = LEADS.find(l => l.id === m.demandId);
          const proj = PROJECTS.find(p => p.id === m.supplyId);
          const done = bothIn(m);
          return (
            <div key={m.id} className={`rounded-2xl p-4 ${t.card} ${t.cardHov} border`}>
              <div className="grid grid-cols-[1fr_80px_1fr] gap-3 items-center mb-3">
                <div className={`rounded-xl p-3 ${t.matchPanel} border`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span>{lead.flag}</span>
                    <div className="flex-1 min-w-0"><div className={`text-sm font-bold ${t.text}`}>{lead.company}</div><div className={`text-xs ${t.muted}`}>{lead.industry}</div></div>
                    <WarmthBadge w={lead.warmth} t={t} />
                  </div>
                  <div className={`text-xs ${t.sub} space-y-0.5`}>
                    <div><span className={t.muted}>Needs: </span><span className={`font-bold ${t.verified}`}>{lead.need}</span></div>
                    <div><span className={t.muted}>ESG: </span><span className="font-semibold">{lead.esg}/100</span></div>
                  </div>
                  <div className={`mt-2 flex items-center gap-1.5 text-xs ${t.muted}`}>
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#E8601C] to-[#A84232] flex items-center justify-center text-[8px] font-bold text-white shrink-0">
                      {lead.contact.name.split(" ").map(n=>n[0]).join("")}
                    </div>
                    <span className="truncate">{lead.contact.name}</span>
                    <a href={lead.contact.url} target="_blank" rel="noopener noreferrer" className={dark ? "text-blue-400" : "text-[#E8601C]"}><ExternalLink className="w-3 h-3" /></a>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <AiMatchScore score={m.score} />
                  <ArrowRight className={`w-4 h-4 ${t.aiAccent}`} />
                </div>
                <div className={`rounded-xl p-3 ${t.matchPanel} border`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${dark ? "bg-[#E8601C]/10 text-[#E8601C]" : "bg-[#2D3C29]/25 text-[#80CBC4]"}`}>
                      <PIcon icon={proj.icon} className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0"><div className={`text-sm font-bold ${t.text}`}>{proj.name}</div><div className={`text-xs ${t.muted}`}>{proj.flag} {proj.country}</div></div>
                    <RegistryBadge r={proj.registry} t={t} />
                  </div>
                  <div className={`text-xs ${t.sub} space-y-0.5`}>
                    <div><span className={t.muted}>Supply: </span><span className={`font-bold ${t.verified}`}>{proj.credits}</span></div>
                    <div><span className={t.muted}>Price: </span><span>{proj.price}/t</span></div>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5"><QScore score={proj.quality} /><span className={`text-xs ${t.muted}`}>Quality</span></div>
                </div>
              </div>
              <div className={`rounded-xl px-3 py-2.5 mb-3 ${t.aiSection} border`}>
                <span className={`text-[10px] font-bold uppercase tracking-wide ${t.aiAccent}`}>Agent Reasoning </span>
                <span className={`text-xs ${t.sub}`}>{m.reason}</span>
              </div>
              <div className="flex justify-end">
                {done ? <InPipelineBadge t={t} /> : (
                  <CtaButton onClick={() => { addLead(lead); addProject(proj); }} className="text-sm px-4 py-2">
                    <Plus className="w-4 h-4" />Add Match to Pipeline
                  </CtaButton>
                )}
              </div>
            </div>
          );
        })}
        {visible.length === 0 && (
          <div className={`text-center py-16 ${t.muted} text-sm`}>No matches above {minScore}%. Lower the threshold to see more.</div>
        )}
      </div>
    </div>
  );
}

// ─── AGENT HUB (Combined View) ───────────────────────────────────────────────

// ─── OPPORTUNITIES TAB ───────────────────────────────────────────────────────
const OPP_BASE = [
  { id:1,  name:"Amazonia Resurrect",    type:"Reforestation",      quality:93, matches:["Microsoft","Amazon"],          agent:"STRONG BUY",  agentCol:"#E8601C", icon:"🌿" },
  { id:2,  name:"Nordic DAC Hub",        type:"Direct Air Capture", quality:86, matches:["Shell PLC","BP PLC"],          agent:"WATCH",       agentCol:"#A84232", icon:"⚡" },
  { id:3,  name:"BlueOcean Kelp",        type:"Blue Carbon",        quality:92, matches:["Unilever","Microsoft"],        agent:"STRONG BUY",  agentCol:"#E8601C", icon:"🌊" },
  { id:4,  name:"Sahara Solar Offset",   type:"Renewable",          quality:71, matches:["BP PLC"],                     agent:"NEUTRAL",     agentCol:"rgba(255,255,255,0.40)", icon:"☀️" },
  { id:5,  name:"Congo Basin Guard",     type:"Conservation",       quality:89, matches:["Amazon","Apple Inc"],         agent:"BUY",         agentCol:"#E8601C", icon:"🌲" },
  { id:6,  name:"Bayer Biochar V3",      type:"Industrial Sink",    quality:80, matches:["Shell PLC","Unilever"],       agent:"ACCUMULATE",  agentCol:"#A84232", icon:"🏭" },
  { id:7,  name:"Patagonia Wind Farm",   type:"Renewable Energy",   quality:85, matches:["BP PLC","Amazon"],            agent:"BUY",         agentCol:"#E8601C", icon:"💨" },
  { id:8,  name:"Midwest Regenerative",  type:"Soil Carbon",        quality:88, matches:["Microsoft","Unilever"],       agent:"STRONG BUY",  agentCol:"#E8601C", icon:"🌾" },
  { id:9,  name:"Indo Peatland Lock",    type:"Conservation",       quality:74, matches:["Shell PLC"],                  agent:"UNDER REVIEW",agentCol:"#E8601C", icon:"🌿" },
  { id:10, name:"Mangrove Guard X",      type:"Coastal Protection", quality:91, matches:["Amazon","Apple Inc","BP PLC"],agent:"STRONG BUY",  agentCol:"#E8601C", icon:"🌴" },
  { id:11, name:"Icelandic Geothermal",  type:"Energy Efficiency",  quality:83, matches:["Microsoft"],                  agent:"WATCH",       agentCol:"#A84232", icon:"♨️" },
  { id:12, name:"Urban Methane Capture", type:"Industrial Waste",   quality:80, matches:["Shell PLC","BP PLC"],         agent:"BUY",         agentCol:"#E8601C", icon:"🏙" },
];

// ─── PROJECT EXTRA DETAILS ───────────────────────────────────────────────────
const PROJECT_EXTRAS = {
  1:  { code:"AMZ-RF-2024-X",  location:"Amazonas, Brazil",       vintage:"2022–2025", credits:"320,000 tCO₂e", biodiversity:"9.4/10", registry:"Verra",       status:"Verified",   imgGrad:"linear-gradient(160deg,#1a2f18 0%,#2d4a22 50%,#152910 100%)", bidders:14, summary:"This strategic reforestation initiative rehabilitates 45,000 hectares of degraded Amazonian land using AI-driven seed dispersal and real-time Sentinel-2 satellite monitoring to ensure maximum carbon sequestration efficacy." },
  2:  { code:"NDC-DAC-2024-B",  location:"Tromsø, Norway",         vintage:"2023–2028", credits:"85,000 tCO₂e",  biodiversity:"6.1/10", registry:"Gold Standard",status:"Verified",   imgGrad:"linear-gradient(160deg,#0d1a2e 0%,#1a2e40 50%,#0a1520 100%)", bidders:6,  summary:"Direct air capture facility powered by 100% renewable geothermal energy. Module-3 phase now operational, targeting 85K tCO₂e annually with mechanical removal verified by third-party auditors." },
  3:  { code:"BOK-BC-2023-K",   location:"North Sea / Kelp Belt",  vintage:"2023–2030", credits:"210,000 tCO₂e", biodiversity:"8.8/10", registry:"Verra",       status:"Verified",   imgGrad:"linear-gradient(160deg,#0a1e2a 0%,#0d2d38 50%,#081520 100%)", bidders:11, summary:"Open-ocean kelp cultivation sequestering carbon as deep-sinking biomass. Dual benefit: ocean carbon sink and marine ecosystem restoration across 12,000 km² of North Atlantic kelp belt." },
  4:  { code:"SSO-RN-2024-M",   location:"Sahara, Morocco/Tunisia",vintage:"2024–2031", credits:"140,000 tCO₂e", biodiversity:"4.2/10", registry:"Gold Standard",status:"Pending",    imgGrad:"linear-gradient(160deg,#2a1e0a 0%,#3a2a10 50%,#1a1205 100%)", bidders:3,  summary:"Utility-scale solar offsetting fossil generation across North African grid. Additionality verified under Grid Emission Factor methodology, with 2,400 local construction jobs created." },
  5:  { code:"CBG-CS-2023-D",   location:"Congo Basin, DRC",        vintage:"2022–2032", credits:"480,000 tCO₂e", biodiversity:"9.8/10", registry:"Verra",       status:"Verified",   imgGrad:"linear-gradient(160deg,#0f2010 0%,#1a3518 50%,#0a1a0a 100%)", bidders:19, summary:"Conservation of 320,000 hectares of the world's second-largest tropical rainforest. Indigenous community co-management model with FPIC protocols and biodiversity corridor connectivity." },
  6:  { code:"BBV3-IS-2024-G",  location:"Leverkusen, Germany",     vintage:"2024–2029", credits:"95,000 tCO₂e",  biodiversity:"3.5/10", registry:"Gold Standard",status:"Verified",   imgGrad:"linear-gradient(160deg,#1a1410 0%,#2a2018 50%,#110e0a 100%)", bidders:5,  summary:"Industrial-scale biochar produced from agricultural waste, permanently sequestering carbon in soil amendment. Enhances soil fertility and water retention as co-benefits." },
  7:  { code:"PWF-RE-2024-P",   location:"Patagonia, Argentina",    vintage:"2023–2033", credits:"195,000 tCO₂e", biodiversity:"7.2/10", registry:"Gold Standard",status:"Verified",   imgGrad:"linear-gradient(160deg,#0e1a28 0%,#1a2a3a 50%,#091220 100%)", bidders:8,  summary:"Offshore wind farm harnessing the world's most consistent wind resource. Direct displacement of Argentine coal generation with annual displacement factor validated at 0.48 tCO₂e/MWh." },
  8:  { code:"MRG-SC-2024-I",   location:"Iowa & Kansas, USA",      vintage:"2023–2028", credits:"175,000 tCO₂e", biodiversity:"7.6/10", registry:"Verra",       status:"Verified",   imgGrad:"linear-gradient(160deg,#1e1a08 0%,#2e2a10 50%,#141205 100%)", bidders:9,  summary:"Regenerative agriculture across 85,000 acres of Midwest cropland. Transition from conventional tillage increases soil organic carbon. MRV via remote sensing and soil sampling grid." },
  9:  { code:"IPL-CS-2023-S",   location:"Kalimantan, Indonesia",   vintage:"2021–2031", credits:"110,000 tCO₂e", biodiversity:"8.3/10", registry:"Verra",       status:"Under Review",imgGrad:"linear-gradient(160deg,#0e1e14 0%,#182e20 50%,#0a1810 100%)", bidders:4,  summary:"Peatland restoration and rewetting across 42,000 hectares of degraded peat dome. Prevents fire-risk oxidation. Currently under additional additionality review following methodology update." },
  10: { code:"MGX-CP-2024-B",   location:"Sundarbans, Bangladesh",  vintage:"2023–2033", credits:"290,000 tCO₂e", biodiversity:"9.6/10", registry:"Verra",       status:"Verified",   imgGrad:"linear-gradient(160deg,#0a1e18 0%,#143028 50%,#081810 100%)", bidders:21, summary:"Largest mangrove restoration project in the Bay of Bengal. Coastal protection for 2.1M people, plus nursery habitat for 400+ marine species. Blue carbon methodology VM0033." },
  11: { code:"IGT-EE-2024-I",   location:"Reykjavik, Iceland",      vintage:"2024–2030", credits:"60,000 tCO₂e",  biodiversity:"5.8/10", registry:"Gold Standard",status:"Verified",   imgGrad:"linear-gradient(160deg,#181820 0%,#282838 50%,#101018 100%)", bidders:3,  summary:"Geothermal district heating displacing oil-fired boilers across Reykjavik urban core. Near-zero operational carbon with basalt mineralization for permanent geological sequestration." },
  12: { code:"UMC-IW-2024-U",   location:"São Paulo, Brazil",       vintage:"2023–2028", credits:"120,000 tCO₂e", biodiversity:"4.0/10", registry:"Gold Standard",status:"Verified",   imgGrad:"linear-gradient(160deg,#181414 0%,#281e1e 50%,#100e0e 100%)", bidders:7,  summary:"Urban landfill methane capture and combustion across 6 São Paulo municipal sites. Converts potent GHG (28x CO₂-eq) into grid electricity, with co-benefit of local air quality improvement." },
};

const INTEL_FEED_TEMPLATES = [
  { tag:"REAL-TIME VERIFICATION", tagCol:"#E8601C", items:[
    { title:"New satellite imagery processed", desc:"via Sentinel-2. Forest canopy density increased by 1.2% in Plot Sector B.", badges:["Verified","Alpha Signal"] },
    { title:"Additionality re-confirmed", desc:"Third-party auditor completed site visit. No baseline deviation detected.", badges:["Verified"] },
    { title:"Carbon accounting updated", desc:"Q3 sequestration measurement 2.4% above projection. Surplus credits issued.", badges:["Alpha Signal"] },
  ]},
  { tag:"CORPORATE UPDATE", tagCol:"rgba(255,255,255,0.40)", items:[
    { title:"ESG goals updated", desc:"Matching confidence increased by 4% following new sustainability mandate filing.", badges:["Structural Match"] },
    { title:"Budget cycle confirmed", desc:"Carbon procurement team confirmed Q4 budget allocation for offset purchases.", badges:["High Intent"] },
    { title:"Procurement RFP circulated", desc:"Internal RFP sent to 3 brokers. Qatalyst match score exceeds minimum threshold.", badges:["Structural Match"] },
  ]},
  { tag:"REGISTRY SYNC", tagCol:"rgba(255,255,255,0.40)", items:[
    { title:"Registry confirmed tokenization eligibility", desc:"Project vintage 2023 cleared for digital issuance on verified blockchain.", badges:["Regulatory"] },
    { title:"Serial number batch issued", desc:"VCU serial range 0042-8812 to 0042-9107 now active in registry.", badges:["Regulatory"] },
  ]},
  { tag:"MARKET SENTIMENT", tagCol:"rgba(255,255,255,0.40)", items:[
    { title:"Institutional interest surged +15%", desc:"Following COP30 briefing, nature-based solution demand forecasts revised upward.", badges:["Macro"] },
    { title:"Analyst upgrade: STRONG BUY", desc:"Carbon desk at Bloomberg upgraded nature-based credits citing supply shortage through 2026.", badges:["Macro","Alpha Signal"] },
  ]},
];

function buildIntelFeed(opp, extra) {
  const ts = ["08:42 AM","09:15 AM","Yesterday","Oct 24","Oct 22","Oct 20"];
  return [
    { ts: ts[0], ...INTEL_FEED_TEMPLATES[0].items[Math.floor(Math.random()*3)], tag: "REAL-TIME VERIFICATION", tagCol:"#E8601C"  },
    { ts: ts[1], ...INTEL_FEED_TEMPLATES[1].items[Math.floor(Math.random()*3)], tag: `${opp.matches[0]?.toUpperCase() || "CORPORATE"} UPDATE`, tagCol:"rgba(255,255,255,0.40)" },
    { ts: ts[3], ...INTEL_FEED_TEMPLATES[2].items[Math.floor(Math.random()*2)], tag: "REGISTRY SYNC",         tagCol:"rgba(255,255,255,0.40)" },
    { ts: ts[4], ...INTEL_FEED_TEMPLATES[3].items[Math.floor(Math.random()*2)], tag: "MARKET SENTIMENT",      tagCol:"rgba(255,255,255,0.40)" },
    { ts: ts[5], title:"Supply constraint alert", desc:`Available ${opp.type} credits down 18% QoQ — scarcity premium expected.`, badges:["Supply Risk"], tag:"SUPPLY SIGNAL", tagCol:"#A84232" },
  ];
}

const CORP_TIERS = { 0:"TIER 1 MATCH", 1:"TIER 2 MATCH", 2:"TIER 3 MATCH" };
const CORP_SCORES = { "Microsoft":98.4,"Amazon":95.1,"Shell PLC":89.2,"BP PLC":82.1,"Unilever":91.7,"Apple Inc":87.3 };
const CORP_MANDATE = {
  "Microsoft": "Required transition to Net Zero 2030 focusing on high-integrity nature-based solutions for Scope 1-3 offset.",
  "Amazon":    "Climate Pledge signatory — net zero by 2040. Prioritises REDD+ and Blue Carbon with verified additionality.",
  "Shell PLC": "Net Zero by 2050. Nature-based solutions strategy mandates Verra-certified projects with co-benefit scoring.",
  "BP PLC":    "Active offset programme despite capex cuts. Prefers Gold Standard projects with SDG-aligned impact metrics.",
  "Unilever":  "SBTi-validated 2039 net zero target. CTAP 2025 mandates high-permanence removals and nature-based solutions.",
  "Apple Inc": "Carbon Neutral by 2030. Uses credits only as last resort — high quality threshold of 90+ quality score required.",
};
const CORP_HOLDING = {
  "Microsoft":{current:"12k",target:"80k"},"Amazon":{current:"45k",target:"150k"},
  "Shell PLC":{current:"2.1M",target:"8M"},"BP PLC":{current:"800k",target:"4M"},
  "Unilever":{current:"180k",target:"600k"},"Apple Inc":{current:"220k",target:"400k"},
};

function ConfidenceArcBig({ score }) {
  const S=64, sw=5, r=(S-sw*2)/2, full=2*Math.PI*r, arc=full*0.75, fill=(score/100)*arc;
  const col = score>=90?"#E8601C":score>=80?"#A84232":"#7A2820";
  return (
    <div style={{position:"relative",width:S,height:S,flexShrink:0}}>
      <svg width={S} height={S} style={{transform:"rotate(135deg)",display:"block"}}>
        <circle cx={S/2} cy={S/2} r={r} fill="none" stroke={col+"28"} strokeWidth={sw} strokeDasharray={`${arc} ${full}`} strokeLinecap="round"/>
        <circle cx={S/2} cy={S/2} r={r} fill="none" stroke={col} strokeWidth={sw} strokeDasharray={`${fill} ${full}`} strokeLinecap="round"/>
      </svg>
      <span style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",color:col,fontSize:11,fontWeight:800,lineHeight:1}}>{score}%</span>
    </div>
  );
}

function ProjectDetailPage({ opp, pipeline, addProject, onBack }) {
  const extra = PROJECT_EXTRAS[opp.id] || PROJECT_EXTRAS[1];
  const inPipe = pipeline.some(p => p.type==="supply" && p.id===opp.id);
  const [expandedCorp, setExpandedCorp] = useState(0);
  const intelFeed = useState(() => buildIntelFeed(opp, extra))[0];

  // Look up LEADS for each match
  const corpCards = opp.matches.map((name, idx) => {
    const lead = LEADS.find(l => l.company === name) || { company:name, industry:"Carbon Markets", need:"1–5M credits/yr", commitment:"Net Zero 2040" };
    const score = CORP_SCORES[name] || (85 + Math.random()*10).toFixed(1);
    const mandate = CORP_MANDATE[name] || `${name} has committed to net zero with mandatory carbon offset procurement.`;
    const holding = CORP_HOLDING[name] || { current:"50k", target:"200k" };
    const holdPct  = Math.min(95, Math.round((parseInt(holding.current) / parseInt(holding.target)) * 100)) || 15;
    return { name, lead, score, mandate, holding, holdPct, tier: CORP_TIERS[idx] || "TIER 3 MATCH" };
  });

  return (
    <div style={{flex:1, display:"flex", flexDirection:"column", background:"var(--c-bg3)", fontFamily:"'Inter',system-ui,sans-serif", overflow:"hidden", minHeight:0}}>
      {/* ── Top header ── */}
      <div style={{padding:"18px 24px 14px", borderBottom:"1px solid #1e2530", background:"#0e1218", flexShrink:0}}>
        {/* Priority badge + back */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <button onClick={onBack} style={{
            display:"flex",alignItems:"center",gap:5,
            fontSize:10,fontFamily:"monospace",color:"var(--c-muted)",
            background:"none",border:"none",cursor:"pointer",padding:0,letterSpacing:"0.08em",
          }}>← BACK</button>
          <span style={{color:"var(--c-muted)"}}>|</span>
          <span style={{
            fontSize:9,fontWeight:800,padding:"3px 8px",borderRadius:3,
            background:"rgba(232,96,28,0.18)",color:"#E8601C",
            border:"1px solid rgba(232,96,28,0.35)",letterSpacing:"0.14em",
          }}>PRIORITY ALPHA</span>
          <span style={{fontSize:10,fontFamily:"monospace",color:"rgba(255,255,255,0.30)",letterSpacing:"0.1em"}}>ID: {extra.code}</span>
        </div>

        {/* Title row */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:16}}>
          <div>
            <h1 style={{color:"var(--c-text)",fontWeight:900,fontSize:26,margin:"0 0 6px",letterSpacing:"-0.01em"}}>{opp.name}</h1>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{fontSize:13,color:"#E8601C"}}>◈</span>
              <span style={{fontSize:12,color:"var(--c-sub)"}}>Matched Corporates: </span>
              {opp.matches.map((m,i) => (
                <span key={m} style={{fontSize:12,color:"#E8601C",fontWeight:600}}>
                  {m}{i < opp.matches.length-1 ? "," : ""}
                </span>
              ))}
            </div>
          </div>
          <div style={{display:"flex",gap:10,flexShrink:0,marginTop:4}}>
            <button style={{
              padding:"9px 18px",borderRadius:4,fontSize:11,fontWeight:700,
              letterSpacing:"0.1em",cursor:"pointer",
              background:"transparent",color:"var(--c-sub)",
              border:"1px solid rgba(255,255,255,0.18)",
              fontFamily:"monospace",transition:"all 0.15s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.40)";e.currentTarget.style.color="white";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.18)";e.currentTarget.style.color="rgba(255,255,255,0.55)";}}>
              DOWNLOAD REPORT
            </button>
            {inPipe ? (
              <span style={{
                display:"inline-flex",alignItems:"center",gap:6,padding:"9px 18px",borderRadius:4,
                fontSize:11,fontWeight:700,letterSpacing:"0.1em",
                background:"rgba(45,60,41,0.35)",color:"#80CBC4",
                border:"1px solid rgba(45,60,41,0.70)",fontFamily:"monospace",
              }}>✓ IN PIPELINE</span>
            ) : (
              <button onClick={() => addProject && addProject({...opp,type:"supply",stage:"Prospect"})} style={{
                display:"inline-flex",alignItems:"center",gap:8,
                padding:"9px 18px",borderRadius:4,fontSize:11,fontWeight:700,
                letterSpacing:"0.1em",cursor:"pointer",
                background:"#E8601C",color:"var(--c-text)",border:"none",
                fontFamily:"monospace",boxShadow:"0 2px 16px rgba(232,96,28,0.40)",
                transition:"all 0.15s",
              }}
              onMouseEnter={e=>{e.currentTarget.style.background="#D04D0A";}}
              onMouseLeave={e=>{e.currentTarget.style.background="#E8601C";}}>
                ADD TO PIPELINE →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Body: left content + right sidebar ── */}
      <div style={{flex:1, display:"flex", minHeight:0, overflow:"hidden"}}>

        {/* ═══ LEFT CONTENT ═══ */}
        <div style={{flex:1, overflowY:"auto", padding:"20px 24px"}}>

          {/* Project image + metadata row */}
          <div style={{display:"grid",gridTemplateColumns:"260px 1fr",gap:20,marginBottom:20}}>

            {/* Project image card */}
            <div style={{borderRadius:8,overflow:"hidden",position:"relative",height:180,background:extra.imgGrad,border:"1px solid #1e2530",flexShrink:0}}>
              {/* Forest texture overlay */}
              <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.03) 1px,transparent 1px)",backgroundSize:"18px 18px"}} />
              {/* location badge */}
              <div style={{
                position:"absolute",bottom:10,left:10,
                display:"flex",alignItems:"center",gap:5,
                padding:"4px 10px",borderRadius:3,
                background:"rgba(0,0,0,0.65)",border:"1px solid rgba(255,255,255,0.10)",
              }}>
                <MapPin style={{width:10,height:10,color:"#E8601C",flexShrink:0}}/>
                <span style={{color:"var(--c-text)",fontSize:9,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",fontFamily:"monospace"}}>{extra.location}</span>
              </div>
              {/* status pills */}
              <div style={{position:"absolute",top:10,left:10,display:"flex",gap:6,flexWrap:"wrap"}}>
                {[
                  {k:"STATUS",v:extra.status},
                  {k:"REGISTRY",v:extra.registry},
                  {k:"TYPE",v:opp.type.toUpperCase()},
                ].map(({k,v})=>(
                  <div key={k} style={{background:"rgba(0,0,0,0.70)",border:"1px solid rgba(232,96,28,0.20)",borderRadius:3,padding:"3px 7px",backdropFilter:"blur(4px)"}}>
                    <div style={{color:"rgba(255,255,255,0.30)",fontSize:7,fontFamily:"monospace",letterSpacing:"0.1em"}}>{k}</div>
                    <div style={{color:"var(--c-text)",fontSize:9,fontWeight:700,letterSpacing:"0.05em"}}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Operational Summary + metrics */}
            <div>
              <div style={{color:"rgba(255,255,255,0.30)",fontSize:9,fontFamily:"monospace",letterSpacing:"0.14em",marginBottom:8}}>OPERATIONAL SUMMARY</div>
              <p style={{color:"rgba(255,255,255,0.80)",fontSize:12,lineHeight:1.7,margin:"0 0 16px"}}>{extra.summary}</p>

              {/* Metric rows */}
              {[
                {k:"VINTAGE",             v:extra.vintage},
                {k:"EST. ANNUAL CREDITS", v:extra.credits},
                {k:"BIODIVERSITY INDEX",  v:extra.biodiversity},
                {k:"MATCH SCORE",         v:`${opp.quality}/100`},
              ].map(({k,v})=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:"1px solid #1a2028"}}>
                  <span style={{color:"rgba(255,255,255,0.30)",fontSize:10,fontFamily:"monospace",letterSpacing:"0.1em"}}>{k}</span>
                  <span style={{color:"var(--c-text)",fontSize:12,fontWeight:700,fontFamily:"monospace"}}>{v}</span>
                </div>
              ))}

              {/* Bidders */}
              <div style={{display:"flex",alignItems:"center",gap:10,marginTop:12}}>
                <div style={{display:"flex"}}>
                  {Array.from({length:3}).map((_,i)=>(
                    <div key={i} style={{
                      width:24,height:24,borderRadius:"50%",border:"2px solid #13171c",
                      background:`hsl(${20+i*35},60%,35%)`,marginLeft: i?-6:0,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:8,fontWeight:700,color:"var(--c-text)",
                    }}>{["GL","NE","MS"][i]}</div>
                  ))}
                  <div style={{
                    width:24,height:24,borderRadius:"50%",border:"2px solid #13171c",
                    background:"#E8601C",marginLeft:-6,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:8,fontWeight:700,color:"var(--c-text)",
                  }}>+{extra.bidders}</div>
                </div>
                <span style={{color:"var(--c-muted)",fontSize:10,letterSpacing:"0.06em",fontFamily:"monospace"}}>ACTIVE INSTITUTIONAL BIDDERS</span>
              </div>
            </div>
          </div>

          {/* ── Corporate Alignment ── */}
          <div style={{marginTop:4}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{color:"#E8601C",fontSize:16}}>⁂</span>
                <span style={{color:"var(--c-text)",fontWeight:800,fontSize:16}}>Corporate Alignment</span>
              </div>
              <span style={{fontSize:9,fontFamily:"monospace",letterSpacing:"0.12em",color:"var(--c-muted)"}}>MATCHING ENGINE ACTIVE</span>
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {corpCards.map((corp, ci) => {
                const isOpen = expandedCorp === ci;
                return (
                  <div key={corp.name}
                    style={{
                      borderRadius:6,overflow:"hidden",
                      border:`1px solid ${isOpen?"rgba(232,96,28,0.45)":"#1e2530"}`,
                      background: isOpen?"#1a1410":"#151a20",
                      borderLeft:`3px solid ${isOpen?"#E8601C":"#2A2D38"}`,
                      transition:"all 0.2s",
                    }}>
                    {/* Card header */}
                    <div style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",cursor:"pointer"}}
                      onClick={()=>setExpandedCorp(isOpen?-1:ci)}>
                      <div style={{
                        width:38,height:38,borderRadius:6,flexShrink:0,
                        background:"rgba(232,96,28,0.10)",border:"1px solid rgba(232,96,28,0.20)",
                        display:"flex",alignItems:"center",justifyContent:"center",
                        color:"#E8601C",fontSize:16,
                      }}>
                        {corp.name==="Microsoft"?"⊞":corp.name==="Amazon"?"◈":corp.name==="Apple Inc"?"◉":corp.name.includes("Shell")?"⬡":corp.name.includes("BP")?"⚡":"▣"}
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{color:"var(--c-text)",fontWeight:700,fontSize:13,marginBottom:2}}>{corp.name}</div>
                        <div style={{color:"rgba(255,255,255,0.30)",fontSize:9,fontFamily:"monospace",letterSpacing:"0.08em"}}>
                          {corp.lead.industry?.toUpperCase() || "CORPORATE"} · {corp.tier}
                        </div>
                      </div>
                      <div style={{textAlign:"right",flexShrink:0}}>
                        <div style={{color:"rgba(255,255,255,0.30)",fontSize:8,fontFamily:"monospace",letterSpacing:"0.1em",marginBottom:4}}>CONFIDENCE SCORE</div>
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <ConfidenceArcBig score={corp.score} />
                          <ChevronDown style={{width:14,height:14,color:"rgba(255,255,255,0.30)",transform:isOpen?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s"}}/>
                        </div>
                      </div>
                    </div>

                    {/* Expanded body */}
                    {isOpen && (
                      <div style={{padding:"0 16px 16px",borderTop:"1px solid rgba(232,96,28,0.15)"}}>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,paddingTop:14}}>
                          {/* Sustainability Mandate */}
                          <div>
                            <div style={{color:"rgba(255,255,255,0.30)",fontSize:8,fontFamily:"monospace",letterSpacing:"0.12em",marginBottom:7}}>SUSTAINABILITY MANDATE</div>
                            <p style={{color:"var(--c-sub)",fontSize:11,lineHeight:1.65,margin:0}}>{corp.mandate}</p>
                          </div>
                          {/* Demand Profile */}
                          <div>
                            <div style={{color:"rgba(255,255,255,0.30)",fontSize:8,fontFamily:"monospace",letterSpacing:"0.12em",marginBottom:7}}>DEMAND PROFILE</div>
                            <div style={{height:6,borderRadius:3,background:"#1e2530",marginBottom:6,overflow:"hidden"}}>
                              <div style={{height:"100%",borderRadius:3,width:`${corp.holdPct}%`,background:"linear-gradient(90deg,#A84232,#E8601C)",transition:"width 0.6s"}}/>
                            </div>
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                              <span style={{color:"var(--c-muted)",fontSize:9,fontFamily:"monospace"}}>Current Holding: {corp.holding.current}</span>
                              <span style={{color:"var(--c-muted)",fontSize:9,fontFamily:"monospace"}}>Target: {corp.holding.target}</span>
                            </div>
                            <div style={{display:"flex",gap:8,marginTop:12}}>
                              <button style={{
                                flex:1,padding:"8px 0",borderRadius:4,fontSize:9,fontWeight:700,
                                letterSpacing:"0.1em",cursor:"pointer",fontFamily:"monospace",
                                background:"rgba(232,96,28,0.15)",color:"#E8601C",
                                border:"1px solid rgba(232,96,28,0.35)",transition:"all 0.15s",
                              }}
                              onMouseEnter={e=>{e.currentTarget.style.background="rgba(232,96,28,0.28)";}}
                              onMouseLeave={e=>{e.currentTarget.style.background="rgba(232,96,28,0.15)";}}>
                                DIRECT ENGAGEMENT
                              </button>
                              <button style={{
                                flex:1,padding:"8px 0",borderRadius:4,fontSize:9,fontWeight:700,
                                letterSpacing:"0.1em",cursor:"pointer",fontFamily:"monospace",
                                background:"rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.50)",
                                border:"1px solid rgba(255,255,255,0.12)",transition:"all 0.15s",
                              }}
                              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.10)";e.currentTarget.style.color="white";}}
                              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.05)";e.currentTarget.style.color="rgba(255,255,255,0.50)";}}>
                                VIEW AUDIT TRAIL
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ═══ RIGHT SIDEBAR — Intelligence Feed ═══ */}
        <div style={{width:300,flexShrink:0,borderLeft:"1px solid #1e2530",background:"#0e1218",display:"flex",flexDirection:"column",overflow:"hidden"}}>
          {/* Header */}
          <div style={{padding:"16px 16px 12px",borderBottom:"1px solid #1e2530",flexShrink:0,display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:22,height:22,borderRadius:5,background:"rgba(232,96,28,0.10)",border:"1px solid rgba(232,96,28,0.25)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Activity style={{width:11,height:11,color:"#E8601C"}}/>
            </div>
            <span style={{color:"rgba(255,255,255,0.85)",fontWeight:700,fontSize:12,letterSpacing:"0.08em"}}>INTELLIGENCE FEED</span>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#E8601C",marginLeft:"auto",boxShadow:"0 0 6px #E8601C",flexShrink:0}}/>
          </div>

          {/* Feed items */}
          <div style={{flex:1,overflowY:"auto"}}>
            {intelFeed.map((item, i) => (
              <div key={i} style={{
                padding:"14px 16px",
                borderBottom:"1px solid #141a20",
                borderLeft:`2px solid ${i===0?"#E8601C":"transparent"}`,
                background: i===0?"rgba(232,96,28,0.04)":"transparent",
                cursor:"pointer",transition:"background 0.2s",
              }}
              onMouseEnter={e=>{ if(i!==0) e.currentTarget.style.background="rgba(255,255,255,0.025)"; }}
              onMouseLeave={e=>{ if(i!==0) e.currentTarget.style.background="transparent"; }}>
                <div style={{color:item.tagCol,fontSize:8,fontFamily:"monospace",letterSpacing:"0.14em",marginBottom:6}}>
                  {item.ts} · {item.tag}
                </div>
                <div style={{color:"rgba(255,255,255,0.80)",fontWeight:700,fontSize:11,lineHeight:1.4,marginBottom:5}}>
                  {item.title}
                </div>
                <div style={{color:"var(--c-muted)",fontSize:10,lineHeight:1.5,marginBottom:8}}>
                  {item.desc}
                </div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                  {item.badges?.map(b=>(
                    <span key={b} style={{
                      fontSize:8,fontWeight:600,padding:"2px 7px",borderRadius:3,
                      background:"rgba(255,255,255,0.06)",color:"rgba(255,255,255,0.40)",
                      border:"1px solid rgba(255,255,255,0.10)",letterSpacing:"0.06em",
                    }}>{b}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{padding:"12px 16px",borderTop:"1px solid #1e2530",flexShrink:0}}>
            <button style={{
              width:"100%",padding:"9px",borderRadius:4,
              fontSize:9,fontWeight:700,letterSpacing:"0.12em",cursor:"pointer",
              background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.40)",
              border:"1px solid rgba(255,255,255,0.10)",fontFamily:"monospace",
              display:"flex",alignItems:"center",justifyContent:"center",gap:6,
              transition:"all 0.15s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.08)";e.currentTarget.style.color="rgba(255,255,255,0.65)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.color="rgba(255,255,255,0.40)";}}>
              VIEW HISTORICAL INTEL ↺
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// Arc badge — matches the image: 270° gauge arc with track, colored by score
function MatchScoreBadge({ score }) {
  const S = 40, sw = 3.2, r = (S - sw * 2) / 2;
  const full = 2 * Math.PI * r;
  const arc  = full * 0.75;            // 270° shown
  const fill = (score / 100) * arc;
  const col  = score >= 85 ? "#E8601C" : score >= 75 ? "#A84232" : "#7A2820";
  const track = col + "28";
  return (
    <div style={{ position:"relative", width:S, height:S, flexShrink:0 }}>
      <svg width={S} height={S} style={{ transform:"rotate(135deg)", display:"block" }}>
        {/* track */}
        <circle cx={S/2} cy={S/2} r={r} fill="none" stroke={track} strokeWidth={sw}
          strokeDasharray={`${arc} ${full}`} strokeLinecap="round" />
        {/* fill */}
        <circle cx={S/2} cy={S/2} r={r} fill="none" stroke={col} strokeWidth={sw}
          strokeDasharray={`${fill} ${full}`} strokeLinecap="round" />
      </svg>
      <span style={{
        position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
        color:col, fontSize:11, fontWeight:700, lineHeight:1,
      }}>{score}</span>
    </div>
  );
}

// ─── REGISTRY TABLE DATA ──────────────────────────────────────────────────────
const REGISTRY_ROWS = [
  { id:1,  name:"Fuel - Wood Saving with Improved Cookstoves in Cambodia",               registry:"Verra",        regId:"2120",   type:"Energy Demand",                              countryCode:"KH", flag:"🇰🇭", methodology:"AMS-II.G.",  article62:[{code:"JP",flag:"🇯🇵"},{code:"SG",flag:"🇸🇬"},{code:"KR",flag:"🇰🇷"}] },
  { id:2,  name:"7.3 MW Bundled Wind Power Project by Oswal Cables",                    registry:"Verra",        regId:"2126",   type:"Manufacturing industries",                   countryCode:"IN", flag:"🇮🇳", methodology:"ACM0002",    article62:[] },
  { id:3,  name:"Cancelled duplicate of VCSR218",                                       registry:"Verra",        regId:"2136",   type:"Energy industries (renewable/non-renewable)",countryCode:"CN", flag:"🇨🇳", methodology:"ACM0002",    article62:[] },
  { id:4,  name:"BAESA Project",                                                        registry:"Verra",        regId:"2157",   type:"Energy industries (renewable/non-renewable)",countryCode:"BR", flag:"🇧🇷", methodology:"ACM0002",    article62:[] },
  { id:5,  name:"2 x 3.5 MW Ullunkal Hydro Power Project in Kerala, India",             registry:"Verra",        regId:"2162",   type:"Energy industries (renewable/non-renewable)",countryCode:"IN", flag:"🇮🇳", methodology:"AMS-I.D.",   article62:[] },
  { id:6,  name:"Chongqing Youyang County Youchou Hydropower Station",                  registry:"Verra",        regId:"2166",   type:"Energy industries (renewable/non-renewable)",countryCode:"CN", flag:"🇨🇳", methodology:"ACM0002",    article62:[] },
  { id:7,  name:"Failed",                                                                registry:"Verra",        regId:"2177",   type:"Agriculture Forestry and Other Land Use",   countryCode:"MG", flag:"🇲🇬", methodology:"VM0007",     article62:[] },
  { id:8,  name:"Wind Power Project of CLP Wind Farms (India) Private Limited",         registry:"Verra",        regId:"1257",   type:"Energy industries (renewable/non-renewable)",countryCode:"IN", flag:"🇮🇳", methodology:"ACM0002",    article62:[] },
  { id:9,  name:"Reduction of deforestation and degradation in Tambopata",              registry:"Verra",        regId:"1067",   type:"Agriculture Forestry and Other Land Use",   countryCode:"PE", flag:"🇵🇪", methodology:"VM0007",     article62:[{code:"SG",flag:"🇸🇬"},{code:"KR",flag:"🇰🇷"},{code:"CH",flag:"🇨🇭"}] },
  { id:10, name:"Intrinergy Wiggins Fuel Switch from Natural Gas to Biomass for Energy", registry:"Verra",        regId:"317",    type:"Energy industries (renewable/non-renewable)",countryCode:"US", flag:"🇺🇸", methodology:"AMS-I.C.",   article62:[] },
  { id:11, name:"Amazon Rainforest REDD+ Conservation Project",                         registry:"Verra",        regId:"412",    type:"Agriculture Forestry and Other Land Use",   countryCode:"BR", flag:"🇧🇷", methodology:"VM0015",     article62:[{code:"JP",flag:"🇯🇵"},{code:"SG",flag:"🇸🇬"}] },
  { id:12, name:"Kenya Turkana Wind Energy Project",                                    registry:"Gold Standard", regId:"GS1257", type:"Energy industries (renewable/non-renewable)",countryCode:"KE", flag:"🇰🇪", methodology:"AMS-I.D.",   article62:[] },
  { id:13, name:"Indonesia Blue Carbon Mangrove Restoration",                           registry:"Verra",        regId:"980",    type:"Agriculture Forestry and Other Land Use",   countryCode:"ID", flag:"🇮🇩", methodology:"VM0033",     article62:[{code:"JP",flag:"🇯🇵"},{code:"KR",flag:"🇰🇷"}] },
  { id:14, name:"India Solar Initiative — Rural Distributed Power",                     registry:"Gold Standard", regId:"GS200",  type:"Energy industries (renewable/non-renewable)",countryCode:"IN", flag:"🇮🇳", methodology:"AMS-I.D.",   article62:[] },
  { id:15, name:"Congo Basin Forest Conservation & Community Development",               registry:"Verra",        regId:"1200",   type:"Agriculture Forestry and Other Land Use",   countryCode:"CD", flag:"🇨🇩", methodology:"VM0009",     article62:[{code:"SG",flag:"🇸🇬"}] },
];

const REG_TABS = [
  { id:"all",      label:"All Projects" },
  { id:"mine",     label:"My Projects" },
  { id:"corsia",   label:"Corsia" },
  { id:"demo",     label:"Demo" },
  { id:"jcm",      label:"JCM" },
  { id:"mongolia", label:"Mongolia" },
  { id:"rfp",      label:"RFP" },
  { id:"scb",      label:"SCB" },
  { id:"indo",     label:"Indo projects" },
  { id:"vietnam",  label:"Viet Nam SG Article 6" },
];

const REG_COLS = [
  { key:"name",        label:"Project Name",       sortable:true,  flex:"2.4fr" },
  { key:"registry",    label:"Registry Name",      sortable:true,  flex:"0.9fr" },
  { key:"regId",       label:"Registry Id",        sortable:true,  flex:"0.7fr" },
  { key:"type",        label:"Project Type",       sortable:true,  flex:"1.7fr" },
  { key:"country",     label:"Country",            sortable:true,  flex:"0.65fr"},
  { key:"methodology", label:"Methodology",        sortable:true,  flex:"0.9fr" },
  { key:"article62",   label:"Article 6.2 MOU/IA", sortable:false, flex:"1.3fr" },
  { key:"carbonTax",   label:"Carbon Tax",         sortable:false, flex:"0.7fr" },
];

// legacy stub — kept so ProjectDetailPage still resolves
function OpportunitiesTab({ pipeline = [], addProject, scannerRunning = false, dark = true }) {
  const [rows, setRows]           = useState(() => OPP_BASE.map(r => ({ ...r })));
  const [flashes, setFlashes]     = useState({});
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [visibleCount, setVisibleCount] = useState(0);

  // Score-bump live updates — only when scanner running and all rows loaded
  useEffect(() => {
    if (selectedOpp || !scannerRunning || visibleCount < OPP_BASE.length) return;
    const iv = setInterval(() => {
      const idx  = Math.floor(Math.random() * rows.length);
      const bump = Math.random() < 0.55 ? 1 : -1;
      setRows(prev => prev.map((r, i) => {
        if (i !== idx) return r;
        const nq = Math.min(99, Math.max(60, r.quality + bump));
        return { ...r, prevQuality: r.quality, quality: nq };
      }));
      setRows(prev => {
        const r = prev[idx];
        const dir = (r.quality >= (r.prevQuality ?? r.quality)) ? "up" : "down";
        setFlashes(f => ({ ...f, [r.id]: dir }));
        setTimeout(() => setFlashes(f => { const n={...f}; delete n[r.id]; return n; }), 800);
        return prev;
      });
    }, 1600);
    return () => clearInterval(iv);
  }, [selectedOpp, scannerRunning, visibleCount]);

  // Stream rows in one-by-one when scanner starts
  useEffect(() => {
    if (!scannerRunning) return;
    const total = OPP_BASE.length;
    const iv = setInterval(() => {
      setVisibleCount(c => {
        if (c >= total) { clearInterval(iv); return c; }
        return c + 1;
      });
    }, 420);
    return () => clearInterval(iv);
  }, [scannerRunning]);

  if (selectedOpp) {
    const opp = rows.find(r => r.id === selectedOpp) || rows[0];
    return <ProjectDetailPage opp={opp} pipeline={pipeline} addProject={addProject} onBack={() => setSelectedOpp(null)} />;
  }

  // ── Blank state ──
  if (visibleCount === 0) {
    return (
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background: dark ? "var(--c-opp-bg)" : "#ffffff", gap:0, position:"relative", overflow:"hidden" }}>
        {/* Subtle grid background — dark only */}
        {dark && <div style={{
          position:"absolute", inset:0, opacity:0.07,
          backgroundImage:"linear-gradient(#E8601C 1px,transparent 1px),linear-gradient(90deg,#E8601C 1px,transparent 1px)",
          backgroundSize:"40px 40px",
        }} />}
        {/* Radial fade — dark only */}
        {dark && <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 70% 60% at 50% 50%,transparent 30%,#0a0f12 100%)" }} />}

        <div style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center", gap:18 }}>
          {/* Icon ring */}
          <div style={{ position:"relative", width:72, height:72 }}>
            <div style={{ width:72, height:72, borderRadius:"50%", background:"rgba(232,96,28,0.06)", border:"1px solid rgba(232,96,28,0.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Activity style={{ width:28, height:28, color:"rgba(232,96,28,0.35)" }} />
            </div>
            {/* Orbiting dot */}
            <div style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", animation:"orbitDot 3s linear infinite" }}>
              <div style={{ position:"absolute", top:2, left:"50%", transform:"translateX(-50%)", width:6, height:6, borderRadius:"50%", background:"rgba(232,96,28,0.4)" }} />
            </div>
          </div>

          {/* Title + badge */}
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:13, fontWeight:700, color:"var(--c-muted)", fontFamily:"monospace", letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:8 }}>
              Market Scanner
            </div>
            <span style={{ fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:3, background:"rgba(168,66,50,0.12)", color:"rgba(168,66,50,0.8)", border:"1px solid rgba(168,66,50,0.25)", letterSpacing:"0.15em", fontFamily:"monospace" }}>
              PAUSED
            </span>
          </div>

          {/* Subtitle */}
          <div style={{ fontSize:11, color:"var(--c-muted)", textAlign:"center", maxWidth:280, lineHeight:1.6 }}>
            Scanner is ready. Click <span style={{ color:"rgba(232,96,28,0.7)", fontWeight:700 }}>START</span> to discover live carbon credit opportunities.
          </div>

          {/* Fake terminal lines */}
          <div style={{ background: dark ? "rgba(10,15,18,0.8)" : "#F9FAFB", border: dark ? "1px solid rgba(232,96,28,0.08)" : "1px solid #E4E6EA", borderRadius:8, padding:"10px 16px", width:320, fontFamily:"monospace" }}>
            {[
              { label:"BLOOMBERG_V3",   status:"READY" },
              { label:"VERRA_REG_V2",   status:"READY" },
              { label:"GS_DATABASE_V4", status:"READY" },
              { label:"REUTERS_CLIMATE",status:"READY" },
            ].map((l, i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", fontSize:9, color:"var(--c-muted)", marginBottom: i < 3 ? 5 : 0 }}>
                <span>{l.label}</span>
                <span style={{ color:"rgba(74,112,64,0.6)" }}>{l.status}</span>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes orbitDot { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden flex flex-col" style={{ background:"var(--c-opp-bg)" }}>
      <style>{`
        @keyframes oppFlashUp   { 0%{background:#E8601C1a} 100%{background:transparent} }
        @keyframes oppFlashDown { 0%{background:#E8601C18} 100%{background:transparent} }
        @keyframes oppMatchIn   { 0%{opacity:0;transform:translateY(-3px)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes rowStreamIn  { 0%{opacity:0;transform:translateX(-14px)} 60%{opacity:1} 100%{opacity:1;transform:translateX(0)} }
        .opp-flash-up   { animation: oppFlashUp   0.8s ease-out forwards; }
        .opp-flash-down { animation: oppFlashDown 0.8s ease-out forwards; }
        .opp-match-in   { animation: oppMatchIn   0.4s ease-out both; }
        .row-stream-in  { animation: rowStreamIn  0.38s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      {/* ── Header ── */}
      <div style={{ padding:"12px 20px 10px", borderBottom:"1px solid var(--c-opp-border)", display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
        <BarChart2 style={{ width:15, height:15, color:"#E8601C" }} />
        <span style={{ color:"var(--c-opp-text)", fontWeight:700, fontSize:13, letterSpacing:"0.03em" }}>Top Carbon Credit Opportunities</span>
        <div style={{ marginLeft:"auto", display:"flex", gap:8, alignItems:"center" }}>
          <span style={{ fontSize:9, fontWeight:700, padding:"3px 8px", borderRadius:4, background:"#E8601C18", color:"#E8601C", border:"1px solid #E8601C30", letterSpacing:"0.1em" }}>LIVE FEED</span>
          <span style={{ fontSize:9, fontWeight:600, padding:"3px 8px", borderRadius:4, background:"var(--c-hover)", color:"var(--c-opp-sub)", border:"1px solid var(--c-opp-border)", letterSpacing:"0.06em" }}>24H RANGE</span>
        </div>
      </div>

      {/* ── Column headers ── */}
      <div style={{
        display:"grid", gridTemplateColumns:"2fr 1.3fr 1fr 2fr 1fr 120px",
        padding:"8px 20px", borderBottom:"1px solid var(--c-opp-border)",
        background:"var(--c-opp-head)", flexShrink:0,
      }}>
        {["PROJECT NAME","TYPE","MATCH SCORE","MATCH","AGENT RATING",""].map(h => (
          <span key={h} style={{ color:"var(--c-opp-head-text)", fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em" }}>{h}</span>
        ))}
      </div>

      {/* ── Rows ── */}
      <div style={{ flex:1, overflowY:"auto" }}>
        {rows.slice(0, visibleCount).map((row, index) => {
          const flash    = flashes[row.id];
          const inPipe   = pipeline.some(p => p.type === "supply" && p.id === row.id);
          const isNewest = index === visibleCount - 1 && visibleCount < OPP_BASE.length + 1;
          return (
            <div key={row.id}
              className={`${flash ? (flash==="up" ? "opp-flash-up" : "opp-flash-down") : ""} ${isNewest ? "row-stream-in" : ""}`}
              onClick={() => setSelectedOpp(row.id)}
              style={{
                display:"grid", gridTemplateColumns:"2fr 1.3fr 1fr 2fr 1fr 120px",
                padding:"9px 20px", borderBottom:"1px solid var(--c-opp-border)",
                alignItems:"center", cursor:"pointer",
                transition:"background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background="var(--c-opp-hover)"}
              onMouseLeave={e => e.currentTarget.style.background="transparent"}
            >
              {/* Project Name */}
              <div style={{ display:"flex", alignItems:"center", gap:9, minWidth:0 }}>
                <span style={{ fontSize:15, flexShrink:0, lineHeight:1 }}>{row.icon}</span>
                <span style={{ color:"var(--c-opp-text)", fontWeight:600, fontSize:11, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{row.name}</span>
              </div>

              {/* Type */}
              <div style={{ color:"var(--c-opp-sub)", fontSize:10, paddingRight:6, lineHeight:1.4 }}>{row.type}</div>

              {/* Match Score — arc badge */}
              <div>
                <MatchScoreBadge key={`${row.id}-${row.quality}`} score={row.quality} />
              </div>

              {/* Match — counterpart chips */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                {row.matches.map((m, mi) => (
                  <span key={mi}
                    className="opp-match-in"
                    style={{
                      animationDelay: flash ? `${mi * 80}ms` : "0ms",
                      fontSize:9, fontWeight:600, padding:"2px 7px", borderRadius:3,
                      background:"#E8601C12", color:"#00c99a",
                      border:"1px solid #E8601C25", whiteSpace:"nowrap",
                      letterSpacing:"0.02em",
                    }}>
                    {m}
                  </span>
                ))}
              </div>

              {/* Agent Rating */}
              <div>
                <span style={{
                  fontSize:9, fontWeight:700, padding:"3px 7px", borderRadius:4,
                  background: row.agentCol + "18",
                  color: row.agentCol,
                  border: `1px solid ${row.agentCol}35`,
                  letterSpacing:"0.05em", whiteSpace:"nowrap",
                }}>{row.agent}</span>
              </div>

              {/* Add to Pipeline */}
              <div style={{ display:"flex", justifyContent:"flex-end" }}>
                {inPipe ? (
                  <span style={{
                    display:"inline-flex", alignItems:"center", gap:4,
                    fontSize:9, fontWeight:700, padding:"4px 9px", borderRadius:4,
                    background:"rgba(45,60,41,0.35)", color:"#80CBC4",
                    border:"1px solid rgba(45,60,41,0.70)", letterSpacing:"0.06em",
                    whiteSpace:"nowrap",
                  }}>
                    ✓ IN PIPELINE
                  </span>
                ) : (
                  <button
                    onClick={e => { e.stopPropagation(); addProject && addProject({ ...row, type:"supply", stage:"Prospect" }); }}
                    style={{
                      display:"inline-flex", alignItems:"center", gap:5,
                      fontSize:9, fontWeight:700, padding:"4px 9px", borderRadius:4,
                      background:"rgba(0,137,123,0.12)", color:"#00897B",
                      border:"1px solid rgba(0,137,123,0.35)",
                      letterSpacing:"0.06em", cursor:"pointer", whiteSpace:"nowrap",
                      transition:"all 0.15s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background="rgba(0,137,123,0.22)"; e.currentTarget.style.borderColor="rgba(0,137,123,0.60)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background="rgba(0,137,123,0.12)"; e.currentTarget.style.borderColor="rgba(0,137,123,0.30)"; }}
                  >
                    <Plus style={{ width:9, height:9, flexShrink:0 }} /> ADD PIPELINE
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AgentHub({ t, dark, pipeline, addLead, addProject }) {
  const [activeTab,       setActiveTab]       = useState("opportunities");
  const [scannerRunning,  setScannerRunning]  = useState(false);
  const [scanMsgIdx,      setScanMsgIdx]      = useState(-1);  // -1 = idle
  const [msgVisible,      setMsgVisible]      = useState(false);
  const [listingsStarted, setListingsStarted] = useState(false);

  const SCAN_MESSAGES = [
    "Scanning global carbon markets… activating intelligence grid",
    "Detecting high-potential signals across registries, satellite data, and developer pipelines…",
    "Deploying expert agents to evaluate project integrity, risk, and potential…",
    "Filtering through thousands of projects to identify the highest-quality opportunities…",
    "Matching projects to your investment strategy, risk appetite, and compliance needs…",
    "Top opportunities identified. Ready for deeper diligence.",
  ];
  const MSG_DURATION = 2600; // ms each message stays visible

  // Drive the message sequence when scanner starts
  useEffect(() => {
    if (!scannerRunning) {
      setScanMsgIdx(-1);
      setMsgVisible(false);
      // Only reset listings if user manually paused (not on auto-complete)
      return;
    }
    // Fresh start — reset listings so rows stream in again
    setListingsStarted(false);
    setScanMsgIdx(0);
    setMsgVisible(true);
  }, [scannerRunning]);

  useEffect(() => {
    if (scanMsgIdx < 0 || !scannerRunning) return;
    const isLast = scanMsgIdx === SCAN_MESSAGES.length - 1;
    // Kick off listings on the last message
    if (isLast) setListingsStarted(true);
    const timer = setTimeout(() => {
      if (isLast) {
        // Fade out then stop scanner (listings stay visible)
        setMsgVisible(false);
        setTimeout(() => {
          setScannerRunning(false);
          setScanMsgIdx(-1);
        }, 400);
      } else {
        // Fade out, advance, fade in
        setMsgVisible(false);
        setTimeout(() => {
          setScanMsgIdx(i => i + 1);
          setMsgVisible(true);
        }, 350);
      }
    }, MSG_DURATION);
    return () => clearTimeout(timer);
  }, [scanMsgIdx, scannerRunning]);

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      <style>{`
        @keyframes qScanX    { 0% { left:-140px } 100% { left:100% } }
        @keyframes qBlink    { 0%,100%{opacity:1} 50%{opacity:0.25} }
        @keyframes qMsgIn    { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes qMsgOut   { from{opacity:1;transform:translateY(0)} to{opacity:0;transform:translateY(-5px)} }
        @keyframes qDotPulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.6);opacity:0.5} }
      `}</style>

      {/* ── Market Scanner Banner ── */}
      <div className="shrink-0 relative overflow-hidden" style={{
        background:"var(--c-bg2)", borderBottom:"1px solid var(--c-border2)",
        minHeight: scannerRunning ? 96 : 80,
        transition:"min-height 0.3s ease",
      }}>
        <div style={{ height:2, background:"linear-gradient(90deg,#E8601C 0%,#A84232 50%,#E8601C 100%)", width:"100%" }} />
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(circle,#ffffff08 1px,transparent 1px)", backgroundSize:"24px 24px" }} />
        {scannerRunning && (
          <div style={{ position:"absolute", top:"50%", width:140, height:1, background:"linear-gradient(90deg,transparent,#E8601C60,#E8601C,#E8601C60,transparent)", animation:"qScanX 3s linear infinite", pointerEvents:"none" }} />
        )}

        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight: scannerRunning ? 94 : 78, gap:8, position:"relative", padding:"10px 60px" }}>

          {/* Title row */}
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <Activity style={{ width:17, height:17, color: scannerRunning ? "#E8601C" : "#3A3D4A", flexShrink:0, animation: scannerRunning ? "qBlink 1.1s ease-in-out infinite" : "none" }} />
            <span style={{ fontSize:11, fontWeight:800, letterSpacing:"0.18em", color: scannerRunning ? "#E8601C" : "#3A3D4A", fontFamily:"monospace", textTransform:"uppercase" }}>
              Market Scanner
            </span>
            <span style={{
              fontSize:9, fontWeight:700, padding:"2px 8px", borderRadius:3, letterSpacing:"0.14em", fontFamily:"monospace",
              background: scannerRunning ? "rgba(232,96,28,0.12)" : "rgba(168,66,50,0.12)",
              color:      scannerRunning ? "#E8601C"               : "rgba(168,66,50,0.8)",
              border:     scannerRunning ? "1px solid rgba(232,96,28,0.25)" : "1px solid rgba(168,66,50,0.25)",
            }}>
              {scannerRunning ? "SCANNING" : "PAUSED"}
            </span>
          </div>

          {/* Animated message */}
          <div style={{ height:18, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", width:"100%", maxWidth:600 }}>
            {scannerRunning && scanMsgIdx >= 0 && (
              <div key={scanMsgIdx} style={{
                display:"flex", alignItems:"center", gap:8,
                animation: msgVisible ? "qMsgIn 0.35s ease-out both" : "qMsgOut 0.35s ease-in both",
              }}>
                {/* Animated dot */}
                <span style={{ width:5, height:5, borderRadius:"50%", background:"#E8601C", flexShrink:0, animation:"qDotPulse 1s ease-in-out infinite" }} />
                <span style={{ fontSize:11, color:"var(--c-sub)", textAlign:"center", lineHeight:1.4 }}>
                  {SCAN_MESSAGES[scanMsgIdx]}
                </span>
              </div>
            )}
          </div>

          {/* Progress dots */}
          {scannerRunning && (
            <div style={{ display:"flex", gap:4, alignItems:"center" }}>
              {SCAN_MESSAGES.map((_, i) => (
                <span key={i} style={{
                  width: i === scanMsgIdx ? 16 : 4, height:4, borderRadius:2,
                  background: i <= scanMsgIdx ? "#E8601C" : "rgba(232,96,28,0.18)",
                  transition:"all 0.3s ease",
                }} />
              ))}
            </div>
          )}

          {/* START / PAUSE button */}
          <button
            onClick={() => setScannerRunning(r => !r)}
            style={{
              position:"absolute", right:16, top:"50%", transform:"translateY(-50%)",
              padding:"7px 18px", borderRadius:4, fontSize:10, fontWeight:800, fontFamily:"monospace",
              letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer",
              background:"#E8601C", color:"#ffffff", border:"1px solid #E8601C",
              transition:"opacity 0.2s",
            }}
          >
            {scannerRunning ? <><span style={{fontSize:9}}>⏸</span> PAUSE</> : <><span style={{fontSize:9}}>▶</span> START</>}
          </button>

          {/* Corner brackets */}
          <div style={{ position:"absolute", top:8, left:10, width:12, height:12, borderTop:"1px solid #E8601C30", borderLeft:"1px solid #E8601C30" }} />
          <div style={{ position:"absolute", top:8, right:10, width:12, height:12, borderTop:"1px solid #E8601C30", borderRight:"1px solid #E8601C30" }} />
          <div style={{ position:"absolute", bottom:8, left:10, width:12, height:12, borderBottom:"1px solid #E8601C30", borderLeft:"1px solid #E8601C30" }} />
          <div style={{ position:"absolute", bottom:8, right:10, width:12, height:12, borderBottom:"1px solid #E8601C30", borderRight:"1px solid #E8601C30" }} />
        </div>
      </div>

      {/* ── Tab Bar ── */}
      <div className={`flex items-center border-b ${t.border} shrink-0 px-5`} style={{ background:"var(--c-bg)" }}>
        {[
          { id:"opportunities", label:"Opportunities" },
          { id:"corporates",    label:"Corporates" },
          { id:"projects",      label:"Projects" },
        ].map(({ id, label }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 -mb-px transition-colors whitespace-nowrap flex items-center gap-1.5
              ${activeTab === id ? "border-[#00897B] text-[#00897B]" : `border-transparent ${t.muted}`}`}>
            {id === "opportunities" && scannerRunning && (
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8601C] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#E8601C]" />
              </span>
            )}
            {label}
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeTab === "opportunities" && (
          <OpportunitiesTab pipeline={pipeline} addProject={addProject} scannerRunning={listingsStarted} dark={dark} />
        )}
        {activeTab === "corporates" && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className={`rounded-2xl ${t.card} border overflow-hidden`}>
              <div className="grid px-4 py-2.5 border-b" style={{ gridTemplateColumns:"2fr 1.2fr 0.7fr 1fr 2.5fr auto", borderColor:"var(--c-border2)", background:"var(--c-card2)" }}>
                {["Company","Carbon Need","ESG","Warmth","Matched Projects","Action"].map(h => (
                  <div key={h} className={`text-[10px] font-bold uppercase tracking-wide ${t.muted}`}>{h}</div>
                ))}
              </div>
              {LEADS.map(lead => {
                const inPipe = pipeline.some(p => p.type==="demand" && p.id===lead.id);
                return (
                  <div key={lead.id} className={`grid px-4 py-3 border-b ${t.hover} items-center`}
                    style={{ gridTemplateColumns:"2fr 1.2fr 0.7fr 1fr 2.5fr auto", borderColor:"var(--c-border2)" }}>
                    <div className="flex items-center gap-2">
                      <span className="text-base">{lead.flag}</span>
                      <div>
                        <div className={`text-xs font-bold ${t.text}`}>{lead.company}</div>
                        <div className={`text-[10px] ${t.muted}`}>{lead.industry}</div>
                      </div>
                    </div>
                    <div className={`text-[10px] ${t.sub}`}>{lead.need}</div>
                    <div className={`text-[10px] font-bold ${t.text}`}>{lead.esg}</div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold w-fit ${t[lead.warmth]}`}>{lead.warmth.toUpperCase()}</span>
                    <div className={`text-[10px] ${t.muted}`}>{lead.signals[0].slice(0,50)}…</div>
                    <div>
                      {inPipe
                        ? <span className={`text-[9px] px-2 py-1 rounded-lg font-bold ${t.inPipeline}`}>✓ IN PIPELINE</span>
                        : <button onClick={() => addLead(lead)} className={`text-[9px] px-2 py-1 rounded-lg font-bold ${t.ctaBg}`}>+ Add</button>
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {activeTab === "projects" && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-2 gap-3">
              {PROJECTS.map(proj => {
                const inPipe = pipeline.some(p => p.type==="supply" && p.id===proj.id);
                return (
                  <div key={proj.id} className={`rounded-2xl p-4 ${t.card} ${t.cardHov} border`}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className={`text-xs font-bold ${t.text} mb-0.5`}>{proj.name}</div>
                        <div className={`text-[10px] ${t.muted}`}>{proj.flag} {proj.country} · {proj.registry}</div>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${t.verra}`}>{proj.registry}</span>
                    </div>
                    <div className={`text-[10px] ${t.sub} mb-3`}>{proj.description.slice(0,100)}…</div>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold ${t.accent}`}>{proj.price}/t · Q{proj.quality}</span>
                      {inPipe
                        ? <span className={`text-[9px] px-2 py-1 rounded-lg font-bold ${t.inPipeline}`}>✓ IN PIPELINE</span>
                        : <button onClick={() => addProject(proj)} className={`text-[9px] px-2 py-1 rounded-lg font-bold ${t.ctaBg}`}>+ Add to Pipeline</button>
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PIPELINE ────────────────────────────────────────────────────────────────

function Pipeline({ t, dark, pipeline, setPipeline }) {
  const stages = ["Prospect", "Qualified", "Negotiating", "Closed"];
  const move = (item, dir) => {
    const next = stages[stages.indexOf(item.stage) + dir];
    if (!next) return;
    setPipeline(prev => prev.map(p => p === item ? {...p, stage: next} : p));
  };
  const stageColor = { Prospect: t.muted, Qualified: "text-amber-400", Negotiating: t.aiAccent, Closed: t.verified };

  return (
    <div className="p-3 space-y-3 h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between shrink-0">
        <p className={`text-sm ${t.sub}`}>
          <span className={`font-bold ${t.text}`}>{pipeline.length}</span> items — {" "}
          <span className={t.aiAccent}>{pipeline.filter(p=>p.type==="demand").length} demand</span> & <span className={t.verified}>{pipeline.filter(p=>p.type==="supply").length} supply</span>
        </p>
        <button onClick={() => setPipeline([])} className={`text-xs ${t.muted} ${t.hover} px-3 py-1.5 rounded-lg border ${t.border}`}>Clear</button>
      </div>
      {pipeline.length === 0 ? (
        <div className={`flex-1 rounded-2xl ${t.card} border flex items-center justify-center`}>
          <div className="text-center">
            <Briefcase className={`w-10 h-10 ${t.muted} mx-auto mb-3`} />
            <div className={`text-sm font-bold ${t.sub}`}>Pipeline is empty</div>
            <p className={`text-xs ${t.muted} mt-1`}>Add leads from the Demand Agent or projects from Supply Agent</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-4 gap-3 overflow-hidden">
          {stages.map(stage => {
            const items = pipeline.filter(p => p.stage === stage);
            return (
              <div key={stage} className={`rounded-2xl p-3 ${t.kCol} border flex flex-col overflow-hidden`}>
                <div className="flex items-center justify-between mb-3 px-1 shrink-0">
                  <span className={`text-xs font-bold uppercase tracking-wider ${stageColor[stage]}`}>{stage}</span>
                  <span className={t.tag}>{items.length}</span>
                </div>
                <div className="flex-1 overflow-y-auto space-y-2">
                  {items.map((item, i) => (
                    <div key={i} className={`rounded-xl p-3 ${t.kCard} border`}>
                      <div className="flex items-start gap-2 mb-2">
                        <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${item.type==="demand" ? "bg-[#E8601C]" : "bg-[#E8601C]"}`} />
                        <div className="flex-1 min-w-0">
                          <div className={`text-xs font-bold ${t.text} leading-tight`}>{item.type==="demand" ? item.company : item.name}</div>
                          <div className={`text-[10px] ${t.muted} mt-0.5`}>{item.type==="demand" ? item.industry : item.type}</div>
                        </div>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold
                          ${item.type==="demand"
                            ? dark ? "bg-[#E8601C]/10 text-[#E8601C]" : "bg-[#E8601C]/10 text-[#E8601C]"
                            : dark ? "bg-[#E8601C]/10 text-[#E8601C]" : "bg-[#2D3C29]/25 text-[#80CBC4]"}`}>
                          {item.type==="demand" ? "D" : "S"}
                        </span>
                      </div>
                      <div className={`text-[10px] ${t.muted} mb-2`}>{item.flag} {item.type==="demand" ? item.need : item.credits}</div>
                      <div className="flex gap-1">
                        <button onClick={() => move(item, -1)} disabled={stage==="Prospect"}
                          className={`flex-1 text-[10px] py-1 rounded-lg border ${t.border} ${t.muted} ${t.hover} disabled:opacity-25 transition-all`}>← Back</button>
                        <button onClick={() => move(item, 1)} disabled={stage==="Closed"}
                          className={`flex-1 text-[10px] py-1 rounded-lg ${dark ? "bg-[#E8601C]/10 text-[#E8601C] border border-[#E8601C]/20 hover:bg-[#E8601C]/20" : "bg-[#2D3C29]/25 text-[#80CBC4] border border-[#2D3C29]/50 hover:bg-[#2D3C29]/30"} disabled:opacity-25 transition-all`}>Advance →</button>
                      </div>
                    </div>
                  ))}
                  {items.length === 0 && <div className={`text-center py-6 text-xs ${t.muted} rounded-xl border-2 border-dashed ${t.border}`}>Empty</div>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── CAMPAIGNS PAGE ──────────────────────────────────────────────────────────

const ACTIVE_CAMPAIGNS = [
  { id: 1, name: "Microsoft Q4 Carbon Removal Outreach", strategy: "REDD+ Priority",    volume: 4200,  successRate: 87.3, status: "Active",  target: "Microsoft", contact: "Melanie Nakagawa", steps: 5, completed: 3 },
  { id: 2, name: "Amazon Climate Pledge — REDD+ Proposal", strategy: "High Volume",      volume: 9800,  successRate: 82.1, status: "Active",  target: "Amazon",    contact: "Kara Hurst",       steps: 4, completed: 2 },
  { id: 3, name: "Shell NbS Strategy Alignment",           strategy: "Coastal Barrier",  volume: 18000, successRate: 74.5, status: "Paused",  target: "Shell PLC", contact: "Anna Mascolo",     steps: 6, completed: 4 },
  { id: 4, name: "Unilever SBTi Offset Sourcing",          strategy: "Balanced Yield",   volume: 5500,  successRate: 0,    status: "Draft",   target: "Unilever",  contact: "Rebecca Marmot",   steps: 4, completed: 0 },
  { id: 5, name: "BP Scope 3 Offset Programme",            strategy: "Aggressive Cover", volume: 11000, successRate: 68.9, status: "Active",  target: "BP PLC",    contact: "Giulia Chierchia", steps: 3, completed: 1 },
];

const HISTORICAL_CAMPAIGNS = [
  { id: 1,  name: "Global Wetlands Restoration",    strategy: "Aggressive Coverage",  volume: 2450,  successRate: 99.8 },
  { id: 2,  name: "Urban Heat Mitigation 2023",      strategy: "Balanced Yield",       volume: 8900,  successRate: 98.2 },
  { id: 3,  name: "Reforestation Project Beta",      strategy: "Deep Impact",          volume: 12000, successRate: 96.5 },
  { id: 4,  name: "Coral Reef Preservation Alpha",   strategy: "Ocean Focus",          volume: 5600,  successRate: 94.1 },
  { id: 5,  name: "Arctic Ice Conservation",         strategy: "Climate Shield",       volume: 1200,  successRate: 99.9 },
  { id: 6,  name: "Renewable Energy Pilot",          strategy: "High Volume",          volume: 50000, successRate: 89.5 },
  { id: 7,  name: "Mangrove Restoration Project",    strategy: "Coastal Barrier",      volume: 14200, successRate: 97.4 },
  { id: 8,  name: "Sustainable Timber Initiative",   strategy: "Yield Optimization",   volume: 3800,  successRate: 92.8 },
  { id: 9,  name: "Afforestation Project Delta",     strategy: "Native Replanting",    volume: 7100,  successRate: 95.2 },
  { id: 10, name: "Green City Initiative",           strategy: "Urban Canopy",         volume: 2400,  successRate: 91.5 },
  { id: 11, name: "Soil Health Management",          strategy: "Biosphere Enhancement",volume: 15000, successRate: 99.1 },
];

// keep legacy alias so nothing else breaks
const CAMPAIGNS_DATA = ACTIVE_CAMPAIGNS;

const STRATEGIES = ["REDD+ Priority", "High Volume", "Coastal Barrier", "Balanced Yield", "Aggressive Cover", "Deep Impact", "Ocean Focus", "Climate Shield", "Yield Optimization", "Native Replanting"];

// ─── UNIFIED CAMPAIGN MODAL ───────────────────────────────────────────────────
// Handles: new (blank), new from template, edit existing, view historical
function CampaignModal({ t, campaign, isNew, readOnly, onClose, onSave }) {
  const BLANK = { id: null, type: "", name: "", target: "", contact: "", strategy: STRATEGIES[0], volume: "", status: "Draft", successRate: 0, steps: 4, completed: 0 };
  const [form, setForm]           = useState(campaign ? { ...campaign } : { ...BLANK });
  const [chatInput, setChatInput] = useState("");
  const [chatMsgs, setChatMsgs]   = useState([]);
  const [typing, setTyping]       = useState(false);
  const chatBottomRef             = useRef(null);

  useEffect(() => { chatBottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMsgs, typing]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  /* ── AI chat change parser ── */
  const applyChange = (msg) => {
    const lower = msg.toLowerCase();
    let changed = false; let reply = "";

    const statusHit = ["Active","Paused","Draft"].find(s => lower.includes(s.toLowerCase()));
    if (statusHit && /status|mark|make|set|change/.test(lower)) {
      set("status", statusHit); reply = `Done — status set to **${statusHit}**.`; changed = true;
    }
    if (!changed) {
      const numMatch = msg.match(/\b(\d[\d,]*)\b/);
      if (numMatch && /volume|units|credits/.test(lower)) {
        const n = parseInt(numMatch[1].replace(/,/g,""), 10);
        if (n > 0) { set("volume", n); reply = `Done — volume updated to ${n.toLocaleString()} units.`; changed = true; }
      }
    }
    if (!changed) {
      const stratHit = STRATEGIES.find(s => lower.includes(s.toLowerCase()));
      if (stratHit && /strategy|approach|use|switch|change/.test(lower)) {
        set("strategy", stratHit); reply = `Done — strategy changed to "${stratHit}".`; changed = true;
      }
    }
    if (!changed && /rename|name to|call it|title to/.test(lower)) {
      const m = msg.match(/(?:rename|name|call it|title)\s+(?:to\s+)?"?([^"]+)"?/i);
      if (m) { set("name", m[1].trim()); reply = `Done — renamed to "${m[1].trim()}".`; changed = true; }
    }
    if (!changed && lower.includes("contact")) {
      const m = msg.match(/contact\s+(?:to\s+)?([A-Z][a-z]+ [A-Z][a-z]+)/);
      if (m) { set("contact", m[1]); reply = `Done — contact updated to ${m[1]}.`; changed = true; }
    }
    if (!changed && /target|company/.test(lower)) {
      const m = msg.match(/(?:target|company)\s+(?:to\s+)?([A-Z][A-Za-z\s]+?)(?:\s*$|\.)/);
      if (m) { set("target", m[1].trim()); reply = `Done — target updated to "${m[1].trim()}".`; changed = true; }
    }
    if (!changed) {
      const tips = [
        "Try: \"Change status to Active\", \"Update volume to 15,000\", \"Switch to High Volume strategy\", or \"Rename to…\"",
        "I can update any field. E.g. \"Set status to Paused\" or \"Change strategy to Deep Impact\".",
        "Tell me what to change — status, volume, strategy, name, contact, or target.",
      ];
      reply = tips[Math.floor(Math.random() * tips.length)];
    }
    return reply;
  };

  const sendChat = () => {
    const msg = chatInput.trim(); if (!msg) return;
    setChatInput(""); setChatMsgs(prev => [...prev, { role:"user", text:msg }]);
    setTyping(true);
    setTimeout(() => {
      const reply = applyChange(msg);
      setChatMsgs(prev => [...prev, { role:"ai", text:reply }]); setTyping(false);
    }, 480);
  };

  const corporateTargets = LEADS.map(l    => ({ label: l.company,  contact: l.contact.name }));
  const projectTargets   = PROJECTS.map(p => ({ label: p.name,     contact: p.registry     }));
  const targets          = form.type === "corporate" ? corporateTargets : projectTargets;

  const canSave = isNew
    ? !!form.name.trim() && !!form.volume && Number(form.volume) > 0
    : !!form.name.trim();

  const handleSave = () => {
    const payload = isNew
      ? { id: Date.now(), name: form.name, strategy: form.strategy, volume: Number(form.volume), successRate: 0, status: "Draft", target: form.target, contact: form.contact, steps: 4, completed: 0 }
      : { ...form };
    onSave(payload); onClose();
  };

  const statusPalette = { Active:"bg-[#E8601C] text-white", Paused:"bg-[#A84232] text-white", Draft:"bg-[#ddd] text-[#666]" };
  const closeX = <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;

  const isTemplate = isNew && campaign != null;
  const title = readOnly ? campaign?.name : isNew ? "New Campaign" : form.name;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="w-[920px] rounded-2xl shadow-2xl bg-[#252830] border border-[#2A2D38] flex flex-col overflow-hidden" style={{ maxHeight:"90vh" }}>

        {/* ── Header ── */}
        <div className="px-7 pt-6 pb-4 border-b border-[#2A2D38] flex items-start justify-between shrink-0">
          <div className="min-w-0 flex-1 pr-4">
            <div className="flex items-center gap-2 mb-1">
              {!isNew && form.status && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide ${statusPalette[form.status] || "bg-[#eee] text-[#999]"}`}>
                  {form.status}
                </span>
              )}
              {isTemplate && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#E8601C]/10 text-[#E8601C] border border-[#E8601C]/20">
                  <Sparkles className="w-2.5 h-2.5" />From Template
                </span>
              )}
              {readOnly && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1A1D24] text-[#999] border border-[#2A2D38]">Historical · Read-only</span>}
            </div>
            <h2 className="text-[15px] font-bold text-[#111] truncate">{title}</h2>
            {!isNew && (form.target || form.contact) && (
              <p className="text-xs text-[#999] mt-0.5">{[form.target, form.contact].filter(Boolean).join(" · ")}</p>
            )}
            {isNew && <p className="text-xs text-[#aaa] mt-0.5">Fill in the details or describe changes in the chat panel.</p>}
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#1A1D24] text-[#bbb] hover:text-[#555] transition-colors shrink-0">{closeX}</button>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-1 overflow-hidden">

          {/* ── Left: form fields ── */}
          <div className="flex-1 overflow-y-auto px-7 py-5 border-r border-[#2A2D38]">

            {/* Type selector — new campaigns only */}
            {isNew && (
              <div className="mb-5">
                <label className="text-[10px] font-bold text-[#aaa] uppercase tracking-wider block mb-2">Campaign Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id:"corporate", icon:Building2, label:"Corporates", sub:"Buy-side · ESG & offset procurement" },
                    { id:"project",   icon:TreePine,  label:"Projects",   sub:"Supply-side · Carbon credit generation" },
                  ].map(({ id, icon:Icon, label, sub }) => (
                    <button key={id} onClick={() => { set("type", id); set("target",""); set("contact",""); }}
                      className={`text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3
                        ${form.type===id ? "border-[#E8601C] bg-[#E8601C]/5" : "border-[#2A2D38] bg-[#252830] hover:border-[#3A3D4A]"}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${form.type===id ? "bg-[#E8601C]/15" : "bg-[#f5f0ec]"}`}>
                        <Icon className={`w-4 h-4 ${form.type===id ? "text-[#E8601C]" : "text-[#8b5e3c]"}`} />
                      </div>
                      <div>
                        <div className={`text-sm font-bold ${form.type===id ? "text-[#E8601C]" : "text-[#111]"}`}>{label}</div>
                        <div className="text-[10px] text-[#aaa] mt-0.5 leading-relaxed">{sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-x-5 gap-y-4">

              {/* Campaign Name — full width */}
              <div className="col-span-2">
                <label className="text-[10px] font-bold text-[#aaa] uppercase tracking-wider block mb-1.5">Campaign Name</label>
                <input value={form.name} onChange={e => set("name", e.target.value)} disabled={readOnly}
                  placeholder="e.g. Microsoft Q4 Carbon Removal Outreach"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#2A2D38] text-sm text-[#111] bg-[#252830] outline-none focus:border-[#E8601C] focus:ring-2 focus:ring-[#E8601C]/10 transition-all placeholder-[#3A3D4A] disabled:bg-[#fafafa] disabled:text-[#888]" />
              </div>

              {/* Target */}
              <div>
                <label className="text-[10px] font-bold text-[#aaa] uppercase tracking-wider block mb-1.5">
                  {form.type==="project" ? "Target Project" : "Target Company"}
                </label>
                {isNew && form.type ? (
                  <select value={form.target} onChange={e => { const opt=targets.find(o=>o.label===e.target.value); set("target",e.target.value); set("contact",opt?.contact||""); }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#2A2D38] text-sm text-[#111] bg-[#252830] outline-none focus:border-[#E8601C] focus:ring-2 focus:ring-[#E8601C]/10 transition-all appearance-none cursor-pointer">
                    <option value="">Select…</option>
                    {targets.map(o => <option key={o.label} value={o.label}>{o.label}</option>)}
                  </select>
                ) : (
                  <input value={form.target||""} onChange={e => set("target",e.target.value)} disabled={readOnly || (isNew && !form.type)}
                    placeholder="Company or project name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#2A2D38] text-sm text-[#111] bg-[#252830] outline-none focus:border-[#E8601C] focus:ring-2 focus:ring-[#E8601C]/10 transition-all placeholder-[#3A3D4A] disabled:bg-[#fafafa] disabled:text-[#888]" />
                )}
              </div>

              {/* Contact */}
              <div>
                <label className="text-[10px] font-bold text-[#aaa] uppercase tracking-wider block mb-1.5">Contact</label>
                <input value={form.contact||""} onChange={e => set("contact",e.target.value)} disabled={readOnly}
                  placeholder="Contact name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#2A2D38] text-sm text-[#111] bg-[#252830] outline-none focus:border-[#E8601C] focus:ring-2 focus:ring-[#E8601C]/10 transition-all placeholder-[#3A3D4A] disabled:bg-[#fafafa] disabled:text-[#888]" />
              </div>

              {/* Strategy */}
              <div>
                <label className="text-[10px] font-bold text-[#aaa] uppercase tracking-wider block mb-1.5">Matching Strategy</label>
                {readOnly
                  ? <div className="px-3.5 py-2.5 rounded-xl border border-[#2A2D38] bg-[#fafafa] text-sm text-[#888]">{form.strategy}</div>
                  : <select value={form.strategy} onChange={e => set("strategy",e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#2A2D38] text-sm text-[#111] bg-[#252830] outline-none focus:border-[#E8601C] focus:ring-2 focus:ring-[#E8601C]/10 transition-all appearance-none cursor-pointer">
                      {STRATEGIES.map(s => <option key={s}>{s}</option>)}
                    </select>
                }
              </div>

              {/* Volume */}
              <div>
                <label className="text-[10px] font-bold text-[#aaa] uppercase tracking-wider block mb-1.5">Target Volume (Units)</label>
                <input type="number" value={form.volume||""} onChange={e => set("volume",e.target.value)} disabled={readOnly}
                  placeholder="e.g. 5000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#2A2D38] text-sm text-[#111] bg-[#252830] outline-none focus:border-[#E8601C] focus:ring-2 focus:ring-[#E8601C]/10 transition-all placeholder-[#3A3D4A] disabled:bg-[#fafafa] disabled:text-[#888]" />
              </div>

              {/* Status pill selector — existing editable campaigns only */}
              {!isNew && !readOnly && (
                <div className="col-span-2">
                  <label className="text-[10px] font-bold text-[#aaa] uppercase tracking-wider block mb-1.5">Status</label>
                  <div className="flex gap-2">
                    {["Active","Paused","Draft"].map(s => (
                      <button key={s} onClick={() => set("status",s)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all
                          ${form.status===s
                            ? s==="Active" ? "bg-[#E8601C] text-white border-[#E8601C] shadow-[0_2px_8px_rgba(34,197,94,0.28)]"
                              : s==="Paused" ? "bg-[#A84232] text-white border-[#A84232]"
                              : "bg-[#555] text-white border-[#555]"
                            : "bg-[#252830] text-[#999] border-[#2A2D38] hover:border-[#ccc] hover:text-[#555]"}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Success Rate — display only */}
              {form.successRate != null && (
                <div>
                  <label className="text-[10px] font-bold text-[#aaa] uppercase tracking-wider block mb-1.5">Success Rate</label>
                  <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-[#2A2D38] bg-[#fafafa]">
                    <span className={`text-sm font-bold ${form.successRate > 0 ? "text-[#E8601C]" : "text-[#ccc]"}`}>
                      {form.successRate > 0 ? `${form.successRate}%` : "—"}
                    </span>
                    {form.successRate > 0 && (
                      <div className="flex-1 h-1.5 rounded-full bg-[#2A2D38] overflow-hidden">
                        <div className="h-full rounded-full bg-[#E8601C]" style={{ width:`${form.successRate}%` }} />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Steps Progress — display only */}
              {form.steps != null && (
                <div>
                  <label className="text-[10px] font-bold text-[#aaa] uppercase tracking-wider block mb-1.5">Steps Progress</label>
                  <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-[#2A2D38] bg-[#fafafa]">
                    <span className="text-sm font-bold text-[#111]">{form.completed||0}/{form.steps}</span>
                    <div className="flex gap-1 flex-1">
                      {Array.from({ length: form.steps }).map((_,i) => (
                        <div key={i} className={`flex-1 h-2 rounded-full transition-colors ${i < (form.completed||0) ? "bg-[#E8601C]" : "bg-[#2A2D38]"}`} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Right: AI chat panel ── */}
          <div className="w-[276px] shrink-0 flex flex-col bg-[#fafafa]">
            <div className="px-4 py-3 border-b border-[#2A2D38] shrink-0">
              <div className="flex items-center gap-2 mb-0.5">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#E8601C] to-[#ef4444] flex items-center justify-center shrink-0">
                  <Brain className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-xs font-semibold text-[#111]">AI Assistant</span>
              </div>
              <p className="text-[10px] text-[#bbb] pl-7 leading-relaxed">
                {readOnly ? "Ask anything about this campaign." : "Describe changes in plain English and I'll update the fields."}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5">
              {/* Pinned greeting */}
              <div className="flex gap-2 items-start">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#E8601C] to-[#ef4444] flex items-center justify-center shrink-0 mt-0.5">
                  <Brain className="w-2.5 h-2.5 text-white" />
                </div>
                <div className="bg-[#252830] border border-[#2A2D38] rounded-2xl rounded-tl-sm px-3 py-2 text-[11px] text-[#555] leading-relaxed max-w-[85%]">
                  <span className="font-semibold text-[#111] block mb-0.5">Here to help</span>
                  {readOnly
                    ? "This is a historical campaign. Ask me anything about its performance."
                    : "Try: \"Change status to Active\", \"Update volume to 15,000\", \"Switch to High Volume\", or \"Rename to…\""}
                </div>
              </div>

              {chatMsgs.map((m,i) => (
                <div key={i} className={`flex items-end gap-2 ${m.role==="user" ? "justify-end" : "justify-start"}`}>
                  {m.role==="ai" && (
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#E8601C] to-[#ef4444] flex items-center justify-center shrink-0 mb-0.5">
                      <Brain className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[82%] px-3 py-2 rounded-2xl text-[11px] leading-relaxed
                    ${m.role==="user" ? "bg-[#E8601C] text-white rounded-br-sm" : "bg-[#252830] border border-[#2A2D38] text-[#555] rounded-tl-sm"}`}>
                    {m.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex items-end gap-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#E8601C] to-[#ef4444] flex items-center justify-center shrink-0 mb-0.5">
                    <Brain className="w-2.5 h-2.5 text-white" />
                  </div>
                  <div className="bg-[#252830] border border-[#2A2D38] rounded-2xl rounded-tl-sm px-3 py-2.5 flex gap-1 items-center">
                    {[0,1,2].map(j => <span key={j} className="w-1.5 h-1.5 rounded-full bg-[#ddd] animate-bounce" style={{ animationDelay:`${j*0.14}s` }} />)}
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            <div className="px-3 pb-3 pt-2 shrink-0 border-t border-[#2A2D38]">
              <div className="flex gap-2 items-end">
                <textarea value={chatInput} onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); } }}
                  placeholder={readOnly ? "Ask about this campaign…" : "e.g. change status to active…"}
                  rows={2}
                  className="flex-1 resize-none bg-[#252830] border border-[#2A2D38] rounded-xl px-3 py-2 text-[11px] text-[#111] outline-none focus:border-[#E8601C] focus:ring-2 focus:ring-[#E8601C]/10 transition-all placeholder-[#ccc] leading-relaxed" />
                <button onClick={sendChat}
                  className="w-8 h-8 rounded-xl bg-[#E8601C] hover:bg-[#D04D0A] flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(232,96,28,0.35)] transition-all">
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="px-7 py-4 border-t border-[#2A2D38] flex items-center justify-between shrink-0 bg-[#252830]">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-semibold text-[#999] hover:text-[#555] hover:bg-[#1A1D24] transition-colors">
            {readOnly ? "Close" : "Discard"}
          </button>
          {!readOnly && (
            <div className="flex items-center gap-3">
              {isNew && <span className="text-[10px] text-[#ccc]">Will be saved as Draft</span>}
              <button onClick={handleSave} disabled={!canSave}
                className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all
                  ${canSave
                    ? isNew
                      ? "bg-[#E8601C] hover:bg-[#D04D0A] text-white shadow-[0_2px_8px_rgba(232,96,28,0.40)]"
                      : "bg-[#E8601C] hover:bg-[#D04D0A] text-white shadow-[0_2px_8px_rgba(34,197,94,0.30)]"
                    : "bg-[#eee] text-[#bbb] cursor-not-allowed"}`}>
                {isNew ? "Create Campaign" : "Save Changes"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── CAMPAIGNS PAGE ───────────────────────────────────────────────────────────
function CampaignsPage({ t, dark, showModal, setShowModal, campaignTemplate, setCampaignTemplate }) {
  const [activeTab, setActiveTab]           = useState("active");
  const [search, setSearch]                 = useState("");
  const [campaigns, setCampaigns]           = useState(ACTIVE_CAMPAIGNS);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedIsReadOnly, setSelectedIsReadOnly] = useState(false);

  const addCampaign    = (c) => setCampaigns(prev => [c, ...prev]);
  const updateCampaign = (updated) => setCampaigns(prev => prev.map(c => c.id === updated.id ? updated : c));

  const openDetail = (c, readOnly = false) => { setSelectedCampaign(c); setSelectedIsReadOnly(readOnly); };

  const statusColor = {
    Active: "bg-[#E8601C] text-white",
    Paused: "bg-[#A84232] text-white",
    Draft:  dark ? "bg-[#333] text-[#888]" : "bg-[#ddd] text-[#666]",
  };

  const fmtVolume = (v) => v >= 1000 ? `${(v/1000).toFixed(v%1000===0?0:1)}k` : String(v);

  const filteredActive = campaigns.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.target.toLowerCase().includes(search.toLowerCase())
  );
  const filteredHistorical = HISTORICAL_CAMPAIGNS.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase())
  );

  const COL_ACTIVE = "2.6fr 1.4fr 1.1fr 1.3fr 0.7fr";
  const COL_HIST   = "2.6fr 1.4fr 1.1fr 1.3fr";

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* ── Header ── */}
      <div className={`shrink-0 border-b ${t.border} ${dark ? "bg-[#0e0e0e]" : "bg-[#252830]"}`}>
        {/* Title row */}
        <div className="flex items-center gap-3 px-6 pt-5 pb-3">
          <h2 className={`text-base font-bold ${t.text} flex-1`}>Campaigns</h2>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${t.border} ${dark ? "bg-[#161616]" : "bg-[#1A1D24]"}`} style={{ width: 160 }}>
            <Search className={`w-3.5 h-3.5 ${t.muted} shrink-0`} />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search…"
              className={`flex-1 bg-transparent text-xs outline-none ${t.text} min-w-0`} />
          </div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#E8601C] hover:bg-[#D04D0A] text-white transition-all shadow-[0_2px_8px_rgba(232,96,28,0.40)] hover:shadow-[0_3px_12px_rgba(232,96,28,0.55)] whitespace-nowrap shrink-0">
            <Plus className="w-3.5 h-3.5" />New Campaign
          </button>
        </div>

        {/* Tabs + utility buttons */}
        <div className="flex items-center px-6">
          {[
            { id: "active",     label: "Active Campaigns",      count: campaigns.length },
            { id: "historical", label: "Historical Performance", count: HISTORICAL_CAMPAIGNS.length },
          ].map(({ id, label, count }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold border-b-2 -mb-px transition-colors whitespace-nowrap
                ${activeTab === id ? "border-[#00897B] text-[#00897B]" : `border-transparent ${t.muted}`}`}>
              {label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold
                ${activeTab === id ? "bg-[#00897B]/15 text-[#00897B]" : dark ? "bg-white/[0.06] text-white/35" : "bg-gray-100 text-gray-400"}`}>
                {count}
              </span>
            </button>
          ))}
          <div className="flex-1" />
          {[
            { icon: Filter, label: "Filter" },
            { icon: SlidersHorizontal, label: "Sort" },
            { icon: Download, label: "Export" },
          ].map(({ icon: Icon, label }) => (
            <button key={label} className={`flex items-center gap-1.5 px-3 py-1.5 mb-0.5 rounded-lg text-xs font-medium border ${t.border} ${t.card} ${t.sub} ${t.hover} transition-colors`}>
              <Icon className="w-3.5 h-3.5" />{label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Table area ── */}
      <div className="flex-1 overflow-y-auto">
        {/* Table header */}
        <div className={`sticky top-0 z-10 border-b ${t.border} ${dark ? "bg-[#111]" : "bg-[#1A1D24]"}`}>
          <div style={{ display: "grid", gridTemplateColumns: activeTab === "active" ? COL_ACTIVE : COL_HIST }}
            className="px-6 py-2.5 gap-4">
            {(activeTab === "active"
              ? ["Campaign Name", "Matching Strategy", "Matched Volume", "Success Rate", "Status"]
              : ["Campaign Name", "Matching Strategy", "Matched Volume", "Success Rate"]
            ).map(h => (
              <div key={h} className={`text-[10px] font-bold uppercase tracking-wider ${t.muted}`}>{h}</div>
            ))}
          </div>
        </div>

        {/* Rows */}
        {activeTab === "active" ? (
          filteredActive.map((c, i) => (
            <div key={c.id}
              onClick={() => openDetail(c, false)}
              style={{ display: "grid", gridTemplateColumns: COL_ACTIVE }}
              className={`px-6 py-3.5 gap-4 items-center cursor-pointer transition-colors ${t.hover} ${i < filteredActive.length - 1 ? `border-b ${t.border}` : ""}`}>
              {/* Campaign Name */}
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`w-2 h-2 rounded-full shrink-0 ${dark ? "bg-[#444]" : "bg-[#ccc]"}`} />
                <div className="min-w-0">
                  <div className={`text-xs font-semibold ${t.text} truncate`}>{c.name}</div>
                  <div className={`text-[10px] ${t.muted} mt-0.5`}>{c.target} · {c.contact}</div>
                </div>
              </div>
              {/* Matching Strategy */}
              <div className={`text-xs ${t.sub}`}>{c.strategy}</div>
              {/* Matched Volume */}
              <div>
                <span className={`text-xs font-bold ${t.text}`}>{c.volume.toLocaleString()}</span>
                <span className={`text-xs ${t.muted}`}> Units</span>
              </div>
              {/* Success Rate */}
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${c.successRate > 0 ? "text-[#E8601C]" : t.muted}`}>
                  {c.successRate > 0 ? `${c.successRate}%` : "—"}
                </span>
                {c.successRate > 0 && (
                  <div className={`flex-1 h-1.5 rounded-full overflow-hidden max-w-[80px] ${dark ? "bg-[#252525]" : "bg-[#2A2D38]"}`}>
                    <div className="h-full rounded-full bg-[#E8601C]" style={{ width: `${c.successRate}%` }} />
                  </div>
                )}
              </div>
              {/* Status */}
              <div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide ${statusColor[c.status]}`}>
                  {c.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          filteredHistorical.map((c, i) => (
            <div key={c.id}
              onClick={() => openDetail(c, true)}
              style={{ display: "grid", gridTemplateColumns: COL_HIST }}
              className={`px-6 py-3.5 gap-4 items-center cursor-pointer transition-colors ${t.hover} ${i < filteredHistorical.length - 1 ? `border-b ${t.border}` : ""}`}>
              {/* Campaign Name */}
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`w-2 h-2 rounded-full shrink-0 ${dark ? "bg-[#444]" : "bg-[#ccc]"}`} />
                <div className={`text-xs font-semibold ${t.text} truncate`}>{c.name}</div>
              </div>
              {/* Matching Strategy */}
              <div className={`text-xs ${t.sub}`}>{c.strategy}</div>
              {/* Matched Volume */}
              <div>
                <span className={`text-xs font-bold ${t.text}`}>{c.volume.toLocaleString()}</span>
                <span className={`text-xs ${t.muted}`}> Units</span>
              </div>
              {/* Success Rate */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#E8601C]">{c.successRate}%</span>
                <div className={`flex-1 h-1.5 rounded-full overflow-hidden max-w-[100px] ${dark ? "bg-[#252525]" : "bg-[#2A2D38]"}`}>
                  <div className="h-full rounded-full bg-[#E8601C]" style={{ width: `${c.successRate}%` }} />
                </div>
              </div>
            </div>
          ))
        )}

        {/* Empty state */}
        {((activeTab === "active" && filteredActive.length === 0) || (activeTab === "historical" && filteredHistorical.length === 0)) && (
          <div className={`flex flex-col items-center justify-center py-16 ${t.muted}`}>
            <Search className="w-8 h-8 mb-3 opacity-30" />
            <div className="text-sm font-medium">No campaigns match your search</div>
          </div>
        )}
      </div>

      {/* ── Unified Campaign Modal — new from header/chat ── */}
      {showModal && (
        <CampaignModal
          t={t}
          campaign={campaignTemplate || null}
          isNew={true}
          readOnly={false}
          onClose={() => { setShowModal(false); setCampaignTemplate?.(null); }}
          onSave={addCampaign} />
      )}

      {/* ── Unified Campaign Modal — opened from row click ── */}
      {selectedCampaign && (
        <CampaignModal
          t={t}
          campaign={selectedCampaign}
          isNew={false}
          readOnly={selectedIsReadOnly}
          onClose={() => setSelectedCampaign(null)}
          onSave={updateCampaign} />
      )}
    </div>
  );
}

// ─── CORPORATE DETAIL PAGE ───────────────────────────────────────────────────

const CORP_JOURNEY_STAGES = [
  { id:"lead",      label:"Lead"            },
  { id:"qualified", label:"Qualified"       },
  { id:"nda",       label:"NDA Signed"      },
  { id:"mou",       label:"MOU Signed"      },
  { id:"contract",  label:"Contract Signed" },
  { id:"po",        label:"PO Issued"       },
  { id:"onboarded", label:"Onboarded"       },
];

const STAGE_TO_STEP = { "Prospect":0, "Qualified":1, "Negotiating":3, "Closed":6 };

const CORP_DOCS = [
  {
    stage:"nda", label:"Non-Disclosure Agreement", abbr:"NDA",
    file:"NDA_Template_Qatalyst_v3.pdf", size:"84 KB",
    desc:"Mutual NDA covering carbon credit procurement discussions and proprietary data exchange.",
    ai:"Standard mutual NDA template pre-approved by legal. Typical turnaround: 2–3 business days.",
  },
  {
    stage:"mou", label:"Memorandum of Understanding", abbr:"MOU",
    file:"MOU_Template_CarbonCredit_v2.pdf", size:"120 KB",
    desc:"Non-binding agreement outlining intent, volume targets, price range and project preferences.",
    ai:"AI can pre-fill volume and project preferences from Discovery data. Recommend including co-benefits clauses.",
  },
  {
    stage:"contract", label:"Commercial Contract", abbr:"Contract",
    file:"CommercialContract_Template_v4.docx", size:"240 KB",
    desc:"Binding purchase agreement with delivery schedules, retirement commitments and representations.",
    ai:"3 clauses in previous version flagged for legal review. Carbon delivery schedule linked to vintage availability.",
  },
  {
    stage:"po", label:"Purchase Order", abbr:"PO",
    file:"PurchaseOrder_Template_v1.xlsx", size:"56 KB",
    desc:"Formal purchase order referencing contract terms and specifying exact vintage and registry details.",
    ai:"PO can be auto-generated from contract terms. Registry transfer instructions to be included.",
  },
  {
    stage:"invoice", label:"Invoice", abbr:"Invoice",
    file:"Invoice_Template_Qatalyst.pdf", size:"48 KB",
    desc:"Commercial invoice with credit details, retirement confirmation and regulatory compliance summary.",
    ai:"Invoice auto-generation enabled. Retirement confirmation from Verra / Gold Standard auto-attached on settlement.",
  },
];

const STEP_DOCS = {
  0:[], 1:[], 2:["nda"], 3:["nda","mou"],
  4:["nda","mou","contract"], 5:["nda","mou","contract","po"],
  6:["nda","mou","contract","po","invoice"],
};

const CORP_AGENT_INIT = (corp) => [
  `Document completeness check initiated for ${corp.company||corp.name}`,
  "NDA status: Template available — awaiting execution",
  "Scanning corporate regulatory filings for carbon commitment data...",
  `ESG score verified: ${corp.esg||"N/A"} — High confidence`,
  `Contact enrichment: LinkedIn profile verified for ${corp.contact?.name||"contact"}`,
  "Recommended next action: Send NDA for countersignature",
];

function CorporateDetailPage({ corp, onBack, t }) {
  const step     = STAGE_TO_STEP[corp.stage] ?? 0;
  const doneDocs = STEP_DOCS[step] || [];
  const nextDocIdx = CORP_DOCS.findIndex(d => !doneDocs.includes(d.stage));

  const [log, setLog] = useState(() =>
    CORP_AGENT_INIT(corp).map((text, i) => ({ ts: `09:1${i}`, text }))
  );

  useEffect(() => {
    const extra = [
      `Market rate check: spot price within procurement range for ${corp.need||"stated need"}`,
      "Auto-drafting MOU pre-fill from Discovery intelligence...",
      `Cross-referencing ${corp.company||corp.name} with registry retirement records...`,
      "Volume alignment confirmed: inventory available across 3 projects",
      "Compliance check: no sanctioned entity flags detected",
      "AI recommendation: accelerate to next stage — high close probability",
    ];
    let i = 0;
    const iv = setInterval(() => {
      if (i >= extra.length) { clearInterval(iv); return; }
      const now = new Date();
      const ts = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
      setLog(prev => [...prev.slice(-9), { ts, text: extra[i++] }]);
    }, 3500);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minHeight:0, background:"var(--c-bg3)" }}>

      {/* ── Header ── */}
      <div style={{ flexShrink:0, padding:"13px 20px", borderBottom:"1px solid var(--c-border2)", background:"var(--c-card2)", display:"flex", alignItems:"center", gap:12 }}>
        <button onClick={onBack}
          style={{ padding:"6px 12px", borderRadius:8, background:"var(--c-card3)", border:"1px solid var(--c-border2)", color:"var(--c-sub)", fontSize:11, fontWeight:600, cursor:"pointer" }}>
          ← Back
        </button>
        <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#E8601C,#A84232)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:"var(--c-text)", flexShrink:0 }}>
          {(corp.company||corp.name||"?").slice(0,2).toUpperCase()}
        </div>
        <div>
          <div style={{ fontSize:14, fontWeight:800, color:"var(--c-text)" }}>{corp.flag} {corp.company||corp.name}</div>
          <div style={{ fontSize:11, color:"var(--c-muted)" }}>{corp.industry||"Corporate"}{corp.ticker ? ` · ${corp.ticker}` : ""}</div>
        </div>
        <span style={{ fontSize:10, padding:"3px 10px", borderRadius:999, fontWeight:700, background:"rgba(232,96,28,0.12)", color:"#E8601C", border:"1px solid rgba(232,96,28,0.25)" }}>
          {corp.stage||"Prospect"}
        </span>
        <div style={{ flex:1 }} />
        <div style={{ fontSize:11, color:"var(--c-muted)", marginRight:10 }}>ESG <span style={{ color:"#80CBC4", fontWeight:700 }}>{corp.esg||"—"}</span></div>
        <div style={{ fontSize:11, color:"var(--c-muted)" }}>Match Score <span style={{ color:"#E8601C", fontWeight:700 }}>{corp.score||"—"}</span></div>
      </div>

      {/* ── Journey Stepper ── */}
      <div style={{ flexShrink:0, padding:"14px 28px 10px", borderBottom:"1px solid var(--c-border2)", background:"var(--c-card2)" }}>
        <div style={{ display:"flex", alignItems:"center" }}>
          {CORP_JOURNEY_STAGES.map((s, idx) => (
            <div key={s.id} style={{ display:"flex", alignItems:"center", flex: idx < CORP_JOURNEY_STAGES.length-1 ? 1 : "none" }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:5, flexShrink:0 }}>
                <div style={{
                  width:30, height:30, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
                  background: idx < step ? "#2D3C29" : idx === step ? "#E8601C" : "#1D2028",
                  border: idx < step ? "2px solid #4A7040" : idx === step ? "2px solid #E8601C" : "2px solid var(--c-border2)",
                  color: idx < step ? "#80CBC4" : idx === step ? "#fff" : "rgba(255,255,255,0.2)",
                  fontSize:11, fontWeight:800, flexShrink:0,
                  boxShadow: idx === step ? "0 0 14px rgba(232,96,28,0.45)" : "none",
                }}>
                  {idx < step ? "✓" : idx+1}
                </div>
                <div style={{ fontSize:9, fontWeight:600, whiteSpace:"nowrap", color: idx < step ? "#80CBC4" : idx === step ? "#E8601C" : "rgba(255,255,255,0.25)" }}>{s.label}</div>
              </div>
              {idx < CORP_JOURNEY_STAGES.length-1 && (
                <div style={{ flex:1, height:2, margin:"0 5px 18px", background: idx < step ? "#4A7040" : "#2A2D38", minWidth:6 }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ flex:1, display:"flex", minHeight:0, overflow:"hidden" }}>

        {/* Left scrollable content */}
        <div style={{ flex:1, overflowY:"auto", padding:"20px 20px 28px" }}>

          {/* Contact Card */}
          <div style={{ background:"var(--c-card3)", border:"1px solid var(--c-border2)", borderRadius:16, padding:"16px 20px", marginBottom:16, display:"flex", alignItems:"center", gap:16 }}>
            <div style={{ width:54, height:54, borderRadius:14, background:"var(--c-card2)", border:"2px solid #E8601C", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:800, color:"#E8601C", flexShrink:0 }}>
              {(corp.contact?.name||"?").split(" ").map(n=>n[0]).join("").slice(0,2)}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:14, fontWeight:800, color:"var(--c-text)", marginBottom:2 }}>{corp.contact?.name||"—"}</div>
              <div style={{ fontSize:11, color:"var(--c-sub)", marginBottom:10 }}>{corp.contact?.title||""}</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                <a href={corp.contact?.url||"#"} target="_blank" rel="noopener noreferrer"
                  style={{ display:"flex", alignItems:"center", gap:5, fontSize:10, fontWeight:700, padding:"5px 11px", borderRadius:8, background:"rgba(10,102,194,0.15)", border:"1px solid rgba(10,102,194,0.35)", color:"#5BA3D9", textDecoration:"none" }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  View LinkedIn
                </a>
                <button style={{ display:"flex", alignItems:"center", gap:5, fontSize:10, fontWeight:700, padding:"5px 11px", borderRadius:8, background:"rgba(232,96,28,0.12)", border:"1px solid rgba(232,96,28,0.28)", color:"#E8601C", cursor:"pointer" }}>
                  <Mail style={{ width:11, height:11 }} />Send Email
                </button>
                <button style={{ display:"flex", alignItems:"center", gap:5, fontSize:10, fontWeight:700, padding:"5px 11px", borderRadius:8, background:"rgba(42,45,56,0.8)", border:"1px solid var(--c-border2)", color:"var(--c-sub)", cursor:"pointer" }}>
                  <Phone style={{ width:11, height:11 }} />Schedule Call
                </button>
              </div>
            </div>
            <div style={{ textAlign:"right", flexShrink:0, paddingLeft:8 }}>
              <div style={{ fontSize:10, color:"var(--c-muted)", marginBottom:2 }}>Carbon Need</div>
              <div style={{ fontSize:16, fontWeight:800, color:"#E8601C", marginBottom:4 }}>{corp.need||"—"}</div>
              <div style={{ fontSize:10, color:"var(--c-muted)", lineHeight:1.5, maxWidth:160 }}>{corp.commitment||""}</div>
              {corp.emissions && <div style={{ fontSize:10, color:"var(--c-muted)", marginTop:4 }}>{corp.emissions}/yr</div>}
            </div>
          </div>

          {/* Intelligence Signals */}
          {corp.signals?.length > 0 && (
            <div style={{ background:"var(--c-card3)", border:"1px solid var(--c-border2)", borderRadius:16, padding:"14px 18px", marginBottom:16 }}>
              <div style={{ fontSize:10, fontWeight:700, color:"var(--c-muted)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>Intelligence Signals</div>
              {corp.signals.map((sig, i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom: i < corp.signals.length-1 ? 8 : 0 }}>
                  <div style={{ width:5, height:5, borderRadius:"50%", background:"#E8601C", marginTop:5, flexShrink:0 }} />
                  <div style={{ fontSize:11, color:"var(--c-sub)", lineHeight:1.55 }}>{sig}</div>
                </div>
              ))}
            </div>
          )}

          {/* Agentic Document Management */}
          <div style={{ background:"var(--c-card3)", border:"1px solid var(--c-border2)", borderRadius:16, overflow:"hidden" }}>
            {/* Section header */}
            <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--c-border2)", display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:30, height:30, borderRadius:9, background:"rgba(232,96,28,0.12)", border:"1px solid rgba(232,96,28,0.22)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Brain style={{ width:14, height:14, color:"#E8601C" }} />
              </div>
              <div>
                <div style={{ fontSize:12, fontWeight:800, color:"var(--c-text)" }}>Agentic Document Management</div>
                <div style={{ fontSize:10, color:"var(--c-muted)" }}>AI-driven collection &amp; review across the deal lifecycle</div>
              </div>
              <div style={{ flex:1 }} />
              <span style={{ fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:999, background:"rgba(45,60,41,0.35)", border:"1px solid rgba(74,112,64,0.3)", color:"#80CBC4" }}>
                {doneDocs.length}/{CORP_DOCS.length} Complete
              </span>
            </div>

            {/* Document rows */}
            {CORP_DOCS.map((doc, i) => {
              const done  = doneDocs.includes(doc.stage);
              const isNext = !done && i === nextDocIdx;
              return (
                <div key={doc.stage} style={{
                  padding:"16px 20px",
                  borderBottom: i < CORP_DOCS.length-1 ? "1px solid var(--c-border2)" : "none",
                  background: isNext ? "rgba(232,96,28,0.04)" : "transparent",
                  display:"flex", gap:14, alignItems:"flex-start",
                }}>
                  {/* Status icon */}
                  <div style={{
                    width:34, height:34, borderRadius:10, flexShrink:0, marginTop:2,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    background: done ? "rgba(45,60,41,0.45)" : isNext ? "rgba(232,96,28,0.15)" : "#1D2028",
                    border: done ? "1px solid rgba(74,112,64,0.45)" : isNext ? "1px solid rgba(232,96,28,0.35)" : "1px solid var(--c-border2)",
                  }}>
                    {done ? <span style={{ fontSize:14, color:"#80CBC4" }}>✓</span>
                          : isNext ? <span style={{ fontSize:11, color:"#E8601C" }}>▶</span>
                          : <Lock style={{ width:12, height:12, color:"var(--c-muted)" }} />}
                  </div>

                  <div style={{ flex:1, minWidth:0 }}>
                    {/* Title row */}
                    <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:5, flexWrap:"wrap" }}>
                      <span style={{ fontSize:12, fontWeight:700, color: done ? "#80CBC4" : isNext ? "#fff" : "rgba(255,255,255,0.28)" }}>{doc.label}</span>
                      <span style={{ fontSize:9, fontWeight:700, padding:"1px 6px", borderRadius:4, background:"rgba(42,45,56,0.8)", border:"1px solid var(--c-border2)", color:"var(--c-muted)" }}>{doc.abbr}</span>
                      {done   && <span style={{ fontSize:9, fontWeight:700, padding:"2px 7px", borderRadius:999, background:"rgba(45,60,41,0.4)", border:"1px solid rgba(74,112,64,0.4)", color:"#80CBC4" }}>SIGNED</span>}
                      {isNext && <span style={{ fontSize:9, fontWeight:700, padding:"2px 7px", borderRadius:999, background:"rgba(232,96,28,0.12)", border:"1px solid rgba(232,96,28,0.3)", color:"#E8601C" }}>ACTION REQUIRED</span>}
                    </div>

                    {/* Description */}
                    <div style={{ fontSize:11, color:"var(--c-muted)", lineHeight:1.6, marginBottom:8 }}>{doc.desc}</div>

                    {/* AI note */}
                    <div style={{
                      fontSize:10, lineHeight:1.5, padding:"7px 10px", borderRadius:8, marginBottom:10,
                      background: isNext ? "rgba(232,96,28,0.07)" : "rgba(42,45,56,0.4)",
                      border: `1px solid ${isNext ? "rgba(232,96,28,0.18)" : "#2A2D38"}`,
                      color: isNext ? "rgba(232,96,28,0.85)" : "rgba(255,255,255,0.28)",
                    }}>
                      🤖 {doc.ai}
                    </div>

                    {/* Action buttons */}
                    <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
                      {done ? (
                        <>
                          <button style={{ display:"flex", alignItems:"center", gap:4, fontSize:10, fontWeight:600, padding:"5px 12px", borderRadius:7, background:"rgba(45,60,41,0.3)", border:"1px solid rgba(74,112,64,0.4)", color:"#80CBC4", cursor:"pointer" }}>
                            <Eye style={{ width:10, height:10 }} />View Signed
                          </button>
                          <button style={{ display:"flex", alignItems:"center", gap:4, fontSize:10, fontWeight:600, padding:"5px 12px", borderRadius:7, background:"rgba(42,45,56,0.8)", border:"1px solid var(--c-border2)", color:"var(--c-muted)", cursor:"pointer" }}>
                            <Download style={{ width:10, height:10 }} />Download
                          </button>
                        </>
                      ) : (
                        <>
                          <button style={{
                            display:"flex", alignItems:"center", gap:4, fontSize:10, fontWeight:600, padding:"5px 12px", borderRadius:7,
                            cursor: isNext ? "pointer" : "not-allowed",
                            background: isNext ? "rgba(232,96,28,0.12)" : "rgba(42,45,56,0.5)",
                            border: isNext ? "1px solid rgba(232,96,28,0.35)" : "1px solid var(--c-border2)",
                            color: isNext ? "#E8601C" : "rgba(255,255,255,0.18)",
                          }}>
                            <Download style={{ width:10, height:10 }} />
                            {doc.file} <span style={{ opacity:0.55, marginLeft:3 }}>({doc.size})</span>
                          </button>
                          {isNext && (
                            <button style={{ display:"flex", alignItems:"center", gap:4, fontSize:10, fontWeight:600, padding:"5px 12px", borderRadius:7, background:"rgba(232,96,28,0.14)", border:"1px solid rgba(232,96,28,0.3)", color:"#E8601C", cursor:"pointer" }}>
                              <Sparkles style={{ width:10, height:10 }} />AI Auto-Fill
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Right Agent Sidebar ── */}
        <div style={{ width:284, flexShrink:0, borderLeft:"1px solid var(--c-border2)", display:"flex", flexDirection:"column", background:"var(--c-card2)", overflow:"hidden" }}>

          {/* Agent badge */}
          <div style={{ padding:"14px 16px", borderBottom:"1px solid var(--c-border2)", flexShrink:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:"#4ade80", boxShadow:"0 0 6px rgba(74,222,128,0.5)" }} />
              <span style={{ fontSize:11, fontWeight:700, color:"var(--c-text)" }}>HYPERION_NODE</span>
              <span style={{ fontSize:9, padding:"2px 6px", borderRadius:999, background:"rgba(74,222,128,0.1)", color:"#4ade80", border:"1px solid rgba(74,222,128,0.2)", fontWeight:700 }}>ACTIVE</span>
            </div>
            <div style={{ fontSize:10, color:"var(--c-muted)", lineHeight:1.5 }}>Monitoring deal progress and document compliance for this corporate.</div>
          </div>

          {/* AI Analysis */}
          <div style={{ padding:"12px 16px", borderBottom:"1px solid var(--c-border2)", flexShrink:0 }}>
            <div style={{ fontSize:10, fontWeight:700, color:"var(--c-muted)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>AI Analysis</div>

            <div style={{ background:"rgba(232,96,28,0.08)", border:"1px solid rgba(232,96,28,0.2)", borderRadius:10, padding:"10px 12px", marginBottom:8 }}>
              <div style={{ fontSize:11, fontWeight:700, color:"#E8601C", marginBottom:6 }}>Close Probability</div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ flex:1, height:6, borderRadius:3, background:"var(--c-card3)", overflow:"hidden" }}>
                  <div style={{ width:`${corp.score||70}%`, height:"100%", background:"linear-gradient(90deg,#E8601C,#A84232)", borderRadius:3 }} />
                </div>
                <span style={{ fontSize:14, fontWeight:800, color:"#E8601C", minWidth:34 }}>{corp.score||70}%</span>
              </div>
            </div>

            <div style={{ background:"rgba(45,60,41,0.2)", border:"1px solid rgba(74,112,64,0.2)", borderRadius:10, padding:"10px 12px", marginBottom:8 }}>
              <div style={{ fontSize:11, fontWeight:700, color:"#80CBC4", marginBottom:6 }}>Doc Completeness</div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ flex:1, height:6, borderRadius:3, background:"var(--c-card3)", overflow:"hidden" }}>
                  <div style={{ width:`${Math.round(doneDocs.length/CORP_DOCS.length*100)}%`, height:"100%", background:"linear-gradient(90deg,#4A7040,#80CBC4)", borderRadius:3 }} />
                </div>
                <span style={{ fontSize:14, fontWeight:800, color:"#80CBC4", minWidth:34 }}>{Math.round(doneDocs.length/CORP_DOCS.length*100)}%</span>
              </div>
            </div>

            <div style={{ background:"rgba(168,66,50,0.1)", border:"1px solid rgba(168,66,50,0.2)", borderRadius:10, padding:"10px 12px" }}>
              <div style={{ fontSize:11, fontWeight:700, color:"#E8A080", marginBottom:4 }}>Deal Risk</div>
              <div style={{ fontSize:10, color:"var(--c-sub)", lineHeight:1.5 }}>
                {corp.warmth === "cold"
                  ? "⚠ Low engagement — consider outreach acceleration"
                  : corp.warmth === "warm"
                  ? "• Moderate engagement — maintain momentum"
                  : "✓ High engagement — strong buying signals detected"}
              </div>
            </div>
          </div>

          {/* Live agent log */}
          <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}>
            <div style={{ padding:"10px 16px 6px", flexShrink:0 }}>
              <div style={{ fontSize:10, fontWeight:700, color:"var(--c-muted)", textTransform:"uppercase", letterSpacing:"0.08em" }}>Live Agent Log</div>
            </div>
            <div style={{ flex:1, overflowY:"auto", padding:"0 16px 12px" }}>
              {log.map((l, i) => (
                <div key={i} style={{ fontSize:9.5, color: i === log.length-1 ? "rgba(232,96,28,0.9)" : "rgba(255,255,255,0.35)", lineHeight:1.7, fontFamily:"'Courier New',monospace" }}>
                  <span style={{ color:"var(--c-muted)" }}>[{l.ts}]</span> {l.text}
                </div>
              ))}
              <div style={{ fontSize:9, color:"rgba(232,96,28,0.5)" }}>█</div>
            </div>
          </div>

          {/* CTA button */}
          <div style={{ padding:"12px 16px", borderTop:"1px solid var(--c-border2)", flexShrink:0 }}>
            <button style={{ width:"100%", padding:"10px 12px", borderRadius:10, background:"linear-gradient(135deg,#E8601C,#A84232)", border:"none", color:"var(--c-text)", fontSize:11, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6, boxShadow:"0 2px 14px rgba(232,96,28,0.35)" }}>
              <Sparkles style={{ width:12, height:12 }} />
              {nextDocIdx >= 0 ? `AI: Send ${CORP_DOCS[nextDocIdx]?.abbr} Now` : "✓ All Documents Complete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CLIENT MANAGEMENT PAGE ──────────────────────────────────────────────────

function ClientsPage({ t, dark, pipeline, setPage }) {
  const [tab, setTab] = useState("corporates");
  const [selectedCorporate, setSelectedCorporate] = useState(null);

  const corporates = pipeline.filter(p => p.type === "demand");
  const projects   = pipeline.filter(p => p.type === "supply");

  if (selectedCorporate) {
    return <CorporateDetailPage corp={selectedCorporate} onBack={() => setSelectedCorporate(null)} t={t} />;
  }

  const stageColor = (stage) => {
    if (stage === "Closed")      return "bg-[#2D3C29]/30 text-[#80CBC4] border-[#2D3C29]/60";
    if (stage === "Negotiating") return "bg-[#E8601C]/10 text-[#E8601C] border-[#E8601C]/25";
    if (stage === "Qualified")   return "bg-[#A84232]/15 text-[#E8A080] border-[#A84232]/35";
    return "bg-[#252830] text-white/45 border-[#2A2D38]";
  };

  const warmthDot = (w) => w === "hot" ? "bg-[#E8601C]" : w === "warm" ? "bg-[#A84232]" : "bg-[#2A2D38]";

  function EmptyState({ icon, label, action }) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className={`w-14 h-14 rounded-2xl ${t.card} border flex items-center justify-center`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="text-center">
          <div className={`text-sm font-bold ${t.text} mb-1`}>No {label} yet</div>
          <div className={`text-xs ${t.muted} max-w-xs leading-relaxed`}>
            Go to <span className="text-[#E8601C] font-semibold">Discovery</span> and click <span className="text-[#E8601C] font-semibold">Add to Pipeline</span> on any {label.toLowerCase()} to track them here.
          </div>
        </div>
        <button onClick={() => setPage("discovery")}
          className="px-4 py-2 rounded-lg text-xs font-bold bg-[#00897B] hover:bg-[#00796B] text-white transition-colors">
          → Go to Discovery
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* ── Stats row ── */}
      <div className="grid grid-cols-4 gap-3 p-4 pb-0 shrink-0">
        {[
          { label: "Corporates",      value: corporates.length, icon: Building2,  color: "text-[#E8601C]", bg: "bg-[#E8601C]/10" },
          { label: "Projects",        value: projects.length,   icon: TreePine,   color: "text-[#80CBC4]", bg: "bg-[#2D3C29]/25" },
          { label: "Total in Pipeline", value: pipeline.length, icon: Briefcase,  color: "text-[#E8601C]", bg: "bg-[#E8601C]/10" },
          { label: "Active Stages",   value: pipeline.filter(p=>p.stage!=="Prospect").length, icon: TrendingUp, color:"text-[#80CBC4]", bg:"bg-[#2D3C29]/25" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`rounded-xl p-3.5 ${t.card} border flex items-center gap-3`}>
            <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <div>
              <div className={`text-xl font-black ${t.text} leading-none`}>{value}</div>
              <div className={`text-xs ${t.sub} mt-0.5`}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Tab bar ── */}
      <div className={`flex items-center border-b ${t.border} px-4 mt-4 shrink-0`}>
        {[
          { id:"corporates", label:"Corporates", count: corporates.length, icon: Building2 },
          { id:"projects",   label:"Projects",   count: projects.length,   icon: TreePine  },
        ].map(({ id, label, count, icon: Icon }) => (
          <button key={id} onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 -mb-px transition-colors
              ${tab === id ? "border-[#00897B] text-[#00897B]" : `border-transparent ${t.muted} hover:${dark?"text-white/70":"text-gray-600"}`}`}>
            <Icon className="w-3.5 h-3.5" />
            {label}
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold min-w-[18px] text-center
              ${tab === id ? "bg-[#00897B]/15 text-[#00897B]" : dark?"bg-white/[0.06] text-white/35":"bg-gray-100 text-gray-400"}`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <div className="flex-1 overflow-y-auto p-4">

        {/* ══ CORPORATES TAB ══ */}
        {tab === "corporates" && (
          corporates.length === 0
            ? <EmptyState icon="🏢" label="Corporates" action="Add a corporate" />
            : (
              <div className={`rounded-2xl ${t.card} border overflow-hidden`}>
                <div className={`grid px-4 py-2.5 border-b ${t.border} bg-[#1A1D24]`}
                  style={{ gridTemplateColumns:"2fr 1.4fr 1.2fr 1fr 1.2fr auto" }}>
                  {["Company","Commitment","Carbon Need","Stage","Contact","Actions"].map(h => (
                    <div key={h} className={`text-[10px] font-bold uppercase tracking-wide ${t.muted}`}>{h}</div>
                  ))}
                </div>
                {corporates.map((c, i) => (
                  <div key={`${c.type}-${c.id}-${i}`}
                    onClick={() => setSelectedCorporate(c)}
                    className={`grid px-4 py-3.5 items-center ${t.hover} cursor-pointer ${i < corporates.length-1 ? `border-b ${t.border}` : ""}`}
                    style={{ gridTemplateColumns:"2fr 1.4fr 1.2fr 1fr 1.2fr auto" }}>

                    {/* Company */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E8601C] to-[#A84232] flex items-center justify-center text-[10px] font-black text-white shrink-0 shadow-[0_2px_8px_rgba(232,96,28,0.25)]">
                        {(c.company||c.name||"?").slice(0,2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-bold ${t.text} truncate`}>{c.flag} {c.company || c.name}</span>
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${warmthDot(c.warmth)}`}/>
                        </div>
                        <div className={`text-[10px] ${t.muted} truncate`}>{c.industry || "Corporate"}</div>
                      </div>
                    </div>

                    {/* Commitment */}
                    <div className={`text-[10px] ${t.sub} leading-snug pr-3 truncate`}>{c.commitment || "Net Zero 2040"}</div>

                    {/* Need */}
                    <div>
                      <div className={`text-xs font-semibold text-[#E8601C]`}>{c.need || c.emissions || "—"}</div>
                    </div>

                    {/* Stage */}
                    <div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${stageColor(c.stage)}`}>
                        {c.stage || "Prospect"}
                      </span>
                    </div>

                    {/* Contact */}
                    <div className="min-w-0">
                      <div className={`text-[10px] font-semibold ${t.text} truncate`}>{c.contact?.name || "—"}</div>
                      <div className={`text-[10px] ${t.muted} truncate`}>{c.contact?.title || ""}</div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                      <button className={`p-1.5 rounded-lg ${t.hover} border ${t.border}`}>
                        <Mail className={`w-3 h-3 ${t.muted}`} />
                      </button>
                      <a href={c.contact?.url||"#"} target="_blank" rel="noopener noreferrer"
                        className={`p-1.5 rounded-lg ${t.hover} border ${t.border} flex items-center`}>
                        <ExternalLink className={`w-3 h-3 ${t.muted}`} />
                      </a>
                      <button className={`p-1.5 rounded-lg ${t.hover} border ${t.border}`}>
                        <MoreHorizontal className={`w-3 h-3 ${t.muted}`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
        )}

        {/* ══ PROJECTS TAB ══ */}
        {tab === "projects" && (
          projects.length === 0
            ? <EmptyState icon="🌿" label="Projects" action="Add a project" />
            : (
              <div className={`rounded-2xl ${t.card} border overflow-hidden`}>
                <div className={`grid px-4 py-2.5 border-b ${t.border} bg-[#1A1D24]`}
                  style={{ gridTemplateColumns:"2fr 1.3fr 1fr 1fr 1fr auto" }}>
                  {["Project","Type","Match Score","Agent Rating","Stage","Actions"].map(h => (
                    <div key={h} className={`text-[10px] font-bold uppercase tracking-wide ${t.muted}`}>{h}</div>
                  ))}
                </div>
                {projects.map((p, i) => {
                  const extra = PROJECT_EXTRAS[p.id];
                  return (
                    <div key={`${p.type}-${p.id}-${i}`}
                      className={`grid px-4 py-3.5 items-center ${t.hover} cursor-pointer ${i < projects.length-1 ? `border-b ${t.border}` : ""}`}
                      style={{ gridTemplateColumns:"2fr 1.3fr 1fr 1fr 1fr auto" }}>

                      {/* Project name */}
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 ${t.card} border`}>
                          {p.icon || "🌿"}
                        </div>
                        <div className="min-w-0">
                          <div className={`text-xs font-bold ${t.text} truncate`}>{p.name}</div>
                          <div className={`text-[10px] ${t.muted} truncate`}>{extra?.location || extra?.registry || "—"}</div>
                        </div>
                      </div>

                      {/* Type */}
                      <div className={`text-[10px] ${t.sub} pr-3 truncate`}>{p.type}</div>

                      {/* Match score */}
                      <div>
                        <MatchScoreBadge score={p.quality || 80} />
                      </div>

                      {/* Agent rating */}
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                          style={{ background: (p.agentCol||"#E8601C")+"18", color: p.agentCol||"#E8601C", borderColor: (p.agentCol||"#E8601C")+"35" }}>
                          {p.agent || "—"}
                        </span>
                      </div>

                      {/* Stage */}
                      <div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${stageColor(p.stage)}`}>
                          {p.stage || "Prospect"}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button className={`p-1.5 rounded-lg ${t.hover} border ${t.border}`}>
                          <Eye className={`w-3 h-3 ${t.muted}`} />
                        </button>
                        <button className={`p-1.5 rounded-lg ${t.hover} border ${t.border}`}>
                          <Download className={`w-3 h-3 ${t.muted}`} />
                        </button>
                        <button className={`p-1.5 rounded-lg ${t.hover} border ${t.border}`}>
                          <MoreHorizontal className={`w-3 h-3 ${t.muted}`} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
        )}
      </div>
    </div>
  );
}

// ─── DATA ROOM PAGE ───────────────────────────────────────────────────────────

const DATA_ROOM_FOLDERS = [
  {
    id: 1, name: "Carbon Project Documents", icon: "tree", count: 12, size: "84 MB",
    colorFn: (d) => d ? "bg-[#E8601C]/10 text-[#E8601C]" : "bg-[#2D3C29]/25 text-[#80CBC4]",
    files: [
      { name: "Amazon Rainforest REDD+ — VCS Certificate.pdf", size: "2.4 MB", date: "Mar 12", locked: false },
      { name: "Indonesia Blue Carbon — Project Design Document.pdf", size: "8.1 MB", date: "Feb 28", locked: false },
      { name: "Congo Basin REDD+ — Monitoring Report 2024.pdf", size: "5.3 MB", date: "Apr 1", locked: false },
      { name: "Kenya Turkana Wind — Gold Standard Certification.pdf", size: "1.8 MB", date: "Jan 15", locked: true },
    ],
  },
  {
    id: 2, name: "Term Sheets & Agreements", icon: "file", count: 8, size: "12 MB",
    colorFn: (d) => d ? "bg-[#E8601C]/10 text-[#E8601C]" : "bg-[#E8601C]/10 text-[#E8601C]",
    files: [
      { name: "Microsoft × Amazon REDD+ — Draft Term Sheet v2.docx", size: "320 KB", date: "Apr 18", locked: false },
      { name: "Amazon × Congo Basin — LOI Signed.pdf", size: "180 KB", date: "Apr 10", locked: false },
      { name: "Shell × Congo Basin — NDA Executed.pdf", size: "95 KB", date: "Mar 22", locked: true },
    ],
  },
  {
    id: 3, name: "Due Diligence", icon: "search", count: 15, size: "156 MB",
    colorFn: (d) => d ? "bg-sky-500/10 text-sky-400" : "bg-[#1A1D24] text-[#A0B8D0]",
    files: [
      { name: "Verra Registry — Current Project Status Report.pdf", size: "3.2 MB", date: "Apr 20", locked: false },
      { name: "ICVCM Core Carbon Principles — Assessment 2024.pdf", size: "12 MB", date: "Mar 5", locked: false },
      { name: "Gold Standard — SDG Impact Verification Report.pdf", size: "7.8 MB", date: "Feb 14", locked: true },
    ],
  },
  {
    id: 4, name: "Market Research", icon: "chart", count: 6, size: "28 MB",
    colorFn: (d) => d ? "bg-[#A84232]/10 text-amber-400" : "bg-[#A84232]/15 text-[#E8A080]",
    files: [
      { name: "Carbon Market Outlook 2025 — BloombergNEF.pdf", size: "9.4 MB", date: "Apr 5", locked: false },
      { name: "Voluntary Carbon Market Integrity Report Q1.pdf", size: "4.2 MB", date: "Apr 1", locked: false },
      { name: "Corporate Net-Zero Tracker — ECIU 2025.pdf", size: "6.1 MB", date: "Mar 30", locked: false },
    ],
  },
];

function DataRoomPage({ t, dark }) {
  const [activeFolder, setActiveFolder] = useState(null);

  const folderIconBg = (id) => {
    const f = DATA_ROOM_FOLDERS.find(f => f.id === id);
    return f ? f.colorFn(dark) : "";
  };

  const totalFiles = DATA_ROOM_FOLDERS.reduce((s, f) => s + f.count, 0);
  const totalSize  = "280 MB";

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Files",   value: totalFiles, icon: FileText,   color: t.aiAccent, bg: dark?"bg-[#E8601C]/10":"bg-[#E8601C]/10" },
          { label: "Folders",       value: DATA_ROOM_FOLDERS.length, icon: Folder, color: t.verified, bg: dark?"bg-[#E8601C]/10":"bg-[#2D3C29]/25" },
          { label: "Storage Used",  value: totalSize,  icon: FolderOpen, color: t.aiAccent, bg: dark?"bg-[#E8601C]/10":"bg-[#E8601C]/10" },
          { label: "Locked Files",  value: DATA_ROOM_FOLDERS.reduce((s,f)=>s+f.files.filter(x=>x.locked).length,0), icon: Lock, color: t.sub, bg: dark?"bg-[#252525]":"bg-[#1A1D24]" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`rounded-xl p-3.5 ${t.card} border flex items-center gap-3`}>
            <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center shrink-0`}><Icon className={`w-4 h-4 ${color}`} /></div>
            <div>
              <div className={`text-xl font-black ${t.text} leading-none`}>{value}</div>
              <div className={`text-xs ${t.sub} mt-0.5`}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${t.card} border flex-1 max-w-64`}>
          <Search className={`w-3.5 h-3.5 ${t.muted}`} />
          <input placeholder="Search files…" className={`bg-transparent text-xs flex-1 focus:outline-none ${t.text}`} />
        </div>
        <div className="flex-1" />
        <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#E8601C] hover:bg-[#D04D0A] text-white transition-colors`}>
          <Upload className="w-3 h-3" />Upload
        </button>
        <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${t.card} border ${t.sub} ${t.hover}`}>
          <Plus className="w-3 h-3" />New Folder
        </button>
      </div>

      {/* Folder grid + file list */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {DATA_ROOM_FOLDERS.map(folder => (
          <button key={folder.id} onClick={() => setActiveFolder(activeFolder === folder.id ? null : folder.id)}
            className={`rounded-2xl p-4 ${activeFolder === folder.id ? (dark?"bg-[#E8601C]/10 border-[#E8601C]/30":"bg-[#E8601C]/10 border-[#E8601C]/40") : `${t.card}`} border text-left transition-all ${t.cardHov}`}>
            <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center ${folderIconBg(folder.id)}`}>
              <Folder className="w-5 h-5" />
            </div>
            <div className={`text-xs font-bold ${t.text} leading-tight mb-1`}>{folder.name}</div>
            <div className={`text-[10px] ${t.muted}`}>{folder.count} files · {folder.size}</div>
          </button>
        ))}
      </div>

      {/* File list for active folder */}
      {activeFolder && (() => {
        const folder = DATA_ROOM_FOLDERS.find(f => f.id === activeFolder);
        return (
          <div className={`rounded-2xl ${t.card} border overflow-hidden`}>
            <div className={`px-4 py-3 border-b ${t.border} flex items-center gap-2 ${dark?"bg-[#141414]":"bg-[#1A1D24]"}`}>
              <Folder className={`w-4 h-4 ${t.aiAccent}`} />
              <span className={`text-xs font-bold ${t.text}`}>{folder.name}</span>
              <span className={t.tag}>{folder.files.length} files</span>
              <div className="flex-1" />
              <button className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg ${t.hover} border ${t.border} ${t.sub}`}>
                <Filter className="w-2.5 h-2.5" />Filter
              </button>
            </div>
            {folder.files.map((file, i) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-3 ${t.hover} cursor-pointer ${i < folder.files.length-1 ? `border-b ${t.border}` : ""}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${dark?"bg-[#2A2D38]":"bg-[#1A1D24]"} border ${t.border}`}>
                  {file.locked ? <Lock className={`w-3.5 h-3.5 ${t.muted}`} /> : <FileText className={`w-3.5 h-3.5 ${t.aiAccent}`} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-medium ${t.text} truncate`}>{file.name}</div>
                  <div className={`text-[10px] ${t.muted}`}>{file.size} · {file.date}</div>
                </div>
                {file.locked
                  ? <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#1A1D24] text-white/45 border border-[#2A2D38] font-semibold">NDA Required</span>
                  : <button className={`flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-lg ${t.hover} border ${t.border} ${t.sub}`}><Download className="w-2.5 h-2.5" />Download</button>
                }
              </div>
            ))}
          </div>
        );
      })()}
    </div>
  );
}

// ─── AGENT TERMINAL ──────────────────────────────────────────────────────────

const AGENTS_DATA = [
  { id:"PROMETHEUS_04", code:"XA-4819", status:"ACTIVE",  icon:"⚙", successRate:99.2, trend:"up",   efficiency:0.84, markets:["EU_ETS","VCM"],         uptime:"142D 04H", lastActive:null,  desc:"High-frequency arbitrage scanner targeting EU registry price dislocations." },
  { id:"NEBULA_ALPHA",  code:"NX-1102", status:"PAUSED",  icon:"◈", successRate:94.7, trend:"flat", efficiency:0.71, markets:["GEO","CORSIA"],          uptime:null,       lastActive:"2H AGO", desc:"Cross-border offset verification engine for aviation sector compliance." },
  { id:"HYPERION_NODE", code:"HY-7721", status:"ACTIVE",  icon:"✦", successRate:97.1, trend:"up",   efficiency:1.12, markets:["REGEN_AG","BLUE_C"],     uptime:"12D 18H",  lastActive:null,  desc:"Nature-based solution matching engine with additionality scoring." },
  { id:"SOLARIS_V2",    code:"SL-3308", status:"ACTIVE",  icon:"◉", successRate:91.4, trend:"up",   efficiency:0.93, markets:["CAR","ACR"],             uptime:"28D 11H",  lastActive:null,  desc:"Solar and wind renewable energy certificate procurement optimizer." },
  { id:"TITAN_BATCH",   code:"TB-0055", status:"PAUSED",  icon:"▣", successRate:88.3, trend:"down", efficiency:0.61, markets:["CDM","UNFCCC"],          uptime:null,       lastActive:"6H AGO", desc:"Legacy CDM credit batch processor with Kyoto compatibility layer." },
];

const AGENT_LOG_TEMPLATES = [
  "[SCAN] Querying Verra registry API — endpoint /issuances",
  "[MATCH] Counterparty found: Microsoft Corp — confidence 0.94",
  "[PRICE] Spot price update: VCM nature-based → $18.40/tCO₂e",
  "[ARBIT] Price delta detected: EU_ETS vs ACR — spread +4.2%",
  "[VALID] Additionality check passed for project GAB-442",
  "[ALERT] New RFP detected: Shell PLC — 800K tCO₂e annual",
  "[SYNC] Registry sync complete — 1,204 new records ingested",
  "[OPT] Portfolio rebalance triggered — efficiency +0.03 XEF",
];

function AgentTerminalPage({ t, agents, setAgents }) {
  const [selectedAgent, setSelectedAgent]   = useState(null);
  const [scanBar, setScanBar]               = useState(Array.from({length:14},(_,i)=>({ v: 30+Math.random()*60, peak: i===6||i===10 })));
  const [logLines, setLogLines]             = useState([]);
  const [logIdx, setLogIdx]                 = useState(0);
  const [detailTab, setDetailTab]           = useState("overview");
  const [agentLog, setAgentLog]             = useState([]);
  const logRef = useRef(null);

  // Animate bar chart
  useEffect(() => {
    const id = setInterval(() => {
      setScanBar(prev => prev.map((b,i) => ({
        v: Math.max(15, Math.min(95, b.v + (Math.random()-0.48)*10)),
        peak: i === Math.floor(Date.now()/1200)%14,
      })));
    }, 1200);
    return () => clearInterval(id);
  }, []);

  // Rolling log lines
  useEffect(() => {
    const id = setInterval(() => {
      const ts = new Date().toLocaleTimeString("en-GB",{hour12:false});
      setLogLines(prev => [...prev.slice(-7), { ts, text: AGENT_LOG_TEMPLATES[logIdx % AGENT_LOG_TEMPLATES.length] }]);
      setLogIdx(i => i+1);
    }, 1400);
    return () => clearInterval(id);
  }, [logIdx]);

  // Per-agent log when detail open
  useEffect(() => {
    if (!selectedAgent) return;
    setAgentLog([]);
    const id = setInterval(() => {
      const ts = new Date().toLocaleTimeString("en-GB",{hour12:false});
      const lines = AGENT_LOG_TEMPLATES.filter(l => l.includes("SCAN")||l.includes("MATCH")||l.includes("PRICE")||l.includes("ARBIT"));
      setAgentLog(prev => [...prev.slice(-20), { ts, text: lines[Math.floor(Math.random()*lines.length)] }]);
      if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    }, 900);
    return () => clearInterval(id);
  }, [selectedAgent]);

  const totalVol    = "1.2M";
  const activeCnt   = agents.filter(a=>a.status==="ACTIVE").length;
  const fleetSuccess = (agents.reduce((s,a)=>s+a.successRate,0)/agents.length).toFixed(1);
  const latency     = 42;

  const toggleAgent = (ag) => {
    setAgents(prev => prev.map(a => a.id===ag.id ? {...a, status: a.status==="ACTIVE"?"PAUSED":"ACTIVE"} : a));
  };

  const STAT_ITEMS = [
    { key:"TOTAL_VOLUME",    val:totalVol,   unit:"tCO2e",  color:"#E8601C" },
    { key:"ACTIVE_SCANNERS", val:activeCnt,  unit:"NODES",  color:"#E8601C" },
    { key:"FLEET_SUCCESS",   val:fleetSuccess+"%", unit:null, color:"#E8601C" },
    { key:"SYSTEM_LATENCY",  val:latency,    unit:"MS",     color:"var(--c-text)"   },
  ];

  // ── Agent Detail Panel ──────────────────────────────────────────────────────
  if (selectedAgent) {
    const ag = agents.find(a=>a.id===selectedAgent) || agents[0];
    const perf = [
      { t:"MON", v:91 },{ t:"TUE", v:94 },{ t:"WED", v:88 },{ t:"THU", v:97 },
      { t:"FRI", v:96 },{ t:"SAT", v:92 },{ t:"SUN", v:ag.successRate },
    ];
    return (
      <div className="flex-1 overflow-y-auto p-5" style={{fontFamily:"'Inter',monospace"}}>
        {/* Back */}
        <button onClick={()=>setSelectedAgent(null)}
          className="flex items-center gap-2 text-[11px] font-mono text-[#E8601C] mb-5 hover:opacity-75 transition-opacity tracking-widest uppercase">
          ← BACK_TO_FLEET
        </button>

        {/* Agent Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded flex items-center justify-center text-2xl shrink-0"
            style={{background:"var(--c-card3)", border:"1px solid var(--c-border2)"}}>
            {ag.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-white font-black tracking-widest text-lg" style={{fontFamily:"monospace"}}>{ag.id}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-widest ${ag.status==="ACTIVE" ? "bg-[#E8601C]/20 text-[#E8601C] border border-[#E8601C]/40" : "bg-[#2A2D38] text-white/50 border border-[#3A3D4A]"}`}>
                {ag.status}
              </span>
              <span className="text-white/30 text-[10px] font-mono">ID: {ag.code}</span>
            </div>
            <p className="text-white/55 text-xs">{ag.desc}</p>
          </div>
          <button onClick={()=>toggleAgent(ag)}
            className="px-4 py-2 rounded text-xs font-bold tracking-widest transition-all"
            style={{background: ag.status==="ACTIVE"?"#A84232":"#E8601C", color:"var(--c-text)", fontFamily:"monospace"}}>
            {ag.status==="ACTIVE" ? "PAUSE_AGENT" : "RESUME_AGENT"}
          </button>
        </div>

        {/* Detail stats row */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {[
            { k:"SUCCESS_RATE",   v: ag.successRate+"%"    },
            { k:"EFFICIENCY",     v: ag.efficiency+" XEF"  },
            { k:"MARKET_SCOPE",   v: ag.markets.join(" / ")},
            { k:ag.uptime?"UPTIME":"LAST_ACTIVE", v: ag.uptime||ag.lastActive },
          ].map(({k,v}) => (
            <div key={k} className="rounded p-3" style={{background:"var(--c-card3)", border:"1px solid var(--c-border2)"}}>
              <div className="text-[9px] font-mono tracking-widest text-[#E8601C] mb-1">{k}</div>
              <div className="text-white font-black text-sm" style={{fontFamily:"monospace"}}>{v}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-4 border-b border-[#2A2D38]">
          {["OVERVIEW","ACTIVITY_LOG","CONFIGURATION"].map(tab => (
            <button key={tab} onClick={()=>setDetailTab(tab.toLowerCase().replace("_",""))}
              className={`px-4 py-2 text-[10px] font-mono tracking-widest transition-colors border-b-2 -mb-px ${detailTab===tab.toLowerCase().replace("_","") ? "border-[#00897B] text-[#00897B]" : "border-transparent text-white/40 hover:text-white/70"}`}>
              {tab}
            </button>
          ))}
        </div>

        {detailTab==="overview" && (
          <div className="grid grid-cols-2 gap-4">
            {/* Performance chart */}
            <div className="rounded p-4" style={{background:"var(--c-card3)", border:"1px solid var(--c-border2)"}}>
              <div className="text-[9px] font-mono tracking-widest text-[#E8601C] mb-3">WEEKLY_PERFORMANCE</div>
              <div className="h-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={perf} barSize={18}>
                    <XAxis dataKey="t" tick={{fill:"rgba(255,255,255,0.35)", fontSize:9, fontFamily:"monospace"}} axisLine={false} tickLine={false} />
                    <YAxis domain={[80,100]} tick={{fill:"rgba(255,255,255,0.35)", fontSize:9}} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{background:"var(--c-bg2)",border:"1px solid var(--c-border2)",color:"var(--c-text)",fontSize:11,fontFamily:"monospace"}} cursor={{fill:"rgba(232,96,28,0.08)"}} />
                    <Bar dataKey="v" radius={[3,3,0,0]}>
                      {perf.map((p,i)=><Cell key={i} fill={i===perf.length-1?"#E8601C":"#A84232"} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Market breakdown */}
            <div className="rounded p-4" style={{background:"var(--c-card3)", border:"1px solid var(--c-border2)"}}>
              <div className="text-[9px] font-mono tracking-widest text-[#E8601C] mb-3">MARKET_COVERAGE</div>
              <div className="space-y-3 mt-2">
                {ag.markets.map((m,i) => (
                  <div key={m}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[10px] font-mono text-white/60">{m}</span>
                      <span className="text-[10px] font-mono text-[#E8601C]">{70+i*12}%</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{background:"var(--c-border2)"}}>
                      <div className="h-full rounded-full" style={{width:`${70+i*12}%`, background:"#E8601C"}} />
                    </div>
                  </div>
                ))}
                <div className="pt-3 border-t border-[#2A2D38] mt-3">
                  <div className="text-[9px] font-mono text-white/30 tracking-widest mb-1">SOURCE_CODE</div>
                  <div className="text-[10px] font-mono text-white/50">{ag.code.replace("-","_")}_V3</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(detailTab==="activitylog"||detailTab==="overview") && detailTab==="activitylog" && (
          <div className="rounded p-4" style={{background:"var(--c-bg2)", border:"1px solid var(--c-border2)"}}>
            <div className="text-[9px] font-mono tracking-widest text-[#E8601C] mb-3 flex items-center gap-2">
              LIVE_ACTIVITY_LOG
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8601C] animate-pulse inline-block" />
            </div>
            <div ref={logRef} className="h-[280px] overflow-y-auto space-y-1 pr-1">
              {agentLog.map((l,i) => (
                <div key={i} className="flex gap-3 text-[10px] font-mono">
                  <span className="text-white/30 shrink-0">{l.ts}</span>
                  <span className={l.text.startsWith("[MATCH]")||l.text.startsWith("[ARBIT]") ? "text-[#E8601C]" : "text-white/55"}>{l.text}</span>
                </div>
              ))}
              {agentLog.length===0 && <div className="text-white/25 text-[10px] font-mono">Initializing feed…</div>}
            </div>
          </div>
        )}

        {detailTab==="configuration" && (
          <div className="rounded p-4" style={{background:"var(--c-card3)", border:"1px solid var(--c-border2)"}}>
            <div className="text-[9px] font-mono tracking-widest text-[#E8601C] mb-4">AGENT_CONFIG</div>
            <div className="space-y-3">
              {[
                { k:"SCAN_INTERVAL",     v:"450ms"              },
                { k:"MAX_LATENCY",       v:"200ms"              },
                { k:"CONFIDENCE_THRESH", v:"0.82"               },
                { k:"AUTO_EXECUTE",      v:"ENABLED"            },
                { k:"REGISTRY_TARGETS",  v:ag.markets.join(", ")},
                { k:"RISK_PROFILE",      v:"CONSERVATIVE"       },
                { k:"BUDGET_CAP",        v:"$500,000 / cycle"   },
              ].map(({k,v}) => (
                <div key={k} className="flex items-center justify-between py-2 border-b border-[#2A2D38]/60">
                  <span className="text-[10px] font-mono text-white/40 tracking-wider">{k}</span>
                  <span className="text-[10px] font-mono text-white font-bold">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Main Fleet View ─────────────────────────────────────────────────────────
  return (
    <div className="flex-1 overflow-y-auto p-5" style={{fontFamily:"'Inter',monospace"}}>
      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {STAT_ITEMS.map(({key,val,unit,color}) => (
          <div key={key} className="rounded p-4" style={{background:"var(--c-card3)", border:"1px solid var(--c-border2)"}}>
            <div className="text-[9px] font-mono tracking-widest text-[#E8601C] mb-2">{key}</div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-black text-2xl leading-none" style={{color, fontFamily:"monospace"}}>{val}</span>
              {unit && <span className="text-[10px] text-white/35 font-mono">{unit}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Section Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-white font-black text-base tracking-wide mb-1">Agent Fleet</h2>
          <p className="text-white/40 text-xs leading-relaxed max-w-md">
            Autonomous carbon liquidity scanners active across global registry protocols.
            Use the chat panel to deploy new agents or modify existing ones.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded text-[10px] font-mono text-[#E8601C] border border-[#E8601C]/20"
          style={{background:"rgba(232,96,28,0.08)"}}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8601C] animate-pulse" />
          {agents.filter(a=>a.status==="ACTIVE").length} AGENTS LIVE
        </div>
      </div>

      {/* Agent Cards */}
      <div className="space-y-2.5 mb-6">
        {agents.map(ag => (
          <div key={ag.id} onClick={()=>setSelectedAgent(ag.id)}
            className="rounded cursor-pointer transition-all hover:border-[#E8601C]/40 hover:shadow-[0_2px_12px_rgba(232,96,28,0.12)]"
            style={{background:"var(--c-card3)", border:`1px solid #2A2D38`, borderLeft:`3px solid ${ag.status==="ACTIVE"?"#E8601C":"#2A2D38"}`}}>
            <div className="flex items-center gap-4 p-4">
              {/* Icon */}
              <div className="w-11 h-11 rounded flex items-center justify-center text-xl shrink-0 relative"
                style={{background:"var(--c-card2)", border:"1px solid var(--c-border2)"}}>
                {ag.icon}
                <span className={`absolute top-0.5 right-0.5 w-2 h-2 rounded-full border-2 border-[#252830] ${ag.status==="ACTIVE"?"bg-[#E8601C]":"bg-[#3A3D4A]"}`} />
              </div>

              {/* Name + badge */}
              <div className="w-[180px] shrink-0">
                <div className="text-white font-black tracking-widest text-sm mb-1" style={{fontFamily:"monospace"}}>{ag.id}</div>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded tracking-widest ${ag.status==="ACTIVE" ? "bg-[#E8601C]/20 text-[#E8601C] border border-[#E8601C]/30" : "bg-[#2A2D38] text-white/40 border border-[#3A3D4A]"}`}>
                    {ag.status}
                  </span>
                  <span className="text-[9px] font-mono text-white/30">ID: {ag.code}</span>
                </div>
              </div>

              {/* SUCCESS RATE */}
              <div className="flex-1">
                <div className="text-[8px] font-mono tracking-widest text-white/35 mb-0.5">SUCCESS RATE</div>
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-bold text-sm" style={{fontFamily:"monospace"}}>{ag.successRate}%</span>
                  <span className="text-[10px]">{ag.trend==="up"?"↑":"↔"}</span>
                </div>
              </div>

              {/* EFFICIENCY */}
              <div className="flex-1">
                <div className="text-[8px] font-mono tracking-widest text-white/35 mb-0.5">EFFICIENCY</div>
                <div className="text-white font-bold text-sm" style={{fontFamily:"monospace"}}>{ag.efficiency} <span className="text-[10px] text-white/35 font-normal">XEF</span></div>
              </div>

              {/* MARKET SCOPE */}
              <div className="flex-1">
                <div className="text-[8px] font-mono tracking-widest text-white/35 mb-0.5">MARKET SCOPE</div>
                <div className="text-white text-xs font-mono leading-tight">{ag.markets.join(",\n")}</div>
              </div>

              {/* UPTIME / LAST ACTIVE */}
              <div className="flex-1">
                <div className="text-[8px] font-mono tracking-widest text-white/35 mb-0.5">{ag.uptime?"UPTIME":"LAST ACTIVE"}</div>
                <div className="text-white font-bold text-sm" style={{fontFamily:"monospace"}}>{ag.uptime||ag.lastActive}</div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0" onClick={e=>e.stopPropagation()}>
                <button onClick={()=>toggleAgent(ag)}
                  className="w-8 h-8 rounded flex items-center justify-center transition-colors hover:bg-[#E8601C]/15"
                  style={{background:"var(--c-card2)", border:"1px solid var(--c-border2)"}}>
                  {ag.status==="ACTIVE"
                    ? <span className="text-[10px] text-white/60">⏸</span>
                    : <span className="text-[10px] text-[#E8601C]">▶</span>}
                </button>
                <button className="w-8 h-8 rounded flex items-center justify-center transition-colors hover:bg-[#E8601C]/15"
                  style={{background:"var(--c-card2)", border:"1px solid var(--c-border2)"}}>
                  <span className="text-[10px] text-white/60">✎</span>
                </button>
                <button className="w-8 h-8 rounded flex items-center justify-center transition-colors hover:bg-[#A84232]/20"
                  style={{background:"var(--c-card2)", border:"1px solid var(--c-border2)"}}>
                  <span className="text-[10px] text-white/40">⌫</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom panels */}
      <div className="grid grid-cols-[1fr_280px] gap-4">
        {/* Realtime scanner feed */}
        <div className="rounded p-4" style={{background:"var(--c-card3)", border:"1px solid var(--c-border2)"}}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono tracking-widest text-[#E8601C]">REALTIME_SCANNER_FEED</span>
            <span className="text-[9px] font-mono text-white/30">LATENCY: {latency}MS</span>
          </div>
          <div className="h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scanBar} barSize={16} barCategoryGap={4}>
                <Bar dataKey="v" radius={[2,2,0,0]}>
                  {scanBar.map((b,i)=><Cell key={i} fill={b.peak?"#E8601C":"#A84232"} fillOpacity={b.peak?1:0.55} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Rolling log */}
          <div className="mt-3 border-t border-[#2A2D38] pt-3 space-y-1">
            {logLines.slice(-4).map((l,i) => (
              <div key={i} className="flex gap-2 text-[9px] font-mono">
                <span className="text-white/25 shrink-0">{l.ts}</span>
                <span className={i===logLines.slice(-4).length-1 ? "text-[#E8601C]" : "text-white/40"}>{l.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="rounded p-4 flex flex-col items-center justify-center text-center" style={{background:"var(--c-card3)", border:"1px solid var(--c-border2)"}}>
          <div className="w-16 h-16 rounded mb-4 flex items-center justify-center"
            style={{border:"2px dashed #E8601C", background:"#E8601C]/8"}}>
            <span className="text-2xl">◎</span>
          </div>
          <div className="text-white font-black tracking-widest text-sm mb-2" style={{fontFamily:"monospace"}}>SYSTEM_HEALTH</div>
          <p className="text-white/40 text-[11px] leading-relaxed mb-4">All subsystems operational. No anomalies detected.</p>
          <div className="w-full h-1 rounded-full" style={{background:"var(--c-border2)"}}>
            <div className="h-full rounded-full" style={{width:"91%", background:"linear-gradient(90deg,#A84232,#E8601C)"}} />
          </div>
          <div className="flex justify-between w-full mt-1">
            <span className="text-[8px] font-mono text-white/25">0</span>
            <span className="text-[9px] font-mono text-[#E8601C]">91% OPTIMAL</span>
            <span className="text-[8px] font-mono text-white/25">100</span>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="mt-4 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8601C] animate-pulse" />
          <span className="text-[9px] font-mono text-[#E8601C] tracking-widest">SYSTEM_LIVE</span>
          <span className="text-[9px] font-mono text-white/25">LAST_UPDATE: {new Date().toISOString().replace("T"," ").slice(0,19)} UTC</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-mono text-white/30">CREDITS_AVAILABLE: 42,999</span>
          <span className="text-[9px] font-mono text-white/30">SECURITY_LEVEL: OMNI</span>
        </div>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [dark, setDark] = useState(true); // true = dark mode, false = light mode
  const [page, setPage] = useState("discovery");
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [campaignTemplate, setCampaignTemplate] = useState(null);
  const [pipeline, setPipeline] = useState([]);
  const [toast, setToast] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatWidth, setChatWidth] = useState(260);
  const chatResizing = useRef(false);
  const t = Th(dark);

  // Chat panel resize
  useEffect(() => {
    const onMove = (e) => {
      if (!chatResizing.current) return;
      // chatWidth = mouseX - sidebarWidth(200)
      const newW = e.clientX - 200;
      setChatWidth(Math.max(200, Math.min(500, newW)));
    };
    const onUp = () => { chatResizing.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  const notify = (msg, type = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const addLead = (lead) => {
    if (pipeline.some(p => p.type === "demand" && p.id === lead.id)) { notify(`${lead.company} already in pipeline`, "warn"); return; }
    setPipeline(prev => [...prev, { ...lead, type: "demand", stage: "Prospect" }]);
    notify(`${lead.company} added to pipeline!`);
  };

  const addProject = (proj) => {
    if (pipeline.some(p => p.type === "supply" && p.id === proj.id)) { notify(`${proj.name} already in pipeline`, "warn"); return; }
    setPipeline(prev => [...prev, { ...proj, type: "supply", stage: "Prospect" }]);
    notify(`${proj.name} added to pipeline!`);
  };

  const [agents, setAgents] = useState(AGENTS_DATA);
  const addAgent = (ag) => {
    setAgents(prev => [ag, ...prev]);
    notify(`${ag.id} deployed and live!`);
  };

  return (
    <div className={`flex h-screen overflow-hidden ${t.bg}`} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {toast && (
        <div style={{ animation: "slideIn 0.2s ease-out" }}
          className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl text-sm font-semibold
            ${toast.type === "ok" ? "bg-[#E8601C] text-white" : "bg-[#E8601C] text-white"}`}>
          <CheckCircle className="w-4 h-4" />{toast.msg}
        </div>
      )}

      <style>{`
        @keyframes slideIn { from { transform: translateX(100%); opacity:0 } to { transform:translateX(0); opacity:1 } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(120,120,120,0.2); border-radius: 2px; }
        select option { background: ${dark?"#1C1F28":"#FFFFFF"}; color: ${dark?"#FFFFFF":"#111827"}; }
        textarea { scrollbar-width: none; }
        :root {
          --c-bg:          ${dark?"#0D0F14":"#FFFFFF"};
          --c-bg2:         ${dark?"#090B0F":"#F5F6F8"};
          --c-bg3:         ${dark?"#13171C":"#F0F2F5"};
          --c-card:        ${dark?"#141820":"#FFFFFF"};
          --c-card2:       ${dark?"#1A1D24":"#F9FAFB"};
          --c-card3:       ${dark?"#252830":"#F3F4F6"};
          --c-border:      ${dark?"#1C1F28":"#E4E6EA"};
          --c-border2:     ${dark?"#2A2D38":"#D1D5DB"};
          --c-text:        ${dark?"#FFFFFF":"#111827"};
          --c-sub:         ${dark?"rgba(255,255,255,0.65)":"#6B7280"};
          --c-muted:       ${dark?"rgba(255,255,255,0.38)":"#9CA3AF"};
          --c-hover:       ${dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)"};
          --c-opp-bg:      ${dark?"#0A0F12":"#F8FAFB"};
          --c-opp-head:    ${dark?"#080C0F":"#F1F5F9"};
          --c-opp-border:  ${dark?"#141C22":"#E2E8F0"};
          --c-opp-hover:   ${dark?"#0F1C24":"#EEF6F2"};
          --c-opp-text:    ${dark?"#C8D8D0":"#1F2937"};
          --c-opp-sub:     ${dark?"#3A5560":"#6B7280"};
          --c-opp-head-text:${dark?"#2A3A42":"#9CA3AF"};
          --c-scan-bg:     ${dark?"#0E1921":"#EFF6F3"};
          --c-scan-border: ${dark?"#1A3040":"#BBD5C8"};
        }
      `}</style>

      {/* Sidebar */}
      <Sidebar t={t} page={page} setPage={setPage} pipelineCount={pipeline.length} dark={dark} setDark={setDark} />

      {/* Chat Panel */}
      <div style={{ width: chatWidth, minWidth: 200, maxWidth: 500 }} className="shrink-0 h-full overflow-hidden flex flex-col">
        <ChatPanel t={t} dark={dark} messages={messages} setMessages={setMessages} setPage={setPage} addLead={addLead} addProject={addProject} page={page} openNewCampaign={(tpl) => { setCampaignTemplate(tpl || null); setShowNewCampaign(true); }} addAgent={addAgent} />
      </div>

      {/* Chat Resize Handle */}
      <ResizeHandle onMouseDown={() => { chatResizing.current = true; }} t={t} />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar t={t} page={page} dark={dark} setDark={setDark} />
        <main className="flex-1 overflow-hidden flex flex-col">
          {page === "dashboard" && <div className="flex-1 overflow-y-auto"><Dashboard   t={t} dark={dark} pipeline={pipeline} setPage={setPage} /></div>}
          {page === "discovery" && <AgentHub      t={t} dark={dark} pipeline={pipeline} addLead={addLead} addProject={addProject} />}
          {page === "campaigns" && <CampaignsPage  t={t} dark={dark} showModal={showNewCampaign} setShowModal={setShowNewCampaign} campaignTemplate={campaignTemplate} setCampaignTemplate={setCampaignTemplate} />}
          {page === "clients"   && <div className="flex-1 overflow-hidden flex flex-col"><ClientsPage    t={t} dark={dark} pipeline={pipeline} setPage={setPage} /></div>}
          {page === "dataroom"  && <div className="flex-1 overflow-y-auto"><DataRoomPage   t={t} dark={dark} /></div>}
          {page === "pipeline"  && <Pipeline      t={t} dark={dark} pipeline={pipeline} setPipeline={setPipeline} />}
          {page === "terminal"  && <div className="flex-1 overflow-hidden flex flex-col"><AgentTerminalPage t={t} dark={dark} agents={agents} setAgents={setAgents} /></div>}
        </main>
      </div>
    </div>
  );
}

// ─── MOUNT ───────────────────────────────────────────────────────────────────
createRoot(document.getElementById('root')).render(<App />);
