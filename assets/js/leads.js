// Anvil Edtech — Meta Pixel, ad-source tracking and the demo-request form.
(function () {
  var cfg = window.ANVIL || {};

  // ---- Meta Pixel ---------------------------------------------------------
  if (cfg.pixelId) {
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', cfg.pixelId);
    window.fbq('track', 'PageView');
  }
  function track(event, data) {
    if (window.fbq) window.fbq('track', event, data || {});
  }

  // ---- Remember which ad / link brought the visitor (UTM + fbclid) ---------
  var KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];
  var params = new URLSearchParams(location.search);
  var source = {};
  try { source = JSON.parse(sessionStorage.getItem('anvil_source') || '{}'); } catch (e) {}
  KEYS.forEach(function (k) { if (params.get(k)) source[k] = params.get(k); });
  try { sessionStorage.setItem('anvil_source', JSON.stringify(source)); } catch (e) {}

  // ---- Fill contact details from config -----------------------------------
  function waLink(text) {
    return 'https://wa.me/' + cfg.whatsapp + (text ? '?text=' + encodeURIComponent(text) : '');
  }
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = waLink(a.getAttribute('data-wa'));
    a.target = '_blank';
    a.rel = 'noopener';
  });
  document.querySelectorAll('[data-tel]').forEach(function (a) {
    a.href = 'tel:' + cfg.phoneE164;
    if (!a.children.length && a.hasAttribute('data-fill')) a.textContent = cfg.phoneDisplay;
  });
  document.querySelectorAll('[data-mail]').forEach(function (a) {
    a.href = 'mailto:' + cfg.email + '?subject=' + encodeURIComponent(a.getAttribute('data-mail') || 'Enquiry');
    if (a.hasAttribute('data-fill')) a.textContent = cfg.email;
  });

  // Contact events: every WhatsApp, call or email tap.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    if (a.hasAttribute('data-wa')) track('Contact', { method: 'whatsapp' });
    else if (a.hasAttribute('data-tel')) track('Contact', { method: 'call' });
    else if (a.hasAttribute('data-mail')) track('Contact', { method: 'email' });
  });

  // ---- Demo-request form ----------------------------------------------------
  var form = document.getElementById('demoForm');
  if (!form) return;
  var status = document.getElementById('demoStatus');
  var button = form.querySelector('button[type="submit"]');

  function show(msg, ok) {
    status.textContent = msg;
    status.className = 'form-status ' + (ok ? 'ok' : 'err');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = String(v).trim(); });
    var missing = Array.prototype.filter.call(form.querySelectorAll('[required]'), function (el) { return !el.value.trim(); });
    if (missing.length) {
      show('Please fill in the fields marked *.', false);
      missing[0].focus();
      return;
    }
    if (!/^[6-9]\d{9}$/.test(data.phone.replace(/\D/g, '').slice(-10))) {
      show('Please enter a valid 10-digit mobile number.', false);
      return;
    }
    Object.keys(source).forEach(function (k) { data[k] = source[k]; });
    data.page = location.href;
    data.submittedAt = new Date().toISOString();

    var summary =
      'Hi Anvil Edtech, I want a demo.\n' +
      'Name: ' + data.name + '\n' +
      'Institute / school: ' + data.institute + '\n' +
      'Type: ' + data.type + '\n' +
      'City: ' + data.city + '\n' +
      'Students: ' + (data.students || '-') + '\n' +
      'Language(s): ' + (data.languages || '-') + '\n' +
      'Phone: ' + data.phone +
      (data.message ? '\nNote: ' + data.message : '');

    function done() {
      track('Lead', { content_name: 'Demo request', content_category: data.type });
      form.reset();
      show('Thank you! We will call you within one working day. You can also WhatsApp us now.', true);
    }

    if (!cfg.leadEndpoint) {
      done();
      window.open(waLink(summary), '_blank', 'noopener');
      return;
    }

    button.disabled = true;
    // text/plain avoids a CORS preflight, which Google Apps Script cannot answer.
    fetch(cfg.leadEndpoint, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'text/plain;charset=utf-8' } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); done(); })
      .catch(function () {
        show('Could not send just now. Opening WhatsApp so your request still reaches us.', false);
        window.open(waLink(summary), '_blank', 'noopener');
      })
      .then(function () { button.disabled = false; });
  });
})();
