import Layout from "@/components/Layout"
import { parseCookies } from "@/helpers/index"
import { API_URL } from "@/config/index"
import styles from "@/styles/Dashboard.module.css"
import DashboardEvent from "@/components/DashboardEvent"

const DashboardPage = ({ events }) => {


    const handleDeleteEvent = (id) => {
        console.log(id);
    }

    return (
        <Layout>
            <div className={styles.dash}>
                <h1>Dashboard</h1>
                <h3>My Events</h3>

                {events.map((event, index) => (
                    <DashboardEvent key={index} event={event} handleDeleteEvent={handleDeleteEvent} />
                ))}
            </div>
        </Layout>
    )
}

export default DashboardPage


export async function getServerSideProps({ req }) {
    const { token } = parseCookies(req);

    const res = await fetch(`${API_URL}/events/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const events = await res.json();

    return {
        props: {
            events
        }
    }
}
