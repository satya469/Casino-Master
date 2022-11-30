import { Root } from "../../../authServices/rootconfig"
import { AXIOS_REQUEST, get_date } from "../auth"
import groupby from 'lodash.groupby'

export const getSportlist = async (params) => {
    let rdata = await AXIOS_REQUEST("betfair/playergetsportlist", params, null, true)
    return rdata
}

export const getopenbets = async (params) => {
    let rdata = await AXIOS_REQUEST("betfair/playergetopenbets", params, null, true)
    return rdata
}


export const getmarkets = async (params) => {
    let rdata = await AXIOS_REQUEST("betfair/playergetmarketslist", params, null, true)
    return rdata
}

export const ActionPlaceBet = async (params) => {
    let rdata = await AXIOS_REQUEST("betfair/playerplacebets", params, null, true)
    return rdata
}

export const getMarketsById = async (params) => {
    let rdata = await AXIOS_REQUEST("betfair/getMarketsById", params, null, true)
    return rdata 
}


export const setactiveSport = (data) => {
    return dispatch => {
        window.postMessage(JSON.stringify({ action: "setactiveSport", value: data }), "*")
        dispatch({
            type: "setactiveSport",
            data: data
        })
    }
}

export const destryoddsSession = () => {
    return (dispatch, getState) => {
        const { activeodds } = getState().betexch
        if (activeodds && activeodds.event) {
            let matchid = activeodds.event.id
            Root.socket.emit("destryoddsSession", { data: matchid })
        }
    }
}

export const getMatches = (Serlist) => {
    let rows = []
    for (let i in Serlist) {
        let itemk = Serlist[i]
        let items = []
        for (let i in itemk.matches) {

            items.push(Object.assign({}, itemk.matches[i], {
                competition: {
                    competition: itemk.competition,
                    competitionRegion: itemk.competitionRegion,
                    marketCount: itemk.marketCount
                }
            }))

        }
        rows = [...rows, ...items]
    }
    rows.sort(function (news, b) {
        return new Date(news.event.openDate) - new Date(b.event.openDate)
    })
    return rows
}

export const setmatchelist = (data) => {
    return dispatch => {
        window.postMessage(JSON.stringify({ action: "setmatchelist", value: data }), "*")
        dispatch({
            type: "setmatchelist",
            data: data
        })
    }
}


export const setallmatchelist = (data) => {
    return dispatch => {
        window.postMessage(JSON.stringify({ action: "setallmatchelist", value: data }), "*")
        dispatch({
            type: "allmatchelist",
            data: data
        })
    }
}


export const setSportslist = (data) => {
    return dispatch => {
        window.postMessage(JSON.stringify({ action: "setallmatchelist", value: data }), "*")
        dispatch({
            type: "setSportslist",
            data: data
        })
    }
}

export const setodds = (data) => {
    return dispatch => {
        window.postMessage(JSON.stringify({ action: "setodds", value: data }), "*")
        dispatch({
            type: "setodds",
            data: data
        })
    }
}

export const setmatches = (params) => {
    return dispatch => {
        window.postMessage(JSON.stringify({ action: "setmatches", value: params }), "*")
        dispatch({
            type: "setmatches",
            data: params
        })
    }
}


export const setbetsdata = (params) => {
    return dispatch => {
        window.postMessage(JSON.stringify({ action: "setbetsdata", value: params }), "*")
        dispatch({
            type: "setbetsdata",
            data: params
        })
    }
}

export const setopenbets = (params) => {
    return dispatch => {
        dispatch({
            type: "setopenbets",
            data: params
        })
    }
}

export const setBetslip = (params) => {
    return dispatch => {
        dispatch({
            type: "setBetslip",
            data: params
        })
    }
}

export const setOdditem = (params) => {
    return dispatch => {
        window.postMessage(JSON.stringify({ action: "setOdditem", value: params }), "*")
        dispatch({
            type: "setOdditem",
            data: params
        })
    }
}


export const setprofitlossObj = (params) => {
    return dispatch => {
        // window.postMessage(JSON.stringify({ action: "setprofitlossObj", value: params }), "*")
        dispatch({
            type: "setprofitlossObj",
            data: params
        })
    }
}

