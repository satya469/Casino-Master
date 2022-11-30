import { AXIOS_REQUEST } from "../auth/index"
import { toast } from "react-toastify"
import { history } from "../../../history"
import { Root } from "../../../authServices/rootconfig"
import sportsConfig from "../../../configs/sportsconfig"
import {
    SPORTS_LIST,
    SET_ALL_MATCHS,
    ALL_SPORT_LIST,
    CURRENT_SELECT_SPORT,
    CURRENT_TAP_CHANGE,
    SEASON_TAB_CHANGE,
    MARKET_TAB_CHANGE,
    CURRENTSELECTEGAME,
    SPORTS_SIDEBAR_SET_ITEM,
    CURRENT_BET_TYPE,
    REFRESH_BET_ID,
    SPORTSBOOK_BET_HISTORY,
    RECOVERYEVENTUPDATE,
    FEATURED_EVENT_DATA,
    CHANGE_CURRENT_COUNTRY,
    FIRSTPAGE_SPORTS,
    SET_BETSLIP_LOADING
} from "../../types"

export const getSportsListPlayer = (flag = 0, EventStatus) => {
    return async (dispatch) => {
        const rdata = await AXIOS_REQUEST("sport/getSportsListPlayer", { data: EventStatus })
        if (rdata.status) {
            dispatch({ type: SPORTS_LIST, data: { data: rdata.data }, flag })
        } else {
            toast.error("error")
        }
    }
}

export const getSportsMatchPlayer = (sendData) => {
    return async (dispatch, getIndex) => {
        const rdata = await AXIOS_REQUEST("sport/getSportsMatchPlayer", sendData, dispatch, true)
        if (rdata.status) {
            if (getIndex().sports.current_tap.index === 4) {
                const secondSearchData = getLenguesData(rdata.data)
                dispatch({ type: SET_ALL_MATCHS, data: Object.assign({}, { data: secondSearchData }) })
            } else {
                const secondSearchData = getSeasonData(rdata.data)
                dispatch({ type: SET_ALL_MATCHS, data: Object.assign({}, { data: secondSearchData }) })
            }
        } else {
            toast.error(rdata.data)
        };
    }
}

const getSeasonData = (allOddData) => {
    const secondSearchData = []
    for (let a = 0; a < allOddData.length; a++) {
        const temp = {}
        if (allOddData[a].Season) {
            const indexId = secondSearchData.findIndex(item => item.name === allOddData[a].Season.Name)
            if (indexId > -1) {
                secondSearchData[indexId].data.push(handleMarket(allOddData[a]))
            } else {
                temp.id = allOddData[a].Season.Id
                temp.name = allOddData[a].Season.Name
                temp.data = [handleMarket(allOddData[a])]
                if (secondSearchData.length < 2) {
                    temp.isOpen = true
                } else {
                    temp.isOpen = false
                }
                secondSearchData.push(temp)
            }
        } else {
            const otherIndex = secondSearchData.findIndex(item => item.name === sportsConfig.OTHER)
            if (otherIndex > -1) {
                secondSearchData[otherIndex].data.push(handleMarket(allOddData[a]))
            } else {
                temp.id = Date.now()
                temp.name = sportsConfig.OTHER
                temp.data = [handleMarket(allOddData[a])]
                if (secondSearchData.length < 2) {
                    temp.isOpen = true
                } else {
                    temp.isOpen = false
                }
                secondSearchData.push(temp)
            }
        }
    }
    secondSearchData.sort(function (A, B) {
        return A.name === sportsConfig.OTHER ? 1 : (A.name < B.name ? -1 : 1)
    })
    return secondSearchData
}

const getLenguesData = (allOddData) => {
    const secondSearchData = []
    for (let a = 0; a < allOddData.length; a++) {
        let temp = {}, flag = false
        for (let b = 0; b < secondSearchData.length; b++) {
            if (allOddData[a].Venue) {
                if (allOddData[a].Venue.country === secondSearchData[b].name) {
                    secondSearchData[b].data.push(handleMarket(allOddData[a]))
                    flag = true
                    break
                }
            } else {
                if (secondSearchData[b].name === sportsConfig.OTHER) {
                    secondSearchData[b].data.push(handleMarket(allOddData[a]))
                    flag = true
                    break
                }
            }
        }
        if (!flag) {
            if (allOddData[a].Venue) {
                temp.id = allOddData[a].Venue.id
                temp.name = allOddData[a].Venue.country
                temp.data = [handleMarket(allOddData[a])]
                secondSearchData.push(temp)
            } else {
                temp.id = Date.now()
                temp.name = sportsConfig.OTHER
                temp.data = [handleMarket(allOddData[a])]
                secondSearchData.push(temp)
            }
        }
    }
    secondSearchData.sort(function (a, b) {
        return a.name === sportsConfig.OTHER ? 1 : (a.name < b.name ? -1 : 1)
    })
    return secondSearchData
}

