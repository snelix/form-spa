import ButtonForm from "../button-form/button-form";
import CheckboxForm from "../checkbox-form/checkbox-form";
import InputForm from "../input-form/input-form";
import SelectForm from "../select-form/select-form";

import './form.scss'

const Form = (props) => {
    return (
        <form onSubmit={(e)=> props.onChangeForm(e)} className="form">
            <div className="form__select">
                <SelectForm
                    data={props.city}
                    label='Ваш город'
                    forName='city'
                />
                <SelectForm
                    data={props.university}
                    label='Ваш университет'
                    forName='university'
                />
            </div>
            <div className="form__password">
                <InputForm
                    required={true}
                    label='Пароль'
                    forName='pass'
                    type='password'
                    err={'Укажите пароль'}
                    hint='Ваш новый пароль должен содержать не менее 5 символов.'
                    validateForm = {props.validateForm}
                    dirtyPass={props.dirtyPass}
                    formErrors={props.formErrors.pass}
                />
                <InputForm
                    required={true}
                    label='Пароль еще раз'
                    forName='pass-repeat'
                    type='password'
                    err={'Укажите пароль'}
                    hint='Повторите пароль, пожалуйста, это обезопасит вас с нами
                    на случай ошибки.'
                    validateForm = {props.validateForm}
                    dirtyPassR={props.dirtyPassR}
                    formErrors={props.formErrors.passR}
                />
            </div>
            <div className="form__email">
                <InputForm
                    required={true}
                    label='Электронная почта'
                    forName='email'
                    type='email'
                    err={'Укажите E-mail'}
                    hint='Можно изменить адрес, указанный при регистрации. '
                    validateForm = {props.validateForm}
                    dirtyEmail={props.dirtyEmail}
                    formErrors={props.formErrors.email}
                />
            </div>
            <div className="form__checkbox">
                <CheckboxForm
                    label='Я согласен'
                    forName='checkbox'
                    type='checkbox'
                    text='принимать актуальную информацию на емейл'
                />
            </div>
            <ButtonForm date={props.date} formValid={props.formValid}/>
        </form>
    )
}

export default Form;