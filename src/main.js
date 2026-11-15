const menu = document.querySelector('#site-menu');
const menuToggle = document.querySelector('.menu-toggle');

function setMenuOpen(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menu.hidden = !open;
}

menuToggle.addEventListener('click', () => setMenuOpen(menu.hidden));
menu.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link) return;

  const destination = document.querySelector(link.hash);
  setMenuOpen(false);
  destination.setAttribute('tabindex', '-1');
  destination.focus({ preventScroll: true });
});
document.addEventListener('click', (event) => {
  if (!menu.hidden && !event.target.closest('.header-bar')) setMenuOpen(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !menu.hidden) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

const tabList = document.querySelector('[role="tablist"]');
const tabs = [...tabList.querySelectorAll('[role="tab"]')];

function selectTab(selected) {
  for (const tab of tabs) {
    const active = tab === selected;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
  }
}

for (const tab of tabs) {
  tab.addEventListener('click', () => selectTab(tab));
}

tabList.addEventListener('keydown', (event) => {
  const index = tabs.indexOf(event.target);
  if (index === -1) return;

  const nextIndices = {
    ArrowLeft: (index - 1 + tabs.length) % tabs.length,
    ArrowRight: (index + 1) % tabs.length,
    ArrowUp: (index - 1 + tabs.length) % tabs.length,
    ArrowDown: (index + 1) % tabs.length,
    Home: 0,
    End: tabs.length - 1,
  };
  const nextTab = tabs[nextIndices[event.key]];
  if (!nextTab) return;

  event.preventDefault();
  selectTab(nextTab);
  nextTab.focus();
});
