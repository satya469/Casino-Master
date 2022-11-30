

import React from "react"
import { Link } from "react-router-dom"
import classnames from "classnames"
import SideMenuGroup from "./SideMenuGroup"
import { Badge } from "reactstrap"
import { ChevronRight } from "react-feather"
import { history } from "../../../history"
import { connect } from "react-redux"
import { get_item } from "../../../redux/actions/auth/index"
import { imageicon, Root } from "../../../authServices/rootconfig"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@iconify/react'
import roosterIcon from '@iconify-icons/emojione-v1/rooster'
import horseIcon from '@iconify-icons/fa-solid/horse'
import querystring from "query-string"


class SideMenuContent extends React.Component {
  constructor(props) {
    super(props)

    this.parentArr = []
    this.collapsedPath = null
    this.redirectUnauthorized = () => {
      history.push("/misc/not-authorized")
    }
  }

  state = {
    flag: true,
    isHovered: false,
    activeGroups: [],
    currentActiveGroup: [],
    tempArr: [],
    activeitem: this.props.activeItemState,
    sidebar: []
  }

  get_groups_active = (id) => {
    let open_group = []
    const sidebar = this.getSidebar()
    const s_item = get_item(id, sidebar)
    open_group = this.get_groups(s_item)
    return open_group
  }

  get_groups_parent = (parent) => {
    const groups = []
    const sidebar = this.getSidebar()
    function fact(node) {
      groups.push(node.id)
      const n = get_item(node.id, sidebar)
      if (n.pid === "0") {

      } else {
        fact({ id: n.pid })
      }
    }
    fact({ id: parent })
    return groups
  }


  get_groups = (childs) => {
    const groups = []
    let node = {}
    function fact(item) {
      if (item.children && item.children.length > 0) {
        groups.push(item.id)
        fact(item.children[0])
      } else {
        node = item

      }
    }
    fact(childs)
    return { groups, node }
  }


  handleGroupClick = async (id, parent = null, type = "") => {

    let open_group = this.state.activeGroups
    // let activeitem = ""
    if (type === "item" && parent === null) {
      open_group = []
      this.setState({ activeitem: id })

    } else if (type === "item" && parent) {
      const p_groups = this.get_groups_parent(parent)
      open_group = p_groups
      this.setState({ activeGroups: p_groups, activeitem: id })
      // history.push(activeitem.navLink)

    } else if (type === "collapse" && parent === null) {

      if (open_group.indexOf(id) === -1) {
        open_group = []
        const d_ = this.get_groups_active(id)
        open_group = d_["groups"]
        // activeitem = d_["node"].id
        this.setState({ activeGroups: open_group })
        // history.push(d_["node"].navLink)
      } else {
        this.setState({ activeGroups: [], activeitem: null })

      }
    } else if (type === "collapse" && parent) {
      if (open_group.indexOf(id) === -1) {
        open_group = []
        const d_ = this.get_groups_active(id)
        const p_groups = this.get_groups_parent(parent)
        const groups = d_["groups"]
        // activeitem = d_["node"].id
        open_group = p_groups
        open_group = [...open_group, ...groups]
        this.setState({ activeGroups: open_group })
        // history.push(d_["node"].navLink)
      } else {
        open_group = []
        const p_groups = this.get_groups_parent(parent)
        open_group = p_groups
        this.setState({ activeGroups: open_group })
      }
    }
  }

  get_item_navLink = (id) => {
    const sidebar = this.getSidebar()
    let item = {}
    function fact(node) {
      if (node.navLink === id) {
        item = node
        return
      }
      if (node.children && node.children.length > 0) {
        for (const j in node.children) {
          if (id === node.children[j].navLink) {
            item = node.children[j]
            return
          }
          fact(node.children[j])
        }
      } else {

      }
    }

    for (const i in sidebar) {
      fact(sidebar[i])
    }
    return item
  }

  initRender = () => {
    let params = querystring.parse(history.location.search)
    let eventname = params.eventname
    let activeitem1 = ""
    if (eventname) {
      activeitem1 = history.location.pathname + "?eventname=" + eventname
    } else {
      activeitem1 = history.location.pathname
    }

    const link = activeitem1
    const item = this.get_item_navLink(link)
    const parent = item.pid === "0" ? null : item.pid
    this.handleGroupClick(item.id, parent, item.type)
  }

