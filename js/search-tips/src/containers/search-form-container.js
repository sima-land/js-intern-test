import { connect } from 'react-redux';
import SearchForm from '../components/search-form/search-form';
import { onSearch } from '../redux/actions/search-actions';

const SearchFormContainer = connect(null, { onSearch })(SearchForm);

export default SearchFormContainer;
