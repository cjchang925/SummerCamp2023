import Welcome from './component/Welcome';
import Student from './component/Student';
import AddElement from './component/AddElement';
import Supporter from './component/Supporter';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Welcome />} />
                    <Route path='/student' element={<Student />} />
                    <Route path='/add_element' element={<AddElement />} />
                    <Route path='/supporter' element={<Supporter />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
