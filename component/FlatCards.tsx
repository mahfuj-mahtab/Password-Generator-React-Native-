import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function FlatCards() {
  return (
    <View>
      <Text style={styles.headingText}>FlatCards</Text>
      <View style={styles.container}>
            <View style={[styles.card,styles.cardOne]}>
                <Text style={styles.textbox}>Red</Text>

            </View>
            <View style={[styles.card,styles.cardTwo]}>
                <Text style={styles.textbox}>Green</Text>

            </View>
            <View style={[styles.card,styles.cardThree]}>
                <Text style={styles.textbox}>Blue</Text>

            </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    headingText:{
        fontSize: 24,
        fontWeight:'bold',
        marginLeft: 10,
        marginTop:8,
    },
    container:{
       
        flex : 1,
        flexDirection:'row',
        padding:8,
      
    },
    card:{
        width:100,
        height: 100,
        borderRadius:4,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        margin:10,
    
    },
    cardOne:{
        backgroundColor:'#DE4839',
       
        
    },
    cardTwo:{
        backgroundColor:'#02B290',
       
        
    },
    cardThree:{
        backgroundColor:'#1B98F5',
       
        
    },
    textbox:{
        color:'white',
    }
})