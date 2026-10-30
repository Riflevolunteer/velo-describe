import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Must match EBAY_REGIONS in velo-describe-api (ebay-regions.js); the API
// rejects any other code with a 400.
export const REGIONS = ['US', 'GB', 'DE', 'FR', 'IT', 'AU', 'CA', 'HK', 'SG', 'AT', 'BE', 'CH', 'ES', 'IE', 'NL', 'PL'];
export const DEFAULT_REGION = 'US';

const STORAGE_KEY = 'marketplaceRegion';

// region is null until the stored setting has loaded, so callers can hold off
// fetching rather than request the default and then the stored region.
const useMarketplaceRegion = () => {
  const [region, setRegionState] = useState(null);

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(STORAGE_KEY)
      .catch(() => null)
      .then(stored => {
        if (!cancelled) setRegionState(REGIONS.includes(stored) ? stored : DEFAULT_REGION);
      });
    return () => { cancelled = true; };
  }, []);

  const setRegion = useCallback((next) => {
    setRegionState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(err => console.log(err));
  }, []);

  return [region, setRegion];
};

export default useMarketplaceRegion;
