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

import request from 'superagent';

var requester = {
  /**
   * Load the rolled up news for either entities, concepts, or keywords
   */
  fetchInsights: function (start, end, limit, topic) {
    return new Promise(function (resolve, reject) {
      request.get('/newsinsights')
        .query({start: start, end: end, limit: limit, topic: topic})
        .end(function (err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res.body);
          }
        }
      );
    });
  },

  /**
   * Load the min and max date range so we can render the date slider
   */
  fetchMinAndMax: function () {
    return new Promise(function (resolve, reject) {
      request.get('/minandmax').end(function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res.body);
        }
      })
    })
  },

  /**
   * Load all articles for a given entity in a given time range
   */
  fetchArticlesForEntity: function (entity, start, end) {
    return new Promise(function (resolve, reject) {
      request.get('/articles')
        .query({entity: entity, start: start, end: end})
        .end(function (err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res.body);
          }
        })
    })
  },
  
  /**
   * Retrieve all articles for a given topic from AlchemyAPI and upload them to database
   */
  fetchInsightsforTopic: function(topic) {
  	return new Promise(function(resolve, reject) {
  	  request.get('/topic')
  	  	.query({topic: topic})
  	  	.end(function(err, res) {
  	  		if (err) {
  	  			reject(err);
  	  		} else {
  	  			resolve(res.body);
  	  		}
  	  	});
  	});
  }
}

module.exports = requester;