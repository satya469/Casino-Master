import React, { Fragment, useContext, useEffect, useState } from "react"
import { TabContent, Nav, NavItem, NavLink, Card, Row, } from 'reactstrap'
import { getmarkets, getSportlist, setactiveSport, setmatchelist, setSportslist, setodds, setallmatchelist, setmatches, destryoddsSession, setbetsdata, dateConvert, getopenbets, setopenbets, setBetslip, setprofitlossObj, getPNL } from "../../redux/actions/betexchg"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import querystring from "query-string"
import { LoadingContext } from "../../utility/loading"
import Category from "./category"
import { ChevronDown, ChevronRight, Minus } from "react-feather"
import BetWidget from "./BetWidget"
import { Root } from "../../authServices/rootconfig"
import Media from 'react-media'
import Betslip from "./betslip"
import { UserContext } from "../../utility/UserContext"
import axios from "axios"

const Menus = [
    {
        label: "ALL",
        value: "111"
    },
    {
        label: "Match Odds",
        value: "Match Odds"
    },
    {
        label: "Bookmaker",
        value: "Bookmaker"
    },
    {
        label: "FANCY",
        value: "fancys"
    },
    {
        label: "other",
        value: "other"
    },

]

const Odds = () => {
    const [active, setActive] = useState(Menus[0])
    const [SelectOdds, setSelectOdds] = useState({})

    const { user, sports } = useContext(UserContext)

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }
    const history = useHistory()
    const { showLoading, hideLoading } = useContext(LoadingContext)
    const { activeSport, matchelist, Sportlist, Inplay, activeodds, profitlossObj, lastactiveodds, activematche,openbets } = useSelector(state => state.betexch)
    const dispatch = useDispatch()

    const load = async () => {
        showLoading()
        if (!Sportlist.length) {
            let rdata = await getSportlist()
            if (rdata.status) {
                let geteventtype = querystring.parse(history.location.search).eventname
                if (geteventtype) {
                    let item = rdata.data.find(obj => geteventtype === obj.name)
                    if (item) {
                        dispatch(setactiveSport(item))
                    } else {
                        dispatch(setactiveSport(Inplay))
                    }
                } else {
                    dispatch(setactiveSport(Inplay))
                }
                dispatch(setSportslist(rdata.data))

            } else {

            }
        } else {

        }
        hideLoading()
    }

    const loadmarkets = async () => {
        showLoading()
        if (!matchelist.length) {
            let rdata = await getmarkets({ row: activeSport })
            if (rdata.status) {
                dispatch(setmatchelist(rdata.data))
                dispatch(setallmatchelist(rdata.data))
            }
        } else {

        }
        hideLoading()
    }
    const getMinMax = (params) => {
        if (activeSport && activeSport.minmaxvalue) {
            return `Min: ${activeSport.minmaxvalue.minvalue} Max: ${activeSport.minmaxvalue.maxvalue / 1000}k `
        } else {
            return "Min: 100 Max: 1k"
        }
    }

    const getfancy_bookmaker_MinMax = (item) => {
        if (item && item.limits) {
            return `Min: ${item.limits.MinimumBet} Max: ${item.limits.MaximumBet / 1000}k `
        } else {
            return "Min: 100 Max: 1k"
        }
    }

    const arrayMaxordersort = (array, index, bookmaker) => {
        if (array.length) {
            let news = array.sort(function (b, c) {
                return b.price - c.price
            })
            if (news[index] && parseInt(news[index].price) > 0) {
                if (bookmaker) {
                    return Number(news[index].price) >= 0 ? Number(news[index].price).toFixed(0) : ""
                } else {
                    return (news[index].price)
                }
            } else {
                return <Minus />
            }
        } else {
            return <Minus />
        }
    }

    const arrayMaxordersort1 = (array, index) => {
        if (array.length) {
            let news = array.sort(function (b, c) {
                return b.price - c.price
            })
            return news[index] && parseInt(news[index].price) > 0 ? (news[index].price) : ""
        } else {
            return ""
        }
    }

    const NumberClear = (number, index, bookmaker) => {
        if (number[index]) {
            if (parseInt(number[index].size) > 0) {
                if (bookmaker) {
                    return Number(number[index].size) >= 0 ? Number(number[index].size).toFixed(0) : ""
                } else {
                    return (number[index].size)
                }
            } else {
                return ""
            }
        } else {
            return ""
        }
    }

    const oddsClick = (odditem, item, itemj, back, index, oddprice) => {

        let price = ""
        let selectionId = ""
        let oddName = ""
        if (itemj.value === "Bookmaker") {
            selectionId = odditem.selectionId
            price = (odditem[back][index].price)
            // price = oddprice
            oddName = odditem.name
            oddprice = (Number(price) / 100).toFixed(2)
        } else if (itemj.value === "fancys") {
            selectionId = odditem.SelectionId
            // price = (index)
            price = oddprice
            oddName = odditem.RunnerName
            oddprice = (Number(oddprice) / 100).toFixed(2)
        } else {
            selectionId = odditem.selectionId
            price = odditem[back][index].price
            oddName = odditem.name
        }

        if (Number(price) <= 0) {
            return
        }
        let marketId = item.marketId
        let marketName = item.marketName
        let matchTime = new Date(activeodds.event.openDate).toString()
        let matchId = activeodds.event.id
        let matchName = activeodds.event.name
        let competitionName = activematche.competition.name
        let competitionid = activematche.competition.id
        let row = {
            selectionId,
            marketId,
            matchId,
            oddName,
            marketName,
            matchName,
            matchTime,
            price,
            backlay: back,
            profit: 0,
            stake: 0,
            status: "Matched",
            sportid: activematche.sport._id,
            isfancy: itemj.value === "fancys" ? true : false,
            bookmaker: itemj.value === "Bookmaker" ? true : false,
            matchodd: itemj.value === "Match Odds" || itemj.value === "other" ? true : false,
            oddprice,
            competitionName,
            competitionid,
            betLoss: 0
        }
        let bets = {}
        if (bets[matchId]) {
            if (bets[matchId]['matkets'][marketId]) {
                bets[matchId]['matkets'][marketId]['odds'].push(row)
            } else {
                bets[matchId]['matkets'][marketId] = {
                    marketName,
                    odds: []
                }
                bets[matchId]['matkets'][marketId]['odds'].push(row)
            }
        } else {
            bets[matchId] = {
                matchName,
                matkets: {
                    [marketId]: {
                        marketName,
                        odds: []
                    }
                }
            }
            bets[matchId]['matkets'][marketId]['odds'].push(row)
        }

        dispatch(setbetsdata(bets))
        dispatch(setBetslip(true))

    }

    const getfancy = (LayPrice1, LaySize1) => {
        if (Number(LayPrice1) === 0 || Number(LaySize1) === 0) {
            return <Fragment>
                <Minus />
            </Fragment>
        } else {
            return <Fragment>
                <div className="fontprice">
                    {
                        Number(LayPrice1).toFixed(0)
                    }
                </div>
                <div className="fontsize">
                    {
                        Number(LaySize1).toFixed(0)
                    }
                </div>
            </Fragment>
        }
    }

    const getOddsChangingClass = (odditem, item, itemj, back, index, oddprice) => {
        if (lastactiveodds && Object.keys(lastactiveodds).length) {
            if (lastactiveodds['markets'][itemj.value] && lastactiveodds['markets'][itemj.value]['odds']) {
                let lastodd = lastactiveodds['markets'][itemj.value]['odds'].find(obj => obj.selectionId === odditem.selectionId)
                if (lastodd) {
                    let lastodds = arrayMaxordersort1(lastodd[back], index)
                    let currentodds = arrayMaxordersort1(odditem[back], index)
                    if (lastodds === currentodds) {
                        return ""
                    } else {
                        return " changingoddsclass"
                    }
                } else {
                    return " changingoddsclass"
                }
            } else {
                return " changingoddsclass"
            }
        } else {
            return ""
        }
    }

    const getcolordiv = (params) => {
        if (params < 0) {
            return <div className="red-lay">
                {
                    Math.abs(params)
                }
            </div>
        } else {
            return <div className="red-back">
                {
                    params
                }
            </div>
        }
    }


    const mobileoddsitemRender = () => {
        let rows = []
        if (active.value !== "111") {
            let value = active.value
            let m = activeodds.markets[value]

            if (m) {

                if (m.length) {
                    rows.push({
                        label: active.label,
                        value: active.value,
                        active: m
                    })
                } else {
                    rows.push({
                        label: active.label,
                        value: active.value,
                        active: [
                            m
                        ]
                    })
                }
            }
        } else {
            for (let i in Menus) {
                let at = Menus[i].value
                if (activeodds.markets) {
                    let m = activeodds.markets[at]
                    if (m) {
                        if (m.length) {
                            rows.push({
                                label: Menus[i].label,
                                value: at,
                                active: m
                            })
                        } else {
                            rows.push({
                                label: Menus[i].label,
                                value: at,
                                active: [
                                    m
                                ]
                            })
                        }

                    }
                }
            }
        }
        return <Fragment>
            <div className="odditem">
                {
                    rows.map((itemj, j) => (
                        <Fragment key={j}>
                            {
                                itemj.value === "Match Odds" ?
                                    <Fragment>
                                        <div className="oddsitemheader">
                                            <div className="w-60 text-uppercase">
                                                {itemj.label}
                                            </div>
                                            <Row className="w-40 m-0 d-flex justify-content-end">

                                                <div className="back">
                                                    <span className="color-white">
                                                        BACK
                                                    </span>
                                                </div>
                                                <div className="lay">
                                                    <span className="symbol">
                                                        LAY
                                                    </span>
                                                    <span className="symbol">
                                                        {
                                                            SelectOdds[j] ?
                                                                <ChevronRight onClick={() => setSelectOdds({ ...SelectOdds, [j]: false })} /> :
                                                                <ChevronDown onClick={() => setSelectOdds({ ...SelectOdds, [j]: true })} />
                                                        }
                                                    </span>
                                                </div>
                                            </Row>
                                        </div>
                                        {
                                            !SelectOdds[j] ? itemj.active.map((item, i) => (
                                                item.odds.map((odditem, o) => (
                                                    <Fragment key={i + o}>
                                                        <div className="oddsitembody">
                                                            <div className="w-60 matchoddtitle">
                                                                <div>
                                                                    {
                                                                        odditem.name
                                                                    }
                                                                </div>

                                                                {
                                                                    profitlossObj[activeodds.event.id]
                                                                        && profitlossObj[activeodds.event.id]['matchodd']
                                                                        && profitlossObj[activeodds.event.id]['matchodd'][item.marketId]
                                                                        && profitlossObj[activeodds.event.id]['matchodd'][item.marketId][odditem.selectionId] ?
                                                                        getcolordiv(profitlossObj[activeodds.event.id]['matchodd'][item.marketId][odditem.selectionId]) : ""
                                                                }
                                                            </div>
                                                            <Row className="w-40 m-0 d-flex justify-content-end">
                                                                <div className="backlay">

                                                                    <div className={"item backcolor" + getOddsChangingClass(odditem, item, itemj, "back", 2)} onClick={() => oddsClick(odditem, item, itemj, "back", 2)} >
                                                                        <div className="fontprice">
                                                                            {
                                                                                arrayMaxordersort(odditem.back, 2)
                                                                            }
                                                                        </div>
                                                                        <div className="fontsize">
                                                                            {
                                                                                NumberClear(odditem.back, 2)
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="backlay">
                                                                    <div className={"item laycolor" + getOddsChangingClass(odditem, item, itemj, "lay", 2)} onClick={() => oddsClick(odditem, item, itemj, "lay", 2)} >
                                                                        <div className="fontprice">
                                                                            {
                                                                                arrayMaxordersort(odditem.lay, 2)
                                                                            }
                                                                        </div>
                                                                        <div className="fontsize">
                                                                            {
                                                                                NumberClear(odditem.lay, 2)
                                                                            }
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </Row>
                                                        </div>

                                                    </Fragment>
                                                ))
                                            )) : null
                                        }

                                        <div className="oddsitemfooter">
                                            <span>
                                                {
                                                    getMinMax()
                                                }
                                            </span>
                                        </div>
                                    </Fragment> :
                                    itemj.value === "fancys" ?
                                        <Fragment>

                                            <Row className="m-0">
                                                <div className="w-100">
                                                    <div className="w-100">

                                                        <div className="fancyitemheader  text-uppercase">
                                                            <div className="w-60">
                                                                {itemj.label}
                                                            </div>
                                                            <Row className="w-40 m-0 d-flex justify-content-end">
                                                                <div className="lay">
                                                                    <span className="symbol">
                                                                        NO
                                                                    </span>
                                                                </div>
                                                                <div className="back">
                                                                    <span className="color-white">
                                                                        YES
                                                                    </span>
                                                                    <span className="symbol">
                                                                        {
                                                                            SelectOdds[j] ?
                                                                                <ChevronRight onClick={() => setSelectOdds({ ...SelectOdds, [j]: false })} /> :
                                                                                <ChevronDown onClick={() => setSelectOdds({ ...SelectOdds, [j]: true })} />
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                    {
                                                        !SelectOdds[j] ? itemj.active.map((item, i) => (
                                                            item.odds.map((odditem, o) => (
                                                                <Fragment key={i + o}>
                                                                    <div className="fancyitembody">
                                                                        <div className="w-60 matchoddtitle">
                                                                            <div>
                                                                                {
                                                                                    odditem.RunnerName
                                                                                }
                                                                            </div>

                                                                            {
                                                                                profitlossObj[activeodds.event.id]
                                                                                    && profitlossObj[activeodds.event.id]['isfancy']
                                                                                    && profitlossObj[activeodds.event.id]['isfancy'][item.marketId]
                                                                                    && profitlossObj[activeodds.event.id]['isfancy'][item.marketId][odditem.selectionId] ?
                                                                                    getcolordiv(profitlossObj[activeodds.event.id]['isfancy'][item.marketId][odditem.selectionId]) : ""
                                                                            }
                                                                        </div>
                                                                        <Row className="w-40 m-0 d-flex justify-content-end">
                                                                            <div className=" position-relative d-flex">
                                                                                {
                                                                                    odditem.GameStatus === "SUSPENDED" ?
                                                                                        <div className="suspend">
                                                                                            <span >
                                                                                                SUSPENDED
                                                                                            </span>
                                                                                        </div> : ""
                                                                                }
                                                                                <div className="backlay" onClick={() => oddsClick(odditem, item, itemj, "lay", odditem.LayPrice1, odditem.LaySize1,)}  >
                                                                                    <div className="item laycolor">
                                                                                        {
                                                                                            getfancy(odditem.LayPrice1, odditem.LaySize1)
                                                                                        }
                                                                                    </div>

                                                                                </div>
                                                                                <div className="backlay" onClick={() => oddsClick(odditem, item, itemj, "back", odditem.BackPrice1, odditem.BackSize1)}  >

                                                                                    <div className="item backcolor">
                                                                                        {
                                                                                            getfancy(odditem.LayPrice1, odditem.LaySize1)
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Row>
                                                                    </div>
                                                                </Fragment>
                                                            ))
                                                        )) : null
                                                    }
                                                    <div className="oddsitemfooter">
                                                        <span>
                                                            {
                                                                getMinMax()
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="w-50">
                                                </div>
                                            </Row>
                                        </Fragment> :
                                        itemj.value === "Bookmaker" ?
                                            <Fragment>
                                                <div className="oddsitemheader">
                                                    <div className="w-60 text-uppercase">
                                                        {itemj.label}
                                                    </div>
                                                    <Row className="w-40 m-0 d-flex justify-content-end">

                                                        <div className="back">
                                                            <span className="color-white">
                                                                BACK
                                                            </span>
                                                        </div>
                                                        <div className="lay">
                                                            <span className="symbol">
                                                                LAY
                                                            </span>
                                                            <span className="symbol">
                                                                {
                                                                    SelectOdds[j] ?
                                                                        <ChevronRight onClick={() => setSelectOdds({ ...SelectOdds, [j]: false })} /> :
                                                                        <ChevronDown onClick={() => setSelectOdds({ ...SelectOdds, [j]: true })} />
                                                                }
                                                            </span>
                                                        </div>

                                                    </Row>
                                                </div>
                                                {
                                                    !SelectOdds[j] ? itemj.active.map((item, i) => (
                                                        item.odds.map((odditem, o) => (
                                                            <Fragment key={i + o}>
                                                                <div className="oddsitembody">
                                                                    <div className="w-60 matchoddtitle">
                                                                        <div>
                                                                            {
                                                                                odditem.name
                                                                            }

                                                                        </div>
                                                                        {
                                                                            profitlossObj[activeodds.event.id]
                                                                                && profitlossObj[activeodds.event.id]['bookmaker']
                                                                                && profitlossObj[activeodds.event.id]['bookmaker'][item.marketId]
                                                                                && profitlossObj[activeodds.event.id]['bookmaker'][item.marketId][odditem.selectionId] ?
                                                                                getcolordiv(profitlossObj[activeodds.event.id]['bookmaker'][item.marketId][odditem.selectionId]) : ""
                                                                        }
                                                                    </div>
                                                                    <Row className="w-40 m-0 d-flex justify-content-end">
                                                                        <div className=" position-relative d-flex">
                                                                            {
                                                                                odditem.status === "SUSPENDED" ?
                                                                                    <div className="suspend">
                                                                                        <span >
                                                                                            SUSPENDED
                                                                                        </span>
                                                                                    </div>

                                                                                    : ""
                                                                            }
                                                                            <div className="backlay">

                                                                                <div className="item backcolor" onClick={() => oddsClick(odditem, item, itemj, "back", 2)} >
                                                                                    <div className="fontprice">
                                                                                        {
                                                                                            arrayMaxordersort(odditem.back, 2, true)
                                                                                        }
                                                                                    </div>
                                                                                    <div className="fontsize">
                                                                                        {
                                                                                            NumberClear(odditem.back, 2, true)
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="backlay">

                                                                                <div className="item laycolor" onClick={() => oddsClick(odditem, item, itemj, "lay", 2)} >
                                                                                    <div className="fontprice">
                                                                                        {
                                                                                            arrayMaxordersort(odditem.lay, 0, true)
                                                                                        }
                                                                                    </div>
                                                                                    <div className="fontsize">
                                                                                        {
                                                                                            NumberClear(odditem.lay, 0, true)
                                                                                        }
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Row>
                                                                </div>

                                                            </Fragment>
                                                        ))
                                                    )) : null
                                                }

                                                <div className="oddsitemfooter">
                                                    <span>
                                                        {
                                                            getMinMax()
                                                        }
                                                    </span>
                                                </div>
                                            </Fragment> :
                                            <Fragment>
                                                <div className="oddsitemheader">
                                                    <div className="w-60 text-uppercase">
                                                        {itemj.label}
                                                    </div>
                                                    <Row className="w-40 m-0 d-flex justify-content-end">

                                                        <div className="back">
                                                            <span className="color-white">
                                                                BACK
                                                            </span>
                                                        </div>
                                                        <div className="lay">
                                                            <span className="symbol">
                                                                LAY
                                                            </span>
                                                            <span className="symbol">
                                                                {
                                                                    SelectOdds[j] ?
                                                                        <ChevronRight onClick={() => setSelectOdds({ ...SelectOdds, [j]: false })} /> :
                                                                        <ChevronDown onClick={() => setSelectOdds({ ...SelectOdds, [j]: true })} />
                                                                }
                                                            </span>
                                                        </div>
                                                    </Row>
                                                </div>
                                                {
                                                    !SelectOdds[j] ? itemj.active.map((item, i) => (
                                                        item.odds.map((odditem, o) => (

                                                            <Fragment key={i + o}>
                                                                <div className="oddsitembody">


                                                                    <div className="w-60 matchoddtitle">
                                                                        <div>
                                                                            {
                                                                                odditem.name
                                                                            }

                                                                        </div>
                                                                        {
                                                                            profitlossObj[activeodds.event.id]
                                                                                && profitlossObj[activeodds.event.id]['matchodd']
                                                                                && profitlossObj[activeodds.event.id]['matchodd'][item.marketId]
                                                                                && profitlossObj[activeodds.event.id]['matchodd'][item.marketId][odditem.selectionId] ?
                                                                                getcolordiv(profitlossObj[activeodds.event.id]['matchodd'][item.marketId][odditem.selectionId]) : ""
                                                                        }
                                                                    </div>
                                                                    <Row className="w-40 m-0 d-flex justify-content-end ">
                                                                        <div className=" position-relative d-flex">
                                                                            {
                                                                                odditem.status === "SUSPENDED" ?
                                                                                    <div className="suspend">
                                                                                        <span >
                                                                                            SUSPENDED
                                                                                        </span>
                                                                                    </div>
                                                                                    : ""
                                                                            }
                                                                            <div className="backlay">

                                                                                <div className="item backcolor" onClick={() => oddsClick(odditem, item, itemj, "back", odditem.back.length - 1)} >
                                                                                    <div className="fontprice">
                                                                                        {
                                                                                            arrayMaxordersort(odditem.back, odditem.back.length - 1)
                                                                                        }
                                                                                    </div>
                                                                                    <div className="fontsize">
                                                                                        {
                                                                                            NumberClear(odditem.back, odditem.back.length - 1)
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="backlay">

                                                                                <div className="item laycolor" onClick={() => oddsClick(odditem, item, itemj, "lay", odditem.lay.length - 1)} >
                                                                                    <div className="fontprice">
                                                                                        {
                                                                                            arrayMaxordersort(odditem.lay, 0)
                                                                                        }
                                                                                    </div>
                                                                                    <div className="fontsize">
                                                                                        {
                                                                                            NumberClear(odditem.lay, 0)
                                                                                        }
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </Row>
                                                                </div>

                                                            </Fragment>
                                                        ))
                                                    )) : null
                                                }

                                                <div className="oddsitemfooter">
                                                    <span>
                                                        {
                                                            getMinMax()
                                                        }
                                                    </span>
                                                </div>
                                            </Fragment>
                            }

                        </Fragment>
                    ))
                }
            </div>
        </Fragment>
    }

    const oddsitemRender = () => {
        let rows = []
        if (active.value !== "111") {
            let value = active.value
            let m = activeodds.markets[value]

            if (m) {

                if (m.length) {
                    rows.push({
                        label: active.label,
                        value: active.value,
                        active: m
                    })
                } else {
                    rows.push({
                        label: active.label,
                        value: active.value,
                        active: [
                            m
                        ]
                    })
                }
            }
        } else {
            for (let i in Menus) {
                let at = Menus[i].value
                if (activeodds.markets) {
                    let m = activeodds.markets[at]
                    if (m) {
                        if (m.length) {
                            rows.push({
                                label: Menus[i].label,
                                value: at,
                                active: m
                            })
                        } else {
                            rows.push({
                                label: Menus[i].label,
                                value: at,
                                active: [
                                    m
                                ]
                            })
                        }

                    }
                }
            }
        }
        return <Fragment>
            <div className="odditem">
                {
                    rows.map((itemj, j) => (
                        <Fragment key={j}>

                            {
                                itemj.value === "Match Odds" ?
                                    <Fragment>
                                        <div className="oddsitemheader">
                                            <div className="w-30 text-uppercase">
                                                {itemj.label}
                                            </div>
                                            <Row className="w-70 m-0 d-flex justify-content-end">
                                                <div className="back">
                                                    <span className="color-white">
                                                        BACK
                                                    </span>
                                                </div>
                                                <div className="lay">
                                                    <span className="symbol">
                                                        LAY
                                                    </span>
                                                </div>
                                                <div className="lay none">
                                                </div>
                                                <div className="lay">
                                                    <span className="symbol">
                                                        {
                                                            SelectOdds[j] ?
                                                                <ChevronRight onClick={() => setSelectOdds({ ...SelectOdds, [j]: false })} /> :
                                                                <ChevronDown onClick={() => setSelectOdds({ ...SelectOdds, [j]: true })} />
                                                        }
                                                    </span>
                                                </div>
                                            </Row>
                                        </div>
                                        {
                                            !SelectOdds[j] ? itemj.active.map((item, i) => (
                                                item.odds.map((odditem, o) => (

                                                    <Fragment key={i + o}>
                                                        <div className="oddsitembody">
                                                            <div className="w-30 matchoddtitle">
                                                                <div>
                                                                    {
                                                                        odditem.name
                                                                    }
                                                                </div>
                                                                {
                                                                    profitlossObj[activeodds.event.id]
                                                                        && profitlossObj[activeodds.event.id]['matchodd']
                                                                        && profitlossObj[activeodds.event.id]['matchodd'][item.marketId]
                                                                        && profitlossObj[activeodds.event.id]['matchodd'][item.marketId][odditem.selectionId] ?
                                                                        getcolordiv(profitlossObj[activeodds.event.id]['matchodd'][item.marketId][odditem.selectionId]) : ""
                                                                }
                                                            </div>
                                                            <Row className="w-70 m-0 d-flex justify-content-end">
                                                                <div className=" position-relative d-flex">{
                                                                }
                                                                    {
                                                                        odditem.status === "SUSPENDED" ?
                                                                            <div className="suspend">
                                                                                <span >
                                                                                    SUSPENDED
                                                                                </span>
                                                                            </div> : ""
                                                                    }
                                                                    <div className="backlay">
                                                                        <div className={"item back" + getOddsChangingClass(odditem, item, itemj, "back", 0)} onClick={() => oddsClick(odditem, item, itemj, "back", 0)} >
                                                                            <div className={"fontprice"}>
                                                                                {
                                                                                    arrayMaxordersort(odditem.back, 0)
                                                                                }
                                                                            </div>
                                                                            <div className="fontsize">
                                                                                {
                                                                                    NumberClear(odditem.back, 0)
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <div className={"item back" + getOddsChangingClass(odditem, item, itemj, "back", 1)} onClick={() => oddsClick(odditem, item, itemj, "back", 1)} >
                                                                            <div className="fontprice">
                                                                                {
                                                                                    arrayMaxordersort(odditem.back, 1)
                                                                                }
                                                                            </div>
                                                                            <div className="fontsize">
                                                                                {
                                                                                    NumberClear(odditem.back, 1)
                                                                                }
                                                                            </div>

                                                                        </div>
                                                                        <div className={"item backcolor" + getOddsChangingClass(odditem, item, itemj, "back", 2)} onClick={() => oddsClick(odditem, item, itemj, "back", 2)} >
                                                                            <div className="fontprice">
                                                                                {
                                                                                    arrayMaxordersort(odditem.back, 2)
                                                                                }
                                                                            </div>
                                                                            <div className="fontsize">
                                                                                {
                                                                                    NumberClear(odditem.back, 2)
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="backlay">
                                                                        <div className={"item laycolor" + getOddsChangingClass(odditem, item, itemj, "lay", 0)} onClick={() => oddsClick(odditem, item, itemj, "lay", 0)} >
                                                                            <div className="fontprice">
                                                                                {
                                                                                    arrayMaxordersort(odditem.lay, 0)
                                                                                }
                                                                            </div>
                                                                            <div className="fontsize">
                                                                                {
                                                                                    NumberClear(odditem.lay, 0)
                                                                                }
                                                                            </div>

                                                                        </div>
                                                                        <div className={"item lay" + getOddsChangingClass(odditem, item, itemj, "lay", 1)} onClick={() => oddsClick(odditem, item, itemj, "lay", 1)} >
                                                                            <div className="fontprice">
                                                                                {
                                                                                    arrayMaxordersort(odditem.lay, 1)
                                                                                }
                                                                            </div>
                                                                            <div className="fontsize">
                                                                                {
                                                                                    NumberClear(odditem.lay, 1)
                                                                                }
                                                                            </div>

                                                                        </div>
                                                                        <div className={"item lay" + getOddsChangingClass(odditem, item, itemj, "lay", 2)} onClick={() => oddsClick(odditem, item, itemj, "lay", 2)} >
                                                                            <div className="fontprice">
                                                                                {
                                                                                    arrayMaxordersort(odditem.lay, 2)
                                                                                }
                                                                            </div>
                                                                            <div className="fontsize">
                                                                                {
                                                                                    NumberClear(odditem.lay, 2)
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Row>
                                                        </div>

                                                    </Fragment>
                                                ))
                                            )) : null
                                        }

                                        <div className="oddsitemfooter">
                                            <span>
                                                {
                                                    getMinMax()
                                                }
                                            </span>
                                        </div>
                                    </Fragment> :
                                    itemj.value === "fancys" ?
                                        <Fragment>
                                            <Row className="m-0">
                                                <div className="w-50">
                                                    <div className="fancyitemheader  text-uppercase">
                                                        <div className="w-60">
                                                            {itemj.label}
                                                        </div>
                                                        <Row className="w-40 m-0 d-flex justify-content-end">
                                                            <div className="lay">
                                                                <span className="symbol">
                                                                    NO
                                                                </span>
                                                            </div>
                                                            <div className="back">
                                                                <span className="color-white">
                                                                    Yes
                                                                </span>
                                                                <span className="symbol">
                                                                    {
                                                                        SelectOdds[j] ?
                                                                            <ChevronRight onClick={() => setSelectOdds({ ...SelectOdds, [j]: false })} /> :
                                                                            <ChevronDown onClick={() => setSelectOdds({ ...SelectOdds, [j]: true })} />
                                                                    }
                                                                </span>
                                                            </div>
                                                        </Row>

                                                    </div>
                                                </div>
                                                <div className="w-50">
                                                    <div className="fancyitemheader  text-uppercase">
                                                        <div className="w-60">
                                                            {itemj.label}
                                                        </div>
                                                        <Row className="w-40 m-0 d-flex justify-content-end">
                                                            <div className="lay">
                                                                <span className="symbol">
                                                                    NO
                                                                </span>
                                                            </div>
                                                            <div className="back d-flex">
                                                                <span className="color-white">
                                                                    Yes
                                                                </span>
                                                                <span className="symbol">
                                                                    {
                                                                        SelectOdds[j] ?
                                                                            <ChevronRight onClick={() => setSelectOdds({ ...SelectOdds, [j]: false })} /> :
                                                                            <ChevronDown onClick={() => setSelectOdds({ ...SelectOdds, [j]: true })} />
                                                                    }
                                                                </span>
                                                            </div>
                                                        </Row>

                                                    </div>
                                                </div>
                                            </Row>
                                            {
                                                !SelectOdds[j] ? itemj.active.map((item, i) => (
                                                    <Row className="m-0" key={i}>
                                                        {
                                                            item.odds.map((odditem, o) => (
                                                                <Fragment key={i + o}>
                                                                    <div className="w-50">
                                                                        <div className="fancyitembody">
                                                                            <div className="w-60 matchoddtitle">
                                                                                <div>
                                                                                    {
                                                                                        odditem.RunnerName
                                                                                    }
                                                                                </div>
                                                                                {
                                                                                    profitlossObj[activeodds.event.id]
                                                                                        && profitlossObj[activeodds.event.id]['isfancy']
                                                                                        && profitlossObj[activeodds.event.id]['isfancy'][item.marketId]
                                                                                        && profitlossObj[activeodds.event.id]['isfancy'][item.marketId][odditem.selectionId] ?
                                                                                        getcolordiv(profitlossObj[activeodds.event.id]['isfancy'][item.marketId][odditem.selectionId]) : ""
                                                                                }
                                                                            </div>
                                                                            <Row className="w-40 m-0 d-flex justify-content-end">
                                                                                <div className=" position-relative d-flex">
                                                                                    {
                                                                                        odditem.GameStatus === "SUSPENDED" ?
                                                                                            <div className="suspend">
                                                                                                <span >
                                                                                                    SUSPENDED
                                                                                                </span>
                                                                                            </div> : ""
                                                                                    }
                                                                                    <div className="backlay" onClick={() => oddsClick(odditem, item, itemj, "lay", odditem.LayPrice1, odditem.LaySize1)}  >
                                                                                        <div className="item laycolor">

                                                                                            {
                                                                                                getfancy(odditem.LayPrice1, odditem.LaySize1)
                                                                                            }

                                                                                        </div>

                                                                                    </div>
                                                                                    <div className="backlay" onClick={() => oddsClick(odditem, item, itemj, "back", odditem.BackPrice1, odditem.BackSize1)}  >

                                                                                        <div className="item backcolor">
                                                                                            {
                                                                                                getfancy(odditem.LayPrice1, odditem.LaySize1)
                                                                                            }
                                                                                            {/* <div className="fontprice">
                                                                                                    {
                                                                                                        getfancy(odditem.BackPrice1)
                                                                                                    }
                                                                                                </div>
                                                                                                <div className="fontsize">
                                                                                                    {
                                                                                                        getfancy(odditem.BackSize1)
                                                                                                    }
                                                                                                </div> */}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                            </Row>
                                                                        </div>
                                                                    </div>
                                                                </Fragment>
                                                            ))
                                                        }
                                                        <div className="oddsitemfooter w-100">
                                                            <span>
                                                                {
                                                                    getfancy_bookmaker_MinMax(item)
                                                                }
                                                            </span>
                                                        </div>
                                                    </Row>
                                                )) : null
                                            }

                                        </Fragment> :
                                        itemj.value === "Bookmaker" ?
                                            <Fragment>
                                                <div className="oddsitemheader">
                                                    <div className="w-30 text-uppercase">
                                                        {itemj.label}
                                                    </div>
                                                    <Row className="w-70 m-0 d-flex justify-content-end">

                                                        <div className="back">
                                                            <span className="color-white">
                                                                BACK
                                                            </span>
                                                        </div>
                                                        <div className="lay">
                                                            <span className="symbol">
                                                                LAY
                                                            </span>
                                                        </div>
                                                        <div className="lay none">
                                                        </div>
                                                        <div className="lay">
                                                            <span className="symbol">
                                                                {
                                                                    SelectOdds[j] ?
                                                                        <ChevronRight onClick={() => setSelectOdds({ ...SelectOdds, [j]: false })} /> :
                                                                        <ChevronDown onClick={() => setSelectOdds({ ...SelectOdds, [j]: true })} />
                                                                }
                                                            </span>
                                                        </div>

                                                    </Row>
                                                </div>
                                                {
                                                    !SelectOdds[j] ? itemj.active.map((item, i) => (
                                                        <Fragment key={i}>
                                                            {

                                                                item.odds.map((odditem, o) => (

                                                                    <Fragment key={i + o}>
                                                                        <div className="oddsitembody">
                                                                            <div className="w-30 matchoddtitle">
                                                                                <div>
                                                                                    {
                                                                                        odditem.name
                                                                                    }
                                                                                </div>
                                                                                {
                                                                                    profitlossObj[activeodds.event.id]
                                                                                        && profitlossObj[activeodds.event.id]['bookmaker']
                                                                                        && profitlossObj[activeodds.event.id]['bookmaker'][item.marketId]
                                                                                        && profitlossObj[activeodds.event.id]['bookmaker'][item.marketId][odditem.selectionId] ?
                                                                                        getcolordiv(profitlossObj[activeodds.event.id]['bookmaker'][item.marketId][odditem.selectionId]) : ""
                                                                                }
                                                                            </div>
                                                                            <Row className="w-70 m-0 d-flex justify-content-end position-relative">
                                                                                {
                                                                                    odditem.status === "SUSPENDED" ?
                                                                                        <div className="suspend">
                                                                                            <span >
                                                                                                SUSPENDED
                                                                                            </span>
                                                                                        </div>
                                                                                        : ""
                                                                                }
                                                                                <div className="backlay">
                                                                                    <div className="item back" onClick={() => oddsClick(odditem, item, itemj, "back", 0)} >
                                                                                        <div className="fontprice">
                                                                                            {
                                                                                                arrayMaxordersort(odditem.back, 0, true)
                                                                                            }
                                                                                        </div>
                                                                                        <div className="fontsize">
                                                                                            {
                                                                                                NumberClear(odditem.back, 0, true)
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="item back" onClick={() => oddsClick(odditem, item, itemj, "back", 1)} >
                                                                                        <div className="fontprice">
                                                                                            {
                                                                                                arrayMaxordersort(odditem.back, 1, true)
                                                                                            }
                                                                                        </div>
                                                                                        <div className="fontsize">
                                                                                            {
                                                                                                NumberClear(odditem.back, 1, true)
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="item backcolor" onClick={() => oddsClick(odditem, item, itemj, "back", 2)} >
                                                                                        <div className="fontprice">
                                                                                            {
                                                                                                arrayMaxordersort(odditem.back, 2, true)
                                                                                            }
                                                                                        </div>
                                                                                        <div className="fontsize">
                                                                                            {
                                                                                                NumberClear(odditem.back, 2, true)
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="backlay">
                                                                                    <div className="item laycolor" onClick={() => oddsClick(odditem, item, itemj, "lay", 0)} >
                                                                                        <div className="fontprice">
                                                                                            {
                                                                                                arrayMaxordersort(odditem.lay, 0, true)
                                                                                            }
                                                                                        </div>
                                                                                        <div className="fontsize">
                                                                                            {
                                                                                                NumberClear(odditem.lay, 0, true)
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="item lay" onClick={() => oddsClick(odditem, item, itemj, "lay", 1)} >
                                                                                        <div className="fontprice">
                                                                                            {
                                                                                                arrayMaxordersort(odditem.lay, 1, true)
                                                                                            }
                                                                                        </div>
                                                                                        <div className="fontsize">
                                                                                            {
                                                                                                NumberClear(odditem.lay, 1, true)
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="item lay" onClick={() => oddsClick(odditem, item, itemj, "lay", 2)} >
                                                                                        <div className="fontprice">
                                                                                            {
                                                                                                arrayMaxordersort(odditem.lay, 2, true)
                                                                                            }
                                                                                        </div>
                                                                                        <div className="fontsize">
                                                                                            {
                                                                                                NumberClear(odditem.lay, 2, true)
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Row>
                                                                        </div>

                                                                    </Fragment>
                                                                ))
                                                            }
                                                            <div className="oddsitemfooter">
                                                                <span>
                                                                    {
                                                                        getfancy_bookmaker_MinMax(item)
                                                                    }
                                                                </span>
                                                            </div>
                                                        </Fragment>
                                                    )) : null
                                                }
                                            </Fragment> :
                                            <Fragment>
                                                <div className="oddsitemheader">
                                                    <div className="w-30 text-uppercase">
                                                        {itemj.label}
                                                    </div>
                                                    <Row className="w-70 m-0 d-flex justify-content-end">

                                                        <div className="back">
                                                            <span className="color-white">
                                                                BACK
                                                            </span>
                                                        </div>
                                                        <div className="lay">
                                                            <span className="symbol">
                                                                LAY
                                                            </span>
                                                        </div>

                                                        <div className="lay none">
                                                        </div>
                                                        <div className="lay">
                                                            <span className="symbol">
                                                                {
                                                                    SelectOdds[j] ?
                                                                        <ChevronRight onClick={() => setSelectOdds({ ...SelectOdds, [j]: false })} /> :
                                                                        <ChevronDown onClick={() => setSelectOdds({ ...SelectOdds, [j]: true })} />
                                                                }
                                                            </span>
                                                        </div>

                                                    </Row>
                                                </div>
                                                {
                                                    !SelectOdds[j] ? itemj.active.map((item, i) => (
                                                        item.odds.map((odditem, o) => (
                                                            <Fragment key={i + o}>
                                                                <div className="oddsitembody">
                                                                    <div className="w-30 matchoddtitle">
                                                                        <div>
                                                                            {
                                                                                odditem.name
                                                                            }
                                                                        </div>
                                                                        {
                                                                            profitlossObj[activeodds.event.id]
                                                                                && profitlossObj[activeodds.event.id]['matchodd']
                                                                                && profitlossObj[activeodds.event.id]['matchodd'][item.marketId]
                                                                                && profitlossObj[activeodds.event.id]['matchodd'][item.marketId][odditem.selectionId] ?
                                                                                getcolordiv(profitlossObj[activeodds.event.id]['matchodd'][item.marketId][odditem.selectionId]) : ""
                                                                        }
                                                                    </div>
                                                                    <Row className="w-70 m-0 d-flex justify-content-end position-relative">
                                                                        {
                                                                            odditem.status === "SUSPENDED" ?
                                                                                <div className="suspend">
                                                                                    <span >
                                                                                        SUSPENDED
                                                                                    </span>
                                                                                </div>
                                                                                : ""
                                                                        }
                                                                        <div className="backlay">
                                                                            <div className="item back" onClick={() => oddsClick(odditem, item, itemj, "back", 0)} >
                                                                                <div className="fontprice">
                                                                                    {
                                                                                        arrayMaxordersort(odditem.back, 0)
                                                                                    }
                                                                                </div>
                                                                                <div className="fontsize">
                                                                                    {
                                                                                        NumberClear(odditem.back, 0)
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="item back" onClick={() => oddsClick(odditem, item, itemj, "back", 1)} >
                                                                                <div className="fontprice">
                                                                                    {
                                                                                        arrayMaxordersort(odditem.back, 1)
                                                                                    }
                                                                                </div>
                                                                                <div className="fontsize">
                                                                                    {
                                                                                        NumberClear(odditem.back, 1)
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="item backcolor" onClick={() => oddsClick(odditem, item, itemj, "back", 2)} >
                                                                                <div className="fontprice">
                                                                                    {
                                                                                        arrayMaxordersort(odditem.back, 2)
                                                                                    }
                                                                                </div>
                                                                                <div className="fontsize">
                                                                                    {
                                                                                        NumberClear(odditem.back, 2)
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="backlay">
                                                                            <div className="item laycolor" onClick={() => oddsClick(odditem, item, itemj, "lay", 0)} >
                                                                                <div className="fontprice">
                                                                                    {
                                                                                        arrayMaxordersort(odditem.lay, 0)
                                                                                    }
                                                                                </div>
                                                                                <div className="fontsize">
                                                                                    {
                                                                                        NumberClear(odditem.lay, 0)
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="item lay" onClick={() => oddsClick(odditem, item, itemj, "lay", 1)} >
                                                                                <div className="fontprice">
                                                                                    {
                                                                                        arrayMaxordersort(odditem.lay, 1)
                                                                                    }
                                                                                </div>
                                                                                <div className="fontsize">
                                                                                    {
                                                                                        NumberClear(odditem.lay, 1)
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="item lay" onClick={() => oddsClick(odditem, item, itemj, "lay", 2)} >
                                                                                <div className="fontprice">
                                                                                    {
                                                                                        arrayMaxordersort(odditem.lay, 2)
                                                                                    }
                                                                                </div>
                                                                                <div className="fontsize">
                                                                                    {
                                                                                        NumberClear(odditem.lay, 2)
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Row>
                                                                </div>

                                                            </Fragment>
                                                        ))
                                                    )) : null
                                                }

                                                <div className="oddsitemfooter">
                                                    <span>
                                                        {
                                                            getMinMax()
                                                        }
                                                    </span>
                                                </div>
                                            </Fragment>
                            }

                        </Fragment>
                    ))
                }
            </div>
        </Fragment>
    }


    const openbetsload = async (params, activeodds) => {
        if (!sports) {
            let rdata = await getopenbets(params)
            if (rdata.status) {
                let bets = rdata.data
                let pnl = getPNL(bets, activeodds)
                storeprofitloss(pnl, bets[0].matchId)
                dispatch(setopenbets(bets))
            } else {
                dispatch(setopenbets([]))
            }
        } else {
            window.postMessage(JSON.stringify({ action: "openbetsload", value: params, activeodds }), "*")
        }
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


    const scoreLoad = async (matchid) => {
        let realIdData = await axios.get(`https://widgets.fn.sportradar.com/infinitygames/en/Etc:UTC/gismo/match_info/m${matchid}`);
        let realId = realIdData.data.queryUrl.split("/")[1];
        if (realId) {
            let oldP = document.getElementById("matchId");
            if (oldP) {
                oldP.parentNode.removeChild(oldP);
            }
            let oldS = document.getElementById("lmt-script");
            if (oldS) {
                oldS.parentNode.removeChild(oldS);
            }

            const P = document.createElement("p")
            P.id = "matchId"
            P.className = realId
            document.body.appendChild(P)

            const script = document.createElement("script")
            script.src = "/score-lmt.js"
            script.id = "lmt-script"
            script.async = true
            document.body.appendChild(script)
        }
    }

    /*eslint-disable */
    useEffect(() => {
        if (user && Object.keys(activeodds).length && openbets.length) {
            // let pnl = getPNL(openbets, activeodds)
            // storeprofitloss(pnl, openbets[0].matchId)
            // dispatch(setopenbets(openbets))
        }
    }, [user, activeodds])
    
    const loadmatch = () => {

        let params = querystring.parse(history.location.search)
        let competition = params.competition
        let eventid = params.eventid
        let eventname = params.eventname
        let request = true
        let Serlist = {}
        for (let i in matchelist) {
            Serlist = matchelist[i].Serlist.find(Obj => Obj.competition.name === competition)
            if (Serlist) {
                dispatch(setmatches(Serlist))
                let item = Serlist.matches.find(obj => obj.event.name === eventid)
                if (item) {
                    let matchid = item.event.id
                    openbetsload({ matchid }, item)
                    scoreLoad(matchid)
                    Root.socket.emit("setoddsSession", { data: item.event.id })
                    dispatch(setodds(item))
                    request = false
                } else {
                    // history.push(`${"betexchmain"}?eventname=${eventname}`)
                }
                break;
            } else {
            }
        }
        if (request) {
            history.push(`${"betexchmain"}?eventname=${eventname}`)
        }
    }


    useEffect(() => {
        if (matchelist && matchelist.length) {
            loadmatch()
        }
    }, [matchelist, Root.socket])

    useEffect(() => {
        if (activeSport && Object.keys(activeSport).length) {
            loadmarkets()
        }
    }, [activeSport])
    const setopenbetsload = (rdata, activeodds) => {
        let bets = rdata
        if (bets.length) {
            let pnl = getPNL(bets, activeodds)
            storeprofitloss(pnl, bets[0].matchId)
            dispatch(setopenbets(bets))
        } else {
            dispatch(setopenbets([]))
        }
    }

    useEffect(() => {
        load()
        document.addEventListener("message", function (event) {
            let d = JSON.parse(event.data)
            switch (d.action) {
                case "setprofitlossObj":
                    dispatch(setprofitlossObj(d.value))
                    break;
                    case "setopenbetsload":
                        setopenbetsload(d.value,d.activeodds)
                        break;
                default:
                    break;
            }
        }, false);

        return () => {
            dispatch(destryoddsSession())
        }
    }, [])

    /*eslint-enable */

    return (
        <div className="betexchmain">
            <Media queries={{ small: "(max-width: 768px)", large: "(min-width: 769px)" }}>
                {matches => (
                    <React.Fragment>
                        {matches.small &&
                            <>
                                <div className="mobileexchangebetting">
                                    <BetWidget />
                                    <Category mobile={true} />

                                    <div className="betexchodds">
                                        {
                                            activeodds && Object.keys(activeodds).length ?
                                                <div className="oddsheader">
                                                    <div className="date">
                                                        <span>
                                                            {
                                                                dateConvert(activeodds.event.openDate)
                                                            }
                                                        </span>

                                                    </div>
                                                    <div className="topic">
                                                        {
                                                            activeodds.event.name
                                                        }
                                                    </div>
                                                </div> : null
                                        }
                                        <div className='oddsbody'>
                                            <Nav tabs fill>
                                                {
                                                    Menus.map((item, i) => (
                                                        <NavItem key={i}>
                                                            <NavLink
                                                                active={active === item}
                                                                onClick={() => {
                                                                    toggle(item)
                                                                }}
                                                            >
                                                                {item.label}
                                                            </NavLink>
                                                        </NavItem>
                                                    ))
                                                }

                                            </Nav>
                                            <TabContent className='py-50' activeTab={active}>
                                                <Card>
                                                    {
                                                        mobileoddsitemRender()
                                                    }

                                                </Card>
                                            </TabContent>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        {
                            matches.large &&
                            <>
                                <div className="exchangebetting">
                                    <div className="betexchodds">
                                        <Category />
                                        {
                                            activeodds && Object.keys(activeodds).length ?
                                                <div className="oddsheader">
                                                    <div className="date">
                                                        <span>
                                                            {
                                                                dateConvert(activeodds.event.openDate)
                                                            }
                                                        </span>

                                                    </div>
                                                    <div className="topic w-100">
                                                        {
                                                            activeodds.event.name
                                                        }
                                                        <div className="score-lmt-widget" />
                                                    </div>
                                                </div> : null
                                        }
                                        <div className='oddsbody'>
                                            <Nav tabs fill>
                                                {
                                                    Menus.map((item, i) => (
                                                        <NavItem key={i}>
                                                            <NavLink
                                                                active={active === item}
                                                                onClick={() => {
                                                                    toggle(item)
                                                                }}
                                                            >
                                                                {item.label}
                                                            </NavLink>
                                                        </NavItem>
                                                    ))
                                                }

                                            </Nav>
                                            <TabContent className='py-50' activeTab={active}>
                                                <Card>
                                                    {
                                                        oddsitemRender()
                                                    }

                                                </Card>
                                            </TabContent>
                                        </div>
                                    </div>
                                    <BetWidget />
                                </div>

                            </>
                        }
                    </React.Fragment>
                )}
            </Media>
            <Betslip />
        </div>
    )
}

export default Odds