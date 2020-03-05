import { useEffect } from "react"
import {
  useGlobalState,
  setItemFetching,
  setItemFetched,
  setItemDetails,
  setItemDistance
} from "../State"
import FetchItem from "../Services/FetchItem"
import { distance } from "../Helpers"

const ItemFetcher = () => {
  const [items] = useGlobalState("items")
  const [userCoordinates] = useGlobalState("coordinates")

  useEffect(() => {
    const calculateDistance = itemCoordinates => {
      if (
        itemCoordinates &&
        itemCoordinates.lat &&
        itemCoordinates.lng &&
        userCoordinates &&
        userCoordinates.lat &&
        userCoordinates.lng
      ) {
        return Math.round(
          distance(
            userCoordinates.lat,
            userCoordinates.lng,
            itemCoordinates.lat,
            itemCoordinates.lng,
            "K"
          )
        )
      }

      return null
    }

    const itemsArray = Object.values(items)
    itemsArray
      .filter(item => !item.loading)
      .forEach(item => {
        if (!["fetched", "fetching"].includes(item.status)) {
          ;(async () => {
            setItemFetching(item.id)
            setItemDetails(item.id, await FetchItem(item.url))
            setItemFetched(item.id)
          })()
        }

        if (
          userCoordinates &&
          item.coordinates &&
          !item.distance &&
          ["fetched"].includes(item.status)
        ) {
          setItemDistance(item.id, calculateDistance(item.coordinates))
        }
      })
  }, [items, userCoordinates])

  return ""
}

export default ItemFetcher
