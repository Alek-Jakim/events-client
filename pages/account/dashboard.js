import Layout from "@/components/Layout"
import { parseCookies } from "@/helpers/index"
import { API_URL } from "@/config/index"

const DashboardPage = ({ events }) => {

    console.log(events);

    return (
        <Layout>
            Dashboard
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
