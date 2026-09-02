(() => {
  const chapters = [...document.querySelectorAll('.chapter')];
  const previous = document.querySelector('#previous-chapter');
  const next = document.querySelector('#next-chapter');
  const counter = document.querySelector('#chapter-counter');
  const progress = document.querySelector('#progress-bar');
  let current = 0;

  const setCurrent = (index, scroll = false) => {
    current = Math.max(0, Math.min(index, chapters.length - 1));
    counter.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(chapters.length).padStart(2, '0');
    progress.style.width = (((current + 1) / chapters.length) * 100) + '%';
    previous.disabled = current === 0;
    next.disabled = current === chapters.length - 1;
    if (scroll) chapters[current].scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  previous.addEventListener('click', () => setCurrent(current - 1, true));
  next.addEventListener('click', () => setCurrent(current + 1, true));
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
    const index = chapters.indexOf(document.querySelector(link.getAttribute('href')));
    if (index >= 0) setCurrent(index);
  }));

  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setCurrent(chapters.indexOf(visible.target));
  }, { threshold: [.35, .6] });
  chapters.forEach(chapter => observer.observe(chapter));

  document.querySelector('#theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('ia-etica-legal-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });
  if (localStorage.getItem('ia-etica-legal-theme') === 'dark') document.body.classList.add('dark');
  setCurrent(0);
})();
