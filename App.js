import React, {Component} from 'react';
import {
  Dimensions,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {BarCodeScanner, Permissions} from 'expo';
import {getStorybook} from 'wix-react-native-storybook-server';

export default class App extends Component {
  state = {
    hasCameraPermission: null,
    displayScanner: true,
  };

  componentDidMount() {
    this.requestCameraPermission();
  }

  requestCameraPermission = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  handleBarCodeRead = (e) => {
    const [host, port, pairedId, secured] = e.data.split('|');

    this.storybookComponent = getStorybook(
      () => require('./storybook/stories'),
      module,
      {
        port: (port === 'false' || port === '') ? false : port,
        host,
        query: `pairedId=${pairedId}`,
        secured: secured === 'true',
        manualId: true,
        resetStorybook: true,
      }
    )();

    this.setState({
      displayScanner: false
    });
  };

  reset = () => {
    this.setState({
      displayScanner: true
    });
  };


  render() {

    if (!this.state.displayScanner) {
      return (
        <View style={styles.storybookContainer}>
          {this.storybookComponent}
          <View style={styles.bottomBar}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={this.reset}>
              <Text style={styles.cancelButtonText}>
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
            ? <Text style={{color: '#fff'}}>
              Camera permission is not granted
            </Text>
            : <BarCodeScanner
              onBarCodeRead={this.handleBarCodeRead}
              style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
              }}
            />
        }
        <View style={styles.bottomBar}>
          <Text numberOfLines={2} style={styles.urlText}>
            https://vast-eyrie-45947.herokuapp.com/
            Scan qr code (The page will take ~30s to load)
          </Text>
        </View>
        <StatusBar hidden/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  storybookContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 14,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
});
