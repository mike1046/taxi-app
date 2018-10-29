import { spawn } from 'redux-saga/effects'
import userSaga from './userSaga'
import RewardSaga from './RewardSaga'
import API from '../services/api'

const api = API.create()

export default function* rootSaga() {
  yield spawn(userSaga, api)
  yield spawn(RewardSaga, api)
}
