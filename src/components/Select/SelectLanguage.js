import React from 'react'

function SelectLanguage(props) {

const {onChange} = props
  return (
    <select
    className="select"
    onChange={onChange}>
    <option value="en">english</option>
    <option value="he">hebrew</option>
    <option value="ja">japanese</option>
    <option value="de">german</option>
  </select>
  )
}

export default SelectLanguage
