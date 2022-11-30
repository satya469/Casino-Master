import React, { PureComponent } from "react"
import classnames from "classnames"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import themeConfig from "../configs/themeConfig"
import Customizer from "../components/@vuexy/customizer/Customizer"
import { connect } from "react-redux"
import { changeNavbarColor, changeNavbarType, changeFooterType, changeMenuColor, hideScrollToTop, changeMode } from "../redux/actions/customizer/index"
import {history} from "../history"
import Menu from "./components/Menu"
import Media from "react-media"
import ExchgSidebar from "../views/exchange/sidebar"
import SattaSiderbar from "../views/Satta/siderbar"
import SportsSidebar from "./sportsSidebar/SportsSidebar"
import {Row} from "reactstrap"
import Feedback from "../views/feedback"

class HorizontalLayout extends PureComponent {

  state = {
    width: window.innerWidth,
    sidebarState: false,
    layout: this.props.app.customizer.theme,
    collapsedContent: false,
    sidebarHidden: false,
    currentLang: "en",
    appOverlay: false,
    customizer: false,
    currRoute: this.props.location.pathname,
    menuOpen: themeConfig.menuOpen,
    activeIndex : history.location.pathname
  }
  mounted = false

  updateWidth = () => {
    if (this.mounted) {
      this.setState(prevState => ({
        width: window.innerWidth
      }))
    }
  }

  updateScroll = () => {
    if (this.mounted) {
      this.setState({ scroll: window.pageYOffset })
    }
  }

  handleCustomizer = bool => {
    this.setState({
      customizer: bool
    })
  }

  componentDidMount() {
    this.mounted = true
    if (this.mounted) {
      if (window !== "undefined") {
        window.addEventListener("resize", this.updateWidth, false)
      }
      if (this.props.location.pathname === "/pages/profile") {
        this.setState({
          sidebarState: true,
          collapsedContent: true
        })
      }
      const layout = this.props.app.customizer.theme
      return layout === "pink-dark" ? document.body.classList.add("pink-dark-layout") : layout === "green-dark" ? document.body.classList.add("green-dark-layout") : layout === "real-dark" ? document.body.classList.add("real-dark-layout") : layout === "golden-dark" ? document.body.classList.add("golden-dark-layout") : layout === "blue-dark" ? document.body.classList.add("blue-dark-layout") : null
    }
  }

  componentDidUpdate() {
    if (this.mounted) {
      if (this.state.currRoute !== this.props.location.pathname) {
        this.handleRouteChange()
        this.setState({
          currRoute: this.props.location.pathname
        })
      }

      const layout = this.props.app.customizer.theme
      if (layout === "pink-dark") {
        document.body.classList.remove("green-dark-layout", "real-dark-layout", "blue-dark-layout", "golden-dark-layout")
        document.body.classList.add("pink-dark-layout")
      }
      if (layout === "green-dark") {
        document.body.classList.remove("pink-dark-layout", "real-dark-layout", 'blue-dark-layout', "golden-dark-layout")
        document.body.classList.add("green-dark-layout")
      }
      if (layout === "real-dark") {
        document.body.classList.remove("pink-dark-layout", "green-dark-layout", 'blue-dark-layout', "golden-dark-layout")
        document.body.classList.add("real-dark-layout")
      }
      if (layout === "blue-dark") {
        document.body.classList.remove("pink-dark-layout", "green-dark-layout", "real-dark-layout", "golden-dark-layout")
        document.body.classList.add("blue-dark-layout")
      }
      if (layout === "golden-dark") {
        document.body.classList.remove("pink-dark-layout", "green-dark-layout", "real-dark-layout", "blue-dark-layout")
        document.body.classList.add("golden-dark-layout")
      }
      if (layout !== "dark" && layout !== "green-dark" && layout !== "real-dark" && layout !== "blue-dark" && layout !== "pink-dark") {
        document.body.classList.remove("pink-dark-layout", "green-dark-layout", "real-dark-layout", "blue-dark-layout")
      }
    }
  }

  handleRouteChange = () => {
    if (this.props.location.pathname === "/pages/profile") {
      this.setState({
        collapsedContent: true
      })
    } else {
      this.setState({
        sidebarState: false,
        collapsedContent: false
      })
    }
  }

  toggleSidebarMenu = () => {
    this.setState({
      sidebarState: !this.state.sidebarState,
      collapsedContent: !this.state.collapsedContent
    })
  }

  sidebarMenuHover = () => {
    this.setState({
      sidebarState: !this.state.sidebarState
    })
  }

  handleSidebarVisibility = () => {
    if (this.mounted) {
      if (window !== undefined) {
        // window.addEventListener("resize", () => {
        //   if (this.state.sidebarHidden) {
        //     this.setState({
        //       sidebarHidden: !this.state.sidebarHidden
        //     })
        //   }
        // })
      }
      this.setState({
        sidebarHidden: !this.state.sidebarHidden
      })
    }
  }

  handleCurrentLanguage = lang => {
    this.setState({
      currentLang: lang
    })
  }

  handleAppOverlay = value => {
    if (value.length > 0) this.setState({
        appOverlay: true
      })
    else if (value.length > 0 || value === "") {
      this.setState({
        appOverlay: false
      })
    }
  }

