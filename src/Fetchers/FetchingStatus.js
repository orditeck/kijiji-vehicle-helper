import React from "react"
import { useGlobalState } from "../State"
import { formatKm, formatMoney } from "../Helpers"

const FetchingStatus = () => {
  const [pages] = useGlobalState("pages")
  const [items] = useGlobalState("items")
  const [urlToCrawl] = useGlobalState("urlToCrawl")

  const pagesArray = Object.values(pages)
  const nbTotalPages = pagesArray.length
  const nbPageFetched = pagesArray.filter(page => page.status === "fetched")
    .length

  const itemsArray = Object.values(items)
  const nbTotalItems = itemsArray.length
  const fetchedItems = itemsArray.filter(item => item.status === "fetched")
  const nbItemFetched = fetchedItems.length

  const avgByKey = key =>
    (fetchedItems.reduce((total, next) => total + next[key], 0) /
      nbItemFetched) |
    0

  const avgYear = avgByKey("year")
  const avgKm = avgByKey("mileage")
  const avgPrice = avgByKey("price")

  if (!urlToCrawl || !nbTotalPages) {
    return ""
  }

  return (
    <ul>
      <li>
        {nbPageFetched}/{nbTotalPages} results pages loaded
      </li>
      <li>
        {nbItemFetched}/{nbTotalItems} item details loaded
      </li>
      <li>Avg. Year: {avgYear}</li>
      <li>Avg. Km: {formatKm(avgKm)}</li>
      <li>Avg. Price: {formatMoney(avgPrice)}</li>
    </ul>
  )
}

export default FetchingStatus
