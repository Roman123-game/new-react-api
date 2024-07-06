import React from 'react'
import './SelectLanguage.css'

function SelectLanguage(props) {

const {onChange} = props
  return (
    <div data-title="select language">
    <select
    className="select"
    onChange={onChange}>
    <option value="he">hebrew</option>
    <option value="ja">japanese</option>
    <option value="de">german</option>
    <option value="ru">russian</option>
  </select>
  </div>

  )
}

export default SelectLanguage
