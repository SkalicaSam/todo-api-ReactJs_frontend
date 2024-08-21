import './App.css';
import Navbar from './components/Navbar';   // ak ide o subor s koncovkou .js netreba ju pisat k suboru pri importe
 import { HashRouter as Router, Route, Routes} from 'react-router-dom';
// import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import User from './components/User'; 
import UserDetails from './components/UserDetails';
import UserDetailEdit from './components/UserDetailEdit';
import UserCreate from './components/UserCreate'; 
import TasksByUserId from './components/TasksByUserId'; 
import TaskDetails from './components/TaskDetails'; 
import TaskEdit from './components/TaskEdit'; 
import TasksCreateByUserId from './components/TasksCreateByUserId'; 






function App() {
  return (
    <>
      < Router>
        <Navbar/>

        <Routes> 
          <Route path='/users' exact Component={User}></Route>
          <Route path='/user/:id' exact Component={UserDetails}></Route>
          <Route path='/users/user/:id/edit' exact Component={UserDetailEdit}></Route>
          <Route path='/users/user/create' exact Component={UserCreate}></Route>
          <Route path='/users/user/:id/usertasks' exact Component={TasksByUserId}></Route>
          <Route path='/tasks/:id' exact Component={TaskDetails}></Route>
          <Route path='/tasks/:id/edit' exact Component={TaskEdit}></Route>
          <Route path='/users/user/:userId/taskCreate' exact Component={TasksCreateByUserId}></Route>


         





        </Routes>
      </Router>

    </>
  );
}

export default App;
