import './App.css';
import { BrowserRouter} from 'react-router-dom'

// import FormEditor from './Components/Form';
// import CategorizeQuestionForm from './Components/NewForm';
import Routing from './Routes/Routing';

// import CategorizeQuestion from "./Components/Categorize";
// import FormBuilder from './Components/s';




function App() {
  return (
    <div className='App'>
      {/* <FormEditor/> */}
      {/* <FormBuilder/> */}
    {/* <CategorizeQuestion /> */}
    {/* <CategorizeQuestionForm /> */}
    <div className='Page'>
    <BrowserRouter >
    <Routing />
    </BrowserRouter>
     

    </div>
  </div>
  );
}

export default App;