export const dateConvert = (date) => {
    let d = new Date(date).toString()
    let hhmm = get_date(d.slice(16, 21))
    return d.slice(4, 10) + " , " + hhmm
}

export const mymarketsload = async (params) => {
    let rdata = await AXIOS_REQUEST("betfair/getmymarketsplayer", params, null, true)
    return rdata
}

export const getPNL = (betshis, activeodds) => {

    console.log(activeodds)
    let row = {}
    let mbets = betshis.filter(obj=> obj.matchodd === true)
    if (mbets.length) {
        let mt =  groupby(mbets, "marketId")
        let item = {}
        for (let i in mt) {
            let marketId = i
            let pnl = profitloss(mt[i], marketId)
            item[marketId] = {}
            item[marketId] = pnl
        }
        row['matchodd'] = {}
        row['matchodd'] = item
    }

    let bbets = betshis.filter(obj=> obj.bookmaker === true)
    if (bbets.length) {
        let marketId = bbets[0].marketId
        let PNL = profitloss(bbets, marketId)
        row['bookmaker'] = {}
        row['bookmaker'] = {
            [marketId]: PNL
        }
        console.log(PNL)
    }

    let fbets = betshis.filter(obj=> obj.isfancy === true)
    if (fbets.length) {
        let mt =  groupby(fbets, "marketId")
        let item = {}
        for (let i in mt) {
            let marketId = i
            item[marketId] = {}
            let pnl = profitlossFancy(mt[i])
            item[marketId] = pnl
        }
        row['isfancy'] = {}
        row['isfancy'] = item
    }

    return row

    function profitloss(bets, marketId){

        let PNL = {
        }

        let runners = []
        
        if ( (activeodds.markets['Match Odds'] && activeodds.markets['Match Odds']['odds']) 
        || (activeodds.markets['other'] && activeodds.markets['other'].length) 
        || (activeodds.markets['Bookmaker'] && activeodds.markets['Bookmaker']['odds'])
        ) {
            if ( activeodds.markets['Match Odds'] && activeodds.markets['Match Odds'].marketId === marketId) {
                runners = activeodds.markets['Match Odds']['odds']
            } else {
                let mkts = activeodds.markets['other']
                if (mkts) {
                    let mitem = mkts.find( obj=> obj.marketId === marketId.toString() )
                    if (mitem) {
                        runners = mitem['odds']
                    }
                }
            }

            if (activeodds.markets['Bookmaker'] && activeodds.markets['Bookmaker'].marketId === marketId) {
                runners = activeodds.markets['Bookmaker']['odds']
                console.log(runners)
            }
        } else {
            return {}
        }
            
        let drawselectionid = ""
        let AteamSelectionid = ""
        let BteamSelectionid = ""
        if (runners.length === 3) {
            AteamSelectionid = runners[0].selectionId
            BteamSelectionid = runners[1].selectionId
            drawselectionid = runners[2].selectionId
             PNL = {
                [drawselectionid]: 0,
                [AteamSelectionid]: 0,
                [BteamSelectionid]: 0,
            }
        } else if (runners.length === 2) {
            AteamSelectionid = runners[0].selectionId
            BteamSelectionid = runners[1].selectionId
             PNL = {
                [AteamSelectionid]: 0,
                [BteamSelectionid]: 0
            }
        } else {
            return {}
        }
    
        let Ateam = []
        let Bteam = []
        let Dteam = []
        
    
        for (let i in bets) {
            // if (bets[i].marketName === "Match Odds") {
    
                switch (bets[i].selectionId.toString()) {
                    case AteamSelectionid.toString():
                        Ateam.push(bets[i])
                        break;
                    case BteamSelectionid.toString():
                        Bteam.push(bets[i])
                        break;
                    default:
                        Dteam.push(bets[i])
                        break;
                }
    
            // }
        }
        
        for (let i in Dteam) {
            if (Dteam[i].backlay === "back") {
                PNL[drawselectionid] += Number(Dteam[i].profit)
            } else {
                PNL[drawselectionid] -= Number(Dteam[i].betLoss)
            }
    
        }
    
        for (let i in Ateam) {
            if (Ateam[i].backlay === "back") {
                PNL[AteamSelectionid] += Number(Ateam[i].profit)
            } else {
                PNL[AteamSelectionid] -= Number(Ateam[i].betLoss)
            }
        }
    
        for (let i in Bteam) {
            if (Bteam[i].backlay === "back") {
                PNL[BteamSelectionid] += Number(Bteam[i].profit)
            } else {
                PNL[BteamSelectionid] -= Number(Bteam[i].betLoss)
            }
        }
    
      
        let darray = getRemainarray(Ateam)
        for (let i in darray) {
            if (darray[i].backlay === "back") {
                PNL[BteamSelectionid] -= Number(darray[i].stake)
                PNL[drawselectionid] -= Number(darray[i].stake)
            } else {
                PNL[BteamSelectionid] += Number(darray[i].stake)
                PNL[drawselectionid] += Number(darray[i].stake)
            }
        }
    
      
        darray = getRemainarray(Bteam)
    
        for (let i in darray) {
            if (darray[i].backlay === "back") {
                PNL[AteamSelectionid] -= Number(darray[i].stake)
                PNL[drawselectionid] -= Number(darray[i].stake)
            } else {
                PNL[drawselectionid] += Number(darray[i].stake)
                PNL[AteamSelectionid] += Number(darray[i].stake)
            }
        }
    
        darray = getRemainarray(Dteam)
    
        for (let i in darray) {
            if (darray[i].backlay === "back") {
                PNL[BteamSelectionid] -= Number(darray[i].stake)
                PNL[AteamSelectionid] -= Number(darray[i].stake)
            } else {
                PNL[BteamSelectionid] += Number(darray[i].stake)
                PNL[AteamSelectionid] += Number(darray[i].stake)
            }
        }
    
        return PNL
        function getRemainarray(teams) {
            let array = JSON.parse(JSON.stringify(teams));
            for (let i = 0; i < array.length; i++) {
                for (let j = i + 1; j < array.length; j++) {
                    if (array[i].stake === array[j].stake && ((array[i].backlay === 'lay' && array[j].backlay === 'back') || (array[i].backlay === 'back' && array[j].backlay === 'lay'))) {
                        array.splice(i, 1);
                        array.splice(j - 1, 1);
                        j = j - 1;
                        break;
                    }
                }
            }
            return array
        }
    }

    function profitlossFancy(bets) {
        let obj = {}
        let sels = groupby(bets, "selectionId")
        for (let i in sels) {
            let pl = 0
            for (let j in sels[i]) {
                pl -= sels[i][j].profit
            }
            obj[i] = pl
        }
        return obj
    }


}

