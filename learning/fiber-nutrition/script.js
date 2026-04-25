var _tdee       = parseFloat(localStorage.getItem("bm_tdee")) || 0;
var _sex        = localStorage.getItem("bm_sex");
var _fiberTarget = _tdee ? Math.round(_tdee / 1000 * 14) : (_sex === "male" ? 38 : _sex === "female" ? 25 : null);
var _fiberNote   = _tdee ? "Based on your " + Math.round(_tdee) + " kcal TDEE" : "Sex-based recommendation";

var topicData = {
  meta: "NUTRITION • 6 MIN",
  count: "7 essentials",
  headline: "🥦 Fiber & Nutrition",
  desc: "95% of adults miss the target. It might be the highest-leverage nutrient you ignore.",
  items: [
    _fiberTarget ? { type: "featured", title: "Daily Fiber Target", emoji: "🌾", sarxPick: true,
      desc: _fiberNote,
      meta: [{ label: "TARGET", value: _fiberTarget + "g" }, { label: "WHEN", value: "Daily", dim: true }],
      evidence: "high" } : null,
    { type: "featured", title: "Black Beans", emoji: "🫘", sarxPick: true,
      desc: "The single best whole-food fiber source",
      meta: [{ label: "FIBER", value: "15g per cup" }, { label: "SERVING", value: "1 cup/day", dim: true }],
      evidence: "high" },

    { type: "section", title: "High-Fiber Foods", tag: "DAILY TARGETS" },
    { type: "card", title: "Avocado",          emoji: "🥑", dosage: "10G PER FRUIT",   when: "½–1 DAILY",   evidence: "high", trend: false },
    { type: "card", title: "Oats (Steel-Cut)", emoji: "🌾", dosage: "8G PER CUP",      when: "BREAKFAST",   evidence: "high", trend: false },
    { type: "card", title: "Raspberries",      emoji: "🫐", dosage: "8G PER CUP",      when: "1 CUP",       evidence: "high", trend: false },
    { type: "card", title: "Chia Seeds",       emoji: "🌱", dosage: "10G PER 2 TBSP",  when: "DAILY",       evidence: "high", trend: false },
    { type: "card", title: "Broccoli",         emoji: "🥦", dosage: "5G PER CUP",      when: "WITH DINNER", evidence: "high", trend: false },
    { type: "card", title: "Apple (with skin)",emoji: "🍎", dosage: "4G PER FRUIT",    when: "SNACK",       evidence: "high", trend: false },
    { type: "card", title: "Almonds",          emoji: "🌰", dosage: "4G PER OZ",       when: "1 OZ DAILY",  evidence: "high", trend: false },

    { type: "section", title: "The Trend Aisle", tag: "PLACEBO ZONE",
      desc: "Trending online but thin on human RCTs. Save your money — or experiment knowing it may be vibes." },
    { type: "card", title: "Fiber Gummies",        emoji: "🥤", dosage: "3G PER SERVING", when: "PHARMACY AISLE",  evidence: "trend", trend: true },
    { type: "card", title: "Celery Juice Cleanse", emoji: "🥬", dosage: "16 OZ",           when: "IG WELLNESS FAD", evidence: "trend", trend: true },

    { type: "summary", text: "Ramp slowly — going from 10g to 35g overnight will not be pleasant. Add 5g per week and drink more water." },
  ].filter(Boolean)
};
