const router = require('express').Router();
const { AI } = require('../../models');

router.get('/:id', async (req, res)=> {
    try {

      const documentData = await AI.findOne({ where: { id : req.params.id }})
    
      const document = documentData.get({plain: true});

      console.log(document)

      res.status(200).json(document);

    } catch (err) {
      res.status(400).json(err);
      console.log("test2")
    }
    });

router.put('/:id', async (req, res) => {
  try {
    if(req.body.content){
    const documentData = await AI.update({content: req.body.content}, {
      where: {id: req.params.id}  });
      res.status(200).json(documentData);
  };

    if(req.body.title){
      const titleData = await AI.update({title: req.body.title}, {
        where: {id: req.params.id}
      } );
      res.status(200).json(titleData);
    };

    if(req.body.is_public){
      const publicData = await AI.update({is_public: req.body.is_public}, {
        where: {id: req.params.id}
      });
      res.status(200).json(publicData)
    }
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }

});

router.delete('/:id', async (req, res) => {
  try {
    const aiData = await AI.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!aiData) {
      res.status(404).json({ message: 'Nothing found with this id!' });
      return;
    }

    res.status(200).json(aiData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;