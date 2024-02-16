var express = require('express');
const Tweet = require('../models/tweets');
var router = express.Router();
require('../models/connection');



function trouverHashtags(chaine) {
    // Expression régulière pour identifier les mots précédés d'un hashtag
    const regex = /#\w+/g;
  
    // Utilisation de la méthode match pour trouver tous les hashtags dans la chaîne
    const hashtagsTrouves = chaine.match(regex);
  
    // Vérification si des hashtags ont été trouvés
    if (hashtagsTrouves) {
      return hashtagsTrouves;
    } else {
      return [];
    }
  }

  

router.post('/newTweet', (req, res) => {
        const like = [];
        const newDate = new Date;
        const hashtag = trouverHashtags(req.body.content);
        const newTweet = new Tweet({
            content : req.body.content,
            username : req.body.username,
            like : like,
            date : newDate,
            hashtag: hashtag,
        })
        newTweet.save().then(() => {
            Tweet.find().then( data =>{
                res.json(data)
                console.log(data);
            })
        })
});
router.delete('/deleteTweet', (req, res) => {
    const tweetId = req.body._id; // Corrected from req.params.tweetId

    Tweet.deleteOne({ _id: tweetId })
        .then(result => {
            if (result > 0) {
                res.json({ message: "Tweet supprimé avec succès." });
            } else {
                res.json({ error: "Tweet non trouvé." });
            }
        })
        
});


router.get('/displayTweetList', (req, res) => {
    Tweet.find().then(data => {
        if (data.length === 0) {
            res.json({ result: 'Liste de tweet vide' });
        } else {
            res.json({ result: true, data: data });
        }
    }).catch(err => {
        console.error("Error fetching tweets:", err);
        res.status(500).json({ error: "Error fetching tweets" });
    });
});
//route qui permet d'afficher la liste des utilisateurs
router.get('/listOfUsers', (req, res) => {
    User.find().then(data => {
        if (data.length === 0) {
            res.json({ result: 'Liste de Users vide' });
        } else {
            res.json({ result: true, data: data });
        }
    }).catch(err => {
        console.error("Error fetching tweets:", err);
        res.status(500).json({ error: "Error fetching tweets" });
    });
  });
  
module.exports = router;
