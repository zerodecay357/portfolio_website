import type { CaseStudySections } from "@/lib/projects";

export const sections: CaseStudySections = {
  motivation: [
    "Hexapod locomotion is usually hand-tuned gaits (robust, rigid) or end-to-end RL (flexible, brittle). Hexabot V2 keeps both: closed-form IK from the firmware drives ten parametric gaits as baseline; a separate RL policy walks in joint-angle space, testing learning against classical engineering.",
    "Target hardware: a real hexapod, six three-segment (coxa-femur-tibia) legs, 18 DOF, SC-15 servos on an ESP32. The PyBullet twin had to match the firmware's IK and calibration, given its documented unit-conversion and sync bugs.",
  ],
  approach: [
    "Each leg's coxa-femur-tibia chain has closed-form 3-DOF IK: coxa yaw θ₁ = atan2(y, x), reach r = √(x²+y²) − Lc, femur/tibia via the law of cosines, with link lengths Lc = 74mm, Lf = 49mm, Lt = 92.4mm and mounting offsets 24.6°/76.3° correcting servo zero against the URDF frame. It sets the neutral pose and drives the gait library; RL bypasses it.",
    "A phase-parameterized gait library from the firmware adds ten patterns: tripod, wave, pronk, metachronal tripod, rolling tripod, tetrapod, bowtie, caterpillar, rice, pace, each a (phase_shifts[6], duty_factor) tuple. Per-leg phase (i/6 + φₖ) mod 1 indexes Bézier swing arcs and stance slides via the same IK; reversed arrays reverse motion free.",
    "Walking is learned separately: a 49-dim observation (orientation quaternion, angular velocity, 18 joint angles, 18 joint velocities, 6 foot-contact flags), an 18-dim action of joint targets in [−π, π] smoothed 0.8/0.2, and reward R = v_x − 0.001·Σ|τ| − 0.5·tilt, −10 on falling. PPO (SB3 MlpPolicy, 256×256 ReLU, γ=0.99, GAE λ=0.95, clip ε=0.2, 8 parallel workers) trains five stages (stand, walk, turn, rough terrain, sidestep), domain-randomized each reset: mass ±15%, damping in [0.01, 0.05].",
    "Joint targets map to the SC-15's 0-1023 range (centered at 512), corrected by a per-leg sign-reversal table, reach the ESP32 over Bluetooth at 230,400 baud, and relay on its own bus at 1,000,000 baud via SyncWritePos.",
  ],
  tradeoffs: [
    "Firmware bugs show what didn't work. Original code passed rotation angles as int into C's cos()/sin(), expecting radians, so a 120° call read as 120 radians, garbling rotation matrices and causing erratic motion; fixed via toRadian(), a float conversion. It also fired a leg's three servos sequentially, not simultaneously, until syncWrite() fixed it, plus an off-by-one in the Bézier buffer reading garbage at t=0.",
    "Only two of five stages, stand and walk, reach a trained checkpoint; turn, rough-terrain, and sidestep exist only as untrained Gymnasium environments, proven in code, not practice. Domain randomization also omits documented action-latency and observation-noise terms, resampling only mass and damping at reset. Keeping the gait library and PPO policy separate was deliberate, a fallback at the cost of relearning joint coordination from scratch.",
  ],
  result: [
    "The stand policy converges by 50K steps: mean reward over 5 episodes is 489.9 (max ~500), all running the full 500 steps without falling. The walk curve: at 50K-150K steps it falls almost immediately, episodes lasting 2-12 steps near the −10 fall floor; by 200K-350K it survives the full 1000 steps but with reward as low as −34; reward turns positive at 400K; by the last checkpoint (550K) mean reward reaches 315.9 across all five episodes.",
    "The gait library adds 10 selectable, reversible patterns, from the fast tripod gait to the stable wave gait, switchable at zero cost through the same IK and ESP32/SC-15 bridge. The hexapod thus has a hand-verifiable mode and a quantitatively-improving learned one, with bug history and eval logs showing what's proven versus in progress.",
  ],
};
