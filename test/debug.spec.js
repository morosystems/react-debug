import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import sinon from 'sinon';

import {debug} from "../src"

const Test = () => <div/>;

describe('debug', () => {
    beforeEach(function() {
        sinon.spy(console, 'log');
    });

    afterEach(function() {
        console.log.restore();
    });

    it('logs mounts and unmounts', () => {
        const Comp = debug()(Test);
        const wrapper = mount(<Comp />);
        wrapper.unmount();

        expect(console.log).to.be.calledTwice;
        expect(console.log.getCall(0).args[0]).to.be.eq("Test mounts");
        expect(console.log.getCall(1).args[0]).to.be.eq("Test unmounts");
    });
});
