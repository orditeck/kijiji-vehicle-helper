import { createGlobalState } from "react-hooks-global-state"
import { validateUrl } from "./Helpers"
const urlToFetchOnLoad =
  new URLSearchParams(document.location.search).get("searchUrl") || ""

const initialState = {
  urlToCrawl: validateUrl(urlToFetchOnLoad) ? urlToFetchOnLoad : null,
  coordinates: null,
  pages: {},
  items: {},
  globalLoading: false
}

export const { setGlobalState, useGlobalState } = createGlobalState(
  initialState
)

const setStatus = (type, id, status) => {
  setGlobalState(type, v => ({
    ...v,
    [id]: {
      ...v[id],
      status
    }
  }))
}

/**
 * PAGE
 */
const setPageStatus = (id, status) => setStatus("pages", id, status)
export const setUrlToCrawl = url => setGlobalState("urlToCrawl", url)
export const setPageFetching = id => setPageStatus(id, "fetching")
export const setPageFetched = id => setPageStatus(id, "fetched")

export const addPage = (title, url) => {
  const id = Math.round(Math.random() * 36 ** 12).toString(36)

  setGlobalState("pages", v => ({
    ...v,
    [id]: {
      id,
      title,
      url,
      status: "new"
    }
  }))
}

/**
 * ITEMS
 */
const setItemStatus = (id, status) => setStatus("items", id, status)
export const setItemFetching = id => setItemStatus(id, "fetching")
export const setItemFetched = id => setItemStatus(id, "fetched")

export const setItemDistance = (id, distance) =>
  setGlobalState("items", v => ({
    ...v,
    [id]: {
      ...v[id],
      distance
    }
  }))

export const setItemDetails = (id, details) =>
  setGlobalState("items", v => ({
    ...v,
    [id]: {
      ...v[id],
      ...details
    }
  }))

export const addItems = items =>
  setGlobalState("items", v => ({
    ...v,
    ...items
  }))
