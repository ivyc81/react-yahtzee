import React from 'react';
import { shallow, mount } from "enzyme";
import RuleRow from './RuleRow';
import toJson from "enzyme-to-json";

it('renders without crashing', () => {
  shallow(<RuleRow />);
});

it('renders correctly', () => {
    const wrapper = mount(<RuleRow name='test' score={ 0 }/>);
    const serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
});