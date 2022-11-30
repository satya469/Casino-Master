import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Col, Input, Row, FormGroup, Label } from "reactstrap"
import { TrendingUp, TrendingDown } from "react-feather"
import { removeItem, removeAllItem, placeBet, updateSportsSidebar, changeBetType, setItem } from "../../../redux/actions/sports"
import { setloginpage } from "../../../redux/actions/auth/loginActions"
import { Plus } from "react-feather"
import { toast } from "react-toastify"
import { history } from "../../../history"
import Select from "react-select"
import sportsconfig from "../../../configs/sportsconfig"
import { UserContext } from '../../../utility/UserContext'
import Loader from "react-loader-spinner";

class BetSidebar extends Component {
    static contextType = UserContext

    constructor(props) {
        super(props)
        this.state = {
            active: sportsconfig.SINGLE,
            isopen: true,
            smartBetFlag: false,
            multiAmount: 0,
            priceBoost: false,

            matchData: [{ value: "", label: "Please select Match" }],
            marketData: [{ value: "", label: "Please select Market" }],
            OddsData: [{ value: "", label: "Please select Odd" }],

            smartMatchId: "",
            smartMarketId: "",
            smartOddId: "",
            loading: true
        }
    }

    changeType(type) {
        this.setState({ active: type, isopen: true })
        this.props.changeBetType(type)
        const data = this.props.sportsSidebarData
        let totalOdds = 0
        if (type === "multi") {
            let totalStack = this.state.multiAmount
            for (let i = 0; i < data.data.length; i++) {
                totalOdds = (parseFloat(totalOdds) + parseFloat(data.data[i].OutcomeOdds)).toFixed(2)
                if (totalStack) {
                    totalStack = (parseFloat(totalStack) * parseFloat(data.data[i].OutcomeOdds)).toFixed(2)
                }
            }
            data.totalStack = totalStack
            data.totalOdds = totalOdds
            data.totalMoney = this.state.multiAmount
        } else {
            let totalStack1 = 0
            let totalMoney = 0
            for (let j = 0; j < data.data.length; j++) {
                totalStack1 = (parseFloat(totalStack1) + (parseFloat(data.data[j].amount ? data.data[j].amount : 1) * parseFloat(data.data[j].OutcomeOdds))).toFixed(2)
                totalMoney = (parseFloat(totalMoney) + parseFloat(data.data[j].amount ? data.data[j].amount : 0)).toFixed(2)
                totalOdds = (parseFloat(totalOdds) + parseFloat(data.data[j].OutcomeOdds)).toFixed(2)
            }
            data.totalStack = totalStack1
            data.totalMoney = totalMoney
            data.totalOdds = totalOdds
        }
        this.props.updateSportsSidebar(data)
    }

    changeAmount(item, value) {
        let minbetamount = this.getMinbetamount()

        const data = this.props.sportsSidebarData.data
        let totalStack = 0
        let totalOdds = 0
        let totalMoney = 0
        const { currencyLabel } = this.props
        for (let i = 0; i < data.length; i++) {
            if (data[i].OutcomeId === item.OutcomeId &&
                data[i].OutcomeName === item.OutcomeName &&
                data[i].MarketId === item.MarketId &&
                data[i].MarketName === item.MarketName &&
                data[i].MarketSpecifiers === item.MarketSpecifiers &&
                data[i].event_id === item.event_id) {
                data[i].amount = value
            }
            if (data[i].amount) {
                totalStack = (parseFloat(totalStack) + parseFloat(data[i].amount * data[i].OutcomeOdds)).toFixed(2)
                if (data[i].amount < minbetamount) {
                    data[i].amountMessage = `The minimum bet amount is ${minbetamount} ${currencyLabel}.`
                } else {
                    totalMoney = (parseFloat(totalMoney) + parseFloat(data[i].amount)).toFixed(2)
                    data[i].amountMessage = ""
                }
            }
            totalOdds = (parseFloat(totalOdds) + parseFloat(data[i].OutcomeOdds)).toFixed(2)
        }

        const sendData = {
            data,
            totalStack,
            totalOdds,
            totalMoney,
            oddsChange: this.props.sportsSidebarData.oddsChange
        }
        this.props.updateSportsSidebar(sendData)
    }

