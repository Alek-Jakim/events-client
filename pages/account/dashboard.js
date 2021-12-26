import Layout from "@/components/Layout"
import { parseCookies } from "@/helpers/index"
import { API_URL } from "@/config/index"
import styles from "@/styles/Dashboard.module.css"
import DashboardEvent from "@/components/DashboardEvent"
import { useRouter } from "next/router"

const DashboardPage = ({ events, token }) => {

    const router = useRouter();

    async function deleteEvent(id) {
        // window.confirm() instructs the browser to display a dialog with an optional message, and to wait until the user either confirms or cancels the dialog.
        if (confirm("Are you sure?")) {
            const res = await fetch(`${API_URL}/events/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message);
            } else {
                router.reload();
            }
        }
    }

    return (
        <Layout>
            <div className={styles.dash}>
                <h1>Dashboard</h1>
                <h3>My Events</h3>

                {events.map((event, index) => (
                    <DashboardEvent key={index} event={event} deleteEvent={deleteEvent} />
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
            events,
            token
        }
    }
}
