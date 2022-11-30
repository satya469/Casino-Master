import React from "react"
import { connect } from "react-redux"
import { FormGroup, Input } from "reactstrap"
import { Search } from "react-feather"
import { getSportsListPlayer, getSportsMatchPlayer, current_select_sport, remove_all_match, getAllSportsEventsByEventStatus, getAllSportsType } from "../../../redux/actions/sports"
import SportsTab from '../InsideItems/SportsTab'
import { history } from "../../../history"
import sportsconfig from "../../../configs/sportsconfig"


class Sports extends React.Component {

    state = { value: "" }

    async componentDidMount() {
        const currentPage = history.location.pathname.split("/")[1]
        this.props.getSportsListPlayer(2, sportsconfig.matchType[currentPage])
        this.props.remove_all_match()
        await this.props.getAllSportsType()
        this.props.getAllSportsEventsByEventStatus(sportsconfig.matchType[currentPage])
    }

    position(Item) {
        this.props.current_select_sport(Item)
        const sendData = {
            sportid: Item.sport_id,
            EventStatus: sportsconfig.matchType.Inplay
        }
        this.props.getSportsMatchPlayer(sendData)
    }

    render() {
        return (
            <div className='sports-background height-100'>
                <div className="pr-1 pl-1 w-100">
                    <FormGroup className="position-relative has-icon-left">
                        <Input type="text" className="round" placeholder='Search' value={this.state.value} onChange={e => this.setState({ value: e.target.value })} />
                        <div className="form-control-position px-1">
                            <Search size={15} />
                        </div>
                    </FormGroup>
                </div>
                <div className="overflow-auto">
                    <div className="sport-1">
                        {this.props.sport_list.data && this.props.sport_list.data.length > 0 ? this.props.sport_list.data.map((Item, i) => (
                            <div key={i} onClick={() => this.position(Item)} className="sport-2">
                                {
                                    Item.sport_id === this.props.current_selected_sport.sport_id ? (<div className='sports-tab-active-background'></div>) : null
                                }
                                <div className='sports-tab-background sport-3 position-relative'>
                                    <svg style={{ color: Item.color }} width="22" height="22" viewBox={Item.viewBox}>
                                        <path d={Item.icon} fill="currentColor" />
                                    </svg>
                                    <span className="position-absolute" style={{ right: "3px", top: "5px", }}>
                                        {Item.count}
                                    </span>
                                </div>
                                <div className={Item.sport_id === this.state.id ? 'sport-4 font-color-2' : 'sport-4 font-color-1'}>
                                    {Item.sport_name}
                                </div>
                            </div>
                        )) : null}
                    </div>
                </div>
                <SportsTab />
            </div>
        )
    }
}

const load_fp_data = (state) => {
    return {
        sport_list: state.sports.sports_list,
        current_selected_sport: state.sports.current_selected_sport,
        current_tap: state.sports.current_tap
    }
}

const mapDispatchToProps = {
    getSportsListPlayer,
    getSportsMatchPlayer,
    current_select_sport,
    remove_all_match,
    getAllSportsEventsByEventStatus,
    getAllSportsType
}

export default connect(load_fp_data, mapDispatchToProps)(Sports)