    getMinbetamount = () => {
        const { settings } = this.context
        let minbetamount = 100
        if (settings.sportslimit && settings.sportslimit.length) {
            minbetamount = parseInt(settings.sportslimit)
        }
        return minbetamount
    }

    multiAmountChange(value) {
        if (!value) value = 0
        let minbetamount = this.getMinbetamount()
        this.setState({ multiAmount: value })
        const data = this.props.sportsSidebarData.data
        let totalStack = value
        let totalOdds = 0
        for (let i = 0; i < data.length; i++) {
            totalStack = (parseFloat(totalStack) * parseFloat(data[i].OutcomeOdds)).toFixed(2)
            totalOdds = (parseFloat(totalOdds) + parseFloat(data[i].OutcomeOdds)).toFixed(2)
        }
        const sendData = {
            data,
            totalStack,
            totalOdds,
            totalMoney: value,
            amountMessage: value < minbetamount ? `The minimum bet amount is ${minbetamount}` : ""
        }
        this.props.updateSportsSidebar(sendData)
    }

    bet() {
        let minbetamount = this.getMinbetamount()
        const betData = this.props.sportsSidebarData
        const sportList = this.props.all_sports_list
        const sendData = {}
        const navBetData = []
        const data = betData.data
        if (this.state.active === sportsconfig.SINGLE) {
            for (let i = 0; i < data.length; i++) {
                if (!data[i].amount || data[i].amount < minbetamount) {
                    toast.error(`The minimum bet is ${minbetamount}.`)
                    return
                }
                if (data[i].MarketStatus === sportsconfig.SUSPENDED || data[i].MarketStatus === sportsconfig.DEACTIVATED || !(data[i].EventStatus === sportsconfig.LIVE || data[i].EventStatus === sportsconfig.NotStarted) || !data[i].OutcomeStatus) {
                    toast.warn("There are exist not allowed market!")
                    return
                }
                if (this.props.recoveyrEventStaus === false) {
                    toast.warn("Down time!")
                    return
                }

                const gameIdIndex = sportList.findIndex(item => item.sport_id === data[i].sportid)
                const singleTemp = {
                    GAMEID: data[i].event_id,
                    gameid: sportList[gameIdIndex]._id,
                    LAUNCHURL: "SPORTS",
                    AMOUNT: data[i].amount,
                    betting: {
                        OutcomeId: data[i].OutcomeId,
                        OutcomeName: data[i].OutcomeName,
                        OutcomeOdds: data[i].OutcomeOdds,
                        MarketId: data[i].MarketId,
                        MarketSpecifiers: data[i].MarketSpecifiers,
                        matchTime: data[i].ScheduledTime,
                        MarketName: data[i].MarketName,
                        sportid: data[i].sportid,
                        EventStatus: data[i].EventStatus,
                        MatchName: `${data[i].AwayCompetitor} - ${data[i].HomeCompetitor}`,
                        priceBoost: data[i].priceBoost ? data[i].priceBoost : false
                    }
                }
                navBetData.push(singleTemp)
            }
            sendData.betType = "SINGLE"
            sendData.allAmount = betData.totalMoney
        } else {
            for (const mi in data) {
                let index = data.findIndex(item => item.event_id === data[mi].event_id);

                if (Number(mi) !== index && index > -1) {
                    toast.error("Same match exist")
                    return;
                }
            }
            if (this.state.multiAmount < minbetamount) {
                toast.error(`The Bet Minimum Amount is ${minbetamount}.`)
                return
            }
            for (let j = 0; j < data.length; j++) {
                if (data[j].MarketStatus === sportsconfig.SUSPENDED || data[j].MarketStatus === sportsconfig.DEACTIVATED || !(data[j].EventStatus === sportsconfig.LIVE || data[j].EventStatus === sportsconfig.NotStarted) || !data[j].OutcomeStatus) {
                    toast.warn("There are exist not allowed market!")
                    return
                }
                if (this.props.recoveyrEventStaus === false) {
                    toast.warn("Down time!")
                    return
                }
                const gameIdIndexMulti = sportList.findIndex(item => item.sport_id === data[j].sportid)
                const multiTemp = {
                    GAMEID: data[j].event_id,
                    gameid: sportList[gameIdIndexMulti]._id,
                    LAUNCHURL: "SPORTS",
                    AMOUNT: this.state.multiAmount,
                    betting: {
                        OutcomeId: data[j].OutcomeId,
                        OutcomeName: data[j].OutcomeName,
                        OutcomeOdds: data[j].OutcomeOdds,
                        MarketId: data[j].MarketId,
                        MarketSpecifiers: data[j].MarketSpecifiers,
                        MarketName: data[j].MarketName,
                        sportid: data[j].sportid,
                        MatchName: `${data[j].HomeCompetitor}-${data[j].AwayCompetitor}`,
                        matchTime: data[j].ScheduledTime,
                        priceBoost: data[j].priceBoost ? data[j].priceBoost : false,
                        EventStatus: data[j].EventStatus,
                        handleState: false
                    }
                }
                navBetData.push(multiTemp)
            }
            sendData.betType = "MULTI"
            sendData.allAmount = this.state.multiAmount
        }
        sendData.bet = navBetData
        sendData.betId = this.props.betId
        this.setState({ multiAmount: 0 })
        if (this.props.balance.balance < sendData.allAmount) {
            toast.error("please write correct value")
        } else {
            this.props.placeBet(sendData)
        }
    }

