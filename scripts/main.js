// Perfect Line by Irina — shared interactivity

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Google Maps: two-click loading. No connection to Google is made until
     the visitor explicitly clicks "Karte laden" — avoids transmitting the
     visitor's IP to Google on page load without consent. */
  document.querySelectorAll('[data-maps-embed]').forEach((wrapper) => {
    const loadBtn = wrapper.querySelector('[data-maps-load]');
    loadBtn?.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = wrapper.dataset.mapsSrc;
      iframe.className = 'w-full h-full';
      iframe.style.border = '0';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.title = wrapper.dataset.mapsTitle;
      iframe.allowFullscreen = true;
      wrapper.querySelector('[data-maps-placeholder]')?.remove();
      wrapper.appendChild(iframe);
    });
  });

  /* Image galleries (e.g. hairstyle catalog): clicking a small image swaps it with the large one */
  document.querySelectorAll('[data-gallery]').forEach((gallery) => {
    const main = gallery.querySelector('[data-main]');
    if (!main) return;
    gallery.querySelectorAll('[data-thumb]').forEach((thumb) => {
      thumb.addEventListener('click', () => {
        const a = main.innerHTML;
        main.innerHTML = thumb.innerHTML;
        thumb.innerHTML = a;
      });
    });
  });

  /* Mobile navigation toggle */
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navPanel = document.querySelector('[data-nav-panel]');
  if (navToggle && navPanel) {
    navToggle.addEventListener('click', () => {
      const open = navPanel.classList.toggle('flex');
      navPanel.classList.toggle('hidden');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navPanel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navPanel.classList.add('hidden');
        navPanel.classList.remove('flex');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Header shadow after scroll */
  const header = document.querySelector('[data-site-header]');
  if (header) {
    const onScroll = () => header.classList.toggle('shadow-sm', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* FAQ accordion */
  document.querySelectorAll('[data-faq-item]').forEach((item) => {
    const trigger = item.querySelector('[data-faq-trigger]');
    const panel = item.querySelector('[data-faq-panel]');
    if (!trigger || !panel) return;
    trigger.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-open') === 'true';
      document.querySelectorAll('[data-faq-item]').forEach((other) => {
        other.setAttribute('data-open', 'false');
        other.querySelector('[data-faq-panel]').style.maxHeight = null;
        other.querySelector('[data-faq-trigger]').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.setAttribute('data-open', 'true');
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* Testimonial slider */
  document.querySelectorAll('[data-testimonial-slider]').forEach((slider) => {
    const track = slider.querySelector('[data-testimonial-track]');
    const slides = Array.from(slider.querySelectorAll('[data-testimonial-slide]'));
    const prevBtn = slider.querySelector('[data-testimonial-prev]');
    const nextBtn = slider.querySelector('[data-testimonial-next]');
    const dots = Array.from(slider.querySelectorAll('[data-testimonial-dot]'));
    if (!track || slides.length < 2) return;
    let index = 0;
    const update = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('bg-taupe-deep', i === index);
        dot.classList.toggle('bg-taupe/50', i !== index);
      });
    };
    prevBtn?.addEventListener('click', () => {
      index = (index - 1 + slides.length) % slides.length;
      update();
    });
    nextBtn?.addEventListener('click', () => {
      index = (index + 1) % slides.length;
      update();
    });
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        index = i;
        update();
      });
    });
  });

  /* Google-Bewertungen: native touch swipe on mobile (just overflow-x-auto).
     On mouse devices, scroll speed follows cursor position within the
     track — left half nudges left, right half nudges right, with a dead
     zone in the middle and faster scrolling toward the edges. */
  document.querySelectorAll('[data-reviews-track]').forEach((track) => {
    const canHover = window.matchMedia('(pointer: fine)').matches;
    if (!canHover || reduceMotion) return;

    const maxSpeed = 9; // px per animation frame at the very edge
    const deadZone = 0.15; // fraction of half-width that stays still
    let targetSpeed = 0;
    let rafId = null;

    const step = () => {
      if (targetSpeed !== 0) track.scrollLeft += targetSpeed;
      rafId = requestAnimationFrame(step);
    };

    track.addEventListener('mouseenter', () => {
      track.style.scrollSnapType = 'none'; // let continuous scrollLeft writes through
      if (rafId === null) rafId = requestAnimationFrame(step);
    });
    track.addEventListener('mousemove', (e) => {
      const rect = track.getBoundingClientRect();
      const center = rect.width / 2;
      const offset = (e.clientX - rect.left - center) / center; // -1..1
      const magnitude = Math.abs(offset);
      if (magnitude < deadZone) {
        targetSpeed = 0;
      } else {
        const normalized = (magnitude - deadZone) / (1 - deadZone);
        targetSpeed = Math.sign(offset) * normalized * maxSpeed;
      }
    });
    track.addEventListener('mouseleave', () => {
      targetSpeed = 0;
      track.style.scrollSnapType = ''; // restore CSS snap so the row settles on a card
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    });
  });

  /* Brautstyling-Anfrage (Netlify Forms, AJAX with graceful fallback) */
  const anfrageForm = document.querySelector('[data-anfrage-form]');
  if (anfrageForm) {
    const status = anfrageForm.querySelector('[data-form-status]');
    const thanks = '<div class="border border-taupe/50 bg-champagne/30 p-8 md:p-10"><span class="eyebrow">Anfrage gesendet</span><h2 class="font-display text-2xl md:text-3xl mt-3">Vielen Dank für deine Anfrage!</h2><p class="mt-4 text-espresso-soft leading-relaxed">Ich prüfe deine Angaben persönlich und melde mich so bald wie möglich bei dir, um Verfügbarkeit, Wünsche und die nächsten Schritte zu besprechen.</p></div>';
    if (new URLSearchParams(window.location.search).get('gesendet') === '1') {
      anfrageForm.outerHTML = thanks;
    } else {
      anfrageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(anfrageForm);
        const merged = new Map();
        data.forEach((value, key) => {
          merged.set(key, merged.has(key) ? merged.get(key) + ', ' + value : value);
        });
        const body = new URLSearchParams();
        merged.forEach((value, key) => body.append(key, value));
        const btn = anfrageForm.querySelector('button[type="submit"]');
        btn.disabled = true;
        status.classList.add('hidden');
        fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() })
          .then((res) => {
            if (!res.ok) throw new Error(res.status);
            anfrageForm.outerHTML = thanks;
            window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
          })
          .catch(() => {
            btn.disabled = false;
            status.textContent = 'Die Anfrage konnte gerade nicht gesendet werden. Bitte versuche es später noch einmal oder schreib mir per WhatsApp.';
            status.classList.remove('hidden');
            status.classList.add('text-espresso');
          });
      });
    }
  }

  /* Scroll reveal — native IntersectionObserver, no external library.
     Hero convergence animation lives entirely in CSS (see main.css). */
  const revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -15% 0px' });
    revealEls.forEach((el) => revealObserver.observe(el));
  }
});
