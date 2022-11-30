import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Row, Col} from "reactstrap"
import {ChevronDown, ChevronUp, Lock  } from "react-feather"
import {addBetSlip, Exchangeget_item} from "../../../redux/actions/exchg"
import { Breadcrumb, BreadcrumbItem } from "reactstrap"
import { Home } from "react-feather"
import { NavLink } from "react-router-dom"
import Media from "react-media"

export class index extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            activeMarkets : []
        }
    }

    selectMarket = (item) => {
        const {activeMarkets} = this.state
        
        const index  = activeMarkets.findIndex(obj => obj.Id === item.Id)
        if (index === -1) {
            activeMarkets.push(item)
            this.setState({activeMarket : activeMarkets})
        } else {
            activeMarkets.splice(index, 1)
            this.setState({activeMarket : activeMarkets})
        }
    }

    addBetSlip(market, odd, Polarity, Price) {
        const {exchg_header_data, activeitem, betSlipData} = this.props.exchgangedata
        const match = Exchangeget_item(activeitem, exchg_header_data)
    
        const newitem =  {
            Price,
            Name : odd.Name,
            matchName : match.Name,
            marketName : market.Name,
            SelectionId : odd.Id,
            ExpectedSelectionResetCount : odd.ResetCount,
            WithdrawalSequenceNumber : market.WithdrawalSequenceNumber,
            Polarity,
            // message : "Please input bet amount.",
            Stack : 0
        }

        const Slipdata = Object.assign({}, betSlipData)
        
        if (Slipdata &&  Slipdata[Polarity]) {
            if (Slipdata[Polarity][match.Id]) {

                if (Slipdata[Polarity][match.Id]['marketnode'][market.Id]) {
                    if (Slipdata[Polarity][match.Id]['marketnode'][market.Id]["oddsnode"][odd.Id]) {
                        if (!Slipdata[Polarity][match.Id]['marketnode'][market.Id]["oddsnode"][odd.Id][Price]) {
                            // let message = Object.assign({},Slipdata[Polarity][match.Id]['marketnode'][market.Id]["oddsnode"][odd.Id][Price]['message']);
                            delete Slipdata[Polarity][match.Id]['marketnode'][market.Id]["oddsnode"][odd.Id]
                            // newitem['message'] = message;
                            Slipdata[Polarity][match.Id]['marketnode'][market.Id]["oddsnode"][odd.Id] = {}
                            Slipdata[Polarity][match.Id]['marketnode'][market.Id]["oddsnode"][odd.Id][Price] = {}
                            Slipdata[Polarity][match.Id]['marketnode'][market.Id]["oddsnode"][odd.Id][Price] = newitem
                        } else {
                            delete Slipdata[Polarity][match.Id]['marketnode'][market.Id]["oddsnode"][odd.Id]
                        }
                    } else {
                        Slipdata[Polarity][match.Id]['marketnode'][market.Id]["oddsnode"][odd.Id] = {}
                        Slipdata[Polarity][match.Id]['marketnode'][market.Id]["oddsnode"][odd.Id][Price] = newitem
                    }
                } else {
                    Slipdata[Polarity][match.Id]['marketnode'][market.Id] = {}
                    Slipdata[Polarity][match.Id]['marketnode'][market.Id]["marketname"] = market.Name
                    Slipdata[Polarity][match.Id]['marketnode'][market.Id]["oddsnode"] = {}
                    Slipdata[Polarity][match.Id]['marketnode'][market.Id]["oddsnode"][odd.Id] = {}
                    Slipdata[Polarity][match.Id]['marketnode'][market.Id]["oddsnode"][odd.Id][Price] = newitem
                }
            } else {
                Slipdata[Polarity][match.Id] = {}
                Slipdata[Polarity][match.Id]['marketnode'] = {}
                Slipdata[Polarity][match.Id]['matchname'] = match.Name
                Slipdata[Polarity][match.Id]['marketnode'][market.Id] = {}
                Slipdata[Polarity][match.Id]['marketnode'][market.Id]["marketname"] = market.Name
                Slipdata[Polarity][match.Id]['marketnode'][market.Id]["oddsnode"] = {}
                Slipdata[Polarity][match.Id]['marketnode'][market.Id]["oddsnode"][odd.Id] = {}
                Slipdata[Polarity][match.Id]['marketnode'][market.Id]["oddsnode"][odd.Id][Price] = newitem
            }         
        } else {
            Slipdata[Polarity] = {}
            Slipdata[Polarity][match.Id] = {}
            Slipdata[Polarity][match.Id]['marketnode'] = {}
            Slipdata[Polarity][match.Id]['matchname'] = match.Name
            Slipdata[Polarity][match.Id]['marketnode'][market.Id] = {}
            Slipdata[Polarity][match.Id]['marketnode'][market.Id]["marketname"] = market.Name
            Slipdata[Polarity][match.Id]['marketnode'][market.Id]["oddsnode"] = {}
            Slipdata[Polarity][match.Id]['marketnode'][market.Id]["oddsnode"][odd.Id] = {}
            Slipdata[Polarity][match.Id]['marketnode'][market.Id]["oddsnode"][odd.Id][Price] = newitem
        }

        this.props.addBetSlip(Slipdata)
    }

    isExist = (item) => {
        const {activeMarkets} = this.state
        const index  = activeMarkets.findIndex(obj => obj.Id === item.Id)
        if (index === -1) {
            return true
        } else {
            return false
        }
    }

    isCheck = (marketitem, oddsitem, Polarity, Price) => {

        const {betSlipData, activeitem} = this.props.exchgangedata
        if (betSlipData[Polarity]) {
            if (betSlipData[Polarity][activeitem]) {
                if (betSlipData[Polarity][activeitem]['marketnode'][marketitem.Id]) {
                    if (betSlipData[Polarity][activeitem]['marketnode'][marketitem.Id]['oddsnode'][oddsitem.Id]) {
                        if (betSlipData[Polarity][activeitem]['marketnode'][marketitem.Id]['oddsnode'][oddsitem.Id][Price]) {
                            return true
                        }
                    }
                }
            }
        } 
        
        return false
        // let dd = betSlipData.data.find(obj=> obj.Price === (Price) 
        // && obj.Polarity === Polarity && obj.SelectionId === oddsitem.Id  );
        // if (dd) {
        //     return true
        // } else {
        //     return false
        // }
    }

    addClass = (index, Polarity, Odds) => {
        if (Polarity === "Lay") {
            if (index === 0) {
                return "oddscolor1"
            }
        } else {
            if (index === (Odds.length - 1)) {
                return "oddscolor2"
            }
        }
        return ""
    }

    OddsRender = (Odds, Polarity, oddsitem, marketitem) => {
		const {currencyLabel} = this.props

        return <React.Fragment>
             <Col md="6" className="p-0">
                 <Row className="m-0">
                {
                    Odds.map((oddsAS, a) => (
                        <Col md={4} key={a} className={"oddsnodeparent"}>
                                {
                                    oddsAS.nofield ? <div className={ `${this.addClass(a, Polarity, Odds)  } oddsnode`}>
                                        <div className="w-100 d-flex align-items-center justify-content-center">
                                            <Lock size="20" className="lock" />
                                        </div>
                                    </div> : <div className={ `${this.addClass(a, Polarity, Odds)  } oddsnode${  this.isCheck(marketitem, oddsitem, Polarity, oddsAS.Price) ? " oddsnodeactive" : ""}` } 
                                        onClick={() => this.addBetSlip(marketitem, oddsitem, Polarity, oddsAS.Price)}
                                    >
                                        <div className="price">
                                            {
                                                oddsAS.Price 
                                            }
                                        </div>
                                        <div className="stake">
                                        {currencyLabel}{
                                                oddsAS.Stake 
                                            }
                                        </div>
                                    </div>
                                }
                        </Col>
                    ))
                }
                </Row>
             </Col>
         </React.Fragment>
           
    }

    mobileOddsRender = (Odds, Polarity, oddsitem, marketitem) => {
		const {currencyLabel} = this.props
        return <React.Fragment>
             <Col xs="6" className="p-0">
                {
                    Odds.slice(0, 1).map((oddsAS, a) => (
                        <Col xs={12} key={a} className={"oddsnodeparent"}>
                            {
                                oddsAS.nofield ? <div className={ `${this.addClass(a, Polarity, Odds)  } oddsnode`}>
                                    <div className="w-100 d-flex align-items-center justify-content-center">
                                        <Lock size="20" className="lock" />
                                    </div>
                                </div> : <div className={ `${this.addClass(a, Polarity, Odds)  } oddsnode${  this.isCheck(marketitem, oddsitem, Polarity, oddsAS.Price) ? " oddsnodeactive" : ""}` } 
                                    onClick={() => this.addBetSlip(marketitem, oddsitem, Polarity, oddsAS.Price)}
                                >
                                    <div className="price">
                                        {
                                            oddsAS.Price 
                                        }
                                    </div>
                                    <div className="stake">
                                        {currencyLabel}{
                                            oddsAS.Stake 
                                        }
                                    </div>
                                </div>
                            }
                        </Col>
                    ))
                }
             </Col>
         </React.Fragment>
           
    }

    GetItemName = (id) => {
        const { exchg_header_data } = this.props.exchgangedata
        const item = Exchangeget_item(id, exchg_header_data)
        if (item) {
            return item.Name
        } else {
            return ""
        }
    }

    Breadcrumbs = () => {
        const { activeHeader, exchg_header_data, activeitem, activeGroups} = this.props.exchgangedata
        const match = Exchangeget_item(activeitem, exchg_header_data)
        // const breadCrumbParent = activeGroups;
        // let index = activeGroups.findIndex(Obj => )
        const rows = []
        if (activeHeader) {
            for (const i in activeGroups) {
                if (activeGroups[i] !== activeHeader.Id) {
                    rows.push(activeGroups[i])
                }
            }
        }


        return (
        <div className="content-header row">
            <Col className="content-header-left col-md-12 col-12" md="12" xs="12">
                <div className="row breadcrumbs-top">
                    <Col className="col-12" md="12" xs="12">
                    {
                        activeHeader ? (
                            <h2 className="content-header-title float-left mb-0">
                                {activeHeader.Name}
                            </h2>
                        ) : ("")
                    }
                    {
                        <Media  queries={{ small: "(max-width: 767px)", large: "(min-width: 768px)" }}>
                        {matches => (
                            <React.Fragment>
                                {matches.small &&
                                    <React.Fragment>
                                        <Col className="breadcrumb-wrapper vx-breadcrumbs color-white" md="12" xs="12">
                                            { match ? match.Name : ""}
                                        </Col>
                                    </React.Fragment>
                                }
                                {matches.large &&
                                    <React.Fragment>
                                        <Col className="breadcrumb-wrapper vx-breadcrumbs " md="12" xs="12">
                                            <Breadcrumb tag="ol">
                                                <BreadcrumbItem tag="li">
                                                    <NavLink to="/">
                                                        <Home className="align-top" size={15} />
                                                    </NavLink>
                                                </BreadcrumbItem>
                                                {
                                                    rows && rows.length ? rows.map((item, i) => (
                                                        <BreadcrumbItem tag="li" className="text-primary" key={i}>
                                                            {this.GetItemName(item)}
                                                        </BreadcrumbItem>
                                                    )) : null
                                                }   
                                                <BreadcrumbItem tag="li" active>
                                                    { match ? match.Name : ""}
                                                </BreadcrumbItem>
                                            </Breadcrumb>
                                        </Col>
                                    </React.Fragment>
                                }
                            </React.Fragment>
                        )}   
                        </Media>
                    }
                    </Col>
                </div>
            </Col>
        </div>
        )
    }

    oddsHeaderRender = () => {
        return <div className="oddsitem oddsitemheader w-100">
             <Media 
                queries={{
                    small: "(max-width: 768px)",
                    medium: "(min-width: 769px) and (max-width: 999px)",
                    large: "(min-width: 1000px)"
                }}>
                {matches => (
                    
                <React.Fragment>
                    {matches.small &&
                        <Col xs="6" className="m-0 p-0">
                            <Row className="m-0 p-0">
                                <Col xs="6" className="text-center">
                                    Back
                                </Col>
                                <Col xs="6" className="text-center">
                                    Lay        
                                </Col>
                            </Row>
                        </Col>
                    }
                    {matches.medium &&
                        <Col sm="8" className="m-0 p-0">
                            <Row className="m-0 p-0">
                                <Col sm="6" className="text-right">
                                    Back
                                </Col>
                                <Col sm="6" className="text-left">
                                    Lay        
                                </Col>
                            </Row>
                        </Col>
                    }
                    { matches.large &&
                        <Col md="8" className="m-0 p-0">
                            <Row className="m-0 p-0">
                                <Col md="6" className="text-right">
                                    Back
                                </Col>
                                <Col md="6" className="text-left">
                                    Lay        
                                </Col>
                            </Row>
                        </Col>
                    }
                </React.Fragment>
                )}
            </Media>
        </div>
    }

    mobileoddsRender = (odds, item) => {
        return <React.Fragment>
            <Col xs="6"  className="m-0 p-0 d-flex align-items-center pl-1">
                {
                    odds.Name
                }
            </Col>
            <Col xs="6" className="m-0 p-0">
                <Row className="m-0 p-0">
                    {
                        this.mobileOddsRender(odds.ForSidePrices, "Back", odds, item)
                    }
                    {
                        this.mobileOddsRender(odds.AgainstSidePrices, "Lay", odds, item)
                    }
                </Row>
            </Col>
        </React.Fragment>        
    }

    weboddsRender  = (odds, item) => {
        return <React.Fragment>
            <Col md="4"  className="m-0 p-0 d-flex align-items-center pl-1">
                {
                    odds.Name
                }
            </Col>
            <Col md="8" className="m-0 p-0">
                <Row className="m-0 p-0">
                    {
                        this.OddsRender(odds.ForSidePrices, "Back", odds, item)
                    }
                    {
                        this.OddsRender(odds.AgainstSidePrices, "Lay", odds, item)
                    }
                </Row>
            </Col>
        </React.Fragment> 
    }

    render() {

        const markets = this.props.data
		const {currencyLabel} = this.props

        return (
            <div className="exchange">
                {
                    this.Breadcrumbs()
                }
                {
                   markets.map((item, i) => (
                       <Row key={i} className="m-0 mb-1" >
                            <div className={`marketitem w-100${  this.isExist(item) ? " marketitemactive" : ""}`}>
                                <Col md="12" className="marketheader" onClick={() => this.selectMarket(item)}> 
                                    <Row className="m-0">

                                        <div className="title">
                                            {
                                                item.Name
                                            }
                                            <span className="matchamount">
                                                Matched: {currencyLabel}{ item.TotalMatchedAmount } 
                                            </span>
                                        </div>
                                        <div className="symbol">
                                            {
                                                this.isExist(item) ? <ChevronUp size="20" className="font-weight-bold" /> : <ChevronDown size="20" className="font-weight-bold" />
                                            }
                                        </div>
                                    </Row>
                                </Col>
                                {
                                    this.isExist(item) ? <Col md="12" className="marketbody">
                                            {
                                                this.oddsHeaderRender()
                                            }

                                        {
                                            item.oddsData && item.oddsData.length ? item.oddsData.map((odds, j) => (
                                                <div className="oddsitem w-100" key={j}>
                                                    <Row className="m-0 w-100">

                                                        <Media queries={{ small: "(max-width: 767px)", large: "(min-width: 768px)" }}>
                                                            {matches => (
                                                                <React.Fragment>
                                                                    {matches.small &&
                                                                        <>
                                                                            {
                                                                                this.mobileoddsRender(odds, item)
                                                                            }
                                                                        </>
                                                                    }
                                                                    {
                                                                        matches.large &&
                                                                        <>  
                                                                            {
                                                                                this.weboddsRender(odds, item)
                                                                            }
                                                                        </>
                                                                    }
                                                                </React.Fragment>
                                                            )}
                                                        </Media>
                                                    </Row>
                                                </div>
                                            )) : null
                                        }
                                    </Col> : null
                                }
                            </div>
                        </Row>
                   ))  
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    exchgangedata : state.exchgange,
    currencyLabel : state.auth.login.currencyLabel

})

const mapDispatchToProps = {
    addBetSlip
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
