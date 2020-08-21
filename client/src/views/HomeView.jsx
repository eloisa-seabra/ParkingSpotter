import React, { Component } from 'react';

class HomeView extends Component {
  handleCurrentTime() {
    var d = new Date().toGMTString(),
      h = d.getHours(),
      m = d.getMinutes();
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    'input[type="time"][value="now"]'.each(function() {
      this.attr({ value: h + ':' + m });
    });
  }

  render() {
    return (
      <div>
        <h2>No more waiting for parking spots</h2>
        <h1>Here are the parking spots waiting for you</h1>

        <form action="">
          <label htmlFor="city-input">City</label>
          <input type="text" name="" placeholder="Park here..." id="" />
          <label htmlFor="city-input">Date:</label>
          <input type="date" name="" placeholder="Park here..." id="" value="2020/08/21" onChange={this.handleCurrentTime} />
          <label htmlFor="city-input">Starting Time:</label>
          <input type="time" name="" placeholder="Park here..." id="" value="14:00" onChange={this.handleCurrentTime} />
          <button>Search</button>
        </form>
      </div>
    );
  }
}

export default HomeView;
