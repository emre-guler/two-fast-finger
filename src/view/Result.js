import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements'

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replayGame: false
        }
    }
    goBackToGame = () => {
        this.props.navigation.navigate("Home", { playMode: 'retry'});
    }
    getData = () => {
        if(!this.state.replayGame) {
            const routeParams = this.props.route.params;
            const gamePoint = JSON.stringify(routeParams.gamePoint);
            return (
                <View style={{ width: 250, height: 250, borderRadius: 250 / 2, backgroundColor: 'transparent', alignItems: 'center',  borderWidth: 1, borderColor: '#929e9f'}}>
                    <Text style={{ position: 'absolute', top: '35%', letterSpacing: 5, fontSize: 24, fontFamily: 'sans-serif', color: '#929e9f' }}>Your Score:</Text>
                    <Text style={{ position: 'absolute', top: '60%', letterSpacing: 5, fontSize: 18, fontFamily: 'sans-serif', color: '#929e9f' }}>{gamePoint} words / min</Text>
                </View>
            )
        }
        else {
            return (
                <TouchableOpacity onPress={() => this.goBackToGame()} style={{ width: 250, height: 250, borderRadius: 250 / 2, backgroundColor: 'transparent', alignItems: 'center',  borderWidth: 1, borderColor: '#929e9f'}}>
                    <View style={{ position: 'absolute', top: '40%' }}>
                        <Icon type="font-awesome" name="undo" color="#929e9f" size={50} />
                    </View>
                </TouchableOpacity>
            )
        }
    }
    shareClicked = () => {

    }
    render() {
        setTimeout(() => this.setState({ replayGame: true }), 5000);
        return (
            <LinearGradient colors={['#000e27', '#310031']} style={{ flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                <View style={{ flex: 5, justifyContent: 'center' }}>
                   {this.getData()}
                </View>
            </LinearGradient>
        )
    }
}
export default Result;