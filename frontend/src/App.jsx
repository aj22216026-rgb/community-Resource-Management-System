// import Login from './pages/login'
import Register from './pages/register'
// //  import Dashboard from './pages/AdminDashboard'
import Resource from './pages/Dashboard/Resource'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login'
// import './css/App.css'
import Contact from './pages/Contact'
import ManageBooking from "./pages/ManageBooking"
import ResourceForm from './pages/Dashboard/ResourceForm'
import ResourceCard from './pages/Dashboard/ResourceCard';
import Home from './pages/Home'
import ParentDashboard from './components/layout/ParentDashboard'
import Dashboard from './components/layout/Dashboard'
import ResourceDetail from './pages/ResourceDetail'
// import PaymentForm from './pages/PaymentForm'
import UserPayment from './pages/userPayment'
import About from "./pages/About";

import Users from "./pages/Dashboard/Users";


function App() { 


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />

           <Route path="/dashboard" element={<Dashboard />} >
            <Route path="manage-bookings" element={<ManageBooking />} />
            <Route index element={<ParentDashboard />} />
            <Route path="resources" element={<Resource />} />
            <Route path="add-resource" element={<ResourceForm />} /> 
            <Route path="resource-card" element={<ResourceCard />} /> 
            <Route path="resource-detail/:type" element={<ResourceDetail />} /> 
            <Route path="user-payments" element={<UserPayment />} /> 

            <Route path="users" element={<Users />} />

            
            
            
            

          
          </Route> 

        </Routes>


      </BrowserRouter>

    </>
  )
}

export default App
