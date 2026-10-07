# TODO

- Look for more vibrant design ideas

- Look into possibly uploading pictures for components

- add a list on front page of recently added bike specs

- ~~add source references for bikes and components~~ done - bike and component detail pages show `source_label` from the API at the bottom

- Remove average price from the market appraisal screen — no longer makes sense and eats up real estate (`screens/MarketAppraisalScreen.js`).

- Consider renaming "Price Check" to "Marketplace" (button label in `screens/ComponentDetailScreen.js`, nav params, and `AboutScreen.js` copy).

- Reword About screen copy to be snappier and shorter (`screens/AboutScreen.js`).

- Reword the tagline above the search box on the bike specs screen to be snappier and shorter (`screens/BikesHomeScreen.js`, the "Original catalogue specifications..." text above the search input).

- Add a `country`/`market` field to bikes and surface it only where ambiguous (same brand/year, different catalogue per country, e.g. Raleigh UK vs USA 1985): badge in `meta` on year groups in `screens/BikesScreen.js`, a "Market" `Fact` row in `screens/BikeDetailScreen.js`, and appended to the subtitle in search results in `screens/BikesHomeScreen.js`. No change needed when a brand only has one country/catalogue. Rare case for now — low priority.
