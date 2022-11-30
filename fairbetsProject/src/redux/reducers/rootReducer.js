import { combineReducers } from "redux"
import customizer from "./customizer/"
import auth from "./auth/"
import paymentGateWay from "./paymentGateWay"
import profileReducers from "./profile/index"
import casinolist from "./casinolist/index"
import player from "./player"
import balance from "./balance"
import report from "./report"
import withdraw from "./paymentWithdraw"
import sports from "./sports"
import exchgange from "./exchgange"
import satta from "./satta"
import time from "./time"
import sliders from "./sliders"
import loading from "./loading"
import betexch from "./betexch"

const rootReducer = combineReducers({
  customizer,
  auth,
  profile : profileReducers,
  casinolist,
  paymentGateWay,
  report,
  player,
  withdraw,
  balance,
  sports,
  exchgange,
  satta,
  time,
  sliders,
  loading,
  betexch
})

export default rootReducer
