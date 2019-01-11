/**
 * Testing Component render
 */

import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import SearchTips from '../../../src/components/search-tips';

configure({adapter: new Adapter()});

function setup() {
    const props = {
        resultsOfSearch: [ 'test' ]
    };

    const enzymeWrapper = mount(<SearchTips {...props} />);

    return {
        props,
        enzymeWrapper
    }
}


describe('<SearchTips />', () => {
    const { enzymeWrapper } = setup();
    it('isset props', () => {
        console.log('enzymeWrapper.props()', enzymeWrapper.props());
        expect(enzymeWrapper.props()).to.deep.equal({resultsOfSearch: [ 'test' ]});
    });
});