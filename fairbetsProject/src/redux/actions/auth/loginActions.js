import { AXIOS_REQUEST, setSession, alert, getURL } from "./index"
import { toast } from "react-toastify"
import { history } from "../../../history"
import { FIRSTPAGESLIDER, FIRSTPAGEDATA, FIRSTPAGEGAMELIST } from "../../types"


export const getThem = () => {
  return async (dispatch) => {
    const rdata = await AXIOS_REQUEST("users/playerThemeGet")
    if (rdata.status) {
      dispatch({ type: "PLAYERTHEMSET", theme: rdata.data })
    }
  }
}

export const themeinforsave = (data) => {
  return async (dispatch) => {
    const rdata = await AXIOS_REQUEST("users/save_themeinfor", { data })
    if (rdata.status) {
      dispatch({
        type: "THEMSET",
        theme: rdata.data
      })
    } else {
      toast.error("Fail")
    }
  }
}

export const firstpage_gamelist = () => {
  return async dispatch => {
    const rdata = await AXIOS_REQUEST("firstpage/firstpage_gamelist")
    if (rdata.status) {
      dispatch({ type: FIRSTPAGEGAMELIST, data: rdata.data })
    }
  }
}

export const first_slider_load = () => {
  return async dispatch => {
    const rdata = await AXIOS_REQUEST("firstpage/firstpage_slider", {}, dispatch)
    if (rdata.status) {
      dispatch({ type: FIRSTPAGESLIDER, data: rdata.data })
    }
  }
}

export const loginWithJWT = user => {
  return async (dispatch) => {
    const rdata = await AXIOS_REQUEST("users/login", { username: user.username, password: user.password }, dispatch, true)
    if (rdata.status) {
      const token = rdata.data
      setSession(token)
      window.location.reload()
    } else {
      alert(rdata.error, "error")
    }
  }
}

export const logoutWithJWT = () => {
  return async dispatch => {
    await AXIOS_REQUEST("users/logout", {}, dispatch)
    // fake_session();
  }
}

export const setloginpage = (data) => {
  return dispatch => {
    dispatch({
      type: "SETLOGINPAGE",
      payload: data
    })
  }
}

export const load_fp_data = () => {
  return async (dispatch) => {
    const rdata = await AXIOS_REQUEST("firstpage/load_data", {}, dispatch)
    if (rdata.status) {
      return dispatch({
        type: FIRSTPAGEDATA,
        data: rdata.data
      })
    }
  }
}

export const playsaccount = (gamedata, limits) => {
  return async (dispatch) => {
    const rdata = await AXIOS_REQUEST("players/gameaccount", { game: gamedata, width: window.innerWidth, limits }, dispatch, true)
    if (rdata.status) {
      const token = rdata.data.token
      const url = rdata.data.url
      if (window.innerWidth <= 767 || gamedata.PROVIDERID === "awc") {
        window.location.assign(url)
      } else {
        dispatch({
          type: "GAME_PLAYER",
          gamedata,
          gameurl: url,
          Ratio: 16 / 11,
          state: true,
          token,
          mode: "real"
        })
      }
    } else {
      if (rdata.bool === 1) {
        toast.warn(rdata.data)
        history.push("/mywallet/deposit")
      } else {
        toast.error(rdata.data)
      }
    }
  }
}

export const playsaccountguest = (gamedata) => {
  return async dispatch => {
    const rdata = await AXIOS_REQUEST("players/guestgameaccount", { game: gamedata, width: window.innerWidth }, dispatch, true)
    if (rdata.status) {
      const url = rdata.data
      if (window.innerWidth <= 767) {
        window.location.assign(url)
      } else {
        dispatch({
          type: "GAME_PLAYER",
          gamedata,
          gameurl: url,
          Ratio: 16 / 11,
          state: true
        })
      }
    } else {
      toast.error(rdata.data)
    }
  }
}

export const registeraction = user => {
  return async (dispatch) => {
    const rdata = await AXIOS_REQUEST('users/register', { user }, dispatch, true)

    if (rdata.status) {
      toast.success("success")
      // setSession(rdata.token);
      // window.location.reload();
      dispatch({
        type: "SETLOGINPAGE",
        payload: { login: true, register: false, forgot: false }
      })
    } else {
      toast.error(rdata.data)
    }
  }
}

export const forgotpassword_send = data => {
  return async (dispatch) => {
    const rdata = await AXIOS_REQUEST('users/forgotpassword_send', { email: data.email })
    if (rdata.status) {
      toast.success("success")
      dispatch({
        type: "SETLOGINPAGE",
        payload: { forgot: false }
      })
    } else {
      toast.error("server error")
    }
  }
}

export const forgotpassword_receive = async data => {
  const rdata = await AXIOS_REQUEST('users/forgotpassword_receive', { data })
  if (rdata.status) {
    return rdata.data
  } else {
    return false
  }
}

export const resend_email = data => {
  return async dispatch => {
    const rdata = await AXIOS_REQUEST("users/resend_email", { email: data })
    if (rdata.status) {
      toast.success("success")
      history.push(getURL())
    } else {

    }
  }
}

export const forgotpassword_set = data => {
  return async dispatch => {
    const rdata = await AXIOS_REQUEST("users/forgotpassword_set", { data })
    if (rdata.status) {
      toast.success("success")
      // setSession(rdata.token);
      window.location.assign("/")
    } else {
      toast.error("server error")
    }
  }
}