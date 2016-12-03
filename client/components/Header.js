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

import React from 'react';
import SearchBar from './SearchBar'

//creates the header, including a search bar for selecting a topic to view 
export default () =>
  <div className="header">
    <h1 className="newsvue-title">Newsvue</h1>
    <SearchBar />
    <div className="header-links">
      <a href="http://www.jkaufman.io/election-insights/">Base Application Author's Blog</a>
      <a href="http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/">Built with IBM Watson</a>
      <a href="https://github.com/IBM-Bluemix/election-insights">Fork base application on GitHub</a>
      <a href="/tos">Terms of Service</a>
      <a href="http://www.ibm.com/privacy/us/en/">Privacy Policy</a>
    </div>
  </div>