  handleAppOverlayClick = () => {
    this.setState({
      appOverlay: false
    })
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {

    const appProps = this.props.app.customizer
    const customizerProps = {
      customizerState: this.state.customizer,
      handleCustomizer: this.handleCustomizer,
      changeMode: this.props.changeMode,
      changeNavbar: this.props.changeNavbarColor,
      changeNavbarType: this.props.changeNavbarType,
      changeFooterType: this.props.changeFooterType,
      changeMenuTheme: this.props.changeMenuColor,
      collapseSidebar: this.props.collapseSidebar,
      hideScrollToTop: this.props.hideScrollToTop,
      activeMode: appProps.theme,
      activeNavbar: appProps.navbarColor,
      navbarType: appProps.navbarType,
      footerType: appProps.footerType,
      menuTheme: appProps.menuTheme,
      scrollToTop: appProps.hideScrollToTop,
      sidebarState: appProps.sidebarCollapsed
    }
    const navbarProps = {
      toggleSidebarMenu: this.toggleSidebarMenu,
      sidebarState: this.state.sidebarState,
      sidebarVisibility: this.handleSidebarVisibility,
      currentLang: this.state.currentLang,
      changeCurrentLang: this.handleCurrentLanguage,
      handleAppOverlay: this.handleAppOverlay,
      appOverlayState: this.state.appOverlay,
      navbarColor: appProps.navbarColor,
      navbarType: appProps.navbarType,
      hideScrollToTop: appProps.hideScrollToTop

    }
    const footerProps = {
      footerType: appProps.footerType,
      hideScrollToTop: appProps.hideScrollToTop
    }
    const sidebarProps = {
      toggleSidebarMenu: this.props.collapseSidebar,
      toggle: this.toggleSidebarMenu,
      sidebarState: this.state.sidebarState,
      sidebarHover: this.sidebarMenuHover,
      sidebarVisibility: this.handleSidebarVisibility,
      visibilityState: this.state.sidebarHidden,
      activePath: this.props.match.path,
      collapsedMenuPaths: this.handleCollapsedMenuPaths,
      currentLang: this.state.currentLang,
      activeTheme: appProps.menuTheme,
      collapsed: this.state.collapsedContent,
      permission: this.props.permission,
      deviceWidth: this.state.width,
      mainmemu : false
    }
    const navbarTypeArr = ["sticky", "static", "sticky", "floating", "hidden"]
    const menuThemeArr = [
      "primary",
      "success",
      "danger",
      "info",
      "warning",
      "dark"
    ]

    return (
      <div
        className={classnames(
          `wrapper horizontal-layout theme-${customizerProps.menuTheme}`,
          {
            "menu-collapsed":
              this.state.collapsedContent === true && this.state.width > 1200,
            "fixed-footer": customizerProps.footerType === "sticky",
            "navbar-static": customizerProps.navbarType === "static",
            "navbar-sticky": customizerProps.navbarType === "sticky",
            "navbar-floating":
              customizerProps.navbarType === "floating" ||
              !navbarTypeArr.includes(customizerProps.navbarType),
            "navbar-hidden": customizerProps.navbarType === "hidden",
            "theme-primary": !menuThemeArr.includes(customizerProps.menuTheme)
          }
        )}>
        <Navbar {...navbarProps} />
          {
            history.location.pathname === "/exchg" || history.location.pathname === "/exchgevent" ? <React.Fragment>
              <ExchgSidebar/> 
            </React.Fragment> : history.location.pathname === "/Satta/pages" || 
            history.location.pathname === "/Satta/bazar" || 
            history.location.pathname === "/Mybets/satta/games" ||
            history.location.pathname === "/Satta/startline/gamelist" ? <React.Fragment>
              <SattaSiderbar /> 
            </React.Fragment> : null
          }
        <Menu navigationConfig={this.props.navigationConfig} width={this.state.width}      hideScrollToTop={appProps.hideScrollToTop}/>
        <div className={classnames(`app-content content`, { "show-overlay": this.state.appOverlay === true})}
          onClick={this.handleAppOverlayClick}>
          {
            history.location.pathname === "/exchg" || history.location.pathname === "/exchgevent" ? <React.Fragment>
              <Row className="sports-content m-0 p-0  mobilemodemenu">
                <SportsSidebar {...sidebarProps} />
              </Row>
            </React.Fragment> : history.location.pathname === "/Satta/pages" || 
            history.location.pathname === "/Satta/bazar" || 
            history.location.pathname === "/Mybets/satta/games" ||
            history.location.pathname === "/Satta/startline/gamelist" ? <React.Fragment>
              <Row className="sports-content m-0 p-0 mobilemodemenu">
                <SportsSidebar {...sidebarProps} />
              </Row>
            </React.Fragment> : null
          }
          <div className="content-wrapper maxwith">{this.props.children}</div>
        </div>
        <Media 
          queries={{Mobile : "(max-width: 767px)", Tablet : "(min-width: 768px)", Desktop : "(min-width: 992px)"}}>
          {matches => (
            <React.Fragment>
              {
                matches.Mobile && <></>
              }
              {matches.Tablet && <>
                <Footer {...footerProps} />
              </>}
            </React.Fragment>
          )}
        </Media>
        {appProps.disableCustomizer !== true ? (
          <Customizer {...customizerProps} />
        ) : null}
        <div className="sidenav-overlay" onClick={this.handleSidebarVisibility} />
       <Feedback />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  navigationConfig : state.auth.register,
  app: state.customizer
})

const mapDispatchToProps = {
  changeNavbarColor,
  changeNavbarType,
  changeFooterType,
  changeMenuColor,
  hideScrollToTop,
  changeMode
}

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalLayout)