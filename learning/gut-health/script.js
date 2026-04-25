var topicData = {
  meta: "BODY • 8 MIN",
  count: "10 essentials",
  headline: "🦠 Gut Health",
  desc: "Your microbiome influences immunity, mood, body comp, and inflammation. Feed it well.",
  items: [
    { type: "featured", title: "Eat 30+ Plants Weekly", emoji: "🥬", sarxPick: true,
      desc: "Diversity beats quantity for microbial richness",
      meta: [{ label: "TARGET", value: "30+ types" }, { label: "WHEN", value: "Per week", dim: true }],
      evidence: "high" },

    { type: "section", title: "Daily Gut Practices", tag: "EAT & LIVE" },
    { type: "card", title: "Fermented Foods",       emoji: "🥒", dosage: "1–2 SERVINGS", when: "DAILY",          evidence: "high",   trend: false },
    { type: "card", title: "Soluble Fiber",          emoji: "🌾", dosage: "25–35G",       when: "DAILY",          evidence: "high",   trend: false },
    { type: "card", title: "Polyphenols",            emoji: "🫒", dosage: "500–1,000MG",  when: "DAILY",          evidence: "high",   trend: false },
    { type: "card", title: "Limit Ultra-Processed",  emoji: "🚫", dosage: "UNDER 20%",    when: "OF CALORIES",    evidence: "high",   trend: false },
    { type: "card", title: "Sleep 7–9 Hours",        emoji: "😴", dosage: "7–9 HRS",      when: "NIGHTLY",        evidence: "medium", trend: false },
    { type: "card", title: "Daily Movement",         emoji: "🚶", dosage: "30+ MIN",       when: "DAILY",          evidence: "medium", trend: false },
    { type: "card", title: "Manage Stress",          emoji: "🧘", dosage: "10 MIN",        when: "DAILY PRACTICE", evidence: "medium", trend: false },

    { type: "section", title: "The Trend Aisle", tag: "PLACEBO ZONE",
      desc: "Trending online but thin on human RCTs. Save your money — or experiment knowing it may be vibes." },
    { type: "card", title: "Apple Cider Vinegar",    emoji: "🥃", dosage: "1 TBSP",  when: "WELLNESS FAD",   evidence: "trend", trend: true },
    { type: "card", title: "Generic Probiotic Pills", emoji: "💩", dosage: "50B CFU", when: "MARKETED DAILY", evidence: "trend", trend: true },

    { type: "summary", text: "A diverse microbiome is built over weeks, not days. Consistency wins. Talk to your doctor about persistent gut issues." },
  ]
};
