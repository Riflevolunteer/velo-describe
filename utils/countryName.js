// Intl.DisplayNames isn't available on every engine, so fall back to the raw code.
const countryName = (code) => {
  if (!code) return null;
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code.toUpperCase()) ?? code;
  } catch {
    return code;
  }
};

export default countryName;
