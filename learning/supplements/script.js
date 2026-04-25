var _weight      = parseFloat(localStorage.getItem("bm_weight")) || 0;
var _weightKg    = Math.round(_weight * 0.453592);
var _proteinMin  = _weight ? Math.round(_weight * 0.7) : null;
var _proteinMax  = _weight ? Math.round(_weight * 1.0) : null;
var _caffeineMin = _weightKg ? Math.round(_weightKg * 3) : null;
var _caffeineMax = _weightKg ? Math.round(_weightKg * 6) : null;

var topicData = {
  meta: "NUTRITION • 11 MIN",
  count: "9 essentials",
  headline: "💊 Supplements",
  desc: "Ranked by clinical evidence, not marketing. Talk to your doctor before starting anything new.",
  items: [
    _proteinMin ? { type: "featured", title: "Daily Protein Target", emoji: "🥩", sarxPick: true,
      desc: "Based on your " + _weight + " lb body weight",
      meta: [{ label: "TARGET", value: _proteinMin + "–" + _proteinMax + "g" }, { label: "WHEN", value: "Daily", dim: true }],
      evidence: "high" } : null,
    { type: "featured", title: "Creatine Monohydrate", emoji: "💪", sarxPick: true,
      desc: "The most-studied supplement in sports nutrition",
      meta: [{ label: "DOSE", value: "5g daily" }, { label: "WHEN", value: "Any time", dim: true }],
      evidence: "high" },

    { type: "section", title: "The Foundation Stack", tag: "TAKE DAILY" },
    { type: "card", title: "Magnesium Glycinate",  emoji: "🧂", dosage: "200–400MG",      when: "EVENING",           evidence: "high",   trend: false, sarxPick: true  },
    { type: "card", title: "Vitamin D3 + K2",      emoji: "☀️", dosage: "2,000–5,000 IU", when: "WITH FAT",          evidence: "high",   trend: false, sarxPick: true  },
    { type: "card", title: "Fish Oil (EPA/DHA)",    emoji: "🐟", dosage: "2–3G COMBINED",  when: "WITH MEALS",        evidence: "high",   trend: false, sarxPick: true  },
    { type: "card", title: "Whey Protein",          emoji: "🥛", dosage: "20–40G",         when: "POST-WORKOUT",      evidence: "high",   trend: false, sarxPick: false },
    { type: "card", title: "Zinc Picolinate",       emoji: "⚡️", dosage: "15–30MG",        when: "EVENING",           evidence: "medium", trend: false, sarxPick: false },
    { type: "card", title: "Ashwagandha (KSM-66)", emoji: "🌿", dosage: "300–600MG",      when: "DAILY",             evidence: "medium", trend: false, sarxPick: false },
    { type: "card", title: "Caffeine",              emoji: "☕️", dosage: _caffeineMin ? _caffeineMin + "–" + _caffeineMax + "MG" : "3–6MG/KG", when: "30MIN PRE-WORKOUT", evidence: "high", trend: false, sarxPick: false },

    { type: "section", title: "The Trend Aisle", tag: "PLACEBO ZONE",
      desc: "Trending online but thin on human RCTs. Save your money — or experiment knowing it may be vibes." },
    { type: "card", title: "Lion's Mane Mushroom", emoji: "🍄", dosage: "500–1,000MG", when: "TIKTOK SAYS DAILY", evidence: "trend", trend: true, sarxPick: false },
    { type: "card", title: "NMN / NR",             emoji: "🧬", dosage: "250–500MG",   when: "MARKETED DAILY",   evidence: "trend", trend: true, sarxPick: false },

    { type: "summary", text: "High evidence = backed by clinical trials. Medium = promising signal. Trend = popular online, weak human data. Not medical advice." },
  ].filter(Boolean)
};
