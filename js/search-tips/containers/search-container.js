import { connect } from "react-redux";

import { searchGoods } from "../actions/search-actions";

import SearchForm from "../components/search-form";

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  searchGoods
};

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(
  SearchForm
);

export default SearchContainer;
