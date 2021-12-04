import Layout from "@/components/Layout"
import Link from "next/link"
import { useRouter } from "next/router"
import EventItem from "@/components/EventItem"
import { API_URL } from "@/config/index"
import qs from "qs"

const SearchPage = ({ evt }) => {

    const router = useRouter();

    return (
        <Layout title="Search Results">
            <Link href="/events">Go Back</Link>
            <h1>Search Results for {router.query.term}</h1>
            {evt.length === 0 && <h3>No events at this moment</h3>}


            {evt.map(event => (
                <EventItem key={event.id} event={event} />
            ))}


        </Layout>
    )
}

export default SearchPage

export async function getServerSideProps({ query: { term } }) {

    // Use getServerSideProps because you never know what somebody will search for
    const query = qs.stringify({
        _where: {
            _or: [
                { name_contains: term },
                { performers_contains: term },
                { description_contains: term },
                { venue_contains: term }
            ]
        }
    })

    const res = await fetch(`${API_URL}/events?${query}`);

    const evt = await res.json();


    return {
        props: {
            //You return the data here and you catch it above as props 
            evt,
        }
    }
}