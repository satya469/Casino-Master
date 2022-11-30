import React, { Component } from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Row } from 'reactstrap'
import { Root } from '../../authServices/rootconfig'

export default class Middlemenu extends Component {
    render() {
        return (
            <div  className="d-flex align-items-center justify-content-center w-100 maxwith p-0 m-0">
                <Row className="m-0 middlemenu justify-content-between">
                    {this.props.middlemenu.map((item, i) => (
                        <Fragment key={i}>
                            <Link to={item.navLink} className="" style={{margin : "0 0.5rem 0 0.5rem "}}>
                                <div className="item">
                                    <div className="cursor-pointer productsliderimg">
                                        <img src={Root.imageurl + item.image} alt={Root.imageurl + item.image} />
                                        <div className="position-absolute w-100 color-white title text-uppercase">
                                            {
                                                item.title
                                            }
                                        </div>
                                        <div className='backshadow'>

                                        </div>
                                        <div className="text-uppercase playernow">
                                            <div className="button">
                                                <span className="show">
                                                    Play Now
                                                </span>
                                            </div>
                                        </div>
                                </div>
                                </div>
                            </Link>
                        </Fragment>
                    ))}
                </Row>
        </div>
    )
    }
}
