import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Badge, Col } from "reactstrap"
import { header, GameNameKey } from "../../configs/providerConfig"
import { get_date, get_remaining_time, timerChecking } from "../../redux/actions/auth/index"
import Numbers from "./event"
import { get_bazaarsitems, FindBetting } from "../../redux/actions/satta/matka"
import Media from 'react-media'
import { Nav, NavItem, NavLink, Row } from 'reactstrap'
import { Lock } from "react-feather"
import { history } from "../../history"

export class bazaar extends Component {
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

        const { numbersdata } = this.props

        const numbers = numbersdata.find(obj => obj.bool === active.bool)

        if (numbers) {
            const name = (timerflag === "1" ? "Open " : timerflag === "2" ? "Close " : "Open - Close ") + active.name
            const list = [{ list: numbers.gamenumbers, timerflag, type: 0, name }]
            const newrow = Object.assign({}, bazaaritem, { numbers: list }, { gamesitem: active }, { timerflag }, { type: 1 })
            return { 1: newrow }
        } else {
            const gamenumbers = {}
            const num1 = numbersdata.find(obj => obj.bool === "3").gamenumbers
            const num2 = numbersdata.find(obj => obj.bool === "4").gamenumbers
            const num3 = numbersdata.find(obj => obj.bool === "5").gamenumbers

            if (active.bool === "6") {
                gamenumbers["Single Ank"] = numbersdata.find(obj => obj.bool === "1").gamenumbers
                gamenumbers["Open Pana"] = this.set_merge(num1, num2, num3)
                const list = [
                    { list: gamenumbers["Open Pana"], name: "Open Pana", timerflag: "1", type: 1 },
                    { list: gamenumbers["Single Ank"], name: "Close Single Ank", timerflag: "2", type: 2 },
                    { list: gamenumbers["Open Pana"], name: "Close Pana", timerflag: "2", type: 3 },
                    { list: gamenumbers["Single Ank"], name: "Open Single Ank", timerflag: "1", type: 4 }
                ]
                const newrow = Object.assign({}, bazaaritem, { numbers: list }, { gamesitem: active }, { timerflag }, { type: 1 })
                return { 1: newrow }
            } else if (active.bool === "7") {

                gamenumbers["Open Pana"] = this.set_merge(num1, num2, num3)
                gamenumbers["Close Pana"] = this.set_merge(num1, num2, num3)
                const list = [
                    { list: gamenumbers["Open Pana"], name: "Open Pana.", timerflag: "1", type: 5 },
                    { list: gamenumbers["Close Pana"], name: "Close Pana.", timerflag: "2", type: 6 }
                ]

                const newrow = Object.assign({}, bazaaritem, { numbers: list }, { gamesitem: active }, { timerflag }, { type: 1 })
                return { 1: newrow }
            } else if (active.bool === "10") {
                const list = []

                const newrow = Object.assign({}, bazaaritem, { numbers: list }, { gamesitem: active }, { timerflag }, { type: 1 })
                return { 1: newrow }
            } else if (active.bool === "11") {
                const list = []

                const newrow = Object.assign({}, bazaaritem, { numbers: list }, { gamesitem: active }, { timerflag }, { type: 1 })
                return { 1: newrow }
            } else if (active.bool === "12") {
                const list = []
                const newrow = Object.assign({}, bazaaritem, { numbers: list }, { gamesitem: active }, { timerflag }, { type: 1 })
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
            if (tab._id === GameNameKey['full sangam'] || tab._id === GameNameKey['half sangam'] || tab._id === GameNameKey['Jodi']) {
                this.setState({ active: tab, timerflag: "3" })
            } else {
                if (this.state.timerflag === "3") {
                    this.setState({ active: tab, timerflag: "1" })
                } else {
                    this.setState({ active: tab })
                }
            }
        }
    }

    Mobiletoggle = (tab) => {

        let location = {}
        if (this.state.active !== tab) {
            const { selectbazarItem } = this.state

            if (tab._id === GameNameKey['full sangam'] || tab._id === GameNameKey['half sangam'] || tab._id === GameNameKey['Jodi']) {
                location = this.getRow(selectbazarItem, "3", tab)
                history.push("/Mybets/satta/games", location)
                // this.setState({active : tab, timerflag : "3"});
            } else {
                if (this.state.timerflag === "3") {
                    location = this.getRow(selectbazarItem, "1", tab)
                    history.push("/Mybets/satta/games", location)
                    // this.setState({active : tab, timerflag : "1"});
                } else {
                    location = this.getRow(selectbazarItem, this.state.timerflag, tab)
                    history.push("/Mybets/satta/games", location)
                    // this.setState({active : tab});
                }
            }
        }
    }

