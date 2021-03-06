import React from "react";
import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/*
 Function to create shallow wrapper for the app Component
 it returns ShallowWrapper 
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

/*
Returns shallowwrapper containing node(s) with the given data-test value 
*/
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

test("Renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("Renders increment button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

test("Renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

test("Counter starts at 0", () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);
});

test("Clicking button increments display", () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  //Find button and click
  const button = findByTestAttr(wrapper, "increment-button");
  button.simulate("click");
  wrapper.update();

  //find display and test value
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter + 1);
});
