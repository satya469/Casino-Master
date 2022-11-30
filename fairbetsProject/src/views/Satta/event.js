import React, { Component } from 'react'
import { connect } from 'react-redux'
import Childitem from "./childitem"
import { Col, Row, Button, Input, FormGroup, Label } from "reactstrap"
import { update_satta, satta_bet_save } from "../../redux/actions/satta/matka"
import { setloginpage } from "../../redux/actions/auth/loginActions"
import { alert, singleMotor, doubleMotor, sdMotor, getMinbetPrice } from "../../redux/actions/auth/index"
import { Nav, NavItem, NavLink } from 'reactstrap'
import { toast } from "react-toastify"
import Select from "react-select"
import {UserContext} from '../../utility/UserContext'
import { history } from '../../history'

const degitsOptions = [
    {
        label: "3 Digits",
        value: 3
    },
    {
        label: "4 Digits",
        value: 4
    },
    {
        label: "5 Digits",
        value: 5
    },
    {
        label: "6 Digits",
        value: 6
    },
    {
        label: "7 Digits",
        value: 7
    },
    {
        label: "8 Digits",
        value: 8
    },
    {
        label: "9 Digits",
        value: 9
    }
]

export class event extends Component {
    static contextType = UserContext

    constructor(props) {
        super(props)
        this.state = {
            digitflag: 3,
            numbersItems: [],
            betnums: [],
            selectBetnumber: {},
            amount: 0
        }
    }

    show_loginform = () => {
        this.props.setloginpage({ login: true, register: false, forgot: false })
    }

