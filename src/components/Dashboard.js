import React, { useEffect, useState } from "react";
import Search from './Search';
// import StatesList from "./StatesList";
// import State from "./State";
import JSON_STATES from '../us-states-abbr-names.json';
import GridMap from './GridMap';
import NationalData from './NationalData';

function Dashboard() {

  const [covidData, setCovidData] = useState([])
  const [query, setQuery] = useState('')

  function fetchData() {
    fetch("https://api.covidtracking.com/v1/states/current.json")
      .then(response => response.json())
      .then(response => {
        const data = response.map(state => {
          state.stateName = JSON_STATES[state.state];
          return state;
        })
        setCovidData(data);
      })
  }

  function handleChange(event) {
    setQuery(event.target.value)
  }

  function filterQuery(state) {
    const lowerCaseQuery = query.toLowerCase();
    const lowerCaseStateName = state.stateName.toLowerCase();
    const lowerCaseStateAbbreviation = state.state.toLowerCase();

    return lowerCaseStateName.includes(lowerCaseQuery)
      || lowerCaseStateAbbreviation.includes(lowerCaseQuery)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="dashboard">
      <NationalData />
      <Search query={query} handleChange={handleChange} />
      {/* <StatesList states={covidData.filter(filterQuery)} /> */}
      <GridMap states={covidData.filter(filterQuery)} />
    </div>

  )

}

export default Dashboard;