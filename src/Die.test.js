import React from 'react';
import { shallow, mount } from "enzyme";
import Die from './Die';
import toJson from "enzyme-to-json";

it('renders without crashing', () => {
  shallow(<Die />);
});

it('renders correctly unlocked', () => {
    const wrapper = mount(<Die locked={ false }/>);
    const serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
});

it('renders correctly locked', () => {
    const wrapper = mount(<Die locked={ true }/>);
    const serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
});

