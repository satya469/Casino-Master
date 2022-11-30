import React from "react"
import { connect } from "react-redux"
import { FormGroup, Input } from "reactstrap"
import { Search } from "react-feather"
import {
    getSportsListPlayer,
    getSportsMatchPlayer,
    current_select_sport,
    remove_all_match,
    getFeaturedEvents,
    countryChange,
    removeItem,
    removeAllItem
} from "../../../redux/actions/sports"
import SportsTab from '../InsideItems/SportsTab'
import queryString from "query-string"
import sportsconfig from "../../../configs/sportsconfig"
import { UserContext } from "../../../utility/UserContext"
import { history } from "../../../history"

class Sports extends React.Component {
    static contextType = UserContext
    state = { value: "" }

    async componentDidMount() {
        const me = this;
        const { telegram } = this.context
        const currentPage = "sports"
        if (!this.props.current_selected_sport.sport_id) {
            this.props.remove_all_match()
            if (telegram) {
                await this.props.getSportsListPlayer(1, sportsconfig.matchType[currentPage])
                const queryData = queryString.parse(this.props.location.search)
                const index = this.props.sport_list.data.findIndex(item => String(item.sport_id) === queryData.sport_id)
                if (index > -1) {
                    this.position(this.props.sport_list.data[index])
                } else {
                    this.props.getFeaturedEvents()
                }
            } else {
                this.props.getSportsListPlayer(0, sportsconfig.matchType[currentPage])
                this.props.getFeaturedEvents()
            }
        } else {
            this.props.getSportsListPlayer(1, sportsconfig.matchType[currentPage])
        }

        document.addEventListener("message", function (event) {
            let d = JSON.parse(event.data)
            switch (d.action) {
                case "removeOneItem":
                    me.props.removeItem(d.value)
                    break;
                case "removeAllItem":
                    me.props.removeAllItem()
                    break;
                case "bet":
                    me.props.removeAllItem()
                    break;
                default:
                    break;
            }
        }, false);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.sport_list !== this.props.sport_list) {
            let event_name = queryString.parse(history.location.search).event_name
            if(event_name) {
                let item = this.props.sport_list.data.filter(it => it.sport_name === event_name);
                if(item.length) {
                    this.position(item[0])
                }
            }
        }
    }

    position(Item) {
        this.props.current_select_sport(Item)
        this.props.countryChange("")
        if (Item.sport_id === 0) {
            this.props.getFeaturedEvents()
        } else {
            const sendData = {
                sportid: Item.sport_id,
                EventStatus: this.props.current_tap.EventStatus
            }
            this.props.getSportsMatchPlayer(sendData)
        }
        history.push(`?event_name=${Item.sport_name}`)
    }

    render() {
        return (
            <div className='sports-background height-100'>
                <div className="w-100 memu-search">
                    <FormGroup className="position-relative has-icon-left mt-1">
                        <Input type="text" className="round" placeholder='Search' value={this.state.value} onChange={e => this.setState({ value: e.target.value })} />
                        <div className="form-control-position px-1">
                            <Search size={15} />
                        </div>
                    </FormGroup>
                </div>
                <div className="overflow-auto menulist">
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
                                    {/* <span className="position-absolute" style={{ right: "3px", top: "5px", }}>
                                        {Item.count}
                                    </span> */}
                                </div>
                                <div className={`sport-4${Item.sport_id === this.props.current_selected_sport.sport_id ? ' sports-4-active' : ''}`}>
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
        current_tap: state.sports.current_tap,
        all_sports_list: state.sports.all_sports_list
    }
}

const mapDispatchToProps = {
    getSportsListPlayer,
    getSportsMatchPlayer,
    current_select_sport,
    remove_all_match,
    getFeaturedEvents,
    countryChange,
    removeItem,
    removeAllItem
}

export default connect(load_fp_data, mapDispatchToProps)(Sports)
