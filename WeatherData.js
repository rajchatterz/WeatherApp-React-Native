import React from "react";
import {View,Text, TextInput,Button, StyleSheet} from 'react-native'
import axios from "axios";
import { useState } from "react";
const WeatherData = ()=>{
    const [weatherData , setWeatherData] = useState(null)
    const [city, setCity] = useState('')
    const [error,setError] = useState(null)
    const API_KEY = '{enter your api here}'
    
    const fetchWeatherData = async () =>{
        if(!city){
            setError('Please Enter a city Name')
            return;
        }
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
            setWeatherData(response.data)
            setError(null)
            
        } catch (error) {
            setCity('none')
            setError("Invalid city name")
            console.error("error fetching in data: ",error);
        }
    };
    

    return(
        <View style={{justifyContent:'flex-start', height:'100%', alignItems:'center',gap:20,marginVertical:70}}>
            <TextInput style={{
                height:40,
                borderColor:'grey',
                borderWidth:1,
                width:300,
                borderRadius:10,
    
            }}
            placeholder="Enter the city"
            onChange={(e)=>setCity(e.nativeEvent.text)}
            />
            {error && <Text style={{color:'red'}}>{error}</Text>}

                <Button style={style.button} color="green" title="Search" onPress={fetchWeatherData}></Button>


            <Text ></Text>
            {
                weatherData && (
                    <View style={{marginTop:10}}>

                        <Text>{weatherData.weather[0].description}</Text>
                        <Text>Temperature: {(Number(weatherData.main.temp)-273).toFixed(2)+' °C'}</Text>
                        <Text>Humidity: {(weatherData.main.humidity)+' %'}</Text>
                        <Text>Feel Like: {(Number(weatherData.main.feels_like)-273).toFixed(2)+' °C'}</Text>
                    </View>
                
                )
            }
        </View>
    )


}
const style = StyleSheet.create({
    button:{
        padding:20
    }
})
export default WeatherData;