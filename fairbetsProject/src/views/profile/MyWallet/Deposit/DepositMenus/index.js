import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Row, Button, Input, Label, Form } from 'reactstrap'
import { toast } from "react-toastify"
import { YaarPayCheckOut, PaymentMenuload, stripeCheckOut, paymoroNetbanking, paymoroUpi, paymoroWallet, rushpayment, paygeIncardpayment } from "../../../../../redux/actions/paymentGateWay"
import AmountSetting from "./AmountSetting"
import Select from "react-select"
import { Clock, ChevronRight } from "react-feather"
import { Root } from "../../../../../authServices/rootconfig"

class DepositMenus extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeMethod: null,
            allMethod: null,
            activeindex: null,
            moreInfoState: true,
            amount: 0,
            //yarpay           
            depositBankCode: '',
            // ruppepay
            mobile: '',
            address: '',
            city: '',
            postcode: '',
            //paymoro UPI
            customerUpiId: "",
            flag: false,
            // paygin card
            FirstName: "",
            LastName: "",
            Email: "",
            BillingZipCode: "",
            MobileNo: "",
            BillingAddress: "",
            BillingCity: "",
            BillingState: "",

        }
    }

    componentDidMount() {
        this.props.PaymentMenuload({ type: 1 })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.PaymentMenuData !== prevState.allMethod) {
            this.setState({ allMethod: this.props.PaymentMenuData })
        }
    }

    activeChange(e) {

        const activeitem = this.state.allMethod[e]
        this.setState({
            flag: !this.state.flag,
            activeindex: e,
            activeMethod: activeitem,
            amount: activeitem.min,
            moreInfoState: false,
            depositBankCode: activeitem.depositBankCode && activeitem.depositBankCode.length ? activeitem.depositBankCode[0].value : ''
        })
        const userdetail = activeitem.userdetail

        if (userdetail) {
            switch (activeitem.paymentType) {
                case "8035":
                    this.setState({ depositBankCode: userdetail.depositBankCode })
                    break
                case "netbanking":
                    this.setState({ city: userdetail.city, address: userdetail.address, mobile: userdetail.mobile, postcode: userdetail.mobile })
                    break
                case "PMNetBanking":
                    break
                case "Wallet":
                    break
                case "UPI":
                    this.setState({ customerUpiId: userdetail.customerUpiId })
                    break
                case "PAYGINCARDPAY":
                    this.setState({
                        customerUpiId: userdetail.customerUpiId,
                        FirstName: userdetail.FirstName,
                        LastName: userdetail.LastName,
                        Email: userdetail.Email,
                        BillingZipCode: userdetail.BillingZipCode,
                        MobileNo: userdetail.MobileNo,
                        BillingAddress: userdetail.BillingAddress,
                        BillingCity: userdetail.BillingCity,
                        BillingState: userdetail.BillingState,
                    })
                    break
                default:
                    break
            }
        }
    }

    paymentDeposit = (e) => {
        e.preventDefault()
        const { mobile, address, city, postcode, amount, activeMethod, customerUpiId,  BillingAddress,
            BillingCity,
            BillingState,
            BillingZipCode,
            MobileNo,
            FirstName,
            LastName,
            Email, } = this.state
        if (amount > activeMethod.max || amount < activeMethod.min) {
            toast.error("Please input correct amount.")
        } else {
            let row = {}
            const depositBankCode = this.state.depositBankCode

            switch (activeMethod.paymentType) {
                case "stripe":
                    row = {
                        amount,
                        mobile,
                        address,
                        city,
                        postcode,
                        paymentmenuid: activeMethod._id
                    }
                    return this.props.stripeCheckOut(row)
                case "8035":
                    if (!depositBankCode) {
                        return toast.warn('Please Select Bank.')
                    }
                    row = {
                        amount,
                        depositBankCode,
                        paymentmenuid: activeMethod._id
                    }
                    return this.props.YaarPayCheckOut(row)
                case "PMNetBanking":
                    if (!depositBankCode) {
                        return toast.warn('Please Select Bank.')
                    }
                    row = {
                        amount,
                        paymentmenuid: activeMethod._id,
                        depositBankCode
                    }
                    return this.props.paymoroNetbanking(row)
                case "Wallet":
                    if (!depositBankCode) {
                        return toast.warn('Please Select Bank.')
                    }
                    row = {
                        amount,
                        paymentmenuid: activeMethod._id,
                        depositBankCode
                    }
                    return this.props.paymoroWallet(row)
                case "UPI":
                    row = {
                        amount,
                        paymentmenuid: activeMethod._id,
                        customerUpiId
                    }
                    return this.props.paymoroUpi(row)
                case "rushpayment":
                    row = {
                        amount,
                        paymentmenuid: activeMethod._id,
                        customerUpiId
                    }
                    return this.props.rushpayment(row)
                case "PAYGINCARDPAY":
                    row = {
                        amount,
                        paymentmenuid: activeMethod._id,
                        BillingAddress,
                        BillingCity,
                        BillingState,
                        BillingZipCode,
                        MobileNo,
                        FirstName,
                        LastName,
                        Email,
                    }
                    return this.props.paygeIncardpayment(row)
                default:

            }
        }
    }

    setValue = (state, value) => {
        this.setState({ [state]: value })
    }

    renderDeposit = () => {

        const { activeMethod } = this.state
        const depositBankCode = this.state.depositBankCode
        console.log(activeMethod.paymentType)
        switch (activeMethod.paymentType) {
            case "8035":
                return <Col xs='12'>
                    <Select className="React" classNamePrefix="select" id="depositBankCode" name="depositBankCode"
                        options={activeMethod.depositBankCode} value={activeMethod.depositBankCode.find(obj => obj.value === depositBankCode)}
                        onChange={e => this.setState({ depositBankCode: e.value })} />
                </Col>

            case "netbanking":
                return <React.Fragment>
                    <Col xs='12'>
                        <Label for="Mobile">Mobile</Label>
                        <Input
                            required
                            type="number"
                            name="Mobile"
                            minLength={10}
                            maxLength={14}
                            placeholder="Mobile"
                            value={this.state.mobile}
                            onChange={(e) => this.setState({ mobile: e.target.value })}
                        />
                    </Col>
                    <Col xs='12'>
                        <Label for="Address" className='mt-1'>Address</Label>
                        <Input
                            required
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={this.state.address}
                            onChange={(e) => this.setState({ address: e.target.value })}
                        />
                    </Col>
                    <Col xs='12'>
                        <Label for="City" className='mt-1'>City</Label>
                        <Input
                            required
                            type="text"
                            name="city"
                            placeholder="City"
                            value={this.state.city}
                            onChange={(e) => this.setState({ city: e.target.value })}
                        />
                    </Col>
                    <Col xs='12'>
                        <Label for="Pincode" className='mt-1'>Pincode</Label>
                        <Input
                            required
                            type="number"
                            name="postcode"
                            placeholder="Pincode / Postal code / Zip code"
                            value={this.state.postcode}
                            onChange={(e) => this.setState({ postcode: e.target.value })}
                        />
                    </Col>
                </React.Fragment>
            case "PMNetBanking":
                // const  depositBankCode  = this.state.depositBankCode;
                return <Col xs='12'>
                    <Select className="React" classNamePrefix="select" id="depositBankCode" name="depositBankCode"
                        options={activeMethod.depositBankCode} value={activeMethod.depositBankCode.find(obj => obj.value === depositBankCode)}
                        onChange={e => this.setState({ depositBankCode: e.value })} />
                </Col>
            case "Wallet":
                // const  depositBankCode  = this.state.depositBankCode;
                return <Col xs='12'>
                    <Select className="React" classNamePrefix="select" id="depositBankCode" name="depositBankCode"
                        options={activeMethod.depositBankCode} value={activeMethod.depositBankCode.find(obj => obj.value === depositBankCode)}
                        onChange={e => this.setState({ depositBankCode: e.value })} />
                </Col>
            case "UPI":
                return <Col xs='12'>
                    <Label for="customerUpiId" className='mt-1'>UPI ID	</Label>
                    <Input
                        required
                        type="text"
                        name="postcode"
                        placeholder="UPI ID	"
                        value={this.state.customerUpiId}
                        onChange={(e) => this.setState({ customerUpiId: e.target.value })}
                    />
                </Col>
            case "PAYGINCARDPAY":
                return <React.Fragment>
                    <Col xs='12'>
                        <Label for="FirstName" className='mt-1'>FirstName	</Label>
                        <Input
                            required
                            type="text"
                            name="postcode"
                            placeholder="FirstName	"
                            value={this.state.FirstName}
                            onChange={(e) => this.setState({ FirstName: e.target.value })}
                        />
                    </Col>
                    <Col xs='12'>
                        <Label for="LastName" className='mt-1'>LastName	</Label>
                        <Input
                            required
                            type="text"
                            name="postcode"
                            placeholder="LastName	"
                            value={this.state.LastName}
                            onChange={(e) => this.setState({ LastName: e.target.value })}
                        />
                    </Col>
                    <Col xs='12'>
                        <Label for="MobileNo" className='mt-1'>MobileNo	</Label>
                        <Input
                            required
                            type="text"
                            name="postcode"
                            placeholder="MobileNo	"
                            value={this.state.MobileNo}
                            onChange={(e) => this.setState({ MobileNo: e.target.value })}
                        />
                    </Col>

                    <Col xs='12'>
                        <Label for="Email" className='mt-1'>Email	</Label>
                        <Input
                            required
                            type="text"
                            name="postcode"
                            placeholder="Email	"
                            value={this.state.Email}
                            onChange={(e) => this.setState({ Email: e.target.value })}
                        />
                    </Col>

                    <Col xs='12'>
                        <Label for="BillingZipCode" className='mt-1'>BillingZipCode	</Label>
                        <Input
                            required
                            type="text"
                            name="postcode"
                            placeholder="BillingZipCode	"
                            value={this.state.BillingZipCode}
                            onChange={(e) => this.setState({ BillingZipCode: e.target.value })}
                        />
                    </Col>

                    <Col xs='12'>
                        <Label for="BillingState" className='mt-1'>BillingState	</Label>
                        <Input
                            required
                            type="text"
                            name="postcode"
                            placeholder="BillingState	"
                            value={this.state.BillingState}
                            onChange={(e) => this.setState({ BillingState: e.target.value })}
                        />
                    </Col>

                    <Col xs='12'>
                        <Label for="BillingCity" className='mt-1'>BillingCity	</Label>
                        <Input
                            required
                            type="text"
                            name="postcode"
                            placeholder="BillingCity	"
                            value={this.state.BillingCity}
                            onChange={(e) => this.setState({ BillingCity: e.target.value })}
                        />
                    </Col>

                    <Col xs='12'>
                        <Label for="BillingAddress" className='mt-1'>BillingAddress	</Label>
                        <Input
                            required
                            type="text"
                            name="postcode"
                            placeholder="BillingAddress	"
                            value={this.state.BillingAddress}
                            onChange={(e) => this.setState({ BillingAddress: e.target.value })}
                        />
                    </Col>

                </React.Fragment>
            default:
                break
        }
    }

    render() {
        const { activeMethod, amount, flag } = this.state
        return (
            <React.Fragment>
                {this.state.allMethod && this.state.allMethod.length ? (
                    <Row >
                        {
                            !flag ? <React.Fragment>
                                <Col md="12" className="d-flex align-items-center justify-content-center text-center">
                                    <h5>Select deposit method </h5>
                                </Col>
                                {
                                    this.state.allMethod.map((item, key) => (
                                        <Col md="6" sm="12" className="mt-1 pl-1" key={key}>
                                            <Row className="m-0 igamez-border" style={{ border: '1px solid', borderRadius: "5px", padding: "0.5rem", cursor: "pointer" }} onClick={() => this.activeChange(key, item)} >
                                                <Col md="2" xs="3" className="font-weight-bold d-flex justify-content-center text-center align-items-center">
                                                    <img style={{ width: "70px", height: "25px" }} src={Root.imageurl + item.image} alt='' />
                                                </Col>
                                                <Col md="9" xs="6" className="justify-content-center text-center align-items-center">
                                                    <h5 className="font-weight-bold">
                                                        {item.name}
                                                    </h5>
                                                    <p className="mb-0">
                                                        {item.currency}&nbsp;{item.min} - {item.currency}&nbsp;{item.max} &nbsp; <span><Clock size={15} /> 1 ~ 5 min</span>
                                                    </p>
                                                </Col>
                                                <Col md="1" xs="3" className="font-weight-bold d-flex justify-content-center text-center align-items-center">
                                                    <ChevronRight size="25" />
                                                </Col>
                                            </Row>
                                        </Col>
                                    ))
                                }
                            </React.Fragment> : <Col md="12" className="mt-1">
                                <Form onSubmit={(e) => this.paymentDeposit(e)}>
                                    <AmountSetting activeMethod={activeMethod} amount={amount} setValue={(r, e) => this.setValue(r, e)} />
                                    <Col sm='12' md="12" >
                                        <Row>
                                            {this.renderDeposit()}
                                            <Col xs='12' md='12' className='mt-1'>
                                                {/* <Row>
                                                    <Col xs='12' style={{ cursor: 'pointer' }} className="payment-deposit-text font-2" onClick={() => this.setState({ moreInfoState: !moreInfoState })} >
                                                        More info
                                                        </Col>
                                                </Row> */}
                                                <Row className='payment-deposit-text font-2 mt-1' style={{ minHeight: '100px', borderRadius: '0px' }}>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md='12'>
                                        <Row>
                                            <Col md="6">
                                                <Button className='igamez-button' color="warning" style={{ width: '100%', fontWeight: 'bold' }} type="button" onClick={() => this.setState({ flag: !this.state.flag })}>Back</Button>
                                            </Col>
                                            <Col md="6">
                                                <Button className='igamez-button' color="warning" style={{ width: '100%', fontWeight: 'bold' }} type="submit">Make deposit</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Form>
                            </Col>
                        }

                    </Row>
                ) : <div>Please wait ...</div>
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    PaymentMenuData: state.paymentGateWay.PaymentMenuData
})

const mapDispatchToProps = { YaarPayCheckOut, PaymentMenuload, stripeCheckOut, paymoroNetbanking, paymoroUpi, paymoroWallet, rushpayment, paygeIncardpayment }

export default connect(mapStateToProps, mapDispatchToProps)(DepositMenus)
