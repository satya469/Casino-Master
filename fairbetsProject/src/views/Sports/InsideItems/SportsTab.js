import React from "react"
import SportsBet from "./SportsBet"
import { ChevronRight } from "react-feather"
import { TapChange, getSportsMatchPlayer, countryChange } from "../../../redux/actions/sports/index"
import { connect } from "react-redux"
import sportConfig from "../../../configs/sportsconfig"
import { history } from "../../../history"
import SportsSlider from "./sportSlider"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

class SportsTab extends React.Component {

    state = {
        page: history.location.pathname.split("/")[1]
    }

    activeTab = async (Item) => {
        await this.props.TapChange(Item)
        const sendData = {
            sportid: this.props.current_selected_sport.sport_id,
            EventStatus: Item.EventStatus
        }
        this.props.getSportsMatchPlayer(sendData)
        this.props.countryChange("")
    }

    render() {
        const { current_tap, current_selected_sport, all_matchs, featuredData, currentCountry } = this.props
        let new_all_match = []
        if (currentCountry) {
            for (let i = 0; i < all_matchs.data.length; i++) {
                const new_venue_data = []
                for (let j = 0; j < all_matchs.data[i].data.length; j++) {
                    if (all_matchs.data[i].data[j].Venue && all_matchs.data[i].data[j].Venue.country && all_matchs.data[i].data[j].Venue.country === currentCountry) {
                        new_venue_data.push(all_matchs.data[i].data[j])
                    }
                }
                if (new_venue_data.length) {
                    const new_data = all_matchs.data[i]
                    new_data.data = new_venue_data
                    new_all_match.push(new_data)
                }
            }
        } else {
            new_all_match = all_matchs.data ? all_matchs.data : []
        }
        return (
            <div style={{ height: 'calc(100% - 145px)', marginBottom: '15px' }} className="menubody">
                {current_selected_sport.sport_id ? (
                    <>
                        <div className='pt-2 sports-background1' style={{ borderRadius: '25px 25px 0px 0px' }}>
                            <div className='sports-tab-title'>
                                <svg style={{ color: current_selected_sport.color, margin: '1.2rem' }} width="22" height="22" viewBox={current_selected_sport.viewBox}>
                                    <path d={current_selected_sport.icon} fill="currentColor" />
                                </svg>
                                <span className="color-white">{current_selected_sport.sport_name}
                                    {/* {current_tap ? ` : ${current_tap.title}` : ''} */}
                                </span>
                            </div>
                            {
                                this.state.page === "sports" && sportConfig.tab && sportConfig.tab.map((Item, i) => (
                                    <div
                                        key={i}
                                        className={
                                            `p-0 pl-1 pr-1 children-tab ${Item.index === current_tap.index ? 'children-tab-active' : ''}`
                                        }
                                        onClick={() => this.activeTab(Item)}
                                    >
                                        {Item.title}
                                        <div className='mr-auto ml-auto' style={{ marginTop: '3px' }}></div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='sports-featured-back'>
                            <span className='sports-featured-home'>Home &nbsp;&nbsp;&nbsp;<ChevronRight size={15} />&nbsp;&nbsp;&nbsp;</span>
                            <span className='sports-featured-active-button'>{`All ${current_selected_sport.sport_name} League`}</span>
                            {
                                currentCountry ? <>&nbsp;&nbsp;&nbsp;<ChevronRight size={15} /><span>&nbsp;&nbsp;&nbsp;{currentCountry}</span></> : ""
                            }
                        </div>
                        <div className='sports-event'>
                            {
                                new_all_match.map((sportsBetItem, i) => (
                                    <SportsBet key={i} sportsBetItem={sportsBetItem} />
                                ))
                            }
                        </div>
                    </>
                ) : (
                    <>
                        {
                            current_selected_sport.sport_name === "Featured" && <SportsSlider />
                        }
                        <h3 className="featuretitle">
                            {current_selected_sport.sport_name === "Featured" ? `Featured Events` : current_selected_sport.sport_name}
                        </h3>
                        {
                            featuredData && featuredData.data.length ? <React.Fragment>
                                {
                                    featuredData.data.map((featuredItem, i) => (
                                        <React.Fragment key={i}>
                                            <div className='pt-2 mt-1 sports-background1' style={{ borderRadius: '25px 25px 0px 0px' }}>
                                                <div className='sports-tab-title'>
                                                    <svg style={{ color: featuredItem.color, margin: '1.2rem' }} width="22" height="22" viewBox={featuredItem.viewBox}>
                                                        <path d={featuredItem.icon} fill="currentColor" />
                                                    </svg>
                                                    <span className="color-white">
                                                        {featuredItem.sport_name}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='sports-event'>
                                                {
                                                    featuredItem.matchs && featuredItem.matchs.map((EventItem, j) => (
                                                        <SportsBet key={j} sportsBetItem={Object.assign({}, EventItem)} />
                                                    ))
                                                }
                                            </div>
                                        </React.Fragment>
                                    ))
                                }
                            </React.Fragment> : <React.Fragment>
                                <SkeletonTheme color="#202020" highlightColor="#444" >
                                    <Skeleton count={10} />
                                </SkeletonTheme>
                            </React.Fragment>
                        }
                    </>
                )}
            </div>
        )
    }
}

const load_fp_data = (state) => {
    return {
        current_selected_sport: state.sports.current_selected_sport,
        current_tap: state.sports.current_tap,
        all_matchs: state.sports.all_matchs,
        featuredData: state.sports.featuredData,
        currentCountry: state.sports.currentCountry
    }
}

const mapDispatchToProps = {
    TapChange,
    getSportsMatchPlayer,
    countryChange
}

export default connect(load_fp_data, mapDispatchToProps)(SportsTab)
