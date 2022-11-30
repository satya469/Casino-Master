import {get_betid, get_betsdata, GetYYMMHH} from "../../actions/auth/index"
const initialState = {
    bazaarsdata : [],
    gamedata : [],
    numbersdata  :[],
    betsdata  :  get_betsdata(),
    betId : get_betid(),
    finacedata : {
      totalOdds : 0,
      totalMoney : 0
    },
    eventflag : true,
    commont : "",
    betslip : false,
    bazartypes : [],
    bettingdate : GetYYMMHH(new Date()),
    maxdate : GetYYMMHH(new Date(new Date().valueOf() + 2 * 24 * 3600 * 1000)),
}

  const satta = (state = initialState, action) => {
    switch (action.type) {
      case "SATTA_BAZAARS_ITEMS":
        return { ...state, ...action.data}
      case "SATTA_BETS_DATA" : 
        return {...state, betsdata : action.data}
      case "SATTA_EVENT_FLAG" : 
        return {...state, eventflag : action.data}
      case "SATTA_BETTINGDATE" : 
      return {...state, bettingdate : action.data}
      case "SATTA_bazaarsdata" : 
      return {...state, bazaarsdata : action.data}
      case "SATTA_BETSLIP_FLAG" :
        return {...state, betslip : action.data}
        
      case "SATTA_BETS_ID_FORMAT" : 
        return {...state, betId : get_betid() }
      
        default:
        return state
    }
  }
  
export default satta
  
