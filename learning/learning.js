// All the topics shown in the library — add a new entry here to add a card
var topics = [
  { title: "Gut Health",        emoji: "🦠", category: "body",      minutes: 8,  essentials: 10, isNew: true,  href: "gut-health/"      },
  { title: "Supplements",       emoji: "💊", category: "nutrition", minutes: 11, essentials: 9,  isNew: true,  href: "supplements/"     },
  { title: "Training",          emoji: "🏋️", category: "movement",  minutes: 14, essentials: 8,  isNew: true,  href: "training/"        },
  { title: "Fiber & Nutrition", emoji: "🥦", category: "nutrition", minutes: 6,  essentials: 7,  isNew: true,  href: "fiber-nutrition/" },
  { title: "Sleep & Recovery",  emoji: "😴", category: "recovery",  minutes: 9,  essentials: 8,  isNew: true,  href: "sleep-recovery/"  },
  { title: "Hydration",         emoji: "💧", category: "body",      minutes: 5,  essentials: 8,  isNew: true,  href: "hydration/"       },
];

// Renders the topic cards filtered by category
// filter = "all" shows everything, otherwise matches the category field
function renderTopics(filter) {
  var filtered = filter === "all" ? topics : topics.filter(function(t) { return t.category === filter; });
  var list = document.getElementById("lib-list");

  list.innerHTML = filtered.map(function(t, i) {
    var meta  = t.category.toUpperCase() + " • " + t.minutes + " MIN • " + t.essentials + " ESSENTIALS";
    var badge = t.isNew ? '<span class="lib-new-badge">NEW!</span>' : '';
    var arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>';
    var style = 'animation-delay:' + (i * 0.07) + 's' + (t.href ? '; cursor: pointer' : '');
    return '<div class="lib-card" style="' + style + '"' +
           (t.href ? ' onclick="location.href=\'' + t.href + '\'"' : '') + '>' +
      '<div class="lib-icon">' + t.emoji + '</div>' +
      '<div class="lib-card-body">' +
        '<p class="lib-card-title">' + t.title + '</p>' +
        '<p class="lib-card-meta">' + meta + '</p>' +
      '</div>' +
      '<div class="lib-card-right">' + badge + arrow + '</div>' +
    '</div>';
  }).join("");
}

document.addEventListener("DOMContentLoaded", function() {
  renderTopics("all");

  // Filter button row — clicking any filter re-renders the list
  document.getElementById("lib-filters").addEventListener("click", function(e) {
    var btn = e.target.closest(".lib-filter");
    if (!btn) return;
    document.querySelectorAll(".lib-filter").forEach(function(b) { b.classList.remove("active"); });
    btn.classList.add("active");
    renderTopics(btn.dataset.filter);
  });
});
