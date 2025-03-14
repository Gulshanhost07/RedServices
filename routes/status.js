const express = require("express");
const db = require("../config/db");
const router = express.Router();

router.get("/track_status", (req, res) => {
    res.render("status");
});

router.post("/track_status", (req, res) => {
    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({ error: "Phone number is required" });
    }

    const sql = "SELECT id, fullname, lost_address, luggage_details, delivery_address, status FROM lost_luggage WHERE phone = ?";
    
    db.query(sql, [phone], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "No records found for this phone number" });
        }

        res.json(results);
    });
});

module.exports = router;
