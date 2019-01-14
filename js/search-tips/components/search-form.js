import React from 'react';
import SearchTips from '../components/search-tips';
import words from '../data/words'


const SearchForm = (props) => {
    const getTips = (query) => {
        let tips = [];
        let i = 0;

        while (tips.length <= 5 && i !== words.length - 1) {
            if (tips.length === 5) {
                break;
            }
            if (words[i].toLowerCase().includes(query.toLowerCase())) {
                tips.push(words[i])
            }
            i++;
        }

        return tips
    }
    const handleChange = (event) => {
        if (!event.currentTarget.value.length) {
            props.fail();
            return;
        }
        props.search();
        const tips = getTips(event.currentTarget.value);
        if (tips.length) {
            props.complete(tips);
        } else {
            props.fail();
        }
    }
    return (
        <section>
            <h1>Поисковые подсказки</h1>
            <input className="search-input" type="search" onChange={handleChange}/>
            {!props.searchTips.error
                ? props.searchTips.data && Boolean(props.searchTips.data.length) && <SearchTips tips={props.searchTips.data}/>
                : <div>Не найдено подсказок</div>
            }

        </section>
    )
}

export default SearchForm;
