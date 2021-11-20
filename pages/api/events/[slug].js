//If it was an ID we are looking for, it would be called [id].js, not slug

const { events } = require("./data.json");

export default function handler(req, res) {

    const slug = req.query.slug;

    const evt = events.filter(event => event.slug === slug);

    if (req.method === "GET") {
        res.status(200).json(evt)
    } else {
        //response.setHeader() allows you only to set a singular header.
        res.setHeader("Allow", ["GET"]);
        // 405 means the server has rejected the specific HTTP method hence, not allowed
        res.status(405).json({
            message: `Method ${req.method} is not allowed.`
        })
    }
}