export const getAllSportsType = () => {
    return async (dispatch) => {
        const result = await AXIOS_REQUEST("sport/getAllSportsType", "", dispatch, true)
        if (result.status) {
            dispatch({ type: ALL_SPORT_LIST, data: result.data })
        } else {
            toast.error("Server connection is failed!")
        }
    }
}

export const current_select_sport = (data) => {
    return dispatch => dispatch({ type: CURRENT_SELECT_SPORT, data })
}

export const TapChange = (item) => {
    return dispatch => dispatch({ type: CURRENT_TAP_CHANGE, data: item })
}

export const remove_all_match = () => {
    return (dispatch) => {
        dispatch({ type: SET_ALL_MATCHS, data: { data: [] } })
        dispatch({ type: SEASON_TAB_CHANGE, data: { data: [] } })
        dispatch({ type: MARKET_TAB_CHANGE, data: { data: [] } })
        dispatch({ type: CURRENT_SELECT_SPORT, data: {} })
    }
}

export const seasonTabChange = (id) => {
    return async (dispatch, getState) => {
        const seasonData = getState().sports.seasonData.data
        const index = seasonData.findIndex(item => item.id === id)
        if (index > -1) {
            seasonData.splice(index, 1)
        } else {
            seasonData.push({ id })
        }
        dispatch({ type: SEASON_TAB_CHANGE, data: Object.assign({}, { data: seasonData }) })
    }
}

export const marketTabChange = (data) => {
    return async (dispatch, getState) => {
        const marketData = getState().sports.currentSelectedGame
        const index = marketData.market.findIndex(item => item.MarketId === data.MarketId && item.MarketName === data.MarketName && item.MarketSpecifiers === data.MarketSpecifiers)
        if (index > -1) {
            marketData.market[index].isopen = !marketData.market[index].isopen
        }
        dispatch({ type: CURRENTSELECTEGAME, data: Object.assign({}, marketData) })
    }
}

export const currentSelecteGame = (data) => {
    return async (dispatch) => {
        const result = await AXIOS_REQUEST("sport/getOneMatchPlayer", { event_id: data.event_id }, dispatch, true)
        if (result.status) {
            dispatch({ type: CURRENTSELECTEGAME, data: Object.assign({}, result.data) })
        } else {
            dispatch({ type: CURRENTSELECTEGAME, data: Object.assign({}, data, { isFinished: true }) })
        }
    }
}

export const setItem = (data) => {
    return async (dispatch, getState) => {
        const rdata = get(getState().sports.sportsSidebarData, data, getState().sports.current_bet_type)
        dispatch({ type: SPORTS_SIDEBAR_SET_ITEM, data: Object.assign({}, rdata) })
    }
}

export const removeItem = (data) => {
    return async (dispatch, getState) => {
        const rdata = remove(getState().sports.sportsSidebarData, data, getState().sports.current_bet_type)
        dispatch({ type: SPORTS_SIDEBAR_SET_ITEM, data: Object.assign({}, rdata) })
    }
}

export const removeAllItem = () => {
    return dispatch => dispatch({
        type: SPORTS_SIDEBAR_SET_ITEM,
        data: { data: [], totalMoney: 0, totalStack: 0, totalOdds: 0 }
    })
}

export const changeBetType = (data) => {
    return dispatch => dispatch({ type: CURRENT_BET_TYPE, data })
}

export const updateSportsSidebar = (data) => {
    return dispatch => dispatch({ type: SPORTS_SIDEBAR_SET_ITEM, data: Object.assign({}, data) })
}

export const placeBet = (sendData) => {
    return async (dispatch) => {
        const result = await AXIOS_REQUEST("sport/placeBetPlayer", sendData, dispatch, true)
        dispatch({ type: SET_BETSLIP_LOADING, data: true })
        if (result.status) {
            // dispatch(removeAllItem())
            // toast.success("Successfuly bet!")
            // const betId = Date.now().toString().slice(Date.now().toString().length - 6, Date.now().toString().length)
            // dispatch({type: REFRESH_BET_ID, data: betId})
        } else {
            dispatch({ type: SET_BETSLIP_LOADING, data: false })
            toast.error(result.message)
        }
    }
}

export const getSportsBetHistory = (data) => {
    return async (dispatch) => {
        const result = await AXIOS_REQUEST("sport/getSportsBetHistory", data, dispatch, true)
        if (result.status) {
            dispatch({ type: SPORTSBOOK_BET_HISTORY, data: result.data })
        } else {
            toast.error("please check your network connection")
        }
    }
}

export const countryChange = (country) => {
    return dispatch => dispatch({ type: CHANGE_CURRENT_COUNTRY, data: country })
}

export const cashOut = (data) => {
    return async (dispatch, getState) => {
        let result = await AXIOS_REQUEST("sport/cashout", data, dispatch, true);
        if (result.status) {
            // let betHistory = getState().sports.bet_history_list;
            // let realBetHistory = [];
            // for (let i = 0; i < betHistory.length; i++) {
            //     if (betHistory[i].betting.transactionId !== data.betting.transactionId) {
            //         realBetHistory.push(betHistory[i]);
            //     }
            // }
            // dispatch({ type: "BET_HISTORY_LIST", data: realBetHistory });
        } else {
            toast.error("failure")
        }
    }
}