    componentDidMount() {
        this.setState({
            numbersItems: this.getnumbersOptions(singleMotor([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 3))
        })
    }
    setDigitItems = (digit) => {
        this.setState({ digitflag: digit, numbersItems: this.getnumbersOptions(singleMotor([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], digit)), selectBetnumber: {}, betnums: [], amount: 0 })
    }

    removeAllItem = () => {
        this.props.update_satta({})
    }


    bet = () => {
        const rows = []
        const sattas_bets = this.props.satta_bet_data
        const betId = this.props.betId
        const {user} = this.context
        if (user) {
            for (const i in sattas_bets) {
                for (const j in sattas_bets[i]["gamesnode"]) {

                    let minbetprice = sattas_bets[i]["gamesnode"][j]["minbetprice"]
                    minbetprice = minbetprice > 0 ? minbetprice:5

                    for (const k in sattas_bets[i]["gamesnode"][j]["betsnode"]) {
                        for (const l in sattas_bets[i]["gamesnode"][j]["betsnode"][k]) {


                            const amount = sattas_bets[i]["gamesnode"][j]["betsnode"][k][l].amount

                            if (parseInt(amount) > 0 && parseInt(amount) >= minbetprice) {
                                const row = Object.assign({}, sattas_bets[i]["gamesnode"][j]["betsnode"][k][l],
                                    { transactionid: betId }
                                )
                                rows.push(row)
                            } else {
                                alert("please enter correctly amount.", "warn")
                                return
                            }
                        }
                    }
                }
            }

            this.props.satta_bet_save(rows, betId)
        }
    }

    getgrandTotal = (sattas_bets, bazaaritem) => {

        let amount = 0
        let selecteditems = []
        if (sattas_bets) {
            if (sattas_bets[bazaaritem._id]) {
                selecteditems = sattas_bets[bazaaritem._id]["gamesnode"]
                for (const j in selecteditems) {
                    for (const k in selecteditems[j]["betsnode"]) {
                        for (const l in selecteditems[j]["betsnode"][k]) {
                            amount += parseInt(selecteditems[j]["betsnode"][k][l]["amount"])
                        }
                    }
                }
            }
        }

        return amount
    }

    getTotalOdds = (sattas_bets) => {
        let totalOdds = 0
        for (const i in sattas_bets) {
            for (const j in sattas_bets[i]["gamesnode"]) {
                for (const k in sattas_bets[i]["gamesnode"][j]["betsnode"]) {
                    for (const l in sattas_bets[i]["gamesnode"][j]["betsnode"][k]) {
                        totalOdds += parseInt(sattas_bets[i]["gamesnode"][j]["betsnode"][k][l]["amount"])
                    }
                }
            }
        }

        return totalOdds
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

    a_ch_act = (e, item, multi) => {
        const amount = parseInt(e)
        // if(amount < ){
        // return;
        // }
        const bazaaritem = this.props.location[1]
        const { gamesitem } = bazaaritem

        const time_flag = this.state.selectBetnumber.value
        if (!time_flag) {
            toast.warn("please select timer")
            return
        }
        const row = this.props.satta_bet_data
        // var bazaaritem = this.props.detail;
        // var time_flag = this.props.data.timerflag;
        const gameitem = gamesitem
        const oddsprice = bazaaritem["gamelink"][gameitem._id]['oddsprice']
        // const minbetprice = bazaaritem["gamelink"][gameitem._id]['minbetprice']
        const minbetprice = getMinbetPrice( bazaaritem.bazaartype, gameitem.bool, item,bazaaritem["gamelink"][gameitem._id]['minbetprice'], bazaaritem["gamelink"])

        const winamount = amount * parseInt(oddsprice)
        const name = time_flag
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
                            amount,
                            winamount,
                            name,
                            bettingdate:bazaaritem.bettingdate,
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
                        amount,
                        winamount,
                        time_flag,
                        multi: !!multi,
                        bettingdate:bazaaritem.bettingdate,
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
                    bettingdate:bazaaritem.bettingdate,
                    winamount,
                    time_flag,
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
                bettingdate:bazaaritem.bettingdate,
                time_flag,
                multi: !!multi,
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

    getnumbersOptions = (array) => {
        const rows = []
        for (const i in array) {
            rows.push({
                label: array[i],
                value: array[i]
            })
        }
        return rows
    }

    setBetNumbers = (number, bool) => {
        if (bool === "10") {
            this.setState({
                betnums: singleMotor(number.value.split(""), 3), selectBetnumber: number, amount: 0
            })
        } else if (bool === "11") {
            this.setState({
                betnums: doubleMotor(number.value.split(""), 3), selectBetnumber: number, amount: 0
            })
        } else if (bool === "12") {
            this.setState({
                betnums: sdMotor(number.value.split(""), 3), selectBetnumber: number, amount: 0
            })
        }
    }

    Multi = (e) => {
        this.setState({ amount: e })
        const { betnums } = this.state
        for (const i in betnums) {
            this.a_ch_act(e, betnums[i])
        }
    }

    show_depositform = () => {
        const { telegram } = this.context
        if (!telegram) {
            history.push("/mywallet/deposit")
        } else {
            toast.warn("Please deposit")
        }
    }

    render() {

        const bazaaritem = this.props.location[1]
        const { numbers, gamesitem } = bazaaritem
        const { digitflag, numbersItems, betnums, selectBetnumber, amount } = this.state
        const sattas_bets = this.props.satta_bet_data
        const totalOdds = this.getTotalOdds(sattas_bets)
        const grandTotal = this.getgrandTotal(sattas_bets, bazaaritem)
        const selecteditems = this.getSelectItem(sattas_bets, bazaaritem, gamesitem, selectBetnumber.value)
        const balance_flag = !!(this.props.balance && this.props.balance.balance.toFixed(0) > totalOdds)
        const {user} = this.context


        return (
            <React.Fragment>
                <div className='height-100 numberpanel p-1'>
                    {
                        gamesitem.bool === "10" || gamesitem.bool === "11"  || gamesitem.bool === "12"? <React.Fragment>
                                <Row className="pt-1 color-white w-100 p-1">
                                    <Col className="color-white text-center" md="12">
                                        <Nav tabs fill className="w-100">
                                            {
                                                degitsOptions.map((item, i) => (
                                                    <NavItem key={i} onClick={() => this.setDigitItems(item.value)}>
                                                        <NavLink active={digitflag === item.value} >
                                                            {item.label}
                                                        </NavLink>
                                                    </NavItem>
                                                ))
                                            }
                                        </Nav>
                                    </Col>
                                    <Col className="color-white text-center" md="12">
                                        <Row className="m-0">
                                            <Col md="6" sm="12" >
                                                <FormGroup>
                                                    <Label for="select-number">select number</Label>
                                                    <Select
                                                        className="React"
                                                        classNamePrefix="select"
                                                        options={numbersItems}
                                                        value={selectBetnumber}
                                                        onChange={e => this.setBetNumbers(e, gamesitem.bool)}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md="6" sm="12">
                                                <FormGroup>
                                                    <Label for="enter-amount">enter amount</Label>
                                                    <Input min={0} type="number" onChange={(e) => this.Multi(e.target.value)} value={amount} className='igamez-satta-border mt-0' />
                                                </FormGroup>
                                            </Col>
                                            {
                                                betnums.map((item, i) => (
                                                    <Col md={1} sm="3" xs="3" key={i} className="p-0 mr-0 mt-1 mb-0 sattaitems"  >
                                                        <div className={`satta-events-items m-0 d-block ${  selecteditems[item] ? " satta-events-items-active" : ""}`}  >
                                                            <span className="OutcomeName">
                                                                {item}
                                                            </span>
                                                        </div>
                                                        <Input min={0} disabled={true} type="number" onChange={(e) => this.a_ch_act(e.target.value, item)} value={selecteditems[item] ? selecteditems[item].amount : ""} className='igamez-satta-border' />

                                                    </Col>
                                                ))
                                            }
                                        </Row>

                                    </Col>


                                </Row>
                            </React.Fragment> : <React.Fragment>
                                {
                                    numbers && numbers.length > 0 ? numbers.map((item, i) => (
                                        <Childitem data={item} detail={bazaaritem} key={i} />
                                    )) : null
                                }
                            </React.Fragment>
                    }
                </div>

                <Col md="12" className=" color-white p-1">
                    <Row>
                        <Col md="6">
                        </Col>
                        <Col md="2" xs="12" sm="12" className="text-center align-items-center justify-content-center d-flex">
                            <span>
                                Grand Total : {grandTotal}
                            </span>
                        </Col>
                        <Col md="2" sm="6" xs="6">
                            {
                                user ? balance_flag ? <Button type="submit" className="round btn-block igamez-button" color="warning" onClick={() => this.bet()}>
                                            Place Bet
                                        </Button> : <Button className="round btn-block igamez-button" color="warning" onClick={() => this.show_depositform()}> Deposit </Button> : <Button className="round btn-block igamez-button" color="warning" onClick={() => this.show_loginform()}> Bets </Button>
                            }
                        </Col>
                        <Col md="2" sm="6" xs="6">
                            <Button className="round btn-block igamez-button" color="warning" onClick={() => this.removeAllItem()}> Clear All </Button>
                        </Col>
                    </Row>
                </Col>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    balance: state.balance.value,
    satta_bet_data: state.satta.betsdata,
    satta_bet_finace: state.satta.finacedata,
    betId: state.satta.betId
})

const mapDispatchToProps = {
    setloginpage,
    update_satta,
    satta_bet_save
}

export default connect(mapStateToProps, mapDispatchToProps)(event)
