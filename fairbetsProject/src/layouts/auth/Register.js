import React from "react"
import { Button, Card, CardBody, CardHeader, Form, Row, Col, FormGroup, Input, CardFooter, CardTitle } from "reactstrap"
import { connect } from "react-redux"
import Animate from 'animate.css-react'
import captchapng from 'captchapng'
import { toast } from "react-toastify"
import { User, Mail, Lock, X } from "react-feather"
import { validateUsername } from "../../redux/actions/auth/index"
import { setloginpage, registeraction } from '../../redux/actions/auth/loginActions'
import { validateEmailType } from "../../redux/actions/auth"
import InputPasswordToggle from '../../components/@vuexy/input-password-toggle'

class Register extends React.Component {
    state = {
        captchapng:null,
        captchanumber:null,
        register_card : false,
        password : "",
        email : "",
        firstname : "",
        lastname : "",
        username : "",
        mobilenumber : "",
        repassword : "",
        digit_code : ""
    }

    componentDidMount() {
        this.captchaImg()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.loginpage !== this.props.loginpage) {
            if (this.props.loginpage.register === true) {
                this.setState({register_card : true})
                this.captchaImg()
            } else {
                this.setState({register_card : false})
            }
        }
    }

    toggle_register = () => {
        this.props.setloginpage({register : true, login : false})
    }

    cancle = () => {
        this.props.setloginpage({login : false, register : false})
    }

    login = () => {
        this.props.setloginpage({login : true, register : false, forgot : false})
    }

    handleregister = e => {
        e.preventDefault()
        if (this.state.repassword !== this.state.password) {
            toast.error("please input correct password")
            
        } else if (parseInt(this.state.digit_code) !== this.state.captchanumber) {
            toast.error("please input correct digit code")
            
        } else {
            const usernamecheck = validateUsername(this.state.username)
            if (usernamecheck) {
                const eamilcheck = validateEmailType(this.state.email)
                if (eamilcheck) {
                    if (this.state.mobilenumber.length === 10) {
                        const row = {
                            password : this.state.password,
                            email : this.state.email,
                            firstname : this.state.firstname,
                            lastname : this.state.lastname,
                            username : this.state.username,
                            mobilenumber : this.state.mobilenumber
                        }
                        this.props.registeraction(row)
                    } else {
                        toast.error("It should be 10 numbers for mobile number")
                    }
                } else {
                    toast.error("Please enter correctly email.")
                }
            }
        }
    }
   
    
    captchaImg() {
        const captchanumber = parseInt(Math.random() * 9000 + 1000)
        const p = new captchapng(150, 38, captchanumber)
        p.color(115, 95, 197, 100)
        p.color(30, 104, 21, 255)
        let img = p.getBase64()
        const imgbase64 = new Buffer(img, 'base64')
        img = `data:image/jpeg;base64,${new Buffer(imgbase64).toString('base64')}`   
        this.setState({captchapng:img, captchanumber})
    }

    render() {
        const { signupbuttons } = this.props.FirstPage
        return (
            <div className='imtem-center'>
                {
                    signupbuttons === true ? <Button.Ripple color="danger" className="btn-register header-register-btn" onClick={() => this.toggle_register()} >
                        JOIN US 
                    </Button.Ripple> : null
                }
                {
                    this.state.register_card === true ? 
                    <Animate appear="fadeIn" durationAppear={500} leave="fadeOut" durationLeave={500}>
                        <Form action="/" onSubmit={this.handleregister} className="auth-form">
                            <Card className='register'>
                                <CardHeader className="d-flex w-100 pb-3" >
                                    <CardTitle className="d-block w-100 mt-1">
                                        <span>&nbsp;</span>
                                        CREATE FREE ACCOUNT
                                        <X size="30" className="font-weight-bold float-right" style={{cursor : "pointer"}} onClick={() => this.cancle()}/>
                                    </CardTitle>
                                </CardHeader>
                                <CardBody className="register-body pt-1 pb-0" >
                                    <Row className="pr-2 pl-2">
                                        <Col xs="12" sm="6" className="pt-1 pl-0" >
                                            <FormGroup className="has-icon-left position-relative">
                                                <Input
                                                    type="text" name="name" placeholder="user name" required minLength={5} 
                                                    maxLength={11} value = {this.state.username} onChange={e => this.setState({username : e.target.value})}
                                                />
                                                <div className="form-control-position">
                                                    <User size={15} />
                                                </div>
                                            </FormGroup>
                                        </Col>
    
                                        <Col  xs="12" sm="6"  className="pt-1 pb-1 pl-0" >
                                            <FormGroup className="has-icon-left position-relative">
                                                <Input type="email" name="Email" required value={this.state.email}
                                                    onChange={e => this.setState({email : e.target.value})} id="EmailVerticalIcons"
                                                    placeholder="Email" />
                                                <div className="form-control-position">
                                                    <Mail size={15} />
                                                </div>
                                            </FormGroup>
                                        </Col>

                                        <Col xs="12" sm="6" className="pt-1 pb-1 pl-0" >
                                            <FormGroup className="has-icon-left position-relative"> 
                                                <InputPasswordToggle value={this.state.password} onChange={e => this.setState({password : e.target.value})} />
                                                <div className="form-control-position">
                                                    <Lock size={15} />
                                                </div>
                                            </FormGroup>
                                        </Col>

                                        <Col xs="12" sm="6" className="pt-1 pb-1 pl-0" >
                                            <FormGroup className="has-icon-left position-relative">
                                                <InputPasswordToggle value={this.state.repassword} onChange={e => this.setState({repassword : e.target.value})} />
                                                <div className="form-control-position">
                                                    <Lock size={15} />
                                                </div>
                                            </FormGroup>
                                        </Col>


                                        <Col xs="6" sm="3" className="pt-1 pb-1 pl-0" >
                                            <FormGroup className="position-relative"> 
                                                <Input className='pr-1' type="text" name="name" placeholder="First Name"
                                                    required value = {this.state.firstname}
                                                    onChange={e => this.setState({firstname : e.target.value})}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col xs="6" sm="3" className="pt-1 pb-1 pl-0" >
                                            <FormGroup className="position-relative">
                                                <Input className='pr-1' type="text" name="name" required
                                                  value = {this.state.lastname} onChange={e => this.setState({lastname : e.target.value})}
                                                    placeholder="Last Name"
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col xs="12" sm="6" className="pt-1 pb-1 pl-0" >
                                            <FormGroup className="has-icon-left position-relative">
                                                <Input type="number" name="mobile" id="IconsMobile" placeholder="Mobile"
                                                    onChange={e => this.setState({mobilenumber : e.target.value})}
                                                    value = {this.state.mobilenumber} maxLength={9} minLength={8} required 
                                                />
                                                <div className="form-control-position">
                                                    <span style={{color:'white'}}>+91</span>
                                                </div>
                                            </FormGroup>
                                        </Col>

                                        <Col xs="12" sm="6" className="pt-1 pb-1 pl-0" >
                                            <FormGroup className="form-label-group">
                                                <Input type="number" name="digit_code" id="digit_code" placeholder="Enter 4 digit code"
                                                    required maxLength={4} value = {this.state.digit_code}
                                                    onChange={e => this.setState({digit_code : e.target.value})}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col  xs="12" sm="6" className="pt-1 pb-1 pl-0" >
                                            <img className='captcha-png' src={this.state.captchapng} alt=""/>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter className='w-100'>
                                    <Button color="success" className=' register-submit igamez-button' type="submit">REGISTER</Button>
                                    <p className="mt-1">
                                        Already have an account?
                                        <span onClick={() => this.login()} className="font-weight-bold" style={{cursor:"pointer"}}> Sign In</span>
                                    </p>
                                </CardFooter>
                            </Card>
                        </Form>
                    </Animate>
                    : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loginpage : state.auth.login.setloginpage,
    firstpagesettinglogoimg : state.auth.login.firstpagesettinglogoimg,
    FirstPage : state.auth.register

})

const mapDispatchToProps = {
    registeraction, setloginpage
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
