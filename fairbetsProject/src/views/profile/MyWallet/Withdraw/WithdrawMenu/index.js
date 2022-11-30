import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Row, Button, Input, Label, Form } from 'reactstrap'
import {toast} from "react-toastify"
import {  PaymentMenuload, Cash_payout} from "../../../../../redux/actions/paymentGateWay"
import AmountSetting from "./AmountSetting"
import Select from "react-select"
import {WalletType} from "../../../../../configs/providerConfig"

class DepositMenus extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeMethod : [],
            allMethod : [],
            activeindex : 0,
            moreInfoState : true,
            amount:0,
            
            accountNumber : "",
            accountName : "",
            IfscCode : "",
            // depositBankCode:'',
            paymerodepositBankCode : "",
            UpiId: ""
            // ifscCode:'',
            // accountName:'',
            // accountNo:'',
            // name:'',
            // email:'',
            // contact:'',

            // bankname:'',
            // bankbranch:'',
            // bankaddress:'',

            // mobile:'',
            // address:'',
            // postcode:'',
            // city:'',
        }
    }

    componentDidMount() {
        this.props.PaymentMenuload({type:WalletType.Withdrawl})
    }

     componentDidUpdate(prevProps, prevState) {
        if (prevProps.PaymentMenuData !== this.props.PaymentMenuData &&  this.props.PaymentMenuData.length) {
            
            const activeMethod = this.props.PaymentMenuData[0]
            if (activeMethod.userdetail) {
                const userdetail = activeMethod.userdetail
                this.setState({
                    activeMethod,
                    allMethod : this.props.PaymentMenuData,
                    amount: activeMethod.min,
                    accountName : userdetail.accountName,
                    accountNumber : userdetail.accountNumber,
                    IfscCode : userdetail.IfscCode,
                    UpiId: userdetail.UpiId,
                    depositBankCode : userdetail.depositBankCode,
                    paymerodepositBankCode : userdetail.paymerodepositBankCode
                })
            } else {
                this.setState({
                    activeMethod,
                    allMethod : this.props.PaymentMenuData,
                    amount: activeMethod.min
                })

            }         
        }
        
    }

    activeChange(e) {
        this.setState({
            activeindex : e,
            activeMethod : this.state.allMethod[e],
            amount:this.state.allMethod[e].min,
            moreInfoState : false 
        })
    }

    paymentWithdraw(e) {
        e.preventDefault()

        if (this.state.activeMethod.min > this.state.amount  || this.props.balance.balance < parseInt(this.state.amount)) {
            toast.error("Please input correct amount.")
            return
        }

        const row = {
            accountName : this.state.accountName,
            accountNumber : this.state.accountNumber,
            IfscCode : this.state.IfscCode,
            depositBankCode : this.state.depositBankCode,
            paymerodepositBankCode : this.state.paymerodepositBankCode,
            UpiId: this.state.UpiId
        }

        this.props.Cash_payout(
            {
                amount : this.state.amount,
                type : this.state.activeMethod.type,
                currency : this.state.activeMethod.currency,
                bankType : this.state.activeMethod.paymentType,
                payoutData:{}

            },
            row,
            this.state.activeMethod._id
        )
    }

    setValue = (state, value) => {
        this.setState({ [state] : value })
    }
    

    render() {
        const { activeMethod, amount, moreInfoState } = this.state
        return (
            <React.Fragment>
                { this.props.balance && this.props.balance.balance && this.state.allMethod && this.state.allMethod.length ? (
                    <Row className='payment-deposit' style={{minHeight:'600px'}}>
                        <Col lg='12' xl='12'>
                            <div className='p-1 pl-2 pr-2 payment-deposit-menus' style={{height:'100%'}}> 
                                <AmountSetting  activeMethod={activeMethod} amount={amount}  setValue={(r, e) => this.setValue(r, e)} />
                                <Form onSubmit={(e) => this.paymentWithdraw(e)}  action={'#'}>
                                    <Row className='p-2'>
                                        <Col sm='12' lg='6' className='pl-1 pr-1'>
                                            <Row>
                                            <Col xs='12'>
                                                <Label for="accountNumber"  >accountNumber</Label>
                                                <Input 
                                                    required 
                                                    type="number" 
                                                    name="accountNumber" 
                                                    placeholder="accountNumber" 
                                                    value={this.state.accountNumber} 
                                                    onChange={(e) => this.setState({ accountNumber:e.target.value })} 
                                                />
                                            </Col>
                                            <Col xs='12' className="mt-1">
                                                <Label for="accountName"  >accountName</Label>
                                                <Input 
                                                    required 
                                                    type="text" 
                                                    name="accountName" 
                                                    placeholder="accountName" 
                                                    value={this.state.accountName} 
                                                    onChange={(e) => this.setState({ accountName:e.target.value })} 
                                                />
                                            </Col>
                                            <Col xs='12' className="mt-1">
                                                <Label for="Ifsc Code" >Ifsc Code</Label>
                                                <Input 
                                                    required 
                                                    type="text" 
                                                    name="Ifsc Code" 
                                                    placeholder="Ifsc Code" 
                                                    value={this.state.IfscCode} 
                                                    onChange={(e) => this.setState({ IfscCode:e.target.value })} 
                                                />
                                            </Col>

                                            <Col xs='12' className="mt-1">
                                                <Label for="UPI ID" >UPI ID</Label>
                                                <Input 
                                                    required 
                                                    type="text" 
                                                    name="UPI ID" 
                                                    placeholder="UPI ID" 
                                                    value={this.state.UpiId} 
                                                    onChange={(e) => this.setState({ UpiId:e.target.value })} 
                                                />
                                            </Col>

                                            {/* <Col className="mt-1" xs="12">
                                                <Label for="Bank" >Bank</Label>
                                                <Select className="React" classNamePrefix="select" id="depositBankCode" name="depositBankCode"
                                                options={yaarpaybank} value={yaarpaybank.find(obj => obj.value === this.state.depositBankCode)}
                                                onChange={e => this.setState({depositBankCode :e.value})} />
                                        
                                            </Col> */}

                                            <Col className="mt-1" xs="12">
                                                <Label for="Bank" >Bank</Label>
                                                <Select className="React" classNamePrefix="select" id="depositBankCode" name="depositBankCode"
                                                options={activeMethod.depositBankCode} value={activeMethod.depositBankCode.find(obj => obj.value === this.state.paymerodepositBankCode)}
                                                onChange={e => this.setState({paymerodepositBankCode :e.value})} />
                                            </Col>

                                                <Col xs='12' className="mt-1">
                                                    <Row>
                                                        <Col sm='12'  className="payment-deposit-text font-2 curosr-pointer"  onClick={() => this.setState({moreInfoState:!moreInfoState})} >
                                                            More info
                                                        </Col>
                                                    </Row>
                                                    {moreInfoState ? (
                                                        <Row className='payment-deposit-text font-2 mt-1'>
                                                            <Col xs='12'><Input style={{minHeight:'100px', borderRadius:'0px'}} type='textarea' value={"cash payout"} disabled={true} /></Col>
                                                        </Row>
                                                     ) : null} 
                                                </Col>
                                                <Col xs='12' sm='6'></Col>
                                            </Row>
                                        </Col>
                                        <Col sm='12' lg='6' className='pl-1 pr-1'>
                                            <Row  className='mt-1 pt-1'>
                                                <Col xs='12'>
                                                    <Button className='igamez-button' color="warning"  type="submit" style={{width:'100%', fontWeight:'bold'}}>Make withdraw</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                ) : <div>
                    {
                        this.props.Comment && this.props.Comment.length ? <div className="height-100">
                            <Col md="12" className="d-flex text-center mt-1">
                                <div className="font-weight-bold w-100"  >
                                    <span style={{fontSize:"2rem"}}>{this.props.Comment}</span> 
                                </div>
                            </Col>
                        </div> : <div>
                            Please wait 
                        </div>
                    }
                </div>
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    PaymentMenuData:state.paymentGateWay.PaymentMenuData,
    balance : state.balance.value,
    Comment : state.paymentGateWay.Comment
})

const mapDispatchToProps = { PaymentMenuload, Cash_payout}

export default connect(mapStateToProps, mapDispatchToProps)(DepositMenus)
