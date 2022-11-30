
const initialState = {
    activeSport: {},
    activeodds: {},
    lastactiveodds: {},
    activematche: {},
    matchelist: [],
    allmatchelist: [],
    Sportlist: [],
    odditem: null,
    Inplay: {
        eventType: "000",
        name: "Inplay",
        icon: "",
        image: "",
        minmaxvalue: {
            maxvalue: 10000,
            minvalue: 100
        }
    },
    betsdata: {},
    profitlossObj: {},
    openbets: [],
    betslip: true,
    historyData: {
        data: [],
        params: null,
        totalPages: 0,
        totalRecords: 0,
        sortIndex: [0, 0]
    }
}

const betexch = (state = initialState, action) => {
    switch (action.type) {
        case "setactiveSport":
            return { ...state, activeSport: action.data }
        case "setBetslip":
            return { ...state, betslip: action.data }
        case "setprofitlossObj":
            return { ...state, profitlossObj: action.data }
        case "setbetsdata":
            return { ...state, betsdata: action.data }
        case "setmatchelist":
            return { ...state, matchelist: action.data }
        case "allmatchelist":
            return { ...state, allmatchelist: action.data }
        case "setSportslist":
            return { ...state, Sportlist: action.data }
        case "setodds":
            return { ...state, lastactiveodds: state.activeodds, activeodds: action.data, }
        case "setmatches":
            return { ...state, activematche: action.data }
        case "setopenbets":
            return { ...state, openbets: action.data }
        case "setOdditem":
            return { ...state, odditem: action.data }
        case "bet_exchange_history":
            return {
                ...state,
                historyData: {
                    data: action.data.list,
                    totalPages: action.data.pages.totalPages,
                    params: action.data.pages.params,
                    totalRecords: action.data.pages.totalRecords,
                    sortIndex: [action.data.pages.skip1, action.data.pages.skip2]
                }
            }
        default:
            return state
    }
}

export default betexch
