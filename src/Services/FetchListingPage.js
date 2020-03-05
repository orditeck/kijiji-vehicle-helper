import axios from "axios"
import cheerio from "cheerio"
import { trimString } from "../Helpers"

const FetchListingPage = async urlToFetch => {
  const result = await axios.get(
    `https://api-kijiji.code.nevek.co/${urlToFetch}`
  )
  const $ = cheerio.load(result.data)

  const items = {}

  $(".regular-ad.search-item").each((i, el) => {
    const id = $(el).attr("data-listing-id") || ""
    const title = trimString($("a.title", el).text())
    const url = "https://www.kijiji.ca" + $("a.title", el).attr("href")
    const price = parseFloat(
      trimString(
        $(".price", el)
          .text()
          .replace(",", ".")
      ).replace(/[^\d.-]/g, "")
    )
    const image =
      $(".image img", el).attr("data-src") || $(".image img", el).attr("src")
    const location = trimString(
      $(".location", el)
        .children()
        .remove()
        .end()
        .text()
    )

    items[id] = {
      id,
      title,
      url,
      price,
      image,
      location
    }
  })

  return items
}

export default FetchListingPage
