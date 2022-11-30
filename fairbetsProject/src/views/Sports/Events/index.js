import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Card, CardImg, Col, CardImgOverlay } from "reactstrap"
import SportsEventItem from './SportsEventItem'
import { getAllSportsType, currentSelecteGame, TapChange, getSportsMatchPlayer, current_select_sport, countryChange } from "../../../redux/actions/sports/index"
import sportsconfig from "../../../configs/sportsconfig"
import { ChevronRight } from "react-feather"
import Media from "react-media"
import { history } from "../../../history"
import { UserContext } from "../../../utility/UserContext"
import querystring from "query-string"

export class Events extends Component {
    static contextType = UserContext

    constructor(props) {
        super(props)
        this.state = {
            team: {
                event_id: querystring.parse(history.location.search).event_id
            },
            category: "",
            category1: "",
            category2: ""
        }
    }

    async componentDidMount() {
        await this.props.currentSelecteGame(this.state.team)

        const thisSportId = this.state.team.sportid
        if (thisSportId === 1 || thisSportId === 21 || thisSportId === 5) {
            let oldP = document.getElementById("matchId");
            if(oldP) {
                oldP.parentNode.removeChild(oldP);
            }
            let oldS = document.getElementById("lmt-script");
            if(oldS) {
                oldS.parentNode.removeChild(oldS);
            }

            const P = document.createElement("p")
            P.id = "matchId"
            P.className = this.state.team.event_id
            document.body.appendChild(P)

            const script = document.createElement("script")
            script.src = "/sport-lmt.js"
            script.id = "lmt-script"
            script.async = true
            document.body.appendChild(script)
        }
    }

    componentDidUpdate() {
        if (JSON.stringify(this.props.currentSelectedGame) !== "{}" && this.state.team !== this.props.currentSelectedGame) {
            const team = this.props.currentSelectedGame
            team.market.sort(function (A, B) {
                return A.MarketId < B.MarketId ? -1 : 1
            })
            this.setState({ team })
        }
    }

    async gotoOtherSportPage(Item) {
        const { sports, socketid } = this.context
        const index = sportsconfig.tab.findIndex(item => item.EventStatus === this.state.team.EventStatus)
        const currentTap = index > -1 ? sportsconfig.tab[index] : sportsconfig.tab[0]
        const sendData = {
            sportid: Item.sport_id,
            EventStatus: currentTap.EventStatus
        }
        await this.props.TapChange(currentTap)
        await this.props.current_select_sport(Item)
        await this.props.getSportsMatchPlayer(sendData)
        if (sports) {
            history.push(`/sports?sportsbook=true&socketid=${socketid}`)
        } else {
            history.push("/sports")
        }
    }

    async gotoOtherCountryPage(country, Item) {
        const { sports, socketid } = this.context
        const index = sportsconfig.tab.findIndex(item => item.EventStatus === this.state.team.EventStatus)
        const currentTap = index ? sportsconfig.tab[index] : sportsconfig.tab[0]
        const sendData = {
            sportid: Item.sport_id,
            EventStatus: currentTap.EventStatus
        }
        await this.props.countryChange(country)
        await this.props.TapChange(currentTap)
        await this.props.current_select_sport(Item)
        await this.props.getSportsMatchPlayer(sendData)
        if (sports) {
            history.push(`/sports?sportsbook=true&socketid=${socketid}`)
        } else {
            history.push("/sports")
        }
    }

    widgetRender = () => {
        return <Col xs='12' className="m-0 p-0">
            <div className="widgets">
                <div><div className="sr-widget sr-widget-1"></div></div>
            </div>
        </Col>
    }

