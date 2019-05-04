import React from "react"

const SearchTips = props => {
  const { tips } = props
  const arr = tips.map(val => <div>{val.replace(/['"]+/g, "")}</div>)
  return <div className="search-tips">{arr}</div>
}

export default SearchTips