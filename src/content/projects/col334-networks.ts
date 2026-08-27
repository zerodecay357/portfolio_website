export const sections = {
  motivation: [
    "For a Computer Networks course project at IIT Delhi (COL334), I set out to answer a question textbooks skip: what does an unfiltered laptop capture actually contain. With one teammate, we each recorded six unfiltered ten-minute traces while a lab generator, netlab_gen.py, ran fixed pings and seeded roll-number-keyed anomalies against a shared server. The task: measure RTT tail latency, hunt planted signatures (a DNS-token channel, a port sweep, a beacon, a credential leak, a wrong-port probe) with tshark filters built from scratch, and attribute every other byte to its real source.",
    "An earlier half of the assignment had us traceroute independently to the internet, tagging every hop as evidence until our paths converged. This part raised the stakes: twelve raw, unfiltered pcapng files, where noise, a capture failure, and real anomalies had to be told apart by base rates, not a filter that merely looked tight.",
  ],
  approach: [
    "For latency, I pulled RTT median and p95 to campus DNS and 8.8.8.8 from six ping logs. The median stayed flat everywhere; the p95 did all the moving, far more on the distant target. My worst window hit a p95 of 152.2ms against a runner-up of 71.7ms, over double anything else, while the near target barely moved: near and far degraded together, pointing to a bottleneck at my own edge, unlike my teammate's data, where the worst windows for both targets fell on different days.",
    "Since the generator reseeds identically per roll number, I verified every hunt filter against all six captures. I isolated a base32 DNS token across eight synthetic hostnames (128 DNS frames, traced to an exact multiplier from A/AAAA queries and resolver retries), a 48-SYN port sweep finishing in 7.24 seconds, nine UDP probes with IP TTL pinned to 7, a cleartext credential POST, and three plaintext HTTP GETs to a TLS-numbered port, all reproducing identically across windows.",
    "For byte attribution, a tshark query was cross-referenced against the TLS SNI and DNS answers in the capture. One Spotify CDN conversation was 55% of my heaviest window alone, every Spotify endpoint combined 91.5%, against an assignment footprint of 1.3%.",
  ],
  tradeoffs: [
    "One window was short: a dumpcap mistake left one file at 353 seconds against a 600-second requirement, which the handout scores as zero. We did not re-run it, flagging it rather than patching the record, since its ping data was complete while its anomaly data was not, so I used it only where it held up. The same discipline shows in the appendix: SSID is marked DATA MISSING throughout since the toolchain never queries it.",
    "The hunt also surfaced false-positive risk: a naive TTL filter on my capture pulled in 221 unrelated frames, actually my own traceroute probes, caught only by adding a port clause, and on a teammate's capture a naive beacon filter returned double the true count because an ICMP error inherited the original packet's port and length fields.",
  ],
  result: [
    "The report quantifies both halves with numbers pulled from capinfos and raw logs, not a simulated model: distant-target p95 latency moved over 3x across windows while the median held within milliseconds, the planted anomaly set reproduced identically across all six windows, and background traffic outweighed the assignment workload roughly 70 to 1. That instinct carried into two companion experiments in the same course: a Wi-Fi survey across campus, and a ping study of propagation versus transmission delay.",
  ],
};
