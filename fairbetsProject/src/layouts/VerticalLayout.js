import React, { PureComponent } from "react"
import classnames from "classnames"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Sidebar from "./sidebar/Sidebar"
import { Row } from "reactstrap"
import Customizer from "../components/@vuexy/customizer/Customizer"
import { connect } from "react-redux"
import { changeMode, collapseSidebar, changeNavbarColor, changeNavbarType, changeFooterType, changeMenuColor, hideScrollToTop } from "../redux/actions/customizer/index"
import { history } from "../history"
import Menu from "./components/Menu"
import Media from "react-media"
import Feedback from "../views/feedback"

class VerticalLayout extends PureComponent {
  state = {
    width: window.innerWidth,
    sidebarState: this.props.app.customizer.sidebarCollapsed,
    layout: this.props.app.customizer.theme,
    collapsedContent: this.props.app.customizer.sidebarCollapsed,
    sidebarHidden: false,
    currentLang: "en",
    appOverlay: false,
    customizer: false,
    currRoute: this.props.location.pathname,
    activeIndex: history.location.pathname
  }
  collapsedPaths = []
  mounted = false
  updateWidth = () => {
    if (this.mounted) {
      this.setState(prevState => ({
        width: window.innerWidth
      }))
    }
  }

  handleCustomizer = bool => {
    this.setState({
      customizer: bool
    })
  }

  componentDidMount() {
    this.mounted = true
    const {
      location: { pathname },
      app: {
        customizer: { theme, direction }
      }
    } = this.props

    if (this.mounted) {
      if (window !== "undefined") {
        window.addEventListener("resize", this.updateWidth, false)
      }
      if (this.collapsedPaths.includes(pathname)) {
        this.props.collapseSidebar(true)
      }

      const layout = theme
      const dir = direction
      if (dir === "rtl") document.getElementsByTagName("html")[0].setAttribute("dir", "rtl")
      else document.getElementsByTagName("html")[0].setAttribute("dir", "ltr")
      return layout === "pink-dark" ? document.body.classList.add("pink-dark-layout") : layout === "green-dark" ? document.body.classList.add("green-dark-layout") : layout === "real-dark" ? document.body.classList.add("real-dark-layout") : layout === "golden-dark" ? document.body.classList.add("golden-dark-layout") : layout === "blue-dark" ? document.body.classList.add("blue-dark-layout") : null
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      location: { pathname },
      app: {
        customizer: { theme, sidebarCollapsed }
      }
    } = this.props

    const layout = theme
    if (this.mounted) {
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
      if (
        prevProps.app.customizer.sidebarCollapsed !==
        this.props.app.customizer.sidebarCollapsed
      ) {
        this.setState({
          collapsedContent: sidebarCollapsed,
          sidebarState: sidebarCollapsed
        })
      }
      if (
        prevProps.app.customizer.sidebarCollapsed ===
        this.props.app.customizer.sidebarCollapsed &&
        pathname !== prevProps.location.pathname &&
        this.collapsedPaths.includes(pathname)
      ) {
        this.props.collapseSidebar(true)
      }
      if (
        prevProps.app.customizer.sidebarCollapsed ===
        this.props.app.customizer.sidebarCollapsed &&
        pathname !== prevProps.location.pathname &&
        !this.collapsedPaths.includes(pathname)
      ) {
        this.props.collapseSidebar(false)
      }

    }
  }

  handleCollapsedMenuPaths = item => {
    const collapsedPaths = this.collapsedPaths
    if (!collapsedPaths.includes(item)) {
      collapsedPaths.push(item)
      this.collapsedPaths = collapsedPaths
    }
  }

  toggleSidebarMenu = val => {
    this.setState({
      sidebarState: !this.state.sidebarState,
      collapsedContent: !this.state.collapsedContent
    })
  }

  sidebarMenuHover = val => {
    this.setState({
      sidebarState: val
    })
  }

  setbarVisibility() {
    this.setState({ sidebarHidden: !this.state.sidebarHidden })
  }

