const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("home", { 
    pageTitle: "My Home :-)",
    url: '/'
});
});

module.exports = router;
