import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'reactstrap'
import { RefreshResult, firstpageBazars } from "../../redux/actions/satta/matka"
import { get_date, get_remaining_time } from "../../redux/actions/auth/index"
import { history } from "../../history"
import { Fragment } from 'react'
import { Root } from '../../authServices/rootconfig'
import Media from "react-media"

export class sattaresult extends Component {

    constructor(props) {
        super(props)

        this.state = {
            bazars: [],
            bettingdate: new Date()

        }
    }

    async componentDidMount() {
        const dd = await firstpageBazars()
        if (dd) {
            this.setState({ bazars: dd })
        } else {

        }
    }

    refresh = async (item, i) => {
        const up = await RefreshResult(item)
        if (up) {
            let row = item
            row = Object.assign(row, up)
            const items = this.state.bazars
            items[i] = row
            this.setState({ bazars: items })
        }

    }

    bazarRender = (item) => {
        return <Col md="12" className="d-flex m-0 pb-0 pl-0 pr-0" style={{ height: `${100 / 3}%` }}>
            <div className={"firstbazartblbazaaritem"} onClick={() => history.push(`/Satta/pages?type=${item.bazaartype}`)}>
                <div className="d-block">
                    <img src={Root.imageurl + item.icon} alt="" style={{ width: "35px" }} />
                    <div style={{ fontSize: "0.7rem" }}>
                        {
                            item.name
                        }
                    </div>

                </div>
            </div>
            <div className={"firstbazartblbazaaritem"} onClick={() => history.push(`/Satta/pages?type=${item.bazaartype}`)}>
                <div className="child" style={{ overflow: "hidden " }}>
                    <div className="bazarname">
                        {item.bazaarname}
                    </div>
                    <div className="timername textstyle">
                        {item.timers.opentime && item.timers.closetime ? `( ${  get_date(item.timers.opentime)  } ${  get_date(item.timers.closetime)  } )` : ""}
                    </div>
                </div>
            </div>
            <div className={"firstbazartblbazaaritem"}>
                <div className={"child timername childactive"}
                    onClick={() => history.push(`/Satta/pages?type=${item.bazaartype}`)}
                >
                    <div className="text-uppercase textstyle">
                        remaining time
                        </div>
                    <div>
                        {
                            item.timers.opentime ? `( ${  get_remaining_time(item.timers.opentime, this.props.time, this.state.bettingdate)  } )` : "---------"
                        }
                    </div>
                </div>
            </div>
            <div className={"firstbazartblbazaaritem"}>
                <div className={"child timername childactive"}
                >
                    <div className="text-uppercase textstyle">
                        remaining time
                        </div>
                    <div>
                        {
                            item.timers.closetime ? `( ${  get_remaining_time(item.timers.closetime, this.props.time, this.state.bettingdate, true, item.timers.opentime)  } )` : "---------"
                        }
                    </div>
                </div>
            </div>
            <div className={"firstbazartblbazaaritem"}>
                {/* <div className="child"> */}
                <div className="font-weight-bold d-block" style={{ color: "green", fontSize: "1.5rem" }}>
                    {
                        item.result ? item.result : "- - -"
                    }
                </div>
                {/* </div> */}
            </div>
        </Col>
    }

    MobilebazarRender = (item) => {
        return <Col md="12" className="d-flex m-0 pb-0 pl-0 pr-0" style={{ height: `${100 / 3}%` }}>
            <Row className="w-100 m-0">

                <div className={"firstbazartblbazaaritem w-25"} onClick={() => history.push(`/Satta/pages?type=${item.bazaartype}`)}>
                    <div className="d-block">
                        <img src={Root.imageurl + item.icon} alt="" style={{ width: "35px" }} />
                        <div style={{ fontSize: "0.7rem" }}>
                            {
                                item.name
                            }
                        </div>
                    </div>
                </div>
                <Row className="w-75 m-0">


                    <div className={"firstbazartblbazaaritem"} style={{ width: "50%" }} onClick={() => history.push(`/Satta/pages?type=${item.bazaartype}`)}>
                        <div className="child" style={{ overflow: "hidden " }}>
                            <div className="bazarname">
                                {item.bazaarname}
                            </div>
                            <div className="timername textstyle">
                                {item.timers.opentime && item.timers.closetime ? `( ${  get_date(item.timers.opentime)  } ${  get_date(item.timers.closetime)  } )` : ""}
                            </div>
                        </div>
                    </div>
                    <div className={"firstbazartblbazaaritem"} style={{ width: "50%" }}>
                        <div className={"child timername childactive"}
                            onClick={() => history.push(`/Satta/pages?type=${item.bazaartype}`)}
                        >
                            <div className="text-uppercase textstyle">
                                remaining time
                            </div>
                            <div>
                                {
                                    item.timers.opentime ? `( ${  get_remaining_time(item.timers.opentime, this.props.time, this.state.bettingdate)  } )` : "---------"
                                }
                            </div>
                        </div>
                    </div>
                    <div className={"firstbazartblbazaaritem"} style={{ width: "50%" }}>
                        <div className={"child timername childactive"}
                        >
                            <div className="font-weight-bold d-block" style={{ color: "green", fontSize: "1.5rem" }}>
                                {
                                    item.result ? item.result : "- - -"
                                }
                            </div>
                        </div>
                    </div>
                    <div className={"firstbazartblbazaaritem"} style={{ width: "50%" }}>
                        <div className={"child timername childactive"}
                        >
                            <div className="text-uppercase textstyle">
                                remaining time
                            </div>
                            <div>
                                {
                                    item.timers.closetime ? `( ${  get_remaining_time(item.timers.closetime, this.props.time, this.state.bettingdate, true, item.timers.opentime)  } )` : "---------"
                                }
                            </div>
                        </div>
                    </div>
                </Row>

            </Row>
        </Col>
    }
    render() {

        return (
            <Fragment>
                
                <Col md="12" className="p-0 h-100">
                    <Col md="12" className="satta m-0 p-0 h-100" >
                        {
                            this.state.bazars.slice(0, 3).map((item, i) => (
                                <React.Fragment key={i}>
                                    <Media queries={{
                                        small: "(max-width: 768px)",
                                        medium: "(min-width: 769px) and (max-width: 1152px)",
                                        large: "(min-width: 1153px)"
                                    }}>
                                        {matches => (
                                            <React.Fragment>
                                                {matches.small &&
                                                    <Fragment>
                                                        {
                                                            this.MobilebazarRender(item)
                                                        }
                                                    </Fragment>
                                                }
                                                {matches.medium &&
                                                    <Fragment>
                                                        {
                                                            this.bazarRender(item)
                                                        }
                                                    </Fragment>
                                                }
                                                {matches.large &&
                                                    <Fragment>
                                                        {
                                                            this.bazarRender(item)
                                                        }
                                                    </Fragment>
                                                }
                                            </React.Fragment>
                                        )}
                                    </Media>

                                </React.Fragment>
                            ))
                        }
                    </Col>
                </Col>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    numbersdata: state.satta.numbersdata,
    time: state.time.value,
    satta_bet_data: state.satta.betsdata,
    bettingdate: state.satta.bettingdate,
    bazaars: state.satta.bazaarsdata
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(sattaresult)
