export type ProjectTier = 1 | 2;

// 3D is reserved for projects that are genuinely spatial/hardware —
// the hexapod, the LiDAR point cloud, the RGB-D capture. Dropped for
// the more abstract projects (apportionment, quant, RISC-V pipeline),
// where a forced 3D visual read as decoration rather than evidence.
export type ThreeDKind = "hexapod" | "kfs-pointcloud" | "lidar-map";

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
  video?: string;
  algorithmVideo?: string;
  problemStatement?: string[];
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
    video: "/media/apportionment-split.mp4",
    links: [{ label: "GitHub", href: GITHUB }],
    sections: apportionmentSections,
  },
  {
    slug: "hexabot-v2",
    tier: 1,
    title: "Hexabot V2: 18-DOF Hexapod, RL-Trained Gait",
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
    title: "KFS Synth: Real/Fake Vision Pipeline for DD Robocon",
    oneLiner:
      "A RealSense-driven perception pipeline that told real scrolls from decoys at competition speed, pushing accuracy from 51.7% to 98.0%.",
    tags: ["Computer Vision", "Robotics", "DD Robocon"],
    threeD: "kfs-pointcloud",
    problemStatement: [
      "ABU Robocon 2026's game block (KFS) is either real, one of 15 Oracle-Bone-script glyphs stamped on all five marked faces, or a visually similar fake, a seal-script look-alike. A robot's camera has to tell them apart, and read which of the 15 signs it is, live, on a laptop CPU or a Jetson. Only a few hundred real labelled photos existed to learn from: nowhere near enough to train a deep model from scratch.",
    ],
    algorithmVideo: "/media/kfs-algorithm.mp4",
    links: [{ label: "GitHub", href: GITHUB }],
    sections: kfsSections,
  },
  {
    slug: "qube-quant-strategy",
    tier: 1,
    title: "QRT Academy: Systematic Equity Strategy",
    oneLiner:
      "A dollar- and beta-neutral equity pipeline (linear blend, CVXPY optimizer, and a LightGBM walk-forward classifier, compared on one backtest engine), run live on Qube Research & Technologies' trading platform.",
    tags: ["Quant Finance", "ML", "Qube Research & Technologies"],
    links: [{ label: "GitHub", href: GITHUB }],
    sections: qubeSections,
  },
  {
    slug: "riscv-simulator",
    tier: 2,
    title: "Out-of-Order RISC-V Simulator",
    oneLiner:
      "A cycle-level Tomasulo's-algorithm simulator with a ROB, RAT, reservation stations, CDB broadcast, and a 2-bit branch predictor.",
    tags: ["Systems", "Computer Architecture"],
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
    title: "TaskBoard: Full-Stack Kanban Platform",
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
      "C++ social-graph backend with zero STL containers in the core path: custom AVL trees for friend/post indices, BFS for degrees-of-separation.",
    tags: ["C++", "Data Structures"],
  },
  {
    title: "Micro-Vector SVG Editor",
    oneLiner:
      "A vector graphics editor backed by a hand-written recursive-descent SVG/XML parser, with zero third-party parsing libraries.",
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
