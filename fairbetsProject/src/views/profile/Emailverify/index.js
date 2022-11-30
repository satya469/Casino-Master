import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import { history } from "../../../history"
import { connect } from "react-redux"
import queryString from "query-string"
import {AXIOS_REQUEST} from "../../../redux/actions/auth"

class Emailverify extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            alertState : false, 
            alertTitle : '',
            alertType : null,
            text : ''
        }
    }
    
    async componentDidMount() {

        const data =  queryString.parse(this.props.location.search)
        if (data && data.code) {
            const rdata = await AXIOS_REQUEST('users/emailverify_receive', {data : data.code})
            if (rdata.status) {
                const alertType = "success"
                const alertTitle = "Successfully Verified"
                this.setState({alertState : true, alertTitle, alertType})
            } else {
                history.push('/')
            }
        } else {
            history.push('/')
        }
    }
    

    handleAlert = (state, value) => {
        history.push('/')
        // this.setState({ [state] : value });
    }
    
    render () {
        return (
                <React.Fragment>
                    {
                               
                        this.state.alertState ? <SweetAlert success title={this.state.alertTitle} show={this.state.alertState}  
                            onConfirm={() => this.handleAlert("alertState", false)}
                        >
                            <p className="sweet-alert-text">{this.state.text2}</p>
                        </SweetAlert> : null
                    }
                </React.Fragment>
          
        )
    }
}

const paymentGateWayData = (state) => {
    return {
    }
}
export default connect(paymentGateWayData, {})(Emailverify)