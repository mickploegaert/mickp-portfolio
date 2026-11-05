export function scrollToSection(href: string) {
  if (!href.startsWith("/#")) return false;
  const element = document.getElementById(href.replace("/#", ""));
  if (!element) return false;

  const offset = 88;
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
  return true;
}
