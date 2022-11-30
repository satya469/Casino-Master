import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import { history } from "../../history"
import queryString from "query-string"

class Paygate10Response extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            alertState : false, 
            alertTitle : '',
            alertType : null,
            text : '',
            text2 : ''
        }
    }
    
    componentDidMount() {
        const data = queryString.parse(window.location.search)
        const alertTitle = data.status
        let alertType = ""
        const text = `Transaction Id :${  data.txid}`
        const text2 = `Amount :${  data.amount}`

        switch (data.status) {
            case "APPROVED" :
                alertType = "success"
            break
            case "PENDING" :
                alertType = "error"
            break
            default:
                alertType = "info"
            break
        }
        this.setState({alertState : true, alertTitle, alertType, text, text2})
    }

    handleAlert = (state, value) => {
        this.setState({ [state] : value })
        history.push('/mywallet/deposit')
    }
    
    render () {
        return (
            <React.Fragment>
                {
                    (() => {
                        if (this.state.alertType === 'success') {
                            return (
                                <SweetAlert success title={this.state.alertTitle}
                                    show={this.state.alertState} 
                                    onConfirm={() => this.handleAlert("alertState", false)}
                                >
                                    <p className="sweet-alert-text">{this.state.text}</p>
                                </SweetAlert>
                            )
                        } else if (this.state.alertType === 'error') {
                            return (
                                <SweetAlert info title={this.state.alertTitle}
                                    show={this.state.alertState} 
                                    onConfirm={() => this.handleAlert("alertState", false)}
                                >
                                    <p className="sweet-alert-text">{this.state.text}</p>
                                </SweetAlert>
                            )
                        } else {
                            return (
                                <SweetAlert error title={this.state.alertTitle}
                                    show={this.state.alertState} 
                                    onConfirm={() => this.handleAlert("alertState", false)}
                                >
                                    <p className="sweet-alert-text">{this.state.text}</p>
                                </SweetAlert>
                            )
                        }
                    })()
                }
            </React.Fragment>
        )
    }
}

export default Paygate10Response