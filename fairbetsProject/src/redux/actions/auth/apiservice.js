import { Root } from "../../../authServices/rootconfig"
import { AXIOS_REQUEST, fake_session, getURL } from "./index"
import io from 'socket.io-client'
import { setodds } from "../betexchg"
import sportsconfig from "../../../configs/sportsconfig"

export const GetUserAuth = async (params) => {
    const d = await AXIOS_REQUEST("users/get_user_auth", params)
    return d
}

export const LoginById = async (params) => {
    const rdata = await AXIOS_REQUEST("users/LoginbyId", params)
    return rdata
}

export const LoginByEmail = async (params) => {
    const rdata = await AXIOS_REQUEST("users/login", params)
    return rdata
}

export const GetUseProfileLod = async (params) => {
    const rdata = await AXIOS_REQUEST("users/GetUserProfileLoad", params)
    return rdata
}

export const SetUserProfileSetting = (params) => {
    return dispatch => {
        if (params.themedata) {
            dispatch({ type: "THEMSET", theme: params.themedata })
        }
        dispatch({ type: "SetUserProfileSetting", data: params })
    }
}

export const GetExposure = async (params) => {
    const r = await AXIOS_REQUEST("users/GetExposureList", params)
    return r
}

export const GetExposureTotal = async (params) => {
    const r = await AXIOS_REQUEST("users/GetExposureTotal", params)
    return r
}

export const SocketConnect = (uniqueid, data, userdata, istelegram) => {
    return (dispatch, getState) => {
        if (data) {
            if (Root.socket) {
                Root.socket.off("destory");
                Root.socket.off("balance");
                Root.socket.off("datetime");
                Root.socket.off("expiredestory");
                Root.socket.off("betexchangeRealtimeodds");
                Root.socket.off(sportsconfig.ODDSCHANGE);
                Root.socket.off(sportsconfig.BETSTOP);
                Root.socket.off(sportsconfig.RecoveryEvent);
                Root.socket.off(sportsconfig.mtsStatus);
                Root.socket.disconnect();
            }
            Root.socket = io(Root.admindomain, { query: { auth: data, uniqueid } })
            Root.sportSocket = io(Root.sporturl)
            Root.socket.on("destory", (dd) => {

                if (dd.data[userdata.email]) {
                    if (istelegram) {
                        fake_session()
                        window.location.assign("/mic/error")
                    } else {
                        fake_session()
                        window.location.assign(getURL())
                    }
                }
            })

            Root.socket.on("expiredestory", (data) => {
                if (data.data[userdata.email]) {
                    window.location.reload()
                }
            })

            Root.socket.on("balance", (barray) => {
                if (barray.data[userdata.email]) {
                    console.log("----balance--")
                    dispatch({ type: "GETBALANCE", data: barray.data[userdata.email] })
                }
            })
        } else {
            Root.socket = io(Root.admindomain,{query: {uniqueid}})
            Root.sportSocket = io(Root.sporturl)
        }

        Root.socket.on("datetime", (date) => {
            dispatch({ type: "SET_DATE", data: date })
        })

        Root.socket.on("betexchangeRealtimeodds", (data) => {
            const { activeodds } = getState().betexch
            let rows = Object.assign({}, activeodds, data.data)
            dispatch(setodds(rows))
        })
       
    }
}

export const feedoptions = async () => {
    const r = await AXIOS_REQUEST("feedback/getOptions", {})
    return r
}

export const feedSend = async (params) => {
    const r = await AXIOS_REQUEST("feedback/feedSend", params)
    return r
}

export const getFirstPageSet = async () => {
    const r = await AXIOS_REQUEST("firstpage/settingdata",)
    return r
}

export const betExchangefirstPage = async (params) => {
    const r = await AXIOS_REQUEST("betfair/betExchangefirstPage",params)
    return r
}

export const getTransactionId = async (params) => {
    const r = await AXIOS_REQUEST("paymentGateWay/paygcardpaymentGetTransactionStatus",params)
    return r
}
