import React, { Component } from 'react'
import { DateRangePicker  } from 'react-date-range'
import {Button, Form, Modal, ModalHeader, ModalBody, ModalFooter, Label} from "reactstrap"

export class datepicker extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            datemodal : false,
            selectionRange : {
                    startDate:new Date(),
                    endDate:new Date(),
                    key: 'selection'
                }        
            }
    }

    datetoggleModal = () => {
        this.setState(prevState => ({
            datemodal: !prevState.datemodal
        }))    
    }

    DateChange_action = (e) => {
        e.preventDefault()
        this.datetoggleModal()
        const dates =  this.state.selectionRange
        const start  = dates.startDate
        const end = new Date(new Date(dates.endDate).valueOf() + 24 * 60 * 60 * 1000)
        this.props.onChange({start, end})
    }

    render() {
        const datestring = `${(this.state.selectionRange.startDate).toDateString()  } ~ ${  (this.state.selectionRange.endDate).toDateString()}`
        return (
            <div className="w-100">
                <Label className="font-weight-bold w-100" style={{fontSize:"1.5rem"}}  onClick={() => this.datetoggleModal()}>
                    <div className="color-white reponsiveetext">
                        {datestring}
                    </div>
                </Label>
                <Modal isOpen={this.state.datemodal} toggle={this.datetoggleModal} className="modal-dialog-centered igamezmodal-lg" >
                    <Form className="" action="#" onSubmit={(e) => this.DateChange_action(e)}>
                        <ModalHeader toggle={this.datetoggleModal} className="bg-primary">
                            Date Range
                        </ModalHeader>
                        <ModalBody className="modal-dialog-centered justify-content-center d-flex m-0 p-0 mt-1">
                            <DateRangePicker ranges={[this.state.selectionRange]}   onChange={(e) => this.setState({selectionRange : e.selection})}
                            showSelectionPreview={true}       moveRangeOnFirstSelection={false} months={1} />
                        </ModalBody>
                        <ModalFooter className="justify-content-center align-items-center">
                            <Button color="primary" type="submit" className='igamez-button'>
                                Accept
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        )
    }
}


export default (datepicker)
