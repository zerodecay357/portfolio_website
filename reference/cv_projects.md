2

# `Projects — CV Entries

---

## **Out-of-Order Processor Simulator (COL216)** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(Apr 2026)*

- Implemented full Tomasulo's Algorithm with ROB, RAT, per-execution-unit reservation stations, and a 4-stage (Fetch/Decode/Execute/Commit) pipelined RISC-V simulator supporting 20+ instructions with precise exception semantics and in-order architectural commit.
- Engineered a per-instruction 2-bit saturating counter branch predictor with full pipeline flush on misprediction, correctly deferring exception propagation to the ROB retirement stage to prevent speculative exceptions from corrupting architectural state.
- Designed a Common Data Bus broadcast mechanism allowing simultaneous multi-unit result forwarding in O(1) per cycle, with a sequentially-ordered LoadStoreQueue preserving memory consistency under out-of-order integer execution.

---

## **LiDAR-Inertial Odometry & Autonomous Navigation Stack (Robotics Club, IIT Delhi)** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(Jun 2026)*

- Integrated a Unitree L2 solid-state LiDAR (18-ring, ~5 K pts/scan, 180° FoV, 10 Hz) with FAST-LIO2 on ROS2 Humble: fused raw PointCloud2 and 250 Hz IMU via an iterated EKF formulated on the compound manifold SO(3)⁴ × ℝ¹⁵ × S² (23-dim state: position, rotation, LiDAR-IMU extrinsics, velocity, gyro/accel biases, gravity direction), using point-to-plane residuals against an incrementally-maintained ikd-Tree for direct scan-to-map matching without feature extraction.
- Implemented per-point motion-undistortion by IMU-integrating the robot's pose trajectory within each 100ms scan window and reprojecting every LiDAR point to its end-of-scan frame before plane fitting, eliminating motion-blur artifacts; calibrated L2 IMU-LiDAR extrinsics (T: [7.7, 14.7, −6.7] mm, R: identity) from mechanical spec and tuned time lag (85ms) empirically to correct systematic L2 clock offset.
- Constructed a full Nav2 autonomy stack on the FAST-LIO2 odometry output: OctoMap server (5 cm voxels, height-sliced 0.2–1.2m) produces the 2D occupancy grid; `pointcloud_to_laserscan` collapses `/cloud_registered` to a LaserScan slice for Nav2 costmaps; a static TF chain (map→odom→camera_init→body→base_link) bridges FAST-LIO2's body-frame odometry to Nav2's DWB planner—iterated through four launch versions (launch8→11) to resolve SO(3) frame-convention mismatches between FAST-LIO2's camera_init and Nav2's map frame.

---

## **KFS Real/Fake Detection — DD Robocon (Individual)** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(Jun 2026)*

- Built an Intel RealSense D455 RGB-D perception pipeline that combines HSV+depth-gated color segmentation, depth-discontinuity edge masking for touching-box separation, RANSAC plane fitting, and quad-warp deskewing to isolate box faces for zero-shot DINOv2 embedding classification.
- Engineered an asymmetric rank-weighted voting scheme (60/30/10 top-K cosine similarity) with a +20% anti-false-Real confidence margin and a global bank guard, resolving the fundamental precision/recall tradeoff where a false *Real* triggers an incorrect robot pick in competition.
- Achieved orientation-invariant recognition by augmenting the DINOv2 reference embedding bank with 90°/180°/270° rotations and caching per-color `.pt` embedding tensors, decoupling bank size from inference latency at pipeline runtime.

---

## **Hexabot V2 — 18-DOF Hexapod: Analytical IK, Gait Library & PPO Sim-to-Real (Robotics Club, IIT Delhi)** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(Jan 2026 – Present)*

