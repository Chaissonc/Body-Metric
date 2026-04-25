(function () {
  if (!('standalone' in window.navigator && window.navigator.standalone)) return;

  document.addEventListener('click', function (e) {
    var node = e.target;
    while (node && node.nodeName !== 'A') {
      node = node.parentNode;
    }
    if (!node || !('href' in node)) return;
    var href = node.href;
    if (href && href.indexOf(window.location.host) !== -1) {
      e.preventDefault();
      window.location.href = href;
    }
  }, false);
})();
