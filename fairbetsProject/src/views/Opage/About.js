import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'reactstrap'
import { Trans } from 'react-i18next'


export class About extends Component {
    render() {
        const {aboutus} = this.props.FirstPage
        return (
            <div className='justify-content-center d-flex'>
                <Row className='ml-0 mr-0 pt-2' style={{maxWidth:'1200px', width:'100%'}}>
                    <Col sm='12' className='mt-1'>
                        <h1 className='d-flex justify-content-start'>
                            <Trans i18nKey="About us">
                                About us
                            </Trans>
                        </h1>
                    </Col>
                    {
                        aboutus ? aboutus.map((item, i) => {
                            return (
                                <div key={i}>
                                    <Col sm='12' className='mt-1'>
                                        <h1 className='d-flex justify-content-start'>{item.title}</h1>
                                    </Col>
                                    <Col sm='12' className='mt-1'>
                                        <p>
                                            {item.navLink}
                                        </p>
                                    </Col>
                                </div>
                            )
                        }) : null
                    }
                   
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    FirstPage : state.auth.register
})

const mapDispatchToProps = {
    
}


// function App(props) {
//     const { t, i18n } = useTranslation();
//     const changeLanguage = (lng) => {
//         i18n.changeLanguage(lng);
//     };
//     return <React.Fragment>
//             <h1 className='d-flex justify-content-start'>{t('About us')}</h1>
//             <button type="button" onClick={() => changeLanguage('hi')}>
//           hi
//         </button>
//         <About t={t} FirstPage={props.FirstPage} />
//     </React.Fragment>
// }

export default connect(mapStateToProps, mapDispatchToProps)(About)
