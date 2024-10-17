/**
 * All the functions for interacting with user data in the MongoDB database
 */
import { hash } from 'bcrypt';
import {Toxic} from '../models/toxicuser.model';


/**
 * Creates a new user in the database.
 * @param firstName - string representing the first name of the user
 * @param lastName - string representing the last name of the user
 * @returns The created {@link User}
 */
const createPerson = async (
  firstName: string,
  lastName: string,
  nameEmoji: string,
  year: Number,
  hometown: string,
  // major: string,
  birthday: string,
  toxicTraits: [String],
  // photo: string
) => {
  const newPerson = new Toxic({
    firstName,
    lastName,
    nameEmoji,
    year,
    hometown,
    // major, 
    birthday,
    toxicTraits,
    // photo

  });
  const person = await newPerson.save();
  return person;
};

/**
 * Gets a user from the database by their email but doesn't include the
 * password in the returned user.
 * @param email The email of the user to get
 * @returns The {@link User} or null if the user was not found.
 */
const getPersonByName = async (firstname: string, lastname: string) => {
  const user = await Toxic.findOne({firstname,lastname})
    .exec();
  return user;
};



/**
 * Gets a user from the database by their id but doesn't include the
 * password in the returned user.
 * @param id The id of the user to get.
 * @returns The {@link User} or null if the user was not found.
 */
const getPersonById = async (id: string) => {
  const user = await Toxic.findById(id).exec();
  return user;
};

/**
 * @returns All the {@link User}s in the database without their passwords.
 */
const getAllPersonsFromDB = async () => {
  const userList = await Toxic.find({}).exec();
  return userList;
};


/**
 * A function that deletes a user from the database.
 * @param id The id of the user to delete.
 * @returns The deleted {@link User}
 */
const deletePersonById = async (id: string) => {
  const user = await Toxic.findByIdAndDelete(id).exec();
  return user;
};

export {
  createPerson,
  getPersonById,
  getPersonByName,
  getAllPersonsFromDB,
  deletePersonById
};
