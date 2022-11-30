import React, { useContext, useEffect, useState } from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import { history } from "../../history"
import queryString from "query-string"
// import {getTransactionId} from "../../redux/actions/auth/apiservice"
import {UserContext} from "../../utility/UserContext"

const Paygincardpayment = () => {

    const {user} = useContext(UserContext)
    const [alertState, ] = useState(false)
    const [alertTitle, ] = useState("")
    const [text, ] = useState("")
    const [text2, ] = useState("")
    const [alertType, ] = useState("")

    const load = async (params) => {
        const data = queryString.parse(this.props.location.search)
        if (data && data.order_no) {
            // let rdata = await getTransactionId({order_no:data.order_no})
            
        //         //     const alertTitle = data.transactionStatus
        //         //     let alertType = ""
        //         //     const text = `Transaction Id :${  data.orderId}`
        //         //     const text2 = `Amount :${  data.amount}`
        //         //     switch (data.transactionStatus) {
        //         //         case "SUCCESS" :
        //         //             alertType = "success"
        //         //         break
        //         //         case "PENDING" :
        //         //             alertType = "info"
        //         //             break
        //         //         case "FAIL" :
        //         //             alertType = "error"
        //         //         break
        //         //         default:
        //         //             alertType = "error"
        //         //         break
        //         //     }

        //         //     this.setState({alertState : true, alertTitle, alertType, text, text2})
        }
    }

    const handleAlert = (state, value) => {
        history.push('/mywallet/deposit')
    }

    useEffect(() => {
        load()
    }, [user])


    return (
        <React.Fragment>
            {
                (() => {
                    if (alertType === 'success') {
                        return (
                            <SweetAlert success title={alertTitle}
                                show={alertState}
                                onConfirm={() => handleAlert("alertState", false)}
                            >
                                <p className="sweet-alert-text">{text}</p>
                                <p className="sweet-alert-text">{text2}</p>
                            </SweetAlert>
                        )
                    } else if (alertType === 'info') {
                        return (
                            <SweetAlert info title={alertTitle}
                                show={alertState}
                                onConfirm={() => handleAlert("alertState", false)}
                            >
                                <p className="sweet-alert-text">{text}</p>
                                <p className="sweet-alert-text">{text2}</p>
                            </SweetAlert>
                        )
                    } else if (alertType === 'error') {
                        return (
                            <SweetAlert error title={alertTitle}
                                show={alertState}
                                onConfirm={() => handleAlert("alertState", false)}
                            >
                                <p className="sweet-alert-text">{text}</p>
                                <p className="sweet-alert-text">{text2}</p>
                            </SweetAlert>
                        )
                    }
                })()
            }
        </React.Fragment>

    )
}

export default Paygincardpayment
