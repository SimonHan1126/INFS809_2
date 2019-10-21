import {shallow} from "enzyme";
import Searchtest from './components/searchtest.component';
import react from 'react';


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

describe('test UI of search test', ()=> {
    let wrapper;
    beforeEach(()=>{wrapper=shallow(<Searchtest />);});

    it('includes 2 input div class startDate and EndDate', ()=>{
        expect(wrapper.find('input.StartDate','input.EndDate')).to.have.lengthOf(2);
    });
});