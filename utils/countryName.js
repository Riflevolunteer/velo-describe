// Hermes on Android has no Intl.DisplayNames, so known codes come from this
// map: the marketplace regions plus the countries bikes were catalogued in.
// Anything else tries Intl.DisplayNames, then falls back to the raw code.
const NAMES = {
  AT: 'Austria',
  AU: 'Australia',
  BE: 'Belgium',
  CA: 'Canada',
  CH: 'Switzerland',
  CN: 'China',
  CZ: 'Czechia',
  DE: 'Germany',
  DK: 'Denmark',
  ES: 'Spain',
  FI: 'Finland',
  FR: 'France',
  GB: 'United Kingdom',
  HK: 'Hong Kong',
  IE: 'Ireland',
  IT: 'Italy',
  JP: 'Japan',
  KR: 'South Korea',
  NL: 'Netherlands',
  NO: 'Norway',
  NZ: 'New Zealand',
  PL: 'Poland',
  PT: 'Portugal',
  SE: 'Sweden',
  SG: 'Singapore',
  TW: 'Taiwan',
  US: 'United States',
};

const countryName = (code) => {
  if (!code) return null;
  const upper = code.toUpperCase();
  if (NAMES[upper]) return NAMES[upper];
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(upper) ?? code;
  } catch {
    return code;
  }
};

export default countryName;
