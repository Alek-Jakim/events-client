# Project Notes


## Creating a Next app

```bash
npx create-next-app app-name
```

Everything in the public dir can be accessed in the browser url, for example:
http://localhost:3000/favicon.ico

Styling can be done through the module system

---

## Pages & Routing

Next.js has a file-system based router built on the concept of pages.

When a file is added to the pages directory, it's automatically available as a route.

For example: main_dir/pages/about.js  --->  http://localhost:3000/about

If you make a folder inside the pages directory, called (for example) events with an index.js file inside, the url would still be ---> http://localhost:3000/events   (main_dir/pages/events/index.js). This is good for nesting routes. If we want to add an Add Event Page, we would simply create a add.js file inside the pages dir:
http://localhost:3000/events/add

---

### Dynamic Routes & Router

In Next.js you can add brackets to a page ([param]) to create a dynamic route (a.k.a. url slugs, pretty urls, and others).

```javascript
import { useRouter } from 'next/router'

const EventPage = () => {

    const router = useRouter();

    const {event_id} = router.query;

    return (
        <div>
            <h1>Event #{event_id}</h1>
        </div>
    )
}

export default EventPage
```

If the url is `http://localhost:3000/events/event?event_id=2`, then it would display Event #2.

---

### Next Link

Client-side transitions between routes can be enabled via the `Link` component exported by `next/link`.



```javascript
import Link from 'next/link'

function Home() {
  return (
    <ul>
      <li>
        <Link href="/">
        {/*if you want to add styles, you need to include an anchor tag inside the Link tag, otherwise it is not necessary*/}
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>About Us</a>
        </Link>
      </li>
      <li>
        <Link href="/blog/hello-world">
          <a>Blog Post</a>
        </Link>
      </li>
    </ul>
  )
}

export default Home
```

---

## Head Tags & Layout

Next has a built-in component for appending elements to the `head` of the page.

To avoid duplicate tags in your `head` you can use the `key` property.

```javascript
import Head from 'next/head'

function IndexPage() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <p>Hello world!</p>
    </div>
  )
}

export default IndexPage
```

A good way to structure the layout is:

```javascript
//client_dir/components/Layout.js
import Head from "next/head"

const Layout = ({title, keywords, description, children}) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
            </Head>
            {children}
        </div>
    )
}


Layout.defaultProps = {
    title: "DJ Events | Find the hottest parties",
    description: "Find the latest DJ and other musical events",
    keywords: "music, dj, edm, events"
}

export default Layout
```

and then include it into the HomePage:

```javascript
import Layout from "../components/Layout"

export default function HomePage() {
  return (
    <Layout>
      <h1>Home Page</h1>
    </Layout>
  )
}
```