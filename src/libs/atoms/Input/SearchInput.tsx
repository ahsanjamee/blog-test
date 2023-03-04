import { SearchIcon } from '../../../assets/Icons';

type ISearchInputProps = {
  setFunc: (val: any) => void;
  placeholder: string;
  onSubmit?: () => void;
};

const SearchInput: React.FC<ISearchInputProps> = ({ setFunc, placeholder, onSubmit }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setFunc(query);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && onSubmit) {
      onSubmit();
    }
  };
  return (
    <div className='search-wrap'>
      <input
        className='search-input'
        placeholder={placeholder}
        type='text'
        name='search'
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
      />
      <div
        className='search-btn'
        onClick={(e) => {
          e.preventDefault();
          onSubmit && onSubmit();
        }}
      >
        <SearchIcon />
      </div>
    </div>
  );
};

export default SearchInput;
