import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/Input';
import { searchTextChange, clearSearch } from '../../store/actions/search'

class SearchInput extends Component {
    searchDebounceTimer;

    onSearchTextChange = event => {
        let inputValue = event.target.value;
        if (this.searchDebounceTimer) {
            window.clearTimeout(this.searchDebounceTimer);
        }

        this.props.search(inputValue, false);
        this.searchDebounceTimer = window.setTimeout(function () {
            this.props.search(inputValue, true);
        }, 500);
    }

    render() {
        const { clear } = this.props;
        // const rightCrossIcon = (input_value.length > 0) ? "fa fa-times-thin" : "";
        return (
            <div>
                <Input leftIcon="fa fa-search" type="text"
                    placeHolder="Search"
                    rightIcon=""
                    onChange={this.onSearchTextChange}
                    onRightIconClick={clear}
                    value="" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        input_value: state.search.input_value
    }
}

const mapDispatchToProps = dispatch => {
    return {
        search: (inputValue, shouldCallApi) => dispatch(searchTextChange(inputValue, shouldCallApi)),
        clear: () => dispatch(clearSearch())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
