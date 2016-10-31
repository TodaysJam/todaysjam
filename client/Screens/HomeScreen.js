import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ListView,
  Image,
  RefreshControl
} from 'react-native';
import Dimensions from 'Dimensions';
import Modal from 'react-native-simple-modal'; 
import { Components } from 'exponent';

//define global variables
global._globalHeaderOffset = (Dimensions.get('window').width - 100) / 2;
global._globalRefreshingInterval = 60000;

//declare variables which will be used in modal view (data sharing purpose)
var modalInfo = {};
var modalIndex = {};

//homepage with active groups and find/create button
export default class HomeScreen extends React.Component { 
  constructor() {
    super();
    //generate rows that contain all current jam groups
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      open: false,
      refreshing: false,
      dataSource: this.ds.cloneWithRows([
        {
          name: '',
          jam: '',
          description: 'You have no Jams!'
        }
      ])
    };
  } // end constructor

  componentWillMount() {
    fetch('https://todaysjam.herokuapp.com/api/users/jams/' + global._globalUserId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((results) => {
      this.setState({dataSource: this.ds.cloneWithRows(JSON.parse(results._bodyText))});
    })
    .catch((err) => {
      console.log(JSON.parse(err));
    });
  } // end componentWillMount

  checkin(rowData, index) {
    fetch('https://todaysjam.herokuapp.com/api/users/jams/checkin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: rowData._id
      })
    })
    .then((res) => {
      //update the entry of dataSource, with the response from the server
      var updatedDataSource = Object.assign({}, this.state.dataSource)._dataBlob.s1;
      updatedDataSource[index]=JSON.parse(res._bodyText);
      this.setState({dataSource: this.ds.cloneWithRows(updatedDataSource)});
    })
    .catch((err) => {
      console.log('error message: ', err);
    })
  }// checkin function to fire ajax call to the server to check in an event

  //when clicking th
  modalCheckin(rowData, index) {
    this.setState({open: false});
    this.checkin(rowData, index);
  }

  _onRefresh() {
    this.setState({refreshing: true});
    fetch('https://todaysjam.herokuapp.com/api/users/jams/' + global._globalUserId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((results) => {
      this.setState({dataSource: this.ds.cloneWithRows(JSON.parse(results._bodyText)), refreshing: false});
    })
    .catch((err) => {
      console.log(JSON.parse(err));
    });
  }

  openModal(rowData, index) {
    console.log('show modal');
    modalInfo = rowData;
    modalindex = index;
    this.setState({open: true});
  }

  render() {
    return (
      //essentially a div element
      <Components.LinearGradient 
        colors={['#9e34a7', '#ad53b5']} 
        style={styles.viewContainer} >

        {/* View Header Image */}
        <View>
          <Image 
            source={require('../.././assets/todaysjambrand2.png')}
            style={styles.brand}
            />
        </View>

        {/* View Header Image Text */}
        <Text style={styles.headerText}>Your Jams</Text>

        {/* ScrollView */}
        <ScrollView 
          style={styles.viewContainer}
          //refreshControl enable the the function of updating info by swiping down
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              title="Updating Jams Info..."
              titleColor="#00b33c"
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          <ListView
            dataSource={this.state.dataSource}
            //creates all the jams dynamically 
            //with input from database
            enableEmptySections={true}
            renderRow={(rowData, i, index) => (
              <View key={i} style={styles.jamView}>
                <Text style={styles.descriptionText} >Jam Name: {rowData.name}</Text>
                <Text style={styles.descriptionText} >Points: {rowData.score}</Text>
                <Text style={styles.descriptionText} >Description: 
                  { 
                    rowData.description.indexOf('\n') !== -1 
                    ? `${rowData.description.substring(0, rowData.description.indexOf('\n'))} ......` 
                    : ((rowData.description.length > 30) ? `${rowData.description.substring(0, 30)} ......` : rowData.description)
                  }
                </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <TouchableOpacity
                    //disable the button when the button is green, which is the 'mission completed' function
                    disabled={!!rowData.lastCheckin && (Date.now()-Date.parse(rowData.lastCheckin) < global._globalRefreshingInterval)}
                    onPress={this.checkin.bind(this, rowData, index)}
                    style={
                      rowData.lastCheckin ? 
                        (Date.now()-Date.parse(rowData.lastCheckin) > global._globalRefreshingInterval ? styles.jamNeedtoCheckinButton : styles.jamCheckinButton) 
                      : styles.jamNeedtoCheckinButton}>
                    <Text style={styles.jamCheckinText}>
                      {rowData.lastCheckin ?
                        (Date.now()-Date.parse(rowData.lastCheckin) > global._globalRefreshingInterval ? 'Jam\nOut!' : 'Mission Completed')  
                      : 'Jam\nOut!'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={this.openModal.bind(this, rowData, index)}
                    style={styles.jamCheckinDetailsButton}>
                    <Text style={styles.jamCheckinText}>Check Jam Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </ScrollView>
        <Modal
          //Modal Definition
          //Modal needs to put outside of ScrollView, or else it will be offset off screen
          offset={0}
          open={this.state.open}
          modalDidOpen={() => console.log('modal did open')}
          modalDidClose={() => this.setState({open: false})}
          style={{alignItems: 'center'}}>
          <View>
            <Text style={{fontSize: 24, marginBottom: 10}}>Jam Details:</Text>
            <Text style={{fontSize: 16}}>{`Jam Name: ${modalInfo.name}`}</Text>
            <Text style={{fontSize: 16}}>{`points: ${modalInfo.name}`}</Text>
            <Text style={{fontSize: 16}}>{`Jam Description: ${modalInfo.description}`}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity
                 disabled={!!modalInfo.lastCheckin && (Date.now()-Date.parse(modalInfo.lastCheckin) < global._globalRefreshingInterval)}
                 style={{margin: 5}}
                 onPress={() => setTimeout(this.modalCheckin.bind(this, modalInfo, modalindex), 1)}>
                 <Text>Check In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                 style={{margin: 5}}
                 onPress={() => this.setState({open: false})}>
                 <Text>Close modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Components.LinearGradient>
    );
  } // end render
} // end exports default

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  buttons: {
    alignItems: 'center'
  },
  jamCheckinText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginTop: 2
  },
  descriptionText: {
    fontSize: 16,
    marginLeft: 1,
    backgroundColor: 'transparent'
  },
  headerText: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'transparent'
  },
  jamView: {
    borderWidth: 1,
    borderRadius: 9,
    height: 115,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
    borderColor: 'gray'
  },
  jamCheckinButton: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'gray',
    width: 180,
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    backgroundColor: '#00b33c'
  },
  jamNeedtoCheckinButton: {
    borderWidth: 2,
    borderRadius: 7,
    borderColor: 'gray',
    width: 180,
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    backgroundColor: 'red'
  },
  jamCheckinDetailsButton: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'gray',
    width: 180,
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    backgroundColor: '#00b33c'
  },
  brand: {
    width: 100,
    height: 40, 
    marginLeft: global._globalHeaderOffset, 
    marginTop: 30, 
    marginBottom: 10
  }
}); // end styles
