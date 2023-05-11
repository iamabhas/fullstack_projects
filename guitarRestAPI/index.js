const express = require("express");
const Joi = require("joi");
const guitars = require("./dummyData");

const app = express();

//middleware
app.use(express.static("./public"));
app.use(express.json());

const cannotGetJson = {
  success: false,
  data: [],
};

// get all guitars and query guitar type
app.get("/api/guitars", (req, res) => {
  const guitarType = req.query.type?.toUpperCase();

  if (!guitarType) {
    return res.status(200).json({ success: true, data: guitars });
  }

  const guitarTypes = guitars.filter((guitar) => {
    return guitar.type === guitarType;
  });

  if (!guitarTypes.length) {
    return res
      .status(400)
      .json({ success: false, error: "No guitars found with the given type" });
  }
  res.status(200).json(guitarTypes);
});

//get guitar by id
app.get("/api/guitars/:id", (req, res) => {
  const guitarId = req.params.id;
  const singleGuitar = guitars.filter((guitar) => {
    return guitar.id === Number(guitarId);
  });
  if (!singleGuitar.length) {
    res.status(400).json(cannotGetJson);
  }
  return res.status(200).json(singleGuitar);
});

//get guitar by type and id
app.get("/api/guitars/type/:type/:id", (req, res) => {
  const guitarType = req.params.type.toUpperCase();
  const guitarId = req.params.id;
  const singleGuitarTypes = guitars.filter((guitar) => {
    return guitar.type === guitarType && guitar.id === Number(guitarId);
  });
  if (!singleGuitarTypes.length) {
    res.status(404).json(cannotGetJson);
  }
  return res.status(200).json(singleGuitarTypes);
});

//validation using joi
const schemaValidation = (guitar) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    price: Joi.number().required(),
    type: Joi.string().min(1).uppercase().required(),
  });

  return schema.validate(guitar);
};

//post a guitar
app.post("/api/guitars", (req, res) => {
  const { error } = schemaValidation(req.body);
  if (error) {
    res.status(400).json({ success: true, error: error });
  }
  const guitar = {
    id: guitars.length + 1,
    name: req.body.name,
    price: req.body.price,
    type: req.body.type,
  };

  guitars.push(guitar);
  return res.json(guitar);
});

//update a guitar
app.put("/api/guitars/:id", (req, res) => {
  const guitarId = req.params.id;
  const singleGuitar = guitars.filter((guitar) => {
    return guitar.id === Number(guitarId);
  })[0];
  if (!singleGuitar) {
    return res
      .status(400)
      .json({ success: false, error: "No guitar found with given id" });
  }

  const { error } = schemaValidation(req.body);
  if (error) {
    res.status(400).json({ success: true, error: error });
  }
  Object.assign(singleGuitar, req.body);

  res.json(singleGuitar);
});

//delete a guitar
app.delete("/api/guitars/:id", (req, res) => {
  const guitarId = req.params.id;
  const singleGuitar = guitars.filter((guitar) => {
    return guitar.id === Number(guitarId);
  });
  if (!singleGuitar.length) {
    return res
      .status(400)
      .json({ success: false, error: "No guitar found with given id" });
  }
  const index = guitars.indexOf(singleGuitar);
  guitars.splice(index, 1);

  res.json(singleGuitar[0]);
});

//Invalid url
app.all("*", (req, res) => {
  res.status(404).json(cannotGetJson);
});

//PORT
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
