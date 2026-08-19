export const scrollToSection = (id: string, breathingRoomOffset = 20) => {
  const element = document.getElementById(id);
  if (!element) return;

  // Live measurement of current rendered header height
  const header = document.querySelector("header");
  const navHeight = header ? header.getBoundingClientRect().height : 72;
  const totalOffset = navHeight + breathingRoomOffset;

  const targetTop = element.getBoundingClientRect().top + window.scrollY - totalOffset;

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: "smooth",
  });
};
