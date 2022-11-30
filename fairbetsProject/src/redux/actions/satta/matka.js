import { AXIOS_REQUEST } from "../auth/index"
import { toast } from "react-toastify"
// import {history} from "../../../history"

export const get_bazaarsitems = () => {
    return async (dispatch) => {
        const rdata = await AXIOS_REQUEST("satta/load_bazaars", {}, dispatch, true)
        if (rdata.status) {
            dispatch({ type: "SATTA_BAZAARS_ITEMS", data: rdata.data  })
        } else {
            // toast.error(rdata.data);   
        }
    }
}

export const update_satta = (data) => {
    return async dispatch => {
        window.sessionStorage.setItem("sattadata", JSON.stringify(data))
        const row = Object.assign({}, data)
        dispatch({type : "SATTA_BETS_DATA", data : row})
    }
}

export const bettingDateChange = (date) => {
    return async dispatch => {
        dispatch({type : "SATTA_BETTINGDATE", data : date})       
        const rdata = await AXIOS_REQUEST("satta/load_bazaars", {date}, dispatch, true)
        if (rdata) {
            dispatch({ type: "SATTA_BAZAARS_ITEMS", data: rdata.data})
            if (date) {
            }
        } else {

        }
    }    
}

export const FindBetting = (bazaritem, timerflag) => {
    return async (dispatch, getState) => {
        let rdata = await AXIOS_REQUEST("satta/findbazaars", {bazaritem, timerflag}, dispatch, true)
        if (rdata) {
            const bazaarsdata = JSON.parse( JSON.stringify(getState().satta.bazaarsdata))
            let d =  bazaarsdata.findIndex(obj=> obj._id === bazaritem._id)
            bazaarsdata[d] = rdata.bazaritemdata 

            dispatch({ type: "SATTA_bazaarsdata", data: bazaarsdata})
            return rdata.bazaritemdata
           
        } else {
            return false
        }
    }
}

export const event_update = (flag) => {
    return async dispatch => {
        dispatch({type : "SATTA_EVENT_FLAG", data :flag})
    }
}

export const satta_bet_save = (data, betid) => {
    return async (dispatch, getState) => {
        const bettingdate = getState().satta.bettingdate
        const rdata = await AXIOS_REQUEST("satta/save_bet_bazaars", {data, transactionid : betid, bettingdate}, dispatch, true)
        if (rdata.status) {
            window.sessionStorage.removeItem("sattadata")
            toast.success(rdata.data)
            // history.push("/Mybets/satta")
            dispatch({type : "SATTA_BETS_ID_FORMAT", data : {}})
            dispatch({type : "SATTA_BETS_DATA", data : {}})
        } else {
            toast.error(rdata.data)   
        }
    }
}

export const betslipOpen = (flag) => {
    return async dispatch => {
        dispatch({type : "SATTA_BETSLIP_FLAG", data :flag})
    }
}

export const reports_email_load = (datas, type, params) => {
    return  async(dispatch) => {
        datas['start'] = new Date(datas.start).toDateString()
        datas['end'] = new Date(datas.end).toDateString()
        const rdata = await AXIOS_REQUEST("satta/bethistory_email_load", {params, row : datas, type }, dispatch, true)
        if (rdata.status) {

            const data = rdata.data
            const totalPages = rdata.pageset["totalPages"]
            const pages = rdata.pageset
            const totalRecords = rdata.pageset["totalRecords"]
            dispatch({
                type: "SATTA_GET_DATA",
                data,
                totalPages,
                params : pages,
                totalRecords
            })
        } else {
            // toast.error('No Record');   
        }
    }
}

// export const SattaBetCancel =(datas,type, params,deleterow) => {
//     return  async(dispatch) => {
//         datas['start'] = new Date(datas.start).toDateString()
//         datas['end'] = new Date(datas.end).toDateString()
//         var rdata = await AXIOS_REQUEST("satta/sattabettingCancel",{params, row : datas,type ,deleterow : deleterow},dispatch, true)
//         if(rdata.status){
//             var data = rdata.data;
//             var totalPages = rdata.pageset["totalPages"];
//             var pages = rdata.pageset;
//             var totalRecords = rdata.pageset["totalRecords"]
//             dispatch({
//                 type: "SATTA_GET_DATA",
//                 data: data,
//                 totalPages:totalPages,
//                 params : pages,
//                 totalRecords : totalRecords,
//             });
//         }else{
//             // toast.error('No Record');   
//         }
//     }
// }

export const bethistoryFromEmailTotal = (datas) => {
    return  async(dispatch) => {
        const rdata = await AXIOS_REQUEST("satta/bethistory_email_load", datas, dispatch)
        if (rdata.status) {
           
        } else {
            // toast.error('No Record');   
        }
    }
}


export const RefreshResult = async (data) => {
    const rdata = await AXIOS_REQUEST("satta/RefreshResult", {data})
    if (rdata.status) {
        
    } else {
        return false
    }
    
}

export const firstpageBazars = async () => {
    const rdata = await AXIOS_REQUEST("satta/firstpageBazars", {})
    if (rdata.status) {
        return rdata.data
    } else {
        return []
    }
}
