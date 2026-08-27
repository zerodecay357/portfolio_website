import type { CaseStudySections } from "@/lib/projects";

export const sections: CaseStudySections = {
  motivation: [
    "Divisor methods like Jefferson's method convert population counts into seat counts, used in the US House, the EU Parliament, and dozens of legislatures for properties like house and population monotonicity and immunity to Alabama-paradox failures that plague largest-remainder methods. Less studied: nothing stops a unit from splitting into fragments before the method runs. A state split into three fragments enters rounding three times instead of once, and rounding is exactly where extra seats get created or lost.",
    "Advised by Prof. Rohit Vaish, this project asks precisely when splitting helps under Jefferson's method, by how much, and whether the optimal split has a clean characterization, turning a political suspicion into a provable bound.",
  ],
  approach: [
    "We modeled it as a sequential game: a state partitions its population into fragments, Jefferson's method allocates a fixed house size across the resulting units, and each fragment's payoff is its seat count. The state's utility is the sum of seats across its fragments versus what it would get unsplit, turning \"does splitting help\" into a question about the game's subgame perfect Nash equilibria (SPNE).",
    "The key result is the Fragment Reduction Lemma: any splitting strategy reduces, without loss of payoff, to a canonical form with a bounded number of fragments and a fixed population-ratio structure, turning an intractable search over partitions into a small candidate family.",
    "We then proved SPNE play coincides exactly with applying Jefferson's method to the reduced fragment structure, giving the equilibrium a closed algebraic form instead of requiring computation from scratch. That yields an algorithm computing an ε-optimal split in O(n log(1/ε)) time (n = number of competing units), by binary-searching the convergent divisor and using the lemma to bound the search space.",
  ],
  tradeoffs: [
    "The equivalence is specific to Jefferson's round-down rule. Other divisor methods, such as Webster/Sainte-Laguë's round-to-nearest or Huntington-Hill's geometric-mean rounding (used by the US House), don't inherit the same equilibrium structure for free; extending the lemma to them requires re-deriving it from their different rounding boundaries.",
    "The O(n log(1/ε)) algorithm gives an ε-approximate split, not an exact one in finite arithmetic; exact optimum is reachable by shrinking ε below the smallest relevant population gap, at the cost of runtime. We chose the approximate version because it scales to Monte Carlo validation across thousands of instances, where exact search would not.",
    "The model also assumes fragments are freely choosable, with no cost to splitting and no contiguity requirement. Real redistricting has both. The model answers the game-theoretic question cleanly; it doesn't capture the political cost of executing a split.",
  ],
  result: [
    "We validated the theory two ways. Monte Carlo simulation over Dirichlet-sampled population-share instances confirmed the algorithm's predicted optimal splits matched the SPNE characterization exactly, across randomized house sizes and unit counts. We also replayed the model on India's 2011 census apportionment: using actual state populations and house size, the Fragment Reduction Lemma's construction reproduced the predicted incentive, states above a computable population threshold have a strict incentive to fragment, and the algorithm identifies exactly which ones.",
    "The deliverable is a proof (Fragment Reduction Lemma plus the SPNE-equals-Jefferson's-method theorem) and a working O(n log 1/ε) algorithm, checked against both synthetic and real census data rather than left as a pen-and-paper claim.",
  ],
};