    updateOdds() {
        const betData = this.props.sportsSidebarData
        for (let bet_i = 0; bet_i < betData.data.length; bet_i++) {
            betData.totalOdds = (parseFloat(betData.totalOdds) - parseFloat(betData.data[bet_i].OutcomeOdds) + parseFloat(betData.data[bet_i].OutcomeOdds_)).toFixed(2)
            if (betData.data[bet_i].amount) {
                if (this.state.active === sportsconfig.SINGLE) {
                    betData.totalStack = (parseFloat(betData.totalStack) -
                        parseFloat(betData.data[bet_i].OutcomeOdds) * parseFloat(betData.data[bet_i].amount) +
                        parseFloat(betData.data[bet_i].OutcomeOdds_) * parseFloat(betData.data[bet_i].amount)).toFixed(2)
                } else {
                    betData.totalStack = (parseFloat(betData.totalStack) /
                        parseFloat(betData.data[bet_i].OutcomeOdds) *
                        parseFloat(betData.data[bet_i].OutcomeOdds_)).toFixed(2)
                }
            }
            if (betData.data[bet_i].OutcomeOdds_) {
                if (betData.data[bet_i].priceBoost) {
                    betData.data[bet_i].OutcomeOdds = parseFloat(betData.data[bet_i].OutcomeOdds_) + 0.05
                } else {
                    betData.data[bet_i].OutcomeOdds = betData.data[bet_i].OutcomeOdds_
                }
                betData.data[bet_i].oddMessage = ""
                betData.data[bet_i].OutcomeOdds_ = null
            }
        }
        betData.oddsChange = false
        this.props.updateSportsSidebar(betData)
    }

    setPriceBoost(data) {
        const betData = this.props.sportsSidebarData
        const index = betData.data.findIndex(item => item.OutcomeId === data.OutcomeId && item.OutcomeName === data.OutcomeName && item.MarketId === data.MarketId && item.MarketName === data.MarketName && item.MarketSpecifiers === data.MarketSpecifiers && item.event_id === data.event_id)
        betData.data[index].OutcomeOdds = (parseFloat(data.OutcomeOdds) + 0.05).toFixed(2)
        betData.data[index].priceBoost = true
        betData.priceBoost = true
        this.props.updateSportsSidebar(betData)
        this.setState({ priceBoost: false })
    }

