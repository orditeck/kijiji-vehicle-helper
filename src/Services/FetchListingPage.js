import axios from "axios"
import cheerio from "cheerio"

const FetchListingPage = async urlToFetch => {
  const result = await axios.get(
    `https://api-kijiji.code.bqf.ca/${urlToFetch}`
  )
  const $ = cheerio.load(result.data)
  const json = $("script[type='application/ld+json']").html();
  const jsonData = JSON.parse(json);

  const items = {};

  (jsonData.itemListElement || []).forEach(({item}) => {
    const id = item.vehicleIdentificationNumber || item.name;
    items[id] = {
        id,
        title: item.name,
        description: item.description,
        image: item.image,
        url: item.url,
        price: item.offers.price,
        condition: (item.itemCondition || "").replace("https://schema.org/", ""),
        brand: item.brand.name,
        model: item.model,
        trim: item.vehicleConfiguration,
        year: item.vehicleModelDate,
        color: item.color,
        mileage: item.mileageFromOdometer.value,
        bodyType: item.bodyType,
        driveWheelConfiguration: (item.driveWheelConfiguration || "").replace("https://schema.org/", ""),
        fuelType: item.vehicleEngine.fuelType,
      }
  });

  return items;
}

export default FetchListingPage
