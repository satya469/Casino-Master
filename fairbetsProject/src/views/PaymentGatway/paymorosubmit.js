import React from 'react'
import queryString from "query-string"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import {AXIOS_REQUEST} from "../../redux/actions/auth/index"
import {history} from "../../history"

class YaarPayResponse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status : false
        }
    }
    
    async componentDidMount() {

        const data =  queryString.parse(this.props.location.search)
        if (data) {
            const subdata = await AXIOS_REQUEST("/paymentGateWay/getpaymoroSubmitdata", {orderno : data.orderno })
            if (subdata.status) {
                document.getElementById("paymoro").innerHTML = subdata.data
                document.forms["paymerosubmit"].submit()
            } else {
                history.push("/")
            }
        } else {
            history.push("/")
        }
    }
    
    render () {
        return (
            <React.Fragment>
                <div id="paymoro" style={{display:"none"}}>
                </div>
                <SkeletonTheme  color="#202020" highlightColor="#444">
                <Skeleton count={15} />
              </SkeletonTheme>
            </React.Fragment>
        )
    }
}

export default (YaarPayResponse)