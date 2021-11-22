import Layout from "@/components/Layout"
import EventItem from "@/components/EventItem"
import Link from "next/link"
import { API_URL } from "@/config/index"

export default function HomePage({ evt }) {

  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {evt.length === 0 && <h3>No events at this moment</h3>}


      {evt.map(event => (
        <EventItem key={event.id} event={event} />
      ))}

      {evt.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  // make a request to the api routes (like serverless functions)

  //const res = await fetch("/api/events") --> you can't do this, only absolute routes work

  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);

  const evt = await res.json();

  //This will log in the terminal, not on the client since it is server side
  //console.log(evt);

  //This function must RETURN an object, otherwise it will give you an error

  return {
    props: { evt },
    revalidate: 1
  }
}