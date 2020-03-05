import axios from "axios"
import cheerio from "cheerio"
import { trimString, formatNumber } from "../Helpers"

const FetchItem = async urlToFetch => {
  const result = await axios.get(
    `https://api-kijiji.code.nevek.co/${urlToFetch}`
  )
  const $ = cheerio.load(result.data)

  const attributes = $("div#AttributeList")

  const getValue = name =>
    trimString($(`dd[itemprop="${name}"]`, attributes).text())

  const datePosted =
    $('div[itemprop="datePosted"] time').attr("title") ||
    $('div[itemprop="datePosted"] span').attr("title")
  const brand = getValue("brand") || null
  const model = getValue("model") || null
  const trim = getValue("vehicleConfiguration") || null
  const color = getValue("color") || null
  const year = formatNumber(getValue("vehicleModelDate")) || null
  const mileage = formatNumber(getValue("mileageFromOdometer")) || null
  const numberOfDoors = formatNumber(getValue("numberOfDoors")) || null
  const seatingCapacity = formatNumber(getValue("seatingCapacity")) || null
  const [lat, lng] = [
    $("meta[property='og:latitude']").attr("content") || null,
    $("meta[property='og:longitude']").attr("content") || null
  ]

  return {
    datePosted,
    brand,
    model,
    trim,
    year,
    color,
    mileage,
    numberOfDoors,
    seatingCapacity,
    coordinates: {
      lat,
      lng
    }
  }
}

export default FetchItem
