import React, { Component } from 'react'
import { connect } from 'react-redux'
import {liveChatRender} from "../../redux/actions/auth"

class LiveChat extends Component {
    componentDidMount() {
        liveChatRender()
    }
    render() {
        return (
            <React.Fragment>
                 <div className='live-chat'>
                     <p>Welcome to Customer Support</p>
                 </div>

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveChat)
