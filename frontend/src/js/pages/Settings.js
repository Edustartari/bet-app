import React, { useEffect, useState } from 'react'
import 'styles/pages/Settings.css'
import LoadingComponent from '../components/LoadingComponent.js'
import { Link } from "react-router-dom";

const Settings = (props) => {
	console.log('Settings component props:', props);

    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);    

    useEffect(() => {
        const fetch_data = async () => {
            try {
                let response = await fetch('/settings');
                console.log('response:', response);
                if(response.status === 200){
                    let data = await response.json();
                    console.log('Fetched data:', data);
                    setUserInfo(data.user_info);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetch_data()
    }, [])

    if (loading) {
        return <LoadingComponent />
    }

    return (
        <div className='settings-background'>
            <div className='settings-box'>
                <div className='settings-box-title'>Options</div>
                <div className='settings-box-info'>
                    <div className='settings-box-info-details'>Notifications</div>
                    <Link to="/terms">
                        <div className='settings-box-info-details'>
                            Terms of use
                        </div>
                    </Link>
                </div>
            </div>
            <div className='settings-box'>
                <div className='settings-box-title'>User data</div>
                <div className='settings-box-info'>
                    <div className='settings-box-info-details'>Name: {userInfo?.name || ''}</div>
                    <div className='settings-box-info-details'>Email: {userInfo?.email || ''}</div>
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