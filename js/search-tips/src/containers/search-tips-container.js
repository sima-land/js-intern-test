import { connect } from 'react-redux';
import { searchSelector } from '../redux/selectors/search-selectors';

import SearchTips from '../components/search-tips/search-tips';

const mapStateToProps = (state) => ({
  searchResult: searchSelector(state),
});

const SearchTipsContainer = connect(mapStateToProps)(SearchTips);

export default SearchTipsContainer;
