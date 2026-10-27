// One-off seasonal artwork. Dates include the site's Philippine timezone.
export const regularLogo = '/images/header-logo-light.webp';
export const halloweenLogo = '/images/bright-forge-halloween-2026.webp';
export const halloweenStarts = Date.parse('2026-10-27T00:00:00+08:00');
export const halloweenEnds = Date.parse('2026-11-01T00:00:00+08:00');
export const logoForDate = (now: number) => now >= halloweenStarts && now < halloweenEnds ? halloweenLogo : regularLogo;
export const currentLogo = logoForDate(Date.now());