    changeTime() {
        let time, sportsEvents = this.state.team;
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
        const { team } = this.state
        const symbol = <ChevronRight size={15} />

        const index = this.props.all_sports_list.findIndex(item => item.sport_id === this.state.team.sportid)
        let category = "", categoryOne = null
        let category1 = ""
        let category2 = ""

        if (index > -1) {
            category = this.props.all_sports_list[index].sport_name
            categoryOne = this.props.all_sports_list[index]
        }
        if (this.state.team.Venue) {
            category1 = this.state.team.Venue.country
        }
        if (this.state.team.Season) {
            category2 = this.state.team.Season.Name
        }

        return (
            <div className='sports-events'>
                <Row>
                    <Col sm='12' className="m-0 p-0 mt-1">
                        <Card className="text-white">
                            <div className='sports-events-title' style={{ zIndex: '999' }}>
                                {
                                    category.length && category1.length && category2.length ? <React.Fragment>
                                        <span onClick={() => this.gotoOtherSportPage(categoryOne)} style={{ cursor: 'pointer' }}> {category} </span> <span className="symbol">{symbol} </span>
                                        <span onClick={() => this.gotoOtherCountryPage(category1, categoryOne)} style={{ cursor: 'pointer' }}> {category1} </span> <span className="symbol">{symbol} </span>
                                        <span className="lastcategory"> {category2}</span>
                                    </React.Fragment> : category.length && category1.length ? <React.Fragment>
                                        <span onClick={() => this.gotoOtherSportPage(categoryOne)} style={{ cursor: 'pointer' }}> {category} </span> <span className="symbol">{symbol} </span>
                                        <span onClick={() => this.gotoOtherCountryPage(category1, categoryOne)} style={{ cursor: 'pointer' }} className="lastcategory"> {category1} </span>
                                    </React.Fragment> : <React.Fragment>
                                        <span onClick={() => this.gotoOtherSportPage(categoryOne)} style={{ cursor: 'pointer' }}> {category} </span>
                                    </React.Fragment>
                                }
                            </div>

                            <Media queries={{ small: "(max-width: 768px)", medium: "(min-width: 769px) and (max-width: 999px)", large: "(min-width: 1000px)" }}>
                                {matches => (
                                    <React.Fragment>
                                        {matches.medium &&
                                            <React.Fragment>
                                                <CardImg bottom className="img-fluid" src={sportsconfig.img4} alt="card image cap" />
                                                <CardImgOverlay className="d-flex align-items-center text-center justify-content-center">
                                                    <Row className="text-center w-100">
                                                        <Col sm="4" className="text-right">
                                                            <h4>
                                                                {team.HomeCompetitor}
                                                            </h4>
                                                        </Col>
                                                        <Col sm="4">
                                                            <h4>
                                                                {
                                                                    team.Status ? (
                                                                        `${team.Status.HomeScore ? team.Status.HomeScore : 0} - ${team.Status.AwayScore ? team.Status.AwayScore : 0}`
                                                                    ) : "0 - 0"
                                                                }
                                                            </h4>
                                                            <h4>
                                                                {this.changeTime()}
                                                            </h4>
                                                        </Col>
                                                        <Col sm="4" className="text-left">
                                                            <h4>
                                                                {team.AwayCompetitor}
                                                            </h4>
                                                        </Col>
                                                    </Row>
                                                </CardImgOverlay>
                                            </React.Fragment>
                                        }
                                        {matches.large &&
                                            <React.Fragment>
                                                <CardImg bottom className="img-fluid" src={sportsconfig.img4} alt="card image cap" />
                                                <CardImgOverlay className="d-flex align-items-center text-center justify-content-center">
                                                    <Row className="text-center w-100">
                                                        <Col md="4" className="text-right">
                                                            <h1>
                                                                {team.HomeCompetitor}
                                                            </h1>
                                                        </Col>
                                                        <Col md="4">
                                                            <h2>
                                                                {
                                                                    team.Status ? (
                                                                        `${team.Status.HomeScore ? team.Status.HomeScore : 0} - ${team.Status.AwayScore ? team.Status.AwayScore : 0}`
                                                                    ) : "0 - 0"
                                                                }
                                                            </h2>
                                                            <h2>
                                                            {this.changeTime()}

                                                            </h2>
                                                        </Col>
                                                        <Col md="4" className="text-left">
                                                            <h1>
                                                                {team.AwayCompetitor}
                                                            </h1>
                                                        </Col>
                                                    </Row>
                                                </CardImgOverlay>
                                            </React.Fragment>
                                        }
                                    </React.Fragment>
                                )}
                            </Media>
                        </Card>
                    </Col>
                </Row>
                <Media queries={{ small: "(max-width: 768px)", medium: "(min-width: 769px) and (max-width: 999px)", large: "(min-width: 1000px)" }}>
                    {matches => (
                        <React.Fragment>
                            {(matches.small) &&
                                <React.Fragment>
                                    {
                                        this.widgetRender(team)
                                    }
                                </React.Fragment>
                            }
                        </React.Fragment>
                    )}
                </Media>
                <Media
                    queries={{
                        small: "(max-width: 768px)",
                        medium: "(min-width: 769px) and (max-width: 999px)",
                        large: "(min-width: 1000px)"
                    }}>
                    {matches => (
                        <React.Fragment>
                            {(matches.large || matches.medium) &&
                                <React.Fragment>
                                    <Row className='mb-2'>
                                        <Col xs='12' lg='9'>
                                            {
                                                team.EventStatus === sportsconfig.FINISHED || team.isFinished ? <h1> Attention! All markets Finished. </h1> : (
                                                    this.props.recoveyrEventStaus === true ? (
                                                        team.permission ? (
                                                            team.market ? team.market.map((Item, index) => (
                                                                <SportsEventItem team={team} Item={Item} key={index} />
                                                            )) : "no market"
                                                        ) : <h1>This event is blocked by agent system.</h1>
                                                    ) : <h1>
                                                        Now Betrada server is downtime. Please wait some minute.
                                                        Or Please check your network status.
                                                    </h1>
                                                )
                                            }
                                        </Col>
                                        <Col xs='12' lg='3'>
                                            <div className="widgets">
                                                <div><div className="sr-widget sr-widget-1"></div></div>
                                            </div>
                                        </Col>
                                    </Row>
                                </React.Fragment>
                            }
                            {matches.small &&
                                <React.Fragment>
                                    <Row className='mb-2'>
                                        <Col xs='12'>
                                            {
                                                team.EventStatus === sportsconfig.FINISHED || team.isFinished ? <h1> Attention! All markets Finished. </h1> : (
                                                    this.props.recoveyrEventStaus === true ? (
                                                        team.permission ? (
                                                            team.market ? team.market.map((Item, index) => (
                                                                <SportsEventItem team={team} Item={Item} key={index} />
                                                            )) : "no market"
                                                        ) : <h1>This event is blocked by agent system.</h1>
                                                    ) : <h1>
                                                        Now Betrada server is downtime. Please wait some minute.
                                                        Or Please check your network status.
                                                    </h1>
                                                )
                                            }
                                        </Col>

                                    </Row>
                                </React.Fragment>
                            }
                        </React.Fragment>
                    )}
                </Media>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentSelectedGame: state.sports.currentSelectedGame,
        all_matchs: state.sports.all_matchs,
        all_sports_list: state.sports.all_sports_list,
        recoveyrEventStaus: state.sports.recoveyrEventStaus,
        current_tap: state.sports.current_tap
    }
}

const mapDispatchToProps = {
    getAllSportsType,
    currentSelecteGame,
    TapChange,
    getSportsMatchPlayer,
    current_select_sport,
    countryChange
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)
