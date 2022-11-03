import React from "react";
import TabNavigation from "./src/navigations/TabNavigation";
import { NavigationContainer } from "@react-navigation/native";
export default function App() {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
}
