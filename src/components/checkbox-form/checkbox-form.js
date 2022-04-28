import '../input-form/input-form.scss'

const CheckboxForm = ({label, forName, type, text}) => {
    let textValue = text ? text : ''
    return (
        <p className="input-form">
            <label htmlFor={forName}>{label}</label>
            <input type={type} name={forName}/>
            <span>{textValue}</span>
        </p>
    )
}

export default CheckboxForm;