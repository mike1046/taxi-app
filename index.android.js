/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import {AppRegistry} from 'react-native';
import App from './src/App';
import 'es6-symbol/implement'


class Root extends App {
	static defaultProps = {
		...App.defaultProps,
	}
};

AppRegistry.registerComponent('Eastern', () => Root);
