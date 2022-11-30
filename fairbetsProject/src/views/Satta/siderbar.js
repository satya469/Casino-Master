import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Row, Col, Button } from "reactstrap"
import { setloginpage } from "../../redux/actions/auth/loginActions"
import { update_satta, satta_bet_save, betslipOpen } from "../../redux/actions/satta/matka"
import { history } from "../../history"
import { alert } from "../../redux/actions/auth/index"
import { toast } from 'react-toastify'
import {UserContext} from '../../utility/UserContext'

class BetSidebar extends Component {
    static contextType = UserContext

    constructor(props) {
        super(props)
        this.state = {
            active: 'single',
            isopen: true,
            multiAmount: 0
        }
    }

    changeType = (type) => {
        this.setState({ active: type })
    }

    show_loginform = () => {
        this.props.setloginpage({ login: true, register: false, forgot: false })
    }

    changeAmount = (item1, item2, item3, time_flag, value, oddsprice) => {

        if (parseInt(value) >= 0) {
            const row = Object.assign({}, this.props.satta_bet_data)
            row[item1]["gamesnode"][item2]["betsnode"][time_flag][item3]["amount"] = value
            row[item1]["gamesnode"][item2]["betsnode"][time_flag][item3]["winamount"] = parseInt(oddsprice) * parseInt(value)
            this.props.update_satta(row)
        }
    }

    removeItem = (item1, item2, item3, item4) => {
        const row = Object.assign({}, this.props.satta_bet_data)
        const betnode = Object.assign({}, row, {})
        delete betnode[item1]["gamesnode"][item2]['betsnode'][item3][item4]
        this.props.update_satta(betnode)
    }

    removeAllItem = () => {
        this.props.update_satta({})
    }

    multiAmountChange = (e) => {
        this.setState({ multiAmount: e })
    }

    show_depositform = () => {
        const { telegram } = this.context
        if (!telegram) {
            history.push("/mywallet/deposit")
        } else {
            toast.warn("Please deposit")
        }
    }

    bet = () => {
        const { user } = this.context
        const rows = []
        const sattas_bets = this.props.satta_bet_data
        const betId = this.props.betId
        if (user) {
            for (const i in sattas_bets) {
                for (const j in sattas_bets[i]["gamesnode"]) {

                    let minbetprice = sattas_bets[i]["gamesnode"][j]["minbetprice"]
                    minbetprice = minbetprice > 0 ? minbetprice:5

                    for (const k in sattas_bets[i]["gamesnode"][j]["betsnode"]) {
                        for (const l in sattas_bets[i]["gamesnode"][j]["betsnode"][k]) {

                            const amount = sattas_bets[i]["gamesnode"][j]["betsnode"][k][l].amount
                            if (parseInt(amount) > 0 && parseInt(amount) >= minbetprice) {
                                const row = Object.assign({}, sattas_bets[i]["gamesnode"][j]["betsnode"][k][l],
                                    { transactionid: betId }
                                )
                                rows.push(row)
                            } else {
                                alert("please enter correctly amount.", "warn")
                                return
                            }
                        }
                    }
                }
            }

            this.props.satta_bet_save(rows, betId)
        }
    }


