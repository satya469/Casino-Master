import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Badge, Col } from "reactstrap"
import { Statheader } from "../../configs/providerConfig"
import { get_date, get_remaining_time, get_options, Sureget_options, checkRemaningTime } from "../../redux/actions/auth/index"
import Numbers from "./event"
import { get_bazaarsitems, FindBetting } from "../../redux/actions/satta/matka"
import Media from 'react-media'
import { Nav, NavItem, NavLink, Row } from 'reactstrap'
import { Lock, ArrowLeft } from "react-feather"
import { history } from "../../history"

export class KingBazar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bazar: this.props.bazaars,
            gamelist: this.props.gamelist,
            flag: true,
            timerflag: "0",
            active: "",
            selectbazarItem: "",
            gflag: false,
            tflag: true,
            timersoption: [],
            bettingdate: new Date()

        }
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevState.bazar !== this.props.bazaars) {
            this.setState({ bazar: this.props.bazaars })
        }

        if (prevState.bettingdate !== this.props.bettingdate) {
            this.setState({ bettingdate: this.props.bettingdate, flag: false })
        }
    }

    getRow = (bazaaritem, active) => {

        const timerflag = this.state.timerflag

        const { numbersdata } = this.props
        const numbers = numbersdata.find(obj => obj.bool === active.bool)
        if (numbers) {
            const name = `${active.name  } Open`
            const list = [{ list: numbers.gamenumbers, name, timerflag, type: 0 }]
            const newrow = Object.assign({}, bazaaritem, { numbers: list }, { gamesitem: active }, { timerflag }, { type: 2 })
            return { 1: newrow }
        } else {
            let gamenumbers = []
            if (active.bool === "8") {
                gamenumbers = this.props.numbersdata.find(obj => obj.bool === "1").gamenumbers
                const list = [{ list: gamenumbers, name: "First Digit", timerflag, type: 0 }]
                const newrow = Object.assign({}, bazaaritem, { numbers: list }, { gamesitem: active }, { timerflag }, { type: 2 })
                return { 1: newrow }
            } else if (active.bool === "9") {
                gamenumbers = this.props.numbersdata.find(obj => obj.bool === "1").gamenumbers
                const list = [{ list: gamenumbers, name: "second Digit", timerflag, type: 0 }]
                const newrow = Object.assign({}, bazaaritem, { numbers: list }, { gamesitem: active }, { timerflag }, { type: 2 })
                return { 1: newrow }
            }
        }

    }

    set_merge = (array1, array2, array3) => {
        const array = []
        for (const i in array1) {
            for (const j in array1[i]) {
                array.push(array1[i][j])
            }
        }

        for (const i in array3) {
            for (const j in array3[i]) {
                array.push(array3[i][j])
            }
        }

        for (const i in array2) {
            array.push(array2[i])
        }

        return array
    }


    toggle = (tab) => {
        if (this.state.active !== tab) {
            if (this.state.timerflag === "3") {
                this.setState({ active: tab, timerflag: "1" })
            } else {
                this.setState({ active: tab })
            }
        }
    }

    Mobiletoggle = (tab) => {
        let location = {}
        const { selectbazarItem, gamelist } = this.state
        if (this.state.active !== tab) {
            if (this.state.timerflag === "3") {
                location = this.getRow(selectbazarItem, tab)
                history.push("/Mybets/satta/games", location)
                // this.setState({active : tab, timerflag : "1"});
            } else {

                const gameitem = gamelist.find(obj => obj._id === tab._id)
                location = this.getRow(selectbazarItem, gameitem)
                history.push("/Mybets/satta/games", location)
                // this.setState({active : tab});

            }
        }
    }

    timerChange = (timerflag, bazaaritem) => {
        const timersoption = get_options(bazaaritem.timers, this.props.time)
        if (timersoption.length) {
            this.setState({ timerflag: timersoption[0], selectbazarItem: bazaaritem, flag: true, active: "" })
        } else {
            this.setState({ flag: false, active: "" })
        }
    }

    bazarItemChange = async (item) => {

        // if (this.state.selectbazarItem !== item || this.state.flag === false) {

        if (this.state.selectbazarItem !== item) {

            // let timersoption = Sureget_options(item.timers, this.props.time,this.state.bettingdate);
            // if (timersoption.length) {
            // let timerflag = this.state.timerflag;
            // if (timerflag === "0") {
            //     this.setState({ selectbazarItem : item, active : "",});
            // } else {
            this.setState({ selectbazarItem: item, active: "" })
            // }
            // } else {
            //     this.setState({selectbazarItem : item, flag : false,tflag : true, timersoption : [],active : "",})
            // }
        } else {
            this.setState({ selectbazarItem: "", flag: false, timerflag: "0", tflag: true })
        }
    }

    getTotalFromGamItem = (sattas_bets, bazaaritem, gameitem) => {
        let totalOdds = 0
        if (sattas_bets) {
            if (sattas_bets[bazaaritem._id]) {
                if (sattas_bets[bazaaritem._id]["gamesnode"][gameitem._id]) {
                    const bets = sattas_bets[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode']
                    for (const i in bets) {
                        for (const j in bets[i]) {
                            totalOdds += parseInt(bets[i][j]['amount'])
                        }
                    }
                }
            }
        }
        return totalOdds
    }

    headerRender = (item) => {
        return <Col md="12" className="">
            {
                Statheader.map((item, i) => (
                    <div className="tblbazaarheader" style={{ width: `${100 / 3  }%` }} key={i}>
                        {item}
                    </div>
                ))
            }
        </Col>
    }

    MobilebazarRender = (item) => {

        // if (!checkRemaningTime(item.timers.closetime, this.props.time,this.state.bettingdate) &&  !item.result  ) {
        //     return null
        // } else {
        return <div className="d-block w-100 mt-1">
            <div className={`w-100 tblbazaaritem${  item.hightlight ? " highlight" : ""}`} onClick={() => this.bazarItemChange(item)}>
                <div className="child position-relative">
                <Badge color="warning" className="position-absolute datingbadge" >
                        {new Date(item.bettingdate).toString().slice(0,10)}
                    </Badge>
                    <div className="bazarname">
                        {item.bazaarname}
                    </div>
                    <div className="timername">
                        {item.timers.opentime && item.timers.closetime ? `( ${  get_date(item.timers.opentime)  } ${  get_date(item.timers.closetime)  } )` : ""}
                    </div>
                    <div>
                        {
                            item.timers.closetime ? `( ${  get_remaining_time(item.timers.closetime, this.props.time, this.state.bettingdate, true, item.timers.opentime)  } )` : "---------"
                        }
                    </div>
                </div>
            </div>
        </div>
        // }
    }


    MobilegamesitemRender = (item) => {
        const { active, gamelist, selectbazarItem, gflag } = this.state
        const betsdata = this.props.satta_bet_data

        if (!checkRemaningTime(item.timers.closetime, this.props.time, this.state.bettingdate, true, item.timers.opentime) && !item.result) {
            return null
        } else {

            return <React.Fragment>
                {
                    selectbazarItem._id === item._id && gflag ?
                        <React.Fragment>
                            <Row className="w-100 m-0 p-0">
                                <div className="w-25 align-items-center justify-content-center d-flex">
                                    <div className="text-center text-uppercase font-weight-bold">
                                        <ArrowLeft size={25} className="font-weight-bold" onClick={() => this.setState({ gflag: false })} />
                                    </div>
                                </div>
                                <div className="w-50 tblbazaaritem">
                                    <div className="bidon p-0 m-0">
                                        <div className="p-0 m-0">
                                            BID
                                        </div>
                                        <div className="p-0 m-0">
                                            {
                                                this.state.timerflag
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Row>
                            <Col md="12" className="m-0 p-0 mt-1 tblbazarbody ">
                                <Nav tabs fill className="w-100 ">
                                    {
                                        gamelist.map((gitem, j) => (
                                            <React.Fragment key={j}>
                                                {
                                                    item.gamelink && item.gamelink[gitem._id] && item.gamelink[gitem._id].status ? <React.Fragment>
                                                            <Row className="w-50 m-0 mt-1">
                                                                <NavItem className="w-75">
                                                                    <NavLink active={selectbazarItem._id + gitem._id === selectbazarItem._id + active._id}
                                                                        onClick={() => { this.Mobiletoggle(gitem) }} >
                                                                        {gitem.name}
                                                                    </NavLink>
                                                                </NavItem>
                                                                <div className="total w-25">
                                                                    <div className="text-uppercase text" >
                                                                        total
                                                                </div>
                                                                    <div className="input">
                                                                        {this.getTotalFromGamItem(betsdata, item, gitem)}
                                                                    </div>
                                                                </div>
                                                            </Row>
                                                        </React.Fragment> : <Row className="w-50 m-0 mt-1">
                                                            <NavItem className="w-75">
                                                                <NavLink className="textstyle">
                                                                    {gitem.name}
                                                                </NavLink>
                                                            </NavItem>
                                                            <div className="total w-25">
                                                                <Lock size={17} />
                                                            </div>
                                                        </Row>
                                                }
                                            </React.Fragment>
                                        )
                                        )
                                    }
                                </Nav>
                                {/* <Numbers location = {this.getRow(selectbazarItem, active)} /> */}
                            </Col>
                        </React.Fragment>
                        : null
                }
            </React.Fragment>
        }
    }

    bazarRender = (item) => {
        const { timerflag, selectbazarItem } = this.state

        return <Col md="12" className="d-flex">
            <div className={`tblbazaaritem${  item.hightlight ? " highlight" : ""}`} style={{ width: `${100 / 3  }%` }} onClick={() => this.bazarItemChange(item)}>
                <div className="child position-relative">
                    <Badge color="warning" className="position-absolute datingbadge" >
                        {new Date(item.bettingdate).toString().slice(0,10)}
                    </Badge>
                    <div className="bazarname">
                        {item.bazaarname}
                    </div>
                    <div className="timername">
                        {item.timers.opentime && item.timers.closetime ? `( ${  get_date(item.timers.opentime)  } ${  get_date(item.timers.closetime)  } )` : ""}
                    </div>
                </div>
            </div>
            <div className={`tblbazaaritem${  item.hightlight ? " highlight" : ""}`} style={{ width: `${100 / 3  }%` }} >
                <div className={`child timername${  item._id + timerflag === `${selectbazarItem._id  }1` || item._id + timerflag === `${selectbazarItem._id  }3` ? " childactive" : ""}`}
                    onClick={() => this.timerChange("1", item)}
                >
                    <div className="text-uppercase">
                        remaining time
                        </div>
                    <div>
                        {
                            item.timers.closetime ? `( ${  get_remaining_time(item.timers.closetime, this.props.time, this.state.bettingdate, true, item.timers.opentime)  } )` : "---------"
                        }
                    </div>
                </div>
            </div>

            <div style={{ width: `${100 / 3  }%` }} className={`tblbazaaritem${  item.hightlight ? " highlight" : ""}`}>
                <div className="child">
                    <div className="font-weight-bold d-block" style={{ color: "green", fontSize: "1.5rem" }}>
                        - - -
                            {/* {item.result ? item.result.openresult + "-" + item.result.jodiresult + "-" + item.result.closeresult : "---"} */}
                    </div>
                </div>
            </div>
        </Col>
        // }
    }

    gamesitemRender = (item) => {
        const { active, gamelist, selectbazarItem, flag } = this.state
        const betsdata = this.props.satta_bet_data

        if (!checkRemaningTime(item.timers.closetime, this.props.time, this.state.bettingdate, true, item.timers.opentime) && !item.result) {
            return null
        } else {

            return <React.Fragment>
                {
                    selectbazarItem._id === item._id && flag ? <Col md="12" className="mt-1 tblbazarbody">
                            <Nav tabs fill>
                                {
                                    gamelist.map((gitem, j) => (
                                        <React.Fragment key={j}>
                                            {
                                                item.gamelink && item.gamelink[gitem._id] && item.gamelink[gitem._id].status ? <React.Fragment>
                                                        <NavItem >
                                                            <NavLink active={selectbazarItem._id + gitem._id === selectbazarItem._id + active._id}
                                                                onClick={() => { this.toggle(gitem) }} >
                                                                {gitem.name}
                                                            </NavLink>
                                                        </NavItem>
                                                        <div className="total">
                                                            <div className="text-uppercase text" >
                                                                total
                                                            </div>
                                                            <div className="input">
                                                                {this.getTotalFromGamItem(betsdata, item, gitem)}
                                                            </div>
                                                        </div>
                                                    </React.Fragment> : <NavItem >
                                                        <NavLink>
                                                            {gitem.name}
                                                            <Lock size={15} />
                                                        </NavLink>
                                                    </NavItem>
                                            }
                                        </React.Fragment>
                                    )
                                    )
                                }
                            </Nav>
                            {
                                active && Object.keys(active).length ? <Numbers location={this.getRow(selectbazarItem, active)} /> : null
                            }
                        </Col> : null
                }
            </React.Fragment>
        }
    }

    timerRenderChange = async (timerflag) => {

        const timersoption = Sureget_options(this.state.selectbazarItem.timers, this.props.time, this.state.bettingdate)

        if (timersoption.indexOf(timerflag) !== -1) {
            this.setState({ timerflag, flag: true })
        } else {
            const find = await this.props.FindBetting(this.state.selectbazarItem, timerflag)
            if (find) {
                this.setState({ timerflag, flag: true,selectbazarItem: find})
            } else {

            }
        }

    }

    MobiletimerRenderChange = async (timerflag) => {

        const timersoption = Sureget_options(this.state.selectbazarItem.timers, this.props.time, this.state.bettingdate)

        if (timersoption.indexOf(timerflag) !== -1) {
            this.setState({ timerflag, gflag: true })
        } else {
            const find = await this.props.FindBetting(this.state.selectbazarItem, timerflag)
            if (find) {
                this.setState({ timerflag, gflag: true,selectbazarItem: find })
            } else {

            }
        }
    }


    MobileTimerRender = (bazaaritem) => {
        const { selectbazarItem, gflag } = this.state
        const timersoption = bazaaritem.bazaartype === "3" ? get_options(bazaaritem.timers, this.props.time) : []
        if (selectbazarItem._id === bazaaritem._id && !gflag) {
            return <Row className="sattaitems color-white w-100">
                {
                    timersoption.map((item, i) => (
                        <Col xs="4" key={i} className="pt-1">
                            <div className={`w-100 satta-events-items ${  this.state.timerflag === item ? " satta-events-items-active" : ""}`} onClick={() => this.MobiletimerRenderChange(item)}>
                                <div>
                                    {item}
                                </div>
                                <div style={{ color: "green", fontSize: "1rem" }}>
                                    {
                                        bazaaritem.result && bazaaritem.result[item] ? bazaaritem.result[item] : "- - - "
                                    }
                                </div>
                            </div>
                        </Col>
                    ))
                }
            </Row>
        }
    }


    webTimerRender = (bazaaritem) => {
        const { selectbazarItem, tflag } = this.state
        const timersoption = bazaaritem.bazaartype === "3" ? get_options(bazaaritem.timers, this.props.time) : []
        if (selectbazarItem._id === bazaaritem._id && tflag) {
            return <Row className="sattaitems color-white w-100">
                {
                    timersoption.map((item, i) => (
                        <Col xs="2" key={i} className="pt-1">
                            <div className={`w-100 satta-events-items ${  this.state.timerflag === item ? " satta-events-items-active" : ""}`} onClick={() => this.timerRenderChange(item)}>
                                <div>
                                    {item}
                                </div>
                                <div style={{ color: "green", fontSize: "1rem" }}>
                                    {
                                        bazaaritem.result && bazaaritem.result[item] ? bazaaritem.result[item] : "- - - "
                                    }
                                </div>
                            </div>
                        </Col>
                    ))
                }
            </Row>
        }
    }

    render() {
        const { bazar } = this.state

        return (
            <div className='sports-background height-100 mb-2'>
                <Media queries={{ small: "(max-width: 768px)", large: "(min-width: 769px)" }}>
                    {matches => (
                        <React.Fragment>
                            {matches.small &&
                                <div className="w-100">
                                    {
                                        bazar.map((item, i) => (
                                            <React.Fragment key={i}>
                                                {
                                                    this.MobilebazarRender(item)
                                                }

                                                {
                                                    this.MobileTimerRender(item)
                                                }
                                                {
                                                    this.MobilegamesitemRender(item)
                                                }
                                            </React.Fragment>
                                        ))
                                    }
                                </div>
                            }
                            {
                                matches.large &&
                                <>
                                    {
                                        this.headerRender()
                                    }
                                    {
                                        bazar.map((item, i) => (
                                            <React.Fragment key={i}>
                                                {
                                                    this.bazarRender(item)
                                                }
                                                {
                                                    this.webTimerRender(item)
                                                }
                                                {
                                                    this.gamesitemRender(item)
                                                }
                                            </React.Fragment>
                                        ))
                                    }
                                </>
                            }
                        </React.Fragment>
                    )}
                </Media>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    numbersdata: state.satta.numbersdata,
    time: state.time.value,
    satta_bet_data: state.satta.betsdata,
    bettingdate: state.satta.bettingdate

})

const mapDispatchToProps = {
    get_bazaarsitems, FindBetting
}

export default connect(mapStateToProps, mapDispatchToProps)(KingBazar)
