import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Badge, Col } from "reactstrap"
import { kingheader, GameNameKey } from "../../configs/providerConfig"
import { get_date, get_remaining_time, timerChecking } from "../../redux/actions/auth/index"
import Numbers from "./event"
import { get_bazaarsitems, FindBetting } from "../../redux/actions/satta/matka"
import Media from 'react-media'
import { Nav, NavItem, NavLink, Row } from 'reactstrap'
import { Lock } from "react-feather"
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


    getRow = (bazaaritem, timerflag, active) => {


        const numbers = this.props.numbersdata.find(obj => obj.bool === active.bool)
        if (numbers) {
            const name = `${active.name  } Open`
            const list = [{ list: numbers.gamenumbers, name, timerflag, type: 0 }]
            const newrow = Object.assign({}, bazaaritem, { numbers: list }, { gamesitem: active }, { timerflag }, { type: 2 })
            return { 1: newrow }
        } else {
            const gamenumbers = this.props.numbersdata.find(obj => obj.bool === "1").gamenumbers
            if (active.bool === "8") {
                const list = [{ list: gamenumbers, name: "First Digit", timerflag: "1", type: 0 }]
                const newrow = Object.assign({}, bazaaritem, { numbers: list }, { gamesitem: active }, { timerflag }, { type: 2 })
                return { 1: newrow }
            } else if (active.bool === "9") {
                // gamenumbers = this.props.numbersdata.find(obj =>obj.bool === "1").gamenumbers;
                const list = [{ list: gamenumbers, name: "second Digit", timerflag: "1", type: 0 }]
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
                location = this.getRow(selectbazarItem, "1", tab)
                history.push("/Mybets/satta/games", location)
                // this.setState({active : tab, timerflag : "1"});
            } else {

                const gameitem = gamelist.find(obj => obj._id === tab._id)
                location = this.getRow(selectbazarItem, this.state.timerflag, gameitem)
                history.push("/Mybets/satta/games", location)
                // this.setState({active : tab});

            }
        }
    }

    timerChecking = (bazaaritem) => {
        return timerChecking(bazaaritem, bazaaritem.timers.opentime, this.props.time, bazaaritem.bettingdate)
    }

    timerChange = async (timerflag, bazaaritem) => {
        if (timerflag !== this.state.timerflag) {
            if (this.timerChecking(bazaaritem)) {
                this.setState({ timerflag, selectbazarItem: bazaaritem, flag: true, active: "" })
            } else {
                const find = await this.props.FindBetting(bazaaritem)
                if (find) {
                    this.setState({ timerflag, selectbazarItem: find, flag: true, active: "" })
                } else {
                    this.setState({ flag: false, active: "", selectbazarItem: "" })
                }
            }
        } else {
            this.setState({ flag: false, active: "", timerflag: "" })
        }
    }

    bazarItemChange = async (item) => {
        if (this.state.selectbazarItem !== item || this.state.flag === false) {
            if (this.timerChecking(item)) {
                const timerflag = this.state.timerflag
                if (timerflag === "0") {
                    this.setState({ selectbazarItem: item, timerflag: "1", flag: true, active: "" })
                } else {
                    this.setState({ selectbazarItem: item, flag: true, active: "" })
                }
            } else {
                const find = await this.props.FindBetting(item)
                if (find) {
                    this.setState({ selectbazarItem: find, timerflag: "1", flag: true, active: "" })
                } else {
                    this.setState({ flag: false, timerflag: "0", selectbazarItem: "", active: "" })
                }
            }
        } else {
            this.setState({ flag: false, timerflag: "0", selectbazarItem: "", active: "" })
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

    headerRender = () => {
        return <Col md="12" className="">
            {
                kingheader.map((item, i) => (
                    <div className="tblbazaarheader" style={{ width: `${100 / 3  }%` }} key={i}>
                        {item}
                    </div>
                ))
            }
        </Col>
    }

    bazarRender = (item) => {
        const { timerflag, selectbazarItem } = this.state
        // if ( !checkRemaningTime(item.timers.opentime, this.props.time,this.state.bettingdate) && !item.result) {
        //     return null
        // } else {
        return <Col md="12" className="d-flex">
            <div className={`tblbazaaritem${  item.hightlight ? " highlight" : ""}`} style={{ width: `${100 / 3  }%` }} onClick={() => this.bazarItemChange(item)}>
                <div className={"child position-relative"}>
                <Badge color="warning" className="position-absolute datingbadge" >
                        {new Date(item.bettingdate).toString().slice(0,10)}
                    </Badge>
                    <div className="bazarname">
                        {item.bazaarname}
                    </div>
                    <div className="timername">
                        {item.timers.opentime ? `( ${  get_date(item.timers.opentime)  } )` : ""}
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
                            item.timers.opentime ? `( ${  get_remaining_time(item.timers.opentime, this.props.time, this.state.bettingdate)  } )` : "---------"
                        }
                    </div>
                </div>
            </div>

            <div style={{ width: `${100 / 3  }%` }} className={`tblbazaaritem${  item.hightlight ? " highlight" : ""}`}>
                <div className="child">
                    <div className="font-weight-bold d-block" style={{ color: "green", fontSize: "1.5rem" }}>
                        {item.result ? item.result.jodiresult : "---"}
                    </div>
                </div>
            </div>
        </Col>
        // }
    }

    gamesitemRender = (item) => {
        const { timerflag, active, gamelist, selectbazarItem, flag } = this.state
        const betsdata = this.props.satta_bet_data
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
                            active && Object.keys(active).length ? <Numbers location={this.getRow(selectbazarItem, timerflag, active)} /> : null
                        }
                    </Col> : null
            }
        </React.Fragment>
    }

    MobilebazarRender = (item) => {
        const { timerflag, selectbazarItem } = this.state

        // if ( !checkRemaningTime(item.timers.opentime, this.props.time,this.state.bettingdate) && !item.result) {
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
                        {item.timers.opentime ? `( ${  get_date(item.timers.opentime)  } )` : ""}
                    </div>
                </div>
            </div>
            <Row className="d-flex w-100 m-0 p-0 justify-content-center align-items-center text-center">
                <div className="tblbazaaritem w-75">
                    {item.result ? <div className="child">
                            <div className="font-weight-bold d-block" style={{ color: "green", fontSize: "1.5rem" }}> {item.result.jodiresult}
                            </div>
                        </div> : <div className={`bidon${  item._id + timerflag === `${selectbazarItem._id  }1` || item._id + timerflag === `${selectbazarItem._id  }3` ? " bidonactive" : ""}`} onClick={() => this.timerChange("1", item)}>
                            <div>
                                BID ON
                                    </div>
                            <div>
                                {
                                    item.timers.opentime ? `( ${  get_remaining_time(item.timers.opentime, this.props.time, this.state.bettingdate)  } )` : "---------"
                                }
                            </div>
                        </div>
                    }
                </div>
            </Row>
        </div>
        // }
    }

    MobilegamesitemRender = (item) => {
        const { active, selectbazarItem, flag } = this.state
        const betsdata = this.props.satta_bet_data
        return <React.Fragment>
            {
                selectbazarItem._id === item._id && flag ?
                    <Col md="12" className="mt-1 tblbazarbody ">
                        <Nav tabs fill className="w-100">
                            <div className="w-100 font-weight-bold text-uppercase text-center bidlabel">
                                BId on Single Digit
                        </div>
                            {
                                item.gamelink && item.gamelink[GameNameKey['first Digit']] && item.gamelink[GameNameKey['first Digit']].status ? <Row className="w-50 m-0 mt-1">
                                        <NavItem className="w-75" >
                                            <NavLink active={selectbazarItem._id + GameNameKey['first Digit'] === selectbazarItem._id + active._id}
                                                className="textstyle" onClick={() => { this.Mobiletoggle({ _id: GameNameKey['first Digit'] }) }} >
                                                first Digit
                                    </NavLink>
                                        </NavItem>
                                        <div className="total  w-25">
                                            <div className="text-uppercase text" >
                                                total
                                    </div>
                                            <div className="input">
                                                {this.getTotalFromGamItem(betsdata, item, { _id: GameNameKey['first Digit'] })}
                                            </div>
                                        </div>
                                    </Row> : <React.Fragment>
                                        <Row className="w-50  m-0  mt-1">
                                            <NavItem className="w-75">
                                                <NavLink className="textstyle">
                                                    first Digit
                                        </NavLink>
                                            </NavItem>
                                            <div className="total w-25">
                                                <Lock size={17} />
                                            </div>
                                        </Row>
                                    </React.Fragment>
                            }
                            {
                                item.gamelink && item.gamelink[GameNameKey['second Digit']] && item.gamelink[GameNameKey['second Digit']].status ? <Row className="w-50 m-0   mt-1">
                                        <NavItem className="w-75" >
                                            <NavLink className="textstyle" active={selectbazarItem._id + GameNameKey['second Digit'] === selectbazarItem._id + active._id}
                                                onClick={() => { this.Mobiletoggle({ _id: GameNameKey['first Digit'] }) }} >
                                                second Digit
                                    </NavLink>
                                        </NavItem>
                                        <div className="total  w-25">
                                            <div className="text-uppercase text" >
                                                total
                                    </div>
                                            <div className="input">
                                                {this.getTotalFromGamItem(betsdata, item, { _id: GameNameKey['first Digit'] })}
                                            </div>
                                        </div>
                                    </Row> : <React.Fragment>
                                        <Row className="w-50 m-0   mt-1">
                                            <NavItem className="w-75">
                                                <NavLink className="textstyle">
                                                    second Digit
                                        </NavLink>
                                            </NavItem>
                                            <div className="total w-25">
                                                <Lock size={17} />
                                            </div>
                                        </Row>
                                    </React.Fragment>
                            }
                            <div className="w-100 font-weight-bold text-uppercase text-center bidlabel">
                                BId on jodi
                        </div>
                            <div className="w-100 d-flex justify-content-center align-items-center">
                                {
                                    item.gamelink && item.gamelink[GameNameKey.Jodi] && item.gamelink[GameNameKey.Jodi].status ? <Row className="w-50 m-0 mt-1 align-items-center justify-content-center">
                                            <NavItem className="w-75">
                                                <NavLink active={selectbazarItem._id + GameNameKey.Jodi === selectbazarItem._id + active._id}
                                                    onClick={() => { this.Mobiletoggle({ _id: GameNameKey.Jodi }) }} >
                                                    Jodi
                                        </NavLink>
                                            </NavItem>
                                            <div className="total  w-25">
                                                <div className="text-uppercase text" >
                                                    total
                                        </div>
                                                <div className="input">
                                                    {this.getTotalFromGamItem(betsdata, item, { _id: GameNameKey.Jodi })}
                                                </div>
                                            </div>
                                        </Row> : <React.Fragment>
                                            <Row className="w-50 m-0 mt-1  align-items-center justify-content-center">
                                                <NavItem className="w-75">
                                                    <NavLink>
                                                        Jodi
                                            </NavLink>
                                                </NavItem>
                                                <div className="total w-25">
                                                    <Lock size={17} />
                                                </div>
                                            </Row>
                                        </React.Fragment>
                                }

                            </div>

                        </Nav>
                        {/* <Numbers location = {this.getRow(selectbazarItem, timerflag, active)} /> */}
                    </Col>
                    : null
            }
        </React.Fragment>
    }

    render() {
        const { bazar } = this.state

        return (
            <div className='sports-background height-100'>
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