- Derived analytical 3-DOF closed-form inverse kinematics for each leg's coxa–femur–tibia chain (Lc=74 mm, Lf=49 mm, Lt=92.4 mm): coxa yaw θ₁=arctan(y/x), projected reach r=√(x²+y²)−Lc, femur and tibia resolved via law-of-cosines on the projected 2D plane with mounting angle offsets (a=24.6°, b=76.3°) correcting PyBullet URDF-frame angles to physical servo zero; bridged the digital twin to 18 Waveshare SC15 serial-bus servos over Bluetooth serial at 230400 baud on an ESP32 using delta-from-neutral PWM encoding (0–1023, centred at 512) with per-leg hardware sign reversal tables (HW_SIGNS) to reconcile simulator joint directions with physical mounting orientation.
- Designed a phase-parameterised universal gait library encoding 10 coordination patterns (tripod, wave, pronk, metachronal, rolling, tetrapod, bowtie, caterpillar, rice, pace) as `(phase_shifts[6], duty_factor)` tuples; per-leg gait phase computed as `(i/N + φₖ) mod 1` each timestep to index into pre-generated Bézier swing-arc and linear stance-slide point arrays—enabling direction reversal (forward/backward/turning) by reading the same arrays forward or backward without recomputation, and zero-cost gait switching by changing a single config entry.
- Formulated locomotion as a continuous MDP (S ∈ ℝ⁴⁹: quaternion + angular velocity + 18 joint angles + 18 joint velocities + 6 foot-contact booleans; A ∈ [−π, π]¹⁸ joint-angle targets with 0.8/0.2 smoothing; R = vₓ − 0.001·Σ|τ| − 0.5·tilt − 10·fall) and trained via PPO (Stable-Baselines3, 256×256 ReLU actor-critic, γ=0.99, GAE λ=0.95, clip ε=0.2, 8 parallel SubprocVecEnv workers, 3M timesteps) across a 5-stage curriculum (stand 500K → walk 2–3M → turn 1–2M → rough terrain 2M → sidestep 2M) with domain randomisation over per-joint damping and per-link mass (±15%) to close the sim-to-real gap.

---

c

## **Document Intelligence Engine — Grounded RAG System (Individual)** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(Jun 2026)*

- Architected an end-to-end Retrieval-Augmented Generation system grounding every LLM response in retrieved evidence: PDF/text corpora are split into 512-character chunks with 64-character overlap, embedded via `all-MiniLM-L6-v2` (384-dim, L2-normalized), and indexed in FAISS IndexFlatIP for exact cosine similarity retrieval — with top-k chunks injected into a structured Claude API prompt that enforces per-source citation in every generated answer.
- Engineered a dual-mode retrieval layer supporting exact (IndexFlatIP) and approximate (IVF/HNSW) ANN search, returning per-chunk source file, byte offset, and cosine similarity score with every result — making generated answers fully auditable and traceable to the specific passage that grounded them.
- Evaluated retrieval quality on 10 semantically distinct (query, document) pairs across a 36-chunk corpus, achieving 100% Precision@1 and 100% Recall@5 at 24ms average query latency; exposed as a two-command CLI (`ingest` / `query`) accepting arbitrary PDF and plaintext corpora.

---

## **QRT Academy Quantitative Equity Strategy (Individual)** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(May 2026 – Jun 2026)*

- Engineered a multi-factor long-short equity strategy over a 2,500-stock AMER universe using 30+ cross-sectionally ranked technical signals (RSI, MACD, Ichimoku, CMO, ATR, OBV) with signal-family deduplication and dollar + beta neutralization enforced at portfolio construction.
- Implemented a LightGBM walk-forward learner with risk-adjusted binary labels (β-hedged 1-day return normalized by lagged per-ticker σ) and temporal purge/embargo to eliminate look-ahead contamination across rolling train/test folds.
- Enforced CVXPY portfolio optimization under strict live-trading constraints: ≤10% per-name weight, ≤$2M notional cap, ≤2.5% 60-day ADV daily turnover delta, $5M ADV universe liquidity filter, and SFTP upload to QRT's live scoring pipeline.

---

## **TaskBoard — Kanban Project Management App (COP290)** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(Mar 2026)*

- Built a production-grade Kanban platform in TypeScript (React + Vite / Express / PostgreSQL + Prisma) with JWT-authenticated 4-tier RBAC (Global Admin → Viewer), where role checks are enforced server-side on every route rather than delegated to the client.
- Modeled board columns as a DB-persisted directed workflow graph with server-enforced WIP limits and column-transition validation, making illegal task state progressions structurally impossible at the persistence layer.
- Shipped 40+ REST endpoints across 9 resource groups (auth, user, project, board, column, task, story, comment, notification, log) with full Vitest + Supertest integration coverage on the backend.

---

## **LevelDB Range API Extension (Individual)** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(Apr 2026)*

