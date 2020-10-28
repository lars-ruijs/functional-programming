# Functional Programming for de Volkskrant

De Volkskrant asked us to find interesting patterns and insights for the subject "The car in the city", using data from the RDW. This contains information about parking spaces and registered vehicles.

## Research question

> Which parking garages are a potential fire hazard due to charging electric cars?

The subject of fire hazards in combination with charging electric cars in garages is regularly in the news. Just a few months ago the Dutch Fire Brigade warned in the Algemeen Dagblad about the danger of charging electric cars in parking garages. Read the article [here](https://www.ad.nl/auto/brandweer-elektrische-auto-in-parkeergarage-kan-gevaar-zijn~a7242d72/).

## Interesting variables

**From dataset "GEO Parkeer Garages":**

- AreaId
- Location coordinates
- AreaDesc

**From dataset "Specificaties Parkeergebied":**

- AreaId
- Capacity
- ChargingPointCapacity

I also saw that dynamic parking data is available for a number of locations, with information on the number of charging points occupied. However, this data is only available upon request from companies that aim to improve mobility and reduce CO2 emissions. I do not know if I qualify for this :wink:. So for now I want to use the data above.
