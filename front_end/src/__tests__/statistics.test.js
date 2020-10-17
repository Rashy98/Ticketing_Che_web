import React from 'react';
import {shallow} from 'enzyme';
import Passenger_Stats from "../Components/Statistics/Passenger_Stats";
import configureStore from 'redux-mock-store'
import Provider from "react-redux/lib/components/Provider";
import store from "../store";
import PastJourneys from "../Components/History/PastJourneys";


describe('Test case for testing login',() =>{
    let wrapper;
    const mockStore = configureStore()
    let store,container

    beforeEach(()=>{
        store = mockStore()
        wrapper = shallow( <Provider store={store}><Passenger_Stats /></Provider> )
    })

    it("Renders without crashing", () => {
        <Provider store={store}><Passenger_Stats /></Provider>
    });

    it('Renders with redux-connect',()=>
    {
        expect(wrapper.find(Passenger_Stats).length).toEqual(1)

    })

    it("Does not contains heading Passenger Stats", () => {
        const wrapper = shallow(<Provider store={store}><Passenger_Stats /></Provider>);
        const welcome = <h1>Passenger Stats</h1>;
        expect(wrapper.contains(welcome)).toEqual(false);
    });
})