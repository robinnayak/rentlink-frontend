import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../common/Home';
import Register from '../authPages/Register';
import Login from '../authPages/Login';
import ProtectedRoute from './ProtectedRoute'; // Import ProtectedRoute component
import AddRoom from '../landlord/AddRoom';
import OurMembers from '../common/Ourmembers';
import ContactUs from '../common/contact/ContactUs';
import RoomDetail from '../common/HomeComponents/rooms/RoomDetail';
import { Payment } from '../common/payment/Payment';
import ManageRoom from '../landlord/ManageRoom';
import EditRoom from '../landlord/EditRoom';
import ViewRoom from '../landlord/ViewRoom';
import NotFound from './NotFound';
import Settings from '../common/settings/Settings';

const NavigationContainer = () => {
  return (
    <Router>
      <Routes>
        {/* Unauthenticated Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Authenticated Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<OurMembers />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/rooms/:pk" element={<RoomDetail />} />

        <Route path="/add-room" element={<ProtectedRoute element={<AddRoom />} />} />
        <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
        <Route path="/manage-rooms" element={<ProtectedRoute element={<ManageRoom />} />} />
        <Route path="/edit-rooms" element={<ProtectedRoute element={<EditRoom />} />} />
        <Route path="/view-rooms" element={<ProtectedRoute element={<ViewRoom />} />} />
        
        <Route path="/payment" element={<ProtectedRoute element={<Payment />} />} />

        {/* Catch-all Route for unknown paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default NavigationContainer;
