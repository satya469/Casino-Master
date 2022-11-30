import React, { Fragment, useContext, useState } from "react"
import { Maximize2, Minus, Plus } from "react-feather"
import { Card, Input, Row, TabContent, TabPane } from "reactstrap"
import { Nav, NavItem, NavLink } from 'reactstrap'
import { useDispatch, useSelector } from "react-redux"
import { setbetsdata, ActionPlaceBet, setprofitlossObj, getopenbets, setopenbets, setBetslip, getPNL, getProfitLoose, setOdditem } from "../../redux/actions/betexchg"
import { setloginpage } from "../../redux/actions/auth/loginActions"
import { UserContext } from "../../utility/UserContext"
import Loader from "react-loader-spinner";
import { toast } from "react-toastify"

const Betslip = () => {

    const [active, setActive] = useState('1')
    // const [betslip, setbetslip] = useState(true)
    const [loading, setloading] = useState(true)
    const [loadingindex, setloadingindex] = useState("")
    const { user, sports } = useContext(UserContext)

    const { betsdata, activeSport, profitlossObj, activeodds, betslip, openbets } = useSelector(state => state.betexch)
    const UserBalance = useSelector(state => state.balance.value)

    const dispatch = useDispatch()
    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    const CancelAction = (odd, index) => {
        let bets = Object.assign({}, betsdata)

        let plobj = Object.assign({}, profitlossObj)
        if (plobj[odd.matchId] && plobj[odd.matchId][odd.marketId]) {
            delete plobj[odd.matchId][odd.marketId]
        }

        bets[odd.matchId]['matkets'][odd.marketId]['odds'].splice(index, 1)
        if (!bets[odd.matchId]['matkets'][odd.marketId]['odds'].length) {
            delete bets[odd.matchId]['matkets'][odd.marketId]
            if (!Object.keys(bets[odd.matchId]['matkets']).length) {
                delete bets[odd.matchId]
            }
        }
        dispatch(setbetsdata(bets))
        if (!odd.isfancy) {
            let betsarray = []
            betsarray = JSON.parse(JSON.stringify(openbets))
            let PNL = getPNL(betsarray, activeodds)
            // if (betsarray.length) {
            storeprofitloss(PNL, odd.matchId)
            dispatch(setOdditem(odd))
            // }
        }
    }

    const openbetsload = async (params) => {
        let rdata = await getopenbets(params)
        if (rdata.status) {
            let bets = rdata.data
            let PNL = getPNL(bets, activeodds)
            dispatch(setopenbets(bets))
            storeprofitloss(PNL, bets[0].matchId)
        } else {
        }
    }

    const PlaceBet = async (odd, index, lodIndex) => {

        // openbets

        let exposure = {}
        if (odd.isfancy) {
            exposure = profitlossObj[odd.matchId]['isfancy'][odd.marketId]
        } else if (odd.matchodd) {
            exposure = profitlossObj[odd.matchId]['matchodd'][odd.marketId]
        } else if (odd.bookmaker) {
            exposure = profitlossObj[odd.matchId]['bookmaker'][odd.marketId]
        } else {
            return;
        }
        let expoamount = 0
        for (let i in exposure) {
            if (exposure[i]) {
                if (expoamount > exposure[i]) {
                    expoamount = exposure[i]
                }
            }
        }
        // return;
        if (!user) {
            dispatch(setloginpage({ login: true, register: false, forgot: false }))
            dispatch(setBetslip(false))
        } else {
            if (!loading) {
                return true
            }

            if (Number(odd.price) <= 1) {
                toast.warn("Please Try Again")
                return;
            }
            let m1 = Object.values(activeodds['markets']).find(obj => obj.marketId === odd.marketId)
            let m2 = (activeodds['markets']['fancys']) ? (activeodds['markets']['fancys']).find(obj => obj.marketId === odd.marketId) : null
            let m3 = (activeodds['markets']['other']) ? (activeodds['markets']['other']).find(obj => obj.marketId === odd.marketId) : null
            let m = {}
            if (odd.isfancy) {
                m = m2
            } else {
                if (m1) {
                    m = m1
                } else {
                    m = m3
                }
            }
            if (m) {
                let max = 10000
                let min = 100
                if (odd.isfancy || odd.bookmaker) {
                    max = m.limits.MaximumBet ? Number(m.limits.MaximumBet) : 10000
                    min = m.limits.MinimumBet ? Number(m.limits.MinimumBet) : 100
                } else {
                    max = activeSport.minmaxvalue ? Number(activeSport.minmaxvalue.maxvalue) : 10000
                    min = activeSport.minmaxvalue ? Number(activeSport.minmaxvalue.minvalue) : 100
                }
                if (Number(odd.stake) < min || max < Number(odd.stake)) {
                    toast.warn("Please enter valid stake")
                    return;
                }

                if (!m.betstatus) {
                    toast.warn("Match did not start Yet ")
                    return;
                }
                //                "Match did not start Yet "
                let oitem = null
                if (odd.isfancy) {
                    oitem = m.odds.find(obj => obj.SelectionId === odd.selectionId)
                } else {
                    oitem = m.odds.find(obj => obj.selectionId === odd.selectionId)
                }
                if (oitem) {
                    let items = []
                    let minoddprice = ""
                    let maxoddprice = ""
                    if (oitem.status === "SUSPENDED" || oitem.GameStatus === "SUSPENDED") {
                        toast.warn("Suspended Odds")
                        return;
                    }
                    if (UserBalance && UserBalance.balance < Number(odd.stake)) {
                        toast.warn("Please Load Points.")
                        return;
                    }

                    if (odd.matchodd) {

                        maxoddprice = 10.01
                        minoddprice = 1.03
                        if (maxoddprice !== "" && minoddprice !== "") {
                            if (Number(odd.price) < minoddprice || maxoddprice < Number(odd.price)) {
                                toast.warn("Please Try Again")
                                return
                            } else {
                            }
                        } else {
                            toast.warn("Please Try Again")
                            return
                        }

                        if (odd.backlay === "lay") {
                            items = oitem.lay
                            let news = items.sort(function (b, c) {
                                return Number(b.price) - Number(c.price)
                            })
                            if (news.length) {
                                minoddprice = Number(news[0].price)
                                maxoddprice = getLayNum(minoddprice)
                                // maxoddprice = Number(Number(news[0].price).toFixed(2))
                                // minoddprice = Number((Number(news[news.length - 1]).price - 0.1).toFixed(2))
                            }
                        } else {
                            items = oitem.back
                            let news = items.sort(function (c, b) {
                                return Number(b.price) - Number(c.price)
                            })
                            if (news.length) {
                                maxoddprice = Number(news[0].price)
                                minoddprice = getBackNum(maxoddprice)
                                // maxoddprice = Number((Number(news[news.length - 1]).price + 0.1).toFixed(2))
                            }
                        }

                        // if (odd.backlay === "lay") {
                        //     items = oitem.lay
                        //     let news = items.sort(function (c, b) {
                        //         return Number(b.price) - Number(c.price)
                        //     })
                        //     if (news.length) {
                        //         maxoddprice = Number(Number(news[0].price).toFixed(2))
                        //         minoddprice = Number((Number(news[news.length - 1]).price - 0.1).toFixed(2))
                        //     }
                        // } else {
                        //     items = oitem.back
                        //     let news = items.sort(function (b, c) {
                        //         return Number(b.price) - Number(c.price)
                        //     })
                        //     if (news.length) {
                        //         minoddprice = Number(Number(news[0].price).toFixed(2))
                        //         maxoddprice = Number((Number(news[news.length - 1]).price + 0.1).toFixed(2))
                        //     }
                        // }

                        console.log(minoddprice)
                        console.log(maxoddprice)
                        if (maxoddprice !== "" && minoddprice !== "") {
                            if (Number(odd.price) < minoddprice || maxoddprice < Number(odd.price)) {
                                toast.warn("Please Try Again")
                                return
                            } else {

                            }
                        } else {
                            toast.warn("Please Try Again")
                            return
                        }
                    } else {

                    }

                    setloadingindex(lodIndex)
                    setloading(false)
                    let bets = Object.assign({}, betsdata)
                    let row = bets[odd.matchId]['matkets'][odd.marketId]['odds'][index]
                    row['exposure'] = expoamount
                    let rdata = await ActionPlaceBet({ row })
                    if (rdata.status) {
                        toast.success("Bet Accepted!")
                        bets[odd.matchId]['matkets'][odd.marketId]['odds'].splice(index, 1)
                        if (!bets[odd.matchId]['matkets'][odd.marketId]['odds'].length) {
                            delete bets[odd.matchId]['matkets'][odd.marketId]
                            if (!Object.keys(bets[odd.matchId]['matkets']).length) {
                                delete bets[odd.matchId]
                            }
                        }
                        let matchid = activeodds.event.id
                        openbetsload({ matchid })

                        dispatch(setbetsdata(bets))
                    } else {
                        toast.warn(rdata.data)
                    }
                    setloadingindex("")
                    setloading(true)

                } else {
                    toast.warn("Please Try Again")
                }
            } else {
                toast.warn("Please Try Again")
            }
        }

        function getBackNum(d) {
            let b = d
            if (d.toString() === d.toFixed(1)) {
                b -= 1
            } else if (d.toString() === d.toFixed(0)) {
                b -= 1
            } else {
                b -= 0.1
            }
            return b
        }

        function getLayNum(d) {
            let b = d
            if (d.toString() === d.toFixed(1)) {
                b += 1
            } else if (d.toString() === d.toFixed(0)) {
                b += 1
            } else {
                b += 0.1
            }
            return b
        }
    }

    const ClearAction = (odd, index) => {

        let plobj = Object.assign({}, profitlossObj)
        if (plobj[odd.matchId] && plobj[odd.matchId][odd.marketId]) {
            delete plobj[odd.matchId][odd.marketId]
        }
        if (!odd.isfancy) {
            dispatch(setprofitlossObj(plobj))
        }

        let bets = Object.assign({}, betsdata)
        let stake = ""
        let profit = ""
        let betLoss = ""
        let row = bets[odd.matchId]['matkets'][odd.marketId]['odds'][index]
        row = { ...row, stake, profit, betLoss }
        bets[odd.matchId]['matkets'][odd.marketId]['odds'][index] = row
        dispatch(setbetsdata(bets))
        dispatch(setOdditem(null))
    }

    const PriceChange = (value, odd, index) => {
        let bets = Object.assign({}, betsdata)
        let profit = ""
        let betLoss = ""
        let price = Number(value)
        if (price > 0) {
            // let stake = Number(odd.stake)
            // profit = (price * stake).toFixed(2)
            // price = value
            profit = getProfitLoose(odd.stake, price, odd).profit
            betLoss = getProfitLoose(odd.stake, price, odd).betLoss
        } else {
            price = value
        }

        let row = bets[odd.matchId]['matkets'][odd.marketId]['odds'][index]

        row = { ...row, profit, price, betLoss }
        bets[odd.matchId]['matkets'][odd.marketId]['odds'][index] = row
        dispatch(setbetsdata(bets))
        let betsarray = []
        betsarray = JSON.parse(JSON.stringify(openbets))
        betsarray.push(row)
        let PNL = getPNL(betsarray, activeodds)
        storeprofitloss(PNL, betsarray[0].matchId)
        dispatch(setOdditem(odd))

    }

    const selectStakeChange = (value, odd, index) => {

        let bets = Object.assign({}, betsdata)
        let stake = Number(odd.stake) + Number(value)
        let profit = ""
        let betLoss = ""
        if (stake > 0) {
            profit = getProfitLoose(stake, odd.price, odd).profit
            betLoss = getProfitLoose(stake, odd.price, odd).betLoss
        } else {
            stake = value
        }

        let row = bets[odd.matchId]['matkets'][odd.marketId]['odds'][index]
        row = { ...row, stake, profit, betLoss }
        bets[odd.matchId]['matkets'][odd.marketId]['odds'][index] = row
        dispatch(setbetsdata(bets))
        let betsarray = []
        betsarray = JSON.parse(JSON.stringify(openbets))
        betsarray.push(row)
        let PNL = getPNL(betsarray, activeodds)
        storeprofitloss(PNL, odd.matchId)
        dispatch(setOdditem(odd))
    }

    const storeprofitloss = (PNL, matchId) => {
        let profitobj = Object.assign({}, profitlossObj)
        if (profitobj[matchId]) {
            profitobj[matchId] = PNL
        } else {
            profitobj[matchId] = {}
            profitobj[matchId] = PNL
        }
        dispatch(setprofitlossObj(profitobj))
    }

    const StakeChange = (value, odd, index) => {
        let bets = Object.assign({}, betsdata)
        let stake = Number(value)
        let profit = ""
        let betLoss = ""
        if (stake > 0) {
            // let price = (odd.price) - 1
            // profit = (price * stake).toFixed(2)
            stake = Number(value).toFixed(0)
            profit = getProfitLoose(stake, odd.price, odd).profit
            betLoss = getProfitLoose(stake, odd.price, odd).betLoss

        } else {
            stake = value
        }
        let row = bets[odd.matchId]['matkets'][odd.marketId]['odds'][index]
        row = { ...row, stake, profit, betLoss }
        bets[odd.matchId]['matkets'][odd.marketId]['odds'][index] = row
        dispatch(setbetsdata(bets))

        let betsarray = []
        betsarray = JSON.parse(JSON.stringify(openbets))
        betsarray.push(row)
        let PNL = getPNL(betsarray, activeodds)
        storeprofitloss(PNL, betsarray[0].matchId)
        dispatch(setOdditem(odd))

    }

    const IncreasePrice = (odd, index) => {
        let bets = Object.assign({}, betsdata)
        let price = bets[odd.matchId]['matkets'][odd.marketId]['odds'][index].price
        price = Number(price)
        if (price < 2) {
            price += 0.01
        } else if (price < 3) {
            price += 0.02
        } else if (price < 4) {
            price += 0.05
        } else if (price < 6) {
            price += 0.1
        } else if (price < 10) {
            price += 0.2
        } else if (price < 20) {
            price += 0.5
        } else if (price < 30) {
            price += 1
        } else if (price < 50) {
            price += 2
        } else if (price <= 100) {
            price += 5
        } else if (price > 100) {
            price += 10
        }

        price = Number((price).toFixed(2))
        // let profit = (price * odd.stake).toFixed(2)
        let { profit, betLoss } = getProfitLoose(odd.stake, price, odd)
        let row = bets[odd.matchId]['matkets'][odd.marketId]['odds'][index]
        row = { ...row, price, profit, betLoss }
        bets[odd.matchId]['matkets'][odd.marketId]['odds'][index] = row

        dispatch(setbetsdata(bets))
        let betsarray = []
        betsarray = JSON.parse(JSON.stringify(openbets))
        betsarray.push(row)
        let PNL = getPNL(betsarray, activeodds)
        storeprofitloss(PNL, betsarray[0].matchId)
        dispatch(setOdditem(odd))

    }

    const DecreasePrice = (odd, index) => {
        let bets = Object.assign({}, betsdata)
        let price = bets[odd.matchId]['matkets'][odd.marketId]['odds'][index].price
        price = Number(price)
        if (price < 2) {
            price -= 0.01
        } else if (price < 3) {
            price -= 0.02
        } else if (price < 4) {
            price -= 0.05
        } else if (price < 6) {
            price -= 0.1
        } else if (price < 10) {
            price -= 0.2
        } else if (price < 20) {
            price -= 0.5
        } else if (price < 30) {
            price -= 1
        } else if (price < 50) {
            price -= 2
        } else if (price <= 100) {
            price -= 5
        } else if (price > 100) {
            price -= 10
        }

        price = Number((price).toFixed(2))

        // let profit = (price * odd.stake).toFixed(2)
        let { profit, betLoss } = getProfitLoose(odd.stake, price, odd)
        let row = bets[odd.matchId]['matkets'][odd.marketId]['odds'][index]
        row = { ...row, price, profit, betLoss }

        bets[odd.matchId]['matkets'][odd.marketId]['odds'][index] = row

        let betsarray = []

        betsarray = JSON.parse(JSON.stringify(openbets))

        betsarray.push(row)

        let PNL = getPNL(betsarray, activeodds)
        dispatch(setOdditem(odd))

        storeprofitloss(PNL, betsarray[0].matchId)
    }

    const setbetslip = (params) => {
        dispatch(setBetslip(params))
    }


    return (
        <Fragment>
            {
                betslip && !sports ?
                    <div className="betexchgbetslip">
                        {
                            Object.keys(betsdata).length ?
                                <React.Fragment>
                                    <Card >
                                        <Nav tabs justified>
                                            <NavItem>
                                                <NavLink
                                                    active={active === '1'}
                                                    onClick={() => {
                                                        toggle('1')
                                                    }}
                                                >
                                                    BetSlip
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    active={active === '2'}
                                                    onClick={() => {
                                                        toggle('2')
                                                    }}
                                                >
                                                    All Bets
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink onClick={() => setbetslip(!betslip)}>
                                                    {/* {
                                                        betslip ?
                                                            <Minimize2 /> : */}
                                                    <Maximize2 />
                                                    {/* } */}
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                        <TabContent className='py-50' activeTab={active}>
                                            <TabPane tabId='1'>
                                                {
                                                    betslip ?
                                                        <>
                                                            {
                                                                Object.values(betsdata).map((match, i) => (
                                                                    <div className="slipitem" key={i}>
                                                                        <div className="slipmarketname">
                                                                            {
                                                                                match.matchName
                                                                            }
                                                                        </div>
                                                                        {
                                                                            Object.values(match.matkets).map((market, j) => (
                                                                                market.odds.map((odd, k) => (
                                                                                    <div className="betitem" key={j + k}>
                                                                                        {
                                                                                            !loading && loadingindex === (j + k) ?
                                                                                                <div className="exchangebetsliploading">
                                                                                                    <Loader type="Oval" color="#00BFFF" height={100} width={100} />
                                                                                                </div> : ""
                                                                                        }
                                                                                        <div className="oddname">
                                                                                            {market.marketName}
                                                                                            <span className="color-white">
                                                                                                {odd.oddName}
                                                                                            </span>
                                                                                        </div>
                                                                                        <div className={"oddcalc " + odd.backlay}>
                                                                                            <div className="oddcalcitem">
                                                                                                <div className="minus" onClick={() => DecreasePrice(odd, k)} >
                                                                                                    <Minus size="15" />
                                                                                                </div>
                                                                                                <Input value={odd.price} onChange={(e) => PriceChange(e.target.value, odd, k)} type="number" />
                                                                                                <div className="betstake text-uppercase">
                                                                                                    {
                                                                                                        odd.backlay
                                                                                                    }
                                                                                                </div>
                                                                                                <div className="plus" onClick={() => IncreasePrice(odd, k)}>
                                                                                                    <Plus size="15" />
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="oddcalcitem">
                                                                                                <Input value={odd.stake} type="number" onChange={(e) => StakeChange(e.target.value, odd, k)} />
                                                                                                <div className="betstake">
                                                                                                    stake
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="oddcalcitem">
                                                                                                <Input value={odd.backlay === "back" ? odd.profit : odd.betLoss} disabled={true} type="number" />
                                                                                                <div className="betstake">{odd.backlay === "back" ? "PROFIT" : "LIABILITY"}
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="oddstake">
                                                                                            <Row className="m-0 w-100">
                                                                                                <div className="w-25 oddstakevalue" onClick={() => selectStakeChange(100, odd, k)}>
                                                                                                    <span>
                                                                                                        100
                                                                                                    </span>
                                                                                                </div>
                                                                                                <div className="w-25 oddstakevalue" onClick={() => selectStakeChange(500, odd, k)}>
                                                                                                    <span>
                                                                                                        500
                                                                                                    </span>
                                                                                                </div>
                                                                                                <div className="w-25 oddstakevalue" onClick={() => selectStakeChange(1000, odd, k)}>
                                                                                                    <span>
                                                                                                        1k
                                                                                                    </span>
                                                                                                </div>
                                                                                                <div className="w-25 oddstakevalue" onClick={() => selectStakeChange(5000, odd, k)}>
                                                                                                    <span>
                                                                                                        5k
                                                                                                    </span>
                                                                                                </div>
                                                                                            </Row>
                                                                                            <Row className="m-0 w-100">
                                                                                                <div className="w-50 oddstakevalue" onClick={() => selectStakeChange(10000, odd, k)}>
                                                                                                    <span>
                                                                                                        10k

                                                                                                    </span>
                                                                                                </div>
                                                                                                <div className="w-50 oddstakevalue" onClick={() => selectStakeChange(20000, odd, k)}>
                                                                                                    <span>
                                                                                                        20k
                                                                                                    </span>
                                                                                                </div>
                                                                                            </Row>
                                                                                        </div>
                                                                                        <div className="oddbutton">
                                                                                            <div className="buttons " onClick={() => CancelAction(odd, k)}>
                                                                                                <span className="cancel">
                                                                                                    CANCEL
                                                                                                </span>
                                                                                            </div>
                                                                                            <div className="buttons ">
                                                                                                <span className="clear" onClick={() => ClearAction(odd, k)} >
                                                                                                    CLEAR
                                                                                                </span>
                                                                                            </div>
                                                                                            <div className={"buttons " + (!loading ? "submitloading" : "")}>

                                                                                                <span className="placebet" onClick={() => PlaceBet(odd, k, (j + k))}>
                                                                                                    PLACE BET
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                ))
                                                                            ))
                                                                        }
                                                                    </div>
                                                                ))
                                                            }
                                                        </> : null
                                                }
                                            </TabPane>
                                            <TabPane tabId='2'>
                                                All Bets
                                            </TabPane>
                                        </TabContent>
                                    </Card>
                                </React.Fragment> : null
                        }
                    </div>
                    : null
            }
        </Fragment>
    )
}

export default Betslip