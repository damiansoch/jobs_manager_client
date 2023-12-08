import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/navigation/Navigation';
import AllCustomers from './components/customers/AllCustomers';
import AllJobs from './components/jobs/AllJobs';

function App() {
  return (
    <div className='App'>
      <Navigation />
      <Routes>
        <Route path='/' element={<AllCustomers />} />
        <Route path='/allJobs' element={<AllJobs />} />
      </Routes>
    </div>
  );
}

export default App;
