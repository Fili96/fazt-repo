const express = require('express');
const router = express.Router();

// Referencia a la base de datos (db == pool)
const pool = require('../database');

router.get("/add", (req, res) =>{
    res.render("links/add")
});

router.post("/add", async (req, res) =>{
    const { title, description, url } = req.body

    const newLink = { 
        title,
        description,
        url
    }
    
    await pool.query("INSERT INTO links set ?", [newLink])
    req.flash('success', 'Link Saved Successfully');
    res.redirect("/links")
})

router.get("/", async (req, res) =>{
    const links = await pool.query("SELECT * FROM links");
    res.render("links/list", {links})
})

router.get("/delete/:id", async (req, res) =>{
    const { id } = req.params
    if (id) {
        await pool.query("DELETE FROM links WHERE id = ?", [id]);
        req.flash('success', 'Link deleted Successfully');
        res.redirect("/links")
    }
})

router.get("/edit/:id", async (req, res) =>{
    const { id } = req.params
    
    if (id) {
        const links = await pool.query("SELECT * FROM links WHERE id = ?", [id]);
        res.render("links/edit", {link: links[0]})
    }

    else {
        res.redirect("/links")
    }
})

router.post("/edit/:id", async (req, res) =>{
    const { id } = req.params
    const { title, description, url } = req.body
    const updateLink = {
        title,
        description,
        url
    }

    if (id) {
        await pool.query("UPDATE links set ? WHERE id = ?", [updateLink, id])
        req.flash('success', 'Link update Successfully');
    }

    res.redirect("/links")
})

module.exports = router;