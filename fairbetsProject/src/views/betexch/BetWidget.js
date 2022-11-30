import React, { useEffect, useState } from "react"
import { ChevronDown, ChevronRight } from "react-feather"
import { Card, Table, Badge } from "reactstrap"
import axios from "axios"
import { useSelector } from "react-redux"

const Betslip = () => {

    const { activeodds, openbets } = useSelector(state => state.betexch)
    const [widget, setwidget] = useState(false)
    const [show, setshow] = useState(false)
    const [livetv, setlivetv] = useState(false)
    const [Openbet, setOpenbet] = useState(false)
    const [marketId, setmarketId] = useState("false")

    const load = async () => {

        if (!show) {
            let marketId = activeodds["markets"] &&  activeodds["markets"]["Match Odds"] ? activeodds["markets"]["Match Odds"]['marketId'] : ""
            setmarketId(marketId)
            let realIdData = await axios.get(`https://widgets.fn.sportradar.com/infinitygames/en/Etc:UTC/gismo/match_info/m${activeodds.event.id}`);
            let realId = realIdData.data.queryUrl.split("/")[1];
            if (realId) {
                let oldP = document.getElementById("matchId");
                if(oldP) {
                    oldP.parentNode.removeChild(oldP);
                }
                let oldS = document.getElementById("lmt-script");
                if(oldS) {
                    oldS.parentNode.removeChild(oldS);
                }
                const P = document.createElement("p")
                P.id = "matchId"
                P.className = realId
                document.body.appendChild(P)

                const script = document.createElement("script")
                script.src = "/betexchg-lmt.js"
                script.id = "lmt-script"
                script.async = true
                document.body.appendChild(script)
                setshow(true)
            }
        }
    }

    /*eslint-disable */
    useEffect(() => {
        if (Object.keys(activeodds).length) {
            load()
        }
    }, [activeodds, show])
    /*eslint-enable */

    return (
        <div className="betchgwidget">
            <React.Fragment>
                <Card >
                    <div className="color-red">
                        <div className={ !livetv ?  "active" : ""} onClick={() => setlivetv(false)} >
                            LIVE SCORE
                        </div>
                        <div className={ livetv ?  "active" : ""} onClick={() => setlivetv(true)} >
                            LIVE TV
                        </div>
                        <div className="symbolb cursor-pointer">
                            {
                                !widget ?
                                    <ChevronDown onClick={() => setwidget(true)} /> :
                                    <ChevronRight onClick={() => setwidget(false)} />
                            }
                        </div>
                    </div>
                    <div className={"widgets " + (!widget && !livetv  ? "" : "d-none")}>
                        <div><div className="sr-widget sr-widget-1"></div></div>
                    </div>
                    <div className={"openbets " + (livetv ? "" : "d-none")}>
                        {
                            marketId !=="" ?
                            <iframe title="livetv" src={`https://timexbet.com/sports/live-tv-2/${marketId}`} id="video" className="w-100" >
                            </iframe> :""
                        }
                    </div> 
                </Card>
            </React.Fragment>

            <React.Fragment>
                <Card >
                    <div className="color-red">
                        <div className="active">
                            BETS
                        </div>
                        <div className="symbolb cursor-pointer">
                            {
                                !Openbet ?
                                    <ChevronDown onClick={() => setOpenbet(true)} /> :
                                    <ChevronRight onClick={() => setOpenbet(false)} />
                            }
                        </div>
                    </div>
                    {
                        !Openbet ?
                            <div className="openbets">
                                {
                                    openbets.length ?
                                        <Table responsive bordered>
                                            <thead >
                                                <tr className="text-uppercase">
                                                    <th>
                                                        SELECTION
                                                    </th>
                                                    <th>
                                                        ODD
                                                    </th>
                                                    <th>
                                                        STAKE
                                                    </th>
                                                    <th>
                                                        {"P & L"}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    openbets.map((item, i) => (
                                                        <tr key={i}>
                                                            <td>
                                                                {
                                                                    item.SELECTION
                                                                }&nbsp;&nbsp;
                                                                {
                                                                    item.backlay === "back" ?
                                                                        <Badge color="info">
                                                                            BACK
                                                                        </Badge> :
                                                                        <Badge color="danger">
                                                                            LAY
                                                                        </Badge>

                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.ODD
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.stake
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    item.profit
                                                                }
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </Table>
                                        :
                                        <div>
                                            No Bets Found
                                        </div>
                                }
                            </div>
                            : ""
                    }
                </Card>
            </React.Fragment>

        </div>
    )
}

export default Betslip
