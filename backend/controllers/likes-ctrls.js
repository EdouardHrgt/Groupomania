exports.likes = (req, res, next) => {
  console.log(req);
  // Check en DB si on a deja un like qui a la même userID et postID que la requete reçue
  const userId = req.body.userId;
  const postId = req.params.postId;
  db.query(
    `SELECT * FROM likes WHERE userID=${userId} AND postId=${postId}`,
    (err, result, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      console.log(result);
      return res.status(200).json(result);
    }
  );
};
