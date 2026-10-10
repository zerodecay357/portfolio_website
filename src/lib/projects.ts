export type ProjectTier = 1 | 2;

// 3D is reserved for projects that are genuinely spatial/hardware:
// the hexapod, the LiDAR point cloud, the RGB-D capture. Dropped for
// the more abstract projects (apportionment, quant, RISC-V pipeline),
// where a forced 3D visual read as decoration rather than evidence.
export type ThreeDKind = "hexapod" | "lidar-map";

export type ProjectLink = { label: string; href: string };

export type ProjectVideo = { src: string; caption?: string };

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
  video?: ProjectVideo;
  algorithmVideo?: ProjectVideo;
  image?: { src: string; alt: string; width: number; height: number; caption?: string };
  gallery?: { src: string; caption: string; width: number; height: number }[];
  problemStatement?: string[];
  rulebook?: { label: string; href: string };
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
const REPO = (name: string) => `${GITHUB}/${name}`;

// Tier 1: full case studies
import { sections as apportionmentSections } from "@/content/projects/apportionment-manipulation";
import { sections as hexabotSections } from "@/content/projects/hexabot-v2";
import { sections as kfsSections } from "@/content/projects/kfs-synth";
import { sections as col334Sections } from "@/content/projects/col334-networks";

// Tier 2: shorter write-ups
import { summary as riscvSummary } from "@/content/projects/riscv-simulator";
import { summary as lidarSummary } from "@/content/projects/lidar-mapping";
import { summary as leveldbSummary } from "@/content/projects/leveldb-range";
import { summary as qubeSummary } from "@/content/projects/qube-quant-strategy";

export const projects: Project[] = [
  {
    slug: "apportionment-manipulation",
    tier: 1,
    title: "Strategic Splitting Under Hamilton's Apportionment",
    oneLiner:
      "Proving when splitting a state into fragments manipulates Jefferson's-method seat allocation, and how much it can win.",
    tags: ["Game Theory", "Theory", "Prof. Rohit Vaish"],
    video: { src: "/media/apportionment-split.mp4" },
    links: [
      {
        label: "GitHub",
        href: REPO("COL8184_stratergic_manip_under_hamilton."),
      },
      { label: "Endterm Report (PDF)", href: "/docs/COL8184-Endterm-Report.pdf" },
    ],
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
    video: {
      src: "/media/hexabot/hexabot-real-walk.mp4",
      caption: "The physical hexapod walking untethered on the gait library, LCD face and all.",
    },
    algorithmVideo: {
      src: "/media/hexabot/hexabot-sim.mp4",
      caption: "The PyBullet digital twin the gait library and RL policy were developed against before the sim-to-real transfer.",
    },
    links: [{ label: "GitHub", href: REPO("hexabot-rl") }],
    sections: hexabotSections,
  },
  {
    slug: "kfs-synth",
    tier: 1,
    title: "KFS Synth: Real/Fake Vision Pipeline for DD Robocon",
    oneLiner:
      "A RealSense-driven perception pipeline that told real scrolls from decoys at competition speed, pushing accuracy from 51.7% to 98.0%.",
    tags: ["Computer Vision", "Robotics", "DD Robocon"],
    problemStatement: [
      "ABU Robocon 2026's game block (KFS) is either real, one of 15 Oracle-Bone-script glyphs stamped on all five marked faces, or a visually similar fake, a seal-script look-alike. A robot's camera has to tell them apart, and read which of the 15 signs it is, live, on a laptop CPU or a Jetson. Only a few hundred real labelled photos existed to learn from: nowhere near enough to train a deep model from scratch.",
    ],
    algorithmVideo: { src: "/media/kfs-algorithm.mp4" },
    rulebook: {
      label: "ABU Robocon 2026 Rulebook (PDF)",
      href: "/docs/ABU-Robocon-2026-Rulebook.pdf",
    },
    links: [
      { label: "GitHub", href: REPO("kfs_detection_pipeline_robocon26") },
    ],
    sections: kfsSections,
  },
  {
    slug: "col334-networks",
    tier: 1,
    title: "COL334: Two Days, Two Devices",
    oneLiner:
      "Packet-level forensics on real traffic: tracing paths hop by hop, hunting planted anomalies in raw captures, and attributing every stray byte to the app that sent it.",
    tags: ["Computer Networks", "Systems", "Measurement"],
    image: {
      src: "/media/col334/paths.png",
      alt: "Traceroute diagram showing both teammates' paths out of IIT Delhi, every IP as its own tagged node, converging at a shared upstream hop",
      width: 1742,
      height: 1728,
    },
    gallery: [
      {
        src: "/media/col334/latency-vs-distance.png",
        caption: "A3.1: RTT against great-circle distance, five targets from campus gateway to a server 12,000km away.",
        width: 1360,
        height: 825,
      },
      {
        src: "/media/col334/queueing.png",
        caption: "A3.3: every packet plotted, no smoothing. Queueing delay visibly widens the RTT spread in a busy hour versus a quiet one.",
        width: 1331,
        height: 801,
      },
      {
        src: "/media/col334/wifi-survey.png",
        caption: "A2.2: AP density and signal strength across three campus buildings, from a walking Wi-Fi survey.",
        width: 1256,
        height: 556,
      },
    ],
    links: [{ label: "GitHub", href: REPO("map_your_network") }],
    sections: col334Sections,
  },
  {
    slug: "riscv-simulator",
    tier: 2,
    title: "Out-of-Order RISC-V Simulator",
    oneLiner:
      "A cycle-level Tomasulo's-algorithm simulator with a ROB, RAT, reservation stations, CDB broadcast, and a 2-bit branch predictor.",
    tags: ["Systems", "Computer Architecture"],
    links: [{ label: "GitHub", href: REPO("OutOfOrderProcessorDesign") }],
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
    // No public repo: Robotics Club project, code isn't on the personal account.
    links: [],
    summary: lidarSummary,
  },
  {
    slug: "leveldb-range",
    tier: 2,
    title: "LevelDB Scan / DeleteRange Extension",
    oneLiner:
      "Production-grade range-scan and MVCC-consistent range-delete APIs added to Google's LevelDB internals.",
    tags: ["Systems", "Databases"],
    // No public repo yet.
    links: [],
    summary: leveldbSummary,
  },
  {
    slug: "qube-quant-strategy",
    tier: 2,
    title: "QRT Academy: Systematic Equity Strategy",
    oneLiner:
      "A dollar- and beta-neutral equity pipeline (linear blend, CVXPY optimizer, and a LightGBM walk-forward classifier, compared on one backtest engine), run live on Qube Research & Technologies' trading platform.",
    tags: ["Quant Finance", "ML", "Qube Research & Technologies"],
    // Ran on QRT's live proprietary platform: no public repo.
    links: [],
    summary: qubeSummary,
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
    title: "TaskBoard",
    oneLiner:
      "A full-stack Kanban platform with server-enforced RBAC, data-driven workflow rules, and 46 REST endpoints backed by 59 tests.",
    tags: ["Full-Stack", "Systems"],
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
