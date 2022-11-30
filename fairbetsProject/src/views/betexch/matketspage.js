import React, { Fragment, useState } from "react"
import { ChevronDown, ChevronRight, Clock, Minus, Tv } from "react-feather"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { Badge, Button, Row } from "reactstrap"
import { Root } from "../../authServices/rootconfig"
import { getMatches, setactiveSport, dateConvert } from "../../redux/actions/betexchg"
import Media from 'react-media'

const Matketspage = ({ main }) => {

    const { activeSport, matchelist, Inplay } = useSelector(state => state.betexch)
    const history = useHistory()
    const dispatch = useDispatch()

    const [selectmarkets, setselectmarkets] = useState({})

    const viewall = (item) => {
        dispatch(setactiveSport(item.sport))
        history.push(`/betexchevent?eventname=${item.sport.name}`)
    }

    const viewodds = (item, sportname) => {
        // dispatch(setodds(item))
        // Root.socket.emit("setoddsSession", { data: item.event.id })
        history.push(`/betexchodds?eventname=${sportname}&competition=${item.competition.competition.name}&eventid=${item.event.name}`, { item })
    }

    const mobileeventitem = (itemj, svgicon, sportname) => {
        return <div className="mobileeventitem" >
            <div className="etitle d-flex">
                <div className="svgicon">
                    <svg style={{ color: svgicon.color }} width="30" height="30" viewBox={svgicon.viewBox}>
                        <path d={svgicon.icon} fill="currentColor" />
                    </svg>
                </div>
                <div className="w-100">
                    <div className="competition">
                        <span className="inplay">
                            {
                                itemj.inplay ? <>  <Badge color='success'>
                                    <Clock size={12} className='align-middle' />
                                    <span className='align-middle ml-25'>INPLAY</span>
                                </Badge>&nbsp;&nbsp;
                                </>
                                    : ""
                            }
                        </span>
                        <span>
                            <span>
                                {
                                    dateConvert(itemj.event.openDate)
                                }
                            </span>
                            &nbsp; | &nbsp;
                            <span className="cursor-pointer marketname">
                                {
                                    itemj.competition.competition.name
                                }
                            </span>
                        </span>
                    </div>
                    <div className="matchname"  >
                        <Row className="m-0">
                            <div className="w-75 match" onClick={() => viewodds(itemj, sportname)} >
                                {
                                    itemj.event.name
                                }
                            </div>
                            <div className="w-25">
                                {
                                    selectmarkets[itemj.event.id] ?
                                        <ChevronDown size="15" onClick={() => setselectmarkets({ ...selectmarkets, [itemj.event.id]: false })} /> :
                                        <ChevronRight size="15" onClick={() => setselectmarkets({ ...selectmarkets, [itemj.event.id]: true })} />
                                }
                            </div>
                        </Row>
                    </div>
                    <div className="min-max-value">

                        <div className="value">
                            <span >
                                Min: {activeSport.minmaxvalue.minvalue}&nbsp; |&nbsp; Max: {activeSport.minmaxvalue.maxvalue > 1000 ? activeSport.minmaxvalue.maxvalue / 1000 + "k" : activeSport.minmaxvalue.maxvalue}
                            </span>
                        </div>
                        <div className="status">
                            <span className="tvshow" >
                                <Tv size="12" color="success" />
                            </span>
                            &nbsp;&nbsp;
                            {
                                itemj.bc ?
                                    <Badge color="info" className='badge-glow' >B{itemj.bc}</Badge>
                                    : null
                            }
                            &nbsp;&nbsp;
                            {
                                itemj.fc ?
                                    <Badge color="warning" className='badge-glow'>F{itemj.fc}</Badge>
                                    : ""
                            }
                            &nbsp;&nbsp;
                        </div>
                    </div>
                </div>
            </div>
            {
                !selectmarkets[itemj.event.id] ?

                    <div className="ebody">
                        <div className="odds">
                            <div className="eh">
                                <div className="back" onClick={() => viewodds(itemj, sportname)}>
                                    {
                                        itemj.hda.h.back && itemj.hda.h.back.price ? itemj.hda.h.back.price : <Minus />
                                    }
                                </div>
                                <div className="lay" onClick={() => viewodds(itemj, sportname)}>
                                    {
                                        itemj.hda.h.lay && itemj.hda.h.lay.price ? itemj.hda.h.lay.price : <Minus />
                                    }
                                </div>
                            </div>
                            <div className="ed">
                                <div className="back" onClick={() => viewodds(itemj, sportname)}>
                                    {
                                        itemj.hda.d.back && itemj.hda.d.back.price ? itemj.hda.d.back.price : <Minus />
                                    }
                                </div>
                                <div className="lay" onClick={() => viewodds(itemj, sportname)}>
                                    {
                                        itemj.hda.d.lay && itemj.hda.d.lay.price ? itemj.hda.d.lay.price : <Minus />
                                    }
                                </div>
                            </div>
                            <div className="ea">
                                <div className="back" onClick={() => viewodds(itemj, sportname)}>
                                    {
                                        itemj.hda.a.back && itemj.hda.a.back.price ? itemj.hda.a.back.price : <Minus />
                                    }
                                </div>
                                <div className="lay" onClick={() => viewodds(itemj, sportname)}>
                                    {
                                        itemj.hda.a.lay && itemj.hda.a.lay.price ? itemj.hda.a.lay.price : <Minus />
                                    }
                                </div>
                            </div>
                        </div>
                    </div> : ""
            }
        </div>
    }

    const eventitem = (itemj, svgicon, sportname) => {
        return <div className="eventitem" >
            <div className="etitle">
                <div className="svgicon">
                    <svg style={{ color: svgicon.color }} width="30" height="30" viewBox={svgicon.viewBox}>
                        <path d={svgicon.icon} fill="currentColor" />
                    </svg>
                </div>
                <div>
                    <div className="competition">
                        <span className="inplay">
                            {
                                itemj.inplay ? <>  <Badge color='success'>
                                    <Clock size={12} className='align-middle' />
                                    <span className='align-middle ml-25'>INPLAY</span>
                                </Badge>
                                </>
                                    : ""
                            }
                        </span>&nbsp;&nbsp;
                        <span>
                            {
                                dateConvert(itemj.event.openDate)
                            }
                        </span>
                        &nbsp; | &nbsp;
                        <span className="cursor-pointer">
                            {
                                itemj.competition.competition.name
                            }
                        </span>
                    </div>
                    <div className="matchname" onClick={() => viewodds(itemj, sportname)} >
                        {
                            itemj.event.name
                        }
                    </div>
                </div>
            </div>
            <div className="ebody">
                <div className="min-max-value">
                    <div className="status">
                        <span className="tvshow" >
                            <Tv size="25" color="success" />
                        </span>
                        &nbsp;&nbsp;
                        {
                            itemj.bc ?
                                <Badge color="info" className='badge-glow' >B{itemj.bc}</Badge>
                                : null
                        }
                        &nbsp;&nbsp;
                        {
                            itemj.fc ?
                                <Badge color="warning" className='badge-glow'>F{itemj.fc}</Badge>
                                : ""
                        }
                        &nbsp;&nbsp;
                    </div>
                    <div className="value">
                        <span >

                            {
                                activeSport && activeSport.minmaxvalue && activeSport.minmaxvalue.minvalue ?
                                    <>
                                        Min:
                                        {
                                            activeSport.minmaxvalue.minvalue
                                        }
                                        &nbsp;&nbsp; |&nbsp;&nbsp; Max:
                                        {
                                            activeSport.minmaxvalue.maxvalue > 1000 ? activeSport.minmaxvalue.maxvalue / 1000 + "k" : activeSport.minmaxvalue.maxvalue
                                        }
                                    </> : "Min: 100 &nbsp;&nbsp; |&nbsp;&nbsp; Max: 1000"
                            }
                        </span>
                    </div>
                </div>
                <div className="odds">
                    <div className="eh">
                        <div className="back" onClick={() => viewodds(itemj, sportname)} >
                            {
                                itemj.hda.h.back && itemj.hda.h.back.price ? itemj.hda.h.back.price : <Minus />
                            }
                        </div>
                        <div className="lay" onClick={() => viewodds(itemj, sportname)}>
                            {
                                itemj.hda.h.lay && itemj.hda.h.lay.price ? itemj.hda.h.lay.price : <Minus />
                            }
                        </div>
                    </div>
                    <div className="ed">
                        <div className="back" onClick={() => viewodds(itemj, sportname)}>
                            {
                                itemj.hda.d.back && itemj.hda.d.back.price ? itemj.hda.d.back.price : <Minus />
                            }
                        </div>
                        <div className="lay" onClick={() => viewodds(itemj, sportname)}>
                            {
                                itemj.hda.d.lay && itemj.hda.d.lay.price ? itemj.hda.d.lay.price : <Minus />
                            }
                        </div>
                    </div>
                    <div className="ea">
                        <div className="back" onClick={() => viewodds(itemj, sportname)}>
                            {
                                itemj.hda.a.back && itemj.hda.a.back.price ? itemj.hda.a.back.price : <Minus />
                            }
                        </div>
                        <div className="lay" onClick={() => viewodds(itemj, sportname)}>
                            {
                                itemj.hda.a.lay && itemj.hda.a.lay.price ? itemj.hda.a.lay.price : <Minus />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    const getMarkets = (Serlist, main) => {
        let rows = getMatches(Serlist)
        if (main) {
            return rows.slice(0, 10)
        } else {
            return rows
        }
    }

    return (
        <Fragment>
            {
                matchelist.map((item, i) => (
                    <div className="betexbody" key={i}>
                        {
                            main ?
                                <div className="selecteditem">
                                    <div className="tag">
                                        <div className="img">
                                            <img src={Root.imageurl + item.sport.icon} alt="" />
                                        </div>
                                        <div className="title">
                                            <div className="name">
                                                {
                                                    item.sport.name
                                                }
                                            </div>
                                            <div className="viewall" onClick={() => viewall(item)}>
                                                view all
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rulesbutton">
                                        <Button color="danger" >
                                            RULES
                                        </Button>
                                    </div>
                                </div> : null
                        }
                        {
                            activeSport.eventType !== Inplay.eventType && main ?
                                <div className="backgroundimg">
                                    <img src={Root.imageurl + item.sport.image} alt="" />
                                </div>
                                : null
                        }

                        <Media queries={{ small: "(max-width: 768px)", large: "(min-width: 769px)" }}>
                            {matches => (
                                <React.Fragment>
                                    {matches.small &&
                                        <>
                                            <div className="events">
                                                <div className="eventbody">
                                                    {
                                                        getMarkets(item.Serlist).map((itemj, k) => (
                                                            <Fragment key={k}>
                                                                {
                                                                    mobileeventitem(itemj, item.sport.svgicon,item.sport.name)
                                                                }
                                                            </Fragment>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    }
                                    {
                                        matches.large &&
                                        <>

                                            <div className="events">
                                                <div className="eventheader">
                                                    <div className="etitle">
                                                        Events
                                                    </div>  
                                                    <div className="ebody">
                                                        <div className="min-max-form">

                                                        </div>
                                                        <div className="oddsh">
                                                            <div className="eh">
                                                                H
                                                            </div>
                                                            <div className="ed">
                                                                D
                                                            </div>
                                                            <div className="ea">
                                                                A
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="eventbody">
                                                    {
                                                        getMarkets(item.Serlist).map((itemj, k) => (
                                                            <Fragment key={k}>
                                                                {
                                                                    eventitem(itemj, item.sport.svgicon,item.sport.name)
                                                                }
                                                            </Fragment>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    }
                                </React.Fragment>
                            )}
                        </Media>


                    </div>

                ))
            }


        </Fragment>
    )
}

export default Matketspage
