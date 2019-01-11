/**
 * Testing Component render
 */

import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import SearchForm from '../../../src/components/search-form';

configure({adapter: new Adapter()});

function setup() {
    const props = {
        resultsOfSearch: [ 'test' ]
    };

    const enzymeWrapper = mount(<SearchForm {...props} />);

    return {
        props,
        enzymeWrapper
    }
}


describe('<SearchForm />', () => {
    const { enzymeWrapper } = setup();
    it('isset props', () => {
        console.log('enzymeWrapper.props()', enzymeWrapper.props());
        expect(enzymeWrapper.props()).to.deep.equal({resultsOfSearch: [ 'test' ]});
    });
});