import { connect } from 'react-redux';
import {SearchForm} from '../components/search-form';
import {updateSearchTips} from '../reducers/search-reducer';

const mapStateToProps = state => ({
  searchTipsWords: state.search.searchTipsWords,
});

const mapDispatchToProps = {
  updateSearchTips
};

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(SearchForm);

export default SearchContainer;