    betitemRender = (item, itemj, itemk, iteml) => {

        const sattas_bets = this.props.satta_bet_data
        const gitem = sattas_bets[item]["gamesnode"][itemj]["betsnode"][itemk][iteml]
        const gamename = gitem["gamename"]
        const detail = gitem["detail"]
        const oddsprice = sattas_bets[item]["gamesnode"][itemj]["oddsprice"]
        let minbetprice = sattas_bets[item]["gamesnode"][itemj]["minbetprice"]

        minbetprice = minbetprice > 0 ? minbetprice:10
        const { currencyLabel } = this.props
        return <div className='event pb-0'>
            <div className='target'>
                <Col md="6" className="font-weight-light pr-0 justify-content-center align-items-center d-flex text-center" style={{ fontSize: "0.9rem" }}>
                    <span>
                        {gamename}
                    </span>
                </Col>
                {
                    gamename === "half sangam A" || gamename === "full sangam" ? <Col md="6" className="font-weight-normal pl-0" style={{ fontSize: "0.8rem" }}>

                            <p className="u-color-piccolo m-0 p-0 font-weight-normal">{gitem["name"]} &nbsp; {iteml.split(":")[0]}</p>
                            {
                                detail && !detail["require"] ? <p className="u-color-piccolo m-0 p-0 font-weight-normal">{`${detail["name"]  } ${  detail["betnumber"]}`}</p> : null
                            }
                        </Col> : <Col md="6" className="font-weight-normal pl-0" style={{ fontSize: "0.8rem" }}>
                            {
                                detail && !detail["require"] ? <p className="u-color-piccolo m-0 p-0 font-weight-normal">{`${detail["name"]  } ${  detail["betnumber"]}`}</p> : null
                            }
                            <p className="u-color-piccolo m-0 p-0 font-weight-normal">{gitem["name"]} &nbsp; {iteml}</p>
                        </Col>

                }
            </div>
            {
                this.state.active === "single" ? <Input required value={gitem["amount"]} onChange={(e) => this.changeAmount(item, itemj, iteml, itemk, e.target.value, oddsprice)} className='round' id='input-statk' placeholder='Enter your stake' type='number' style={{ textAlign: 'right' }} /> : null
            }
            {
                parseInt(gitem["amount"]) && parseInt(gitem["amount"]) >= minbetprice ? null : parseInt(gitem["amount"]) > 0 ? <div className='event-footer' style={{ display: 'flex', color: "red", fontSize: "0.9rem" }}>
                            Place bet is refused. Min bet is {minbetprice}
                        </div> : <div className='event-footer' style={{ display: 'flex', color: "red", fontSize: "0.9rem" }}>
                            Please input bet amount.
                    </div>
            }
            <div className='event-footer' style={{ display: 'flex' }}>
                <div className='remove u-color-piccolo' onClick={() => this.removeItem(item, itemj, itemk, iteml)}>
                    Remove&nbsp;&nbsp;<b>×</b>
                </div>
                {
                    this.state.active === "single" ? <div className='potentialwin' style={{ color: 'white' }}>
                            {"Potential win : "}
                            <span className="sum">&nbsp;{currencyLabel}
                                <span className="numbers">{gitem["winamount"]}</span>
                            </span>
                        </div> : null
                }
            </div>
        </div>
    }

