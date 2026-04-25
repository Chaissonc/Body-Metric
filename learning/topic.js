(function () {
  var d = topicData;

  document.getElementById("topic-tag").innerHTML =
    d.meta + '<span class="topic-tag-count"> • ' + d.count + '</span>';

  document.getElementById("topic-headline").textContent = d.headline;

  document.getElementById("topic-desc").textContent = d.desc;

  function evidencePill(level) {
    if (level === "trend") {
      return '<span class="topic-evidence evidence-trend">TREND • PLACEBO</span>';
    }
    return '<span class="topic-evidence evidence-' + level + '">' +
      '<span class="topic-evidence-dot"></span>' +
      level.toUpperCase() + ' EVIDENCE</span>';
  }

  function renderFeatured(item) {
    var metaItems = item.meta || [
      { label: "TARGET", value: item.target },
      { label: "WHEN",   value: item.when, dim: true }
    ];
    var metaHtml = metaItems.map(function(m) {
      return '<div><p class="topic-meta-label">' + m.label + '</p>' +
        '<p class="topic-meta-value' + (m.dim ? ' topic-meta-when' : '') + '">' + m.value + '</p></div>';
    }).join("");
    return '<div class="topic-featured">' +
      '<div class="topic-featured-top">' +
        '<div class="lib-icon">' + item.emoji + '</div>' +
        '<div class="topic-featured-body">' +
          '<p class="topic-card-title">' + item.title + '</p>' +
          '<p class="topic-card-desc">' + item.desc + '</p>' +
        '</div>' +
        '<span class="topic-featured-badge">SARX PICK</span>' +
      '</div>' +
      '<hr class="topic-featured-divider">' +
      '<div class="topic-featured-meta">' +
        metaHtml +
        '<div class="topic-meta-spacer"></div>' +
        evidencePill(item.evidence) +
      '</div>' +
    '</div>';
  }

  function renderSection(item) {
    var html = '<div class="topic-section">' +
      '<p class="topic-section-title">' + item.title + '</p>' +
      '<p class="topic-section-tag">' + item.tag + '</p>' +
    '</div>';
    if (item.desc) html += '<p class="topic-section-desc">' + item.desc + '</p>';
    return html;
  }

  function renderSummary(item) {
    return '<div class="topic-summary">' +
      '<span class="topic-summary-icon">' + (item.icon || 'ℹ️') + '</span>' +
      '<p class="topic-summary-text">' + item.text + '</p>' +
    '</div>';
  }

  function renderCard(item, delay) {
    return '<div class="topic-card" style="animation-delay:' + delay + 's">' +
      '<div class="lib-icon">' + item.emoji + '</div>' +
      '<div class="topic-card-body">' +
        '<p class="topic-card-title">' + item.title + '</p>' +
        '<p class="topic-card-dosage">' + item.dosage +
          '<span class="topic-card-when"> • ' + item.when + '</span></p>' +
      '</div>' +
      evidencePill(item.evidence) +
    '</div>';
  }

  function render(filter) {
    var list = document.getElementById("topic-list");
    var html = "";
    var delay = 0;
    var pendingSection = null;

    d.items.forEach(function (item) {
      if (item.type === "featured") {
        if (filter === "all" || filter === "high" || (filter === "sarxpick" && item.sarxPick)) {
          html += renderFeatured(item);
          delay += 0.07;
        }
      } else if (item.type === "section") {
        pendingSection = item;
      } else if (item.type === "summary") {
        html += renderSummary(item);
      } else if (item.type === "card") {
        var show = filter === "all" ||
          (filter === "high"     && item.evidence === "high")   ||
          (filter === "medium"   && item.evidence === "medium") ||
          (filter === "trend"    && item.trend)                 ||
          (filter === "sarxpick" && item.sarxPick);
        if (show) {
          if (pendingSection) { html += renderSection(pendingSection); pendingSection = null; }
          html += renderCard(item, delay);
          delay += 0.07;
        }
      }
    });

    list.innerHTML = html;
  }

  render("all");

  document.getElementById("topic-filters").addEventListener("click", function (e) {
    var btn = e.target.closest(".lib-filter");
    if (!btn) return;
    document.querySelectorAll("#topic-filters .lib-filter").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    render(btn.dataset.filter);
  });
})();
