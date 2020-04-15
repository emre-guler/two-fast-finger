import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import { Input } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

let timer;
class Home extends Component {
    constructor(props) {
        super(props);
        this.initState = {
            homepage: false,
            inputValue: '',
            time: 60,
            words: [
                "fotoğraf", "görmek", "görev", "güç", "avizelik", "ağaç", "avuç", "aksettirmek", "ısrar", "külfet", "müracaat", "müsadere", "kütüphane", "kendi", "kesin", "göndermek ", "dolmuş", "erkek", "kadın", "atmak", "devirmek",
                "telefon", "bilgisayar", "klavye", "baba", "anne", "cüzdan", "fare", "atmaca", "padişah", "gözlük", "patates", "yuvarlak", "kare", "kara", "sarışın", "perde", "ayna", "ayrıştırmak", "güzergah", "elektronik", "engellemek",
                "ceza", "kılavuz", "müvekkil", "avukat", "mühendis", "evet", "hayır", "kısıtlama", "liyakat", "iyileştirme", "hastane", "polis", "karakol", "istanbul", "vekaletname", "işletme", "nüfus", "ikamet", "büyücü", "durum", 
                "genç", "iki", "uzun", "birbiri", "oturmak", "yapmak", "yol", "yeni", "böyle", "gerekmek", "alınmak", "bölge", "artık", "hiçbir", "neden", "hal", "bütün", "olmak", "başlamak", "sonuç", "etmek", "çalışmak", "onlar",
                "söylemek", "alan", "hayat", "saat", "koşturmak", "sevmek", "düzlük", "patika", "çıkarmak", "toplamak", "tutmak", "çarpmak", "bölmek", "anı",  "evlilik", "karıkoca", "para", "lira", "neden", "nerede", "kim", "nasıl",
                "borç", "hapis", "teneke", "demir", "çelik", "beton", "bileşen", "sıkışmak", "gün", "ay", "yıl", "pazartesi", "salı", "çarşamba", "perşembe", "cuma", "cumartesi", "pazar", "sahip", "satmak", "almak", "vergi", "için",
                "göstermek", "ülke", "geçmek", "kedi", "köpek", "hayvan", "zürafa", "maymun", "başkan", "başbakan", "spekülasyon", "ropdöşambır", "muayenehane", "muvafakatname", "çizmek", "karalamak", "bocalamak", "ateş", "yangın", "duman"
            ],
            wordOnScreen: '',
            firstText: '60 saniyen klavyeye tıklayınca başlayacak',
            correctAnswerCounter: 0,
            keyboardDisable: false
        }
        this.state = this.initState;
    }
    login = () => {

    }
    showGameScreen = () => {
        this.setState({ homepage: true });
    }
    textChanged = (newValue) => {
        if(!this.state.keyboardDisable) {
            this.setState({ inputValue: newValue });
            if(newValue == this.state.wordOnScreen) {
                this.setState({ correctAnswerCounter: (this.state.correctAnswerCounter + 1), inputValue: ''  });
                this.getNewWord();
            }
        }
        else {
            this.setState({ inputValue: '' });
        }
    }
    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this.keyboardDidShow,
        );
        this.keyboardDidHideListener  = Keyboard.addListener(
            'keyboardDidHide',
            this.keyboardDidHide,
        );
    }
    keyboardDidShow = () => {
        this.setState({ firstText: '' });
        this.getNewWord();
        timer = setInterval((() => {
            if(this.state.time != 0)
            {
                this.setState({ time: (this.state.time - 1) });
            }
            else
            {
                clearInterval(timer);
                this.props.navigation.navigate('Result', { gamePoint: this.state.correctAnswerCounter, login: 'none' });
            }
        }), 1000);
    }
    keyboardDidHide = () => {
        clearInterval(timer);
    }
    getNewWord = () => {
        let randomNumber = Math.floor(Math.random() * this.state.words.length + 1);
        let randomWord = this.state.words[randomNumber];
        this.setState({ wordOnScreen: randomWord });
    }
    render() {
        try {
            if(this.props.route.params.playMode == "retry") {
                this.setState(this.initState);
                this.props.route.params.playMode = "";
            }
        }
        catch(e) {
            
        }
        if(!this.state.homepage) {
            return (
                <LinearGradient colors={['#000e27', '#310031']} style={{ flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                    <TouchableOpacity style={{ flex: 5, justifyContent: 'center' }} onPress={() => this.showGameScreen()}>
                        <View style={{ width: 250, height: 250, borderRadius: 250 / 2, backgroundColor: 'transparent', alignItems: 'center',  borderWidth: 1, borderColor: '#929e9f'}}>
                            <Text style={{ position: 'absolute', top: '43%', letterSpacing: 5, fontSize: 24, fontFamily: 'sans-serif', color: '#929e9f' }}>TAP TO PLAY</Text>
                        </View>
                    </TouchableOpacity>
                </LinearGradient>
            )
        }  
        else {
            return (
                <LinearGradient colors={['#000e27', '#310031']} style={{ flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                    <View style={{ flex: 3 }} >
                        <Text style={{ fontSize: 52, fontFamily: 'sans-serif', color:'#929e9f', marginTop: 50 }}>{ this.state.time }</Text>
                    </View>
                    <View stlye={{ flex: 1 }}>
                        <Text style={{ fontSize: 42, fontFamily: 'sans-serif', color: '#929e9f', marginTop: 50  }}>{this.state.wordOnScreen}</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'sans-serif', color: '#929e9f', marginTop: 50  }}>{this.state.firstText}</Text>
                    </View>
                    <View style={{ flex: 8, justifyContent: 'center' }}>
                        <View>
                            <Input placeholder="Let's go!" onChangeText={this.textChanged} placeholderTextColor={"#929e9f"} containerStyle={{ width: 300 }} value={this.state.inputValue} />
                        </View>
                    </View>
                </LinearGradient>
            )
        }
    }
}
export default Home;