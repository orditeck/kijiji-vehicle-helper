import React from "react"
import FetchingStatus from "./Fetchers/FetchingStatus"
import ItemFetcher from "./Fetchers/ItemFetcher"
import MetaFetcher from "./Fetchers/MetaFetcher"
import PageFetcher from "./Fetchers/PageFetcher"
import Items from "./Items"
import LatLng from "./LatLng"
import GlobalLoading from "./GlobalLoading"

const App = () => (
  <div className="App">
    <nav className="navbar navbar-dark sticky-top bg-dark text-white shadow">
      <div className="flex-grow-1 mr-3 d-flex justify-content-between align-items-center">
        <span className="navbar-brand">Kijiji Vehicle Helper</span>
        <MetaFetcher />
        <FetchingStatus />
      </div>
      <div>
        <LatLng />
        <PageFetcher />
        <ItemFetcher />
      </div>
    </nav>
    <GlobalLoading />

    <div className="shadow-sm my-3 p-3 bg-white rounded">
      <Items />
    </div>
  </div>
)

export default App
