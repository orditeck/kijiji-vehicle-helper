import { useEffect } from "react"
import FetchListingPage from "../Services/FetchListingPage"
import {
  addItems,
  setPageFetched,
  setPageFetching,
  useGlobalState
} from "../State"

const PageFetcher = () => {
  const [pages] = useGlobalState("pages")

  useEffect(() => {
    const pagesArray = Object.values(pages)
    pagesArray
      .filter(page => !page.loading)
      .forEach(page => {
        if (!["fetched", "fetching"].includes(page.status)) {
          ;(async () => {
            setPageFetching(page.id)
            addItems(await FetchListingPage(page.url))
            setPageFetched(page.id)
          })()
        }
      })
  }, [pages])

  return ""
}

export default PageFetcher
