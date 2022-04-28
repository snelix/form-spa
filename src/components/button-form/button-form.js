import './button-form.scss'

const ButtonForm = (props) => {
    const {dd, mm, yyyy, hours, minutes, seconds} = props.date;
    let elements;
    if (props.date) {
        elements = `последние изменения ${dd} ${mm} ${yyyy} в ${hours}:${minutes}:${seconds}`
    }
    return (
        <div className="button-form">
            <button type="submit" disabled={!props.formValid} className="button">Изменить</button>
            <div className="changed-time">{elements}</div>
        </div>
    )
}

export default ButtonForm;