  getSidebar = () => {
    const row = this.props.navigationConfig && this.props.navigationConfig.firstmenu ? this.props.navigationConfig.firstmenu : []
    return row
  }

  componentDidMount() {
    this.initRender()
  }

  render() {
    // Loop over sidebar items
    // eslint-disable-next-line
    let navigationConfig = this.getSidebar()
    const menuItems = navigationConfig && navigationConfig.map(item => {
      const CustomAnchorTag = Link
      // const Tag = FaIcon[item.icon]
      // checks if item has groupheader\
      const renderItem = (
        <li
          className={classnames("nav-item", {
            "has-sub": item.type === "collapse",
            open: this.state.activeGroups.includes(item.id),
            // "sidebar-group-active": this.state.activeGroups.includes( item.id ),
            hover: this.props.hoverIndex === item.id,
            // active: (this.props.activeItemState === item.navLink && item.type === "item") || (item.parentOf && item.parentOf.includes(this.props.activeItemState)),
            active: this.state.activeitem === item.id && item.type === "item"
            // disabled: item.disabled
          })}
          key={item.id}
          onClick={e => {
            e.stopPropagation()
            if (item.type === "item") {
              // this.props.handleActiveItem(item.navLink);
              this.handleGroupClick(item.id, null, item.type)
              if (this.props.deviceWidth <= 1200 && item.type === "item") {
                this.props.toggleMenu()
              }
            } else {
              // history.push(item.navLink)
              this.handleGroupClick(item.id, null, item.type)
            }
          }}>

          <CustomAnchorTag
            to={item.navLink}
            className={`d-flex ${item.badgeText ? "justify-content-between" : "justify-content-start"}`}
            onMouseEnter={() => { this.props.handleSidebarMouseEnter(item.id) }}
            onMouseLeave={() => { this.props.handleSidebarMouseEnter(item.id) }}
            key={item.id}
            onClick={e => { return item.type === "collapse" ? e.preventDefault() : "" }}
            target={undefined}>
            <div className="menu-text">
              {
                imageicon ? <React.Fragment>
                  <img alt={item.image} style={{ width: "30px", height: "30px" }} src={Root.imageurl + (item.image)} />
                </React.Fragment> : <React.Fragment>
                  {
                    item.icon === 'cockIcon' ? <Icon icon={roosterIcon} style={{ fontSize: "25px" }} /> : item.icon === "faHourglass" ? <Icon icon={horseIcon} /> : <FontAwesomeIcon color="#8f99a3" icon={Icons[item.icon]} />
                  }
                </React.Fragment>
              }
              <span className="menu-item menu-title"> {item.title} </span> </div>
            {item.badge ? (<div className="menu-badge">  <Badge color={item.badge} className="mr-1" pill> {item.badgeText} </Badge> </div>) : ("")}
            {item.type === "collapse" ? (<ChevronRight className="menu-toggle-icon" size={13} />) : ("")}

          </CustomAnchorTag>
          {item.type === "collapse" ? (
            <SideMenuGroup
              group={item}
              handleGroupClick={this.handleGroupClick}
              activeGroup={this.state.activeGroups}
              handleActiveItem={this.props.handleActiveItem}
              activeItemState={this.state.activeitem}
              handleSidebarMouseEnter={this.props.handleSidebarMouseEnter}
              activePath={this.props.activePath}
              hoverIndex={this.props.hoverIndex}
              initRender={this.initRender}
              parentArr={this.parentArr}
              triggerActive={undefined}
              currentActiveGroup={this.state.currentActiveGroup}
              permission={this.props.permission}
              currentUser={this.props.currentUser}
              redirectUnauthorized={this.redirectUnauthorized}
              collapsedMenuPaths={this.props.collapsedMenuPaths}
              toggleMenu={this.props.toggleMenu}
              deviceWidth={this.props.deviceWidth}
            />
          ) : (
            ""
          )}
        </li>
      )

      // if ( item.navLink && item.collapsed !== undefined && item.collapsed === true ) { 
      //   this.collapsedPath = item.navLink;
      //   this.props.collapsedMenuPaths(item.navLink)
      // }

      return renderItem
      // if (item.type === "collapse" || item.type === "item") {
      // } else {
      //   // return <div></div>
      //   // return this.redirectUnauthorized()
      // }
    })
    return <React.Fragment>{menuItems}</React.Fragment>
  }
}

const mapStateToProps = (state) => ({
  navigationConfig: state.auth.register
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuContent)

