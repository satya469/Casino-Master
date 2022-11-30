import React from "react"
import Media from "react-media"
import { Col, Row } from "reactstrap"
import { history } from "../../../history"
import { connect } from 'react-redux'
import { setItem } from '../../../redux/actions/sports'
import sportsconfig from "../../../configs/sportsconfig"
import classnames from "classnames"
import { Fragment } from "react"
import { UserContext } from "../../../utility/UserContext"

class Sportsevents extends React.Component {
    static contextType = UserContext

    async sportsEvent(e) {
        const { sports } = this.context
        if (sports) {
            history.push(`/sportsevent?sportsbook=true&event_id=${e.event_id}`)
        } else {
            history.push(`/sportsevent?event_id=${e.event_id}`)
        }
        // window.location.reload()
    }

    setOdds(p1, p2) {
        const { sports } = this.context

        const data = {
            event_id: this.props.sportsEvents.event_id,
            EventStatus: this.props.sportsEvents.EventStatus,
            AwayCompetitor: this.props.sportsEvents.AwayCompetitor,
            HomeCompetitor: this.props.sportsEvents.HomeCompetitor,
            sportid: this.props.sportsEvents.sportid,
            ScheduledTime: this.props.sportsEvents.ScheduledTime,
            MarketId: p1.MarketId,
            MarketName: p1.MarketName,
            MarketSpecifiers: p1.MarketSpecifiers,
            MarketStatus: p1.MarketStatus,
            produceStatus: true
        }
        let d = Object.assign({}, p2, data)
        this.props.setItem(d)
        if (sports) {
            window.postMessage(JSON.stringify({ action: "setodds", value: d }), "*")
        }
    }

    changeTime() {
        let time, sportsEvents = this.props.sportsEvents;
        if (sportsEvents.Status && sportsEvents.Status.EventTime) {
            time = sportsEvents.Status.EventTime
        } else {
            let date = new Date(sportsEvents.ScheduledTime);
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hour = date.getHours();
            let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            time = month + "/" + day + " " + hour + ":" + minute;
        }
        return time
    }

