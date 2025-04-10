import './index.css';

import { BrowserRouter, Route, Routes } from 'react-router';

import { LoginSwitcher } from '@/pages/LoginSwitcher';
import { LoungeAccessGranted } from '@/pages/lounge/LoungeAccessGranted';
import { LoungeLogin } from '@/pages/lounge/LoungeLogin';
import LoungeQRCode from '@/pages/lounge/LoungeQRCode.jsx';
import { BoardWifiAccessGranted } from '@/pages/wifi/BoardWifiAccessGranted';
import BoardWifiDetails from '@/pages/wifi/BoardWifiDetails';
import { BoardWifiLogin } from '@/pages/wifi/BoardWifiLogin';
import { WifiAccessGranted } from '@/pages/wifi/WifiAccessGranted';
import { WifiLogin } from '@/pages/wifi/WifiLogin.jsx';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<LoginSwitcher />} />
      <Route path="ground-wifi" element={<WifiLogin />} />
      <Route path="wifi" element={<WifiAccessGranted />} />
      <Route path="login-lounge" element={<LoungeLogin />} />
      <Route path="lounge" element={<LoungeAccessGranted />} />
      <Route path="lounge-qr" element={<LoungeQRCode />} />
      <Route path="board" element={<BoardWifiLogin />} />
      <Route path="board/wifi" element={<BoardWifiAccessGranted />} />
      <Route path="board/wifi-details" element={<BoardWifiDetails />} />
    </Routes>
  </BrowserRouter>
);
