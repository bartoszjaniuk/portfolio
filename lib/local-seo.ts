export const localSeoAreas = [
  "Racibórz",
  "Kietrz",
  "Rybnik",
  "Wodzisław Śląski",
  "Gliwice",
  "Markowice",
  "Marklowice",
  "Katowice",
  "Zabrze",
] as const;

export const localSeoAreaServed = ["Poland", ...localSeoAreas] as const;
