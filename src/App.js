import './App.css';
import Navbar from './components/Navbar';   // ak ide o subor s koncovkou .js netreba ju pisat k suboru pri importe
import { HashRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <>
      < Router>
        <Navbar/>

        <Routes> 
          <Route></Route>
         
        </Routes>
      </Router>

    </>
  );
}

export default App;
