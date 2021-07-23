import cx from 'classnames';

import styles from './AutoComplete.scss';

interface IAutoCompleteProps {
  suggestions: string[];
  isLoading: boolean;
}

const AutoComplete: React.FC<IAutoCompleteProps> = ({ suggestions, isLoading }) => {
  const controlClassnames = cx(styles.control, {
    [styles.isLoading]: isLoading,
  });


  return (
    <div className='wrapper'>
      <div className='controlClassnames'>
        <input />
      </div>
      <div className='list'>
        {suggestions && suggestions.map((suggestion: string, index: number): JSX.Element => {
          return (
            <li key={index} className='list-item'>
              {suggestion}
            </li>
          );
        })}
      </div>
    </div>
  );

};

export default AutoComplete;
