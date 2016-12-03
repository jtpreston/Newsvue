//------------------------------------------------------------------------------
// Copyright IBM Corp. 2015
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

import moment     from 'moment';
import Dispatcher from './Dispatcher';
import Constants  from './constants/Constants';
import requester  from './requester';

var _lastStart;
var _lastEnd;
var _lastLimit = 100;
var _timeoutHandle;
var _lastTopic;

var Actions = {
  //populates the view with insights
  getInsights: function (start, end, limit, topic) {
    // if unspecified use previous values
    start = start || _lastStart;
    end = end || _lastEnd;
    limit = limit || _lastLimit;
    _lastTopic = _lastTopic || 'smart phones';
    topic = topic || _lastTopic;
    // store away current values to be referenced later
    _lastStart = start;
    _lastEnd = end;
    _lastLimit = limit;
    _lastTopic = topic;
    // dispatch and request
    Dispatcher.dispatch({ actionType: Constants.LOAD_INSIGHTS, start: start, end: end, numBubbles: limit });
    requester.fetchInsights(start, end, limit, topic).then(insights => {
      Dispatcher.dispatch({ actionType: Constants.INSIGHTS_LOADED, insights: insights });
    });
  },

  //updates the min and max values for the range slider
  getMinAndMax: function () {
    requester.fetchMinAndMax().then(minAndMax => {
      Dispatcher.dispatch({ actionType: Constants.MIN_AND_MAX, min: minAndMax.min, max: minAndMax.max });
    });
  },

  //initialzies the view
  initialize: function () {
    requester.fetchMinAndMax().then(minAndMax => {
      Dispatcher.dispatch({ actionType: Constants.MIN_AND_MAX, min: minAndMax.min, max: minAndMax.max });
      this.getInsights(moment(minAndMax.max).subtract(1, 'day').unix()*1000, minAndMax.max);
    });
  },

  //changes the number of bubbles in the view and repopulates with more entities
  changeNumBubbles: function (newBubbles) {
    Dispatcher.dispatch({ actionType: Constants.LOAD_INSIGHTS, start: _lastStart, end: _lastEnd, numBubbles: newBubbles });
    // debounce triggering the network request
    _timeoutHandle && clearTimeout(_timeoutHandle);
    _timeoutHandle = setTimeout(function () {
      this.getInsights(null, null, newBubbles);
      _timeoutHandle = undefined;
    }.bind(this), 150);
  },

  //get the articles associated with a particular entity
  loadArticlesForEntity: function (entity) {
    entity = typeof entity === 'string' ? entity : entity._id;
    Dispatcher.dispatch({ actionType: Constants.ENTITY_SELECTED, entity: entity});
    requester.fetchArticlesForEntity(entity, _lastStart, _lastEnd).then(articles => {
      Dispatcher.dispatch({ actionType: Constants.ARTICLES_LOADED, articles: articles, entity: entity });
    })
  },

  //return to the view after exiting an entity's article list
  deselectEntity: function () {
    Dispatcher.dispatch({ actionType: Constants.ENTITY_SELECTED});
  },
  
  //after a new topic is selected, prompt the backend to query alchemy api and then repopulate the view with new insights
  getInsightsForTopic: function(topic) {
  	Dispatcher.dispatch({actionType: Constants.NEW_TOPIC, topic: topic});
  	requester.fetchInsightsforTopic(topic).then(insights => {
  	  requester.fetchMinAndMax().then(minAndMax => {
      	Dispatcher.dispatch({ actionType: Constants.MIN_AND_MAX, min: minAndMax.min, max: minAndMax.max });
      	this.getInsights(moment(minAndMax.max).subtract(1, 'day').unix()*1000, minAndMax.max, null, topic);
      });
    });
  }
}

module.exports = Actions;
