import React, { useEffect } from 'react';

const SearchResults = (props) => {
    const { show } = props;

    useEffect(() => {
        if (show) {
            document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        }
    }, [show]);

    useEffect(() => {
       
    }, [props.nextProps])


    return (
        <div>
            search results wip
        </div>
    );
}

export default SearchResults;