function handleMarket(data, key) {
    const pushData = data
    let marketLen = 0

    pushData.oneTotwo = {}
    pushData.handicap = {}
    pushData.total = {}

    if (pushData.market && pushData.market.length) {
        for (let i = 0; i < pushData.market.length; i++) {
            if (pushData.market[i].MarketStatus === sportsConfig.ACTIVE) {
                for (let j = 0; j < pushData.market[i].Outcomes.length; j++) {
                    if (pushData.market[i].Outcomes[j].OutcomeStatus) {
                        marketLen++
                        break
                    }
                }
            }
        }

        for (let f = pushData.market.length - 1; f >= 0; f--) {
            if (!pushData.market[f].Outcomes || !pushData.market[f].Outcomes.length) {
                continue;
            }

            let T1X2Market
            if (sportsConfig.marketConfig[pushData.sportid]) {
                T1X2Market = sportsConfig.marketConfig[pushData.sportid]
            } else {
                T1X2Market = sportsConfig.T1X2
            }

            if (pushData.market[f].MarketName.toLowerCase().indexOf(T1X2Market) > -1) {
                pushData.oneTotwo.MarketId = pushData.market[f].MarketId
                pushData.oneTotwo.MarketName = pushData.market[f].MarketName
                pushData.oneTotwo.MarketStatus = pushData.market[f].MarketStatus
                pushData.oneTotwo.MarketSpecifiers = pushData.market[f].MarketSpecifiers
                pushData.oneTotwo.one = {
                    OutcomeId: pushData.market[f].Outcomes[0].OutcomeId,
                    OutcomeName: pushData.market[f].Outcomes[0].OutcomeName,
                    OutcomeOdds: parseFloat(pushData.market[f].Outcomes[0].OutcomeOdds).toFixed(2),
                    OutcomeStatus: pushData.market[f].Outcomes[0].OutcomeStatus
                }
                pushData.oneTotwo.draw = {
                    OutcomeId: pushData.market[f].Outcomes[1].OutcomeId,
                    OutcomeName: pushData.market[f].Outcomes[1].OutcomeName,
                    OutcomeOdds: parseFloat(pushData.market[f].Outcomes[1].OutcomeOdds).toFixed(2),
                    OutcomeStatus: pushData.market[f].Outcomes[1].OutcomeStatus
                }
                if (pushData.market[f].Outcomes[2]) {
                    pushData.oneTotwo.two = {
                        OutcomeId: pushData.market[f].Outcomes[2].OutcomeId,
                        OutcomeName: pushData.market[f].Outcomes[2].OutcomeName,
                        OutcomeOdds: parseFloat(pushData.market[f].Outcomes[2].OutcomeOdds).toFixed(2),
                        OutcomeStatus: pushData.market[f].Outcomes[2].OutcomeStatus
                    }
                }
                break
            }
        }

        for (let g = pushData.market.length - 1; g >= 0; g--) {
            if (pushData.market[g].MarketName.toLowerCase() === sportsConfig.THANDICAP) {
                if (!pushData.market[g].Outcomes || !pushData.market[g].Outcomes.length) {
                    break;
                }
                pushData.handicap.MarketId = pushData.market[g].MarketId
                pushData.handicap.MarketName = pushData.market[g].MarketName
                pushData.handicap.MarketSpecifiers = pushData.market[g].MarketSpecifiers
                pushData.handicap.MarketStatus = pushData.market[g].MarketStatus
                pushData.handicap.one = {
                    OutcomeId: pushData.market[g].Outcomes[0].OutcomeId,
                    OutcomeName: pushData.market[g].Outcomes[0].OutcomeName,
                    OutcomeOdds: parseFloat(pushData.market[g].Outcomes[0].OutcomeOdds).toFixed(2),
                    OutcomeStatus: pushData.market[g].Outcomes[0].OutcomeStatus
                }
                pushData.handicap.two = {
                    OutcomeId: pushData.market[g].Outcomes[1].OutcomeId,
                    OutcomeName: pushData.market[g].Outcomes[1].OutcomeName,
                    OutcomeOdds: parseFloat(pushData.market[g].Outcomes[1].OutcomeOdds).toFixed(2),
                    OutcomeStatus: pushData.market[g].Outcomes[1].OutcomeStatus
                }
                break
            }
        }

        for (let h = pushData.market.length - 1; h >= 0; h--) {
            if (pushData.market[h].MarketName.toLowerCase() === sportsConfig.TTOTAL) {
                if (!pushData.market[h].Outcomes || !pushData.market[h].Outcomes.length) {
                    break;
                }
                pushData.total.MarketId = pushData.market[h].MarketId
                pushData.total.MarketName = pushData.market[h].MarketName
                pushData.total.MarketSpecifiers = pushData.market[h].MarketSpecifiers
                pushData.total.MarketStatus = pushData.market[h].MarketStatus
                pushData.total.one = {
                    OutcomeId: pushData.market[h].Outcomes[0].OutcomeId,
                    OutcomeName: pushData.market[h].Outcomes[0].OutcomeName,
                    OutcomeStatus: pushData.market[h].Outcomes[0].OutcomeStatus,
                    OutcomeOdds: parseFloat(pushData.market[h].Outcomes[0].OutcomeOdds).toFixed(2)
                }
                pushData.total.two = {
                    OutcomeId: pushData.market[h].Outcomes[1].OutcomeId,
                    OutcomeName: pushData.market[h].Outcomes[1].OutcomeName,
                    OutcomeStatus: pushData.market[h].Outcomes[1].OutcomeStatus,
                    OutcomeOdds: parseFloat(pushData.market[h].Outcomes[1].OutcomeOdds).toFixed(2)
                }
                break
            }
        }

    }
    if (key) {
        pushData.marketLen = marketLen
    }
    return pushData
}

