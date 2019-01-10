import { connect } from 'react-redux';
import {textEdit} from '../../store/search/action';

import SearchForm from '../../components/search-form';

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
    return {
        onChangeInputValue: () => dispatch(textEdit())
    };
};

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(SearchForm);

export default SearchContainer;
