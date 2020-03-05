import axios from "axios"
import cheerio from "cheerio"
import { trimString } from "../Helpers"

const FetchMeta = async urlToFetch => {
  const result = await axios.get(
    `https://api-kijiji.code.nevek.co/${urlToFetch}`
  )
  const $ = cheerio.load(result.data)
  const pages = []

  const currentPage = trimString(
    $(".bottom-bar .pagination span.selected").text()
  )

  pages.push({
    page: Number(currentPage),
    url: urlToFetch
  })

  $(".bottom-bar .pagination a")
    .not("[title]")
    .not(".rss-link")
    .each((i, link) => {
      const url = "https://www.kijiji.ca" + $(link).attr("href")
      const page = Number(trimString($(link).text()))

      if (pages.find(p => p.url === url)) {
        return
      }

      pages.push({
        page,
        url
      })
    })

  return pages
}

export default FetchMeta
