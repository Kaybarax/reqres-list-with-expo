import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import UsersList from "./src/users-list";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UsersListItem from "./src/users-list-item";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Users" component={UsersList} />
        <Stack.Screen name="User Details" component={UsersListItem} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
