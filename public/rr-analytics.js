/* RapidRims analytics: Vercel Web Analytics custom events + optional GA4.
 * Tracks taps on tel: and sms: links with the visitor's first-touch source. */
(function () {
  // ===== GA4 MEASUREMENT ID =====
  // Paste the Google Analytics 4 ID here (looks like 'G-XXXXXXXXXX').
  // While empty, Google Analytics is NOT loaded at all.
  var GA_ID = '';
  // ==============================

  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };

  if (GA_ID) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  var KNOWN = ['google', 'facebook', 'instagram', 'yelp', 'nextdoor', 'bing', 'duckduckgo', 'yahoo', 'tiktok', 'youtube', 'x', 'twitter', 'reddit', 'craigslist', 'apple'];

  function detectSource() {
    try {
      var utm = new URLSearchParams(location.search).get('utm_source');
      if (utm) return utm.toLowerCase().slice(0, 50);
      if (document.referrer) {
        var host = new URL(document.referrer).hostname.toLowerCase().replace(/^www\.|^m\.|^l\.|^lm\./, '');
        if (host === location.hostname.replace(/^www\./, '')) return null; // internal nav
        if (host === 't.co') return 'x';
        if (host === 'fb.me') return 'facebook';
        var parts = host.split('.');
        for (var i = 0; i < parts.length; i++) if (KNOWN.indexOf(parts[i]) !== -1) return parts[i];
        return host.slice(0, 50);
      }
    } catch (e) {}
    return 'direct';
  }

  var KEY = 'rr_first_source';
  var source;
  try {
    source = sessionStorage.getItem(KEY);
    if (!source) {
      source = detectSource() || 'direct';
      sessionStorage.setItem(KEY, source);
    }
  } catch (e) {
    source = detectSource() || 'direct';
  }

  document.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null;
    if (!a) return;
    var href = (a.getAttribute('href') || '').toLowerCase();
    var name = href.indexOf('tel:') === 0 ? 'call_click' : href.indexOf('sms:') === 0 ? 'text_click' : null;
    if (!name) return;
    var data = { source: source, page: location.pathname };
    try { window.va('event', { name: name, data: data }); } catch (e) {}
    if (window.gtag && GA_ID) {
      try { window.gtag('event', name, { source: data.source, page_path: data.page, transport_type: 'beacon' }); } catch (e) {}
    }
    // never preventDefault: the dialer / messages app opens as normal
  }, true);
})();
