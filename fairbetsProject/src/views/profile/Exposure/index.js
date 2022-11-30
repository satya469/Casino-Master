import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Card, Table, Badge, Row } from 'reactstrap'
import { LoadingContext } from "../../../utility/loading"
import { UserContext } from "../../../utility/UserContext"
import * as ApiService from "../../../redux/actions/auth/apiservice"
import { dateConvert } from "../../../redux/actions/auth/"
import { TabContent, Nav, NavItem, NavLink } from 'reactstrap'
import Media from 'react-media'

const TabsJustified = () => {

    const [expoarray, setexpoarray] = useState([])
    const { showLoading, hideLoading } = useContext(LoadingContext)
    const { user } = useContext(UserContext)
    const [active, setActive] = useState('1')
    const [totalamt, settotalamt] = useState({
        totalSatta: 0,
        totalbetexch: 0,
        totalSports: 0,
        totalamount: 0
    })

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
            load(tab)
        }
    }
    const load = async (active) => {
        showLoading()
        let d = await ApiService.GetExposure({ active })
        let t = await ApiService.GetExposureTotal({ active })
        if (t.status) {
            settotalamt(t)
        }
        if (d.status) {
            setexpoarray(d.data)
        } else {
        }
        hideLoading()
    }
    /*eslint-disable */

    useEffect(() => {
        load(active)
    }, [user])
    /*eslint-enable */

    return (
        <Fragment>
            <Card className="mb-0">
                <Nav tabs justified>
                    <NavItem>
                        <NavLink
                            active={active === '1'}
                            onClick={() => {
                                toggle('1')
                            }}
                            className="text-uppercase"
                        >
                            All&nbsp;&nbsp;
                            <Badge color="info">
                                {
                                    totalamt.totalamount
                                }
                            </Badge>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            active={active === '2'}
                            onClick={() => {
                                toggle('2')
                            }}
                            className="text-uppercase"
                        >
                            Satta&nbsp;&nbsp;
                            <Badge color="info">
                                {
                                    totalamt.totalSatta
                                }
                            </Badge>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            active={active === '3'}
                            onClick={() => {
                                toggle('3')
                            }}
                            className="text-uppercase"
                        >

                            Sportsbook&nbsp;&nbsp;
                            <Badge color="info">
                                {
                                    totalamt.totalSports
                                }
                            </Badge>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            active={active === '4'}
                            onClick={() => {
                                toggle('4')
                            }}
                            className="text-uppercase"
                        >
                            Betexch
                            &nbsp;&nbsp;
                            <Badge color="info">
                                {
                                    totalamt.totalbetexch
                                }
                            </Badge>
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent className='py-50' activeTab={active}>

                    <Media queries={{ small: "(max-width: 768px)", large: "(min-width: 769px)" }}>
                        {matches => (
                            <React.Fragment>
                                {matches.small &&
                                    <div className="mb-5">
                                        {
                                            expoarray.length ?
                                                expoarray.map((item, i) => (
                                                    <Row key={i} className="w-100 m-0 p-1" style={{ borderBottom: "1px solid" }}>

                                                        <div className="w-50 text-uppercase color-white">
                                                            transactionid
                                                        </div>
                                                        <div className="w-50 color-white">
                                                            {
                                                                item.transactionid
                                                            }
                                                        </div>

                                                        <div className="w-50 text-uppercase color-white">
                                                            name
                                                        </div>
                                                        <div className="w-50 color-white">
                                                            {
                                                                item.name
                                                            }
                                                        </div>

                                                        <div className="w-50 text-uppercase color-white">
                                                            gamename
                                                        </div>
                                                        <div className="w-50 color-white">
                                                            {
                                                                item.gamename
                                                            }
                                                        </div>

                                                        <div className="w-50 text-uppercase color-white">
                                                            matchTime
                                                        </div>
                                                        <div className="w-50 color-white">
                                                            {
                                                                item.matchTime
                                                            }
                                                        </div>

                                                        <div className="w-50 text-uppercase color-white">
                                                            amount
                                                        </div>
                                                        <div className="w-50 color-white">
                                                            {
                                                                item.amount
                                                            }
                                                        </div>

                                                        <div className="w-50 text-uppercase color-white">
                                                            Bet
                                                        </div>
                                                        <div className="w-50 color-white">
                                                            {
                                                                item.Bet
                                                            }
                                                        </div>

                                                        <div className="w-50 text-uppercase color-white">
                                                            status
                                                        </div>
                                                        <div className="w-50 color-white">
                                                            {
                                                                item.status
                                                            }
                                                        </div>

                                                        <div className="w-50 text-uppercase color-white">
                                                            backlay
                                                        </div>
                                                        {
                                                            console.log(item)
                                                        }
                                                        <div className="w-50 color-white">
                                                            {
                                                                item.backlay === "back" ?
                                                                    <div style={{ background: "#0293cc", color: "white", padding: "0.5rem", textAlign: "center",width:"56px",borderRadius:"5px" }} >{item.backlay}</div>
                                                                    : item.backlay === "lay" ?
                                                                        <div style={{ background: "red", color: "white", padding: "0.5rem", textAlign: "center",width:"56px" ,borderRadius:"5px" }} >{item.backlay}</div>
                                                                        : ""
                                                            }
                                                        </div>

                                                        <div className="w-50 text-uppercase color-white">
                                                            Betdate
                                                        </div>
                                                        <div className="w-50 color-white">
                                                            {
                                                                dateConvert(item.Betdate)
                                                            }
                                                        </div>
                                                    </Row>
                                                ))
                                                : null
                                        }
                                    </div>
                                }
                                {
                                    matches.large &&
                                    <>
                                        <Table responsive bordered>
                                            <thead>
                                                <tr>
                                                    {
                                                        expoarray.length ?
                                                            Object.keys(expoarray[0]).map((item, i) => (
                                                                <th key={i} className="text-uppercase" >
                                                                    {item}
                                                                </th>
                                                            )) : null
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    expoarray.length ?
                                                        expoarray.map((item, i) => (
                                                            <tr key={i}>
                                                                <td>
                                                                    {
                                                                        item.transactionid
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item.name
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item.gamename
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item.matchTime
                                                                    }
                                                                </td>

                                                                <td>
                                                                    {
                                                                        item.amount
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item.Bet
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item.status
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item.backlay === "back" ?
                                                                            <div style={{ background: "#0293cc", color: "white", padding: "0.5rem", textAlign: "center" }} >{item.backlay}</div>
                                                                            : item.backlay === "lay" ?
                                                                                <div style={{ background: "red", color: "white", padding: "0.5rem", textAlign: "center" }} >{item.backlay}</div>
                                                                                : ""
                                                                    }
                                                                </td>

                                                                <td>
                                                                    {
                                                                        dateConvert(item.Betdate)
                                                                    }
                                                                </td>

                                                            </tr>
                                                        )) : null
                                                }
                                            </tbody>
                                        </Table>
                                    </>
                                }
                            </React.Fragment>
                        )}
                    </Media>
                </TabContent>

            </Card>
        </Fragment>
    )
}

export default TabsJustified
