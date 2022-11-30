import React, { Component } from "react"
import classnames from "classnames"
import { ContextLayout } from "../../utility/Layout"
import { connect } from "react-redux"
import SidebarHeader from "./SidebarHeader"
import Hammer from "react-hammerjs"
import SideMenuContent from "./sidemenu/SideMenuContent"
import PerfectScrollbar from "react-perfect-scrollbar"
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai"

class Sidebar extends Component {
  static getDerivedStateFromProps(props, state) {
    if (props.activePath !== state.activeItem) {
      return {
        activeItem: props.activePath
      }
    }
    return null
  }
  state = {
    width: window.innerWidth,
    activeIndex: null,
    hoveredMenuItem: null,
    activeItem: this.props.activePath,
    menuShadow: false,
    ScrollbarTag: PerfectScrollbar
  }

  mounted = false

  updateWidth = () => {
    if (this.mounted) {
      this.setState(prevState => ({
        width: window.innerWidth
      }))
      this.checkDevice()
    }
  }

  componentDidMount() {
    this.mounted = true
    if (this.mounted) {
      if (window !== "undefined") {
        window.addEventListener("resize", this.updateWidth, false)
      }
      this.checkDevice()
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  checkDevice = () => {
    const prefixes = " -webkit- -moz- -o- -ms- ".split(" ")
    const mq = function(query) {
      return window.matchMedia(query).matches
    }

    if ("ontouchstart" in window || window.DocumentTouch) {
      this.setState({
        ScrollbarTag: "div"
      })
    } else {
      this.setState({
        ScrollbarTag: PerfectScrollbar
      })
    }
    const query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join("")
    return mq(query)
  }

  changeActiveIndex = id => {
    if (id !== this.state.activeIndex) {
      this.setState({
        activeIndex: id
      })
    } else {
      this.setState({
        activeIndex: null
      })
    }
  }

  handleSidebarMouseEnter = id => {
    if (id !== this.state.hoveredMenuItem) {
      this.setState({
        hoveredMenuItem: id
      })
    } else {
      this.setState({
        hoveredMenuItem: null
      })
    }
  }

  handleActiveItem = url => {
    this.setState({
      activeItem: url
    })
  }

  render() {
    const {
      visibilityState,
      sidebarVisibility,
      activeTheme,
      activePath,
      sidebarState,
      currentLang,
      permission,
      currentUser,
      collapsedMenuPaths
    } = this.props

    const {
      menuShadow,
      activeIndex,
      hoveredMenuItem,
      activeItem,
      ScrollbarTag
    } = this.state
    const scrollShadow = (container, dir) => {
      if (container && dir === "up" && container.scrollTop >= 100) {
        this.setState({ menuShadow: true })
      } else if (container && dir === "down" && container.scrollTop < 100) {
        this.setState({ menuShadow: false })
      } else {
        
      }
    }
    const { sidebar} = this.props.userProfile
    return (
      <ContextLayout.Consumer>
        {context => {
          const dir = context.state.direction
          return (
            <React.Fragment>
              {/* <Hammer
                onSwipe={e => {
                  sidebarVisibility()
                }}
                direction={
                  dir === "rtl" ? "DIRECTION_LEFT" : "DIRECTION_RIGHT"
                }>
                <div className="menu-swipe-area d-xl-none d-block vh-100"></div>
              </Hammer> */}

              <div
                className={classnames( 
                  `main-menu menu-fixed menu-light menu-accordion menu-shadow theme-${activeTheme}`,
                  {
                    collapsed: sidebarState === true,
                    "hide-sidebar":
                    (this.state.width < 1200 && visibilityState === false)
                  }
                  )}
                >
                  {
                    this.state.width < 1200 ? <div style={{position:'absolute', left: (!visibilityState ? '170px' : '144px'), padding:'10px', zIndex:100, cursor:'pointer'}} onClick={() => this.props.setbarVisibility()}>
                        {visibilityState ? <AiOutlineMenuFold size={20} color="white" onClick={() => this.props.setbarVisibility()}/> : <AiOutlineMenuUnfold  color="white" size={20} onClick={() => this.props.setbarVisibility()}/>}
                      </div> : null
                  }
                <SidebarHeader
                  sidebarVisibility={sidebarVisibility}
                  width={this.state.width}
                />
                <ScrollbarTag
                  className={classnames("main-menu-content", {
                    "overflow-hidden": ScrollbarTag !== "div",
                    "overflow-scroll": ScrollbarTag === "div"
                  })}
                  {...(ScrollbarTag !== "div" && {
                    options: { wheelPropagation: false },
                    onScrollDown: container => scrollShadow(container, "down"),
                    onScrollUp: container => scrollShadow(container, "up"),
                    onYReachStart: () => menuShadow === true &&
                      this.setState({ menuShadow: false })
                  })}>
                  <Hammer
                    onSwipe={() => {
                      sidebarVisibility()
                    }}
                    direction={
                      dir === "rtl" ? "DIRECTION_RIGHT" : "DIRECTION_LEFT"
                    }>
                    <ul className="navigation navigation-main">
                      {
                        sidebar && 
                        <SideMenuContent
                          setActiveIndex={this.changeActiveIndex}
                          activeIndex={activeIndex}
                          hoverIndex={hoveredMenuItem}
                          sidebar={sidebar}
                          handleSidebarMouseEnter={this.handleSidebarMouseEnter}
                          activeItemState={activeItem}
                          handleActiveItem={this.handleActiveItem}
                          activePath={activePath}
                          lang={currentLang}
                          permission={permission}
                          currentUser={currentUser}
                          collapsedMenuPaths={collapsedMenuPaths}
                          toggleMenu={sidebarVisibility}
                          deviceWidth={this.props.deviceWidth}
                        />
                      }
                    </ul>
                  </Hammer>
                </ScrollbarTag>
              </div>
            </React.Fragment>
          )
        }}
      </ContextLayout.Consumer>
    )
  }
}

const mapStateToProps = state => {
  return {
    userProfile : state.auth.login
  }
}

export default connect(mapStateToProps,)(Sidebar)
