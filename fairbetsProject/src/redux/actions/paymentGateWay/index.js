import {AXIOS_REQUEST} from "../auth/index"
import { toast } from "react-toastify"
import {history} from "../../../history"
import queryString from "query-string"
import Confirm from "reactstrap-confirm"

export const PaymentMenuload = (params) => {
    return  async (dispatch) => {
        dispatch({ type: "PAYMENTMENU_DATA", data:[] })
        const res = await AXIOS_REQUEST("paymentGateWay/menuloads", params, dispatch, true)
        if (res.status) {
            dispatch({ type: "PAYMENTMENU_DATA", data: res.data })
        } else {
            dispatch({ type: "PAYMENTMENU_DATARESSTRIC", data: res.data })
        }
    }
}

export const WithdrawalCancel = (date, params, rowdata) => {
    return async (dispatch) => {
        date['start'] = new Date(date.start).toDateString()
        date['end'] = new Date(date.end).toDateString()
        const dd = await Confirm()
        if (dd) {
            const rdata = await AXIOS_REQUEST("paymentGateWay/withdrawalCancel", {params, row : date, data : rowdata}, dispatch)
            if (rdata.status) {
                
                const data = rdata.data
                const totalPages = rdata.pageset["totalPages"]
                const pages = rdata.pageset
                const totalRecords = rdata.pageset["totalRecords"]
                dispatch({
                    type: "WITHDRAW_HISTORY__GET_DATA",
                    data,
                    totalPages,
                    params : pages,
                    totalRecords
                })
            } else {
                toast.error(rdata.data)   
            } 

        }
    }
}


export const deposittransactionHistoryLoad = (dates, params) => {
    return  async(dispatch) => {
        dates['start'] = new Date(dates.start).toDateString()
        dates['end'] = new Date(dates.end).toDateString()
        const rdata = await AXIOS_REQUEST("paymentGateWay/deposittransactionHistoryLoad", {params, row : dates}, dispatch)
        if (rdata.status) {
            const data = rdata.data
            const totalPages = rdata.pageset["totalPages"]
            const pages = rdata.pageset
            const totalRecords = rdata.pageset["totalRecords"]
            dispatch({
                type: "TRANSACTION_HISTORY__GET_DATA",
                data,
                totalPages,
                params : pages,
                totalRecords
            })
        } else {
            // toast.error(res.data);   
        }
    }
}

  
export const WithdrawHistoryLoad = (date, params) => {
    return  async(dispatch) => {
        date['start'] = new Date(date.start).toDateString()
        date['end'] = new Date(date.end).toDateString()
        const rdata = await AXIOS_REQUEST("paymentGateWay/WithdrawHistoryLoad", {params, row : date}, dispatch)
        if (rdata.status) {
            
            const data = rdata.data
            const totalPages = rdata.pageset["totalPages"]
            const pages = rdata.pageset
            const totalRecords = rdata.pageset["totalRecords"]
            dispatch({
                type: "WITHDRAW_HISTORY__GET_DATA",
                data,
                totalPages,
                params : pages,
                totalRecords
            })
        } else {
            // toast.error(res.data);   
        }
        
    }
}

export const Cash_payout = (pdata, payoutdetail, paymentmenuid) => {
    return async (dispatch) => {
        const start =   new Date().toDateString()
        const end =  new Date(new Date().valueOf() + 60 * 60 * 24 * 1000).toDateString()
        const params = queryString.parse(history.location.search)

        const rdata = await AXIOS_REQUEST("paymentGateWay/cashpayout", {data : pdata, params, row : {start, end}, payoutdetail, paymentmenuid}, dispatch, true)
        if (rdata.status) {
            toast.success("succesfully")
            const data = rdata.data
            const totalPages = rdata.pageset["totalPages"]
            const pages = rdata.pageset
            const totalRecords = rdata.pageset["totalRecords"]
            dispatch({
                type: "WITHDRAW_HISTORY__GET_DATA",
                data,
                totalPages,
                params : pages,
                totalRecords
            })
            // window.location.reload()
        } else {
            toast.warn(rdata.data)
        }
    }
}

export const paymoroNetbanking = (params) => {
    return async dispatch => {
        const res = await AXIOS_REQUEST("paymentGateWay/paymoroNetBanking", {params}, dispatch, true)
        if (res.status) {
            window.location.assign(res.data)
        } else {
            toast.error(res.data)   
        }
    }
}

export const paymoroWallet = (params) => {
    return async dispatch => {
        const res = await AXIOS_REQUEST("paymentGateWay/paymoroWallet", {params}, dispatch, true)
        if (res.status) {
            window.location.assign(res.data)
        } else {
            toast.error(res.data)   
        }
    }
}

export const rushpayment = (params) => {
    return async dispatch => {
        const res = await AXIOS_REQUEST("paymentGateWay/rushpaymentCheckout", {params}, dispatch, true)
        if (res.status) {
            window.location.assign(res.data)
        } else {
            toast.error(res.data)   
        }
    }
}

export const paygeIncardpayment = (params) => {
    return async dispatch => {
        const res = await AXIOS_REQUEST("paymentGateWay/paygcardpaymentCheckout", {params}, dispatch, true)
        if (res.status) {
            window.location.assign(res.data)
        } else {
            toast.error(res.data)   
        }
    }
}


export const paymoroUpi = (params) => {
    return async dispatch => {
        const res = await AXIOS_REQUEST("paymentGateWay/paymoroUpi", {params}, dispatch, true)
        if (res.status) {
            window.location.assign(res.data)
        } else {
            toast.error(res.data)   
        }
    }
}


export const YaarPayCheckOut = params => {
    return  async(dispatch) => {
        const res = await AXIOS_REQUEST("paymentGateWay/YaarPayCheckOut", {params}, dispatch, true)
        if (res.status) {
            window.location.assign(res.data)
        } else {
            toast.error(res.data)   
        }
    }
}

export const stripeCheckOut = params => {
    return  async(dispatch) => {
        const res = await AXIOS_REQUEST("paymentGateWay/stripeCheckOut", params, dispatch, true)
        if (res.status) {
            window.location.assign(res.data.paymenturl)
        } else {
            toast.error(res.data)   
        }
    }
}
