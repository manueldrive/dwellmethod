// Shared header: hamburger menu open/close, and the Bookmark pop-up.
(function () {
  var btn = document.querySelector('.menu-btn'), menu = document.getElementById('menu');
  if (btn && menu) {
    var set = function (open) { btn.setAttribute('aria-expanded', open); menu.classList.toggle('open', open); };
    btn.addEventListener('click', function (e) { e.stopPropagation(); set(!menu.classList.contains('open')); });
    document.addEventListener('click', function (e) { if (!menu.contains(e.target)) set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
  }
})();

// The Bookmark: one design used by the pop-up here and by bookmark-print.html (which makes the printable PDF).
window.dwellBookmark = (function () {
  var mark = '<div class="bm-mark"><span class="side"><span>Dwell</span></span><span class="box">STUDY</span></div>';
  function step(n, name, items) {
    return '<section class="bm-step"><h3><i>' + n + '</i>' + name + '</h3><ul>' + items.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul></section>';
  }
  function pray(t) { return '<div class="bm-pray"><b>Pray</b><p>' + t + '</p></div>'; }
  var front = mark +
    pray('Lord, grant me the spirit of wisdom and revelation in the knowledge of who You are. Amen.') +
    step(1, 'Discover', [
      'Use a study Bible or trusted resource to set the scene:<span class="bm-meta">Author &bull; Audience &bull; Time &bull; Purpose</span>',
      'Put the resource away and read slowly. Write down anything that stands out or poses a question.']) +
    step(2, 'Word Work', [
      'Reread the passage. Which words or phrases are being emphasized? (Look for repetition, lists, comparisons, etc.)',
      'Which words need more clarity? Look them up or compare translations. What do you learn?',
      'How would you summarize the passage in 1&ndash;2 sentences?']) +
    '<div class="bm-foot">dwellstudy.com</div>';
  var back =
    pray('Lord, correct any lies I believe. Let this knowledge increase my love for You and others, not my pride. Amen.') +
    step(3, 'Expand', [
      'Read the surrounding chapters to see how this fits the whole book.',
      'Follow cross-references to see where similar themes appear elsewhere in Scripture.']) +
    step(4, 'Learn', [
      'What was the takeaway for the first people who read this?',
      'What does this teach us about who God is and how He works? Check your findings in community, notes, or commentaries.']) +
    step(5, 'Live', [
      'What cultural or personal lies does this truth expose?',
      'How will this shape your prayers, thoughts, words, or actions today?']) +
    '<div class="bm-verse"><p>Let the word of Christ <b>dwell</b> in you richly.</p><div class="bm-foot" style="margin-top:0">Colossians 3:16</div></div>';
  return { front: '<div class="bmf">' + front + '</div>', back: '<div class="bmf">' + back + '</div>' };
})();

(function () {
  var dlg;
  function build() {
    dlg = document.createElement('dialog');
    dlg.className = 'bm-dlg';
    dlg.setAttribute('aria-labelledby', 'bmTitle');
    dlg.innerHTML =
      '<div class="bm-in">' +
        '<div class="bm-top"><h2 id="bmTitle">The Bookmark</h2><button class="bm-x" type="button" aria-label="Close">&times;</button></div>' +
        '<div class="bm-body">' +
          '<div class="bm-tabs" role="group" aria-label="Side"><button type="button" data-side="front" aria-pressed="true">Front</button><button type="button" data-side="back" aria-pressed="false">Back</button></div>' +
          '<div class="bm-faces">' +
            '<div class="bm-face" data-face="front"><small>Front</small>' + window.dwellBookmark.front + '</div>' +
            '<div class="bm-face" data-face="back" hidden-mobile><small>Back</small>' + window.dwellBookmark.back + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="bm-acts"><a class="primary" href="/dwell-bookmark.pdf" download="Dwell Bookmark.pdf">Download PDF <span aria-hidden="true">&darr;</span></a><a href="/bookmark">Full page</a></div>' +
        '<div class="bm-note">Prints three to a page, front and back. Cut along the light lines.</div>' +
      '</div>';
    document.body.appendChild(dlg);
    dlg.querySelector('.bm-x').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.querySelectorAll('.bm-tabs button').forEach(function (b) {
      b.addEventListener('click', function () {
        dlg.querySelectorAll('.bm-tabs button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        dlg.querySelectorAll('.bm-face').forEach(function (f) {
          if (f.getAttribute('data-face') === b.getAttribute('data-side')) f.removeAttribute('hidden-mobile'); else f.setAttribute('hidden-mobile', '');
        });
      });
    });
  }
  function open(e) {
    if (!window.HTMLDialogElement) return;           // old browsers just follow the link to /bookmark
    if (e) e.preventDefault();
    if (!dlg) build();
    var menu = document.getElementById('menu'), btn = document.querySelector('.menu-btn');
    if (menu) { menu.classList.remove('open'); if (btn) btn.setAttribute('aria-expanded', false); }
    dlg.showModal();
  }
  document.querySelectorAll('[data-bm-modal], .menu a[href="/bookmark"]').forEach(function (a) { a.addEventListener('click', open); });
  window.openDwellBookmark = open;
})();
