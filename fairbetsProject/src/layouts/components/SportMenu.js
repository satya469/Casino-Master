import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { history } from "../../history"
import { connect } from 'react-redux'
import classNames from 'classnames'
import { UserContext } from '../../utility/UserContext'
import Media from 'react-media'
import { GrTransaction } from "react-icons/gr";

class Menu extends Component {
    static contextType = UserContext

    constructor(props) {
        super(props)

        this.state = {
            isOpen: '',
            navigationConfig: {},
            firstmenu: [],
            logoimg: ""
        }
    }

    onOpen = (e, navLink) => {
        e.preventDefault()
        history.push(navLink)
        this.setState({ isOpen: '' })
    }

    componentDidMount() {
        let rows = [
            {
                navLink: "/",
                title: "Home",
                icon: "faHome"
            },
            {
                navLink: "/betexchmain?eventname=Inplay",
                title: "Inplay",
                icon: "faFutbol"
            },
            {
                navLink: "/",
                title: "My Market",
                icon: "faMarker"
            }
        ]

        let sportsRows = [
            {
                navLink: "/",
                title: "Home",
                icon: "faHome"
            },
            {
                navLink: "/Inplay",
                title: "Inplay",
                icon: "faFutbol"
            },
            {
                navLink: "/",
                title: "Favourites",
                icon: "faStar"
            },
            {
                navLink: "/",
                title: "Exposure",
                icon: <GrTransaction stroke="white" fill="white" color="white"></GrTransaction>,
                isGr: true
            }
        ]
        if (this.props.isSports) {
            this.setState({ firstmenu: sportsRows })
        } else {
            this.setState({ firstmenu: rows })
        }

    }

    render() {
        const { firstmenu } = this.state
        const { telegram } = this.context

        return (
            <>
                <Media queries={{ small: "(max-width: 768px)", large: "(min-width: 769px)" }}>
                    {matches => (
                        <React.Fragment>
                            {matches.small &&
                                <>
                                    {
                                        !telegram ?
                                            <React.Fragment>
                                                <div className={
                                                    classNames("header-nav-bar-menu",
                                                        {
                                                            "d-none":
                                                                this.props.navbarType === "hidden" && !this.props.horizontal,
                                                            "navbar-static-top":
                                                                this.props.navbarType === "static" && !this.props.horizontal,
                                                            "fixed-top":
                                                                this.props.navbarType === "sticky" || this.props.horizontal
                                                        }
                                                    )
                                                } expand="md" id='header-nav-bar-menu'>
                                                    <div className="header-nav-bar-item-group maxwith">
                                                        {
                                                            firstmenu.length ? firstmenu.map((item, i) => {
                                                                return (
                                                                    <Link to={item.navLink} key={i}>
                                                                        <div className={`header-nav-bar-item${history.location.pathname === item.navLink ? ' header-nav-bar-item-active' : ''}`} onClick={() => this.setState({ activeIndex: item.navLink })}>
                                                                            {
                                                                                item.isGr ? 
                                                                                item.icon
                                                                                : 
                                                                                <FontAwesomeIcon color="#8f99a3" icon={Icons[item.icon]} />
                                                                            }
                                                                            <span>{item.title}</span>
                                                                        </div>
                                                                    </Link>
                                                                )
                                                            }) : null
                                                        }
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                            : null
                                    }
                                </>
                            }
                            {
                                matches.large &&
                                <>
                                </>
                            }
                        </React.Fragment>
                    )}
                </Media>

            </>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