- Extended Google's LevelDB with production-grade `Scan()` and `DeleteRange()` APIs by hooking into the internal iterator abstraction, traversing LSM-tree levels lazily without materializing unnecessary key-value pairs into memory.
- Implemented snapshot-pinned `DeleteRange()` using MVCC-consistent `GetSnapshot()` + `WriteBatch`, atomically batching all deletions visible at invocation time and releasing the snapshot post-scan to prevent phantom reads from concurrent writers.
- Designed `Scan()` with user-comparator-aware range bounds, null-result guard, and full iterator error propagation, ensuring correctness across all LSM compaction states including cross-level key overlap scenarios.

---

## **FPGA Car Racing Game (COL215)** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(Dec 2025)*

- Synthesized a real-time arcade racing game on a Xilinx Artix-7 (Basys3) FPGA targeting 640×480 VGA at 60 Hz, with custom sprite BROMs for the background and two cars, and a chroma-key transparency MUX replacing pink pixels with background to composite sprites pixel-accurately.
- Implemented a centralized 5-state FSM (START / IDLE / LEFT / RIGHT / COLLIDE) with combinatorial bounding-box collision detection (14×16 px hitbox) and an 8-bit LFSR seeded from team member IDs for deterministic-yet-unique rival car spawn positions per session.
- Achieved a minimal FPGA footprint of ~1.15% LUTs and ~28% Block RAM by computing all collision and movement logic combinatorially with no off-chip memory access, keeping DSP slice usage to 2.22% for timing-only operations.

---

## **SocialNet Simulator (COL106)** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(Dec 2025)*

- Implemented a social network backend in C++ from scratch—zero STL containers for core logic—using a custom AVL tree for O(log n) alphabetical friend insertion and retrieval, a separate AVL tree for O(log n) timestamped post management, and an undirected graph with BFS for O(V+E) degrees-of-separation.
- Chose AVL over red-black trees for the friend and post indices because AVL's stricter height balance guarantees simpler rotation logic to implement correctly from scratch, at the cost of marginally more frequent rebalances—an acceptable tradeoff when implementation correctness matters more than write throughput.
- Delivered mutual-connection-ranked friend suggestions, O(k log n) chronological top-k feed retrieval, and O(1) average-case user lookup via `std::unordered_map`, proving all complexity bounds analytically in the assignment submission.

---

## **Time-Traveling File System (COL106)** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(Sep 2025)*

- Built a C++ CLI file versioning system with immutable snapshots, O(1) rollback, and multi-path branching via a persistent version tree.
- Used djb2 hash table with separate chaining for O(1) filename-to-file mapping and version retrieval.
- Dual max-heaps with lazy filtering answer O(k log m) top-k recency and version-count queries.

---

## **Micro-Vector Editor — SVG (COP290)** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(Jan 2026 – Feb 2026)*

- Implemented a C++ vector graphics editor with a GUI supporting interactive creation, modification, and round-trip serialization of circles, rectangles, rounded rects, hexagons, lines, and polylines to and from spec-compliant SVG files.
- Built a hand-rolled recursive-descent XML/SVG parser (zero third-party parsing libraries) that constructs an in-memory scene graph, applies edits through a polymorphic `GraphicsObj` hierarchy, and re-serializes to valid W3C SVG output.
- Designed an OOP shape hierarchy with a virtual `GraphicsObj` base and per-shape subclasses (Circle, Line, Hexagon, etc.) enabling uniform canvas rendering and serialization through dynamic dispatch, cleanly decoupling the parser, model, and view layers.

---

## **Cache-Hierarchy BFS: CSR vs Pointer-Based Graph Layout — Performance Analysis (Individual)** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(Apr 2026)*

- Implemented BFS on both a pointer-based adjacency list and a Compressed Sparse Row (CSR) graph in C, running the same O(V+E) algorithm across two memory layouts to empirically isolate the effect of spatial locality on real CPU cache hierarchies.
- Chose CSR as the high-performance layout because sequential `col_idx` traversal converts BFS neighbor scans into a hardware-prefetcher-friendly linear access pattern, eliminating the pointer-chasing across heap-scattered linked-list nodes that causes L1/LLC cache thrashing in the pointer representation.
- Measured a consistent 1.3–1.4× runtime speedup of CSR BFS over pointer BFS on Erdős–Rényi graphs (n = 10k–50k, avg degree = 8) across 10–20 repeated trials, profiled with Cachegrind to correlate D1 and LLd miss reduction with observed wall-clock gains.
