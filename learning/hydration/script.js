var _weight  = parseFloat(localStorage.getItem("bm_weight")) || 0;
var _waterOz = _weight ? Math.round(_weight * 0.5) : null;

var topicData = {
  meta: "BODY • 5 MIN",
  count: "8 essentials",
  headline: "💧 Hydration",
  desc: "Water shapes metabolism, performance, and cognition. The right amount — and the right minerals.",
  items: [
    { type: "featured", title: "Bodyweight × 0.5 oz", emoji: "💧", sarxPick: true,
      desc: _waterOz ? "Based on your " + _weight + " lb body weight" : "Your daily water target in fluid ounces",
      meta: [{ label: "TARGET", value: _waterOz ? _waterOz + " oz" : "½ oz/lb" }, { label: "WHEN", value: "Daily", dim: true }],
      evidence: "high" },

    { type: "section", title: "Daily Hydration", tag: "HOW MUCH, WHEN" },
    { type: "card", title: "Front-Load Mornings",   emoji: "🌅", dosage: "16–32 OZ",    when: "ON WAKING",     evidence: "medium", trend: false },
    { type: "card", title: "Add Electrolytes",      emoji: "🧂", dosage: "1–2G SODIUM", when: "WITH TRAINING", evidence: "high",   trend: false },
    { type: "card", title: "Pre-Workout Bolus",     emoji: "🏋️", dosage: "16–20 OZ",    when: "2 HRS PRIOR",   evidence: "high",   trend: false },
    { type: "card", title: "Sip During Training",   emoji: "🥤", dosage: "20–32 OZ/HR", when: "DURING",        evidence: "high",   trend: false },
    { type: "card", title: "Tea & Coffee Count",    emoji: "🍵", dosage: "COUNTS 100%", when: "TOWARD TOTAL",  evidence: "high",   trend: false },
    { type: "card", title: "Water-Rich Foods",      emoji: "🍉", dosage: "~20%",         when: "FROM FOOD",     evidence: "high",   trend: false },
    { type: "card", title: "Check Urine Color",     emoji: "🚽", dosage: "PALE YELLOW",  when: "ALL DAY",       evidence: "high",   trend: false },

    { type: "section", title: "The Trend Aisle", tag: "PLACEBO ZONE",
      desc: "Trending online but thin on human RCTs. Save your money — or experiment knowing it may be vibes." },
    { type: "card", title: "Alkaline Water",         emoji: "🪨", dosage: "PH 8–9",      when: "MARKETING CLAIM", evidence: "trend", trend: true },
    { type: "card", title: "Hydrogen Water Bottles", emoji: "🧊", dosage: "~1.6 PPM H₂", when: "WELLNESS FAD",    evidence: "trend", trend: true },

    { type: "summary", text: "Overhydration is real — drinking gallons without electrolytes can dilute sodium dangerously. Match minerals to volume." },
  ]
};
