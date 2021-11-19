# Project Notes


## Creating a Next app

```bash
npx create-next-app app-name
```

Everything in the public dir can be accessed in the browser url, for example:
http://localhost:3000/favicon.ico

Styling can be done through the module system

## Pages & Routing

Next.js has a file-system based router built on the concept of pages.

When a file is added to the pages directory, it's automatically available as a route.

For example: main_dir/pages/about.js  --->  http://localhost:3000/about

If you make a folder inside the pages directory, called (for example) events with an index.js file inside, the url would still be ---> http://localhost:3000/events   (main_dir/pages/events/index.js). This is good for nesting routes. If we want to add an Add Event Page, we would simply create a add.js file inside the pages dir:
http://localhost:3000/events/add

### Dynamic Routes

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