function setLastOddsOfMarket(lData, nData) {
    if (
        lData.oneTotwo && lData.oneTotwo.one && lData.oneTotwo.one.OutcomeOdds &&
        nData.oneTotwo && nData.oneTotwo.one && nData.oneTotwo.one.OutcomeOdds
    ) {
        nData.oneTotwo.one.lastodd = lData.oneTotwo.one.OutcomeOdds
    }
    if (
        lData.oneTotwo && lData.oneTotwo.draw && lData.oneTotwo.draw.OutcomeOdds &&
        nData.oneTotwo && nData.oneTotwo.draw && nData.oneTotwo.draw.OutcomeOdds
    ) {
        nData.oneTotwo.draw.lastodd = lData.oneTotwo.draw.OutcomeOdds
    }
    if (
        lData.oneTotwo && lData.oneTotwo.two && lData.oneTotwo.two.OutcomeOdds &&
        nData.oneTotwo && nData.oneTotwo.two && nData.oneTotwo.two.OutcomeOdds
    ) {
        nData.oneTotwo.two.lastodd = lData.oneTotwo.two.OutcomeOdds
    }
    if (
        lData.handicap && lData.handicap.one && lData.handicap.one.OutcomeOdds &&
        nData.handicap && nData.handicap.one && nData.handicap.one.OutcomeOdds
    ) {
        nData.handicap.one.lastodd = lData.handicap.one.OutcomeOdds
    }
    if (
        lData.handicap && lData.handicap.two && lData.handicap.two.OutcomeOdds &&
        nData.handicap && nData.handicap.two && nData.handicap.two.OutcomeOdds
    ) {
        nData.handicap.two.lastodd = lData.handicap.two.OutcomeOdds
    }
    if (
        lData.total && lData.total.one && lData.total.one.OutcomeOdds &&
        nData.total && nData.total.one && nData.total.one.OutcomeOdds
    ) {
        nData.total.one.lastodd = lData.total.one.OutcomeOdds
    }
    if (
        lData.total && lData.total.two && lData.total.two.OutcomeOdds &&
        nData.total && nData.total.two && nData.total.two.OutcomeOdds
    ) {
        nData.total.two.lastodd = lData.total.two.OutcomeOdds
    }
    return nData
}

function removeLastOddsOfMarket(lData) {
    if (
        lData.oneTotwo && lData.oneTotwo.one && lData.oneTotwo.one.OutcomeOdds
    ) {
        lData.oneTotwo.one.lastodd = lData.oneTotwo.one.OutcomeOdds
    }
    if (
        lData.oneTotwo && lData.oneTotwo.draw && lData.oneTotwo.draw.OutcomeOdds
    ) {
        lData.oneTotwo.draw.lastodd = lData.oneTotwo.draw.OutcomeOdds
    }
    if (
        lData.oneTotwo && lData.oneTotwo.two && lData.oneTotwo.two.OutcomeOdds
    ) {
        lData.oneTotwo.two.lastodd = lData.oneTotwo.two.OutcomeOdds
    }
    if (
        lData.handicap && lData.handicap.one && lData.handicap.one.OutcomeOdds
    ) {
        lData.handicap.one.lastodd = lData.handicap.one.OutcomeOdds
    }
    if (
        lData.handicap && lData.handicap.two && lData.handicap.two.OutcomeOdds
    ) {
        lData.handicap.two.lastodd = lData.handicap.two.OutcomeOdds
    }
    if (
        lData.total && lData.total.one && lData.total.one.OutcomeOdds
    ) {
        lData.total.one.lastodd = lData.total.one.OutcomeOdds
    }
    if (
        lData.total && lData.total.two && lData.total.two.OutcomeOdds
    ) {
        lData.total.two.lastodd = lData.total.two.OutcomeOdds
    }
    return lData
}

