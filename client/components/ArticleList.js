//------------------------------------------------------------------------------
// Copyright IBM Corp. 2016
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//------------------------------------------------------------------------------

import React, { Component } from 'react';
import classnames from 'classnames';
import Actions    from '../Actions';
import Article from './Article';
import { AutoComplete }   from 'material-ui';
import getMuiTheme        from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider   from 'material-ui/styles/MuiThemeProvider';
import JSONP              from 'jsonp';
import moment from 'moment';

//return the title of an article. used for mapping article titles to an array
function getArticleTitles(a) {
	return a.title;
}

//return the url of an article. used for mapping article urls to an array
function getArticleUrls(a) {
	return a.url;	
}

//return the title of an article, with ellipses if the title is longer than 25 characters
function getArticleTitlesEllipses(a) {
	var title = a.title;
	
	if (title.length > 25) {
		title = title.substring(0, 25);
		title = title.concat(" ...");
	}
	
	return title;
}

//a search bar to search through a list of articles. 
//By clicking on an article, another tab opens with the article's url loaded
class ArticleSearchBar extends React.Component {
	constructor(props) {
    super(props);
	this.onUpdateInput = this.onUpdateInput.bind(this);
    this.onNewRequest = this.onNewRequest.bind(this);
    this.state = {
      inputValue : ''
    }
  }
  
  componentWillReceiveProps(props) {
  	this.setState({inputValue: props.inputValue});
  }
  
  componentWillMount() {
  	this.setState({inputValue: ''});
  }
  
  componentWillUnmount() {
  	this.setState({inputValue: ''});
  }
  
  //when an article is selected or enter is pressed, navigate to the article's page if it is a valid selection
  onNewRequest(inputValue, index) {
  	var urls = this.props.dataSource.map(getArticleUrls);
  	if (index !== -1) {
  		window.open(urls[index]);
  	} else {
  		var titles = this.props.dataSource.map(getArticleTitles);
  		var i = titles.indexOf(inputValue);
  		if (i !== -1) {
  			window.open(urls[index]);
  		}
  	}
  }
  
  //keep track of the text in the text field
  onUpdateInput(inputValue) {
    this.setState({
      inputValue: inputValue
    });
  }

  //renders a material-ui AutoComplete search bar loaded with the list of article titles
  render() {
    return <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AutoComplete
        hintText = "Search for an article"
        dataSource = {this.props.dataSource.map(getArticleTitlesEllipses)} 
        openOnFocus = {true} 
        filter = {AutoComplete.fuzzyFilter}
        onNewRequest = {this.onNewRequest} 
        menuStyle = {{maxHeight: '300px'}}
        maxSearchResults = {10}
        onUpdateInput = {this.onUpdateInput}
        searchText = {this.state.inputValue} />
      </MuiThemeProvider>
  }
}

export default ({ articles, selectedEntity }) =>
  <div className={classnames('article-list', { 'has-entity': !!selectedEntity })} onClick={e => e.stopPropagation()}>
  <div>
    <button className="back" onClick={() => Actions.deselectEntity()}>x</button>
    <h2>{selectedEntity && (selectedEntity._id || selectedEntity)}</h2>
    <ArticleSearchBar dataSource={articles} initialValue=''/>
  </div>
  <h3>Article Count: {articles.length}</h3>
    <ul className="the-articles">{articles.map(a =>
      <Article article={a} />
    )}</ul>
  </div>
