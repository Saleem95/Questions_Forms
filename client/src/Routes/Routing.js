import React from 'react';
import { Routes, Route} from 'react-router-dom'
import Sidebar from '../Sidbear/Sidebar';
import Container from '../Container/Container';
import NewForm from '../Components/NewForm'




function Routing(props) {
    return (
        <div>
            
            <div className='dashboard'>
            <div className='sidebar'>
            <Sidebar />
            </div>

            <div className='main-container'>
            <Routes>
                <Route path="/" exact element={<Container />} />
                <Route path="/form" element={<NewForm />}/>
                {/* <Route path="/contact" element={<Contact />}/> */}

            </Routes>            
            </div>
            
        </div>
        </div>
    );
}

export default Routing;