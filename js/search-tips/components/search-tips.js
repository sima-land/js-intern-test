import React from 'react'
import PropTypes from 'prop-types'

const SearchTips = ({searchTipsArray, additionalLineForOutput, addInInputStringFoundWordAC}) => (
    <div className="search-box" style={{left: '-70px', top: '82px'}}>
        <span>{additionalLineForOutput}</span>
        <div className="search-tips">
            {searchTipsArray.map((tip) => {
                return (<div key={tip + Math.random()} className="search-tip"
                             onClick={() => {
                                 addInInputStringFoundWordAC(tip)
                             }}
                > {tip}  </div>)
            })
            }
        </div>
    </div>
)

SearchTips.propTypes = {
    searchTipsArray: PropTypes.arrayOf(PropTypes.string).isRequired,
    additionalLineForOutput: PropTypes.string.isRequired,
    addInInputStringFoundWordAC: PropTypes.func.isRequired,
}


export default SearchTips
