// On iOS, when the app is saved to the home screen, tapping a regular <a> link
// opens Safari instead of staying inside the app. This fixes that by intercepting
// every link click and using window.location instead, which keeps the user in-app.
(function () {
  if (!('standalone' in window.navigator && window.navigator.standalone)) return; // only runs on iOS home screen

  document.addEventListener('click', function (e) {
    var node = e.target;
    // Walk up the DOM tree to find the <a> tag that was clicked
    while (node && node.nodeName !== 'A') {
      node = node.parentNode;
    }
    if (!node || !('href' in node)) return;
    var href = node.href;
    // Only intercept links to our own domain — let external links open normally
    if (href && href.indexOf(window.location.host) !== -1) {
      e.preventDefault();
      window.location.href = href;
    }
  }, false);
})();
