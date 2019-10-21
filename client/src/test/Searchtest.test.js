import {shallow, mount} from "enzyme";
import Searchtest from '../components/searchtest.component';
import React from 'react';
import {expect} from 'chai';
import {sinon} from 'sinon';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import {App} from '../App';

//example
//
// describe('test UI of create users', =>{
//     let wrapper;
//     beforeEach(()=>{wrapper = shallow(<Test/>);});

//     it('includes 1 div ith class foo', ()=>{
//         expect(wrapper.find(div)).to.have.lengthOf(1);
//     });

//     it('include a span', ()=>{
//         expect(wrapper.find('span.bar').text()).to.be.equal('test!')
//     });
// });

// class Test extends React.Component{
//     render(){
//         return(
//             <div className="foo">
//                 <span className="bar">test!</span>
//             </div>
//         );
//     }
// }

describe('<App />', () => {
    it('allows us to set props', () => {
      const wrapper = mount(<App />);
      expect(wrapper.find('li')).to.have.lengthOf(2);
    });
});

describe('test UI of search test', ()=> {
    const wrapper=shallow(<Searchtest />);

    it('includes 3 input div class', ()=>{
        expect(wrapper.find('input')).to.have.lengthOf(3);
    });
    it('includes 3 button tag', ()=>{
        expect(wrapper.find('button')).to.have.lengthOf(2);
    });

    it('includes 3 select div class startDate and EndDate', ()=>{
        const wrapper = shallow((
            <Searchtest>
              <div id="optionDIV"/>
            </Searchtest>
          ));
        expect(wrapper.find('button')).to.have.lengthOf(2);
    });


    // it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = shallow(<Searchtest onButtonClick={onButtonClick} />);
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick).to.have.property('callCount', 1);
    //   });

      it('renders children when passed in', () => {
        const wrapper = shallow((
          <Searchtest>
            <div className="input-group"/>
          </Searchtest>
        ));
        expect(wrapper.contains(<span className="input-group-btn"/>)).to.equal(true);
      });
});