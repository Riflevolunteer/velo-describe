# TODO

- Look for more vibrant design ideas

- Look into possibly uploading pictures for components

- add a list on front page of recently added bike specs

- ~~add source references for bikes and components~~ done - bike and component detail pages show `source_label` from the API at the bottom

- ~~Remove average price from the market appraisal screen~~ done

- ~~Rename "Price Check" to "Marketplace"~~ done

- ~~Reword About screen copy to be snappier and shorter~~ done

- ~~Reword the bike specs screen tagline~~ done

- Add a `country`/`market` field to bikes and surface it only where ambiguous (same brand/year, different catalogue per country, e.g. Raleigh UK vs USA 1985): badge in `meta` on year groups in `screens/BikesScreen.js`, a "Market" `Fact` row in `screens/BikeDetailScreen.js`, and appended to the subtitle in search results in `screens/BikesHomeScreen.js`. No change needed when a brand only has one country/catalogue. Rare case for now — low priority.

- R8 minify/obfuscation is enabled via `expo-build-properties` in `app.json`. The R8 mapping file is embedded in each production `.aab` (`BUNDLE-METADATA/com.android.tools.build.obfuscation/proguard.map`) and Play picks it up automatically. After each release, confirm it shows under Play Console → App bundle explorer → (version) → Downloads → Assets → ReTrace mapping file. If missing, extract it with `unzip -p app.aab BUNDLE-METADATA/com.android.tools.build.obfuscation/proguard.map > mapping.txt` and upload it there.
