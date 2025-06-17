import React, { Component, useEffect } from 'react'
import 'styles/pages/Settings.css'

const Settings = (props) => {
	console.log('Settings component props:', props);

    useEffect(() => {
        const fetch_data = async () => {
            try {
                let response = await fetch('/settings');
                console.log('response:', response);
                if(response.status === 200){
                    let data = await response.json();
                    console.log('Fetched data:', data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetch_data()
    }, [])

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

export default Settings;