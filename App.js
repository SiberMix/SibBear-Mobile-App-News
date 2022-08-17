
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HTML from "react-native-render-html";
import {
  SafeAreaView,
  ScrollView,

  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,

} from 'react-native';

//Переменная для хранения ссылки логотипа
const staticImage = require("./source/src/Vector.png");
const buttoninfo = require("./source/src/shevron.png");
const footer = require("./source/src/Group1149.png");

const App = () => {

  const [data, setData] = useState([]);
  useEffect(() => {

    axios.get('https://app-api.sm117.ru/api/v1/contract/news_for_test/').then(({ data }) => {
      setData(data)
    }).catch((error) => {
      console.log("Api call error");
      alert(error.message);
    });
  }, []);

  return (

    <View style={styles.container}>
      <View style={styles.contHeader}>
        <Image style={styles.logo} source={staticImage}></Image>
        <Text style={styles.news}>Новости</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => {
          // console.log("index", index)
          return index.toString();
        }}
        renderItem={({ item }) => {


          return (
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <HTML style={styles.body} source={{ html: item.body }} />

              <Text style={styles.date}>{item.date}

              </Text>

              <Text style={styles.buttoninfo}>Подробнее
                <Image style={styles.buttoninfo} source={buttoninfo}></Image>
              </Text>

            </View>



          )
        }}
      />
      <View style={styles.bottomView}>
        <Image source={footer}></Image>
      </View>
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flexGrow: 1,

    backgroundColor: '#F4F4F4',
    justifyContent: 'space-between',
  },
  contHeader: {
    width: 'auto',
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    flexDirection: "column",
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  title: {
    color: '#191C1F',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },
  news: {
    color: '#191C1F',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontSize: 28,
    fontWeight: '700',
  },
  date: {
    color: '#8B959E',
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '500',

    justifyContent: 'center',

  },

  body: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontSize: 35,
    fontWeight: '700',
  },
  buttoninfo: {
    color: '#FF7700',
    paddingLeft: 230,
    display: 'flex',

  },
  bottomView: {
    width: '100%',
    height: 70,
    paddingRight: 150,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',

    bottom: 0,
  },

});




export default App;rea