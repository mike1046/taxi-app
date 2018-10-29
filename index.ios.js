/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import {AppRegistry} from 'react-native';
import App from './src/App';


class Root extends App {
	static defaultProps = {
		...App.defaultProps,
	};
}

console.disableYellowBox = false; //toggle to debug more

AppRegistry.registerComponent('Eastern', () => Root);
