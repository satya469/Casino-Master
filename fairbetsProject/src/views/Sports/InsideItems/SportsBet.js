import React from "react"
import { ChevronDown, ChevronRight } from "react-feather"
import { Col, Row } from "reactstrap"
import Sportsevents from "./Sportsevents"
import { connect } from "react-redux"
import { seasonTabChange } from "../../../redux/actions/sports"
import Media from "react-media"
import sportsconfig from "../../../configs/sportsconfig"

class SportsBet extends React.Component {

    IsOpen() {
        this.props.seasonTabChange(this.props.sportsBetItem.id)
    }

    render() {
        const { sportsBetItem, seasonData, firstpage } = this.props
        let T1X2Letter = "1 X 2"
        if (sportsBetItem.data.length && sportsconfig.marketConfig[sportsBetItem.data[0].sportid]) {
            T1X2Letter = sportsconfig.marketConfig[sportsBetItem.data[0].sportid].toUpperCase()
        }

        return (
            <React.Fragment>
                {
                    !firstpage ? <React.Fragment>
                            <Row onClick={() => this.IsOpen()} className={seasonData.data.findIndex(item => item.id === sportsBetItem.id) > -1 ? 'sports-country' : ' sports-country-active'} >
                                <Col sm={10} xs={10} className='sports-country-title' style={{ marginLeft: '-10px' }}>
                                    <div> {seasonData.data.findIndex(item => item.id === sportsBetItem.id) > -1 ? <ChevronRight size={20} /> : <ChevronDown size={20} />}</div>
                                    <div className='sports-country-name'>{sportsBetItem.name}</div>
                                </Col>
                                <Col sm={2} xs={2} className='sports-country-length'>
                                    {sportsBetItem.data ? sportsBetItem.data.length : 0}
                                </Col>
                            </Row>
                        </React.Fragment> : null
                }
                {
                    seasonData.data.findIndex(item => item.id === sportsBetItem.id) === -1 && (
                        <div className={`sports-events-all${  firstpage ? ' h-100' : ""}`}>
                            {
                                !firstpage ? <Media
                                        queries={{
                                            small: "(max-width: 768px)",
                                            medium: "(min-width: 769px) and (max-width: 999px)",
                                            large: "(min-width: 1000px)"
                                        }}>
                                        {matches => (
                                            <React.Fragment>
                                                {matches.small &&
                                                    <Row className='martketHeader m-0'>
                                                        <div className='sports-align-left' style={{ width: 'calc(100% - 30px)' }}>
                                                            <Row className='w-100'>
                                                                <Col xs={7} ></Col>
                                                                <Col xs={5} >
                                                                    <Row >
                                                                        <Col className="text-center" xs={12}>{T1X2Letter}</Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div style={{ width: '30px' }}></div>
                                                    </Row>
                                                }
                                                {matches.medium &&
                                                    <Row className='martketHeader m-0'>
                                                        <div className='sports-align-left' style={{ width: 'calc(100% - 50px)' }}>
                                                            <Row className='w-100'>
                                                                <Col sm={6}></Col>
                                                                <Col sm={6}>
                                                                    <Row>
                                                                        <Col className=" text-center" sm={12}> {T1X2Letter} </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div style={{ width: '50px' }}> Markets </div>
                                                    </Row>
                                                }
                                                {matches.large &&
                                                    <Row className='martketHeader m-0'>
                                                        <div className='sports-align-left' style={{ width: 'calc(100% - 50px)' }}>
                                                            <Row className='w-100'>
                                                                <Col sm={4} className="pr-0"></Col>
                                                                <Col sm={8}>
                                                                    <Row>
                                                                        <Col className="text-center" sm={4}>
                                                                            <Row className="m-0 p-0">
                                                                                <Col className="" sm={12}> {T1X2Letter} </Col>
                                                                            </Row>
                                                                        </Col>
                                                                        <Col className="text-center" sm={4}> HANDICAP </Col>
                                                                        <Col className="text-center" sm={4}> TOTAL </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="text-center" style={{ width: '50px' }}> Markets </div>
                                                    </Row>
                                                }
                                            </React.Fragment>
                                        )}
                                    </Media> : null
                            }
                            {
                                firstpage ? sportsBetItem.data.length && sportsBetItem.data.slice(0, 3).map((sportsEvents, i) => (
                                        <Sportsevents key={i} sportsEvents={sportsEvents} firstpage={firstpage} />
                                    )) : sportsBetItem.data.length && sportsBetItem.data.map((sportsEvents, i) => (
                                        <Sportsevents key={i} sportsEvents={sportsEvents} firstpage={firstpage} />
                                    ))

                            }
                        </div>
                    )
                }
            </React.Fragment>
        )
    }
}

const load_fp_data = (state) => {
    return {
        seasonData: state.sports.seasonData,
        current_selected_sport: state.sports.current_selected_sport
    }
}

export default connect(load_fp_data, { seasonTabChange })(SportsBet)