function get(p1, p2, betType) {
    const index = p1.data.findIndex(data => data.OutcomeId === p2.OutcomeId && data.OutcomeName === p2.OutcomeName && data.MarketId === p2.MarketId && data.MarketName === p2.MarketName && data.MarketSpecifiers === p2.MarketSpecifiers && data.event_id === p2.event_id)
    if (index > -1) {
        if (p1.data[index].OutcomeOdds) p1.totalOdds = (parseFloat(p1.totalOdds) - parseFloat(p1.data[index].OutcomeOdds)).toFixed(2)
        if (betType === sportsConfig.SINGLE) {
            if (p1.data[index].amount) p1.totalMoney = (parseFloat(p1.totalMoney) - parseFloat(p1.data[index].amount)).toFixed(2)
            if (p1.data[index].amount) p1.totalStack = (parseFloat(p1.totalStack) - (parseFloat(p1.data[index].amount) * parseFloat(p1.data[index].OutcomeOdds))).toFixed(2)
        } else if (betType === sportsConfig.MULTI) {
            if (p1.totalStack) p1.totalStack = (parseFloat(p1.totalStack) / parseFloat(p1.data[index].OutcomeOdds)).toFixed(2)
        }
        p1.data.splice(index, 1)
    } else {
        if (p2.OutcomeOdds) p1.totalOdds = (parseFloat(p1.totalOdds) + parseFloat(p2.OutcomeOdds)).toFixed(2)
        if (betType === sportsConfig.MULTI) {
            if (p1.totalStack) p1.totalStack = (parseFloat(p1.totalStack) * parseFloat(p2.OutcomeOdds)).toFixed(2)
        }
        p1.data.push(p2)
    }
    return p1
}

function remove(p1, p2, betType) {
    const index = p1.data.findIndex(data => data.OutcomeId === p2.OutcomeId && data.OutcomeName === p2.OutcomeName && data.MarketId === p2.MarketId && data.MarketName === p2.MarketName && data.MarketSpecifiers === p2.MarketSpecifiers && data.event_id === p2.event_id)
    if (p1.data[index].OutcomeOdds) p1.totalOdds = (parseFloat(p1.totalOdds) - parseFloat(p1.data[index].OutcomeOdds)).toFixed(2)
    if (betType === sportsConfig.SINGLE) {
        if (p1.data[index].amount) p1.totalMoney = (parseFloat(p1.totalMoney) - parseFloat(p1.data[index].amount)).toFixed(2)
        if (p1.data[index].amount) p1.totalStack = (parseFloat(p1.totalStack) - (parseFloat(p1.data[index].amount) * parseFloat(p1.data[index].OutcomeOdds))).toFixed(2)
    } else if (betType === sportsConfig.MULTI) {
        if (p1.totalStack) p1.totalStack = (parseFloat(p1.totalStack) / parseFloat(p1.data[index].OutcomeOdds)).toFixed(2)
    }
    p1.data.splice(index, 1)
    return p1
}

export const getRecoveryEvent = () => {
    return async (dispatch) => {
        const result = await AXIOS_REQUEST("sport/getRecoveryEvent")
        if (result.status) {
            dispatch({ type: RECOVERYEVENTUPDATE, data: result.data.produceStatus })
        }
    }
}

export const getFeaturedEvents = () => {
    return async (dispatch, getState) => {
        const rdata = await AXIOS_REQUEST("sport/getFeaturedEvent", {}, dispatch, true)
        if (rdata.status) {
            const featuredData = rdata.data
            const allSportsHeaderData = getState().sports.all_sports_list
            const updateFeaturedEventData = []

            for (const i in featuredData) {
                const oneEvent = featuredData[i]
                const tempHeaderIndex = allSportsHeaderData.findIndex(item => item.sport_id === oneEvent.sportid)
                if (tempHeaderIndex > -1) {
                    const alreadyAddedHeaderIndex = updateFeaturedEventData.findIndex(item => item.sport_id === oneEvent.sportid)
                    if (alreadyAddedHeaderIndex < 0) {
                        const oneData = Object.assign({}, allSportsHeaderData[tempHeaderIndex], { matchs: [oneEvent] })
                        updateFeaturedEventData.push(oneData)
                    } else {
                        const againAddedHeaderIndex = updateFeaturedEventData.findIndex(item => item.sport_id === oneEvent.sportid)
                        if (againAddedHeaderIndex > -1) {
                            updateFeaturedEventData[againAddedHeaderIndex].matchs.push(oneEvent)
                        }
                    }
                }
            }
            for (const j in updateFeaturedEventData) {
                updateFeaturedEventData[j].matchs = getSeasonData(updateFeaturedEventData[j].matchs)
            }
            dispatch({ type: FEATURED_EVENT_DATA, data: Object.assign({}, { data: updateFeaturedEventData }) })
        }
    }
}

export const getFirstPageEvents = () => {
    return async (dispatch, getState) => {
        const sdata = await AXIOS_REQUEST("sport/getFirstpageData", {})
        if (sdata.status && sdata.data && sdata.data.length) {
            const data = []
            for (let i = 0; i < sdata.data.length; i++) {
                data.push(handleMarket(sdata.data[i]))
            }
            dispatch({ type: FIRSTPAGE_SPORTS, data })
        }
    }
}