    render() {
        const { sportsEvents, sportsSidebarData, all_sports_list, firstpage } = this.props
        const sportsKey = all_sports_list.findIndex(item => item.sport_id === sportsEvents.sportid)
        const sportsItem = all_sports_list[sportsKey]

        return (
            <Media queries={{ small: "(max-width: 768px)", medium: "(min-width: 769px) and (max-width: 999px)", large: "(min-width: 1000px)" }}>
                {matches => (
                    <React.Fragment>
                        {matches.small &&
                            <Row className='martketbody m-0 pt-1 pl-1 pb-1' style={{ paddingRight: "0.2rem" }}>
                                <div className='sports-align-left' style={{ width: 'calc(100% - 30px)' }}>
                                    <Row style={{ width: '100%' }}>
                                        <Col xs={6} className="pr-0">
                                            <Row className="m-0">
                                                <Col xs={10} className='sports-team p-0'>
                                                    <Col xs="12" className="p-0 m-0">
                                                        {
                                                            sportsEvents.HomeCompetitor ? <>
                                                                <div onClick={() => this.sportsEvent(sportsEvents)}>{sportsEvents.HomeCompetitor}</div>
                                                                <div onClick={() => this.sportsEvent(sportsEvents)}>{sportsEvents.AwayCompetitor}</div>
                                                            </> : <div onClick={() => this.sportsEvent(sportsEvents)}>{sportsEvents.event_name}</div>
                                                        }
                                                    </Col>
                                                    <Col xs={12} className='sports-start-time p-0 m-0'>
                                                        {this.changeTime()}
                                                    </Col>
                                                </Col>
                                                <Col xs={2} className='sports-score-board' style={{ padding: "0", paddingTop: "0.5rem" }}>
                                                    <div>{sportsEvents.Status ? !sportsEvents.Status.HomeScore ? 0 : sportsEvents.Status.HomeScore : 0}</div>
                                                    <div>{sportsEvents.Status ? !sportsEvents.Status.AwayScore ? 0 : sportsEvents.Status.AwayScore : 0}</div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col className='item-center p-0' xs={6}>
                                            <Row>
                                                <Col xs={12} className='p-0'>
                                                    <EventItem
                                                        data1={sportsEvents.oneTotwo.one}
                                                        data2={sportsEvents.oneTotwo}
                                                        sportsEvents={sportsEvents}
                                                        sportsSidebarData={sportsSidebarData}
                                                        setOdds={(a, b) => this.setOdds(a, b)}
                                                        recoveyrEventStaus={this.props.recoveyrEventStaus}
                                                    />
                                                    <EventItem
                                                        data1={sportsEvents.oneTotwo.draw}
                                                        data2={sportsEvents.oneTotwo}
                                                        sportsEvents={sportsEvents}
                                                        sportsSidebarData={sportsSidebarData}
                                                        setOdds={(a, b) => this.setOdds(a, b)}
                                                        recoveyrEventStaus={this.props.recoveyrEventStaus}
                                                    />
                                                    {
                                                        sportsEvents.oneTotwo.two &&
                                                        <EventItem
                                                            data1={sportsEvents.oneTotwo.two}
                                                            data2={sportsEvents.oneTotwo}
                                                            sportsEvents={sportsEvents}
                                                            sportsSidebarData={sportsSidebarData}
                                                            setOdds={(a, b) => this.setOdds(a, b)}
                                                            recoveyrEventStaus={this.props.recoveyrEventStaus}
                                                        />
                                                    }
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='d-flex'>
                                    <div onClick={() => this.sportsEvent(sportsEvents)} style={{ width: '30px' }} className='sports-other-markets odds_num'>{sportsEvents.marketLen}</div>
                                </div>
                            </Row>
                        }
                        {matches.medium &&
                            <Row className='martketbody m-0 p-1'>
                                <div className='sports-align-left' style={{ width: 'calc(100% - 50px)' }}>
                                    <Row style={{ width: '100%' }}>
                                        <Col sm={3} className="pr-0">
                                            <Row>
                                                <Col sm={3} className='sports-team pr-0 matchid'>
                                                    <div onClick={() => this.sportsEvent(sportsEvents)} className="mt-1">{sportsEvents.event_id}</div>
                                                </Col>
                                                <Col sm={7} className='sports-team'>
                                                    {
                                                        sportsEvents.HomeCompetitor ? <>
                                                            <div onClick={() => this.sportsEvent(sportsEvents)}>{sportsEvents.HomeCompetitor}</div>
                                                            <div onClick={() => this.sportsEvent(sportsEvents)}>{sportsEvents.AwayCompetitor}</div>
                                                        </> : <div onClick={() => this.sportsEvent(sportsEvents)}>{sportsEvents.event_name}</div>
                                                    }
                                                </Col>
                                                <Col sm={1} className='sports-start-time m-0 p-0'>
                                                    {this.changeTime()}
                                                </Col>
                                                <Col sm={1} className='sports-score-board m-0 p-0'>
                                                    <div>{sportsEvents.Status ? !sportsEvents.Status.HomeScore ? 0 : sportsEvents.Status.HomeScore : 0}</div>
                                                    <div>{sportsEvents.Status ? !sportsEvents.Status.AwayScore ? 0 : sportsEvents.Status.AwayScore : 0}</div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col className='item-center p-0' sm={7}>
                                            <Row>
                                                <Col xs={12}>
                                                    <EventItem
                                                        data1={sportsEvents.oneTotwo.one}
                                                        data2={sportsEvents.oneTotwo}
                                                        sportsEvents={sportsEvents}
                                                        sportsSidebarData={sportsSidebarData}
                                                        setOdds={(a, b) => this.setOdds(a, b)}
                                                        recoveyrEventStaus={this.props.recoveyrEventStaus}
                                                    />
                                                    <EventItem
                                                        data1={sportsEvents.oneTotwo.draw}
                                                        data2={sportsEvents.oneTotwo}
                                                        sportsEvents={sportsEvents}
                                                        sportsSidebarData={sportsSidebarData}
                                                        setOdds={(a, b) => this.setOdds(a, b)}
                                                        recoveyrEventStaus={this.props.recoveyrEventStaus}
                                                    />
                                                    {
                                                        sportsEvents.oneTotwo.two &&
                                                        <EventItem
                                                            data1={sportsEvents.oneTotwo.two}
                                                            data2={sportsEvents.oneTotwo}
                                                            sportsEvents={sportsEvents}
                                                            sportsSidebarData={sportsSidebarData}
                                                            setOdds={(a, b) => this.setOdds(a, b)}
                                                            recoveyrEventStaus={this.props.recoveyrEventStaus}
                                                        />
                                                    }
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='d-flex'>
                                    <div onClick={() => this.sportsEvent(sportsEvents)} style={{ width: '50px' }} className='sports-other-markets odds_num'>{sportsEvents.marketLen}</div>
                                </div>
                            </Row>
                        }
                        {matches.large &&
                            <Row className={'martketbody m-0 p-1'} style={{ height: firstpage ? `${100 / 3}%` : "100%" }} >
                                <div className='sports-align-left' style={{ width: 'calc(100% - 50px)' }}>
                                    <Row style={{ width: '100%' }}>
                                        {
                                            !firstpage ?
                                                <Fragment>
                                                    <Col sm={4} className="pr-0">
                                                        <Row className="mr-0">
                                                            <Col sm={7} className='sports-team'>
                                                                {
                                                                    sportsEvents.HomeCompetitor ? <>
                                                                        <div onClick={() => this.sportsEvent(sportsEvents)}>{sportsEvents.HomeCompetitor}</div>
                                                                        <div onClick={() => this.sportsEvent(sportsEvents)}>{sportsEvents.AwayCompetitor}</div>
                                                                    </> : <div onClick={() => this.sportsEvent(sportsEvents)}>{sportsEvents.event_name}</div>
                                                                }
                                                            </Col>
                                                            <Col sm={1} className='sports-start-time m-0 p-0'>
                                                                {this.changeTime()}
                                                            </Col>
                                                            <Col sm={1} className='sports-score-board m-0 p-0'>
                                                                <div>{sportsEvents.Status ? !sportsEvents.Status.HomeScore ? 0 : sportsEvents.Status.HomeScore : 0}</div>
                                                                <div>{sportsEvents.Status ? !sportsEvents.Status.AwayScore ? 0 : sportsEvents.Status.AwayScore : 0}</div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col className='item-center p-0' sm={8}>
                                                        <Row>
                                                            <Col xs={4}>
                                                                <EventItem
                                                                    data1={sportsEvents.oneTotwo.one}
                                                                    data2={sportsEvents.oneTotwo}
                                                                    sportsEvents={sportsEvents}
                                                                    sportsSidebarData={sportsSidebarData}
                                                                    setOdds={(a, b) => this.setOdds(a, b)}
                                                                    recoveyrEventStaus={this.props.recoveyrEventStaus}
                                                                />
                                                                <EventItem
                                                                    data1={sportsEvents.oneTotwo.draw}
                                                                    data2={sportsEvents.oneTotwo}
                                                                    sportsEvents={sportsEvents}
                                                                    sportsSidebarData={sportsSidebarData}
                                                                    setOdds={(a, b) => this.setOdds(a, b)}
                                                                    recoveyrEventStaus={this.props.recoveyrEventStaus}
                                                                />
                                                                {
                                                                    sportsEvents.oneTotwo.two &&
                                                                    <EventItem
                                                                        data1={sportsEvents.oneTotwo.two}
                                                                        data2={sportsEvents.oneTotwo}
                                                                        sportsEvents={sportsEvents}
                                                                        sportsSidebarData={sportsSidebarData}
                                                                        setOdds={(a, b) => this.setOdds(a, b)}
                                                                        recoveyrEventStaus={this.props.recoveyrEventStaus}
                                                                    />
                                                                }
                                                            </Col>
                                                            <Col xs={4}>
                                                                <EventItem
                                                                    data1={sportsEvents.handicap.one}
                                                                    data2={sportsEvents.handicap}
                                                                    sportsEvents={sportsEvents}
                                                                    sportsSidebarData={sportsSidebarData}
                                                                    setOdds={(a, b) => this.setOdds(a, b)}
                                                                    recoveyrEventStaus={this.props.recoveyrEventStaus}
                                                                />
                                                                <EventItem
                                                                    data1={sportsEvents.handicap.two}
                                                                    data2={sportsEvents.handicap}
                                                                    sportsEvents={sportsEvents}
                                                                    sportsSidebarData={sportsSidebarData}
                                                                    setOdds={(a, b) => this.setOdds(a, b)}
                                                                    recoveyrEventStaus={this.props.recoveyrEventStaus}
                                                                />
                                                            </Col>
                                                            <Col xs={4}>
                                                                <EventItem
                                                                    data1={sportsEvents.total.one}
                                                                    data2={sportsEvents.total}
                                                                    sportsEvents={sportsEvents}
                                                                    sportsSidebarData={sportsSidebarData}
                                                                    setOdds={(a, b) => this.setOdds(a, b)}
                                                                    recoveyrEventStaus={this.props.recoveyrEventStaus}
                                                                />
                                                                <EventItem
                                                                    data1={sportsEvents.total.two}
                                                                    data2={sportsEvents.total}
                                                                    sportsEvents={sportsEvents}
                                                                    sportsSidebarData={sportsSidebarData}
                                                                    setOdds={(a, b) => this.setOdds(a, b)}
                                                                    recoveyrEventStaus={this.props.recoveyrEventStaus}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Fragment> :
                                                <Fragment>
                                                    <Col sm={6} className="pr-0">
                                                        <Row className="mr-0">
                                                            <Col sm={3} className='sports-team pr-0 matchid'>
                                                                {
                                                                    <div onClick={() => this.sportsEvent(sportsEvents)}>
                                                                        <div className="d-flex justify-content-center">
                                                                            <svg style={{ color: sportsItem.color }} width="22" height="22" viewBox={sportsItem.viewBox}>
                                                                                <path d={sportsItem.icon} fill="currentColor" />
                                                                            </svg>
                                                                        </div>
                                                                        <div className={"sport-4 font-color-1"}>
                                                                            {sportsItem.sport_name}
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </Col>
                                                            <Col sm={6} className='sports-team'>
                                                                {
                                                                    sportsEvents.HomeCompetitor ? <>
                                                                        <div onClick={() => this.sportsEvent(sportsEvents)}>{sportsEvents.HomeCompetitor}</div>
                                                                        <div onClick={() => this.sportsEvent(sportsEvents)}>{sportsEvents.AwayCompetitor}</div>
                                                                    </> : <div onClick={() => this.sportsEvent(sportsEvents)}>{sportsEvents.event_name}</div>
                                                                }
                                                            </Col>
                                                            <Col sm={2} className='sports-start-time m-0 p-0'>
                                                                {this.changeTime()}
                                                            </Col>
                                                            <Col sm={1} className='sports-score-board m-0 p-0'>
                                                                <div>{sportsEvents.Status ? !sportsEvents.Status.HomeScore ? 0 : sportsEvents.Status.HomeScore : 0}</div>
                                                                <div>{sportsEvents.Status ? !sportsEvents.Status.AwayScore ? 0 : sportsEvents.Status.AwayScore : 0}</div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col className='item-center p-0' sm={6}>
                                                        <Row>
                                                            <Col xs={6}>
                                                                <EventItem
                                                                    data1={sportsEvents.oneTotwo.one}
                                                                    data2={sportsEvents.oneTotwo}
                                                                    sportsEvents={sportsEvents}
                                                                    sportsSidebarData={sportsSidebarData}
                                                                    setOdds={() => this.sportsEvent(sportsEvents)}
                                                                    recoveyrEventStaus={this.props.recoveyrEventStaus}
                                                                />
                                                                <EventItem
                                                                    data1={sportsEvents.oneTotwo.draw}
                                                                    data2={sportsEvents.oneTotwo}
                                                                    sportsEvents={sportsEvents}
                                                                    sportsSidebarData={sportsSidebarData}
                                                                    setOdds={() => this.sportsEvent(sportsEvents)}
                                                                    recoveyrEventStaus={this.props.recoveyrEventStaus}
                                                                />
                                                                {
                                                                    sportsEvents.oneTotwo.two &&
                                                                    <EventItem
                                                                        data1={sportsEvents.oneTotwo.two}
                                                                        data2={sportsEvents.oneTotwo}
                                                                        sportsEvents={sportsEvents}
                                                                        sportsSidebarData={sportsSidebarData}
                                                                        setOdds={() => this.sportsEvent(sportsEvents)}
                                                                        recoveyrEventStaus={this.props.recoveyrEventStaus}
                                                                    />
                                                                }
                                                            </Col>
                                                            <Col xs={6}>
                                                                <EventItem
                                                                    data1={sportsEvents.handicap.one}
                                                                    data2={sportsEvents.handicap}
                                                                    sportsEvents={sportsEvents}
                                                                    sportsSidebarData={sportsSidebarData}
                                                                    setOdds={() => this.sportsEvent(sportsEvents)}
                                                                    recoveyrEventStaus={this.props.recoveyrEventStaus}
                                                                />
                                                                <EventItem
                                                                    data1={sportsEvents.handicap.two}
                                                                    data2={sportsEvents.handicap}
                                                                    sportsEvents={sportsEvents}
                                                                    sportsSidebarData={sportsSidebarData}
                                                                    setOdds={() => this.sportsEvent(sportsEvents)}
                                                                    recoveyrEventStaus={this.props.recoveyrEventStaus}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Fragment>
                                        }
                                    </Row>
                                </div>
                                <div className='d-flex'>
                                    <div onClick={() => this.sportsEvent(sportsEvents)} style={{ width: '50px' }} className='sports-other-markets odds_num'>{`+${sportsEvents.marketLen}`}</div>
                                </div>
                            </Row>
                        }
                    </React.Fragment>
                )}
            </Media>
        )
    }
}

const EventItem = ({ data1, data2, sportsEvents, setOdds, sportsSidebarData, recoveyrEventStaus }) => (
    data1 &&
        recoveyrEventStaus === true &&
        (sportsEvents.EventStatus === sportsconfig.LIVE || sportsEvents.EventStatus === sportsconfig.NotStarted) &&
        data2.MarketStatus === sportsconfig.ACTIVE &&
        data1.OutcomeStatus ?
        <div onClick={() => setOdds(data2, data1)}
            className={classnames("odds_num", {
                active_odds_num: 
                    sportsSidebarData.data.findIndex(
                        data => data.OutcomeId === data1.OutcomeId &&
                        data.OutcomeName === data1.OutcomeName &&
                        data.MarketId === data2.MarketId &&
                        data.MarketName === data2.MarketName &&
                        data.MarketSpecifiers === data2.MarketSpecifiers &&
                        data.event_id === sportsEvents.event_id
                    ) > -1,
                sportup: data1.lastodd && data1.lastodd < data1.OutcomeOdds,
                sportdown: data1.lastodd && data1.lastodd > data1.OutcomeOdds,
            }
            )}
        >
            {data1.OutcomeOdds}
        </div>
         : 
        <div className="odds_num">{sportsconfig.Lock}</div>
)

const mapStateToProps = (state) => ({
    sportsSidebarData: state.sports.sportsSidebarData,
    recoveyrEventStaus: state.sports.recoveyrEventStaus,
    all_sports_list: state.sports.all_sports_list
})

const mapDispatchToProps = {
    setItem
}

export default connect(mapStateToProps, mapDispatchToProps)(Sportsevents)
