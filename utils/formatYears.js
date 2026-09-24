const formatYears = (from, to) => {
  if (!from && !to) return null;
  return `${from ?? '-'} - ${to ?? '-'}`;
};

export default formatYears;
