const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.post("/lost_luggage", (req, res) => {
    const { fullname, lost_address, luggage_details, delivery_address, phone } = req.body;

    if (!fullname || !lost_address || !luggage_details || !delivery_address || !phone) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO lost_luggage (fullname, lost_address, luggage_details, delivery_address, phone, created_at) VALUES (?, ?, ?, ?, ?, NOW())";

    db.query(sql, [fullname, lost_address, luggage_details, delivery_address, phone], (err, result) => {
        if (err) {
            console.error("Error inserting data: " + err.message);
            return res.status(500).json({ error: "Database error" });
        }

        res.render("thankyou", { fullname });
    });
});

module.exports = router;
