import React from 'react';
import {shallow} from 'enzyme';
import TopUp from "../Components/Topup/TopUp";
import configureStore from 'redux-mock-store'
import Provider from "react-redux/lib/components/Provider";


describe('Test case for testing login',() =>{
    let wrapper;
    const mockStore = configureStore()
    let store,container

    beforeEach(()=>{
        store = mockStore()
        wrapper = shallow( <Provider store={store}><TopUp /></Provider> )
    })
    it("Renders without crashing", () => {
        <Provider store={store}><TopUp /></Provider>
    });
    it('Renders with redux-connect',()=>
    {
        expect(wrapper.find(TopUp).length).toEqual(1)

    })
})