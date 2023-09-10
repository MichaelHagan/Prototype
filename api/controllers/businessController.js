const Business = require('../models/businesses');
const { sort } = require('../utils/sortHelper');


const getAllBusinesses = async (req, res) => {

  try {

    Business.findAll()
      .then(businesses => {
        res.header('Access-Control-Expose-Headers', 'X-Total-Count');
        res.header('X-Total-Count', `${businesses.length}`);
        let sortedBusinesses = sort(req, businesses);
        res.send(sortedBusinesses);
      })
      .catch(err => {
        console.log(err)
        res.send("Error")
      })
  } catch (e) {
    res.send(e)
  }
};

const getAllBusinessesByJobOwner = async (req, res) => {

  try {

    let {
      id
    } = req.payload;

    let businesses = await Business.findAll({
      where: { jobOwnerId: id },
    });
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', `${businesses.length}`);
    let sortedBusinesses = sort(req, businesses);

    res.send(sortedBusinesses);

  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

const getBusinessById = async (req, res) => {
  try {
    let {
      id
    } = req.params;

    const row = await Business.findOne({
      where: { id: id },
    });
    res.json(row);
  } catch (e) {
    res.send(e)
  }

};

const addBusiness = async (req, res) => {

  try {

    let {
      name,
      description,
      available,
      LocationId,
      jobOwnerId,
      isJobOwner
    } = req.body;

    let ownerId = isJobOwner?req.payload.id:jobOwnerId;

    Business.create({
      name,
      description,
      available,
      LocationId,
      jobOwnerId:ownerId

    }).then(business => {
      res.send(business);
    }
    ).catch(err => {
      res.send(err.errors[0].message);
    })

  } catch (e) {
    res.status(500).send();
  }


};

const editBusinessById = async (req, res) => {

  try {
    const { id } = req.params;
    let output_str = "";

    let collumns = [
      "name",
      "description",
      "available",
      "LocationId",
      "jobOwnerId"
    ]

    let check = true; //Will be used to res.send text if invalid or no collumn name is passed

    for (const element of collumns) {

      if (req.body.hasOwnProperty(element)) {
        check = false;
        let key = element;
        const value = req.body[key];

          await Business.update(
            { [key]: value }, 	// attribute
            { where: { id: id } }			// condition
          );

        output_str += `Business ${key} was updated with value ${value}\n`;
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

const deleteBusinessById = async (req, res) => {
  try {
    let {
      id
    } = req.params;

    const row = await Business.findOne({
      where: { id: id },
    });

    if (row) {
      await row.destroy(); // deletes the row
      res.json(row)
      console.log(`Entry for ${row.name} deleted succesfully.`);
    } else {
      res.send('Business does not exist.')
    }
  } catch (e) {
    res.send(e)
  }
};



module.exports = {
  getAllBusinesses,
  getAllBusinessesByJobOwner,
  getBusinessById,
  addBusiness,
  editBusinessById,
  deleteBusinessById
};