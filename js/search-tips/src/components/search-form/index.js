import React from 'react';
import PropTypes from 'prop-types';
import SearchTips from '../search-tips';

import s from './style.css';

/**
 * Очень плохое решение
 *
 * Пришлось сделать так, тк уже первый час ночи, а костыль лучше, чем вообще не работающее приложение.
 *
 * По хорошему в компоненте не должно быть никакой логики, за обновление отвечаю только редакс и саги,
 * которые не успел реализовать
 */

export default class SearchForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            result: null,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.search && prevState.results === this.state.results) {
            this.props.search
                .then((results) => {
                    this.setState({
                        results
                    });
                })
        }
    }

    render() {
        const { results } = this.state;
        const { onChangeInputValue } = this.props;

        return(
            <section className={s.section}>
                <h1 className={s.header}>Поисковые подсказки</h1>
                <input className={s.input} type="search" onChange={onChangeInputValue} placeholder={'Введите значение для поиска'}/>
                {(results &&
                    <SearchTips
                        results={results}
                    />
                )}
            </section>
        );
    }
}

SearchForm.propTypes = {
    onChangeInputValue: PropTypes.func.isRequired,
    search: PropTypes.shape({
        loading: PropTypes.bool,
    })
};