import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

/**
 # Simple component
 Has a description
 A list:
 * 1
 * 2
*/
export default class Simple extends PureComponent {
  static displayName = 'Simple';

  static propTypes = {
    /**
     * Text displayed at top
     */
    title: PropTypes.string,
    /**
     * Text displayed at bottom
     */
    footer: PropTypes.string,
    age: PropTypes.number,

  };

  static defaultProps = {
    title: 'Default Title',
    age: 10,
  };

  render() {

    return (
      <View>
        <Text style={{fontSize: 20}}>{this.props.title}</Text>
        <Text>Number: {this.props.age}</Text>
        <Text style={{fontSize: 20}}>{this.props.footer}</Text>

      </View>
    );

  }
}
