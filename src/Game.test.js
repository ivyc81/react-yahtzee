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

it('toggles lock/unlock when a die is clicked on', () => {
  const wrapper = mount(<Game />);

  const die1 = wrapper.find("Die").first();
  die1.simulate("click");

  expect(wrapper.state().locked[0]).toEqual(true);
});

it('prevents from rolling more than three times', () => {
  const wrapper = mount(<Game />);

  const rerollBtn = wrapper.find(".Game-reroll").first();
  rerollBtn.simulate("click");
  rerollBtn.simulate("click");
  rerollBtn.simulate("click");

  expect(wrapper.state().locked[0]).toEqual(true);

  const die1 = wrapper.find("Die").first();
  die1.simulate("click");

  expect(wrapper.state().locked[0]).toEqual(true);
});

it('disallows re-using score line', () => {
  const wrapper = mount(<Game />);
  wrapper.setState({scores:{ones: 9}});

  const scoreLine = wrapper.find(".RuleRow-name").first();
  scoreLine.simulate("click");

  expect(wrapper.state().scores.ones).toEqual(9);
});

it('allocates a score when score line is clicked for the first time,', () => {
  const wrapper = mount(<Game />);

  const scoreLine = wrapper.find(".RuleRow-name").first();
  scoreLine.simulate("click");

  expect(wrapper.state().scores.ones).toEqual(expect.any(Number));
});



it('allocate correct score for Full House,', () => {
  const wrapper = mount(<Game />);

  const dice = [5,5,6,6,6];
  const locked = [false, false, false, true, true];

  wrapper.setState({ dice, locked });

  const scoreLine = wrapper.find('[name="Full House"]');
  scoreLine.simulate("click");

  expect(wrapper.state().scores.fullHouse).toEqual(25);
  
});

it('DOES NOT allocate score for NO Full House,', () => {
  const wrapper = mount(<Game />);

  const dice = [5,5,4,6,6];
  const locked = [false, false, false, true, true];

  wrapper.setState({ dice, locked });

  const scoreLine = wrapper.find('[name="Full House"]');
  scoreLine.simulate("click");

  expect(wrapper.state().scores.fullHouse).toEqual(0);
  
});

it('allocate correct score for Yahtzee,', () => {
  const wrapper = mount(<Game />);

  const dice = [0,0,0,0,0];
  const locked = [false, false, false, true, true];

  wrapper.setState({ dice, locked });

  const scoreLine = wrapper.find('[name="Yahtzee"]');
  scoreLine.simulate("click");

  expect(wrapper.state().scores.yahtzee).toEqual(50);
  
});

it('DOES NOT allocate score for NO Yahtzee,', () => {
  const wrapper = mount(<Game />);

  const dice = [0,0,0,0,1];
  const locked = [false, false, false, true, true];

  wrapper.setState({ dice, locked });

  const scoreLine = wrapper.find('[name="Yahtzee"]');
  scoreLine.simulate("click");

  expect(wrapper.state().scores.yahtzee).toEqual(0);
  
});

it('DOES allocate correct score for small straight,', () => {
  const wrapper = mount(<Game />);

  const dice = [2,3,4,5,6];
  const locked = [false, false, false, true, true];

  wrapper.setState({ dice, locked });

  const scoreLine = wrapper.find('[name="Small Straight"]');
  scoreLine.simulate("click");

  expect(wrapper.state().scores.smallStraight).toEqual(30);
  
});

it('DOESNT allocate score for NO small straight,', () => {
  const wrapper = mount(<Game />);

  const dice = [2,3,4,4,6];
  const locked = [false, false, false, true, true];

  wrapper.setState({ dice, locked });

  const scoreLine = wrapper.find('[name="Small Straight"]');
  scoreLine.simulate("click");

  expect(wrapper.state().scores.smallStraight).toEqual(0);
  
});