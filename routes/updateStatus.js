const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.post("/update_status", (req, res) => {
    const { id, status } = req.body;

    if (!id || !status) {
        return res.status(400).json({ message: "Invalid request data" });
    }

    const sql = "UPDATE lost_luggage SET status = ? WHERE id = ?";
    db.query(sql, [status, id], (err, result) => {
        if (err) {
            console.error("Database error:", err.message);
            return res.status(500).json({ message: "Failed to update status" });
        }

        res.json({ message: "Status updated successfully" });
    });
});

module.exports = router;
