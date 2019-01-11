import React from 'react';
import PropTypes from 'prop-types';

import s from './style.css'

export default class SearchTips extends React.Component {
    render() {
        const {results} = this.props;
        return (
            <div className={s.tips}>
                <div className={s.results}>
                    {results && results.map((row, index) =>
                        <div key={index} className={s.row}>
                            {row}
                        </div>
                    )}
                    {results.length === 0 && (<div>Нет Результатов</div>)}
                </div>
            </div>
        );
    }
}

SearchTips.propTypes = {
    loading: PropTypes.bool,
    result: PropTypes.array,
};