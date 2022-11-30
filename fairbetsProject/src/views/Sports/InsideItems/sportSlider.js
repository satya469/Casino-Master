import React from "react"
import Swiper from "react-id-swiper"
import { connect } from "react-redux"
import { Root } from "../../../authServices/rootconfig"

const params = {
	spaceBetween: 60,
	centeredSlides: true,
	autoplay: {
	  delay: 5000,
	  disableOnInteraction: false
	},
	pagination: {
	  el: ".swiper-pagination",
	  clickable: true
	}
}

class SportsSlider extends React.Component {

    render() {
        const {firstpages3} = this.props.FirstPage
        return (
            <div className='pt-2 pb-2 sports-background' style={{overflow:'auto'}}>
                {
                    firstpages3 && firstpages3.length ? <div id='sports-slider' style={{width:'auto', margin:'auto'}}>
                            <Swiper {...params}>
                                {
                                    firstpages3.map((item, i) => (
                                        <div key={i} className="w-100">
                                            <img src={Root.imageurl + item.image} alt="swiper 1" className="img-fluid w-100" />
                                        </div>
                                    ))
                                }
                            </Swiper>
                        </div> : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
	FirstPage : state.auth.register
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(SportsSlider)
