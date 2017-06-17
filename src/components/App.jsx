import React, { Component } from 'react';
import '../index.css';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';
import moment from 'moment';
import { Image } from 'react-bootstrap';

import { Button, Notification, Badge } from 'element-react';
import 'element-theme-default';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dueDate: '',
      catPics: ['http://www.cutestpaw.com/wp-content/uploads/2016/02/Yawn..jpeg','http://www.cutestpaw.com/wp-content/uploads/2012/12/Really-cute-cat.png','http://www.laughspark.info/uploadfiles/pictures-of-cute-cat-635698657382597013-13024.jpg', 'http://a.fod4.com/images/user_photos/1343865/335cd5249b648648fb0b086282cbaf32_original.jpg']
    }
  }

  addReminder() {
    this.props.addReminder(this.state.text, this.state.dueDate, Math.floor(Math.random() * 4));
    return (
      Notification({
        title: 'Success!',
        message: 'I will remind you.'
      })
    )
  }
  deleteReminder(id) {
    this.props.deleteReminder(id);
  }
  clearReminders() {
    this.props.clearReminders();
  }

  error() {
    Notification({
      title: 'Error!',
      message: 'No date/message selected.'
    })
  }



  renderReminders() {
    const { reminders } = this.props;

    const arr = [];
    return (
      <ul className='list-group col-sm-4'>
        {
          reminders.map(reminder => {

            return (
              <li key={reminder.id} className='list-group-item'>
                <Image className='thumbnail-img' src={this.state.catPics[reminder.pic]} thumbnail responsive />

                <div className='list-item'>

                  <div className='rem-txt'>{reminder.text}</div>
                  <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                </div>
                <div
                  className='list-item delete-button'
                  onClick={() => this.deleteReminder(reminder.id)}
                  >&#x2715;
                </div>
              </li>
            )
          })
        }
      </ul>
    )

  }

  render () {
    return (
      <div className="App">
        <div className='header'>
          <Badge value={this.props.reminders.length}>
            <div className="title">
              Reminder Pro
            </div>
          </Badge>
        </div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="I have to ..."
              onChange={event => this.setState({text: event.target.value})}/>
            <input
              className='form-control'
              type='date'
              onChange={event => this.setState({dueDate: event.target.value})}/>
          </div>
          <button
            className="btn btn-success"
            type="button"
            onClick={this.state.text === '' || this.state.dueDate === '' ? () => this.error() : () => this.addReminder()}
            >
            Add Reminder
          </button>
        </div>
        { this.renderReminders()}
        <div className='btn btn-danger'
          onClick={() => this.clearReminders()}>
          Clear Reminders
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  }
}

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders }) (App);
