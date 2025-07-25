import React from 'react'
import { Routes, Route } from "react-router-dom"
import { MainLayout } from './layout/MainLayout.jsx';
import Home from "./pages/Home.jsx"
import Rentals from "./pages/Rentals.jsx"
import Contact from "./pages/Contact.jsx"
import Help from "./pages/Help.jsx"
import Location from './pages/Location.jsx';
import { LoginForm } from './components/LoginForm.jsx';
import { RegisterForm } from './components/RegisterForm.jsx';
import {GoogleWrapper} from "./components/wrapper/GoogleWrapper.jsx"
import {AuthCheck} from "./utils/checkAuth.js"
import { ErrorSection } from './pages/Error.jsx';
import {SingleVehicle} from "./pages/SingleVehicle.jsx"
import Bookings from "./pages/Bookings.jsx"
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx"
import ReturnPolicy from './pages/ReturnPolicy.jsx';
import TermAndCondition from './pages/TermAndCondition.jsx';
// import Booking from '../../backend/src/models/booking.model.js';
// import {SetSelectedCity} from "./utils/setselectedcity.localStorage.js"

function App() {
  AuthCheck()
  

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/rentals' element={<Rentals />} />
        <Route path='/rentals/:vehicleId' element={<SingleVehicle/>} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/help' element={<Help />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/return-policy' element={<ReturnPolicy />} />
        <Route path='/term-and-condition' element={<TermAndCondition />} />
        <Route path='/first/Setlocation' element={<Location />} />
        <Route path="/login" element={
          <GoogleWrapper>
            <LoginForm />
          </GoogleWrapper>
        } />
        <Route path="/register" element={
          <GoogleWrapper>
            <RegisterForm />
          </GoogleWrapper>
        } />
        <Route />
        <Route path='/bookings' element={<Bookings />} />
        <Route path='*' element={<ErrorSection/>}/>
      </Route>
    </Routes>
  )
}

export default App;