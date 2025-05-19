import React from "react"
import { formatKm, formatMoney } from "./Helpers"
import { useGlobalState } from "./State"

const Items = () => {
  const [items] = useGlobalState("items");
  const itemsArray = Object.values(items);

  const avgByKey = key =>
    (itemsArray.reduce((total, next) => total + Number(next[key]), 0) /
      itemsArray.length) |
    0

  const avgYear = avgByKey("year")
  const avgKm = avgByKey("mileage")
  const avgPrice = avgByKey("price")

  const itemsWithScores = itemsArray.map(item => ({
    ...item,
    score: item.year / avgYear + item.mileage / avgKm + item.price / avgPrice
  }))

  return (
    <div className="item">
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Brand</th>
            <th>Model & Trim</th>
            <th>Year</th>
            <th>Price</th>
            <th>Mileage</th>
            <th>Location</th>
            <th>Added On</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(itemsWithScores)
            .sort((a, b) => a.score - b.score)
            .map(item => (
              <tr key={item.id}>
                <td>
                  <div
                    className="item-image"
                    style={{
                      backgroundImage: `url(${item.image})`
                    }}
                  ></div>
                </td>
                <td>
                  {item.title}{" "}
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    » ⧉
                  </a>
                </td>
                <td>{item.brand}</td>
                <td>
                  {item.model} {item.trim}
                </td>
                <td>{item.year}</td>
                <td className="no-break">
                  {item.price ? formatMoney(item.price) : ""}
                </td>
                <td className="no-break">
                  {item.mileage ? formatKm(item.mileage) : ""}
                </td>
                <td>
                  {item.location}
                  {(() => {
                    if(item.status === "fetching") {
                      return <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    }

                    if(item.distance) {
                      return ` (${item.distance} km)`;
                    }

                  })()}
                </td>
                <td>{item.datePosted ?? ""}</td>
                <td>{Number(item.score).toFixed(3)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Items