  handleSidebarVisibility = () => {
    if (this.mounted) {
      if (window !== undefined) {
        window.addEventListener("resize", () => {
          if (this.state.sidebarHidden) {
            this.setState({
              sidebarHidden: !this.state.sidebarHidden
            })
          }
        })
      }
      this.setState({
        sidebarHidden: !this.state.sidebarHidden
      })
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  handleCurrentLanguage = lang => {
    this.setState({
      currentLang: lang
    })
  }

  handleAppOverlay = value => {
    if (value.length > 0) {
      this.setState({
        appOverlay: true
      })
    } else if (value.length < 0 || value === "") {
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

  render() {
    const appProps = this.props.app.customizer
    const activeitem = window.sessionStorage.getItem("activeitem")

    const menuThemeArr = [
      "primary",
      "success",
      "danger",
      "info",
      "warning",
      "dark"
    ]
    const sidebarProps = {
      toggleSidebarMenu: this.props.collapseSidebar,
      toggle: this.toggleSidebarMenu,
      sidebarState: this.state.sidebarState,
      sidebarHover: this.sidebarMenuHover,
      sidebarVisibility: this.handleSidebarVisibility,
      visibilityState: this.state.sidebarHidden,
      activePath: activeitem,
      collapsedMenuPaths: this.handleCollapsedMenuPaths,
      currentLang: this.state.currentLang,
      activeTheme: appProps.menuTheme,
      collapsed: this.state.collapsedContent,
      permission: this.props.permission,
      deviceWidth: this.state.width,
      hideScrollToTop: appProps.hideScrollToTop
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
    return (
      <div
        className={classnames(
          `wrapper vertical-layout theme-${appProps.menuTheme}`,
          {
            "menu-collapsed":
              this.state.width <= 800,
            "fixed-footer": appProps.footerType === "sticky",
            "navbar-static": appProps.navbarType === "static",
            "navbar-sticky": appProps.navbarType === "sticky",
            "navbar-floating": appProps.navbarType === "floating",
            "navbar-hidden": appProps.navbarType === "hidden",
            "theme-primary": !menuThemeArr.includes(appProps.menuTheme)
          }
        )}
      >

        <style dangerouslySetInnerHTML={{
          __html: `
          .profile_contentstyle{
            width: calc(100% - 250px) !important;
            height: 100% !important;
            margin-left: 250px !important;
            margin-top: 20px !important;
          }
          .profilesmall-contentstyle{
            width: 100% !important;
            height: 100% !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
            padding-top: 20px !important;
          }
          .profile-small-contentstyle{
            width: 100% !important;
            height: 100% !important;
            padding: 0px !important;
          }
        `}}></style>
        <div
          className={classnames("app-content content", { "show-overlay": this.state.appOverlay === true })} onClick={this.handleAppOverlayClick} >
          <Navbar {...navbarProps} />

          <Menu width={this.state.width} {...navbarProps}  />
          <Row className="profile-content ml-0 mr-0">

            <Sidebar {...sidebarProps} setbarVisibility={() => this.setbarVisibility()} />

            <div className={classnames(
              ``,
              {
                "profile-small-contentstyle":
                  this.state.width <= 360,
                "profilesmall-contentstyle":
                  this.state.width <= 1200,
                profile_contentstyle:
                  this.state.width > 1200
              }
            )}
              style={{ width: '100%', height: "100%" }}
            >{this.props.children}</div>
          </Row>
        </div>

        <Media
          queries={{ Mobile: "(max-width: 767px)", Tablet: "(min-width: 768px)", Desktop: "(min-width: 992px)" }}>
          {matches => (
            <React.Fragment>
              {
                matches.Mobile && <>
                </>
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
        <div
          className="sidenav-overlay"
          onClick={this.handleSidebarVisibility}
        />

        <Feedback />
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    app: state.customizer
  }
}
export default connect(mapStateToProps, {
  changeMode,
  collapseSidebar,
  changeNavbarColor,
  changeNavbarType,
  changeFooterType,
  changeMenuColor,
  hideScrollToTop
})(VerticalLayout)
