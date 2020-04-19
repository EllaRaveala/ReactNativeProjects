import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Picker,
    TextInput
} from 'react-native';

export default function App() {

    const [result,
        setResult] = useState('');
    const [amount,
        setAmount] = useState('');
    const [rates,
        setRates] = useState([]);
    const [rate,
        setRate] = useState('');

    useEffect(() => {
        setRates({
            AED: 3.963451,
            AFN: 82.094845,
            ALL: 125.579333,
            AMD: 541.218936,
            ANG: 1.931532,
            AOA: 584.305672,
            ARS: 70.088429,
            AUD: 1.77554,
            AWG: 1.942366,
            AZN: 1.836862,
            BAM: 1.954041,
            BBD: 2.178705,
            BDT: 91.660475,
            BGN: 1.956827,
            BHD: 0.40678,
            BIF: 2050.274899,
            BMD: 1.079092,
            BND: 1.546784,
            BOB: 7.440088,
            BRL: 5.666632,
            BSD: 1.079012,
            BTC: 0.000152,
            BTN: 82.227418,
            BWP: 13.248171,
            BYN: 2.775259,
            BYR: 21150.204218,
            BZD: 2.175009,
            CAD: 1.525847,
            CDF: 1845.247009,
            CHF: 1.055908,
            CLF: 0.033394,
            CLP: 921.328064,
            CNY: 7.653246,
            COP: 4347.532386,
            CRC: 621.001451,
            CUC: 1.079092,
            CUP: 28.595939,
            CVE: 110.563804,
            CZK: 27.568639,
            DJF: 191.77609,
            DKK: 7.465916,
            DOP: 58.473209,
            DZD: 136.776159,
            EGP: 16.996992,
            ERN: 16.186566,
            ETB: 35.664477,
            EUR: 1,
            FJD: 2.480563,
            FKP: 0.877634,
            GBP: 0.877513,
            GEL: 3.410053,
            GGP: 0.877634,
            GHS: 6.226422,
            GIP: 0.877634,
            GMD: 54.980202,
            GNF: 10159.651493,
            GTQ: 8.323879,
            GYD: 225.313709,
            HKD: 8.365499,
            HNL: 26.923746,
            HRK: 7.625187,
            HTG: 103.093606,
            HUF: 364.576634,
            IDR: 17813.651594,
            ILS: 3.879765,
            IMP: 0.877634,
            INR: 82.0428,
            IQD: 1284.659088,
            IRR: 45435.170698,
            ISK: 155.496302,
            JEP: 0.877634,
            JMD: 145.672625,
            JOD: 0.765042,
            JPY: 117.766698,
            KES: 114.490737,
            KGS: 91.583946,
            KHR: 4397.300181,
            KMF: 491.523004,
            KPW: 971.189381,
            KRW: 1324.650368,
            KWD: 0.335566,
            KYD: 0.899177,
            KZT: 473.844956,
            LAK: 9663.269374,
            LBP: 1633.745951,
            LKR: 208.527784,
            LRD: 213.821745,
            LSL: 20.491847,
            LTL: 3.186278,
            LVL: 0.652732,
            LYD: 1.521561,
            MAD: 11.082268,
            MDL: 20.124375,
            MGA: 4046.595017,
            MKD: 61.639424,
            MMK: 1538.195974,
            MNT: 3002.821931,
            MOP: 8.615512,
            MRO: 385.236193,
            MUR: 42.89649,
            MVR: 16.613585,
            MWK: 795.850831,
            MXN: 26.848814,
            MYR: 4.702691,
            MZN: 72.159523,
            NAD: 20.497316,
            NGN: 396.026514,
            NIO: 36.85103,
            NOK: 11.27799,
            NPR: 131.563551,
            NZD: 1.816166,
            OMR: 0.41563,
            PAB: 1.079012,
            PEN: 3.731491,
            PGK: 3.687796,
            PHP: 54.645757,
            PKR: 179.701493,
            PLN: 4.561052,
            PYG: 7057.438556,
            QAR: 3.928704,
            RON: 4.830983,
            RSD: 117.5617,
            RUB: 82.308847,
            RWF: 1011.648799,
            SAR: 4.057275,
            SBD: 8.953235,
            SCR: 13.598733,
            SDG: 59.672795,
            SEK: 10.971361,
            SGD: 1.547057,
            SHP: 0.877634,
            SLL: 10510.356931,
            SOS: 631.268921,
            SRD: 8.047819,
            STD: 23796.97128,
            SVC: 9.441356,
            SYP: 555.126814,
            SZL: 20.491911,
            THB: 35.459256,
            TJS: 11.017366,
            TMT: 3.776822,
            TND: 3.134226,
            TOP: 2.547251,
            TRY: 7.307502,
            TTD: 7.290825,
            TWD: 32.625809,
            TZS: 2496.933974,
            UAH: 29.377303,
            UGX: 4062.680468,
            USD: 1.079092,
            UYU: 47.726304,
            UZS: 10305.329193,
            VEF: 10.777433,
            VND: 25303.833475,
            VUV: 134.972243,
            WST: 3.041698,
            XAF: 655.357002,
            XAG: 0.073766,
            XAU: 0.000654,
            XCD: 2.916301,
            XDR: 0.794373,
            XOF: 655.008549,
            XPF: 119.150916,
            YER: 270.098994,
            ZAR: 20.271662,
            ZMK: 9713.119574,
            ZMW: 20.421203,
            ZWL: 347.467642
        });
        /*const url = 'http://data.fixer.io/api/latest?access_key=6ac7b74a917747257d1ea7831ad7777a';
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setRates(data.rates);
        }).catch((error) => {
            Alert.alert('Error', error);
        });*/
    }, []);

    const convert = () => {
        setResult((parseInt(amount) / parseInt(rate)).toFixed(2) + '€');
    }

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 15}}>{result}</Text>
            <View style={styles.inputAndPicker}>
                <TextInput
                    style={styles.textinput}
                    onChangeText={(amount) => setAmount(amount)}></TextInput>
                <Picker
                    selectedValue={rate}
                    style={{
                    height: 50,
                    width: 100
                }}
                    onValueChange={(itemValue) => {
                    setRate(itemValue);
                }}>
                    {Object.keys(rates)
                        .map((key, index) => {
                            return (<Picker.Item label={key} value={rates[key]} key={index}/>)
                        })}
                </Picker>
            </View>
            <Button title="Convert" onPress={convert}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        marginTop: 20
    },
    textinput: {
        width: 60,
        borderBottomColor: 'lightblue',
        borderBottomWidth: 1
    },
    inputAndPicker: {
        flexDirection: "row",
        width: 300,
        justifyContent: 'space-around',
        marginTop: 20,
        marginBottom: 10
    }
});