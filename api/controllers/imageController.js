const Image = require('../models/images');
const Business = require('../models/businesses');
const { sort } = require('../utils/sortHelper');
const {deleteFile} = require('../utils/fileDeleteHelper');
const { cloudinary } = require('../config/cloudinary');


const getAllImages = async (req, res) => {

  try {

    Image.findAll()
      .then(images => {
        res.header('Access-Control-Expose-Headers', 'X-Total-Count');
        res.header('X-Total-Count', `${images.length}`);
        let sortedImages = sort(req, images);
        res.send(sortedImages);
      })
      .catch(err => {
        console.log(err)
        res.send("Error")
      })
  } catch (e) {
    res.send(e)
  }
};

const getAllImagesByJobOwner = async (req, res) => {

  try {

    let {
      id
    } = req.payload;

    let businesses = await Business.findAll({
      where: { jobOwnerId: id },
    });

    let images = await Image.findAll({
      where: { BusinessId: businesses.map(business => business.id) },
    });
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('X-Total-Count', `${images.length}`);
    let sortedImages = sort(req, images);

    res.send(sortedImages);

  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

const getImageById = async (req, res) => {
  try {
    let {
      id
    } = req.params;

    const row = await Image.findOne({
      where: { id: id },
    });
    res.json(row);
  } catch (e) {
    res.send(e)
  }

};

const addImage = async (req, res) => {

  const imageData = req.file;
  let imageUrl = imageData.filename;

  try {

    const { data } = req.body;
    const parsedData = JSON.parse(data);

    let {
      name,
      description,
      price,
      available,
      BusinessId
    } = parsedData;

   

    if (imageData) {
      const result = await cloudinary.uploader.upload(imageData.path, {
          upload_preset: 'test_preset'
      });
      imageUrl = result.secure_url;
      deleteFile(imageData.path);
  }

    Image.create({
      name:name,
      description:description,
      price:price,
      available:available,
      imageUrl:imageUrl,
      BusinessId:BusinessId
    }).then(image => {
      res.send(image);
    }
    ).catch(err => {
      console.log("Error Here:",err);
      res.send(err.errors[0].message);
    })

  } catch (e) {
    res.status(500).send();
    console.log("Error:", e);
  }


};

const editImageById = async (req, res) => {

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

          await Image.update(
            { [key]: value }, 	// attribute
            { where: { id: id } }			// condition
          );

        output_str += `Image ${key} was updated with value ${value}\n`;
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

const deleteImageById = async (req, res) => {
  try {
    let {
      id
    } = req.params;

    const row = await Image.findOne({
      where: { id: id },
    });

    if (row) {
      await row.destroy(); // deletes the row
      res.json(row)
      console.log(`Entry for ${row.name} deleted succesfully.`);
    } else {
      res.send('Image does not exist.')
    }
  } catch (e) {
    res.send(e)
  }
};

module.exports = {
  getAllImages,
  getAllImagesByJobOwner,
  getImageById,
  addImage,
  editImageById,
  deleteImageById
};