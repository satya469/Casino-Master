import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get_bazaarsitems, bettingDateChange } from "../../redux/actions/satta/matka"
import { Col, Row, FormGroup, Label, Input } from "reactstrap"
import ReBazar from "./regularbazaar"
import KingBazar from "./kingbazaar"
import StBazar from "./StBazar"
import { Bazaartype_key, BazaartypesKey } from "../../configs/providerConfig"
import { CasinoSlider } from "../GamePages/CasinoComponents"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { Root } from "../../authServices/rootconfig"
import { SlideDown } from 'react-slidedown'
import queryString from "query-string"
import Media from 'react-media'
import { history } from '../../history'

export class index extends Component {

    constructor(props) {
        super(props)

        this.state = {
            flag: true,
            selecttype: BazaartypesKey['607c425e9b104a5ac1cc23ac'],
            bettingdate: new Date()

        }
    }

    componentDidMount() {
        const params = queryString.parse(this.props.location.search)
        if (params && params.type) {
            this.setState({ selecttype: params.type.toString() })
        }
        if (this.props.location.state) {
            if (this.props.location.state.flag && this.props.bazaars.length) {
            } else {
                this.props.get_bazaarsitems()
            }
        } else {
            this.props.get_bazaarsitems()
        }
    }

    getGamelist = (type) => {
        const rows = this.props.gamesdata
        return rows[type]
    }

    TypeChange = (itemid) => {
        this.setState({ selecttype: BazaartypesKey[itemid] })
        history.push(`${history.location.pathname  }?type=${  BazaartypesKey[itemid]}`)
    }

