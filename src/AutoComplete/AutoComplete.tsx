import React from 'react';
import _ from 'lodash';
import cx from 'classnames';

import { getSearchSuggestions } from './AutoComplete.service';
import './AutoComplete.css';

interface IAutoCompleteProps {
  onSelectItem?: (value: string) => void;
}

interface IAutoCompleteState {
  suggestions: string[];
}

class AutoComplete extends React.Component<IAutoCompleteProps, IAutoCompleteState> {
  constructor(props: IAutoCompleteProps) {
    super(props)
    this.state = {suggestions: []};
    this.onUserInput = this.onUserInput.bind(this);
    
  }
  
  controlClassnames = cx('control', {
    ['is-loading']: true,
  }); 

  search = _.debounce(getSearchSuggestions, 500);

  onUserInput(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({suggestions: this.search(e.target.value)});
  }

  select(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    prompt('You have selected ' + e.currentTarget.text)
  }

  render() {
    return (
      <div className='wrapper'>
        <div className={this.controlClassnames}>
          <div className='input-container'>
            <input className='input-field' type='search' id='search-input' name='search'
              aria-label='Search Box' onInput={this.onUserInput} />
              <div className='icon-container'>
                <i className='loader'></i>
            </div>
          </div>
          <button>Search</button>
        </div>
        {this.state.suggestions && 
        <div className='list'>
          {this.state.suggestions.map((suggestion: string, index: number): JSX.Element => {
            return (
              <a key={index} className='list-item' onClick={this.select}>
                {suggestion}
              </a>
            );
          })}
        </div>
        }
      </div>
    );
  }
};

export default AutoComplete;