import './input-form.scss'

const InputForm = ({label, forName, type, text, hint, validateForm, dirtyPass, dirtyPassR, dirtyEmail, formErrors}) => {
    let textValue = text ? text : '';
    let errClass, show;
    if (dirtyPass || dirtyPassR || dirtyEmail) {
        errClass = 'red-alert';
        show = 'show';
    } else {
        errClass = '';
        show = '';
    }

    return (
        <p className="input-form">
            <label htmlFor={forName}>{label}</label>
            <input className={errClass} onChange={(e)=> validateForm(e)} type={type} name={forName}/>{textValue}
            <span>{hint}</span>
            <span className={'labelErr ' + show}>{formErrors}</span>
        </p>
    )
}

export default InputForm;