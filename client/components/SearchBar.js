import React, { Component } from 'react';
import { AutoComplete }   from 'material-ui';
import getMuiTheme        from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider   from 'material-ui/styles/MuiThemeProvider';
import JSONP              from 'jsonp';
import Actions from './../Actions';
import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();

const googleAutoSuggestURL = "https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=";

//list of labels supported by alchemy API
let topics = ["Art and Entertainment",
			  "Advertising and Marketing",
			  "Aerospace and Defense",
			  "Arts and Crafts",
			  "Armed Forces",
			  "Beauty",
			  "Books and Literature",
			  "Business and Industrial",
			  "Careers",
			  "Computer Science",
			  "Dance",
			  "Dating",
			  "Education",
			  "Elections",
			  "Energy",
			  "Engineering",
			  "Family and Parenting",
			  "Finance",
			  "Food and Drink",
			  "Football",
			  "Health and Fitness",
			  "Hobbies and Interests",
			  "Humor",
			  "Home and Garden",
			  "Investing",
			  "Law, Government and Politics",
			  "Medicine",
			  "Movies",
			  "Music",
			  "News",
			  "Pets",
			  "Real Estate",
			  "Religion and Spirituality",
			  "Science",
			  "Shopping",
			  "Smart Phones",
			  "Society",
			  "Sports",
			  "Style and Fashion",
			  "Technology and Computing",
			  "Tech News",
			  "Travel",
			  "Visual Art and Design",
			  "Weather"];

class SearchBar extends React.Component {
	constructor(props) {
    super(props);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.onNewRequest = this.onNewRequest.bind(this);
    this.state = {
      dataSource : [],
      inputValue : ''
    }
  }
  
  //if a valid selectoin is made, update the current state and pass the topic to the action handler to update the view
  onNewRequest(inputValue, index) {
  	var i = topics.indexOf(inputValue);
  	if (index !== -1 || i !== -1) {
	  	this.setState({
	  		inputValue: inputValue
	  	}, function() {
	  		Actions.getInsightsForTopic(inputValue.toLowerCase());
	  	});
  	}
  }
  
  //set the inputValue after each character is typed/removed
  onUpdateInput(inputValue) {
    const self = this;
    this.setState({
      inputValue: inputValue
    });/*, function() {
      self.performSearch();
    });*/
  }

  //performs a google search for the inputValue string. not in use after modification to the project.
  performSearch() {
    const
      self = this,
      url  = googleAutoSuggestURL + this.state.inputValue;

    if(this.state.inputValue !== '') {
      JSONP(url, function(error, data) {
        let searchResults, retrievedSearchTerms;

        if(error) return error;

        searchResults = data[1];

        retrievedSearchTerms = searchResults.map(function(result) {
          return result[0];
        });

        self.setState({
          dataSource: retrievedSearchTerms
        });
      });
    }
  }

  //creates an material-ui AutoComplete search bar in the view,
  //pre-loaded with topics supported by Alchemy API
  render() {
    return <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AutoComplete
        hintText = "Select a topic"
        dataSource    = {topics}
        onUpdateInput = {this.onUpdateInput} 
        onNewRequest = {this.onNewRequest}
        openOnFocus = {true} 
        filter = {AutoComplete.fuzzyFilter} 
        menuStyle = {{maxHeight: '300px'}} />
      </MuiThemeProvider>
  }
}

module.exports = SearchBar;