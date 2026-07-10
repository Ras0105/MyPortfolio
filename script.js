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
