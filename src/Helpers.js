export const trimString = text => text.replace(/\r?\n|\r/gm, "").trim()
export const formatNumber = nb => Number(nb.replace(/\D+/g, ""))
export const formatMoney = nb => new Intl.NumberFormat().format(nb) + " $"
export const formatKm = nb => new Intl.NumberFormat().format(nb) + " km"
export const validateUrl = url => {
  return (
    url.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g
    ) !== null
  )
}

export const distance = (lat1, lon1, lat2, lon2, unit) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0
  } else {
    const radlat1 = (Math.PI * lat1) / 180
    const radlat2 = (Math.PI * lat2) / 180
    const theta = lon1 - lon2
    const radtheta = (Math.PI * theta) / 180

    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)

    if (dist > 1) {
      dist = 1
    }

    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515

    if (unit === "K") {
      dist = dist * 1.609344
    }

    if (unit === "N") {
      dist = dist * 0.8684
    }

    return dist
  }
}
