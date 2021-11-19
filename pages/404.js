import Layout from "@/components/Layout"
import styles from "@/styles/404.module.css"
import Link from "next/link"

//Icons
import {FaExclamationTriangle} from "react-icons/fa"

const NotFoundPage = () => {
    return (
        <Layout title="404: Page Not Found">
            <div className={styles.error}>
                <h1><FaExclamationTriangle />  404</h1>
                <h4>Sorry, the page that you were looking for doesn't exist.</h4>
                <Link href="/">Go Back to Home Page</Link>
            </div>
        </Layout>
    )
}

export default NotFoundPage