    removePriceBoost(data) {
        const betData = this.props.sportsSidebarData
        const index = betData.data.findIndex(item => item.OutcomeId === data.OutcomeId && item.OutcomeName === data.OutcomeName && item.MarketId === data.MarketId && item.MarketName === data.MarketName && item.MarketSpecifiers === data.MarketSpecifiers && item.event_id === data.event_id)
        betData.data[index].OutcomeOdds = (parseFloat(data.OutcomeOdds) - 0.05).toFixed(2)
        betData.data[index].priceBoost = false
        betData.priceBoost = false
        this.props.updateSportsSidebar(betData)
        this.setState({ priceBoost: false })
    }

    matchChange(e) {
        // this.setState({smartMatchId : e});
        // var index = this.props.all_matchs.data.findIndex(item => item.event_id === e);
        // var market = [{value : "" , label : "Please Select Market"}];
        // if(index >= -1){
        //     market = [];
        //     if(this.props.all_matchs.data[index].market && this.props.all_matchs.data[index].market.length){
        //         for(var i = 0 ; i < this.props.all_matchs.data[index].market.length ; i ++){
        //             var temp = {
        //                 value : this.props.all_matchs.data[index].market[i].MarketId
        //             }
        //             if(this.props.all_matchs.data[index].market[i].MarketSpecifiers){
        //                 temp.label = this.props.all_matchs.data[index].market[i].MarketName + "(" + this.props.all_matchs.data[index].market[i].MarketSpecifiers + ")";
        //             }else{
        //                 temp.label = this.props.all_matchs.data[index].market[i].MarketName;
        //             }
        //             market.push(temp);
        //         }
        //     }
        // }
        // this.setState({marketData : market})
    }

    changeMarket(e) {
        // this.setState({smartMarketId : e});
        // var index = this.props.all_matchs.data.findIndex(item => item.event_id === this.state.smartMatchId);
        // var index_ = this.props.all_matchs.data[index].market.findIndex(item => item.MarketId === e);
        // var odd = [{value : "" , label : "Please Select Odds"}];
        // if(this.props.all_matchs.data[index].market[index_].Outcomes && this.props.all_matchs.data[index].market[index_].Outcomes.length){
        //     odd = [];
        //     for(var i = 0 ; i < this.props.all_matchs.data[index].market[index_].Outcomes.length ; i ++){
        //         var temp = {
        //             value : this.props.all_matchs.data[index].market[index_].Outcomes[i].OutcomeId,
        //             label : this.props.all_matchs.data[index].market[index_].Outcomes[i].OutcomeName,
        //         }
        //         odd.push(temp);
        //     }
        // }
        // this.setState({OddsData : odd});
    }

    smartBet() {
        // if(!this.state.smartMatchId || !this.state.smartMarketId || !this.state.smartOddId){
        //     toast.error("Please select correct odds.");
        //     return;
        // }
        // var match = this.props.all_matchs.data.findIndex(item => item.event_id === this.state.smartMatchId);
        // var market = this.props.all_matchs.data[match].market.findIndex(item => item.MarketId === this.state.smartMarketId);
        // var odd = this.props.all_matchs.data[match].market[market].Outcomes.findIndex(item => item.OutcomeId === this.state.smartOddId);
        // this.props.setItem(Object.assign({}, this.props.all_matchs.data[match] , this.props.all_matchs.data[match].market[market] , this.props.all_matchs.data[match].market[market].Outcomes[odd]));
    }

    depositshow = () => {
        const { telegram } = this.context
        if (!telegram) {
            history.push("/mywallet/deposit")
        } else {
            toast.warn("Please deposit")
        }
    }

