import sportConfig from "../../../configs/sportsconfig"
import {
    SPORTS_LIST,
    SET_ALL_MATCHS,
    ALL_SPORT_LIST,
    CURRENT_SELECT_SPORT,
    CURRENT_TAP_CHANGE,
    SEASON_TAB_CHANGE,
    MARKET_TAB_CHANGE,
    CURRENTSELECTEGAME,
    SPORTS_SIDEBAR_SET_ITEM,
    CURRENT_BET_TYPE,
    REFRESH_BET_ID,
    SPORTSBOOK_BET_HISTORY,
    RECOVERYEVENTUPDATE,
    FEATURED_EVENT_DATA,
    CHANGE_CURRENT_COUNTRY,
    FIRSTPAGE_SPORTS,
    SET_BETSLIP_LOADING
} from "../../types"

const initialState = {
    sports_list : {data : []},
    all_matchs : {data : []},
    current_tap : sportConfig.tab[0],
    current_selected_sport : {},
    seasonData : {data : []},
    marketData : {data : []},
    currentSelectedGame : {},
    network : true,
    sportsSidebarData : {
        data : [],
        totalOdds : 0,
        totalMoney : 0,
        totalStack : 0
    },
    betId : Date.now().toString().slice(Date.now().toString().length - 6, Date.now().toString().length),
    current_bet_type : sportConfig.SINGLE,
    all_sports_list : [],
    bet_history_list : [],
    recoveyrEventStaus: true,
    featuredData: {data: []},
    currentCountry: "",
    firstPageSportsData:[],
    betslipLoading: false
}

const player = (state = initialState, action) => {
    switch (action.type) {
        case SPORTS_LIST :
            let count = 0;
            for(let i = 0 ; i < action.data.data.length ; i ++) {
                count += action.data.data[i].count
            }

            const featuredEventItem = {
                sport_id: 0,
                sport_name: "Featured",
                color: "rgb(10, 183, 88)",
                icon: "M1.705 6.337l2.839 2.767a.542.542 0 01.155.48l-.67 3.906 3.508-1.845a.542.542 0 01.505 0l3.508 1.845-.67-3.907a.542.542 0 01.155-.479l2.839-2.767-3.923-.57a.54.54 0 01-.407-.296L7.79 1.917 6.035 5.47a.54.54 0 01-.408.296l-3.922.57zm10.564 8.684a.545.545 0 01-.252-.062L7.79 12.736 3.562 14.96a.543.543 0 01-.786-.57l.808-4.708-3.42-3.334a.54.54 0 01.3-.924l4.726-.687L7.304.453a.542.542 0 01.971 0l2.114 4.283 4.726.687a.54.54 0 01.3.924l-3.42 3.334.807 4.707a.541.541 0 01-.533.633z",
                viewBox: "0 0 16 16",
                count
            }
            const allItem = {
                sport_id: 0,
                sport_name: "All Sports",
                color: "rgb(255, 255, 255)",
                icon: "M15.1 8.5h.1v-1h-4v1h2.5l-2.6 3.1v1h4.1v-1h-2.7zM8 7.5H6.8l-2 5.2h1.1l.4-1.2h2l.4 1.2h1.2L8 7.5zm0 3H6.7l.6-1.7.7 1.7z M10.4.4C4.9.4.4 4.9.4 10.4s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 18.6c-4.8 0-8.7-3.9-8.7-8.7s3.9-8.7 8.7-8.7 8.6 4 8.6 8.8-3.9 8.6-8.6 8.6z",
                viewBox: "0 0 20 20",
                count
            }
            if (action.flag === 1) {
                const newSportHeaderData = {
                    data: [...[featuredEventItem], ...action.data.data]
                }
                return { ...state, sports_list : newSportHeaderData }
            } else if (action.flag === 2) {
                const newSportHeaderData = {
                    data: [...[allItem], ...action.data.data]
                }
                return { ...state, sports_list : newSportHeaderData, current_selected_sport: allItem }
            } else {
                const newSportHeaderData = {
                    data: [...[featuredEventItem], ...action.data.data]
                }
                return { ...state, sports_list : newSportHeaderData, current_selected_sport: featuredEventItem }
            }
        case CURRENT_SELECT_SPORT :
            return { ...state, current_selected_sport : action.data }
        case CURRENT_TAP_CHANGE :
            return { ...state, current_tap : action.data }
        case SET_ALL_MATCHS :
            return { ...state, all_matchs : action.data }
        case SEASON_TAB_CHANGE : 
            return {...state, seasonData : action.data }
        case MARKET_TAB_CHANGE : 
            return {...state, marketData : action.data }
        case ALL_SPORT_LIST : 
            return { ...state, all_sports_list : action.data }
        case CURRENTSELECTEGAME :
            return { ...state, currentSelectedGame : action.data}
        case SPORTS_SIDEBAR_SET_ITEM :
            return { ...state, sportsSidebarData : action.data }
        case CURRENT_BET_TYPE : 
            return { ...state, current_bet_type : action.data }
        case REFRESH_BET_ID : 
            return { ...state, betId : action.data }
        case SPORTSBOOK_BET_HISTORY : 
            return {...state, bet_history_list : action.data}
        case RECOVERYEVENTUPDATE : 
            return {...state, recoveyrEventStaus : action.data}
        case FEATURED_EVENT_DATA: 
            return {...state, featuredData : action.data}
        case CHANGE_CURRENT_COUNTRY: 
            return { ...state, currentCountry: action.data }
        case FIRSTPAGE_SPORTS: 
            return { ...state, firstPageSportsData: action.data }
        case SET_BETSLIP_LOADING: 
            return { ...state, betslipLoading: action.data }
        default:
            return state
    }
  }
  
export default player
  