export const getAllSportsEventsByEventStatus = (EventStatus) => {
    return async (dispatch, getState) => {
        const rdata = await AXIOS_REQUEST("sport/getAllSportsEventsByEventStatus", { EventStatus }, dispatch, true)
        if (rdata.status) {
            const featuredData = rdata.data
            const allSportsHeaderData = getState().sports.all_sports_list
            const updateFeaturedEventData = []

            for (const i in featuredData) {
                const oneEvent = featuredData[i]
                const tempHeaderIndex = allSportsHeaderData.findIndex(item => item.sport_id === oneEvent.sportid)
                if (tempHeaderIndex > -1) {
                    const alreadyAddedHeaderIndex = updateFeaturedEventData.findIndex(item => item.sport_id === oneEvent.sportid)
                    if (alreadyAddedHeaderIndex < 0) {
                        const oneData = Object.assign({}, allSportsHeaderData[tempHeaderIndex], { matchs: [oneEvent] })
                        updateFeaturedEventData.push(oneData)
                    } else {
                        const againAddedHeaderIndex = updateFeaturedEventData.findIndex(item => item.sport_id === oneEvent.sportid)
                        if (againAddedHeaderIndex > -1) {
                            updateFeaturedEventData[againAddedHeaderIndex].matchs.push(oneEvent)
                        }
                    }
                }
            }
            for (const j in updateFeaturedEventData) {
                updateFeaturedEventData[j].matchs = getSeasonData(updateFeaturedEventData[j].matchs)
            }
            dispatch({ type: FEATURED_EVENT_DATA, data: Object.assign({}, { data: updateFeaturedEventData }) })
        }
    }
}

