import React, { Component } from "react"
import { MDBNavbar, MDBNavbarBrand } from "mdbreact"
import { Dropdown, Button, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import classnames from "classnames"
import { Login, Register, Forgot, Clock } from "../auth"
import { logoutWithJWT } from "../../redux/actions/auth/loginActions"
import avatar from "../../assets/avatar.png"
import { Root } from "../../authServices/rootconfig"
import { history } from "../../history"
import 'mdbreact/dist/css/mdb.css'
import { Download } from "react-feather"
import Media from "react-media"
import { get_item_navLink } from "../../redux/actions/auth/index"
import { UserContext } from '../../utility/UserContext'

const id_preffix = Root.id_preffix
const handleNavigation = (e, path, sidebar) => {
    e.preventDefault()
    if (get_item_navLink(path, sidebar)) {
        history.push(path)
    } else {
        // history.push(path)
    }
}

class Navbar extends Component {
    static contextType = UserContext

    constructor(props) {
        super(props)

        this.state = {
            langDropdown: false,
            isAuthenticated: false,
            balance: 0
        }
    }

    handleLangDropdown = () => {
        this.setState({ langDropdown: !this.state.langDropdown })
    }

    logout = () => {
        this.props.logoutWithJWT()
    }

    loadLogo(favicon) {

        const link = document.querySelector('link[rel="shortcut icon"]')
        // document.querySelector('link[rel="icon"]');
        if (!link) {
            const link = document.createElement('link')
            link.id = 'favicon'
            link.rel = 'shortcut icon'
            document.head.appendChild(link)
        }
        link.href = Root.imageurl + favicon
    }

    profileMenuRender = (sidebar) => {
        const menus = [
            { navLink: "/mywallet/deposit", text: "My Funds" },
            { navLink: "/Mybets/casinos", text: "My Activity" },
            { navLink: "/myprofile/profile-info", text: "My Profile" },
            { navLink: "/Bonuses/casinos", text: "Special Offers" }
        ]
        return (
            <React.Fragment>
                {
                    menus.map((item, i) => (
                        get_item_navLink(item.navLink, sidebar) ? <DropdownItem key={i} tag="a" href="#" onClick={e => handleNavigation(e, item.navLink, sidebar)}>
                            <span className="align-middle">{item.text}</span>
                        </DropdownItem> : null
                    ))
                }

            </React.Fragment>
        )
    }

    render() {
        const { user, telegram, settings } = this.context
        const { logoimg, favicon, appurl, TimerButton, DownloadButton } = settings

        const { currencyLabel, sidebar } = this.props.userProfile
        const balance = this.props.bal && this.props.bal.balance !== false ? parseInt(this.props.bal.balance) : 0
        const exposure = this.props.bal && this.props.bal.exposure !== false ? parseInt(this.props.bal.exposure) : 0
        const colorsArr = ["primary", "danger", "success", "info", "warning", "dark"]
        const guestLinks = (
            <div className='d-flex guest-links'>
                <div className="header-user-info">
                    <Media queries={{ Mobile: "(max-width: 767px)", Tablet: "(min-width: 768px)", Desktop: "(min-width: 992px)" }}>
                        {matches => (
                            <>
                                {matches.Mobile &&
                                    <div className=''>

                                        <Button className='btn-login  header-deposit-button-1 igamez-button text-center m-0' color="warning" onClick={(e) => handleNavigation(e, "/mywallet/deposit", sidebar)} >
                                            {" "} Deposit
                                        </Button>
                                        <div>
                                            <h6 className="m-0">{balance}{currencyLabel}
                                            </h6>
                                            <h6 className="text-decoration-underline m-0" onClick={() => history.push("/Mybets/exposure")}>
                                                EXP: {exposure}
                                            </h6>
                                        </div>
                                    </div>
                                }
                                {matches.Tablet && <>
                                    <Button className='btn-login  header-deposit-button igamez-button' color="warning" onClick={(e) => handleNavigation(e, "/mywallet/deposit", sidebar)} >
                                        Deposit
                                    </Button>
                                </>}
                            </>
                        )}
                    </Media>

                </div>
                <Dropdown
                    tag="li"
                    className="dropdown-language nav-item"
                    isOpen={this.state.langDropdown}
                    toggle={this.handleLangDropdown}
                    onMouseEnter={this.handleLangDropdown}
                    onMouseLeave={this.handleLangDropdown}
                    data-tour="language"
                >
                    <DropdownToggle
                        tag="a" className="nav-link d-flex align-items-center "
                    >
                        <Media queries={{ Mobile: "(max-width: 767px)", Tablet: "(min-width: 768px)", Desktop: "(min-width: 992px)" }}>
                            {matches => (
                                <>
                                    {matches.Mobile &&
                                        <React.Fragment></React.Fragment>
                                    }
                                    {matches.Tablet &&
                                        <>
                                            <h4 className="header-user-balance">
                                                <div>
                                                    {balance}{currencyLabel}
                                                </div>
                                                <div className="text-decoration-underline" onClick={() => history.push("/Mybets/exposure")}>
                                                    exposure: {exposure}
                                                </div>
                                            </h4>
                                        </>
                                    }
                                </>
                            )}
                        </Media>
                        <div onClick={(e) => handleNavigation(e, "/myprofile/profile-info", sidebar)} className="text-center">
                            {
                                user && user.avatar ? (
                                    <img src={Root.imageurl + user.avatar} alt='avatar' />
                                ) : (
                                    <img src={avatar} alt='avatar' />
                                )
                            }
                            {
                                user ? <span className="align-middle textstyle logo-usernameid">
                                    <div className="font-weight-bold">
                                        {user.username}
                                    </div>
                                </span> : <span>&nbsp;</span>
                            }

                        </div>
                    </DropdownToggle>
                    <DropdownMenu right className="user-dropdown-menu">
                        <DropdownItem tag="a" href="#" className="nav-link"
                            onClick={e => handleNavigation(e, "/myprofile/profile-info", sidebar)}>
                            {
                                user ? <div> {id_preffix + user.fakeid} </div> : null
                            }
                        </DropdownItem>
                        {
                            sidebar && sidebar.length > 0 ? this.profileMenuRender(sidebar) : null
                        }
                        <DropdownItem className="border-bottom-0" tag="div" onClick={() => this.logout()}>
                            <span className="align-middle">Log Out</span>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        )
        return (
            <React.Fragment>
                <div className="content-overlay"></div>
                <header className="w-100 header-navbar">
                    <MDBNavbar
                        className={classnames(
                            "header-navbar navbar-expand-lg navbar navbar-with-menu navbar-shadow",
                            {
                                "navbar-light": this.props.navbarColor === "default" || !colorsArr.includes(this.props.navbarColor),
                                "navbar-dark": colorsArr.includes(this.props.navbarColor),
                                "bg-primary":
                                    this.props.navbarColor === "primary",
                                "bg-danger":
                                    this.props.navbarColor === "danger",
                                "bg-success":
                                    this.props.navbarColor === "success",
                                "bg-info":
                                    this.props.navbarColor === "info",
                                "bg-warning":
                                    this.props.navbarColor === "warning",
                                "d-none":
                                    this.props.navbarType === "hidden" && !this.props.horizontal,
                                "navbar-static-top":
                                    this.props.navbarType === "static" && !this.props.horizontal,
                                "fixed-top":
                                    this.props.navbarType === "sticky" || this.props.horizontal,
                                scrolling:
                                    this.props.horizontal && this.props.scrolling
                            }
                        )}
                    >
                        <div className="maxwith d-flex align-items-center w-100 m-auto justify-content-between h-100" >
                            {
                                !telegram ? <React.Fragment>
                                    <MDBNavbarBrand className="header-nav-bar-brand d-flex">
                                        <Link to="/" className="d-flex align-items-center justify-content-center">
                                            {logoimg ? <img className='web-site-logo' alt='logo' src={Root.imageurl + logoimg} /> : <div className='web-site-logo'></div>}
                                        </Link>
                                    </MDBNavbarBrand>
                                    {favicon ? this.loadLogo(favicon) : null}
                                    <div className="header-nav-bar-user">
                                        {/* <div className="d-flex justify-content-center align-items-center">
                                            {
                                                DownloadButton ? <Media queries={{ Mobile: "(max-width: 767px)", Tablet: "(min-width: 768px)", Desktop: "(min-width: 992px)" }}>
                                                    {matches => (
                                                        <a href={Root.appurl + appurl} download >
                                                            {matches.Mobile && <>
                                                                <Button.Ripple className='btn-download igamez-button' color="warning">
                                                                    <Download size={13} />
                                                                    App
                                                                </Button.Ripple>
                                                            </>}
                                                            {matches.Tablet && <>
                                                                <Button.Ripple className='btn-download igamez-button' color="warning">
                                                                    Download App
                                                                </Button.Ripple>
                                                            </>}
                                                        </a>
                                                    )}
                                                </Media> : null
                                            }
                                        </div> */}
                                        {
                                            TimerButton ? <Clock /> : null
                                        }
                                        {
                                            user ? (guestLinks) :
                                                <>
                                                    <Login />
                                                    <Register />
                                                    <Forgot />
                                                </>
                                        }
                                    </div>
                                </React.Fragment> : <div className="d-flex justify-content-center align-items-center w-100 h-100">
                                    {
                                        user ? <React.Fragment>
                                            <div className="color-white d-block font-weight-bold">
                                                <p className="m-0">
                                                    {`telegram-${user.fakeid}`} :
                                                    {user.username}
                                                </p>
                                                <p className="m-0 text-center">
                                                    {balance}{currencyLabel}
                                                </p>
                                            </div>
                                        </React.Fragment> : <span>&nbsp;</span>
                                    }
                                </div>
                            }
                            <h1 className="d-none">
                                Sportsbook, Online Casino Games, Poker & Betting - KASA
                            </h1>
                        </div>
                    </MDBNavbar>
                </header>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    Firstpage: state.auth.register,
    bal: state.balance.value,
    userProfile: state.auth.login
})

const mapDispatchToProps = {
    logoutWithJWT
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

