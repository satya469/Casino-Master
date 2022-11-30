import React, { useContext, useEffect, } from "react"
import { Link } from "react-router-dom"
import * as Icon from "react-feather"
import { Row, Col } from "reactstrap"
import { useSelector } from "react-redux"
import Media from "react-media"
import classnames from "classnames"
import { GameProvider } from "../auth"
import { Root } from "../../authServices/rootconfig"
import {  MessageCircle } from "react-feather"
import { UserContext } from '../../utility/UserContext'

const Footer = (props) => {

  const { telegram, settings } = useContext(UserContext)
  console.log(settings)
  const { logoimg, title, LiveChatSetting,LicenSeSetting } = settings
  const { firstmenu, footertext, sociallink, firstquick, paymentimgs, providerimgs,  } = useSelector(state => state.auth.register)
  const footerTypeArr = ["sticky", "static", "hidden"]
  const SocialIcon = ({ data }) => {
    switch (data.icon) {
      case "facebook":
        return <Icon.Facebook color={'gray'} size={20} />
      case "instagram":
        return <Icon.Instagram color={'gray'} size={20} />
      case "twitter":
        return <Icon.Twitter color={'gray'} size={20} />
      default:
        return <div />
    }
  }

  useEffect(() => {
    if (window.innerWidth <= 767 && LiveChatSetting && LiveChatSetting.status) {
      const s1 = document.createElement("script")
      s1.async = true
      s1.src = LiveChatSetting.src
      s1.charset = 'UTF-8'
      s1.setAttribute('crossorigin', '*')
      document.body.appendChild(s1)
    }
  }, [LiveChatSetting])


  useEffect(() => {
    if ( LicenSeSetting && LicenSeSetting.status) {
      if (document.getElementById('license')) {
        const item = LicenSeSetting
				const div = document.createElement('div')
				div.innerHTML = item.htmlcode
				document.getElementById('license').appendChild(div)

				const script = document.createElement("script")
				script.src = item.src
				script.async = true
				script.onload = () => {
					if (window.document.getElementById(item.tagId)) {
						window[item.functionName].init()
					}
				}
				document.body.appendChild(script)
			}
    }
  }, [LicenSeSetting])

  return (
    <React.Fragment>

      {
        !telegram ? <Media
          queries={{ Mobile: "(max-width: 767px)", Tablet: "(min-width: 768px)", Desktop: "(min-width: 992px)" }}>
          {matches => (
            <footer
              className={classnames("footer  footer-light", {
                "footer-static": props.footerType === "static" || !footerTypeArr.includes(props.footerType),
                "d-none": props.footerType === "hidden"
              })}
            >

              {matches.Mobile && <></>}
              {matches.Tablet && <>
                <Row className='footer-content  m-0 '>
                  <Row className="maxwith w-100">

                    <Col xs="12" md="12" sm="12" lg="12" className="footer-gameprovider-slider mb-1 w-100 mt-1">
                      <GameProvider providerimgs={providerimgs} />
                    </Col>
                    <Col xs="12" md="12" sm="12" lg="12" className="footer-paymentmethod mb-1 w-100 ">
                      <h4>Payment Methods</h4>
                      <div className="paymentmethods-imgs">
                        {paymentimgs ? paymentimgs.map((item, i) => (
                          <img src={Root.imageurl + item.image} alt={item.image} key={i} />
                        )) : null}
                      </div>
                    </Col>
                    <Col xs="12" sm="12" md="3" lg="3" className="mb-1">
                      <div className="footer-logo mb-1">
                        <h6>
                          <img src={!logoimg ? "" : Root.imageurl + logoimg} alt="logo" />
                        </h6>
                      </div>
                      <div className="footer-logo-text"><h1>
                        {title ? title : null}
                      </h1>
                      </div>
                    </Col>
                    <Col xs="6" sm="6" md="3" lg="3" className="footer-menu mb-1">
                      <ul className="ul-list">
                        <li><h5>MENU</h5></li>
                        {firstmenu ? firstmenu.map((item, i) => (
                          <li key={i}><Link to={item.navLink}>{item.title}</Link></li>
                        )) : null}
                      </ul>
                    </Col>
                    <Col xs="6" sm="6" md="3" lg="3" className="footer-menu mb-1">
                      <ul className="ul-list">
                        <li><h5>QUICK LINKS</h5></li>
                        {firstquick ? firstquick.map((item, i) => (
                          <li key={i}>
                            <Link className="Social-icon" to={item.navLink}>{item.title}</Link>
                          </li>
                        )) : null}
                      </ul>
                      {
                        LiveChatSetting && LiveChatSetting.status ? <div className="w-100">
                          <a href={LiveChatSetting.directsrc} target="_bank" className="Social-icon">
                            <p>
                              Live Chat Support
                              </p>
                            <MessageCircle size="25" className="font-weight-bold" />
                          </a>
                        </div> : null
                      }
                    </Col>
                    <Col xs="12" sm="12" md="3" lg="3" className="mb-1">
                      <div className="footer-socials-feed">
                        <div className="footer-logo mb-1 d-flex justify-content-center" id="license" >
                        </div>
                        <h5>GET IN TOUCH</h5>
                        {sociallink ? sociallink.map((item, i) => (
                          <a className="Social-icon" key={i} href={item.navLink} target="_blank" rel="noopener noreferrer" >
                            <SocialIcon data={item} />
                          </a>
                        )) : null}
                      </div>
                    </Col>
                    <Col xs="12" md="12" sm="12" lg="12">
                      {footertext ? footertext : null}
                    </Col>
                  </Row>
                </Row>
                <div id='footer-hidden' />
              </>}
            </footer>
          )}
        </Media> : <div></div>

      }

      {/* {props.hideScrollToTop === false ? (
        <ScrollToTop style={{ zIndex: 10000 }} showUnder={160} duration={1000} easing={"easeInOutBack"}>
          <Button color="primary" className="btn-icon scroll-top igamez-button" >
            <ArrowUp size={15} />
          </Button>
        </ScrollToTop>
      ) : null} */}
    </React.Fragment>
  )

}

export default Footer
//     const gt = document.getElementsByTagName('head')[0]
//     const gtr = document.createElement('script')
//     gtr.async = true
//     gtr.src = 'https://www.googletagmanager.com/gtag/js?id=UA-174475422-1'
//     gt.appendChild(gtr)

//     window.dataLayer = window.dataLayer || []; function gtag() { window.dataLayer.push(arguments) }
//     gtag('js', new Date())
//     gtag('config', 'UA-174475422-1')

//     const ot = document.getElementsByTagName('head')[0]
//     const otr = document.createElement('script')
//     otr.async = true
//     otr.src = 'https://www.googleoptimize.com/optimize.js?id=OPT-TF4MTPJ'
//     ot.appendChild(otr);

//     (
//       function (a, s, y, n, c, h, i, d, e) {
//         s.className += ` ${  y}`
//         h.start = 1 * new Date()
//         h.end = i = function () {
//           s.className = s.className.replace(RegExp(` ?${  y}`), '')
//         };
//         (a[n] = a[n] || []).hide = h
//         setTimeout(function () {
//           i()
//           h.end = null
//         }, c)
//         h.timeout = c
//       })
//       (window, document.documentElement, 'async-hide', 'dataLayer', 4000,
//         { 'OPT-TF4MTPJ': true })

