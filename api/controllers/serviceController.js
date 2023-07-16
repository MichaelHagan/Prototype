const Service = require('../models/services');
const Business = require('../models/businesses');
const { sort } = require('../utils/sortHelper');


const getAllServices = async (req, res) => {

  try {

    Service.findAll()
      .then(services => {
        res.header('Access-Control-Expose-Headers', 'X-Total-Count');
        res.header('X-Total-Count', `${services.length}`);
        let sortedServices = sort(req, services);
        res.send(sortedServices);
      })
      .catch(err => {
        console.log(err)
        res.send("Error")
      })
  } catch (e) {
    res.send(e)
  }
};

const getAllServicesByJobOwner = async (req, res) => {

  try {

    let {
      jobOwnerId
    } = req.params;

    let businesses = Business.findAll({
      where: { jobOwnerId: jobOwnerId },
    });

    let services = Service.findAll({
      where: { businessId: businesses.map(business => business.id) },
    });
    
    let sortedServices = sort(req, services);

    res.send(sortedServices);

  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

const getServiceById = async (req, res) => {
  try {
    let {
      id
    } = req.params;

    const row = await Service.findOne({
      where: { id: id },
    });
    res.json(row);
  } catch (e) {
    res.send(e)
  }

};

const addService = async (req, res) => {

  try {

    let {
      name,
      description,
      available
    } = req.body;

    Service.create({
      name,
      description,
      price,
      available,
      category
    }).then(service => {
      res.send(service);
    }
    ).catch(err => {
      res.send(err.errors[0].message);
    })

  } catch (e) {
    res.status(500).send();
  }


};

const editServiceById = async (req, res) => {

  try {
    const { id } = req.params;
    let output_str = "";

    let collumns = [
        "name",
        "description",
        "price",
        "available",
        "category"
    ]

    let check = true; //Will be used to res.send text if invalid or no collumn name is passed

    for (const element of collumns) {

      if (req.body.hasOwnProperty(element)) {
        check = false;
        let key = element;
        const value = req.body[key];

          await Service.update(
            { [key]: value }, 	// attribute
            { where: { id: id } }			// condition
          );

        output_str += `Service ${key} was updated with value ${value}\n`;
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

const deleteServiceById = async (req, res) => {
  try {
    let {
      id
    } = req.params;

    const row = await Service.findOne({
      where: { id: id },
    });

    if (row) {
      await row.destroy(); // deletes the row
      res.json(row)
      console.log(`Entry for ${row.name} deleted succesfully.`);
    } else {
      res.send('Service does not exist.')
    }
  } catch (e) {
    res.send(e)
  }
};



module.exports = {
  getAllServices,
  getAllServicesByJobOwner,
  getServiceById,
  addService,
  editServiceById,
  deleteServiceById
};