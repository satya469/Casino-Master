import { AXIOS_REQUEST } from "../auth/index"
import { toast } from "react-toastify"
import { CASINO_PROVIDER, CASINO_TYPES, CASINO_GET_ALL_DATA, CASINO_GET_DATA, CASINO_FILTER_DATA, CASINO_TYPE, CASINO_SETPROVIDER, CASINO_DATA_FORMAT } from "../../types"

export const data_load = (bool, imgtype, actiontype,params) => {
    return async (dispatch, getState) => {
        dispatch({ type: CASINO_DATA_FORMAT, bool })
        const select_p = getState().casinolist.setprovider
        const rdata = await AXIOS_REQUEST("firstpage/LivecasinoproviderLoad", { bool, type: imgtype, selectprovider: select_p,params }, dispatch, true)
        if (rdata.status) {
            const pdata = rdata.data.pdata
            const tdata = rdata.data.tdata
            const gamelist = rdata.data.list
            const index = rdata.data.index
            let filteredData = []
            const value = getState().casinolist.settype.value
            if (value !== "All") {
                filteredData = Filter(value, gamelist)
            } else {
                filteredData = gamelist
            }
            dispatch({ type: CASINO_GET_ALL_DATA, data: gamelist, index, filteredData })
            dispatch({ type: actiontype, data: rdata.data.imgs })
            const provideroptions = []
            const typeoptions = [{ label: "ALL", value: "All" }]
            if (provideroptions) {
                for (let i = 0; i < pdata.length; i++) {
                    provideroptions.push({ label: pdata[i].provider.toLocaleUpperCase(), value: pdata[i].provider })
                }
                dispatch({
                    type: CASINO_PROVIDER,
                    data: provideroptions
                })
            }
            if (tdata) {
                for (let j = 0; j < tdata.length; j++) {
                    typeoptions.push({ label: tdata[j], value: tdata[j] })
                }
                dispatch({
                    type: CASINO_TYPES,
                    data: typeoptions
                })
            }
        } else {
            // toast.error("")
        }
    }
}

export const providerchange = (value, bool, params) => {
    return async (dispatch, getState) => {
        const returndata = await AXIOS_REQUEST("firstpage/LivecasinoProviderChange", { data: value, bool ,params}, dispatch, true)
        if (returndata.status) {
            const gamelist = returndata.data
            if (value.length > 0) {
                window.sessionStorage.setItem(`setprovider${bool}`, JSON.stringify(value))
            }
            dispatch({
                type: CASINO_SETPROVIDER, setprovider: value
            })
            dispatch({ type: CASINO_GET_ALL_DATA, data: gamelist, filteredData: gamelist })
        } else {
            toast.error("server error")
        }
    }
}

export const gametypechange = (value, bool) => {
    return async (dispatch, getState) => {
        window.sessionStorage.setItem(`settype${bool}`, JSON.stringify({ label: value, value }))
        dispatch({
            type: CASINO_TYPE, data: { label: value, value }
        })
        const allData = getState().casinolist.allData
        const filteredData = Filter(value, allData)
        dispatch({
            type: CASINO_GET_DATA,
            data: filteredData
        })
    }
}

export const get_scrollevent_load = (provider, lastdata,params) => {
    return async (dispatch, getState) => {
        if (provider) {
            const rdata = await AXIOS_REQUEST("firstpage/scroll_load", { data: provider.value,params }, dispatch, true)
            if (rdata.status) {
                const rows = lastdata
                for (const i in rdata.data) {
                    rows.push(rdata.data[i])
                }
                let filteredData = []
                const value = getState().casinolist.settype.value
                if (value !== "All") {
                    filteredData = Filter(value, rows)
                } else {
                    filteredData = rows
                }

                dispatch({ type: CASINO_GET_ALL_DATA, data: rows, filteredData })
            } else {
                return false
            }
        } else {
            return false
        }
    }
}


export const filterData = value => {
    return dispatch => dispatch({ type: CASINO_FILTER_DATA, value })
}

function Filter(value, data) {
    let filteredData = []
    if (value === "All") {
        filteredData = data
        return filteredData
    } else {
        filteredData = data
            .filter(item => {
                const startsWithCondition = !item.TYPE ? null : item.TYPE.toLowerCase().startsWith(value.toLowerCase())
                const includesCondition = !item.TYPE ? null : item.TYPE.toLowerCase().startsWith(value.toLowerCase())
                if (startsWithCondition) {
                    return startsWithCondition
                } else if (!startsWithCondition && includesCondition) {
                    return includesCondition
                } else return null
            })
        return filteredData
    }
}