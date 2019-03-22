import React from 'react';
import { shallow, mount } from "enzyme";
import Game from './Game';
import toJson from "enzyme-to-json";

it('renders without crashing', () => {
  shallow(<Game />);
});

// it('renders correctly', () => {
//     const wrapper = mount(<Game />);
//     const serialized = toJson(wrapper);
//     expect(serialized).toMatchSnapshot();
// });

