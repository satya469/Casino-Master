import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  Col, Input, Row, Button} from "reactstrap"
import {  addBetSlip, exchgPlaceBet } from "../../../redux/actions/exchg"
import { setloginpage } from "../../../redux/actions/auth/loginActions"
import { history } from "../../../history"
import {UserContext} from "../../../utility/UserContext"

 class BetSidebar extends Component {
    static contextType = UserContext
    state = {
         isopen : true,
         active : 'single'
     }

    changeStack(item, Stack, Polarity, match, market, odd, price) {


        const betSlipData = this.props.betSlipData
        const row = Object.assign({}, betSlipData)
        if (parseFloat(Stack) > 0 || Stack === "") {
            row[Polarity][match]['marketnode'][market]['oddsnode'][odd][price]["Stack"] = Stack
            this.props.addBetSlip(row)
        }
    }

    placeBet() {
        const rows = []
        const betSlipData = this.props.betSlipData
        for (const i in betSlipData) {
            for (const j in betSlipData[i]) {
                for (const k in betSlipData[i][j]['marketnode']) {
                    for (const l in betSlipData[i][j]['marketnode'][k]['oddsnode']) {
                        for (const m in betSlipData[i][j]['marketnode'][k]['oddsnode'][l]) {
                            const item = betSlipData[i][j]['marketnode'][k]['oddsnode'][l][m]
                            //     if(oneBet.Stack < 5){
                            //         toast.error("Place bet is refused. Please check betslip!");
                            //         return;
                            //     }
                            rows.push(item)
                        }
                    }
                }
            }
        }
        // var betData = this.props.betSlipData;
        // for(var i = 0 ; i < betData.data.length ; i ++){
        //     var oneBet = betData.data[i];
        // }
        this.props.exchgPlaceBet(rows)
    }

    RemoveBetSlipAll = () => {
        this.props.addBetSlip({})
    }

    RemoveBetSlip = (item, Polarity, match, market, odd, price) => {
        const betSlipData = this.props.betSlipData
        const row = Object.assign({}, betSlipData)
        delete row[Polarity][match]['marketnode'][market]['oddsnode'][odd]
        this.props.addBetSlip(row)
    }

    itemRender = (item, Polarity, match, market, odd, price) => {
        const {currencyLabel} = this.props
        return  <div className='event'>
                    {/* <div className='target'>
                        <span className="animate">
                            <span>{item.SelectionId}</span>
                        </span>
                    </div>                                                         */}
                    <Row className="m-0 d-flex justify-content-between">
                        <div className="w-75">
                            <div className='oddsname' >
                                {item.Name}
                            </div>
                            <div className='marketname' >
                                {item.marketName}
                            </div>
                        </div>

                        <div className='target w-25 d-flex align-items-center justify-content-center'>
                            <span className="animate">
                                <span className="u-color-piccolo">{item.Price}</span>
                            </span>
                        </div>
                    </Row>
                    <div className='BetInput jZDdQz'>
                        <Input value = {item.Stack ? item.Stack : ""} onChange = {(e) => this.changeStack(item, e.target.value, Polarity, match, market, odd, price)} className='round mt-1' id='input-statk' placeholder='Enter your stake' type='number' style={{textAlign:'right'}}/>
                    </div>
                    {
                        item.Stack && item.Stack >= 50 ? null : item.Stack > 0 ? <div className='event-footer' style={{display:'flex', color : "red", fontSize: "0.9rem"}}>
                            Place bet is refused. Please check betslip!
                        </div> : <div className='event-footer' style={{display:'flex', color : "red", fontSize: "0.9rem"}}>
                            Please input bet amount.
                        </div>
                    }
                    <div className='event-footer mt-1' style={{display:'flex'}}>
                        <div onClick = {() => this.RemoveBetSlip(item, Polarity, match, market, odd, price)} className='remove u-color-piccolo d-flex'>
                            Remove &nbsp;&nbsp;<b>×</b>
                        </div>
                        <div className='potentialwin' >
                            {"Potential win : "}
                            <span className="sum">{currencyLabel}
                                <span className="numbers">{  item.Stack !== "" && parseFloat(item.Stack) > 0 ? (parseFloat(item.Stack) * parseFloat(item.Price)).toFixed(2) : "0"}</span>
                            </span>
                        </div>
                    </div>
                </div>
    }

    totalRender = (totalStack, totalOdds, totalMoney) => {
        const {currencyLabel} = this.props
        return <React.Fragment>
            <div className='event-footer' style={{display:'flex'}}>
                <div style={{display:'flex', justifyContent:'flex-start', width: '80px', color : 'white'}}>
                    Total stake :
                </div>
                <div className='potentialwin' style={{display:'flex', justifyContent:'flex-end', width: 'calc(100% - 80px)'}}>
                    <span className="sum"> {currencyLabel}
                        <span className="numbers">{totalStack}</span>
                    </span>
                </div>
            </div>
            <div className='event-footer' style={{display:'flex'}}>
                <div style={{display:'flex', justifyContent:'flex-start', width: '80px', color : 'white'}}>
                    Total Odds :
                </div>
                <div className='potentialwin' style={{display:'flex', justifyContent:'flex-end', width: 'calc(100% - 80px)'}}>
                    <span className="sum">
                        <span className="numbers">{totalOdds}</span>
                    </span>
                </div>
            </div>
            <div className='event-footer' style={{display:'flex'}}>
                <div style={{display:'flex', justifyContent:'flex-start', width: '80px', color : 'white'}}>
                    Total Bet :
                </div>
                <div className='potentialwin' style={{display:'flex', justifyContent:'flex-end', width: 'calc(100% - 80px)'}}>
                    <span className="sum">
                        <span className="numbers">{currencyLabel}{totalMoney}</span>
                    </span>
                </div>
            </div> 
        </React.Fragment>
    }


    gettingTotal = () => {
        const betSlipData = this.props.betSlipData
        let totalStack = 0, totalOdds = 0, totalMoney = 0, StackCount = 0

        for (const i in betSlipData) {
            for (const j in betSlipData[i]) {
                for (const k in betSlipData[i][j]['marketnode']) {
                    for (const l in betSlipData[i][j]['marketnode'][k]['oddsnode']) {
                        for (const m in betSlipData[i][j]['marketnode'][k]['oddsnode'][l]) {
                            const item = betSlipData[i][j]['marketnode'][k]['oddsnode'][l][m]
                            totalStack += (parseFloat(item.Price) * parseFloat(item.Stack))
                            totalOdds += parseFloat(item.Price)
                            totalMoney += parseFloat(item.Stack)
                            StackCount++
                        }
                    }
                }
            }
        }

        return {
            totalStack : (totalStack).toFixed(2),
            totalOdds : (totalOdds).toFixed(2),
            totalMoney : (totalMoney).toFixed(2),
            StackCount
        }
    }

    render() {
        const {user} = this.context
        const betSlipData = this.props.betSlipData
        const total = this.gettingTotal()
        const totalStack = total.totalStack, totalOdds = total.totalOdds, totalMoney = total.totalMoney, StackCount = total.StackCount
        const {currencyLabel} = this.props
        return (
            StackCount && betSlipData && Object.keys(betSlipData).length ? (
                <div className='sports-bet-sidebar exhangesidebar'>
                    <div className='betslip'>
                       
                        <div className='wrapper active u-bordercolor-piccolo'>
                            <ul className='betslip-tabs'>
                                <li className='tab'>
                                    <div className={this.state.active === 'single' ? 'active' : ''}>Single
                                        <span className="amount">{StackCount}</span>
                                    </div>
                                </li>
                                <li className='tab'>
                                    <div className={this.state.active === 'multi' ? 'active' : ''}>Multi
                                        <span className="amount">{StackCount}</span>
                                    </div>
                                </li>
                                <li className='button'>
                                    <div onClick={() => this.setState({isopen : !this.state.isopen})}>
                                        <svg fill="#fff" height="32" width="32" viewBox="0 0 512 512">
                                            {
                                                this.state.isopen ? (
                                                    <path d="M507 205.8H5v100.4h502z"></path>
                                                ) : (
                                                    <path d="M506.997 205.799H306.201V5H205.799v200.799H5.003v100.399h200.796V507h100.402V306.198h200.796z"></path>
                                                )
                                            }
                                        </svg>
                                    </div>
                                </li>
                            </ul>
                            {
                                this.state.isopen  && StackCount ? (
                                    <React.Fragment >
                                        <div className='scrolllock'>
                                            {
                                                Object.keys(betSlipData).map((Polarity, i) => (
                                                    <React.Fragment key={i}>
                                                        <div className={`w-100 ${   Polarity === "Lay" ? "laytitle" : "backtitle"}`}>
                                                        {
                                                            Polarity
                                                        }
                                                        </div>
                                                        {
                                                            Object.keys(betSlipData[Polarity]).map((match, j) => (
                                                                Object.keys(betSlipData[Polarity][match]['marketnode']).map((market, k) => (
                                                                    <React.Fragment key={k}>
                                                                        {   
                                                                            Object.keys(betSlipData[Polarity][match]['marketnode'][market]["oddsnode"]).length ? <div className="w-100 matchname">
                                                                                    {betSlipData[Polarity][match]['matchname']}
                                                                                </div> : ""
                                                                        }
                                                                        {
                                                                            Object.keys(betSlipData[Polarity][match]['marketnode'][market]["oddsnode"]).map((odd, l) => (
                                                                                Object.keys(betSlipData[Polarity][match]['marketnode'][market]["oddsnode"][odd]).map((price, m) => (
                                                                                    <React.Fragment key={m}>
                                                                                        {
                                                                                            this.itemRender(betSlipData[Polarity][match]['marketnode'][market]["oddsnode"][odd][price], Polarity, match, market, odd, price)
                                                                                        }
                                                                                    </React.Fragment>
                                                                                ))
                                                                            ))
                                                                        }          
                                                                    </React.Fragment>
                                                                ))
                                                            ))
                                                        }
                                                    </React.Fragment>
                                                ))
                                            }
                                            
                                            <div className='p-1' style={{borderTop: '1px solid #31373f'}}>
                                                    {
                                                        this.totalRender(totalStack, totalOdds, totalMoney)
                                                    }
                                               
                                                <Row>
                                                    <Col md={12} className='pt-1 pl-1 pr-1'>
                                                        {
                                                            user ? (
                                                                this.props.balance && this.props.balance >= totalMoney ? (
                                                                    <Button onClick = {() => this.placeBet()} className="round btn-block igamez-button" color="success">
                                                                        {totalMoney ? `Place Bet ${  totalMoney  } ${ currencyLabel}` : "Place Bet "}
                                                                    </Button>
                                                                ) : <Button onClick={() => history.push("/mywallet/deposit")} className="round btn-block igamez-button" color="success"> Deposit </Button>
                                                            ) : <Button onClick = {() => this.props.setloginpage({login : true, register : false, forgot : false})} className="round btn-block igamez-button" color="success"> Login </Button>                                                                
                                                        }
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={12} className='pt-1 pl-1 pr-1'>
                                                        <div onClick={() => this.RemoveBetSlipAll()} className='remove u-color-piccolo' style={{textAlign:'center', cursor:'pointer'}}>
                                                            Remove all bets&nbsp;&nbsp;×
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ) : null
                            }
                        </div>
                    </div>
                </div>
            ) : <div/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        betSlipData : state.exchgange.betSlipData,
        balance : state.balance.value,
        currencyLabel : state.auth.login.currencyLabel

    }
}

const mapDispatchToProps = {
    setloginpage, addBetSlip, exchgPlaceBet
}

export default connect(mapStateToProps, mapDispatchToProps)(BetSidebar)