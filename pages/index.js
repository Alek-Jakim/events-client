import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"

export default function HomePage({ eventsData }) {


  console.log(eventsData);

  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {eventsData.length === 0 && <h3>No events at this moment</h3>}


      {eventsData.map(event => (
        <h3 key={event.id}>{event.name}</h3>
      ))}
    </Layout>
  )
}

export async function getStaticProps() {
  // make a request to the api routes (like serverless functions)

  //const res = await fetch("/api/events") --> you can't do this, only absolute routes work

  const res = await fetch(`${API_URL}/api/events`);

  const eventsData = await res.json();

  //This will log in the terminal, not on the client since it is server side
  //console.log(eventsData);

  //This function must RETURN an object, otherwise it will give you an error

  return {
    props: {
      //You return the data here and you catch it above as props 
      eventsData,

      //An optional amount in seconds after which a page re-generation can occur. 
      revalidate: 1
    }
  }
}