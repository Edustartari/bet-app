// Return a custom hook that fetches poll info based on the given hash_id

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { update } from '../redux_folder/global_reducer.js';

const useFetchPollInfo = (poll_hash_id) => {
    console.log('')
    console.log('useFetchPollInfo: ', poll_hash_id)
    const state = useSelector(state => state.global);
    const { poll_dict } = state;
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('useEffect');
        const fetch_data = async () => {
            console.log('fetch_data');
            try {
                let response = await fetch('/poll-info', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ hash_id: poll_hash_id }),
                });
                if(response.status === 200){
                    let data = await response.json();
                    console.log('Fetched poll data:', data);
                    dispatch(update({key: 'poll_dict', value: data.poll_dict}));
                }
            } catch (error) {
            } finally {
                setLoading(false);
            }
        }
        // Check if polldict is not a empty object and has the same hash_id
        console.log('poll_dict: ', poll_dict);
        console.log('poll_hash_id: ', poll_hash_id);

        if(!poll_dict || poll_dict.hash_id !== poll_hash_id) {
            fetch_data();
        } else {
            setLoading(false);
        }
    }, [poll_hash_id])

    return { loading, poll_dict };
}

export default useFetchPollInfo;
