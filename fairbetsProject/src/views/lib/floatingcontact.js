

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Headphones, MessageCircle, Navigation} from "react-feather"
import {Link } from "react-router-dom"


export class floatingcontact extends Component {


    componentDidMount() {
      
    }

    render() {
        return (
            <div className="flating-contact">
                <div className="presentation">
                </div>
                    <nav className="float-action-button">
               
                        <Link to="/"  className="buttons d-flex align-items-center justify-content-center" title="Twitter" >
                            <Navigation  size="25" className="font-weight-bold"/>                        
                        </Link>

                        <Link to="/" className="buttons d-flex align-items-center justify-content-center" title="Facebook" >
                            <MessageCircle size="25" className="font-weight-bold" />
                        </Link>

                        <Link to="/" className="buttons main-button d-flex align-items-center justify-content-center" title="Share" >
                            <Headphones size="25" className="font-weight-bold" />
                        </Link>
                    </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(floatingcontact)
