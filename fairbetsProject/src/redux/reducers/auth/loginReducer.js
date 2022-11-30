
const initdata = {
  userRole: "admin",
  setloginmodal: false,
  isModaldata: {
    bool: false,
    url: ''
  },
  values: null,
  islogin: false,
  exposure: 0,
  currencyCode: "INR",
  currencyLabel: "₹",
  chats: null,
  sidebar: null,
  setloginpage: {
    login: false
  }
}

export const login = (state = initdata, action) => {
  switch (action.type) {

    case "SetUserProfileSetting":
      const d = action.data
      return {
        ...state,
        currencyCode: d.currency ? d.currency.code : "INR",
        currencyLabel: d.currency ? d.currency.label : "₹",
        exposure: d.exposure,
        sidebar: d.sidebar
      }

    case "LOGIN_WITH_JWT": {
      return { ...state, islogin: true }
    }

    // case 'SETEXPOSURE': {
    //   return {
    //     ...state, exposure: action.data
    //   }
    // }

    case 'LIVECHATRENDER': {
      return {
        ...state, chats: action.data
      }
    }

    case 'CURRENCYSETTING': {
      return {
        ...state, currencyCode: action.data.code, currencyLabel: action.data.label
      }
    }

    case "LOGOUT_WITH_JWT": {
      return { ...state, values: null, session: null }
    }
    case "SETLOGINPAGE": {
      return { ...state, setloginpage: action.payload }
    }

    case "PROFILE_USER": {
      return { ...state, profile_user: action.data, values: action.data }
    }

    case "PAYDEPOSIT": {
      return { ...state, isModaldata: action.data }
    }
    case "FORGOTPASSWORD": {
      return { ...state, forgotpasswordemail: action.data }
    }

    case "SIGNUP_WITH_EMAIL": {
      return { ...state, values: action.payload }
    }
    case "SIGNUP_WITH_JWT":
      return {
        ...state,
        values: action.payload
      }
    default: {
      return state
    }
  }
}
