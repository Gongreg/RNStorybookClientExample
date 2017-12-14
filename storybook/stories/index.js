import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Simple from './simple';
import Welcome from './Welcome';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome/>);

storiesOf('Simple component', module).add('Default', () =>
  <Simple age={15} footer="amazing"/>
);
