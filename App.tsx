
import React, { useState } from 'react';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import type {PropsWithChildren} from 'react';
import * as yup from "yup";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



const passwordSchema = yup.object().shape({
  passwordLength: yup.number()
  .min(4,'Min is 4')
  .max(16,'Max is 16')
  .required('Length is required')
})


function App(): JSX.Element {
  const [password,setPassword] = useState('')
  const [isPasswordGenerated,setIsPasswordGenerated] = useState(false)
  const [lowerCase,setLowerCase] = useState(true)
  const [upperCase,setUpperCase] = useState(false)
  const [numbers,setNumbers] = useState(false)
  const [symbols,setSymbols] = useState(false)

  const generatePassword = (passwordLength : number) =>{
    let charlist = '';
    const upperchar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerchar = 'abcdefghizklmnopqrstuvwxyz';
    const digit = '1234567890';
    const specialchar = '!@#$%^&*()_+-=';
    if(upperCase){
      charlist += upperchar;
    }
    if(lowerCase){
      charlist += lowerchar;
    }
    if(numbers){
      charlist += digit;
    }
    if(symbols){
      charlist += specialchar;
    }
    const passwordResult = createPassword(charlist,passwordLength);
    setPassword(passwordResult)
    setIsPasswordGenerated(true);
  }  
  const createPassword = (characters: string,passwordLength : number) =>{
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const charIndex = Math.round(Math.random()* characters.length)
      result+=characters.charAt(charIndex)
    }
    return result
  } 
  const resetPassword = ()=>{
    setPassword('');
    setIsPasswordGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  } 
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password generator</Text>
          <Formik
       initialValues={{ passwordLength : '' }}
        validationSchema={passwordSchema}
       onSubmit={values => {
        console.log(values);
        generatePassword(Number(values.passwordLength))
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         isSubmitting,
         handleReset,
         /* and other goodies */
       }) => (
          <>
          <View style={styles.inputWrapper}>
            <View style={styles.inputColumn}>
              <Text style={styles.heading}>Password Length</Text>
              {touched.passwordLength && errors.passwordLength &&(
                <Text style={styles.errorText}>
                  {errors.passwordLength}
                </Text>
              )}
          
            </View>
            <TextInput style={styles.inputStyle} 
              value={values.passwordLength}
              onChangeText={handleChange('passwordLength')}
              keyboardType='numeric'
              placeholder='Ex. 8'
              
              />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include Lowercase</Text>
            <BouncyCheckbox 
            disableBuiltInState
            isChecked = {lowerCase}
            onPress={()=> setLowerCase(!lowerCase)}
            fillColor='#29AB87'
            
            
            />
          </View>
          <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include UpperCase</Text>
            <BouncyCheckbox 
            disableBuiltInState
            isChecked = {upperCase}
            onPress={()=> setUpperCase(!upperCase)}
            fillColor='#29AB87'
            
            
            />
          </View>
          <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Number</Text>
            <BouncyCheckbox 
            disableBuiltInState
            isChecked = {numbers}
            onPress={()=> setNumbers(!numbers)}
            fillColor='#29AB87'
            
            
            />
          </View>
          <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Symbols</Text>
            <BouncyCheckbox 
            disableBuiltInState
            isChecked = {symbols}
            onPress={()=> setSymbols(!symbols)}
            fillColor='#29AB87'
            
            
            />
          </View>
          <View style={styles.formActions}>
            <TouchableOpacity disabled={!isValid} style={styles.primaryBtn} onPress={handleSubmit}><Text style={styles.primaryBtnTxt}>Generate Password</Text></TouchableOpacity>
            <TouchableOpacity style={styles.secondaryBtn} onPress={()=>{
              handleReset();
              resetPassword();
            }}><Text style={styles.secondaryBtnTxt}>Reset</Text></TouchableOpacity>
          </View>
          </>
       )}
     </Formik>
        </View>
            {isPasswordGenerated ? (
              <View style={[styles.card, styles.cardElevated]}><Text style={styles.subTitle}>Result : </Text>
              <Text style={styles.description}>Long Press To Copy </Text>
              <Text selectable style={styles.generatedPassword}>
                {password}
              </Text>
              
              
              </View>
            ) : null}
      </SafeAreaView>
    </ScrollView>
    
    
    </>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
});

export default App