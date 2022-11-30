 /*eslint-disable */
// import Feedback from 'feedback-screenshot';
import React, { useContext, useEffect, useState } from 'react';
import { Fragment } from 'react';
import { Col, Row, Input, Button } from 'reactstrap';
import { X } from "react-feather"
import * as ApiService from "../../redux/actions/auth/apiservice"
import Select from "react-select"
import { toast } from 'react-toastify';
import {LoadingContext} from "../../utility/loading"

const Index = () => {

    const [detail, setdetail] = useState(""),
        [feedbackpoint, setfeedbackpoint] = useState(""),
        [flag, setflag] = useState(false),
        [feedoptions, setfeedoptions] = useState([]),
        [feed, setfeed] = useState("")
    const {showLoading, hideLoading} = useContext(LoadingContext)        

    // const openscreenshot = () => {
    //     const feedback = new Feedback({
    //         //default:#347EF8(blue)
    //         borderColor: '#000',

    //         //zIndex of screen shot content
    //         //default:999
    //         zIndex: 1001,

    //         //content will append to
    //         //default:document.body
    //         parent: document.querySelector('#content'),

    //         //html2canvas options
    //         //default:{}
    //         html2canvas: {
    //             logging: false,
    //             useCROS: true
    //         }
    //     })

    //     //start screen shot
    //     feedback.open();

    //     //change rect background to black, cover some private data
    //     // feedback.setBlackMode(true);

    //     //close screen shot and wait for canvas
    //     // feedback.close().then(canvas=>{
    //     // })

    //     //cancel screen shot, will return null
    //     // feedback.close(true)

    // }

    const load = async () => {
        let r = await ApiService.feedoptions()
        if (r.status) {
            setfeedoptions(r.data)
        }
    }

    const send = async () => {
        if (feed === "" ) {
            toast.warn("Please select feedoption")
            return
        }
        const row = {
            feed,
            detail,
            feedbackpoint
        }
        showLoading()
        let r = await ApiService.feedSend(row)
        hideLoading()
        if (r) {
            toast.success("success")
            setflag(false)
        } else {
            setflag(false)
        }
    }

    useEffect(() => {
        load()
    }, [])

    return <div id="igamezfeedbackwidget">
        <Row>
            {/* <Col md="12">
                {
                    !flag ?
                        <Button color="primary" className=" igamez-button feedbacktext p-0" onClick={() => setflag(true)}   >
                            <p>
                                😀 FeedBack
                    </p>
                        </Button>
                        :
                        <div className="feedbackform">
                            <Button color="primary" className=" igamez-button p-0 exiticon" onClick={() => setflag(false)}>
                                <X size="20" />
                            </Button>
                            <Col md="12" className="p-2 d-flex align-items-center justify-content-center">
                                <span>
                                    How would you rate your experience?
                    </span>
                            </Col>
                            <Col md="12">

                                <Row className="m-0 w-100">
                                    <div className={"emotinode " + (feedbackpoint === 1 ? "emotinodeactive" : "")} onClick={() => setfeedbackpoint(1)}>
                                        😭
                            <span >
                                            Hate
                            </span>
                                    </div>
                                    <div className={"emotinode " + (feedbackpoint === 2 ? "emotinodeactive" : "")} onClick={() => setfeedbackpoint(2)}>
                                        😫
                            <span>
                                            Dislike
                            </span>
                                    </div>
                                    <div className={"emotinode " + (feedbackpoint === 3 ? "emotinodeactive" : "")} onClick={() => setfeedbackpoint(3)}>
                                        😕
                            <span>
                                            Neutral
                            </span>
                                    </div>
                                    <div className={"emotinode " + (feedbackpoint === 4 ? "emotinodeactive" : "")} onClick={() => setfeedbackpoint(4)}>
                                        😀
                            <span>
                                            Like
                            </span>
                                    </div>
                                    <div className={"emotinode " + (feedbackpoint === 5 ? "emotinodeactive" : "")} onClick={() => setfeedbackpoint(5)}>
                                        😍
                            <span>
                                            Love
                            </span>
                                    </div>
                                </Row>
                            </Col>
                            {
                                feedbackpoint !== "" ?
                                    <Fragment>
                                        <Col md="12">
                                    <Input type="text" name="email" placeholder="email"
                                        value={email} onChange={e => setemail(e.target.value)} required />
                                </Col>

                                        <Col md="12">
                                            <Select className="React"
                                                classNamePrefix="select"
                                                name="depositBankCode"
                                                options={feedoptions} 
                                                value={feedoptions.find(obj => obj.value === feed)}
                                                onChange={e => setfeed(e.value)} />
                                        </Col>

                                        <Col md="12">
                                            <Input type="textarea" name="textbody" placeholder="Please enter text" className="textarea"
                                                value={detail} onChange={e => setdetail(e.target.value)} required />
                                        </Col>
                                        <Col md="12" className="mt-1">
                                            <span className="mouseselecter" onClick={capture}>
                                                <MousePointer />
                                            </span>
                                        </Col>
                                        <Col md="12" className="d-flex mt-1">
                                            <Button className="igamez-button" onClick={() => send()}>
                                                send
                                            </Button>
                                        </Col>
                                    </Fragment> : null
                            }

                        </div>
                }
            </Col> */}
        </Row>
    </div>

}

export default Index
