import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import styles from "@/styles/Event.module.css"
import Link from "next/link"
import Image from "next/image"
import { FaPencilAlt, FaTimes } from "react-icons/fa"
import EventMap from "@/components/EventMap"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router"


const EventPage = ({ evt }) => {


    // See http://localhost:1337/events
    return (
        <Layout>
            <div className={styles.event}>
                {/* This is no longer necessary since you can edit and delete from the dashboard of the signed in user

                <div className={styles.controls}>
                    <Link href={`/events/edit/${evt.id}`}>
                        <a>
                            <FaPencilAlt /> Edit Event
                        </a>
                    </Link>
                    <a href="#" className={styles.delete} onClick={deleteEvent}>
                        <FaTimes /> Delete Event
                    </a>
                </div>
            */}
                <span>
                    {new Date(evt.date).toLocaleDateString("en-US")} at {evt.time}
                </span>

                <h1>{evt.name}</h1>
                <ToastContainer />
                {evt.image && (
                    <div className={styles.image}>
                        <Image
                            src={!evt.image.formats.medium.url ? evt.image.formats.thumbnail.url : evt.image.formats.medium.url}
                            width={960}
                            height={600} />
                    </div>
                )}

                <h3>Performers:</h3>
                <p>{evt.performers}</p>
                <h3>Description:</h3>
                <p>{evt.description}</p>
                <h3>Venue: {evt.venue}</h3>
                <p>{evt.address}</p>

                {/* THERE WILL BE A MAP HERE, MARK MY WORDS */}
                <EventMap evt={evt} />

                <Link href="/events">
                    <a className={styles.back}>{"<"} Go Back</a>
                </Link>
            </div>
        </Layout>
    )
}

export default EventPage



// export async function getStaticPaths() {
//     const res = await fetch(`${API_URL}/events`);

//     const events = await res.json();


//     const paths = events.map(evt => ({
//         params: { slug: evt.slug }
//     }))


//     return {
//         paths,
//         fallback: true
//     }

// }


// export async function getStaticProps({ params: { slug } }) {
//     const res = await fetch(`${API_URL}/events?slug=${slug}`)
//     const events = await res.json();

//     return {
//         props: {
//             evt: events[0]
//         },
//         revalidate: 1
//     }
// }


export async function getServerSideProps({ query: { slug } }) {
    const res = await fetch(`${API_URL}/events?slug=${slug}`)
    const events = await res.json()

    return {
        props: {
            evt: events[0]
        },
    }
}