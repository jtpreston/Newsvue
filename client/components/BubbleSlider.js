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
import Actions  from '../Actions';

//creates the slider for the bubble chart
export default ({ numBubbles }) =>
  <div className="bubble-selector">
    <div className="num-bubble-label">{numBubbles + (numBubbles === 1 ? " Circle" : " Circles")}</div>
    <input
      className="slider"
      type="range"
      min="1"
      max="250"
      value={numBubbles}
      steps="250"
      onChange={e => Actions.changeNumBubbles(e.target.value)} />
    <div className="help-text">(might need to adjust for screen size or if animations are laggy)</div>
  </div>
