import React from 'react'
import { useRouter } from 'next/router'


const EventPage = () => {

    const router = useRouter();

    const {event_id} = router.query;


    console.log(event_id)

    return (
        <div>
            <h1>Event #{event_id}</h1>
        </div>
    )
}

export default EventPage
