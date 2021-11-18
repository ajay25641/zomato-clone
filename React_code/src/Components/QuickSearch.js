import React from 'react'
import '../Styles/home.css';
import QuickSearchItems from './QuickSearchItems';

const QuickSearch = ({ mealtypeData }) => {
    return (

        <div className="quicksearch">
            <p className="quicksearchHeading">
                Quick Searches
            </p>
            <p className="quicksearchSubHeading">
                Discover restaurants by type of meal
            </p>
            <div className="container">
                <div className="row">
                    <QuickSearchItems mealtypeData={mealtypeData} />
                </div>
            </div>
        </div>






    )
}
export default QuickSearch;