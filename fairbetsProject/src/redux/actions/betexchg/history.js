import { toast } from "react-toastify"
import { AXIOS_REQUEST } from "../auth"

export const getBetHistory = (condition, parseFilter) => {
    return async (dispatch) => {
        let rdata = await AXIOS_REQUEST("betfair/getExchangeBetHistory", { ...condition, ...{parseFilter} }, dispatch, true)
        if(rdata.status) {
            dispatch({
                type: "bet_exchange_history",
                data: rdata.data
            })
        }
    }
}

export const cancelBet = ( row, condition, parseFilter) => {
    return async (dispatch) => {
        let rdata = await AXIOS_REQUEST("betfair/cancelExchangeBet", { ...{row}, ...condition, ...{parseFilter} }, dispatch, true)
        if(rdata.status) {
            toast.success("Success")
            dispatch({
                type: "bet_exchange_history",
                data: rdata.data
            })
        } else {
            toast.error(rdata.data)
        }
    }
}
