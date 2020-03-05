import React, { useEffect } from "react"
import { useGlobalState } from "./State"
import { usePosition } from "use-position"

const LatLng = () => {
  const [coordinates, setCoordinates] = useGlobalState("coordinates")
  const { latitude, longitude } = usePosition(false)
  const validLocation =
    coordinates &&
    "lat" in coordinates &&
    "lng" in coordinates &&
    coordinates.lat &&
    coordinates.lng

  console.log(coordinates)

  useEffect(() => {
    if (latitude && longitude) {
      setCoordinates({
        lat: Number(latitude).toFixed(4),
        lng: Number(longitude).toFixed(4)
      })
    }
  }, [latitude, longitude, setCoordinates])

  const renderLocation = () => {
    if (validLocation) {
      return (
        <>
          {coordinates.lat}, {coordinates.lng}
        </>
      )
    }

    return "Please allow geolocation"
  }

  return (
    <section className="user-lat-lng">
      Your location: {renderLocation()}
    </section>
  )
}

export default LatLng
