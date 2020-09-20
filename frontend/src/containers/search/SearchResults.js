import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner';

class SearchResults extends Component {

    componentDidMount() {
        if (this.props.show) {
            document.getElementsByTagName('body')[0].style.overflow = 'hidden'
        }
    }

    UNSAFE_componentWillReceiveProps() {

    }

    render() {
        const { search, show } = this.props;

        const items = search.data.map((item, i) => {
            return <li>item.name</li>
        })
        return (show) ? <div>
            <div className="overlay-bg"></div>
            <div className="search-wrapper">
                <div className="search-results">
                    { (items.length > 0) ? items : (search.loading) ? <Spinner /> : <div>Pas de résultats.</div>}
                </div>
                {(search.is_load_more_visible) ? <div>
                    <button>
                        SHOW MORE RESULTS
                    </button>
                </div> : null }
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
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