export const getProfitLoose = (stake, oddprice, odd) => {
    let betProfit = 0
    let betLoss = 0
    if (odd.bookmaker) {
        if (odd.backlay === "back") {
            betProfit = Math.round((stake/100) * oddprice);
            betLoss = stake;
        } else {
            betProfit = stake;
            betLoss = Math.round((stake/100) * oddprice);
        }
    } else if (odd.isfancy) {
        if (odd.backlay === "back") {
            betProfit = ((stake * oddprice) / 100);
            betLoss = stake;
        } else {
            betProfit = stake;
            betLoss = ((stake * oddprice) / 100);
        }
    } else {
        if (odd.backlay === "back") {
            betProfit = stake * (oddprice - 1);
            betLoss = stake;
        } else {
            betProfit = stake;
            betLoss = stake * (oddprice - 1);
        }
    }
    return {
        profit: Number(betProfit).toFixed(0),
        betLoss: Number(betLoss).toFixed(0)
    }
}

// 1. Match Odds
//         BACK
//         betProfit = stake * (odd - 1);
//         betLoss = stake;
//         LAY
//         betProfit = stake;
//         betLoss = stake * (odd - 1);

// 2. Mook Maker
//         BACK
//         betProfit = Math.round((stake/100.0f) * odd);
//         betLoss = stake;
//         LAY
//         betProfit = stake;
//         betLoss = Math.round((stake/100.0f) * odd);

// 3. Fancy
//         BACK
//         betProfit = ((stake * odd) / 100.0f);
//         betLoss = stake;
//         LAY
//         betProfit = stake;
//         betLoss = ((stake * odd) / 100.0f);
