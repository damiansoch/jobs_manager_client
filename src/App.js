import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/navigation/Navigation';
import AllCustomers from './components/customers/AllCustomers';
import AllJobs from './components/jobs/AllJobs';
import AddEditComponent from './components/genericComponent/AddEditComponent';
import CustomerDetails from './components/customers/CustomerDetails';

function App() {
  return (
    <div className='App'>
      <Navigation />
      <Routes>
        <Route path='/' element={<AllCustomers />} />
        <Route path='/allJobs' element={<AllJobs />} />
        <Route path='/addEdit/:actionName/:id' element={<AddEditComponent />} />
        <Route path='/details/:id' element={<CustomerDetails />} />
      </Routes>
    </div>
  );
}

export default App;
