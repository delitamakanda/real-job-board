import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Input from '../../components/Input';
import * as Search from '../../store/actions/search';


class SearchInput extends Component {
    searchDebounceTimer;

    onSearchTextChange = event => {
        let inputValue = event.target.value;
        let _Search = this.props.Search;
        if (this.searchDebounceTimer) {
            window.clearTimeout(this.searchDebounceTimer);
        }

        _Search.searchTextChange(inputValue, false);
        this.searchDebounceTimer = window.setTimeout(function () {
            _Search.searchTextChange(inputValue, true);
        }, 500);
    }

    render() {
        const { search, Search } = this.props;
        const rightCrossIcon = (search.input_value.length > 0) ? "fa fa-times-thin" : "";
        return (
            <div>
                <Input leftIcon="fa fa-search" type="text"
                    placeHolder="Search"
                    rightIcon={rightCrossIcon}
                    onChange={this.onSearchTextChange}
                    onRightIconClick={Search.clearSearch}
                    value={search.input_value || ""} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        search: state.search
    }
}

const mapDispatchToProps = dispatch => {
    return {
        Search: bindActionCreators(Search, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
