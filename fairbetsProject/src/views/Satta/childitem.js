import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Row, Input } from "reactstrap"
import { update_satta, satta_bet_save } from "../../redux/actions/satta/matka"
import { setloginpage } from "../../redux/actions/auth/loginActions"
import { toast } from "react-toastify"
import { GameNameKey, Bazaartype_key, halfred, fullred } from "../../configs/providerConfig"
import { Nav, NavItem, NavLink } from 'reactstrap'

export class childitem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isopen: true,
            active: null,
            intervaltime: null,
            timerflag: null,
            JodiFlag: "1"
        }
    }

    IsOpen() {
        this.setState({ isopen: !this.state.isopen })
    }

    itemselect = (item) => {


        let time_flag = this.state.timerflag
        // var time_flag = this.props.data.timerflag;
        if (!time_flag) {
            toast.warn("please select timer")
            return
        }
        const row = this.props.satta_bet_data
        const sattas_bets = this.props.satta_bet_data
        const bazaaritem = this.props.detail
        const name = this.props.data.name
        const type = this.props.data.type
        const gameitem = this.props.detail.gamesitem
        let gamename = gameitem.name
        let detail = null
        const betnumber = item
        const time_flag1 = time_flag
        let is_exist = false
        let exit_item = null
        for (const i in sattas_bets) {
            for (const j in sattas_bets[i]["gamesnode"]) {
                for (const k in sattas_bets[i]["gamesnode"][j]["betsnode"]) {
                    for (const l in sattas_bets[i]["gamesnode"][j]["betsnode"][k]) {
                        const b_node = sattas_bets[i]["gamesnode"][j]["betsnode"][k][l]
                        if (b_node.detail && b_node.detail.require && name !== b_node.detail.text) {
                            toast.warn(`Please select ${  b_node.detail.text}`)
                            return
                        } else if (b_node.detail && b_node.detail.require && name === b_node.detail.text) {
                            exit_item = b_node
                            is_exist = true
                        }
                    }
                }
            }
        }


        if (gameitem._id === GameNameKey['full sangam'] || gameitem._id === GameNameKey['half sangam']) {
            detail = {}

            if (is_exist) {
                switch (type) {
                    case 1:
                        gamename += " A"
                        detail = {
                            require: false,
                            betnumber: exit_item.betnumber,
                            time_flag: exit_item.time_flag,
                            name: "Close Single Ank"
                        }
                        break

                    case 2:
                        item = exit_item.betnumber
                        time_flag = exit_item.time_flag
                        detail = {
                            require: false,
                            betnumber,
                            time_flag: time_flag1,
                            name: "Close Single Ank"
                        }
                        break

                    case 3:
                        gamename += " B"
                        detail = {
                            require: false,
                            betnumber: exit_item.betnumber,
                            time_flag: exit_item.time_flag,
                            name: "Open Single Ank"
                        }
                        break

                    case 4:
                        item = exit_item.betnumber
                        time_flag = exit_item.time_flag
                        detail = {
                            require: false,
                            betnumber,
                            time_flag: time_flag1,
                            name: "Open Single Ank"
                        }
                        break

                    case 5:
                        detail = {
                            require: false,
                            betnumber: exit_item.betnumber,
                            time_flag: exit_item.time_flag,
                            name: "Close Pana "
                        }
                        break

                    case 6:
                        item = exit_item.betnumber
                        time_flag = exit_item.time_flag
                        detail = {
                            require: false,
                            betnumber,
                            time_flag: time_flag1,
                            name: "Close Pana "
                        }
                        break


                    default:
                        break
                }
            } else {
                switch (type) {
                    case 1:
                        gamename += " A"
                        detail = {
                            text: "Close Single Ank",
                            require: true
                        }
                        break

                    case 2:
                        gamename += " A"
                        detail = {
                            text: "Open Pana",
                            require: true
                        }
                        break

                    case 4:
                        gamename += " B"
                        detail = {
                            text: "Close Pana",
                            require: true
                        }
                        break

                    case 3:
                        gamename += " B"
                        detail = {
                            text: "Open Single Ank",
                            require: true
                        }
                        break

                    case 5:
                        detail = {
                            text: "Close Pana.", ///    space keyboard
                            require: true
                        }
                        break

                    case 6:
                        detail = {
                            text: "Open Pana.",
                            require: true
                        }
                        break

                    default:
                        break

                }
            }

        }

        const oddsprice = bazaaritem["gamelink"][gameitem._id]['oddsprice']
        const minbetprice = bazaaritem["gamelink"][gameitem._id]['minbetprice']
        // const minbetprice = getMinbetPrice( bazaaritem.bazaartype, gameitem.bool, item,bazaaritem["gamelink"][gameitem._id]['minbetprice'], bazaaritem["gamelink"])


        if (row[bazaaritem._id]) {
            if (row[bazaaritem._id]["gamesnode"][gameitem._id]) {
                if (row[bazaaritem._id]["gamesnode"][gameitem._id]["betsnode"][time_flag]) {
                    if (!row[bazaaritem._id]["gamesnode"][gameitem._id]["betsnode"][time_flag][item]) {
                        const betnode = Object.assign({}, row, {})
                        if (gameitem._id === GameNameKey['full sangam'] || gameitem._id === GameNameKey['half sangam']) {
                            if (type === 1 || type === 3 || type === 5) {
                                if (exit_item && row[bazaaritem._id]["gamesnode"][gameitem._id]["betsnode"][exit_item.time_flag][exit_item.betnumber]) {
                                    if (betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][`${item  }:${  exit_item.betnumber}`]) {
                                        toast.warn("it is repeated")
                                        return
                                    } else {
                                        betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][`${item  }:${  exit_item.betnumber}`] = {
                                            betnumber: item,
                                            id: `${bazaaritem._id  }:${  gameitem._id  }:${  item  }:${  time_flag}`,
                                            roundid: new Date().valueOf(),
                                            amount: 0,
                                            winamount: 0,
                                            name,
                                            time_flag,
                                            detail,
                                            bettingdate:bazaaritem.bettingdate,
                                            gamename
                                        }
                                        delete betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][exit_item.time_flag][exit_item.betnumber]
                                    }
                                } else {
                                    betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item] = {
                                        betnumber: item,
                                        id: `${bazaaritem._id  }:${  gameitem._id  }:${  item  }:${  time_flag}`,
                                        roundid: new Date().valueOf(),
                                        amount: 0,
                                        winamount: 0,
                                        name,
                                        time_flag,
                                        detail,
                                        bettingdate:bazaaritem.bettingdate,
                                        gamename
                                    }
                                }
                            } else {
                                betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item] = {
                                    betnumber: item,
                                    id: `${bazaaritem._id  }:${  gameitem._id  }:${  item  }:${  time_flag}`,
                                    roundid: new Date().valueOf(),
                                    amount: 0,
                                    winamount: 0,
                                    name,
                                    time_flag,
                                    bettingdate:bazaaritem.bettingdate,
                                    detail,
                                    gamename
                                }
                            }
                        } else {
                            betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item] = {
                                betnumber: item,
                                id: `${bazaaritem._id  }:${  gameitem._id  }:${  item  }:${  time_flag}`,
                                roundid: new Date().valueOf(),
                                amount: 0,
                                winamount: 0,
                                bettingdate:bazaaritem.bettingdate,
                                name,
                                time_flag,
                                detail,
                                gamename
                            }
                        }
                        this.props.update_satta(betnode)
                    } else {
                        if (gameitem._id === GameNameKey['full sangam'] || gameitem._id === GameNameKey['half sangam']) {
                            if (type === 3 || type === 1 || type === 5) {
                                const betnode = Object.assign({}, row, {})
                                delete betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item]
                                betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item]["detail"] = detail
                                this.props.update_satta(betnode)
                            } else {
                                const betnode = Object.assign({}, row, {})
                                if (betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][`${item  }:${  detail.betnumber}`]) {
                                    toast.warn("It is repeated number")
                                    
                                } else {
                                    betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][`${item  }:${  detail.betnumber}`] = {}
                                    betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item]["detail"] = detail
                                    betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][`${item  }:${  detail.betnumber}`] = betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item]
                                    delete betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item]
                                    this.props.update_satta(betnode)
                                }
                            }
                        } else {
                            const betnode = Object.assign({}, row, {})
                            delete betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item]
                            this.props.update_satta(betnode)
                        }
                    }
                } else {
                    const betnode = Object.assign({}, row, {})
                    betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag] = {}
                    if (type === 3 || type === 1 || type === 5) {
                        if (exit_item && row[bazaaritem._id]["gamesnode"][gameitem._id]["betsnode"][exit_item.time_flag][exit_item.betnumber]) {
                            if (betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][`${item  }:${  exit_item.betnumber}`]) {
                                toast.warn("It is repeated number")
                                return
                            } else {
                                betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][`${item  }:${  exit_item.betnumber}`] = {
                                    betnumber: item,
                                    id: `${bazaaritem._id  }:${  gameitem._id  }:${  item  }:${  time_flag}`,
                                    roundid: new Date().valueOf(),
                                    amount: 0,
                                    name,
                                    bettingdate:bazaaritem.bettingdate,
                                    winamount: 0,
                                    time_flag,
                                    detail,
                                    gamename
                                }
                                delete betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][exit_item.time_flag][exit_item.betnumber]
                            }
                        } else {
                            betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item] = {
                                betnumber: item,
                                id: `${bazaaritem._id  }:${  gameitem._id  }:${  item  }:${  time_flag}`,
                                roundid: new Date().valueOf(),
                                amount: 0,
                                name,
                                bettingdate:bazaaritem.bettingdate,
                                winamount: 0,
                                time_flag,
                                detail,
                                gamename
                            }
                        }
                    } else {
                        betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item] = {
                            betnumber: item,
                            id: `${bazaaritem._id  }:${  gameitem._id  }:${  item  }:${  time_flag}`,
                            roundid: new Date().valueOf(),
                            amount: 0,
                            name,
                            winamount: 0,
                            bettingdate:bazaaritem.bettingdate,
                            time_flag,
                            detail,
                            gamename
                        }
                    }
                    this.props.update_satta(betnode)
                }
            } else {
                const betnode = {}
                betnode[time_flag] = {}
                betnode[time_flag][item] = {
                    betnumber: item,
                    id: `${bazaaritem._id  }:${  gameitem._id  }:${  item  }:${  time_flag}`,
                    roundid: new Date().valueOf(),
                    amount: 0,
                    name,
                    winamount: 0,
                    time_flag,
                    bettingdate:bazaaritem.bettingdate,
                    detail,
                    gamename
                }
                const betitem = Object.assign({}, row, {})
                betitem[bazaaritem._id]["gamesnode"][gameitem._id] = {
                    betsnode: betnode,
                    oddsprice,
                    minbetprice
                }
                this.props.update_satta(betitem)
            }
        } else {
            const betnode = {}
            betnode[time_flag] = {}
            betnode[time_flag][item] = {
                betnumber: item,
                id: `${bazaaritem._id  }:${  gameitem._id  }:${  item  }:${  time_flag}`,
                roundid: new Date().valueOf(),
                name,
                amount: 0,
                winamount: 0,
                time_flag,
                detail,
                bettingdate:bazaaritem.bettingdate,
                gamename
            }

            const gamesnode = {}
            gamesnode[gameitem._id] = {
                betsnode: betnode,
                oddsprice,
                minbetprice
            }
            const bazaarnode = Object.assign({}, row, {})
            bazaarnode[bazaaritem._id] = {
                gamesnode,
                bazaarname: bazaaritem.bazaarname
            }
            this.props.update_satta(bazaarnode)
        }
    }

    sum_ = (selects) => {
        let amount = 0
        for (const i in selects) {
            amount += parseInt(selects[i].amount)
        }
        return amount
    }

    sum_items = (items, selecteditems) => {
        let amount = 0
        for (const i in items) {
            if (selecteditems[items[i]]) {
                amount += parseInt(selecteditems[items[i]].amount)
            }
        }
        return amount
    }

    multi_a_ch_act = (e, items) => {
        for (const i in items) {
            this.a_ch_act(e, items[i], true)
        }
    }

    all_a_ch_act = (e, list) => {


        // if (e !== "") {
        if (list && list.length > 3) {
            this.multi_a_ch_act(e, list)
        } else {
            for (const i in list) {
                this.multi_a_ch_act(e, list[i])
            }
        }

        // }
    }

    a_ch_act = (e, item, multi) => {
        const amount = parseInt(e)
        // if(amount < ){
        // return;
        // }

        const time_flag = this.state.timerflag
        if (!time_flag) {
            toast.warn("please select timer")
            return
        }
        const row = this.props.satta_bet_data
        const bazaaritem = this.props.detail
        // var time_flag = this.props.data.timerflag;
        const gameitem = this.props.detail.gamesitem
        const oddsprice = bazaaritem["gamelink"][gameitem._id]['oddsprice']
        // const minbetprice = getMinbetPrice( bazaaritem.bazaartype, gameitem.bool, item,bazaaritem["gamelink"][gameitem._id]['minbetprice'], bazaaritem["gamelink"])
        const minbetprice = bazaaritem["gamelink"][gameitem._id]['minbetprice']

        const winamount = amount * parseInt(oddsprice)
        const name = this.props.data.name
        const gamename = gameitem.name

        if (row[bazaaritem._id]) {
            if (row[bazaaritem._id]["gamesnode"][gameitem._id]) {
                if (row[bazaaritem._id]["gamesnode"][gameitem._id]["betsnode"][time_flag]) {
                    if (!row[bazaaritem._id]["gamesnode"][gameitem._id]["betsnode"][time_flag][item]) {
                        const betnode = Object.assign({}, row, {})
                        betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item] = {
                            betnumber: item,
                            id: `${bazaaritem._id  }:${  gameitem._id  }:${  item  }:${  time_flag}`,
                            roundid: new Date().valueOf(),
                            bettingdate:bazaaritem.bettingdate,
                            amount,
                            winamount,
                            name,
                            time_flag,
                            multi: !!multi,
                            gamename
                        }
                        this.props.update_satta(betnode)
                    } else {
                        if (!row[bazaaritem._id]["gamesnode"][gameitem._id]["betsnode"][time_flag][item]["multi"] && multi) {
                        } else {
                            if (isNaN(amount)) {
                                const betnode = Object.assign({}, row, {})
                                delete betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item]
                                this.props.update_satta(betnode)
                            } else {
                                const betnode = Object.assign({}, row, {})
                                betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item]["amount"] = amount
                                betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item]["winamount"] = winamount
                                betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item]["multi"] = !!multi
                                this.props.update_satta(betnode)
                            }
                        }
                    }
                } else {
                    const betnode = Object.assign({}, row, {})
                    betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag] = {}
                    betnode[bazaaritem._id]["gamesnode"][gameitem._id]['betsnode'][time_flag][item] = {
                        betnumber: item,
                        id: `${bazaaritem._id  }:${  gameitem._id  }:${  item  }:${  time_flag}`,
                        roundid: new Date().valueOf(),
                        name,
                        bettingdate:bazaaritem.bettingdate,
                        amount,
                        winamount,
                        time_flag,
                        multi: !!multi,
                        gamename
                    }
                    this.props.update_satta(betnode)
                }
            } else {
                const betnode = {}
                betnode[time_flag] = {}
                betnode[time_flag][item] = {
                    betnumber: item,
                    id: `${bazaaritem._id  }:${  gameitem._id  }:${  item  }:${  time_flag}`,
                    roundid: new Date().valueOf(),
                    amount,
                    winamount,
                    time_flag,
                    bettingdate:bazaaritem.bettingdate,
                    name,
                    multi: !!multi,
                    gamename
                }
                const betitem = Object.assign({}, row, {})
                betitem[bazaaritem._id]["gamesnode"][gameitem._id] = {
                    gamename: gameitem.name,
                    betsnode: betnode,
                    oddsprice,
                    minbetprice
                }
                this.props.update_satta(betitem)
            }
        } else {
            const betnode = {}
            betnode[time_flag] = {}
            betnode[time_flag][item] = {
                betnumber: item,
                id: `${bazaaritem._id  }:${  gameitem._id  }:${  item  }:${  time_flag}`,
                roundid: new Date().valueOf(),
                amount,
                winamount,
                name,
                time_flag,
                multi: !!multi,
                bettingdate:bazaaritem.bettingdate,
                gamename
            }

            const gamesnode = {}
            gamesnode[gameitem._id] = {
                gamename: gameitem.name,
                betsnode: betnode,
                oddsprice,
                minbetprice

            }
            const bazaarnode = Object.assign({}, row, {})
            bazaarnode[bazaaritem._id] = {
                gamesnode,
                bazaarname: bazaaritem.bazaarname
            }
            this.props.update_satta(bazaarnode)
        }
    }


    getSelectItem = (betsdata, bazaaritem, gameitem, time_flag) => {
        let selecteditems = []
        if (betsdata) {
            if (betsdata[bazaaritem._id]) {
                if (betsdata[bazaaritem._id]["gamesnode"]) {
                    if (betsdata[bazaaritem._id]["gamesnode"][gameitem._id]) {
                        if (betsdata[bazaaritem._id]["gamesnode"][gameitem._id]["betsnode"][time_flag]) {
                            const items = betsdata[bazaaritem._id]["gamesnode"][gameitem._id]["betsnode"][time_flag]
                            selecteditems = items
                        }
                    }
                }
            }
        }
        return selecteditems
    }

    ischeck = (num) => {
        // let arrays = []
        // arrays = [...arrays, ...halfred]
        // arrays = [...arrays, ...fullred]
        // if (arrays.indexOf(num.toString()) !== -1) {
        //     return false
        // } else {
        //     return true
        // }
        return true
    }

    getLineObject = (list, gameid, bazaartype) => {

        const indexs = list && list.length > 3 ? 0 : list[0].length
        const l_object = {}

        // if (gameid === GameNameKey.Jodi && bazaartype === Bazaartype_key.regular) {

        //     const rows = list
        //     for (const i in list) {

        //         rows[i] = []
        //         for (const j in list[i]) {
        //             if (this.ischeck(list[i][j])) {
        //                 rows[i].push(list[i][j])
        //             }
        //         }
        //     }

        //     for (let i = 0; i < indexs - 2; i++) {
        //         l_object[i] = []
        //         for (let j = 1; j < 11; j++) l_object[i].push(rows[j % 10][i])
        //     }
        // } else {
            for (let i = 0; i < indexs; i++) {
                l_object[i] = []
                for (let j = 1; j < 11; j++) l_object[i].push(list[j % 10][i])

            }
        // }
        return l_object
    }


    componentDidMount() {
        const { timerflag } = this.props.data
        this.setState({ timerflag })
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.detail && this.props.detail.bazaartype !== "3") {
            if (prevState.timerflag !== this.props.data.timerflag) {
                this.setState({ timerflag: this.props.data.timerflag })
            }
        }
    }


    StartLineTimerRender = (timersoption, bazaaritem) => {
        return <React.Fragment>

            {
                bazaaritem.bazaartype === "3" ? <Col md="12" className="sattaitems color-white">
                        <Row>
                            {
                                timersoption.map((item, i) => (
                                    <Col md="1" onClick={() => this.setState({ timerflag: item })} sm="3" xs="2" className={`satta-events-items m-1 mb-0 ${  this.state.timerflag === item ? " satta-events-items-active" : ""}`} key={i}>
                                        <div>
                                            {item}
                                        </div>
                                        <div>
                                            {
                                                bazaaritem.result && bazaaritem.result[item] ? bazaaritem.result[item] : "- - - "
                                            }
                                        </div>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Col> : null
            }

        </React.Fragment>
    }

    render() {

        let { list, type, name } = this.props.data
        const { timerflag, JodiFlag } = this.state
        const bazaaritem = this.props.detail
        const gameitem = this.props.detail.gamesitem
        const betsdata = this.props.satta_bet_data
        const selecteditems = this.getSelectItem(betsdata, bazaaritem, gameitem, timerflag)
        const headers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

        const l_object = this.getLineObject(list, gameitem._id, bazaaritem.bazaartype)

        if (gameitem._id === GameNameKey.Jodi && bazaaritem.bazaartype === Bazaartype_key.regular) {
            if (JodiFlag === "2") {
                list = halfred
            }
            if (JodiFlag === "3") {
                list = fullred
            }
        }

        return (
            <React.Fragment >
                <Row className="pt-1 color-white w-100 p-1">
                    {
                        gameitem._id !== GameNameKey['full sangam'] && gameitem._id !== GameNameKey['half sangam'] ? <React.Fragment>
                                <Col md="2" sm="6" xs="6" className="text-left d-flex align-items-center">
                                    <span>
                                        Bazar all numbers:
                                </span>
                                </Col>
                                <Col md="1" sm="6" xs="6">
                                    <Input min={0} onChange={(e) => this.all_a_ch_act(e.target.value, list)} type="number" className="color-white igamez-satta-border" />
                                </Col>
                            </React.Fragment> : null
                    }
                </Row>
                {
                    gameitem._id === GameNameKey.Jodi && bazaaritem.bazaartype === Bazaartype_key.regular ? <Nav tabs fill className="w-100">
                            <Row className="w-100 d-flex align-items-center justify-content-center">
                                <NavItem onClick={() => this.setState({ JodiFlag: "1" })}>
                                    <NavLink active={JodiFlag === "1"} >
                                        Jodi
                                </NavLink>
                                </NavItem>
                                <NavItem onClick={() => this.setState({ JodiFlag: "2" })}>
                                    <NavLink active={JodiFlag === "2"}>
                                        Half Red
                                </NavLink>
                                </NavItem>
                                <NavItem onClick={() => this.setState({ JodiFlag: "3" })}>
                                    <NavLink active={JodiFlag === "3"}>
                                        Full Red
                                </NavLink>
                                </NavItem>
                            </Row>
                        </Nav> : <Col className="color-white text-center" md="12">
                            {
                                name
                            }
                        </Col>
                }

                <Row className="d-flex m-0">
                    {list && list.length > 3 ? <React.Fragment>
                            {
                                list.map((item, i) => (
                                    <Col md={1} sm="3" xs="3" className="p-0 mr-0 mt-1 mb-0 sattaitems" key={i} >
                                        <div onClick={() => this.itemselect(item)} className={`satta-events-items m-0 d-block ${  selecteditems[item] ? " satta-events-items-active" : ""}`} >
                                            <span className="OutcomeName">
                                                {item}
                                            </span>
                                        </div>
                                        {
                                            type === 0 ? <Input min={0} type="number" onChange={(e) => this.a_ch_act(e.target.value, item)} value={selecteditems[item] ? selecteditems[item].amount : ""} className='igamez-satta-border' /> : null
                                        }
                                    </Col>
                                ))
                            }

                            <Col md={1} className="p-0 m-0 mt-1 sattaitems amountlabel" style={{ marginLeft: "0.5rem" }} sm="6" xs="6">
                                <div className="satta-events-items m-0 d-block">
                                    <span className="OutcomeName">
                                        Amount
                                    </span>
                                </div>
                                <Input disabled={true} type="text" value={this.sum_(selecteditems)} className="color-white igamez-satta-border" />
                            </Col>

                        </React.Fragment> : <React.Fragment>

                            <Col md="12">
                                <Row>
                                    {
                                        headers.map((item, i) => (
                                            <Col md="1" key={i} className="p-0 mr-0 mt-0 mb-0 d-block" style={{ marginLeft: "0.5rem" }}>
                                                <Input type="number" min={0} onChange={(e) => this.multi_a_ch_act(e.target.value, list[item])} className="color-white igamez-satta-border" />
                                                <p className="text-center font-weight-bold color-white" style={{ fontSize: "1.5rem" }} >
                                                    {item}
                                                </p>
                                            </Col>
                                        ))
                                    }
                                    <Col md="1" className=" d-flex align-items-center text-center color-white justify-content-center">
                                        <span>
                                            Amount
                                            </span>
                                    </Col>
                                </Row>
                            </Col>
                            {
                                Object.keys(l_object).map((itemj, j) => (
                                    <React.Fragment key={j}>
                                        <Col md="12" className="mt-1">
                                            <Row>
                                                {
                                                    l_object[itemj].map((item, i) => (
                                                        <React.Fragment key={i}>
                                                            <Col md={1} sm="3" xs="3" className="p-0 mr-0 mt-0 mb-0 sattaitems"  >
                                                                <div onClick={() => this.itemselect(item)} className={`satta-events-items m-0 d-block ${  selecteditems[item] ? " satta-events-items-active" : ""}`} >
                                                                    <span className="OutcomeName">
                                                                        {item}
                                                                    </span>
                                                                </div>
                                                                <Input type="number" min={0} onChange={(e) => this.a_ch_act(e.target.value, item)} className="color-white igamez-satta-border" value={selecteditems[item] ? selecteditems[item].amount : ""} />
                                                            </Col>
                                                        </React.Fragment>
                                                    ))
                                                }
                                                <Col md={1} className="d-flex sattaitems" style={{ alignItems: "flex-end" }}>
                                                    <Input type="number" disabled={true} value={this.sum_items(l_object[itemj], selecteditems)} className='igamez-satta-border' />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </React.Fragment>
                                ))
                            }
                        </React.Fragment>
                    }
                </Row>

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    satta_bet_data: state.satta.betsdata,
    time: state.time.value
})

const mapDispatchToProps = {
    setloginpage,
    update_satta,
    satta_bet_save
}

export default connect(mapStateToProps, mapDispatchToProps)(childitem)
