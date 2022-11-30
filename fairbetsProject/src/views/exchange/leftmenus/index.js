import React, { Component } from 'react'
import { connect } from 'react-redux'
import SideMenuContent from "./SideMenuContent"
import Hammer from "react-hammerjs"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai"

export class index extends Component {

    state = {
        width: window.innerWidth,
        sidebarHidden: false,
        ScrollbarTag: PerfectScrollbar,
        menuShadow : false,
        sidebarState: this.props.app.customizer.sidebarCollapsed
    }

    mounted = false

    updateWidth = () => {
        if (this.mounted) {
            this.setState(prevState => ({
                width: window.innerWidth
            }))
        }
        this.checkDevice()
    }

    setbarVisibility() {
        this.setState({sidebarHidden:!this.state.sidebarHidden})
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
    //   this.setState({
    //     sidebarHidden: !this.state.sidebarHidden
    //   })
    }
  }

    
    componentWillUnmount() {
        this.mounted = false
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

      
    render() {
        const appProps = this.props.app.customizer
        const activeTheme =  appProps.menuTheme
        const sidebarState =  this.props.app.customizer.sidebarCollapsed
        const { menuShadow, ScrollbarTag } = this.state
        const visibilityState = this.state.sidebarHidden

        const scrollShadow = (container, dir) => {
            if (container && dir === "up" && container.scrollTop >= 100) {
                this.setState({ menuShadow: true })
            } else if (container && dir === "down" && container.scrollTop < 100) {
                this.setState({ menuShadow: false })
            } else {

                
            }
        }

        return (

            <React.Fragment>
                
                <div
                className={classnames( 
                    `exchange-main-menu main-menu menu-fixed menu-light menu-accordion menu-shadow theme-${activeTheme}`,
                    {
                        collapsed: sidebarState === true,
                        "hide-sidebar":
                        (this.state.width < 1200 && visibilityState === false)
                    }
                    )}
                >
                    {
                        this.state.width < 1200 ? <div style={{position:'absolute', left: (!visibilityState ? '260px' : '220px'), padding:'10px', zIndex:100, cursor:'pointer'}} onClick={() => this.setbarVisibility()}>
                        {visibilityState ? <AiOutlineMenuFold size={20} color="white" onClick={() => this.setbarVisibility()}/> : <AiOutlineMenuUnfold  color="white" size={20} onClick={() => this.setbarVisibility()}/>}
                        </div> : null
                    }
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
                            this.handleSidebarVisibility()
                            }}
                        >
                            <ul className="navigation navigation-main">
                                <SideMenuContent
                                    deviceWidth={this.state.width}
                                    data={this.props.data}
                                    toggleMenu={this.handleSidebarVisibility()}
                                />
                            </ul>
                        </Hammer>
                    </ScrollbarTag>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    app: state.customizer

})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
