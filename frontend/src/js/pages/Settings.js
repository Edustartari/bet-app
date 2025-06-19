import React, { useEffect, useState } from 'react'
import 'styles/pages/Settings.css'
import LoadingComponent from '../components/LoadingComponent.js'
import { Link } from "react-router-dom";
import { update } from "../redux_folder/global_reducer.js";
import { useSelector, useDispatch } from 'react-redux';

const Settings = (props) => {
    const state = useSelector(state => state.global)
    const dispatch = useDispatch()

    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);    

    useEffect(() => {
        let user_info = {}
        if(!state || !state.user_info || Object.keys(state.user_info).length === 0) {
            const fetch_data = async () => {
                try {
                    let response = await fetch('/settings');
                    if(response.status === 200){
                        let data = await response.json();
                        setUserInfo(data.user_info);
                        dispatch(update({key: 'user_info', value: data.user_info}));
                    }
                } catch (error) {
                } finally {
                    setLoading(false);
                }
            }
            fetch_data()
        } else {
            user_info = state.user_info;
            setUserInfo(state.user_info);
            setLoading(false);
        }
    }, [])

    return (
        <>
			{loading && <LoadingComponent />}
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
        </>
    )
}

export default Settings;