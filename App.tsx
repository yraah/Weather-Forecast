import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, FlatList } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
const sun = require('./components/image/sun.png')
const thunder = require('./components/image/thunder.png')
const halfMonth = require('./components/image/half-moon.png')
const heavyRain = require('./components/image/heavy-rain.png')
const house1 = require('./components/image/houserain.png')
const house2 = require('./components/image/housesun.png')
const house3 = require('./components/image/housesunny.png')

import { useFonts, JuliusSansOne_400Regular } from '@expo-google-fonts/julius-sans-one';
import axios from 'axios';


export default function App() {
  const [temperature , setTemperature] = useState(0)
  let [fontsLoaded] = useFonts({
    JuliusSansOne_400Regular,
  });

  const weeklyWeather = [
    { day: 'Monday', temp: '26°C', condition: 'Sunny', icon: 'https://cdn-icons-png.flaticon.com/512/869/869869.png' },
    { day: 'Tuesday', temp: '27°C', condition: 'Cloudy', icon: 'https://cdn-icons-png.flaticon.com/512/2698/2698194.png' },
    { day: 'Wednesday', temp: '25°C', condition: 'Rainy', icon: 'https://cdn-icons-png.flaticon.com/512/1163/1163657.png' },
    { day: 'Thursday', temp: '28°C', condition: 'Partly Cloudy', icon: 'https://cdn-icons-png.flaticon.com/512/869/869869.png' },
    { day: 'Friday', temp: '29°C', condition: 'Sunny', icon: 'https://cdn-icons-png.flaticon.com/512/869/869869.png' },
  ];

useEffect(()=>{
  getWeather()
},[])

const getWeather = async () =>{
  const url = 'https://api.tomorrow.io/v4/weather/realtime?location=Taguig%20City&apikey=ikiN3y1nA2Kt6q3HIHhLgfKjdnGxu0Yx';
  const options = {method: 'GET', headers: {accept: 'application/json'}};

    const getWeatherForecast = await axios.get(url, options)
    setTemperature( getWeatherForecast.data.data.values.temperature)

}

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <View style={styles.container}>
      {/* Current Weather Section */}
      <View style={styles.weatherHeader}>
        <View>
        <Text style={styles.city}>TAGUIG CITY</Text>
        <Text style={styles.temperature}>{Math.round(temperature)}°C</Text>
        <Text style={styles.date}>November 29 2024</Text>
        </View>
        
        <Image
          style={styles.icon}
          source={sun} // Replace with a sunny icon
        />
        
      </View>

      {/* Today's Weather Section */}
      <View style={styles.todaySection}>
        <Text style={styles.todayTitle}>TODAY</Text>
        <View style={styles.forecastRow}>
          {/* Example: Morning */}
          <View style={styles.forecastItem}>
            <Image
              style={styles.smallIcon}
              source={thunder} // Replace with rain icon
            />
            <View style={{marginTop:5}}>
              <Text style={styles.forecastTemp}>25°C</Text>
              <Text style={styles.forecastTime}>12:00</Text>            
            </View>
          </View>
          {/* Example: Noon */}
          <View style={styles.forecastItem}>
            <Image
              style={styles.smallIcon}
              source={halfMonth} // Replace with storm icon
            />
            <View style={{marginTop:5}}>
              <Text style={styles.forecastTemp}>25°C</Text>
              <Text style={styles.forecastTime}>12:00</Text>            
            </View>
          </View>
          {/* Example: Night */}
          <View style={styles.forecastItem}>
            <Image
              style={styles.smallIcon}
              source={heavyRain} // Replace with moon icon
            />
            <View style={{marginTop:5}}>
              <Text style={styles.forecastTemp}>25°C</Text>
              <Text style={styles.forecastTime}>12:00</Text>            
            </View>
          </View>
        </View>
      </View>
      {/* Weekly Weather Section */}
      <Text style={styles.weeklyTitle}>Weekly Weather</Text>
      <FlatList
        style={{height:200}}
        data={weeklyWeather}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card style={styles.weeklyCard}>
            <Card.Content style={styles.weeklyCardContent}>
              <Image source={{ uri: item.icon }} style={styles.weeklyIcon} />
              <View>
                <Text style={styles.weeklyDay}>{item.day}</Text>
                <Text style={styles.weeklyCondition}>{item.condition}</Text>
              </View>
              <Text style={styles.weeklyTemp}>{item.temp}</Text>
            </Card.Content>
          </Card>
        )}
      />
             {/* Horizontal Card Section */}
             <Text style={styles.horizontalTitle}>Other Locations</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {/* Example Card 1 */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Manila</Text>
            <Paragraph>29°C, Sunny</Paragraph>
            <Image
          style={styles.otherLocationIcon}
          source={house1} // Replace with a sunny icon
        />
          </Card.Content>
        </Card>
        {/* Example Card 2 */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Makati</Text>
            <Paragraph>30°C, Cloudy</Paragraph>
            <Image
          style={styles.otherLocationIcon}
          source={house2} // Replace with a sunny icon
        />
          </Card.Content>
        </Card>
        {/* Example Card 3 */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Quezon City</Text>
            <Paragraph>28°C, Rainy</Paragraph>
            <Image
          style={styles.otherLocationIcon}
          source={house3} // Replace with a sunny icon
        />
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#72BF78', // Light beige background
    padding: 20,

  },
  weatherHeader: {
    marginTop:30,
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: 24,
    display:'flex',
    flexDirection:'row'
  },
  city: {
    fontSize: 20,
    fontFamily:'JuliusSansOne_400Regular'
  },
  temperature: {
    fontSize: 60,
    fontFamily:'JuliusSansOne_400Regular'
  },
  icon: {
    width: 80,
    height: 80,
    marginVertical: 8,
    marginLeft:10
  },
  date: {
    fontSize: 16,
    color: '#7D7D7D',
    fontFamily:'JuliusSansOne_400Regular'
  },
  todaySection: {
    backgroundColor: '#A0D683', // Light green background
    padding: 20,
    borderRadius: 20,
    height:'auto',
  },
  todayTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  forecastRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  forecastItem: {
    alignItems: 'center',
  },
  smallIcon: {
    width: 50,
    height: 50,
  },
  forecastTemp: {
    fontSize: 16,
    fontWeight: '600',
     fontFamily:'JuliusSansOne_400Regular'
  },
  forecastTime: {
    fontSize: 14,
    color: '#7D7D7D',
     fontFamily:'JuliusSansOne_400Regular'
  },
  horizontalTitle: {
    marginTop:10,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  horizontalScroll: {
    marginBottom: 16,
  },
  card: {
    width: 150,
    marginRight: 16,
    backgroundColor: '#FEFF9F', // Card background color
    height:150
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  weeklyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 16,
  },
  weeklyCard: {
    marginBottom: 12,
    backgroundColor: '#D3EE98',
  },
  weeklyCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weeklyIcon: {
    width: 40,
    height: 40,
  },
  weeklyDay: {
    fontSize: 16,
    fontWeight: '600',
  },
  weeklyCondition: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  weeklyTemp: {
    fontSize: 16,
    fontWeight: '600',
  },
  otherLocationIcon :{
    width: 60,
    height: 60,
    marginVertical: 8,
    alignSelf:'center'
  }
});
