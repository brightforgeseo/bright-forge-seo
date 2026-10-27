// One-off seasonal artwork. Dates include the site's Philippine timezone.
export const regularLogo = '/images/header-logo-light.webp';
export const halloweenLogo = '/images/bright-forge-halloween-2026.webp';
export const halloweenStarts = Date.parse('2026-10-27T00:00:00+08:00');
export const halloweenEnds = Date.parse('2026-11-01T00:00:00+08:00');
export const christmasLogo = '/images/bright-forge-christmas-2026.webp';
export const christmasStarts = Date.parse('2026-12-01T00:00:00+08:00');
export const christmasEnds = Date.parse('2026-12-26T00:00:00+08:00');
export const logoForDate = (now: number) => {
  if (now >= halloweenStarts && now < halloweenEnds) return halloweenLogo;
  if (now >= christmasStarts && now < christmasEnds) return christmasLogo;
  return regularLogo;
};
export const nextLogoChange = (now: number) => [halloweenStarts, halloweenEnds, christmasStarts, christmasEnds].find(date => date > now);
export const currentLogo = logoForDate(Date.now());
