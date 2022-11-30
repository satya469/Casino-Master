import { Table } from "reactstrap"
import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "../../utility/UserContext"
import { LoadingContext } from "../../utility/loading"
import { dateConvert, mymarketsload } from "../../redux/actions/betexchg"
import { useHistory } from "react-router-dom"

const Betexchmymarkets = () => {

    const { user } = useContext(UserContext)
    const { showLoading, hideLoading } = useContext(LoadingContext)
    const [mymarkets, setmymarkets] = useState({})
    const history = useHistory()

    const viewodds = async (item) => {
        history.push(`/betexchmarketsodds?eventname=${item.sportname}&competition=${item.competitionName}&eventid=${item.matchName}`,{item})
    }

    const load = async () => {
        showLoading()
        let rdata = await mymarketsload()
        if (rdata.status) {
            setmymarkets(rdata.data)
        } else {
        }
        hideLoading()
    }
    /*eslint-disable */

    useEffect(() => {
        if (user && Object.keys(user).length) {
            load()
        }
    }, [user])
    /*eslint-enable */

    return (
        <div className="betexchmain">
            <Table responsive bordered className="betexchgmymarkes">
                <thead>
                    <tr>
                        <th>
                            DATE
                        </th>
                        <th>
                            SPORT
                        </th>
                        <th>
                            MATCH NAME
                        </th>
                        <th>
                            BETS
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.values(mymarkets).map((item, i) => (
                            <tr key={i}>
                                <td>
                                    {
                                        dateConvert(item.matchTime)
                                    }
                                </td>
                                <td>
                                    {
                                        item.sportname
                                    }
                                </td>
                                <td>
                                    <div className="matchname" onClick={() => viewodds(item)} >
                                        {
                                            item.matchName
                                        }
                                    </div>

                                </td>
                                <td>
                                    {
                                        item.betscount
                                    }
                                </td>

                            </tr>
                        ))
                    }
                </tbody>
            </Table>

        </div>

    )
}

export default Betexchmymarkets
