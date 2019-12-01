import React, { Component } from "react";
import ReactDOM from "react-dom";
import algoliasearch from "algoliasearch/lite";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import {
 InstantSearch,
 Hits,
 Highlight,
 // SearchBox,
 connectSearchBox
} from "react-instantsearch-dom";
import { Grid } from "@material-ui/core";

const SearchChoices = [
 {
   value: 'user',
   label: 'user',
 },
 {
   value: 'post',
   label: 'post',
 },
 {
   value: 'item',
   label: 'item',
 },
];

function onSearch(e, choice, value) {
 e.preventDefault();
 console.log(choice);
 if(choice === 'user'){
   axios.get("http://localhost:6969/users/" + value)
   .then(response => {
     console.log(response);
   });
 }
 else if(choice === 'post'){
   axios.get('http://localhost:6969/posts/title/' + value)
   .then(response => {
     console.log(response);
   });
 }
 else
 {
   axios.get('http://localhost:6969/items/name/' + value)
   .then(response => {
     console.log(response);
   });
 }
}

const searchClient = algoliasearch(
 "OGBGRUY2SI",
 "ab515a53dc0869e5c6a5a1a84d8bdefc"
);

const useStyles = makeStyles(() => ({
 root: {
   flexWrap: "wrap",
   width: "100%",
   backgroundColor: "#efefef",
   marginTop: 6,
   marginLeft: 10
 },
 overrides: {
   MuiFormLabel: {
     root: {
       "&$focused": {
         color: "tomato",
         fontWeight: "bold"
       }
     },      focused: {}
   }
 },
 margin: {}
}));

const SearchBox = ({currentRefinement, refine}) => {
 const classes = useStyles();

 const [searchCriteria, setSearchCriteria] = React.useState('user');  
 
 return (
   <div
     style={{
       width: "100%",
       marginTop: 13
     }}
   >
   <Grid container spacing={1}>
   <Grid item xs={10}>

   <TextField
     className={classes.root}
     label="Search for an Outfit:"
     variant="outlined"
     id="mui-theme-provider-outlined-input"
     InputProps={{
       disableUnderline: true
     }}
     value={currentRefinement}
     onChange={event => refine(event.currentTarget.value)}
     onKeyPress={event => {
       if (event.key === 'Enter') {
         onSearch(event, currentRefinement, searchCriteria);
       }
     }}
     style={{width: "100%"}}
   />{" "}
   {currentRefinement ? <Hits hitComponent={Hit} /> : null}
   </Grid>
   <Grid item xs={1}>

   <TextField style = {{width: 100}}
           id="criteria"
           select
           label="Search Criteria"
           fullwidth = "false"
           className={classes.root}
           value={searchCriteria}
           onChange={(e) => setSearchCriteria(e.target.value)}
           SelectProps={{
           native: true,
           MenuProps: {
               className: classes.menu,
           },
           }}
           margin="normal"
           variant="outlined"
         >
       {SearchChoices.map(option => (
         <option key={option.value} value={option.value}>
           {option.label}
         </option>
       ))}
     ></TextField>
     </Grid> 
            
     
     </Grid>
     
        
   </div>
 );
};const CustomSearchBox = connectSearchBox(SearchBox);

export default function Search(prop) {
 return (
   <div style={{width: "100%"}}>
   <InstantSearch indexName="dev_USERS" searchClient={searchClient}>
     <CustomSearchBox />    </InstantSearch>
   </div>
 );
}const Hit = hit => {
 return (
   <div>
<div className="username">
       <Highlight attribute="username" hit={hit.hit} />
     </div>
   </div>
 );
}


