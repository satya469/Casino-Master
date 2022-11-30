import React, { useContext, useEffect, useState } from "react"
import { Button, Card, CardBody, Form, Row, Col, FormGroup, Input } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import Animate from 'animate.css-react'
import { X } from "react-feather"
import { setloginpage } from "../../redux/actions/auth/loginActions"
import { checkingTelegram, setSession, validateEmail } from "../../redux/actions/auth/index"
import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Check } from "react-feather"
import InputPasswordToggle from '../../components/@vuexy/input-password-toggle'
import * as Apiserver from "../../redux/actions/auth/apiservice"
import { LoadingContext } from "../../utility/loading"
import { toast } from "react-toastify"
import { UserContext } from "../../utility/UserContext"
import { startSportsSocket } from "../../redux/actions/sports"

const Login = () => {
    const { login } = useSelector(state => state.auth.login.setloginpage)
    const { showLoading, hideLoading } = useContext(LoadingContext)
    const { setUserDetails, uniqueid } = useContext(UserContext)
    const { signupbuttons, forgotpassword } = useSelector(state => state.auth.register)
    const [login_card, setlogin_card] = useState(false),
        [username, setusername] = useState(""),
        [password, setpassword] = useState(""),
        [remember, setremember] = useState(false)

    const dispatch = useDispatch()
    const load = () => {
        if (localStorage.getItem('remember')) {
            let users = localStorage.getItem("remember")
            users = JSON.parse(users)
            if (users) {
                setusername(users.username)
                setpassword(users.password)
            }
        }
    }
    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        if (login === true) {
            setlogin_card(true)
            // this.setState({login_card:true})
        } else {
            setlogin_card(false)
            // this.setState({login_card:false})
        }
    }, [login])


    const toggle_login = () => {
        dispatch(setloginpage({ login: true, register: false, forgot: false }))
    }

    const cancle = () => {
        dispatch(setloginpage({ login: false, register: false, forgot: false }))
        // this.props.setloginpage({login : false, register : false, forgot : false})
    }

    const forgot = () => {
        dispatch(setloginpage({ login: false, register: false, forgot: true }))
        // this.props.setloginpage({login : false, register : false, forgot : true})
    }

    const joinus = () => {
        dispatch(setloginpage({ login: false, register: true, forgot: false }))
        // this.props.setloginpage({login : false, register : true, forgot : false})
    }

    const handleLogin = async e => {
        e.preventDefault()
        if (remember) {
            const remember = {
                password: password,
                username: username
            }
            localStorage.setItem("remember", JSON.stringify(remember))
        }
        const mailcheck = validateEmail(username)
        if (mailcheck) {
            showLoading()
            let row = {
                username, password
            }
            let rdata = await Apiserver.LoginByEmail(row)
            if (rdata.status) {
                const token = rdata.data
                const d = rdata.user
                setSession(token)
                const user = {
                    email: d.email,
                    mobilenumber: d.mobilenumber,
                    avatar: d.avatar,
                    username: d.username,
                    firstname: d.firstname,
                    lastname: d.lastname,
                    _id: d._id,
                    signup_device: d.signup_device,
                    fakeid: d.fakeid,
                    balance: d.playerid.balance,
                    bonusbalance: d.playerid.bonusbalance,
                }
                // window.location.reload()
                const telegram = checkingTelegram()
                dispatch(Apiserver.SocketConnect(uniqueid, token, user, telegram))
                dispatch(startSportsSocket(user))
                setUserDetails({ user, telegram })
                const rd = await Apiserver.GetUseProfileLod()
                if (rd.status) {
                    dispatch(Apiserver.SetUserProfileSetting(rd))
                }
            } else {
                toast.error(rdata.error)
            }
            // props.loginWithJWT(this.state)
            hideLoading()
        }
    }

    const handleRemember = e => {
        setremember(e.target.checked)
        // this.setState({ remember: e.target.checked })
    }

    return (
        <div>
            <Button.Ripple className='btn-login header-btn-login' color="success" onClick={() => toggle_login()}>LOGIN</Button.Ripple>
            {login_card === true ?
                <Animate appear="fadeIn" durationAppear={500} leave="fadeOut" durationLeave={500} component="div">
                    <Form action="/" onSubmit={handleLogin} className="auth-form">
                        <Card>
                            <CardBody className="login-body pb-0 mt-2">
                                <Row>
                                    <Col md="12">
                                        <X size="20" className="font-weight-bold float-right cursor-pointer" onClick={() => cancle()} />
                                    </Col>
                                    <Col md="12" className="font-weight-bold">
                                        Cool just login
                                    </Col>
                                    <Col md="12" className='pt-1'>
                                        <FormGroup className='m-0'>
                                            <Input type="text" name="username" id="EmailVertical" placeholder="Email / Username"
                                                value={username} onChange={e => setusername(e.target.value)} required />
                                        </FormGroup>
                                    </Col>
                                    <Col md="12" className='pt-2'>
                                        <FormGroup className='m-0'>
                                            <InputPasswordToggle value={password} onChange={e => setpassword(e.target.value)} />
                                        </FormGroup>
                                    </Col>
                                    <Col md="12" className='pt-2'>
                                        <Checkbox color="primary" icon={<Check className="vx-icon" size={16} />}
                                            label="Remember me" defaultChecked={false} onChange={handleRemember}
                                            className="float-left w-100 mb-1" />
                                    </Col>
                                    <Col md="6" sm="12" className="pt-1">
                                        {
                                            forgotpassword ? <span color="success" className='cursor-pointer float-left text-decoration-underline' onClick={() => forgot()}>
                                                Forgot Password?
                                            </span> : null
                                        }
                                    </Col>
                                    {
                                        signupbuttons ? <Col md="6" sm="12" className="pt-1">
                                            <span color="danger" className='cursor-pointer float-right text-decoration-underline' onClick={() => joinus()}>
                                                Join Us
                                            </span>
                                        </Col> : null
                                    }
                                    <Col md="12" className="mt-2 pb-1">
                                        <Button className='register-submit btn-warning igamez-button w-100' type="submit">SIGNIN</Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Form>
                </Animate>
                : null}
        </div>
    )

}
export default Login

