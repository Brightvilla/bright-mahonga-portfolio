/* ===========================================================
   Villa — Website Developer portfolio
   Behaviour: nav, scroll reveal, skill bars, inquiry form
   =========================================================== */

document.addEventListener('DOMContentLoaded', function () {

  // ---- footer year ----
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- mobile menu toggle ----
  var menuBtn = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      var isOpen = mobileMenu.style.display === 'flex';
      mobileMenu.style.display = isOpen ? 'none' : 'flex';
      menuBtn.textContent = isOpen ? '☰' : '✕';
      menuBtn.setAttribute('aria-expanded', String(!isOpen));
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.style.display = 'none';
        menuBtn.textContent = '☰';
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- animate skill bars on view ----
  var bars = document.querySelectorAll('.bar i');
  bars.forEach(function (b) { b.style.transform = 'scaleX(0)'; });
  var barObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'transform 1s cubic-bezier(.4,0,.2,1)';
        entry.target.style.transform = 'scaleX(1)';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(function (b) { barObserver.observe(b); });

  // ---- reveal-on-scroll for sections/cards ----
  var revealEls = document.querySelectorAll('.reveal');
  var revealObserver = new IntersectionObserver(function (entries) {
    
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(function (el) { revealObserver.observe(el); });

  // =========================================================
  // Inquiry form: real email delivery via Formspree, with an
  // automatic mailto fallback if the request fails (or if the
  // endpoint below hasn't been configured yet).
  //
  // To activate real delivery:
  //   1. Create a free account at https://formspree.io
  //   2. Create a new form pointed at brightmahonga7@gmail.com
  //   3. Copy the endpoint it gives you (looks like
  //      https://formspree.io/f/abcdwxyz) and paste it below,
  //      replacing 'your_form_id'.
  //   4. Formspree will send one confirmation email the first
  //      time — click it once, then every inquiry after that is
  //      delivered straight to the inbox.
  // Until you do this, the form still works: it just opens the
  // visitor's email app with everything pre-filled instead.
  // =========================================================
  var ENQUIRY_EMAIL = 'brightmahonga7@gmail.com';
  var FORM_ENDPOINT = 'https://formspree.io/f/mwlkyooe';

  var form = document.getElementById('inquiryForm');
  var status = document.getElementById('formStatus');
  var submitBtn = document.getElementById('submitBtn');

  function buildMailto(data) {
    var subject = 'New project inquiry from ' + data.name;
    var bodyLines = [
      'Name: ' + data.name,
      'Email: ' + data.email,
      'Project type: ' + data.projectType,
      'Budget: ' + (data.budget || 'Not specified'),
      '',
      'Message:',
      data.message
    ];
    return 'mailto:' + ENQUIRY_EMAIL
      + '?subject=' + encodeURIComponent(subject)
      + '&body=' + encodeURIComponent(bodyLines.join('\n'));
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.className = 'form-status';
      status.textContent = '';

      var data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        projectType: form.projectType.value,
        budget: form.budget.value,
        message: form.message.value.trim()
      };

      if (!data.name || !data.email || !data.projectType || !data.message) {
        status.className = 'form-status err';
        status.textContent = 'Please fill in your name, email, project type and message.';
        return;
      }
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(data.email)) {
        status.className = 'form-status err';
        status.textContent = "That email address doesn't look quite right — please double check it.";
        return;
      }

      // Formspree endpoint not set up yet -> go straight to the mailto fallback.
      if (FORM_ENDPOINT.indexOf('your_form_id') !== -1) {
        window.location.href = buildMailto(data);
        status.className = 'form-status ok';
        status.textContent = 'Opening your email app to send this inquiry…';
        form.reset();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          'Project type': data.projectType,
          'Budget': data.budget || 'Not specified',
          message: data.message,
          _subject: 'New project inquiry from ' + data.name
        })
      }).then(function (res) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send inquiry';
        if (res.ok) {
          status.className = 'form-status ok';
          status.textContent = "Thanks — your inquiry has been sent. I'll reply within one business day.";
          form.reset();
        } else {
          throw new Error('Delivery failed');
        }
      }).catch(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send inquiry';
        // fall back to mailto so the inquiry still reaches Villa
        window.location.href = buildMailto(data);
        status.className = 'form-status ok';
        status.textContent = 'Opening your email app to send this inquiry instead…';
        form.reset();
      });
    });
  }
});
