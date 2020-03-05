import React from "react"
import { useGlobalState } from "./State"

const GlobalLoading = () => {
  const [pages] = useGlobalState("pages")
  const [items] = useGlobalState("items")
  const [globalLoading] = useGlobalState("globalLoading")

  if (
    !globalLoading &&
    Object.values(pages).filter(page => page.status === "fetching").length ===
      0 &&
    Object.values(items).filter(item => item.status === "fetching").length === 0
  ) {
    return ""
  }

  return (
    <div className="progress" style={{ height: "3px" }}>
      <div
        className="progress-bar progress-bar-striped progress-bar-animated"
        style={{ width: "100%" }}
      ></div>
    </div>
  )
}

export default GlobalLoading