export const startSportsSocket = (user) => {
    return async (dispatch, getState) => {
        dispatch(getRecoveryEvent())
        if(Root.sportSocket) {
            setTimeout(() => {
                Root.sportSocket.on(sportsConfig.ODDSCHANGE, async (data) => {
                    const eventData = data.data
                    const currentPage = history.location.pathname.split("/")[1]
                    const EventStatus = currentPage === sportsConfig.matchType.sports ? getState().sports.current_tap.EventStatus : sportsConfig.matchType[currentPage]
                    const allMatchs = getState().sports.all_matchs.data
                    // const featuredData = getState().sports.featuredData.data
                    const selectedSport = getState().sports.current_selected_sport
                    const currentSelectedGame = getState().sports.currentSelectedGame
                    const betSideBar = getState().sports.sportsSidebarData
    
                    if (sportsConfig.sportsUrls.indexOf(currentPage) > -1) {
                        if (currentPage !== sportsConfig.matchType.sportsevent) {
                            if (parseInt(selectedSport.sport_id) === eventData.sportid) {
                                if (EventStatus === eventData.EventStatus) {
                                    let OddFlag = false
                                    for(let odd_i in allMatchs) {
                                        for(let odd_j in allMatchs[odd_i].data) {
                                            if(allMatchs[odd_i].data[odd_j].event_id === eventData.event_id) {
                                                let tempEvent = await handleMarket(eventData, true)
                                                allMatchs[odd_i].data[odd_j] = await setLastOddsOfMarket(allMatchs[odd_i].data[odd_j], tempEvent)
                                                OddFlag = true
                                            } else {
                                                allMatchs[odd_i].data[odd_j] = await removeLastOddsOfMarket(allMatchs[odd_i].data[odd_j])                                            
                                            }
                                        }
                                    }
    
                                    if (!OddFlag) {
                                        const oddTemp = {}
                                        if (eventData.Season) {
                                            const seasonIndex = allMatchs.findIndex(item => item.name === eventData.Season.Name)
                                            if (seasonIndex > -1) {
                                                allMatchs[seasonIndex].data.push(handleMarket(eventData, true))
                                            } else {
                                                oddTemp.id = eventData.Season.Id
                                                oddTemp.name = eventData.Season.Name
                                                oddTemp.data = [handleMarket(eventData, true)]
                                                allMatchs.push(oddTemp)
                                            }
                                        } else {
                                            const otherIndex = allMatchs.findIndex(item => item.name === sportsConfig.OTHER)
                                            if (otherIndex > -1) {
                                                allMatchs[otherIndex].data.push(handleMarket(eventData, true))
                                            } else {
                                                oddTemp.id = Date.now()
                                                oddTemp.name = sportsConfig.OTHER
                                                oddTemp.data = [handleMarket(eventData, true)]
                                                allMatchs.push(oddTemp)
                                            }
                                        }
                                        allMatchs.sort(function (A, B) {
                                            return A.name === sportsConfig.OTHER ? 1 : (A.name < B.name ? -1 : 1)
                                        })
                                    }
                                } else {
                                    for (let odd_i_ = 0; odd_i_ < allMatchs.length; odd_i_++) {
                                        const oddsChangeIndex = allMatchs[odd_i_].data.findIndex(item => item.event_id === eventData.event_id)
                                        if (oddsChangeIndex > -1) {
                                            allMatchs[odd_i_].data.splice(oddsChangeIndex, 1)
                                            if (allMatchs[odd_i_].data.length === 0) {
                                                allMatchs.splice(odd_i_, 1)
                                            }
                                            break
                                        }
                                    }
                                }
                                dispatch({ type: SET_ALL_MATCHS, data: Object.assign({}, { data: [] }) })
                                dispatch({ type: SET_ALL_MATCHS, data: Object.assign({}, { data: allMatchs }) })
                            } else if (parseInt(selectedSport.sport_id) === 0) {
                                // for (let feauthred_i = 0; feauthred_i < featuredData.length; feauthred_i++) {
                                //     const feauthredAllMatch = featuredData[feauthred_i].matchs
                                //     for (let feauthred_j = 0; feauthred_j < feauthredAllMatch.length; feauthred_j++) {
                                //         const featuredOddIndex = feauthredAllMatch[feauthred_j].data.findIndex(item => item.event_id === eventData.event_id)
                                //         if (featuredOddIndex > -1) {
                                //             feauthredAllMatch[feauthred_j].data[featuredOddIndex] = handleMarket(eventData, true)
                                //             break
                                //         }
                                //     }
                                //     featuredData[feauthred_i].matchs = feauthredAllMatch
                                // }
                                // dispatch({ type: FEATURED_EVENT_DATA, data: Object.assign({}, { data: featuredData }) })
                            }
                        }
    
                        if (currentSelectedGame.event_id === eventData.event_id) {
                            const currentmarket = currentSelectedGame.market
                            for (const current_i in currentmarket) {
                                const currentindex = eventData.market.findIndex(item => item.MarketName === currentmarket[current_i].MarketName && item.MarketId === currentmarket[current_i].MarketId && item.MarketSpecifiers === currentmarket[current_i].MarketSpecifiers)
                                if (currentindex < 0) {
                                    eventData.market.push(currentmarket[current_i])
                                } else {
                                    eventData.market[currentindex].isopen = currentmarket[current_i].isopen
                                    for(let rimi in eventData.market[currentindex].Outcomes) {
                                        for (let rimj in currentmarket[current_i].Outcomes) {
                                            if(eventData.market[currentindex].Outcomes[rimi].OutcomeId === currentmarket[current_i].Outcomes[rimj].OutcomeId) {
                                                eventData.market[currentindex].Outcomes[rimi].lastodd = currentmarket[current_i].Outcomes[rimj].OutcomeOdds
                                            }
                                        }
                                    }
                                }
                            }
    
                            dispatch({ type: CURRENTSELECTEGAME, data: Object.assign({}, eventData) })
                        }
                    }
    
                    let betOddFlag = false
                    for (let oddsBet_i = 0; oddsBet_i < betSideBar.data.length; oddsBet_i++) {
                        if (betSideBar.data[oddsBet_i].event_id === eventData.event_id) {
                            betOddFlag = true
                            betSideBar.data[oddsBet_i].EventStatus = eventData.EventStatus
                            if (eventData.EventStatus === sportsConfig.LIVE || eventData.EventStatus === sportsConfig.NotStarted) {
                                betSideBar.data[oddsBet_i].eventMessage = ""
                            } else {
                                betSideBar.data[oddsBet_i].eventMessage = `This match is ${eventData.EventStatus}`
                            }
                            if (eventData.market && eventData.market.length) {
                                for (let mak_i = 0; mak_i < eventData.market.length; mak_i++) {
                                    if (eventData.market[mak_i].Outcomes) {
                                        for (let odd_j = 0; odd_j < eventData.market[mak_i].Outcomes.length; odd_j++) {
                                            if (betSideBar.data[oddsBet_i].OutcomeId === eventData.market[mak_i].Outcomes[odd_j].OutcomeId && betSideBar.data[oddsBet_i].OutcomeName === eventData.market[mak_i].Outcomes[odd_j].OutcomeName && betSideBar.data[oddsBet_i].MarketId === eventData.market[mak_i].MarketId && betSideBar.data[oddsBet_i].MarketName === eventData.market[mak_i].MarketName && betSideBar.data[oddsBet_i].MarketSpecifiers === eventData.market[mak_i].MarketSpecifiers) {
                                                betSideBar.data[oddsBet_i].OutcomeStatus = eventData.market[mak_i].Outcomes[odd_j].OutcomeStatus
                                                betSideBar.data[oddsBet_i].OutcomeOdds = eventData.market[mak_i].Outcomes[odd_j].OutcomeOdds
                                                if (!eventData.market[mak_i].Outcomes[odd_j].OutcomeStatus) {
                                                    betSideBar.data[oddsBet_i].oddMessage = "This market is deactivated"
                                                } else {
                                                    betSideBar.data[oddsBet_i].oddMessage = ""
                                                }
                                            }
                                        }
                                    }
                                    if (betSideBar.data[oddsBet_i].MarketId === eventData.market[mak_i].MarketId && betSideBar.data[oddsBet_i].MarketName === eventData.market[mak_i].MarketName && betSideBar.data[oddsBet_i].MarketSpecifiers === eventData.market[mak_i].MarketSpecifiers) {
                                        betSideBar.data[oddsBet_i].MarketStatus = eventData.market[mak_i].MarketStatus
                                        if (eventData.market[mak_i].MarketStatus === sportsConfig.ACTIVE) {
                                            betSideBar.data[oddsBet_i].marketMessage = ""
                                        } else {
                                            betSideBar.data[oddsBet_i].marketMessage = `This market is ${eventData.market[mak_i].MarketStatus}`
                                        }
                                    }
                                }
                            }
                        }
                    }
    
                    if (betOddFlag) {
                        dispatch(updateSportsSidebar(betSideBar))
                    }
                })
                Root.sportSocket.on(sportsConfig.BETSTOP, (data) => {
                    const eventData = data.data
                    const currentPage = history.location.pathname.split("/")[1]
                    const allMatchs = getState().sports.all_matchs.data
                    const featuredData = getState().sports.featuredData.data
                    const selectedSport = getState().sports.current_selected_sport
                    const currentSelectedGame = getState().sports.currentSelectedGame
                    const betSideBar = getState().sports.sportsSidebarData
    
                    if (currentPage === sportsConfig.matchType.sports || currentPage === sportsConfig.matchType.Inplay || currentPage === sportsConfig.matchType.Upcoming || currentPage === sportsConfig.matchType.sportsevent) {
                        if (selectedSport.sport_id === eventData.sportid) {
                            for (let betstop_i = 0; betstop_i < allMatchs.length; betstop_i++) {
                                const betStopIndex = allMatchs[betstop_i].data.findIndex(item => item.event_id === eventData.event_id)
                                if (betStopIndex > -1) {
                                    allMatchs[betstop_i].data[betStopIndex].EventStatus = eventData.EventStatus
                                    break
                                }
                            }
                            dispatch({ type: SET_ALL_MATCHS, data: Object.assign({}, { data: [] }) })
                            dispatch({ type: SET_ALL_MATCHS, data: Object.assign({}, { data: allMatchs }) })
                        } else if (parseInt(selectedSport.sport_id) === 0) {
                            for (const feauthred_j in featuredData) {
                                const feauthredAllMatch = featuredData[feauthred_j].matchs
                                for (let feauthred_j = 0; feauthred_j < feauthredAllMatch.length; feauthred_j++) {
                                    const featuredOddIndex = feauthredAllMatch[feauthred_j].data.findIndex(item => item.event_id === eventData.event_id)
                                    if (featuredOddIndex > -1) {
                                        feauthredAllMatch[feauthred_j].data[featuredOddIndex].EventStatus = eventData.EventStatus
                                        break
                                    }
                                }
                                featuredData[feauthred_j].matchs = feauthredAllMatch
                            }
                            dispatch({ type: FEATURED_EVENT_DATA, data: Object.assign({}, { data: featuredData }) })
                        }
                        if (currentSelectedGame.event_id === eventData.event_id) {
                            currentSelectedGame.EventStatus = eventData.EventStatus
                            dispatch({ type: CURRENTSELECTEGAME, data: Object.assign({}, currentSelectedGame) })
                        }
                    }
    
                    let betStopBetFlag = false
                    for (let stopBet_i = 0; stopBet_i < betSideBar.data.length; stopBet_i++) {
                        if (betSideBar.data[stopBet_i].event_id === eventData.event_id) {
                            betSideBar.data[stopBet_i].EventStatus = eventData.EventStatus
                            betSideBar.data[stopBet_i].eventMessage = `This match is ${eventData.EventStatus}`
                            betStopBetFlag = true
                        }
                    }
                    if (betStopBetFlag) {
                        dispatch(updateSportsSidebar(betSideBar))
                    }
                })
                Root.sportSocket.on(sportsConfig.RecoveryEvent, (data) => {
                    if (data.data.produceStatus) {
                        dispatch({ type: RECOVERYEVENTUPDATE, data: true })
                    } else {
                        dispatch({ type: RECOVERYEVENTUPDATE, data: false })
                    }
                })
                Root.sportSocket.on(sportsConfig.mtsStatus, (data) => {
                    let betData = data.betData
                    if (user._id === betData[0].USERID) {
                        if (data.status) {
                            toast.success(data.msg)
                        } else {
                            toast.error(data.msg)
                        }
                        dispatch(removeAllItem())
                        const betId = Date.now().toString().slice(Date.now().toString().length - 6, Date.now().toString().length)
                        dispatch({ type: REFRESH_BET_ID, data: betId })
                        dispatch({ type: SET_BETSLIP_LOADING, data: false })
                    }
                })
            }, 5000)
        }
    }
}
