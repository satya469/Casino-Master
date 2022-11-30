import React, { useContext, useEffect, useState } from "react"
import { Button, FormGroup, Row, Col, Input, Label, CardBody, CardHeader, CardFooter, CardTitle, CustomInput } from "reactstrap"
import { Againregister, profilesave } from "../../../redux/actions/auth/ProfileActions"
import { toast } from "react-toastify"
import defaultavatar from "../../../assets/avatar.png"
import { Root } from "../../../authServices/rootconfig"
import { UserContext } from '../../../utility/UserContext'
import { LoadingContext } from '../../../utility/loading'

const EditProfile = () => {

    const { user, setUserDetails } = useContext(UserContext)
    const { showLoading, hideLoading } = useContext(LoadingContext)
    const [username, setusername] = useState(""),
    [imageSrc, setimageSrc] = useState(""),
    [mobilenumber, setmobilenumber] = useState(""),
    [firstname, setfirstname] = useState(""),
    [lastname, setlastname] = useState(""),
    [email, setemail] = useState(""),
    [avatar, setavatar] = useState(""),
    [file, setfile] = useState("")

    const load = (user) => {
        setemail(user.email) 
        setusername(user.username) 
        setlastname(user.lastname) 
        setfirstname(user.firstname) 
        setavatar(user.avatar) 
        setmobilenumber(user.mobilenumber) 
    }

    const SaveRegister = async () => {
        showLoading()
        if (!file) {
            let row = {
                email,mobilenumber,username,firstname,lastname
            }
            let d = await Againregister(row)
            if (d.status) {
                toast.success("successfully changed")
                load(d.data)
                setUserDetails({ user:d.data})
            } else {
                toast.error("error")
            }
        } else {
            const fpdata = new FormData()
            fpdata.append('fpImgFile', file)
            fpdata.append('mobilenumber', mobilenumber)
            fpdata.append('email', email)
            fpdata.append('firstname', firstname)
            fpdata.append('lastname', lastname)
            let d = await profilesave(fpdata)
            if (d.status) {
                toast.success("successfully changed")
                load(d.data)
                setUserDetails({ user:d.data})
            } else {
                toast.error("error")
            }
        }
        hideLoading()
    }

    const readFile = (file) => {
        return new Promise(resolve => {
            const reader = new FileReader()
            reader.addEventListener('load', () => resolve(reader.result), false)
            reader.readAsDataURL(file)
        })
    }

    const filechange = async (e) => {
        
        if (e.target.files && e.target.files.length) {
            const f = e.target.files[0]
            if (f.size < 512000) {
                const imageDataUrl = await readFile(f)
                setimageSrc(imageDataUrl)
                setfile(f)
            } else {
                toast.warn("The file size is too large.")
            }
        }
    }

    
    useEffect(() => {
        if (user) {
            load(user)
        }
    }, [user])

    return (
        <div className='p-1' style={{ margin: 'auto' }}>
            <CardHeader className="d-block w-100 text-center" >
                <CardTitle className="d-block w-100" style={{ color: '#fff' }}>ACCOUNT INFORMATION</CardTitle>
            </CardHeader>
            <CardBody className="register-body"  >
                <Row>
                    <Col lg='4' sm='12' xs='12'>
                        <Row>
                            <Col xs="12" sm="12" className="p-1" style={{ display: 'flex' }}>
                                {
                                    imageSrc ?
                                        <img src={imageSrc} alt="" style={{ margin: 'auto', width: "200px", height: "200px", borderRadius: '50%' }} /> 
                                    : avatar ?
                                        <img alt="" src={Root.imageurl + avatar} style={{ margin: 'auto', width: "200px", borderRadius: '50%', height: "200px" }} />
                                    :
                                    <img src={defaultavatar} alt="" style={{ margin: 'auto', width: "200px", borderRadius: '50%' }} />
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" sm="12" className="p-1" style={{ display: 'flex' }}>
                                <CustomInput bsSize="sm" label="File select" onChange={(e) => { filechange(e) }} accept="image/png, image/jpeg" id={"livecasinoimg"} type="file" />
                            </Col>
                        </Row>
                    </Col>
                    <Col lg='8' sm='12' xs='12' className='pt-2'>
                        <Row>
                            <Col xs="12" sm="12" md="12" className="p-1" >
                                <FormGroup className="form-label-group">
                                    <Input type="text" name="user_name" id="username" placeholder="User Name"
                                        required
                                        disabled={true}
                                        value={username}
                                    />
                                    <Label>username</Label>
                                </FormGroup>
                            </Col>
                            <Col xs="12" sm="12" md="6" className="p-1" >
                                <FormGroup className="form-label-group">
                                    <Input type="text" name="firstname" id="firstname" placeholder="First Name"
                                        required
                                        value={firstname}
                                        onChange={e => setfirstname(e.target.value)}
                                    />
                                    <Label>first name</Label>
                                </FormGroup>
                            </Col>
                            <Col xs="12" sm="12" md="6" className="p-1" >
                                <FormGroup className="form-label-group">
                                    <Input type="text" name="lastname" id="lastname" placeholder="Last Name"
                                        required
                                        value={lastname}
                                        onChange={e => setlastname(e.target.value)}
                                    />
                                    <Label>last name</Label>
                                </FormGroup>
                            </Col>
                            <Col xs="12" sm="12" md="12" className="p-1" >
                                <FormGroup className="position-relative form-label-group has-icon-left input-divider-left">
                                    <Input
                                        type="number"
                                        placeholder="Mobile Number"
                                        className="form-control"
                                        name="mobilenumber"
                                        id="mobilenumber"
                                        onChange={e => setmobilenumber(e.target.value)}
                                        value={mobilenumber}
                                        maxLength={10}
                                        required
                                    />
                                    <Label>mobile number</Label>
                                    <div className="form-control-position">
                                        <span style={{ color: 'white' }}>+91</span>
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
            <CardFooter style={{ textAlign: 'right' }} className='pt-1'>
                <Button className='igamez-button' color="primary " type="submit" onClick={() => SaveRegister()}>Save</Button>
            </CardFooter>
        </div>
    )
}

export default EditProfile
