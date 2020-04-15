import React, { Component } from 'react'; 
import Home from './view/Home';
import Result from './view/Result';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
console.disableYellowBox = true;
class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false}}>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Result" component={Result} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
export default App;