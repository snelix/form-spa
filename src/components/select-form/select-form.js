import './select-form.scss'

const SelectForm = ({data, label, forName}) => {
    let elements;
    if (data) {
        elements = data.map((item, index) => {
            if (item.length > 50) {
                item = item.slice(0, 50) + '...';
            }
            return (
                <option key={index} value={item}>{item}</option>
            )
        })
    }
    return (
        <div className="select-form">
            <label htmlFor={forName}>{label}</label>
            <div className="select-form__wrapper">
                <select type="text" name={forName}>
                    {elements}
                </select>
            </div>
        </div>
    )
}

export default SelectForm;