    timerChecking = (bazaaritem) => {

        const ch1 = timerChecking(bazaaritem, bazaaritem.timers.opentime, this.props.time, bazaaritem.bettingdate)
        const ch2 = timerChecking(bazaaritem, bazaaritem.timers.closetime, this.props.time, bazaaritem.bettingdate, true, bazaaritem.timers.opentime)
        if (ch1 && ch2) {
            return true
        } else {
            return false
        }

    }

    timerChecking1 = (bazaaritem) => {
        return timerChecking(bazaaritem, bazaaritem.timers.opentime, this.props.time, bazaaritem.bettingdate)
    }

    timerChecking2 = (bazaaritem) => {
        return timerChecking(bazaaritem, bazaaritem.timers.closetime, this.props.time, bazaaritem.bettingdate, true, bazaaritem.timers.opentime)
    }

    timerChange = async (timerflag, bazaaritem, index) => {
        const tab = this.state.active
        if (timerflag === this.state.timerflag) {
            this.setState({ flag: false, active: "", timerflag: "" })
        } else {
            if (timerflag === "1") {
                if (this.timerChecking1(bazaaritem)) {
                    if (tab._id === GameNameKey['full sangam'] || tab._id === GameNameKey['half sangam'] || tab._id === GameNameKey['Jodi']) {
                        // this.setState({flag : true})
                        this.setState({ timerflag: "3", selectbazarItem: bazaaritem, flag: true, active: "" })
                    } else {
                        this.setState({ timerflag, selectbazarItem: bazaaritem, flag: true, active: "" })
                    }
                } else {
                    // this.setState({flag : false})
                    const find = await this.props.FindBetting(bazaaritem,null, index)
                    if (find) {
                        if (tab._id === GameNameKey['full sangam'] || tab._id === GameNameKey['half sangam'] || tab._id === GameNameKey['Jodi']) {
                            // this.setState({flag : true})
                            this.setState({ timerflag: "3", selectbazarItem: find, flag: true, active: "" })
                        } else {
                            this.setState({ timerflag, selectbazarItem: find, flag: true, active: "" })
                        }
                        // this.setState({ selectbazarItem : bazaaritem,flag : true, timerflag : "1",active : ""})
                        // this.setState({ selectbazarItem : item, timerflag : "1",flag : true,active : ""});
                    } else {
                        this.setState({ flag: false, timerflag: "0", active: "" })
                    }
                }
            } else {
                if (this.timerChecking2(bazaaritem)) {
                    if (tab._id === GameNameKey['full sangam'] || tab._id === GameNameKey['half sangam'] || tab._id === GameNameKey['Jodi']) {
                        // this.setState({flag : true})
                        this.setState({ timerflag: "3", selectbazarItem: bazaaritem, flag: true, active: "" })
                    } else {
                        this.setState({ timerflag, selectbazarItem: bazaaritem, flag: true, active: "" })
                    }
                } else {
                    // this.setState({flag : false,active : ""})
                    const find = await this.props.FindBetting(bazaaritem, null, index)
                    if (find) {
                        if (tab._id === GameNameKey['full sangam'] || tab._id === GameNameKey['half sangam'] || tab._id === GameNameKey['Jodi']) {
                            // this.setState({flag : true})
                            this.setState({ timerflag: "3", selectbazarItem: find, flag: true, active: "" })
                        } else {
                            this.setState({ timerflag, selectbazarItem: find, flag: true, active: "" })
                        }
                        // this.setState({ selectbazarItem : bazaaritem,flag : true, timerflag : "2",active : ""})
                        // this.setState({ selectbazarItem : item, timerflag : "1",flag : true,active : ""});

                    } else {
                        this.setState({ flag: false, timerflag: "0", active: "" })
                    }
                }
            }
        }
    }

