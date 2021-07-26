import React from 'react';
import _, { findLastKey } from 'lodash';

import { getSearchSuggestions } from './AutoComplete.service';
import './AutoComplete.css';

interface IAutoCompleteProps {
  onSelectItem?: (value: string) => void;
}

interface IAutoCompleteState {
  suggestions?: string[];
  isLoading: boolean;
}

class AutoComplete extends React.Component<IAutoCompleteProps, IAutoCompleteState> {
  constructor(props: IAutoCompleteProps) {
    super(props)
    this.state = {
      isLoading: false,
      suggestions: []
    };
    this.onUserInput = this.onUserInput.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: false});
  }
  
  onUserInput(e: React.ChangeEvent<HTMLInputElement>): void {
    const userInput = e.target.value;
    const fetchSuggestions = async () => {
      const response  = await getSearchSuggestions(userInput)
      return response;
    }
    fetchSuggestions().then((data: any) => {
      const suggestions = data;
      debugger;
      this.setState({
        isLoading: false,
        suggestions
      })  
    })
  }

  select(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    alert('You have selected ' + e.currentTarget.text)
  }

  render() {    
    return (
      <div className='wrapper'>
        <div className={`${this.state.isLoading ? 'is-loading' : ''} control`}>
          <div className='input-container'>
            <input autoComplete='off' className='input-field' type='search' id='search-input' name='search'
              aria-label='Search Box' onInput={_.debounce(this.onUserInput, 500)} />
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