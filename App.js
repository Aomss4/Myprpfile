import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // ✅ ต้องมี

import ProfileScreen from './Component/Screen/ProfileScreen'; // ✅ อย่าลืมตรวจสอบชื่อให้ถูกว่า Frofile หรือ Profile

const Tab = createBottomTabNavigator(); // ✅ เพิ่มบรรทัดนี้


export default function App() {
  return (

    <NavigationContainer>
    <ProfileScreen />
    </NavigationContainer>
  );
}
