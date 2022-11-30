import React, { useEffect, useState, Fragment } from "react"
import { Clock, Minus } from "react-feather"
import { Badge, Col } from "reactstrap"
import { betExchangefirstPage } from "../../redux/actions/auth/apiservice"
import { useHistory } from "react-router-dom"
import { dateConvert } from "../../redux/actions/betexchg"
import Media from 'react-media'
import { Root } from "../../authServices/rootconfig"

const Betexchfirst = () => {

    const [Betsdata, setBetsdata] = useState([])
    const history = useHistory()

    const load = async () => {
        let rdata = await betExchangefirstPage()
        if (rdata.status) {
            setBetsdata(rdata.data)
        } else {

        }
    }

    const viewodds = (item, sportname) => {
        history.push(`/betexchodds?eventname=${sportname}&competition=${item.competition.competition.name}&eventid=${item.event.name}`, { item })
    }

    const mobileeventitem = (itemj, sport) => {
        return <div className="mobileeventitem" >
            <div className="etitle d-flex">
                <div className="svgicon">
                    <svg style={{ color: sport.svgicon.color }} width="30" height="30" viewBox={sport.svgicon.viewBox}>
                        <path d={sport.svgicon.icon} fill="currentColor" />
                    </svg>
                </div>
                <div className="w-100">
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
                    <div className="matchname" onClick={() => viewodds(itemj, sport.name)} >
                        {
                            itemj.event.name
                        }
                    </div>
                </div>
            </div>
            <div className="ebody">
                <div className="min-max-value">
                    <div className="status">
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
                <div className="odds">
                    <div className="eh">
                        <div className="back" onClick={() => viewodds(itemj, sport.name)} >
                            {
                                itemj.hda.h.back && itemj.hda.h.back.price ? itemj.hda.h.back.price : <Minus />
                            }
                        </div>
                        <div className="lay" onClick={() => viewodds(itemj, sport.name)}>
                            {
                                itemj.hda.h.lay && itemj.hda.h.lay.price ? itemj.hda.h.lay.price : <Minus />
                            }
                        </div>
                    </div>
                    <div className="ed">
                        <div className="back" onClick={() => viewodds(itemj, sport.name)}>
                            {
                                itemj.hda.d.back && itemj.hda.d.back.price ? itemj.hda.d.back.price : <Minus />
                            }
                        </div>
                        <div className="lay" onClick={() => viewodds(itemj, sport.name)}>
                            {
                                itemj.hda.d.lay && itemj.hda.d.lay.price ? itemj.hda.d.lay.price : <Minus />
                            }
                        </div>
                    </div>
                    <div className="ea">
                        <div className="back" onClick={() => viewodds(itemj, sport.name)}>
                            {
                                itemj.hda.a.back && itemj.hda.a.back.price ? itemj.hda.a.back.price : <Minus />
                            }
                        </div>
                        <div className="lay" onClick={() => viewodds(itemj, sport.name)}>
                            {
                                itemj.hda.a.lay && itemj.hda.a.lay.price ? itemj.hda.a.lay.price : <Minus />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    const eventitem = (itemj, sport) => {
        return <div className="eventitem firstpageeventitem" >
            <div className="etitle">
                <div className="svgicon">
                    <svg style={{ color: sport.svgicon.color }} width="30" height="30" viewBox={sport.svgicon.viewBox}>
                        <path d={sport.svgicon.icon} fill="currentColor" />
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
                    <div className="matchname" onClick={() => viewodds(itemj, sport.name)} >
                        {
                            itemj.event.name
                        }
                    </div>
                </div>
            </div>
            <div className="ebody">
                <div className="min-max-value">
                    <div className="status">
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
                <div className="odds">
                    <div className="eh">
                        <div className="back" onClick={() => viewodds(itemj, sport.name)} >
                            {
                                itemj.hda.h.back && itemj.hda.h.back.price ? itemj.hda.h.back.price : <Minus />
                            }
                        </div>
                        <div className="lay" onClick={() => viewodds(itemj, sport.name)}>
                            {
                                itemj.hda.h.lay && itemj.hda.h.lay.price ? itemj.hda.h.lay.price : <Minus />
                            }
                        </div>
                    </div>
                    <div className="ed">
                        <div className="back" onClick={() => viewodds(itemj, sport.name)}>
                            {
                                itemj.hda.d.back && itemj.hda.d.back.price ? itemj.hda.d.back.price : <Minus />
                            }
                        </div>
                        <div className="lay" onClick={() => viewodds(itemj, sport.name)}>
                            {
                                itemj.hda.d.lay && itemj.hda.d.lay.price ? itemj.hda.d.lay.price : <Minus />
                            }
                        </div>
                    </div>
                    <div className="ea">
                        <div className="back" onClick={() => viewodds(itemj, sport.name)}>
                            {
                                itemj.hda.a.back && itemj.hda.a.back.price ? itemj.hda.a.back.price : <Minus />
                            }
                        </div>
                        <div className="lay" onClick={() => viewodds(itemj, sport.name)}>
                            {
                                itemj.hda.a.lay && itemj.hda.a.lay.price ? itemj.hda.a.lay.price : <Minus />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    useEffect(() => {
        load()
    }, [])
    
    return (
        <div className="w-100 firstpagesatta">
            <Col md="12" className="text">
                <img src={`${Root.imageurl}9097d00e07d826c46eb0b042c18d69ec.png`} alt="satta" />
                BEXCH
            </Col>

            <Col md="12" className="p-0 h-100 betexchmain">
                <div className="betexbody">
                    <Media queries={{ small: "(max-width: 768px)", large: "(min-width: 769px)" }}>
                        {matches => (
                            <React.Fragment>
                                {matches.small &&
                                    <>
                                        <div className="events">
                                            <div className="eventbody">
                                                {
                                                    Betsdata.map((itemj, k) => (
                                                        itemj.map((item, j) => (
                                                            <Fragment key={j}>
                                                                {
                                                                    mobileeventitem(item, item.sport)
                                                                }
                                                            </Fragment>
                                                        ))
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
                                            <div className="eventbody">
                                                {
                                                    Betsdata.map((itemj, k) => (
                                                        itemj.map((item, j) => (
                                                            <Fragment key={j}>

                                                                {
                                                                    eventitem(item, item.sport)
                                                                }
                                                            </Fragment>
                                                        ))
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
            </Col>
        </div>
    )
}

export default Betexchfirst