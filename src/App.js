import './App.css';
import Navbar from './components/Navbar';   // ak ide o subor s koncovkou .js netreba ju pisat k suboru pri importe
 import { HashRouter as Router, Route, Routes} from 'react-router-dom';
// import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import User from './components/User'; 
import UserDetails from './components/UserDetails';


function App() {
  return (
    <>
      < Router>
        <Navbar/>

        <Routes> 
          <Route path='/users' exact Component={User}></Route>
          <Route path='/user/:id' exact Component={UserDetails}></Route>

        </Routes>
      </Router>

    </>
  );
}

export default App;
