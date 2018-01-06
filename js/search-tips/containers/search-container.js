import { connect } from "react-redux";

import { searchGoods } from "../actions/search-actions";
import { filteredGoods } from "../reducers/search-reducer";

import SearchForm from "../components/search-form";

const mapStateToProps = state => ({
  tips: filteredGoods(state)
});

const mapDispatchToProps = {
  searchGoods
};

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(
  SearchForm
);

export default SearchContainer;
