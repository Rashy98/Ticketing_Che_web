import React from 'react';
import { shallow } from 'enzyme';
import Provider from "react-redux/lib/components/Provider";
import PastJourneys from "../Components/History/PastJourneys";
import store from "../store";

it("Renders without crashing", () => {
    <Provider store={store}><PastJourneys /></Provider>
});

it("renders Account header", () => {
    const wrapper = shallow(<Provider store={store}><PastJourneys /></Provider>);
    const welcome = <h1>Past Journey</h1>;
    expect(wrapper.contains(welcome)).toEqual(false);
});
