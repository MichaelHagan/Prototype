const Car = require('../models/cars');
const Business = require('../models/businesses');
const { sort } = require('../utils/sortHelper');
const {deleteFile} = require('../utils/fileDeleteHelper')


const getAllCars = async (req, res) => {

  try {

    Car.findAll()
      .then(cars => {
        res.header('Access-Control-Expose-Headers', 'X-Total-Count');
        res.header('X-Total-Count', `${cars.length}`);
        let sortedCars = sort(req, cars);
        res.send(sortedCars);
      })
      .catch(err => {
        console.log(err)
        res.send("Error")
      })
  } catch (e) {
    res.send(e)
  }
};

const getAllCarsByJobOwner = async (req, res) => {

  try {

    let {
      id
    } = req.payload;

    let businesses = await Business.findAll({
      where: { jobOwnerId: id },
    });

    let cars = await Car.findAll({
      where: { BusinessId: businesses.map(business => business.id) },
    });
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', `${cars.length}`);
    let sortedCars = sort(req, cars);

    res.send(sortedCars);

  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

const getCarById = async (req, res) => {
  try {
    let {
      id
    } = req.params;

    const row = await Car.findOne({
      where: { id: id },
    });
    res.json(row);
  } catch (e) {
    res.send(e)
  }

};

const addCar = async (req, res) => {

  const imageData = req.file;
  let imageUrl = imageData.filename;

  try {

    let {
      name,
      description,
      price,
      available,
      BusinessId
    } = req.body;

    if (imageData) {
      const result = await cloudinary.uploader.upload(imageData.path, {
          upload_preset: 'test_preset'
      });
      imageUrl = result.secure_url;
      deleteFile(imageData.path);
  }

    Car.create({
      name,
      description,
      price,
      available,
      imageUrl,
      BusinessId
    }).then(car => {
      res.send(car);
    }
    ).catch(err => {
      res.send(err.errors[0].message);
    })

  } catch (e) {
    res.status(500).send();
  }


};

const editCarById = async (req, res) => {

  try {
    const { id } = req.params;
    let output_str = "";

    let collumns = [
        "name",
        "description",
        "price",
        "imageUrl",
        "available",
        "BusinessId"
    ]

    let check = true; //Will be used to res.send text if invalid or no collumn name is passed

    for (const element of collumns) {

      if (req.body.hasOwnProperty(element)) {
        check = false;
        let key = element;
        const value = req.body[key];

          await Car.update(
            { [key]: value }, 	// attribute
            { where: { id: id } }			// condition
          );

        output_str += `Car ${key} was updated with value ${value}\n`;
      }
    }

    if (check) {
      res.send("Attribute passed does not exist or null attribute passed")
    } else {
      console.log(output_str);
      res.json(req.body);
    }

  } catch (e) {
    res.send(e.message)
  }

};

const deleteCarById = async (req, res) => {
  try {
    let {
      id
    } = req.params;

    const row = await Car.findOne({
      where: { id: id },
    });

    if (row) {
      await row.destroy(); // deletes the row
      res.json(row)
      console.log(`Entry for ${row.name} deleted succesfully.`);
    } else {
      res.send('Car does not exist.')
    }
  } catch (e) {
    res.send(e)
  }
};



module.exports = {
  getAllCars,
  getAllCarsByJobOwner,
  getCarById,
  addCar,
  editCarById,
  deleteCarById
};