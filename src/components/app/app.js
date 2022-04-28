import {Component} from 'react';
import axios from 'axios';

import Form from '../form/form';
import Status from '../status/status';
import './app.scss';

import citiesJSON from '../../cities.json';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      edit: false,
      universityData: [],
      citiesData: this.filterCityArr(citiesJSON),
      password: '',
      email: '',
      date: '',
      dirtyPass: false,
      dirtyPassR: false,
      dirtyEmail: false,
      formErrors: {
        pass: '',
        passR: '',
        email: ''
      },
      formValid: false
    }
  }
  async componentDidMount () {
    axios.get(`http://universities.hipolabs.com/search?country=United+Kingdom`)
      .then(res => {
        const arr = res.data.map(item => item.name);
        this.setState({ universityData: arr });
      })
    
  }

  onChangeForm = (e) => {
    e.preventDefault();
    if (this.state.formValid) {
      let formData = new FormData(e.target);
      formData = Object.fromEntries(formData);
      console.log(JSON.stringify(formData))

      this.getTime();
      e.target.reset();
    }
    
  }

  validateForm = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    let fieldValidationErrors = this.state.formErrors;
    let emailDirty = this.state.dirtyEmail;
    let passwordDirty = this.state.dirtyPass;
    let passwordRepeatDirty = this.state.dirtyPassR;

    switch(name) {
      case 'email':
        emailDirty = !!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = !emailDirty ? 'Неверный E-mail' : '';
        if (!value) {
          this.setState({dirtyEmail: true})
          fieldValidationErrors.email = 'Укажите E-mail';
          return
        }
        this.setState({dirtyEmail: !emailDirty})
        break;
      case 'pass':
        passwordDirty = value.length >= 5;
        fieldValidationErrors.pass = !passwordDirty ? 'Используйте не менее 5 символов': '';
        this.setState({password: value})
        if (!value) {
          this.setState({dirtyPass: true})
          fieldValidationErrors.pass = 'Укажите пароль';
          return
        }
        this.setState({dirtyPass: !passwordDirty})
        break;
      case 'pass-repeat':
        passwordRepeatDirty = value === this.state.password;
        fieldValidationErrors.passR = !passwordRepeatDirty ? 'Пароли не совпадают': '';
        if (!value) {
          this.setState({dirtyPassR: true})
          fieldValidationErrors.passR = 'Укажите пароль';
          return
        }
        this.setState({dirtyPassR: !passwordRepeatDirty})
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors}, this.canSubmit);
  }
  
  canSubmit = () => {
    this.setState({formValid: !this.state.dirtyEmail && !this.state.dirtyPass && !this.state.dirtyPassR});
  }

  getZero = (item) => {
    if (item < 10) {
      return `0${item}`
    } else {
      return item;
    }
  }

  getTime = () => {
    const curTime = new Date();
    const month = ['января', 'февраля','марта','апреля','мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const changeDate = {
      dd: curTime.getDate(),
      mm: month[curTime.getMonth()],
      yyyy: curTime.getFullYear(),
      hours: this.getZero(curTime.getHours()),
      minutes: this.getZero(curTime.getMinutes()),
      seconds: this.getZero(curTime.getSeconds())
    }

    this.setState({
      date: changeDate
    })
  }

  sortArr = (a, b) => {
    if (a.city < b.city) return -1;
    if (a.city > b.city) return 1;
    return 0;
  }

  filterCityArr = (cities) => {
    let citiesFilter = cities.filter(item => item.population > 50000).sort((a,b)=> b.population-a.population);
    const firstItem = citiesFilter.splice(0, 1);

    citiesFilter = citiesFilter.sort((a,b) => this.sortArr(a,b));

    return [...firstItem, ...citiesFilter].map(item=>item.city);
  }

  render() {
    const {edit, universityData, citiesData, dirtyPass, dirtyPassR, dirtyEmail, formErrors, formValid } = this.state;
      return (
        <div className="app">
          <Status edit={edit} changeStatus={this.changeStatus}/>
          <Form 
            university={universityData}
            city={citiesData}
            onChangeForm={this.onChangeForm}
            date={this.state.date}
            validateForm={this.validateForm}
            dirtyPass={dirtyPass}
            dirtyPassR={dirtyPassR}
            dirtyEmail={dirtyEmail}
            formErrors={formErrors}
            formValid={formValid}
          />
        </div>
      );
  }
}

export default App;
