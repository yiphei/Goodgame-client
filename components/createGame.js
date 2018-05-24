
import React, { Component } from 'react';
import { StyleSheet, ImageBackground, TextInput, Button, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { createGame } from '../actions';
/* eslint-disable camelcase */

const background = require('../img/court.png');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      time: '',
      duration: '',
      lat: 50,
      long: 50,
      players_needed: '',
      max_players: '',
      level: '',
    };
    this.gameCreator = this.gameCreator.bind(this);
  }

  gameCreator() {
    const game = {
      date: this.state.date,
      time: this.state.time,
      duration: this.state.duration,
      lat: this.state.lat,
      long: this.state.long,
      players_needed: this.state.players_needed,
      max_players: this.state.max_players,
      level: this.state.level,
    };
    console.log('creating game...');
    this.props.createGame(game);

    this.setState({});

    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.topDescription}> Create Game </Text>
        <ImageBackground
          source={background}
          style={styles.container}
        >
          <View style={styles.inputField}>
            <Text style={styles.name}>
            Date
            </Text>
            <TextInput
              style={{
                height: 40, width: 300, borderColor: 'gray', borderWidth: 1,
              }}
              onChangeText={date => this.setState({ date })}
              value={this.state.date}
            />
          </View>
          <View style={styles.inputField}>
            <Text style={styles.name}>
            Time
            </Text>
            <TextInput
              style={{
 height: 40, width: 300, borderColor: 'gray', borderWidth: 1,
}}
              onChangeText={time => this.setState({ time })}
              value={this.state.time}
            />
          </View>
          <View style={styles.inputField}>
            <Text style={styles.name}>
            Duration
            </Text>
            <TextInput
              style={{
 height: 40, width: 300, borderColor: 'gray', borderWidth: 1,
}}
              onChangeText={duration => this.setState({ duration })}
              value={this.state.duration}
            />
          </View>
          <View style={styles.inputField}>
            <Text style={styles.name}>
            Players needed
            </Text>
            <TextInput
              style={{
 height: 40, width: 300, borderColor: 'gray', borderWidth: 1,
}}
              onChangeText={players_needed => this.setState({ players_needed })}
              value={this.state.players_needed}
            />
          </View>
          <View style={styles.inputField}>
            <Text style={styles.name}>
            Max players
            </Text>
            <TextInput
              style={{
 height: 40, width: 300, borderColor: 'gray', borderWidth: 1,
}}
              onChangeText={max_players => this.setState({ max_players })}
              value={this.state.max_players}
            />
          </View>
          <View style={styles.inputField}>
            <Text style={styles.name}>
            Level
            </Text>
            <TextInput
              style={{
 height: 40, width: 300, borderColor: 'gray', borderWidth: 1,
}}
              onChangeText={level => this.setState({ level })}
              value={this.state.level}
            />
          </View>
          <Button title="Submit" onPress={() => this.gameCreator()} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    width: undefined,
    height: undefined,
    backgroundColor: '#FFFFFF',
  },
  inputField: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topDescription: {
    height: 60,
    backgroundColor: '#FF0000BB',
    fontWeight: 'bold',
    fontSize: 30,
  },
  name: {
    fontWeight: 'bold',
  },
  gameList: {
    flex: 1,
  },
  game: {
    borderRadius: 30,
    borderWidth: 10,
    borderColor: '#000000',
  },
  gameText: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 50,
    color: 'red',
  },
});

export default connect(null, { createGame })(Home);