import sportsConfig from "../../../configs/sportsconfig"

const initialState = {
    betSlipData : {

        // data : [],
        // totalOdds : 0,
        // totalMoney : 0,
        // totalStack : 0
    },
    exchg_header_data : [],
    current_header_sport : {},
    dataList : [],
    current_tap : sportsConfig.tab[0],
    currentMarketData : [],
    activeGroups : [],
    activeitem : null,
    activeHeader : null
}

const exchg = (state = initialState, action) => {
    switch (action.type) {
        case "EXCHG_FULL_HEADER_DATA" :
            return { ...state, exchg_header_data : action.data, activeHeader : action.active }

        case "SETACTIVEITEM" :
            return {...state, activeitem : action.activeitem}

        case "SETACTIVEGROUPS" :
            return {...state, activeGroups  :action.activeGroups, activeitem : action.activeitem}
        case "SETGROUP" :

            return {...state, activeGroups  :action.activeGroups}
    
        case "EXCHG_Header_update" :
            // return;
            return { ...state, exchg_header_data : action.data }


        // case "SELECT_CURRENT_TYPE_EXCHG" : 
        //     return { ...state , current_header_sport : action.data }           


        // case "UPDATE_CURRENT_TYPE_EXCHG" : 
        //     let currentitem = state.current_header_sport;
        //     let row = action.data;
            
        //     if (Object.keys(row).length) {
        //         if (row.Id === currentitem.Id) {
        //             return Object.assign(state,{dataList : action.data.Category});
        //         } else {
        //             return { ...state }
        //         }
        //     } else {
        //         return { ...state }
        //     }

        case "EXCHG_LIST_DATA" : 
            return { ...state, dataList : action.data }
            
        case "EXCHG_CURRENT_TAP" : 
            return { ...state, dataTabList : action.data }            
        case "CURRENT_MATCH_MARKET" : 
            return {...state, currentMarketData : action.data}
        case "SET_EXCHG_BETSLIP" : 

            // return Object.assign(state,{betSlipData : action.data});
            return {...state, betSlipData : action.data}


        // case "EXCHG_ALLMARKETDATA" : 
        //     return {...state , betSlipData : action.data}
        default:
            return state
    }
}
  
export default exchg
  
