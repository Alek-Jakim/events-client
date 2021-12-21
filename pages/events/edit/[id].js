import moment from "moment"
import Layout from "@/components/Layout"
import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { API_URL } from "@/config/index"
import styles from "@/styles/Form.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditEventPage = ({ evt }) => {

    const [values, setValues] = useState({
        name: evt.name,
        performers: evt.performers,
        venue: evt.venue,
        address: evt.address,
        date: evt.date,
        time: evt.time,
        description: evt.description
    });

    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        //Spread the rest of the values so you only change the one you're targeting (the one you get from the name attribute)
        setValues({ ...values, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form validation

        //If there are any empty fields, it will return true
        const hasEmptyFields = Object.values(values).some((element) => element === "");

        if (hasEmptyFields) {
            toast.error("Please fill in all fields!");
        } else {
            const res = await fetch(`${API_URL}/events/${evt.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });

            if (!res.ok) {
                toast.error("Something went wrong! Not a very helpful message, I know...")
            } else {
                const evt = await res.json();
                router.push(`/events/${evt.slug}`);
            }
        }
    }

    return (
        <Layout title="Add New Event">
            <Link href="/events">Go Back</Link>
            <h1>Edit Event</h1>
            <ToastContainer
                position="top-center"
                autoClose={500000}
                hideProgressBar={true}
                draggable
            />
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor='name'>Event Name</label>
                        <input type='text' id='name' name='name' value={values.name} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor='performers'>Performers</label>
                        <input
                            type='text'
                            name='performers'
                            id='performers'
                            value={values.performers}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='venue'>Venue</label>
                        <input
                            type='text'
                            name='venue'
                            id='venue'
                            value={values.venue}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='address'>Address</label>
                        <input
                            type='text'
                            name='address'
                            id='address'
                            value={values.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='date'>Date</label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            value={moment(values.date).format('yyyy-MM-DD')}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='time'>Time</label>
                        <input
                            type='text'
                            name='time'
                            id='time'
                            value={values.time}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor='description'>Event Description</label>
                    <textarea
                        type='text'
                        name='description'
                        id='description'
                        value={values.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <input type="submit" value="Update Event" className="btn" />
            </form>
        </Layout>
    )
}

export default EditEventPage


export async function getServerSideProps({ params: { id } }) {
    const res = await fetch(`${API_URL}/events/${id}`);

    const evt = await res.json();

    return {
        props: {
            evt
        }
    }
}