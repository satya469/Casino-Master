import React, { Fragment, useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { setallmatchelist, getmarkets, getSportlist, setactiveSport, setmatchelist, setSportslist } from "../../redux/actions/betexchg"
import { LoadingContext } from "../../utility/loading"
import Category from "./category"
import Matketspage from "./matketspage"
import querystring from "query-string"
import { useDispatch, useSelector } from "react-redux"

const Betexchevent = () => {

    const history = useHistory()
    const { showLoading, hideLoading } = useContext(LoadingContext)
    const { activeSport,  Sportlist, Inplay } = useSelector(state => state.betexch)
    const dispatch = useDispatch()

    const load = async () => {
        if (!Sportlist.length) {
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
        } else {

        }
    }

    const loadmarkets = async () => {
        showLoading()
        let rdata = await getmarkets({ row: activeSport })
        if (rdata.status) {
            dispatch(setmatchelist(rdata.data))
            dispatch(setallmatchelist(rdata.data))
        }
        hideLoading()
    }
 /*eslint-disable */

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
        <Fragment>
            <div className="betexchmain">
                <Category />
                <Matketspage />
            </div>
        </Fragment>
    )
}

export default Betexchevent