    bazarItemChange = async (item,index) => {
        if (this.state.selectbazarItem !== item || this.state.flag === false) {
            if (this.timerChecking(item)) {

                const timerflag = this.state.timerflag
                if (timerflag === "0") {
                    this.setState({ selectbazarItem: item, timerflag: "1", flag: true, active: "" })
                } else {
                    this.setState({ selectbazarItem: item, flag: true, active: "" })
                }

            } else if (this.timerChecking1(item)) {

                const timerflag = this.state.timerflag
                if (timerflag === "0") {
                    this.setState({ selectbazarItem: item, timerflag: "1", flag: true, active: "" })
                } else {
                    this.setState({ selectbazarItem: item, flag: true, timerflag: "1", active: "" })
                }

            } else if (this.timerChecking2(item)) {

                const timerflag = this.state.timerflag
                if (timerflag === "0") {
                    this.setState({ selectbazarItem: item, timerflag: "2", flag: true, active: "" })
                } else {
                    this.setState({ selectbazarItem: item, flag: true, timerflag: "2", active: "" })
                }

            } else {

                const find = await this.props.FindBetting(item, null, index)
                if (find) {
                    this.setState({ selectbazarItem: find, flag: true, timerflag: "1", active: "" })
                    // this.setState({ selectbazarItem : item, timerflag : "1",flag : true,active : ""});
                } else {
                    this.setState({ flag: false, timerflag: "0", active: "" })
                }
            }
        } else {
            this.setState({ flag: false, timerflag: "0", active: "" })
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
                header.map((item, i) => (
                    <div className="tblbazaarheader" style={{ width: "25%" }} key={i}>
                        {item}
                    </div>
                ))
            }
        </Col>
    }

    MobilebazarRender = (item) => {
        const { timerflag, selectbazarItem } = this.state
        return <div className="d-block w-100 mt-1">
            <div className={`w-100 tblbazaaritem${  item.hightlight ? " highlight" : ""}`} onClick={() => this.bazarItemChange(item)}>
                <div className="borderchild position-relative">
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
            <Row className="d-flex w-100 m-0 p-0">
                <div className="tblbazaaritem" style={{ width: `${100 / 3  }%` }}>
                    <div className={`mobilechild${  item._id + timerflag === `${selectbazarItem._id  }1` || item._id + timerflag === `${selectbazarItem._id  }3` ? " childactive" : ""}`}
                        onClick={() => this.timerChange("1", item)}
                    >
                        <div className="text-uppercase font-weight-bold">
                            OPEN
                            </div>
                        <div className=" font-weight-bold">
                            {
                                item.timers.opentime ? `( ${  get_remaining_time(item.timers.opentime, this.props.time, item.bettingdate)  } )` : "---------"
                            }
                        </div>
                    </div>
                </div>
                <div className="tblbazaaritem" style={{ width: `${100 / 3  }%` }}>
                    <div className="child resultborder">
                        <div style={{ color: "green", fontSize: "1rem" }}>
                            Result
                            </div>
                        <div className="font-weight-bold d-block" style={{ color: "green", fontSize: "1rem" }}>
                            {item.result ? `${item.result.openresult  }-${  item.result.jodiresult  }-${  item.result.closeresult}` : "---"}
                        </div>
                    </div>
                </div>
                <div className="tblbazaaritem" style={{ width: `${100 / 3  }%` }}>
                    <div className={`mobilechild${  item._id + timerflag === `${selectbazarItem._id  }2` || item._id + timerflag === `${selectbazarItem._id  }3` ? " childactive" : ""}`}
                        onClick={() => this.timerChange("2", item)}
                    >
                        <div className="text-uppercase font-weight-bold">
                            CLOSE
                            </div>
                        <div className=" font-weight-bold">
                            {
                                item.timers.closetime ? `( ${  get_remaining_time(item.timers.closetime, this.props.time, item.bettingdate, true, item.timers.opentime)  } )` : "---------"
                            }
                        </div>
                    </div>
                </div>

            </Row>
        </div>
    }

