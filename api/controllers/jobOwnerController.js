require('dotenv').config();
const jwt = require('jsonwebtoken');
const JobOwner = require('../models/jobOwners');
const bcrypt = require('bcrypt');
const { sort } = require('../utils/sortHelper');


const getAllJobOwners = async (req, res) => {

  try {

    JobOwner.findAll()
      .then(jobOwners => {
        res.header('Access-Control-Expose-Headers', 'X-Total-Count');
        res.header('X-Total-Count', `${jobOwners.length}`);
        let sortedJobOwners = sort(req, jobOwners);
        res.send(sortedJobOwners);
      })
      .catch(err => {
        console.log(err)
        res.send("Error")
      })
  } catch (e) {
    res.send(e)
  }
};

const getJobOwnerById = async (req, res) => {
  try {
    let {
      id
    } = req.params;

    const row = await JobOwner.findOne({
      where: { id: id },
    });
    res.json(row);
  } catch (e) {
    res.send(e)
  }

};

const addJobOwner = async (req, res) => {

  try {

    let {
      name,
      email,
      phone_number,
      password,
    } = req.body;

    let hashedPassword = await bcrypt.hash(password, 10);

    JobOwner.create({
      name,
      email: email.toLowerCase(),
      phone_number,
      password: hashedPassword,
    }).then(jobOwner => {
      res.send(jobOwner);
    }
    ).catch(err => {
      res.send(err.errors[0].message);
    })

  } catch (e) {
    res.status(500).send();
  }


};

const jobOwnerLogin = async (req, res) => {
  try {
    let {
      email,
      number,
      password
    } = req.body;

    const row = email ? await JobOwner.findOne({
      where: {
        email: email.toLowerCase()
      },
    }) : await JobOwner.findOne({
      where: {
        phone_number: number
      },
    });

    if (!row) {
      return res.status(400).send("JobOwner not found");
    }

    if (await bcrypt.compare(password, row.password)) {
      const user = {
        id: row.id,
        name: row.name
      }
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '6h' })

      res.json({ accessToken: accessToken, name: row.name });
    } else {
      res.status(401).send(`Wrong Password`);
    }

  } catch (e) {
    console.log(e)
  }

};

const editJobOwnerById = async (req, res) => {

  try {
    const { id } = req.params;
    let output_str = "";

    let collumns = [
      "name",
      "email",
      "phone_number",
      "password",
    ]

    let check = true; //Will be used to res.send text if invalid or no collumn name is passed

    for (const element of collumns) {

      if (req.body.hasOwnProperty(element)) {
        check = false;
        let key = element;
        const value = req.body[key];

        if (key == "password") {
          //skip password update if password is unchanged
          const user = await JobOwner.findOne({
            where: { id: id },
          });
          if (user.password === value) continue;

          let hashedPassword = await bcrypt.hash(value, 10); //hash password

          await JobOwner.update(
            { [key]: hashedPassword }, 	// attribute
            { where: { id: id } }			// condition
          );
        } else {
          await JobOwner.update(
            { [key]: value }, 	// attribute
            { where: { id: id } }			// condition
          );
        }

        output_str += `JobOwner ${key} was updated with value ${value}\n`;
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

const deleteJobOwnerById = async (req, res) => {
  try {
    let {
      id
    } = req.params;

    const row = await JobOwner.findOne({
      where: { id: id },
    });

    if (row) {
      await row.destroy(); // deletes the row
      res.json(row)
      console.log(`Entry for ${row.name} deleted succesfully.`);
    } else {
      res.send('JobOwner does not exist.')
    }
  } catch (e) {
    res.send(e)
  }
};



module.exports = {
  getAllJobOwners,
  getJobOwnerById,
  addJobOwner,
  jobOwnerLogin,
  editJobOwnerById,
  deleteJobOwnerById
};