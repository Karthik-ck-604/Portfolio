export const scrollToSection = (id: string, offset = 80) => {
  const element = document.getElementById(id);

  if (!element) return;

  window.scrollTo({
    top: element.getBoundingClientRect().top + window.pageYOffset - offset,
    behavior: "smooth",
  });
};
