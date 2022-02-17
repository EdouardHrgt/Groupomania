
//--> MAJ et suppression img
// supprimer l'ancienne image si une nouvelle est reçue
if (req.file) {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    const fileName = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${fileName}`, (err) => {
      if (err) console.log(err);
      else {
        console.log('Image supprimée: ' + fileName);
      }
    });
  });
}
