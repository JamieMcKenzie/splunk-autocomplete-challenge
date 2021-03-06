import { cleanup } from '@testing-library/react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import axios, { AxiosResponse } from 'axios'
import * as AutoCompleteService from './AutoComplete.service'
import AutoComplete from './AutoComplete'

afterEach(cleanup)
const mockSelectFunc = jest.fn()
jest.mock('./AutoComplete.service', () => {
    return {
        getSearchSuggestions: jest.fn()
    }
})

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedData = [ 'result1', 'result2', 'result3' ]
const mockResponse = { data: mockedData } as AxiosResponse
const event = { target: { value: 'query' } } as React.ChangeEvent<HTMLInputElement>

describe('snapshot of AutoComplete', () => {
    it("renders DOM correctly", () => {
        const tree = shallow(<AutoComplete onSelectItem={ mockSelectFunc }/>)
        expect(toJSON(tree)).toMatchSnapshot()
    })
})

describe('AutoComplete Component', () => {
    const wrapper = shallow(<AutoComplete onSelectItem={ mockSelectFunc } />)
    
    it('renders with onSelectItem prop', () => {
        const props = { onSelectItem: mockSelectFunc }
        expect(wrapper.props().onSelectItem).toBeDefined
    })

    it('component instantiates state with isLoading and suggestions', () => {
        expect(wrapper.state('isLoading')).toBe(false)
        expect(wrapper.state('suggestions')).toBeUndefined
    })

    it('should not render list if no suggestions', () => {
        expect(wrapper.find('.list')).toHaveLength(0)
    })

    it('should render list is suggestions are populated', () => {
        wrapper.setState({ suggestions: mockedData })
        expect(wrapper.find('.list')).toHaveLength(1)
        expect(wrapper.find('.list-item')).toHaveLength(3)
    })

    it('should render input field', () => {
        expect(wrapper.find('input')).toHaveLength(1)
    })
})

describe('onSelectItem Func', () => {
    const wrapper = shallow(<AutoComplete onSelectItem={ mockSelectFunc } />)
    wrapper.setState({
        isLoading: false,
        suggestions: mockedData,
    })
    it('should render selectable list items if suggestions is populated', () => {
        const suggestion = wrapper.find('.list-item')
        expect(suggestion).toHaveLength(3)
        suggestion.at(0).simulate('click', event )
        expect(mockSelectFunc.mock.calls.length).toEqual(1);
    })
})

describe('AutoCompleteService - getSearchSuggestions', () => {
    (AutoCompleteService.getSearchSuggestions as jest.MockedFunction<typeof AutoCompleteService.getSearchSuggestions>).mockResolvedValueOnce(
        mockedData
      )
    const wrapper = shallow(<AutoComplete onSelectItem={ mockSelectFunc } />)
    it('should update state when api returned with results', () => {
        wrapper.find('input').simulate('change', event)
        // force update/completion of call
        setTimeout(() => {
            expect(wrapper.state('suggestions')).toEqual(mockedData)
        }, 0);
    })
    it('should call axios get for api fetch', () => {
        expect(axios.get).not.toHaveBeenCalled
        mockedAxios.get.mockResolvedValue(mockResponse)
        wrapper.find('input').simulate('change', event)
        expect(axios.get).toHaveBeenCalled
    })
})
