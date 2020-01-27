import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './login/index';
import Account from './createAccount/index';
import Item from './item/index';
import Home from './home/index';
import Post from './post/post';
import Posts from './posts/posts';

const InitialNavigator = createStackNavigator({Login, Account});

const HomeNavigator = createStackNavigator({Home, Item, Post, Posts});

const SwitchNavigator = createSwitchNavigator({
  InitialNavigator,
  HomeNavigator,
});

export default createAppContainer(SwitchNavigator);