    render() {
        const { active, isopen, smartBetFlag, matchData, marketData, OddsData, priceBoost, multiAmount } = this.state
        const { sportsSidebarData, betId, removeItem, balance, setloginpage, removeAllItem, currencyLabel, betslipLoading } = this.props
        const { user } = this.context

        return (
            sportsSidebarData.data && sportsSidebarData.data.length ? (
                <div className='sports-bet-sidebar'>
                    <div className='betslip'>
                        <div className='wrapper active u-bordercolor-piccolo'>
                            <ul className='betslip-tabs'>
                                <li className='tab' onClick={() => this.changeType(sportsconfig.SINGLE)}>
                                    <div className={active === sportsconfig.SINGLE ? 'active' : ''}>Single
                                        <span className="amount">{sportsSidebarData.data ? sportsSidebarData.data.length : 0}</span>
                                    </div>
                                </li>
                                <li className='tab' onClick={() => this.changeType(sportsconfig.MULTI)}>
                                    <div className={active === sportsconfig.MULTI ? 'active' : ''}>Multi
                                        <span className="amount">{sportsSidebarData.data ? sportsSidebarData.data.length : 0}</span>
                                    </div>
                                </li>
                                <li className='button'>
                                    <div onClick={() => this.setState({ isopen: !isopen })}>
                                        <svg fill="#fff" height="32" width="32" viewBox="0 0 512 512">
                                            {isopen ? <path d="M507 205.8H5v100.4h502z"></path> : <path d="M506.997 205.799H306.201V5H205.799v200.799H5.003v100.399h200.796V507h100.402V306.198h200.796z"></path>
                                            }
                                        </svg>
                                    </div>
                                </li>
                            </ul>

                            {isopen ? (
                                <React.Fragment>
                                    {/* <Row onClick={()=>this.setState({smartBetFlag:!smartBetFlag})} className={(smartBetFlag ? 'sports-country-active':'sports-country')}>
                                        <Col sm='12' className='sports-country-title'>
                                            <div className='sports-country-name'> SMART BET </div>
                                            <div>
                                                {smartBetFlag ? <ChevronDown size={20}/> : <ChevronRight size={20}/>}
                                            </div>
                                        </Col>
                                    </Row> */}
                                    {
                                        smartBetFlag &&
                                        <Row className='sports-country'>
                                            <Col lg='12' md='12' sm='12' xs='12'>
                                                <FormGroup>
                                                    <Label for="STATUS"> Match Id </Label>
                                                    <Select
                                                        className="React"
                                                        classNamePrefix="select"
                                                        options={matchData}
                                                        defaultValue={matchData[0]}
                                                        onChange={e => this.matchChange(e.value)}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg='12' md='12' sm='12' xs='12'>
                                                <FormGroup>
                                                    <Label for="STATUS"> Market </Label>
                                                    <Select
                                                        className="React"
                                                        classNamePrefix="select"
                                                        options={marketData}
                                                        defaultValue={marketData[0]}
                                                        onChange={e => this.changeMarket(e.value)}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg='12' md='12' sm='12' xs='12'>
                                                <FormGroup>
                                                    <Label for="STATUS"> Odds </Label>
                                                    <Select
                                                        className="React"
                                                        classNamePrefix="select"
                                                        options={OddsData}
                                                        defaultValue={OddsData[0]}
                                                        onChange={e => this.setState({ smartOddId: e.value })}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg='11' md='11' sm='11' xs='11' className="ml-1">
                                                <Button
                                                    className="add-new-btn ml-1 igamez-button"
                                                    color="primary"
                                                    outline
                                                    onClick={() => this.smartBet()}>
                                                    <Plus size={15} />
                                                    <span className="align-middle" color="primary" > Add Bet </span>
                                                </Button>
                                            </Col>
                                        </Row>
                                    }
                                    <div className="p-1">
                                        <Button onClick={() => this.setState({ priceBoost: !priceBoost })} className="square priceboost m-0" style={{ width: '100%' }}>
                                            {
                                                priceBoost ? <span >
                                                    Done
                                                </span> : <span><TrendingUp size={15} /> &nbsp;&nbsp; Price Boost</span>
                                            }
                                        </Button>
                                        <Input value={`Bet Id : ${betId}`} className='round mt-1 text-center white-text' style={{ opacity: "1" }} readOnly />
                                    </div>
                                    <div className='scrolllock'>
                                        {
                                            sportsSidebarData.data.map((item, i) => (
                                                <div key={i} className='bets'>
                                                    <div>
                                                        <div className='event'>
                                                            <div className='target'>
                                                                <div className="title">{`${item.AwayCompetitor} - ${item.HomeCompetitor}`}</div>
                                                                <span className="animate">
                                                                    <span>{item.event_id}</span>
                                                                </span>
                                                            </div>
                                                            <div className='type' style={{ color: 'white' }}>
                                                                {item.MarketName}
                                                            </div>
                                                            <div className='target'>
                                                                <div className="team">{item.OutcomeName}</div>
                                                                <span className="animate">
                                                                    <span className="u-color-piccolo">{item.OutcomeOdds}</span>
                                                                </span>
                                                            </div>
                                                            {
                                                                priceBoost ? sportsSidebarData.priceBoost ? item.priceBoost &&
                                                                    <Button onClick={() => this.removePriceBoost(item)} className="square priceboost" style={{ width: '100%' }} outline color="info">
                                                                        <TrendingDown size={15} /><span>&nbsp;&nbsp;{`Remove to ${(parseFloat(item.OutcomeOdds) - 0.05).toFixed(2)}`}</span>
                                                                    </Button> : <Button onClick={() => this.setPriceBoost(item)} className="square priceboost" style={{ width: '100%' }} outline color="info">
                                                                    <TrendingUp size={15} /><span>&nbsp;&nbsp;{`Price Boost to ${(parseFloat(item.OutcomeOdds) + 0.05).toFixed(2)}`}</span>
                                                                </Button> : active === sportsconfig.SINGLE && <Input value={item.amount ? item.amount : ""} onChange={(e) => this.changeAmount(item, e.target.value)} className='round mt-1' id='input-statk' placeholder='Enter your stake' type='number' style={{ textAlign: 'right' }} />
                                                            }
                                                            <div className='event-footer'>
                                                                <div className='remove u-color-piccolo' onClick={() => removeItem(item)}>
                                                                    Remove&nbsp;×
                                                                </div>
                                                                {
                                                                    active === sportsconfig.SINGLE &&
                                                                    <div className='potentialwin white-text'>
                                                                        {"Potential win : "}
                                                                        <span className="sum">&nbsp;{currencyLabel}
                                                                            <span className="numbers">{item.amount ? parseFloat(item.amount * item.OutcomeOdds).toFixed(2) : 0.00}</span>
                                                                        </span>
                                                                    </div>
                                                                }
                                                            </div>
                                                            {
                                                                active === sportsconfig.SINGLE &&
                                                                <div>
                                                                    <div className="d-flex justify-content-xl-between">
                                                                        <div className="white-text u-bg-piccolo cursor-pointer igamez-button w-100 text-center" style={{ margin: "5px" }} onClick={() => this.changeAmount(item, 100)}>100</div>
                                                                        <div className="white-text u-bg-piccolo cursor-pointer igamez-button w-100 text-center" style={{ margin: "5px" }} onClick={() => this.changeAmount(item, 500)}>500</div>
                                                                        <div className="white-text u-bg-piccolo cursor-pointer igamez-button w-100 text-center" style={{ margin: "5px" }} onClick={() => this.changeAmount(item, 1000)}>1k</div>
                                                                        <div className="white-text u-bg-piccolo cursor-pointer igamez-button w-100 text-center" style={{ margin: "5px" }} onClick={() => this.changeAmount(item, 10000)}>10k</div>
                                                                    </div>
                                                                    <div className="d-flex justify-content-xl-between">
                                                                        <div className="white-text u-bg-piccolo cursor-pointer igamez-button w-100 text-center" style={{ margin: "5px" }} onClick={() => this.changeAmount(item, 20000)}>20k</div>
                                                                        <div className="white-text u-bg-piccolo cursor-pointer igamez-button w-100 text-center" style={{ margin: "5px" }} onClick={() => this.changeAmount(item, 25000)}>25k</div>
                                                                        <div className="white-text u-bg-piccolo cursor-pointer igamez-button w-100 text-center" style={{ margin: "5px" }} onClick={() => this.changeAmount(item, 50000)}>50k</div>
                                                                        <div className="white-text u-bg-piccolo cursor-pointer igamez-button w-100 text-center" style={{ margin: "5px" }} onClick={() => this.changeAmount(item, 75000)}>75k</div>
                                                                    </div>
                                                                </div>
                                                            }
                                                            {!this.props.recoveyrEventStaus && <ErrorComponent message={"Down time"} />}
                                                            {item.eventMessage && <ErrorComponent message={item.eventMessage} />}
                                                            {item.oddMessage && <ErrorComponent message={item.oddMessage} />}
                                                            {item.marketMessage && <ErrorComponent message={item.marketMessage} />}
                                                            {item.amountMessage && active === sportsconfig.SINGLE && <ErrorComponent message={item.amountMessage} />}
                                                            {item.mtsMessage && <ErrorComponent message={item.mtsMessage} />}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <div className='p-1' style={{ borderTop: '1px solid #31373f' }}>
                                            {
                                                active === sportsconfig.MULTI &&
                                                <React.Fragment>
                                                    <div className='lower'>
                                                        <Input value={multiAmount ? multiAmount : ""} onChange={(e) => this.multiAmountChange(e.target.value)} className='round' id='input-statk' placeholder='Enter your stake' type='number' style={{ textAlign: 'right' }} />
                                                    </div>
                                                    <div>
                                                        <div className="d-flex justify-content-xl-between">
                                                            <div className="white-text u-bg-piccolo cursor-pointer igamez-button w-100 text-center" style={{ margin: "5px" }} onClick={() => this.multiAmountChange(100)}>100</div>
                                                            <div className="white-text u-bg-piccolo cursor-pointer igamez-button w-100 text-center" style={{ margin: "5px" }} onClick={() => this.multiAmountChange(500)}>500</div>
                                                            <div className="white-text u-bg-piccolo cursor-pointer igamez-button w-100 text-center" style={{ margin: "5px" }} onClick={() => this.multiAmountChange(1000)}>1k</div>
                                                            <div className="white-text u-bg-piccolo cursor-pointer igamez-button w-100 text-center" style={{ margin: "5px" }} onClick={() => this.multiAmountChange(10000)}>10k</div>
                                                        </div>
                                                        <div className="d-flex justify-content-xl-between">
                                                            <div className="white-text u-bg-piccolo cursor-pointer igamez-button w-100 text-center" style={{ margin: "5px" }} onClick={() => this.multiAmountChange(20000)}>20k</div>
                                                            <div className="white-text u-bg-piccolo cursor-pointer igamez-button w-100 text-center" style={{ margin: "5px" }} onClick={() => this.multiAmountChange(25000)}>25k</div>
                                                            <div className="white-text u-bg-piccolo cursor-pointer igamez-button w-100 text-center" style={{ margin: "5px" }} onClick={() => this.multiAmountChange(50000)}>50k</div>
                                                            <div className="white-text u-bg-piccolo cursor-pointer igamez-button w-100 text-center" style={{ margin: "5px" }} onClick={() => this.multiAmountChange(75000)}>75k</div>
                                                        </div>
                                                    </div>
                                                    <div className='event-footer pt-1 d-flex'>
                                                        <div className="d-flex justify-content-start white-text">
                                                            Potential Winnings
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            }
                                            <div className='event-footer d-flex'>
                                                <div className="d-flex justify-content-start white-text" style={{ width: '80px' }}>
                                                    Total stake:
                                                </div>
                                                <div className='potentialwin d-flex justify-content-end' style={{ width: 'calc(100% - 80px)' }}>
                                                    <span className="sum"> {currencyLabel}
                                                        <span className="numbers">{sportsSidebarData.totalMoney ? sportsSidebarData.totalMoney : 0.00}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='event-footer d-flex'>
                                                <div className="d-flex justify-content-start white-text" style={{ width: '80px' }}>
                                                    Total Odds:
                                                </div>
                                                <div className='potentialwin d-flex justify-content-end' style={{ width: 'calc(100% - 80px)' }}>
                                                    <span className="sum">
                                                        <span className="numbers">{sportsSidebarData.totalOdds ? sportsSidebarData.totalOdds : 0.00}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='event-footer d-flex'>
                                                <div className="d-flex justify-content-start white-text" style={{ width: '80px' }}>
                                                    Potential Win:
                                                </div>
                                                <div className='potentialwin d-flex justify-content-end' style={{ width: 'calc(100% - 80px)' }}>
                                                    <span className="sum"> {currencyLabel}
                                                        <span className="numbers">{sportsSidebarData.totalStack ? sportsSidebarData.totalStack : 0.00}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            {
                                                active === sportsconfig.MULTI ? <ErrorComponent message={sportsSidebarData.amountMessage} /> : ""
                                            }
                                        </div>
                                        <div className='p-1' style={{ borderTop: '1px solid #31373f' }}>
                                            {
                                                user ? (
                                                    (balance &&
                                                        balance.balance >= (active === sportsconfig.active ? this.sportsSidebarData.totalMoney : multiAmount)
                                                    ) ? (
                                                        sportsSidebarData.oddsChange ? <Button onClick={() => this.updateOdds()} className="round btn-block igamez-button" color="success"> {"Update Odds"}</Button> : <Button onClick={() => this.bet()} className="round btn-block igamez-button" color="success"> {(active === sportsconfig.active ? this.sportsSidebarData.totalMoney : multiAmount) ? `Place Bet ${active === sportsconfig.active ? this.sportsSidebarData.totalMoney : multiAmount}${currencyLabel}` : "Place Bet "}</Button>
                                                    ) : <Button onClick={() => this.depositshow()} className="round btn-block igamez-button" color="success"> Deposit </Button>
                                                ) : <Button onClick={() => setloginpage({ login: true, register: false, forgot: false })} className="round btn-block igamez-button" color="success"> Login </Button>
                                            }
                                            <div onClick={() => removeAllItem()} className='remove u-color-piccolo' style={{ textAlign: 'center', cursor: 'pointer' }}>
                                                Remove all bets&nbsp;&nbsp;×
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ) : <div />}
                            {
                                betslipLoading ?
                                    <div className="betsliploading">
                                        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
                                    </div> : null
                            }
                        </div>
                    </div>
                </div>
            ) : <div />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sportsSidebarData: state.sports.sportsSidebarData,
        sportsList: state.sports.sports_list.data,
        balance: state.balance.value,
        betId: state.sports.betId,
        all_sports_list: state.sports.all_sports_list,
        recoveyrEventStaus: state.sports.recoveyrEventStaus,
        currencyLabel: state.auth.login.currencyLabel,
        betslipLoading: state.sports.betslipLoading,
    }
}

const mapDispatchToProps = {
    setloginpage,
    removeItem,
    removeAllItem,
    placeBet,
    updateSportsSidebar,
    changeBetType,
    setItem
}

export default connect(mapStateToProps, mapDispatchToProps)(BetSidebar)

class ErrorComponent extends Component {
    render() {
        return (
            <div className='event-footer mt-1'>
                <b>{this.props.message}</b>
            </div>
        )
    }
}
