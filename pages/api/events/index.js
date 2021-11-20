const { events } = require("./data.json");

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(events)
  } else {
    //response.setHeader() allows you only to set a singular header.
    res.setHeader("Allow", ["GET"]);
    // 405 means the server has rejected the specific HTTP method hence, not allowed
    res.status(405).json({
      message: `Method ${req.method} is not allowed.`
    })
  }
}
