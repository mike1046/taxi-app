import { combineReducers } from 'redux'
import modal from './modal'
import user from './user'
import ride from './ride'
import meeting from './meeting'
import destination from './destination'
import driver from './driver'
import request from './request'
import payment from './payment'
import api from './api'
import receipt from './receipt'
import debounce from './debounce'
import autocomplete from './autocomplete'
import pickup from './pickup'
import navigation from './navigation'
import menu from './menu'
import { reducer } from '../redux/RewardRedux'

export default combineReducers({
  modal,
  user,
  ride,
  driver,
  meeting,
  destination,
  request,
  payment,
  api,
  receipt,
  debounce,
  autocomplete,
  pickup,
  navigation,
  menu,
  rewards: reducer,
})
