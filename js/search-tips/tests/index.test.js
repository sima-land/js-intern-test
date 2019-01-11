/**
 * Testing App render
 */

import React from 'react';
import { Provider } from "react-redux";
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import sinon from 'sinon';
import { expect } from 'chai';
import SearchContainer from '../src/containers/search';

configure({adapter: new Adapter()});
const mockStore = configureMockStore();
const store = mockStore({});

function setup() {
    const props = {
        testProp: 'test'
    };

    const enzymeWrapper = shallow(
        <Provider store={store}>
            <SearchContainer {...props} />
        </Provider>);

    return {
        props,
        enzymeWrapper
    }
}


describe('<SearchContainer />', () => {
    const { enzymeWrapper } = setup();
    it('isset props', () => {
        expect(enzymeWrapper.props()).to.deep.equal({testProp: 'test'});
    });

    /**
     * Add Buttons, inputs etc
     */
});