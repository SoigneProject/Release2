import React from 'react'

var index = 0;

const Suggestions = (props) => {
  let results = props.results;
  console.log("RESULTS: " + results);
  const options = results.map(r => (
    <li key={index++}>
      {r}
    </li>
  ))
  return <ul>{options}</ul>
}

export default Suggestions