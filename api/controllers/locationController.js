const Location = require('../models/locations');
const { sort } = require('../utils/sortHelper');


const getAllLocations = async (req, res) => {

  try {

    Location.findAll()
      .then(locations => {
        res.header('Access-Control-Expose-Headers', 'X-Total-Count');
        res.header('X-Total-Count', `${locations.length}`);
        let sortedLocations = sort(req, locations);
        res.send(sortedLocations);
      })
      .catch(err => {
        console.log(err)
        res.send("Error")
      })
  } catch (e) {
    res.send(e)
  }
};

const getLocationById = async (req, res) => {
  try {
    let {
      id
    } = req.params;

    const row = await Location.findOne({
      where: { id: id },
    });
    res.json(row);
  } catch (e) {
    res.send(e)
  }

};

const addLocation = async (req, res) => {

  try {

    let {
    location
    } = req.body;

    Location.create({
        location
    }).then(location => {
      res.send(location);
    }
    ).catch(err => {
      res.send(err.errors[0].message);
    })

  } catch (e) {
    res.status(500).send();
  }


};

const editLocationById = async (req, res) => {

  try {
    const { id } = req.params;
    let output_str = "";

    let collumns = [
        "location"
    ]

    let check = true; //Will be used to res.send text if invalid or no collumn name is passed

    for (const element of collumns) {

      if (req.body.hasOwnProperty(element)) {
        check = false;
        let key = element;
        const value = req.body[key];

          await Location.update(
            { [key]: value }, 	// attribute
            { where: { id: id } }			// condition
          );

        output_str += `Location ${key} was updated with value ${value}\n`;
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

const deleteLocationById = async (req, res) => {
  try {
    let {
      id
    } = req.params;

    const row = await Location.findOne({
      where: { id: id },
    });

    if (row) {
      await row.destroy(); // deletes the row
      res.json(row)
      console.log(`Entry for ${row.name} deleted succesfully.`);
    } else {
      res.send('Location does not exist.')
    }
  } catch (e) {
    res.send(e)
  }
};



module.exports = {
  getAllLocations,
  getLocationById,
  addLocation,
  editLocationById,
  deleteLocationById
};