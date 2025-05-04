import './SelectLanguage.css'

function SelectLanguage(props) {

const {onChange} = props
  return (
    <div data-title="select language">
    <select
    className="select"
    onChange={onChange}>
    {/* <option value="he">hebrew</option> */}
    <option value="ja">japanese</option>
    <option value="de">german</option>
    <option value="ru">russian</option>
    <option value="uk">ukrainan</option>
    <option value="fr">french</option>
  </select>
  </div>

  )
}

export default SelectLanguage
