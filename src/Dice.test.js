import React from 'react';
import { shallow, mount } from "enzyme";
import Dice from './Dice';
import toJson from "enzyme-to-json";

const DICE = [1,2,3,4,5];
const LOCKED = [false, false, false, true, true];

it('renders without crashing', () => {
  shallow(<Dice dice={DICE} locked={ LOCKED }/>);
});

it('renders correctly ', () => {

    const wrapper = mount(<Dice dice={DICE} locked={ LOCKED }/>);
    const serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
});