    bazarRender = (item, index) => {
        const { timerflag, selectbazarItem } = this.state
        return <Col md="12" className="d-flex">
            <div className={`tblbazaaritem${  item.hightlight ? " highlight" : ""}`} onClick={() => this.bazarItemChange(item, index)}>
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
            <div className={`tblbazaaritem${  item.hightlight ? " highlight" : ""}`}>
                <div className={`child timername ${  item._id + timerflag === `${selectbazarItem._id  }1` || item._id + timerflag === `${selectbazarItem._id  }3` ? " childactive" : ""}`}
                    onClick={() => this.timerChange("1", item, index)}
                >
                    <div className="text-uppercase">
                        remaining time
                    </div>
                    <div>
                        {
                            // item.timers.opentime ? `( ${  get_remaining_time(item.timers.opentime, this.props.time, this.state.bettingdate)  } )` : "---------"
                            item.timers.opentime ? `( ${  get_remaining_time(item.timers.opentime, this.props.time, item.bettingdate)  } )` : "---------"
                        }
                    </div>
                </div>
            </div>
            <div className={`tblbazaaritem${  item.hightlight ? " highlight" : ""}`}>
                <div className={`child timername ${  item._id + timerflag === `${selectbazarItem._id  }2` || item._id + timerflag === `${selectbazarItem._id  }3` ? " childactive" : ""}`}
                    onClick={() => this.timerChange("2", item, index)}
                >
                    <div className="text-uppercase">
                        remaining time
                    </div>
                    <div>
                        {
                            // item.timers.closetime ? `( ${  get_remaining_time(item.timers.closetime, this.props.time, this.state.bettingdate, true, item.timers.opentime)  } )` : "---------"
                            item.timers.closetime ? `( ${  get_remaining_time(item.timers.closetime, this.props.time, item.bettingdate, true, item.timers.opentime)  } )` : "---------"
                        }
                    </div>
                </div>
            </div>
            <div className={`tblbazaaritem${  item.hightlight ? " highlight" : ""}`}>
                <div className="child">
                    <div className="font-weight-bold d-block" style={{ color: "green", fontSize: "1.5rem" }}>
                        {item.result ? `${item.result.openresult  }-${  item.result.jodiresult  }-${  item.result.closeresult}` : "---"}
                    </div>
                </div>
            </div>
        </Col>
    }

    gamesitemRender = (item) => {
        const { timerflag, active, gamelist, selectbazarItem, flag } = this.state
        const betsdata = this.props.satta_bet_data
        return <React.Fragment>
            {
                selectbazarItem._id === item._id && flag ? <Col md="12" className="mt-1 tblbazarbody">
                        <Nav tabs fill>
                            {
                                gamelist.slice(0,gamelist.length-2).map((gitem, j) => (
                                    <React.Fragment key={j}>
                                        {
                                            item.gamelink && item.gamelink[gitem._id] && item.gamelink[gitem._id].status ? gitem._id === GameNameKey['full sangam'] || gitem._id === GameNameKey['half sangam'] || gitem._id === GameNameKey['Jodi'] ? this.timerChecking(item) && (timerflag === "1" || timerflag === "3") ? <React.Fragment>
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
                                                        </NavItem> : <React.Fragment>
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

    MobilegamesitemRender = (item) => {
        const { timerflag, active, gamelist, selectbazarItem, flag } = this.state
        const betsdata = this.props.satta_bet_data
        return <React.Fragment>
            {
                selectbazarItem._id === item._id && flag ?
                    <Col md="12" className="m-0 p-0 mt-1 tblbazarbody ">
                        <Nav tabs fill className="w-100">
                            {
                                gamelist.slice(0,gamelist.length-2).map((gitem, j) => (
                                    <React.Fragment key={j}>
                                        {
                                            item.gamelink && item.gamelink[gitem._id] && item.gamelink[gitem._id].status ? gitem._id === GameNameKey['full sangam'] || gitem._id === GameNameKey['half sangam'] || gitem._id === GameNameKey['Jodi'] ? this.timerChecking(item) && timerflag === "1" ? <React.Fragment>
                                                            <Row className="w-50 m-0">
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
                                                        </React.Fragment> : <React.Fragment>
                                                            <Row className="w-50 m-0">
                                                                <NavItem className="w-75">
                                                                    <NavLink>
                                                                        {gitem.name}
                                                                    </NavLink>
                                                                </NavItem>
                                                                <div className="total w-25">
                                                                    <Lock size={17} />
                                                                </div>
                                                            </Row>
                                                        </React.Fragment> : <React.Fragment>
                                                        <Row className="w-50 m-0">
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
                                                    </React.Fragment> : <React.Fragment>
                                                    <Row className="w-50 m-0">
                                                        <NavItem className="w-75">
                                                            <NavLink>
                                                                {gitem.name}
                                                            </NavLink>
                                                        </NavItem>
                                                        <div className="total w-25">
                                                            <Lock size={17} />
                                                        </div>
                                                    </Row>
                                                </React.Fragment>
                                        }
                                    </React.Fragment>
                                )
                                )
                            }
                        </Nav>
                        {/* {
                            active && Object.keys(active).length ?
                            <Numbers location = {this.getRow(selectbazarItem, timerflag, active)} />
                            : null
                        } */}
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
                                <>
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
                                </>
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
                                                    this.bazarRender(item, i)
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

export default connect(mapStateToProps, mapDispatchToProps)(bazaar)
