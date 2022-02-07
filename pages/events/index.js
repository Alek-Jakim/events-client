import Layout from "@/components/Layout"
import EventItem from "@/components/EventItem"
import { API_URL, PER_PAGE } from "@/config/index"
import Pagination from "@/components/Pagination"

const EventsPage = ({ evt, page, total }) => {
    return (
        <Layout>
            <h1>Events</h1>
            {evt.length === 0 && <h3>No events at this moment</h3>}


            {evt.map(event => (
                <EventItem key={event.id} event={event} />
            ))}

            <Pagination
                page={page}
                total={total}
            />
        </Layout>
    )
}

export default EventsPage

export async function getServerSideProps({ query: { page = 1 } }) {
    // make a request to the api routes (like serverless functions)

    //const res = await fetch("/api/events") --> you can't do this, only absolute routes work

    // Calculate start page
    const start = parseInt(page) === 1 ? 0 : (parseInt(page) - 1) * PER_PAGE;

    // Fetch total/count
    const totalRes = await fetch(`${API_URL}/events/count`);

    const total = await totalRes.json();

    //Fetch events
    const eventRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`);

    const evt = await eventRes.json();

    //This will log in the terminal, not on the client since it is server side
    //console.log(evt);

    //This function must RETURN an object, otherwise it will give you an error

    return {
        props: {
            //You return the data here and you catch it above as props 

            evt,
            page: parseInt(page),
            total
        }
    }
}