    render() {
        const { user } = this.context
        const sattas_bets = this.props.satta_bet_data
        let totalOdds = 0
        let Maxpotentialwin = 0
        let Minpotentialwin = 0
        let index = 0
        const { currencyLabel } = this.props
        for (const i in sattas_bets) {
            for (const j in sattas_bets[i]["gamesnode"]) {
                for (const k in sattas_bets[i]["gamesnode"][j]["betsnode"]) {
                    for (const l in sattas_bets[i]["gamesnode"][j]["betsnode"][k]) {
                        const winamount = parseInt(sattas_bets[i]["gamesnode"][j]["betsnode"][k][l]["winamount"])

                        Maxpotentialwin = Maxpotentialwin < winamount ? winamount : Maxpotentialwin
                        if (Minpotentialwin === 0) {
                            Minpotentialwin = winamount
                        } else {
                            Minpotentialwin = Minpotentialwin > winamount ? winamount : Minpotentialwin
                        }
                        totalOdds += parseInt(sattas_bets[i]["gamesnode"][j]["betsnode"][k][l]["amount"])
                        index++
                    }
                }
            }
        }


        const balance_flag = !!(this.props.balance && this.props.balance.balance.toFixed(0) > totalOdds)
        return (
            sattas_bets && Object.keys(sattas_bets).length > 0 ?
                (
                    <div className='sports-bet-sidebar'>
                        <div className='betslip'>
                            <div className='wrapper active u-bordercolor-piccolo'>
                                <ul className='betslip-tabs'>
                                    <li className='tab' onClick={() => this.changeType('single')}>
                                        <div className={this.state.active === 'single' ? 'active' : ''}>Single
                                        <span className="amount">{index !== 0 ? index : ""}</span>
                                        </div>
                                    </li>
                                    <li className='button'>
                                        <div onClick={() => this.props.betslipOpen(!this.props.betslip)}>
                                            <svg fill="#fff" height="32" width="32" viewBox="0 0 512 512">
                                                {
                                                    this.props.betslip ? (
                                                        <path d="M507 205.8H5v100.4h502z"></path>
                                                    ) : (
                                                        <path d="M506.997 205.799H306.201V5H205.799v200.799H5.003v100.399h200.796V507h100.402V306.198h200.796z"></path>
                                                    )
                                                }
                                            </svg>
                                        </div>
                                    </li>
                                </ul>
                                {this.props.betslip && index ? (
                                    <>
                                        <Row className='p-1'>
                                            <Col md={12} className='pl-1 pr-1 btn-block w-100'>
                                                <Input value={`Bet Id : ${  this.props.betId}`} className='round' style={{ color: 'white', opacity: "1", textAlign: 'center' }} readOnly />
                                            </Col>
                                        </Row>
                                        <div className='scrolllock'>
                                            {
                                                // this.state.active === 'single' ?
                                                Object.keys(sattas_bets).map((item, i) => (
                                                    <div key={i}>
                                                        <div className='bets'>
                                                            <div className='justify-content-center d-flex align-items-center'>
                                                                <div className="title color-white font-weight-bold">
                                                                    {sattas_bets[item]["bazaarname"]}
                                                                </div>
                                                            </div>
                                                            {
                                                                Object.keys(sattas_bets[item]["gamesnode"]).map((itemj, j) => (
                                                                    Object.keys(sattas_bets[item]["gamesnode"][itemj]["betsnode"]).map((itemk, k) => (
                                                                        Object.keys(sattas_bets[item]["gamesnode"][itemj]["betsnode"][itemk]).map((iteml, l) => (
                                                                            <React.Fragment key={l}>
                                                                                {
                                                                                    this.betitemRender(item, itemj, itemk, iteml)
                                                                                }
                                                                            </React.Fragment>
                                                                        ))
                                                                    ))
                                                                ))
                                                            }
                                                        </div>

                                                    </div>
                                                ))
                                            }
                                            <div className='p-1' style={{ borderTop: '1px solid #31373f' }}>
                                                {
                                                    this.state.active !== "single" ? <div className='lower'>
                                                            <Input required value={this.state.multiAmount ? this.state.multiAmount : ""} onChange={(e) => this.multiAmountChange(e.target.value)} className='round' id='input-statk' placeholder='Enter your stake' type='number' style={{ textAlign: 'right' }} />
                                                        </div> : null
                                                }
                                                <div className='event-footer' style={{ display: 'flex' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'flex-start', width: 'calc(100% - 80px)', color: 'white' }} className=" mt-1">
                                                        Max  Potential Win :
                                                </div>
                                                    <div className='potentialwin mt-1' style={{ display: 'flex', justifyContent: 'flex-end', width: '80px' }}>
                                                        <span className="sum"> {currencyLabel}
                                                            <span className="numbers">{Maxpotentialwin}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='event-footer' style={{ display: 'flex' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'flex-start', width: 'calc(100% - 80px)', color: 'white' }} className=" mt-0">
                                                        Min Potential Win :
                                                </div>
                                                    <div className='potentialwin mt-0' style={{ display: 'flex', justifyContent: 'flex-end', width: '80px' }}>
                                                        <span className="sum"> {currencyLabel}
                                                            <span className="numbers">{Minpotentialwin}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                {
                                                    this.state.active === "single" ? <div className='event-footer' style={{ display: 'flex' }}>
                                                            <div style={{ display: 'flex', justifyContent: 'flex-start', width: '80px', color: 'white' }}>
                                                                BetAmount :
                                                                </div>
                                                            <div className='potentialwin' style={{ display: 'flex', justifyContent: 'flex-end', width: 'calc(100% - 80px)' }}>
                                                                <span className="sum">
                                                                    <span className="numbers">{`${totalOdds  }`}</span>
                                                                </span>
                                                            </div>
                                                        </div> : null
                                                }
                                                <Row>
                                                    <Col md={12} className='pt-1 pl-1 pr-1'>
                                                        {
                                                            user ? balance_flag ? <Button type="submit" className="round btn-block igamez-button" color="warning" onClick={() => this.bet()}>
                                                                        {totalOdds ? `Place Bet ${  totalOdds  } ${  currencyLabel}` : "Place Bet "}
                                                                    </Button> : <Button className="round btn-block igamez-button" color="warning" onClick={() => this.show_depositform()}> Deposit </Button> : <Button className="round btn-block igamez-button" color="warning" onClick={() => this.show_loginform()}> Login </Button>
                                                        }
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={12} className='pt-1 pl-1 pr-1'>
                                                        <div onClick={() => this.removeAllItem()} className='remove u-color-piccolo' style={{ textAlign: 'center', cursor: 'pointer' }}>
                                                            Remove all bets&nbsp;&nbsp;×
                                                    </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>
                ) : <div />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        balance: state.balance.value,
        satta_bet_data: state.satta.betsdata,
        betslip: state.satta.betslip,
        betId: state.satta.betId,
        currencyLabel: state.auth.login.currencyLabel

    }
}

const mapDispatchToProps = {
    setloginpage,
    update_satta,
    satta_bet_save,
betslipOpen
}

export default connect(mapStateToProps, mapDispatchToProps)(BetSidebar)
