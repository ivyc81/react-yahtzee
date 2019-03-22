import React from 'react';
import { shallow, mount } from "enzyme";
import Game from './Game';
import toJson from "enzyme-to-json";

it('renders without crashing', () => {
  shallow(<Game />);
});

it('renders correctly', () => {
    const wrapper = mount(<Game />);
    const serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
});

it('tests if a die is clicked on, it toggles lock/unlock ', () => {
  const wrapper = mount(<Game />);

  const die1 = wrapper.find("Die").first();
  die1.simulate("click"); 

  expect(wrapper.state().locked[0]).toEqual(true);
});


