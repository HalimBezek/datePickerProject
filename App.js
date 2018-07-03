/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

//datepicker install edilip dahil edildi
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import moment from 'moment';

import data from './jsondata/data.json';
export default class DatePickerTimePickerDialog extends Component {

ChangeTextFunction =() => {
         this.setState({
             textValue : 'Text change for log control'
         });
      console.log('Text change for log control');
     }
  constructor(props) {
    super(props);
    this.state = {
      dobText: '',
      dobDate: null,
      journeyText: '',
      journeyDate: null,
      textValue: 'Control Log',
    };
  }
  /**
   * DOB textbox click listener
   */
  onDOBPress = () => {
    let dobDate = this.state.dobDate;

    if (!dobDate || dobDate == null) {
      dobDate = new Date();
      this.setState({
        dobDate //: dobDate
      });
    }
    //To open the dialog
    this.refs.dobDialog.open({
      date: dobDate,
      maxDate: new Date() //To restirct future date
			//eğer Date = new Date() yazılırsa tüm zamanlar gelir.
    });
  }

  /**
   * Call back for dob date picked event
   *
   */
  onDOBDatePicked = (date) => {
    let textValue;
    for (var i = 0; i < data.olaylar.length; i++) {
      if (data.olaylar[i].tarih == moment(date).format('DD.MM.YYYY')) {
        textValue = 'Bu tarihte : ' + data.olaylar[i].olay + ' oldu -' + data.olaylar[i].tarih + ' -from DOBDate';
        break;
      } else {
         textValue = 'maalesef bu tarihte pek birşey olmadı --' + moment(date).format('DD.MM.YYYY')
         data.olaylar[i].tarih + ' -from DOBDate';
      }
    }
    this.setState({
      dobDate: date,
      dobText: moment(date).format('DD.MM.YYYY'),
      textValue
    });
  }
  /**
   * Journey date textbox click listener
   */
  onJourneyDatePress = () => {
    let journeyDate = this.state.journeyDate;

    if (!journeyDate || journeyDate == null) {
      journeyDate = new Date();
      this.setState({
        journeyDate
      });
    }

    //To open the dialog
    this.refs.journeyDialog.open({
      date: journeyDate,
      Date: new Date() //To restirct past date
      //minDate: new Date() şimdiki tarihten daha küçük alamaz
    });
  }
  /**
   * Call back for journey date picked event
   *
   */
  onJourneyDatePicked = (date) => {
    let textValue;
    for (var i = 0; i < data.olaylar.length; i++) {
      if (data.olaylar[i].tarih == moment(date).format('DD.MM.YYYY')) {
        textValue = 'Bu tarihte : ' + data.olaylar[i].olay + ' oldu -' + data.olaylar[i].tarih + ' -from JourneyDate';
        break;
      } else {
        textValue = 'maalesef bu tarihte pek birşey olmadı --' + moment(date).format('DD.MM.YYYY')
         data.olaylar[i].tarih + ' -from JourneyDate';
      }
    }
      this.setState({
      journeyDate: date,
      journeyText: moment(date).format('DD.MM.YYYY'),
      textValue
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.content}>
          Date Picker Dialog Example
        </Text>

        <View style={{ flex: 1, marginTop: 10 }}>
          <Text>DOB</Text>
          <TouchableOpacity onPress={this.onDOBPress.bind(this)} >
            <View style={styles.datePickerBox}>
              <Text style={styles.datePickerText}>{this.state.dobText}</Text>
            </View>
          </TouchableOpacity>

          <Text style={{ marginTop: 20 }}>Journey Date</Text>
          <TouchableOpacity onPress={this.onJourneyDatePress.bind(this)} >
            <View style={styles.datePickerBox}>
              <Text style={styles.datePickerText}>{this.state.journeyText}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.ChangeTextFunction} >
            <Text>Change Value</Text>
          </TouchableOpacity>
          <Text style={styles.instructions} >{this.state.textValue}</Text>
        </View>

        {/* Place the dialog component at end of your views and assign the references,
					 event handlers to it.*/}
        <DatePickerDialog ref="dobDialog" onDatePicked={this.onDOBDatePicked.bind(this)} />
        <DatePickerDialog ref="journeyDialog" onDatePicked={this.onJourneyDatePicked.bind(this)} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF'
  },
  content: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  datePickerBox: {
    marginTop: 9,
    borderColor: '#ABABAB',
    borderWidth: 0.5,
    padding: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    height: 38,
    justifyContent: 'center'
  },
  datePickerText: {
    fontSize: 14,
    marginLeft: 5,
    borderWidth: 0,
    color: '#121212',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
});

AppRegistry.registerComponent('DatePickerTimePickerDialog', () => DatePickerTimePickerDialog);
