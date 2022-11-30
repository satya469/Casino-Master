import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col } from 'reactstrap'
import { Root } from '../../authServices/rootconfig'
import {RefreshResult, firstpageBazars} from "../../redux/actions/satta/matka"

export class sattaresult extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            bazars : []    
        }
    }

    async componentDidMount(){  
        let dd = await firstpageBazars()
        if (dd) {
            this.setState({bazars : dd})
        } else {

        }
    }
    
    refresh = async (item,i) => {
        let up = await RefreshResult(item)
        if (up) {
            let row = item
            row = Object.assign(row,up)
            let items = this.state.bazars
            items[i] = row
            this.setState({bazars : items})
        }

    }

    render() {
    
        let {bazars} = this.state

        return (
            <div className="w-100 firstpagesatta">
                <Col md="12" className="text">
                    <img src={ `${Root.imageurl  }6c7c57235bc3eb59dbb43b4e10834b39.png`} alt="satta" />
                    Satta Live Result
                </Col>
                {
                    bazars.map((item,i) => (
                        <Col md="12" className="text pt-1 text-center d-block" key={i}>
                            {
                                item.bazaarname
                            }
                            <div className="result color-white text-center">
                                {
                                    item.result ? item.result : "- - -"
                                }
                            </div>
                            <div className="text-center">
                                <span className="refresh" onClick={() => this.refresh(item,i)}>
                                    Refresh
                                </span>
                            </div>
                        </Col>
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(sattaresult)