    render() {

        const bazaars = this.props.bazaars
        const rebazaars = bazaars.filter(obj => obj.bazaartype === Bazaartype_key.regular)
        const kingbazaars = bazaars.filter(obj => obj.bazaartype === Bazaartype_key['king-bazaar'])
        const startbazaars = bazaars.filter(obj => obj.bazaartype === Bazaartype_key.starline)
        const { firstpages2 } = this.props.FirstPage
        const { selecttype } = this.state
        const { bazartypes, bettingdate,maxdate } = this.props
        return (
            <React.Fragment>
                <React.Fragment>
                    <CasinoSlider slider_images={firstpages2} bool={true}   {...this.props} player={true} />

                    <Row >
                        <Media queries={{ small: "(max-width: 768px)", large: "(min-width: 769px)" }}>
                            {matches => (
                                <React.Fragment>
                                    {matches.small &&
                                        <>
                                            <Col xs="12" className="">
                                                <FormGroup className="p-1 m-0 pt-0">
                                                    <Label className="ml-1" for="opentime">Please select bet date   </Label>
                                                    <Input type="date" className="form-control input-min-width-95p" 
                                                        value={bettingdate}
                                                        max={maxdate}
                                                        onChange={date => this.props.bettingDateChange(date.target.value)}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <div className="sattaicons w-100">
                                                <Row>
                                                    {
                                                        bazartypes && bazartypes.length ? bazartypes.map((item, i) => (
                                                                <Col key={i} md="4" xs="4" className={` m-0 p-0 bazaricon ${  selecttype === BazaartypesKey[item._id] ? "bazariconactive" : ""}`}>
                                                                    <img className="bazarbutton" onClick={() => this.TypeChange(item._id)} src={Root.imageurl + item.icon} alt="" />
                                                                </Col>
                                                            )) : null
                                                    }
                                                </Row>
                                            </div>
                                        </>
                                    }
                                    {
                                        matches.large &&
                                        <>
                                            <Col md="3" xs="12" style={{ width: "18vw" }} className="position-absolute float-left">
                                                <FormGroup className="p-1 m-0 pt-0">
                                                    <Label for="opentime" className="ml-1">Please select bet date</Label>
                                                    <Input type="date" value={bettingdate}
                                                    max={maxdate}
                                                        onChange={date => this.props.bettingDateChange(date.target.value)}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <div className="sattaicons w-100">
                                                <Row>
                                                    {
                                                        bazartypes && bazartypes.length ? bazartypes.map((item, i) => (
                                                                <Col key={i} md="4" xs="4" className={`bazaricon ${  selecttype === BazaartypesKey[item._id] ? "bazariconactive" : ""}`}>
                                                                    <img className="bazarbutton" onClick={() => this.TypeChange(item._id)} src={Root.imageurl + item.icon} alt="" />
                                                                </Col>
                                                            )) : null
                                                    }
                                                </Row>
                                            </div>
                                        </>
                                    }
                                </React.Fragment>
                            )}
                        </Media>

                    </Row>
                </React.Fragment>

                {
                    this.state.flag ? <React.Fragment>
                            {
                                bazaars.length && Object.keys(this.props.gamesdata).length ? <div className='sports-background height-100 satta'>

                                        {
                                            BazaartypesKey['607c425e9b104a5ac1cc23ac'] === selecttype ? <React.Fragment>
                                                    <SlideDown transitionOnAppear={true}>
                                                        <Col md="12" className="d-flex text-center mt-1">
                                                            <div className="font-weight-bold w-100 bazaaritem-header pl-0 pr-0"  >
                                                                <span style={{ fontSize: "2rem" }} className="bazar-title">REGULAR BAZAR</span>
                                                            </div>
                                                        </Col>
                                                        <Col md="12" className="mt-1" style={{ marginBottom: "7rem" }}>
                                                            {
                                                                rebazaars.length ? <ReBazar bazaars={rebazaars} name={"REGULAR BAZAR"} gamelist={this.getGamelist(Bazaartype_key.regular)} /> : null
                                                            }
                                                        </Col>
                                                    </SlideDown>
                                                </React.Fragment> : null
                                        }
                                        {
                                            BazaartypesKey['607c433db684df5e57e633b0'] === selecttype ? <React.Fragment>
                                                    <SlideDown transitionOnAppear={true}>
                                                        <Col md="12" className="d-flex text-center mt-1">
                                                            <div className="font-weight-bold w-100 bazaaritem-header pl-0 pr-0"  >
                                                                <span style={{ fontSize: "2rem" }} className="bazar-title">KING BAZAR</span>
                                                            </div>
                                                        </Col>
                                                        <Col md="12" className="mt-1" style={{ marginBottom: "7rem" }}>
                                                            {
                                                                kingbazaars.length > 0 ? <KingBazar bazaars={kingbazaars} name={"KING BAZAR"} gamelist={this.getGamelist(Bazaartype_key['king-bazaar'])} /> : null
                                                            }
                                                        </Col>
                                                    </SlideDown>
                                                </React.Fragment> : null
                                        }

                                        {
                                            BazaartypesKey['607c43cf35cbab6036dd501c'] === selecttype ? <React.Fragment>
                                                    <SlideDown transitionOnAppear={true}>
                                                        <Col md="12" className="d-flex text-center mt-1">
                                                            <div color="warning" className="font-weight-bold w-100 bazaaritem-header pl-0 pr-0"  >
                                                                <span style={{ fontSize: "2rem" }} className="bazar-title">STARLINE BAZAR</span>
                                                            </div>
                                                        </Col>
                                                        <Col md="12" className="mt-1" style={{ marginBottom: "7rem" }}>
                                                            {
                                                                startbazaars.length > 0 ? <StBazar bazaars={startbazaars} name={"STARLINE BAZAR"} gamelist={this.getGamelist(Bazaartype_key.starline)} /> : null
                                                            }
                                                        </Col>
                                                    </SlideDown>
                                                </React.Fragment> : null
                                        }
                                    </div> : <SkeletonTheme color="#202020" highlightColor="#444" >
                                        <Skeleton count={20} />
                                    </SkeletonTheme>
                            }
                        </React.Fragment> : null
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    bazaars: state.satta.bazaarsdata,
    gamesdata: state.satta.gamedata,
    FirstPage: state.auth.register,
    bazartypes: state.satta.bazartypes,
    bettingdate: state.satta.bettingdate,
    maxdate: state.satta.maxdate

})

const mapDispatchToProps = {
    get_bazaarsitems, bettingDateChange
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
