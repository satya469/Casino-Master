import React, { PureComponent } from "react"
import classnames from "classnames"
import { Row} from "reactstrap"
import { connect } from "react-redux"
import {
  changeMode,
  collapseSidebar,
  changeNavbarColor,
  changeNavbarType,
  changeFooterType,
  changeMenuColor,
  hideScrollToTop
} from "../redux/actions/customizer/index"
import {UserContext} from "../utility/UserContext"

class SportsLayout extends PureComponent {
  static contextType = UserContext

  state = {
    width: window.innerWidth,
    sidebarState: this.props.app.customizer.sidebarCollapsed,
    layout: this.props.app.customizer.theme,
    collapsedContent: this.props.app.customizer.sidebarCollapsed,
    sidebarHidden: false,
    currentLang: "en",
    appOverlay: false,
    customizer: false,
    currRoute: this.props.location.pathname
  };
  collapsedPaths = [];
  mounted = false;
  updateWidth = () => {
    if (this.mounted) {
      this.setState(prevState => ({
        width: window.innerWidth
      }))
     
    }
  };

  handleCustomizer = bool => {
    this.setState({
      customizer: bool
    })
  };

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
      return layout === "pink-dark" ? document.body.classList.add("pink-dark-layout") : layout === "green-dark" ? document.body.classList.add("green-dark-layout") : layout === "golden-dark" ? document.body.classList.add("golden-dark-layout") : layout === "real-dark" ? document.body.classList.add("real-dark-layout") : layout === "blue-dark" ? document.body.classList.add("blue-dark-layout") : null
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
  };

  toggleSidebarMenu = val => {
    this.setState({
      sidebarState: !this.state.sidebarState,
      collapsedContent: !this.state.collapsedContent
    })
  };

  sidebarMenuHover = val => {
    this.setState({
      sidebarState: val
    })
  };

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
  };

  componentWillUnmount() {
    this.mounted = false
  }

  handleCurrentLanguage = lang => {
    this.setState({
      currentLang: lang
    })
  };

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
  };

  handleAppOverlayClick = () => {
    this.setState({
      appOverlay: false
    })
  };

  render() {
    const {telegram} = this.context
    const appProps = this.props.app.customizer
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
          `wrapper vertical-layout theme-${appProps.menuTheme}`,
          {
            "menu-collapsed":
              this.state.width <= 1200,
            "fixed-footer": appProps.footerType === "sticky",
            "navbar-static": appProps.navbarType === "static",
            "navbar-sticky": appProps.navbarType === "sticky",
            "navbar-floating": appProps.navbarType === "floating",
            "navbar-hidden": appProps.navbarType === "hidden",
            "theme-primary": !menuThemeArr.includes(appProps.menuTheme)
          }
        )}
      >

        {
          !telegram ? <style dangerouslySetInnerHTML={{__html: `
              .sportspage_contentstyle{
                margin-top : 0px !important;
                width: calc(100% - 180px);
                margin-left: 180px;
                padding:10px;
              }
              .sportspagesmall_contentstyle{
                width: 100% !important;
                margin-top : 0px !important;
              }
              @media (max-width: 1200px) {
                .sportspagesmall_contentstyle {
                }
              }
            `}}></style> : <style dangerouslySetInnerHTML={{__html: `
              .sportspage_contentstyle{
                margin-top : 0px !important;
                width: 100%;
                padding:10px;
              }
              .sportspagesmall_contentstyle{
                width: 100% !important;
                margin-top : 0px !important;
              }
              @media (max-width: 1200px) {
                .sportspagesmall_contentstyle {
                }
              }
            `}}></style>
        }
        <div
          className={classnames("app-content content", {
            "show-overlay": this.state.appOverlay === true
          })}
          onClick={this.handleAppOverlayClick}
        >
          <Row className="sports-content ml-0 mr-0">
              <div className={classnames(
                  {
                      sportspagesmall_contentstyle:
                      this.state.width <= 1200,
                      sportspage_contentstyle:
                      this.state.width > 1200
                      }
                  )}
                  style={{height : "auto", minHeight:'800px'}}
              >{this.props.children}</div>
          </Row>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    app: state.customizer,
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
})(SportsLayout)
