import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner';
import * as Search from '../../store/actions/search';
import { bindActionCreators } from 'redux';

class SearchResults extends Component {

    render() {
        const { search, show, Search } = this.props;

        const items = search.data.map((item, i) => {
            return <li>item.name</li>
        })
        return (show) ? <div>
            <div className="overlay-bg" onClick={Search.clearSearch}></div>
            <div className="search-wrapper">
                <div className="search-results">
                    { (items.length > 0) ? items : (search.loading) ? <Spinner /> : <div>Pas de résultats.</div>}
                </div>
            </div>
        </div>
        : null;
    }
}

SearchResults.propTypes = {
    show: PropTypes.bool.isRequired
};

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


export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
