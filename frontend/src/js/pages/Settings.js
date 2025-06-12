import React, { Component } from 'react'
import 'styles/pages/Settings.css'

export default class Settings extends Component {
    render() {
        return (
            <div className='settings-background'>
                <div className='settings-box'>
                    <div className='settings-box-title'>Options</div>
                    <div className='settings-box-info'>
                        <div className='settings-box-info-details'>Notifications</div>
                        <div className='settings-box-info-details'>Terms of use</div>
                    </div>
                </div>
                <div className='settings-box'>
                    <div className='settings-box-title'>User data</div>
                    <div className='settings-box-info'>
                        <div className='settings-box-info-details'>Name: Eduardo Startari</div>
                        <div className='settings-box-info-details'>Email: edu@mail.com</div>
                    </div>
                </div>
                <div className='settings-box'>
                    <div className='settings-box-title'>APP</div>
                    <div className='settings-box-info'>
                        <div className='settings-box-info-details'>Bet APP version: 1.0</div>
                    </div>
                </div>
            </div>
        )
    }
}
