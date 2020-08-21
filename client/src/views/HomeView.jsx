import React, { Component } from 'react';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: '2020-08-27',
      time: '14:00'
    };
  }

  componentDidMount() {
    const currentDate = new Date();

    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    const currentDay = year + '-' + month + '-' + day;

    let h = currentDate.getHours();
    let m = currentDate.getMinutes();
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    const currentTime = h + ':' + m;

    this.setState({
      day: currentDay,
      time: currentTime
    });
  }

  handleCurrentTime() {}
  render() {
    return (
      <div>
        <h2>No more waiting for parking spots</h2>
        <h1>Here are the parking spots waiting for you</h1>

        <form action="">
          <label htmlFor="city-input">City</label>
          <input type="text" name="" placeholder="Park here..." id="" />
          <label htmlFor="date-input">Date:</label>
          <input type="date" name="date-input" id="date-input" value={this.state.day} onChange={this.handleCurrentTime} onLoad={this.handleCurrentTime} />
          <label htmlFor="time-input">Starting Time:</label>
          <input type="time" name="time-input" id="time-input" value={this.state.time} onChange={this.handleCurrentTime} onLoad={this.handleCurrentTime} />
          <button>Search</button>
        </form>
      </div>
    );
  }
}

export default HomeView;
