export type ProjectTier = 1 | 2;

export type ThreeDKind =
  | "hexapod"
  | "kfs-pointcloud"
  | "lidar-map"
  | "apportionment"
  | "quant-surface"
  | "riscv-pipeline";

export type ProjectLink = { label: string; href: string };

export type CaseStudySections = {
  motivation: string[];
  approach: string[];
  tradeoffs: string[];
  result: string[];
};

export type Project = {
  slug: string;
  tier: ProjectTier;
  title: string;
  oneLiner: string;
  tags: string[];
  threeD?: ThreeDKind;
  links: ProjectLink[];
  sections?: CaseStudySections;
  summary?: string[];
};

export type MoreBuild = {
  title: string;
  oneLiner: string;
  tags: string[];
};

const GITHUB = "https://github.com/zerodecay357";

// Tier 1 — full case studies
import { sections as apportionmentSections } from "@/content/projects/apportionment-manipulation";
import { sections as hexabotSections } from "@/content/projects/hexabot-v2";
import { sections as kfsSections } from "@/content/projects/kfs-synth";
import { sections as qubeSections } from "@/content/projects/qube-quant-strategy";

// Tier 2 — shorter write-ups
import { summary as riscvSummary } from "@/content/projects/riscv-simulator";
import { summary as lidarSummary } from "@/content/projects/lidar-mapping";
import { summary as leveldbSummary } from "@/content/projects/leveldb-range";
import { summary as taskboardSummary } from "@/content/projects/taskboard";

export const projects: Project[] = [
  {
    slug: "apportionment-manipulation",
    tier: 1,
    title: "Strategic Splitting Under Hamilton's Apportionment",
    oneLiner:
      "Proving when splitting a state into fragments manipulates Jefferson's-method seat allocation, and how much it can win.",
    tags: ["Game Theory", "Theory", "Prof. Rohit Vaish"],
    threeD: "apportionment",
    links: [{ label: "GitHub", href: GITHUB }],
    sections: apportionmentSections,
  },
  {
    slug: "hexabot-v2",
    tier: 1,
    title: "Hexabot V2 — 18-DOF Hexapod, RL-Trained Gait",
    oneLiner:
      "An 18-servo hexapod that learns to walk: PPO over a 49-dimensional MDP, curriculum-trained and carried across the sim-to-real gap.",
    tags: ["Robotics", "Reinforcement Learning", "Robotics Club"],
    threeD: "hexapod",
    links: [{ label: "GitHub", href: GITHUB }],
    sections: hexabotSections,
  },
  {
    slug: "kfs-synth",
    tier: 1,
    title: "KFS Synth — Real/Fake Vision Pipeline for DD Robocon",
    oneLiner:
      "A RealSense-driven perception pipeline that told real scrolls from decoys at competition speed, pushing accuracy from 51.7% to 98.0%.",
    tags: ["Computer Vision", "Robotics", "DD Robocon"],
    threeD: "kfs-pointcloud",
    links: [{ label: "GitHub", href: GITHUB }],
    sections: kfsSections,
  },
  {
    slug: "qube-quant-strategy",
    tier: 1,
    title: "Qube Research — Live-Traded Systematic Equity Strategy",
    oneLiner:
      "A beta-neutral, walk-forward LightGBM strategy that traded live for 10 days on $1.6M GMV and closed $21k in PnL.",
    tags: ["Quant Finance", "ML", "Qube Research"],
    threeD: "quant-surface",
    links: [{ label: "GitHub", href: GITHUB }],
    sections: qubeSections,
  },
  {
    slug: "riscv-simulator",
    tier: 2,
    title: "Out-of-Order RISC-V Simulator",
    oneLiner:
      "A cycle-level Tomasulo's-algorithm simulator — ROB, RAT, reservation stations, CDB broadcast, and a 2-bit branch predictor.",
    tags: ["Systems", "Computer Architecture"],
    threeD: "riscv-pipeline",
    links: [{ label: "GitHub", href: GITHUB }],
    summary: riscvSummary,
  },
  {
    slug: "lidar-mapping",
    tier: 2,
    title: "LiDAR-IMU 3D Mapping & Navigation",
    oneLiner:
      "FAST-LIO2 scan-to-map odometry fused with a full Nav2 autonomy stack on a 23-dimensional manifold state.",
    tags: ["Robotics", "SLAM", "Robotics Club"],
    threeD: "lidar-map",
    links: [{ label: "GitHub", href: GITHUB }],
    summary: lidarSummary,
  },
  {
    slug: "leveldb-range",
    tier: 2,
    title: "LevelDB Scan / DeleteRange Extension",
    oneLiner:
      "Production-grade range-scan and MVCC-consistent range-delete APIs added to Google's LevelDB internals.",
    tags: ["Systems", "Databases"],
    links: [{ label: "GitHub", href: GITHUB }],
    summary: leveldbSummary,
  },
  {
    slug: "taskboard",
    tier: 2,
    title: "TaskBoard — Full-Stack Kanban Platform",
    oneLiner:
      "A Kanban platform with server-enforced RBAC and workflow graphs across 40+ REST endpoints.",
    tags: ["Full-Stack", "Systems"],
    links: [{ label: "GitHub", href: GITHUB }],
    summary: taskboardSummary,
  },
];

export const moreBuilds: MoreBuild[] = [
  {
    title: "SocialNet Backend",
    oneLiner:
      "C++ social-graph backend with zero STL containers in the core path — custom AVL trees for friend/post indices, BFS degrees-of-separation.",
    tags: ["C++", "Data Structures"],
  },
  {
    title: "Micro-Vector SVG Editor",
    oneLiner:
      "A vector graphics editor backed by a hand-written recursive-descent SVG/XML parser — zero third-party parsing libraries.",
    tags: ["C++", "Parsing"],
  },
  {
    title: "VGA Racing Game on FPGA",
    oneLiner:
      "Real-time arcade racer on a Xilinx Artix-7, 640×480 VGA at 60Hz, synthesized to ~1.15% LUT footprint.",
    tags: ["Verilog", "FPGA"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const tier1Projects = projects.filter((p) => p.tier === 1);
export const tier2Projects = projects.filter((p) => p.tier === 2);
