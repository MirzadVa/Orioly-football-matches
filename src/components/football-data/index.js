
import React, { Component } from "react";
import "./index.css";
const classNames = require('classnames');


export default class FootballMatchesData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedYear: null,
      data: null
    };
  }

  onClick = (year) =>{
    console.log(year)
    fetch(`https://jsonmock.hackerrank.com/api/football_competitions?year=${year}`)
    .then(response => response.json())
    .then(response => this.setState({data: response.data}))
  }

  render() {
    var years= [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    const { data } = this.state
    return (
      <div className="layout-row">
        <div className="section-title">Select Year</div>
        <ul className="sidebar" data-testid="year-list">
          {years.map((year, i) => {
            return (
              <li className={
                classNames({
                  'sidebar-item': true,
                  'active': this.state.selectedYear === year
                })
              }
              onClick={() => this.onClick(year)}
              key={year}>
                <a>{year}</a>
              </li>
            )
          })}
        </ul>

        {data !== null && data.length >= 0 ?  
        <section className="content">
          <section>
            <div className="total-matches" data-testid="total-matches">{data.length > 0 ? "Total matches: " + data.length : 'No matches found.'}</div>
            
            <ul className="mr-20 matches styled" data-testid="match-list">
              {data.map((elem, index) => (
                <li key={index} className="slide-up-fade-in">Match {elem.name} won by {elem.winner} </li>
              ))}
             
            </ul>
          </section>

          <div data-testid="no-result" className="slide-up-fade-in no-result"></div>
        </section> : null}
      </div>
    );
  }
}