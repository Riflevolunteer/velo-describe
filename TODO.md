# TODO

## Features

- "Bikes fitted with this part" list on `screens/ComponentDetailScreen.js`, linking each bike to `BikeDetail`. Needs an API endpoint (or extra field on the component detail response) returning bikes whose specs reference the component via `component_id`. Register `BikeDetail` in `ComponentsStack` in `App.js` so it opens in-stack (see the tab highlight note under Known, no action).
- Surface country where ambiguous (same brand/year, different catalogue per country, e.g. Raleigh UK vs USA 1985): badge in `meta` on year groups in `screens/BikesScreen.js` and appended to the subtitle in search results in `screens/BikesHomeScreen.js`. No change when a brand has one country/catalogue. Low priority.
- Look into uploading pictures for components.
- Look for more vibrant design ideas.

## Verify

- Check on an Android device that the bike detail "Country" row shows full names, not codes (`utils/countryName.js` uses `Intl.DisplayNames` and falls back to the raw code). If codes show, swap in a hardcoded code-to-name map.

## Release checklist

- R8 minify/obfuscation is enabled via `expo-build-properties` in `app.json`. The mapping file is embedded in each production `.aab` (`BUNDLE-METADATA/com.android.tools.build.obfuscation/proguard.map`) and Play picks it up automatically. After each release, confirm it shows under Play Console → App bundle explorer → (version) → Downloads → Assets → ReTrace mapping file. If missing, extract it with `unzip -p app.aab BUNDLE-METADATA/com.android.tools.build.obfuscation/proguard.map > mapping.txt` and upload it there.

## Known, no action

- Tapping a part from a bike's spec list opens the part detail page with the Bikes tab still highlighted. By design: `BikesStack` in `App.js` registers its own `Detail`/`Group`/`MarketAppraisal` screens so back returns to the bike. Shared screens open in whichever tab you're in, and the tab shows where you started.
- Play Console "deprecated APIs for edge-to-edge" warning (`Window.setStatusBarColor`, `getStatusBarColor`, `setNavigationBarColor`) comes from React Native core and Material Components, not app code. It's advisory and doesn't block releases. Avoid adding `backgroundColor`/`translucent` to `<StatusBar style="dark" />`. It clears once Expo/RN upgrades drop the calls.
