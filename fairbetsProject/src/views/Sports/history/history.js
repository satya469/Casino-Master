import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Badge } from "reactstrap"
import { cashOut } from "../../../redux/actions/sports/index"
import { ChevronDown, ChevronUp } from "react-feather"

export class Events extends Component {

    state = {
        flag: false
    }

    changeFlag() {
        this.setState({ flag: !this.state.flag })
    }

    render() {
        const sport = this.props.all_sports_list.findIndex(item => item.sport_id === this.props.data.betting.sportid)
        const sportType = this.props.all_sports_list[sport]
        const { selectId, data, currencyLabel } = this.props
        const { flag } = this.state

        return (
            <Col lg="6" md="12" className="mt-1">
                <div style={{ borderRadius: "8px" }} onClick={() => this.changeFlag()} className='iWQazw igamez-sport-background'>
                    <svg style={{ color: sportType.color, margin: '0.8rem' }} width="1.5rem" height="1.5rem" viewBox={sportType.viewBox}>
                        <path d={sportType.icon} fill="currentColor" />
                    </svg>
                    <Badge color={`light-${data.betting.betType === "SINGLE" ? 'success' : 'warning'}`} pill>
                        {data.betting.betType}
                    </Badge>
                    {
                        selectId !== 1 &&
                        <Badge color={`light-${data.TYPE === "WIN" ? 'success' : 'danger'}`} pill>
                            {data.TYPE === "WIN" ? (
                                data.betting.isVFHALFWIN ? "Win and half refund" : (
                                    data.betting.isDHFHALFWIN ? "Win dead-factor 0.5" : (
                                        data.betting.isDHFTHIRDWIN ? "Win dead-factor 0.3" : "Win"
                                    )
                                )
                            ) : (
                                data.TYPE === "BET" ? (
                                    data.betting.isVFHALFLOST ? "Refund all" : (
                                        data.betting.isVFALLLOST ? "Lose and half refund" : "LOSE"
                                    )
                                ) : "CANCEL"
                            )
                            }
                        </Badge>
                    }
                    {data.betting.priceBoost && <Badge color={"light-success"} pill> Boosted </Badge>}
                    <div className="sports-country-title float-right" style={{ margin: '0.8rem' }}>
                        {flag ? <ChevronUp className='igamez-icon' size={20} /> : <ChevronDown size={20} />}
                    </div>
                </div>
                {
                    flag &&
                    <div className='iWQazw igamez-sport-background' style={{ borderRadius: "8px" }}>
                        <div style={{ padding: '0.8rem' }}>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='font-weight-bold text-white' style={{ fontSize: '1rem' }}>{data.betting.MatchName}</div>
                                <div className='igamez-icon font-weight-bold' style={{ fontSize: '1rem' }}>{data.betting.OutcomeOdds}</div>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div style={{ fontSize: '0.85rem', color: '#c2c6dc' }}>{data.betting.MarketName}</div>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div style={{ fontSize: '0.85rem', color: '#c2c6dc' }}>{data.betting.OutcomeName}</div>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='igamez-icon' style={{ fontSize: '0.85rem', color: '#c2c6dc' }}>Bet Date: {data.betting.matchTime}</div>
                                <div className='igamez-icon' style={{ fontSize: '0.85rem', color: '#c2c6dc' }}>Match Date: {data.betting.Date}</div>
                            </div>

                        </div>
                    </div>
                }
                <div style={{ borderRadius: "8px", padding: '0.8rem' }} className='igamez-sport-background'>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex flex-1 justify-content-start' style={{ fontSize: '0.85rem', color: '#c2c6dc' }}>Odds</div>
                        <div className='d-flex flex-1 justify-content-center' style={{ fontSize: '0.85rem', color: '#c2c6dc' }}>Stake {currencyLabel}</div>
                        <div className='d-flex flex-1 justify-content-end' style={{ fontSize: '0.85rem', color: '#c2c6dc' }}>
                            {
                                data.betting.handleState ? (
                                    data.TYPE === "WIN" ? `Won ${currencyLabel}` : (
                                        data.betting.isVFHALFLOST || data.betting.isVFALLLOST ? "Void Won" : `Lost ${currencyLabel}`
                                    )
                                ) : `Potential win ${currencyLabel}`
                            }
                        </div>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex flex-1 justify-content-start igamez-icon' style={{ fontSize: '0.85rem' }}>{data.betting.OutcomeOdds}</div>
                        <div className='d-flex flex-1 justify-content-center' style={{ fontSize: '0.85rem', color: '#c2c6dc' }}>{parseFloat(data.AMOUNT).toFixed(2)}</div>
                        <div className='d-flex flex-1 justify-content-end' style={{ fontSize: '0.85rem', color: '#c2c6dc' }}>
                            {
                                data.betting.handleState ? data.betting.resultMoney : parseFloat(data.AMOUNT * data.betting.OutcomeOdds).toFixed(2)
                            }
                        </div>
                    </div>
                    {/* <Button className='igamez-button' color="warning" style={{ width: '100%', fontWeight: 'bold' }} type="button" onClick={() => this.props.cashOut(data)}>{`Cashout ${data.AMOUNT*0.8} ?`}</Button> */}
                </div>
            </Col>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currencyLabel: state.auth.login.currencyLabel

    }
}

const mapDispatchToProps = {
    cashOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)
