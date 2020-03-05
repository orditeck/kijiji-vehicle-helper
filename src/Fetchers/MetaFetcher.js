import React, { useState, useEffect, useRef } from "react"
import { setUrlToCrawl, useGlobalState, addPage } from "../State"
import FetchMeta from "../Services/FetchMeta"
import { validateUrl } from "../Helpers"
import Overlay from "react-bootstrap/Overlay"
import Tooltip from "react-bootstrap/Tooltip"

const MetaFetcher = () => {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [urlToCrawl] = useGlobalState("urlToCrawl")
  const [, setGlobalLoading] = useGlobalState("globalLoading")
  const input = useRef(null)

  useEffect(() => {
    if (urlToCrawl) {
      ;(async () => {
        setLoading(true)
        const data = await FetchMeta(urlToCrawl)
        setLoading(false)
        data.forEach(page => addPage(`Results page #${page.page}`, page.url))
      })()
    }
  }, [urlToCrawl])

  useEffect(() => {
    setGlobalLoading(loading)
  }, [loading, setGlobalLoading])

  const keyPress = e => {
    if (e.key === "Enter") {
      save()
    }

    if (error !== false) {
      setError(false)
    }
  }

  const save = () => {
    if (validateUrl(url)) {
      setError(false)
      setUrlToCrawl(url)
    } else {
      setError("Please enter a valid URL")
    }
  }

  const renderError = () => (
    <Overlay target={input} show={!!error} placement="bottom">
      <Tooltip>{error}</Tooltip>
    </Overlay>
  )

  if (loading) {
    return "Fetching primilary information..."
  }

  if (urlToCrawl) {
    return ""
  }

  return (
    <div className="flex-grow-1 input-group">
      {renderError()}
      <input
        type="text"
        className="form-control"
        placeholder="Enter your Kijiji's search results URL"
        onChange={e => setUrl(e.target.value)}
        value={url}
        onKeyDown={keyPress}
        autoFocus
        disabled={!!urlToCrawl}
        ref={input}
      />
      <div className="input-group-append">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => save()}
          disabled={!!urlToCrawl}
        >
          Launch
        </button>
      </div>
    </div>
  )
}

export default MetaFetcher
