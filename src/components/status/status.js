import { Component } from 'react';
import './status.scss'

class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'Прежде чем действовать, надо понять',
            edit: false
        }
    }

    changeStatus = (e) => {
        e.preventDefault();
    
        this.setState({edit: true})
      }

    onValueChange = (e) => {
        this.setState ({
            [e.target.name]: e.target.value
        })
    }

    editDone = () => {
        this.setState ({
            edit: false
        })
    }
    render () {
        let disabled, inputEdit;
        if (this.state.edit) {
            disabled = ' edit';
            inputEdit = 'whiteBg';
        } else {
            disabled = '';
            inputEdit = '';
        }
        return (
            <div className="status-form">
                <div className="status-form__info">
                    <div className="status-form__hello">Здравствуйте, </div>
                    <div className="status-form__person">Человек №3596941
                        <button onClick={this.editDone} className={'status-form__button' + disabled}>готово</button>
                        <a onClick={(e) => this.changeStatus(e)} href='/'  className="status-form__link">Сменить статус</a>
                        <div className={'status-form__status ' + inputEdit}>
                            <input maxLength='90' disabled={!this.state.edit} autoFocus={this.state.edit} onChange={this.onValueChange} type="text" name='status' value={this.state.status}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Status;