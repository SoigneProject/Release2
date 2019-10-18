import React, { Component } from "react";
import ReactDOM from "react-dom";
import algoliasearch from "algoliasearch/lite";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  InstantSearch,
  Hits,
  Highlight,
  // SearchBox,
  connectSearchBox
} from "react-instantsearch-dom";

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
      },

      focused: {}
    }
  },
  margin: {}
}));

const SearchBox = ({currentRefinement, refine}) => {
  const classes = useStyles();
  return (
    <div
      style={{
        width: "100%",
        marginTop: 13
      }}
    >
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
        style={{width: "100%"}}
      />{" "}
      {currentRefinement ? <Hits hitComponent={Hit} /> : null}
    </div>
  );
};

const CustomSearchBox = connectSearchBox(SearchBox);

export default function Search() {
  return (
    <div style={{width: "100%"}}>
    <InstantSearch indexName="dev_USERS" searchClient={searchClient}>
      <CustomSearchBox />
      
    </InstantSearch>
    </div>
  );
}

const Hit = hit => {
  return (
    <div>
      <div className="hit-username">
        <Highlight attribute="username" hit={hit.hit} />
      </div>
    </div>
  );
}
