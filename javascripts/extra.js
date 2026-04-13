// Extra JavaScript for Artificial Intelligence System Textbook
// Includes: prompt admonition copy button

document$.subscribe(function() {
  // --- Prompt admonition copy button ---
  document.querySelectorAll('.admonition.prompt').forEach(function(admonition) {
    // Skip if already has a copy button
    if (admonition.querySelector('.admonition-copy-btn')) return;

    var btn = document.createElement('button');
    btn.className = 'admonition-copy-btn';
    btn.textContent = 'Copy';
    btn.onclick = function() {
      // Gather all text content from the admonition body (excluding the title)
      var contentNodes = admonition.querySelectorAll('p, li, pre, code');
      var textParts = [];
      contentNodes.forEach(function(node) {
        var text = node.textContent.trim();
        if (text) textParts.push(text);
      });
      var fullText = textParts.join('\n').trim();

      if (fullText) {
        navigator.clipboard.writeText(fullText).then(function() {
          btn.textContent = 'Copied!';
          setTimeout(function() { btn.textContent = 'Copy'; }, 2000);
        }).catch(function() {
          btn.textContent = 'Error';
          setTimeout(function() { btn.textContent = 'Copy'; }, 2000);
        });
      }
    };
    admonition.style.position = 'relative';
    admonition.appendChild(btn);
  });
});
