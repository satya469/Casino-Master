import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { X } from 'react-feather'
import { history } from "../../history"
import { Root } from '../../authServices/rootconfig'
import { connect } from 'react-redux'
import { Icon } from '@iconify/react'
import roosterIcon from '@iconify-icons/emojione-v1/rooster'
import horseIcon from '@iconify-icons/fa-solid/horse'
import classNames from 'classnames'
import { UserContext } from '../../utility/UserContext'

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
        const firstmenu = this.props.navigationConfig.firstmenu
        if (firstmenu && firstmenu.length) {
            this.setState({ firstmenu: firstmenu })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.navigationConfig !== prevState.navigationConfig) {
            const firstmenu = this.props.navigationConfig.firstmenu
            if (firstmenu && firstmenu.length) {
                this.setState({ firstmenu: firstmenu })
            }
            this.setState({ navigationConfig: this.props.navigationConfig })
        }
    }

    render() {
        const { firstmenu } = this.state
        const { telegram, settings } = this.context
        const { logoimg } = settings

        return (
            <>
                {
                    !telegram ?
                        <React.Fragment>
                            <div className={`left-nav-container-m ${this.state.isOpen}`}>
                                <X className="closed-nav-icon" onClick={() => this.setState({ isOpen: '' })} />
                                <span className="right-trans-box-m"></span>
                                <div className="left-menu-full-box-m">
                                    <div className='web-site-logo'>
                                        {logoimg ? <img alt='logo' src={Root.imageurl + logoimg} /> : <div className='web-site-logo'></div>}
                                    </div>
                                    <div className="left-navigate-list-view-m disable-arrows">
                                        <div className="provider-left-menu">
                                            {firstmenu ? firstmenu.map((item, i) => (
                                                <Link to={item.navLink} key={i} onClick={(e) => this.onOpen(e, item.navLink)}>
                                                    <div className={`menu-provider-view${history.location.pathname === item.navLink ? " menu-provider-view-active" : ""}`}>
                                                        {
                                                            Root.id_preffix === "fair" ?
                                                                <React.Fragment>
                                                                    <img alt={i} style={{ width: "30px", height: "30px" }} src={Root.imageurl + (item.image)} />
                                                                </React.Fragment>
                                                                :
                                                                <React.Fragment>
                                                                </React.Fragment>
                                                        }
                                                        <p>{item.title}</p>
                                                        <span className="arrow-view-nav"></span>
                                                    </div>
                                                </Link>
                                            )) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>

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
                                            if (firstmenu.length > 4 && this.props.width < 1019) {
                                                if (i < 4) {
                                                    return (
                                                        <Link to={item.navLink} key={i}>
                                                            <div className={`header-nav-bar-item${history.location.pathname === item.navLink ? ' header-nav-bar-item-active' : ''}`} onClick={() => this.setState({ activeIndex: item.navLink })}>
                                                                {
                                                                    Root.id_preffix === "fair" ? <React.Fragment>
                                                                        <div className="iconimg">
                                                                            <img alt={i} style={{ width: "30px", height: "30px" }} src={Root.imageurl + (item.image)} />
                                                                            <span>{item.mobiletitle}</span>
                                                                        </div>
                                                                    </React.Fragment> : <React.Fragment>
                                                                        {
                                                                            item.icon === 'cockIcon' ? <Icon icon={roosterIcon} style={{ fontSize: "25px" }} /> : item.icon === "faHourglass" ? <Icon icon={horseIcon} /> : <FontAwesomeIcon color="#8f99a3" icon={Icons[item.icon]} />
                                                                        }
                                                                        <span>{item.mobiletitle}</span>
                                                                    </React.Fragment>
                                                                }
                                                            </div>
                                                        </Link>
                                                    )
                                                } else if (i === 4) {
                                                    return (
                                                        <Link to={'#'} key={i}>
                                                            <div className={"header-nav-bar-item"} onClick={() => this.setState({ isOpen: 'open' })}>
                                                                <FontAwesomeIcon color="#8f99a3" icon={Icons['faBars']} />
                                                                <span>Menu</span>
                                                            </div>
                                                        </Link>
                                                    )
                                                } else {
                                                    return <div key={i} />
                                                }
                                            } else {
                                                return (
                                                    <Link to={item.navLink} key={i}>
                                                        <div className={`header-nav-bar-item${history.location.pathname === item.navLink ? ' header-nav-bar-item-active' : ''}`} onClick={() => this.setState({ activeIndex: item.navLink })}>
                                                            {
                                                                Root.id_preffix === "fair" ?
                                                                    <React.Fragment>
                                                                        <img alt={i} src={Root.imageurl + (item.image)} style={{ width: "30px", height: "30px" }} />
                                                                    </React.Fragment>
                                                                    :
                                                                    <React.Fragment>
                                                                        {
                                                                            item.icon === 'cockIcon' ? <Icon icon={roosterIcon} style={{ fontSize: "25px" }} /> :
                                                                                item.icon === "faHourglass" ? <Icon icon={horseIcon} /> :
                                                                                    <FontAwesomeIcon color="#8f99a3" icon={Icons[item.icon]} />
                                                                        }
                                                                    </React.Fragment>
                                                            }
                                                            <span>{item.title}</span>
                                                        </div>
                                                    </Link>
                                                )
                                            }
                                        }) : null
                                    }
                                </div>
                                {/* {this.props.hideScrollToTop === false ? (
                                    <ScrollToTop style={{ zIndex: 10000 }} showUnder={160} duration={1000} easing={"easeInOutBack"}>
                                        <Button color="primary" className="btn-icon scroll-top igamez-button" >
                                            <ArrowUp size={15} />
                                        </Button>
                                    </ScrollToTop>
                                ) : null} */}
                            </div>
                        </React.Fragment>
                        : null
                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    navigationConfig: state.auth.register
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
