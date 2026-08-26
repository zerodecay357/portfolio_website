const achievements = [
  "NSEA & NSEC: national rank among top scorers",
  "Tech General Championship: 1st place, Robotics event",
  "ABU Robocon: national qualifier, DD Robocon 2026",
];

const mentors = [
  { name: "Prof. Rohit Vaish", note: "game theory & apportionment research" },
  { name: "Prof. Rijurekha Sen", note: "systems mentorship" },
  { name: "Prof. Smruti Ranjan Sarangi", note: "computer architecture mentorship" },
];

export default function Academics() {
  return (
    <section id="cv" className="bg-paper px-5 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="font-heading text-[11px] font-700 uppercase tracking-[3px] text-terracotta">
              CV &amp; Academics
            </p>
            <h2 className="mt-3 font-heading text-3xl font-800 text-ink sm:text-4xl">
              B.Tech, Computer Science &amp; Engineering
            </h2>
            <p className="mt-2 font-body text-[15px] font-500 text-muted">
              Indian Institute of Technology Delhi &middot; 2024&ndash;2028 &middot; CGPA 7.77
            </p>
          </div>
          <a
            href="/cv/Shivanshu_Aryan_CV.pdf"
            target="_blank"
            rel="noopener"
            className="shrink-0 rounded-md bg-ink px-6 py-3 font-heading text-[12px] font-700 uppercase tracking-[1px] text-paper transition-colors hover:bg-terracotta"
          >
            Download full CV (PDF)
          </a>
        </div>

        <div className="mt-14 grid gap-12 sm:grid-cols-2">
          <div>
            <h3 className="font-heading text-[13px] font-700 uppercase tracking-[1.5px] text-muted">
              Academic Achievements
            </h3>
            <ul className="mt-4 space-y-3">
              {achievements.map((a) => (
                <li key={a} className="flex gap-3 font-body text-[14.5px] text-ink">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading text-[13px] font-700 uppercase tracking-[1.5px] text-muted">
              Advisors &amp; Mentors
            </h3>
            <ul className="mt-4 space-y-3">
              {mentors.map((m) => (
                <li key={m.name} className="font-body text-[14.5px] text-ink">
                  <span className="font-700">{m.name}</span>{" "}
                  <span className="text-muted-2">&mdash; {m.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
