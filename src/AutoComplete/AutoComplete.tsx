import React from 'react'
import _ from 'lodash'

import { getSearchSuggestions } from './AutoComplete.service'
import './AutoComplete.css'

interface IAutoCompleteProps {
  onSelectItem: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

interface IAutoCompleteState {
  isLoading: boolean
  suggestions?: string[]
}

class AutoComplete extends React.Component<IAutoCompleteProps, IAutoCompleteState> {
  constructor(props: IAutoCompleteProps) {
    super(props)
    this.state = {
      isLoading: false,
      suggestions: undefined,
    }

    this.onUserInput = this.onUserInput.bind(this)
  }
  
  // Method debounced as part of onInput event in render() - only called 500ms after last user input
  onUserInput(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      isLoading: true,
      suggestions: undefined,
    })
    // Clears suggestions and loading wheel if input field is cleared
    if (!e.target.value) {
      this.setState({ isLoading: false })
      return
    }
    getSearchSuggestions(e.target.value).then((data: any) => {
      this.setState({
        isLoading: false,
        suggestions: data,
      })
    })
  }

  render() {    
    return (
      <div className='wrapper'>
        <div className={`${this.state.isLoading ? 'is-loading' : ''} control`}>
          <div className='input-container'>
            {/* Disabling browser autocomplete so this autosuggestion isn't conflicting in the UI */}
            <input
              autoComplete='off'
              className='input-field'
              type='search' id='search-input'
              name='search'
              placeholder='Search'
              onChange={_.debounce(this.onUserInput, 500)} />
            <div className='icon-container'>
              <i className='loader'></i>
            </div>
          </div>
          {/* Submit button not included as part of this component - not included in the exercise example */}

        </div>
        {this.state.suggestions && 
        // If this were my own feature, I would make this a <ul> with <li> elements, but the example displayed this as a div and <a> tags (without hrefs) for each list item
        // List only rendered if suggestions is populated with data
        <div className='list'>
          {this.state.suggestions.map((suggestion: string, index: number): JSX.Element => {
            return (
              <a key={index} className='list-item' href='/' onClick={this.props.onSelectItem}>
                {suggestion}
              </a>
            )
          })}
        </div>
        }
    </div>
    )
  }
}

export default AutoComplete