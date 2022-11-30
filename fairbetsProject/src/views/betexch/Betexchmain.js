import React, { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Root } from "../../authServices/rootconfig"
import { getSportlist, getmarkets, setmatchelist, setactiveSport, setSportslist, setallmatchelist } from "../../redux/actions/betexchg"
import { LoadingContext } from "../../utility/loading"
import {  Search } from "react-feather"
import { useHistory } from "react-router-dom"
import querystring from "query-string"
import MarketPage from "./matketspage"
import { FormGroup, Input } from "reactstrap"


const Betexchmain = () => {

    const { showLoading, hideLoading } = useContext(LoadingContext)
    const { activeSport, matchelist, Sportlist, Inplay } = useSelector(state => state.betexch)
    const dispatch = useDispatch()
    const history = useHistory()
    const [Searchvalue, setSearchvalue] = useState('')

    const load = async () => {
        showLoading()
       
        let rdata = await getSportlist()
        if (rdata.status) {
            let geteventtype = querystring.parse(history.location.search).eventname
            if (geteventtype) {
                let item = rdata.data.find(obj => geteventtype === obj.name)
                if (item) {
                    dispatch(setactiveSport(item))
                } else {
                    dispatch(setactiveSport(Inplay))
                }
            } else {
                dispatch(setactiveSport(Inplay))
            }
            dispatch(setSportslist(rdata.data))

        } else {
        }
        hideLoading()
    }

    const loadmarkets = async () => {
        dispatch(setmatchelist([]))
        dispatch(setallmatchelist([]))
            showLoading()
            let rdata = await getmarkets({ row: activeSport })
            if (rdata.status) {
                dispatch(setmatchelist(rdata.data))
                dispatch(setallmatchelist(rdata.data))
            }
            hideLoading()
        
    }

    const getMarketCount = () => {
        let count = 0
        for (let i in matchelist) {
            for (let j in matchelist[i].Serlist) {
                count += matchelist[i].Serlist[j].matches.length
            }
        }
        return count
    }

    const setactive = (item) => {
        history.push(`${history.location.pathname}?eventname=${item.name}`)
        dispatch(setactiveSport(item))
    }
 /*eslint-disable */
 useEffect(() => {
        if (Sportlist && Sportlist.length) {
            let geteventtype = querystring.parse(history.location.search).eventname
            let item = Sportlist.find(obj => geteventtype === obj.name)
            if (item) {
                dispatch(setactiveSport(item))
            } else {
                dispatch(setactiveSport(Inplay))
            }
        }
    }, [history.location.search])
    useEffect(() => {
        if (activeSport && Object.keys(activeSport).length) {
            loadmarkets()
        }
    }, [activeSport])

    useEffect(() => {
      
        load()
    }, [])
 /*eslint-enable */

    return (
        <div className="betexchmain">
            <div className="pr-1 pl-1 w-100">
                    <FormGroup className="position-relative has-icon-left">
                        <Input type="text" className="round" placeholder='Search' value={Searchvalue} onChange={e => setSearchvalue(e.target.value)} />
                        <div className="form-control-position px-1">
                            <Search size={15} />
                        </div>
                    </FormGroup>
                </div>
            <div className="betexchheader w-100">

                {/* <div className={"hnode" + (activeSport.eventType === Inplay.eventType ? " hnodeactive" : "")} onClick={() => setactive(Inplay)} >
                    <div className="w-100 d-flex align-items-center justify-content-center">
                        <div className="resu">
                        </div>
                    </div>
                    <div className="icon inplay">
                        <div className="count">
                            {getMarketCount()}
                        </div>
                        <Clock size="40" />
                    </div>
                    <div className="title">
                        Inplay
                    </div>
                </div> */}
                {
                    Sportlist.map((item, i) => (
                        <div className={"hnode" + (activeSport.eventType === item.eventType ? " hnodeactive" : "")} key={i} onClick={() => setactive(item)} >
                            <div className="w-100 d-flex align-items-center justify-content-center">
                                <div className="resu">
                                </div>
                            </div>
                            <div className="icon">
                                <div className="count">
                                    {
                                        getMarketCount()
                                    }
                                </div>
                                <img src={Root.imageurl + item.icon} alt="" />
                            </div>
                            <div className="title">
                                {
                                    item.name
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <MarketPage main={true} />

        </div>
    )
}

export default Betexchmain
