import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import PhotoDetail from '../pages/PhotoDetail';

const AppRoutes = () => (
  <Routes>
    <Route path="/home" element={<HomePage />} />
    <Route path="/photoDetail/:id" element={<PhotoDetail />} />
    <Route path="/" element={<HomePage />} />
  </Routes>
);

export default AppRoutes;
