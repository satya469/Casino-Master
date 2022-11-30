import { AXIOS_REQUEST } from "../auth/index"
import { toast } from "react-toastify"

export const get_documnets = () => {
    return async (dispatch) => {
        const rdata = await AXIOS_REQUEST("profile/get_document", {}, dispatch)
        if (rdata.status) {
            dispatch({ type: "DOCUMENT_DATA", payload: rdata.data })
        } else {
            toast.error(rdata.data)
        }
    }
}


export const save_documents = (formdata) => {
    return async (dispatch) => {
        const rdata = await AXIOS_REQUEST("profile/set_document", formdata, dispatch, true)
        if (rdata.status) {
            dispatch({ type: "DOCUMENT_DATA", payload: rdata.data })
        } else {
            toast.error(rdata.data)
        }
    }
}

export const set_depositlimit = (data) => {
    return dispath => {
        AXIOS_REQUEST("profile/get_depositlimit", { data }, (rdata) => {
            if (rdata.status) {
                return dispath({
                    type: "DEPOSIT_LIMIT",
                    payload: rdata.data
                })
            } else {
                toast.error("fail")
            }
        })
    }
}

export const get_depositlimit = (data) => {
    return dispath => {
        AXIOS_REQUEST("profile/get_depositlimit", { data }, (rdata) => {
            if (rdata.status) {
                return dispath({
                    type: "DEPOSIT_LIMIT",
                    payload: rdata.data
                })
            } else {
                toast.error("fail")
            }
        })
    }
}

export const set_notification = (data) => {
    return async (dispath) => {
        const rdata = await AXIOS_REQUEST("profile/set_notification", { data })
        if (rdata.status) {
            toast.success("success")
            return dispath({
                type: "NOTIFICATION",
                payload: rdata.data
            })
        } else {
            toast.error("fail")
        }
    }
}

export const get_notification = () => {
    return async (dispath) => {
        const rdata = await AXIOS_REQUEST("profile/get_notification", {})
        if (rdata.status) {
            return dispath({
                type: "NOTIFICATION",
                payload: rdata.data
            })
        } else {
            // toast.error("Please set notification");
        }
    }
}


export const AccountStatement = (date, params) => {
    return async (dispatch) => {

        var row = Object.assign({},date,)
        console.log(row)
        row.start = new Date(row.start).toDateString()
        row.end = new Date(row.end).toDateString()

        const rdata = await AXIOS_REQUEST("players/playerget_accountstatement", { row,params})
        if (rdata.status) {
            const data = rdata.data
            const totalPages = rdata.pageset["totalPages"]
            const pages = rdata.pageset
            const totalRecords = rdata.pageset["totalRecords"]
            dispatch({
                type: "PROFILEINFOR_ACCOUNTSTATEMENT_LOAD",
                data,
                totalPages,
                params: pages,
                totalRecords
            })
        } else {
        }
    }
}


export const reports_email_load = (row, params) => {
    return async (dispatch) => {
        row['start'] = new Date(row.start).toDateString()
        row['end'] = new Date(row.end).toDateString()
        const rdata = await AXIOS_REQUEST("reports/adminreports_email_load", { params, row, player: true })
        if (rdata.status) {
            const data = rdata.data
            const totalPages = rdata.pageset["totalPages"]
            const pages = rdata.pageset
            const totalRecords = rdata.pageset["totalRecords"]
            dispatch({
                type: "REPORT_GET_DATA",
                data,
                totalPages,
                params: pages,
                totalRecords
            })
        } else {
            // toast.error('No Record');   
        }
    }
}

export const bethistoryFromEmailTotal = (row, params) => {
    return async (dispatch) => {
        const rdata = await AXIOS_REQUEST("reports/adminBetsHitoryTotalFromEmail", { row, params, player: true })
        if (rdata.status) {
            dispatch({ type: "REPORT_TOTAL_DATA", data: rdata.data })
        } else {
        }
    }
}