import React from 'react';
import { shallow, mount } from "enzyme";
import ScoreTable from './ScoreTable';
import toJson from "enzyme-to-json";

const SCORES = {
    ones: undefined,
    twos: undefined,
    threes: undefined,
    fours: undefined,
    fives: undefined,
    sixes: undefined,
    threeOfKind: undefined,
    fourOfKind: undefined,
    fullHouse: undefined,
    smallStraight: undefined,
    largeStraight: undefined,
    yahtzee: undefined,
    chance: undefined
  }

it('renders without crashing', () => {
  shallow(<ScoreTable scores={ SCORES }/>);
});

it('renders correctly ', () => {

    const wrapper = mount(<ScoreTable scores={ SCORES }/>);
    const serialized = toJson(wrapper);
    expect(serialized).toMatchSnapshot();
});
