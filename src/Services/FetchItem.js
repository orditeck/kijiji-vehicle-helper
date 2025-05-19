import axios from "axios";
import cheerio from "cheerio";

const FetchItem = async (urlToFetch) => {
  const result = await axios.get(
    `https://api-kijiji.code.bqf.ca/${urlToFetch}`
  );
  const $ = cheerio.load(result.data);
  const json = $("script[type='application/ld+json']").html();
  const jsonData = JSON.parse(json);

  return {
    status: "fetched",
    datePosted: jsonData.offers.validFrom,
    description: jsonData.description,
    bodyType: jsonData.bodyType,
    location: jsonData.offers.availableAtOrFrom.name,
    coordinates: {
      lat: jsonData.offers.availableAtOrFrom.latitude,
      lng: jsonData.offers.availableAtOrFrom.longitude,
    },
    images: (() => {
      if (Array.isArray(jsonData.image)) {
        return jsonData.image.map((image) => ({
          url: image.contentUrl,
          creditText: image.creditText,
          name: image.name,
          description: image.description,
        }));
      }
      if (typeof jsonData.image === "string") {
        return [{ url: jsonData.image }];
      }
      return [];
    })(),
  };
};

export default FetchItem;
