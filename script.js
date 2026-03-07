/* ================================================
   AK Next Gen Tech — script.js
   All interactive functionality for the website
================================================ */

/* ---- Init AOS (Scroll Animations) ---- */
AOS.init({
  duration: 700,
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  once: true,
  offset: 60
});

/* ================================================
   CUSTOM CURSOR
================================================ */
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .service-card, .price-card, .tab').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    cursorRing.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    cursorRing.classList.remove('hover');
  });
});

/* ================================================
   SCROLL PROGRESS BAR
================================================ */
window.addEventListener('scroll', () => {
  const scrollTop  = document.documentElement.scrollTop;
  const docHeight  = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct        = docHeight > 0 ? (scrollTop / docHeight * 100) : 0;
  document.getElementById('progress-bar').style.width = pct + '%';
});

/* ================================================
   STICKY NAVBAR
================================================ */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 30);
});

/* ================================================
   HAMBURGER MENU
================================================ */
function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('nav-links').classList.remove('open');
      document.getElementById('hamburger').classList.remove('open');
    });
  });
});

/* ================================================
   FLOATING PARTICLES (Hero Section)
================================================ */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: -10px;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
      --drift: ${(Math.random() - 0.5) * 200}px;
      background: ${Math.random() > 0.5 ? 'var(--accent2)' : 'var(--accent)'};
    `;
    container.appendChild(p);
  }
}
createParticles();

/* ================================================
   PRICING TABS
================================================ */
function showCategory(id, btn) {
  document.querySelectorAll('.pricing-grid').forEach(g => g.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('cat-' + id).classList.add('active');
  btn.classList.add('active');
  AOS.refresh();
}

/* ================================================
   COUNTER ANIMATION (Hero Stats)
================================================ */
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target   = el.textContent;
    const numMatch = target.match(/\d+/);
    if (!numMatch) return;

    const end    = parseInt(numMatch[0]);
    const suffix = target.replace(numMatch[0], '');
    let start    = 0;
    const step   = end / 50;

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        el.textContent = end + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start) + suffix;
      }
    }, 30);
  });
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);

/* ================================================
   WHATSAPP CONTACT FORM
================================================ */
var WA_NUMBER = "916381084514";

function sendToWhatsApp() {
  var name     = document.getElementById('cf-name').value.trim();
  var phone    = document.getElementById('cf-phone').value.trim();
  var college  = document.getElementById('cf-college').value.trim();
  var course   = document.getElementById('cf-course').value.trim();
  var service  = document.getElementById('cf-service').value;
  var deadline = document.getElementById('cf-deadline').value;
  var budget   = document.getElementById('cf-budget').value.trim();
  var message  = document.getElementById('cf-message').value.trim();

  // Validate required fields
  if (!name || !college || !course || !service || !message) {
    ['cf-name', 'cf-college', 'cf-course', 'cf-service', 'cf-message'].forEach(id => {
      const el = document.getElementById(id);
      if (!el.value.trim()) {
        el.style.borderColor = '#ef4444';
        el.style.boxShadow   = '0 0 0 4px rgba(239,68,68,0.1)';
        setTimeout(() => {
          el.style.borderColor = '';
          el.style.boxShadow   = '';
        }, 2000);
      }
    });
    return;
  }

  var text =
    "🎓 *New Enquiry – AK Next Gen Tech*\n\n" +
    "👤 *Name:* "          + name    + "\n" +
    (phone    ? "📱 *Phone:* "    + phone    + "\n" : "") +
    "🏫 *College:* "       + college + "\n" +
    "📚 *Course & Year:* " + course  + "\n" +
    "🛠️ *Service:* "       + service + "\n" +
    (deadline ? "📅 *Deadline:* " + deadline + "\n" : "") +
    (budget   ? "💰 *Budget:* "   + budget   + "\n" : "") +
    "💬 *Details:* "       + message + "\n\n" +
    "Please help me with my project!";

  window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text), '_blank');
}