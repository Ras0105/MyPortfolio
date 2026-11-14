// Scroll-reveal for sections
  const sections = document.querySelectorAll('main section');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  sections.forEach(s => io.observe(s));

  // Active nav link on scroll
  const navLinks = document.querySelectorAll('.sidenav a');
  const navMap = new Map();
  navLinks.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) navMap.set(target, link);
  });

  const navIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = navMap.get(entry.target);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  navMap.forEach((_, target) => navIo.observe(target));


  // Theme toggle (dark / light)
  (function(){
    const root = document.documentElement;
    const btn = document.getElementById('themeToggle');
    if (!btn) return;

    function apply(theme){
      root.setAttribute('data-theme', theme);
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
    apply(root.getAttribute('data-theme') || 'light');

    // enable smooth transitions only after first paint
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('theme-anim')));

    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('theme', next); } catch(e) {}
    });

    // follow system changes if the visitor hasn't chosen manually
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener && mq.addEventListener('change', e => {
      let saved = null;
      try { saved = localStorage.getItem('theme'); } catch(err) {}
      if (!saved) apply(e.matches ? 'dark' : 'light');
    });
  })();


  // Back to top: appears after scrolling, ring shows page progress
  (function(){
    const btn = document.getElementById('toTop');
    if (!btn) return;
    const ring = btn.querySelector('.ring circle');
    const CIRC = 125.66;
    let ticking = false;

    function update(){
      const y = window.scrollY || document.documentElement.scrollTop;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(y / max, 1) : 0;
      ring.style.strokeDashoffset = CIRC * (1 - progress);
      btn.classList.toggle('show', y > 500);
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking){ requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();