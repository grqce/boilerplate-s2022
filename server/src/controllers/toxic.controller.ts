import express from 'express';
import crypto from 'crypto';
import ApiError from '../util/apiError';
import StatusCode from '../util/statusCode';
import { IToxic } from '../models/toxicuser.model';
import { Request, Response } from 'express';
import {
  createPerson,
  getPersonById,
  getPersonByName,
  getAllPersonsFromDB,
  deletePersonById
} from '../services/toxic.service';

const getAllUsers = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  return (
    getAllPersonsFromDB()
      .then((userList) => {
        res.status(StatusCode.OK).send(userList);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((e) => {
        next(ApiError.internal('Unable to retrieve all users'));
      })
  );
};

const addNewUser = async (req: Request, res: Response) => {
  try {
    const {firstName, lastName, nameEmoji, year, hometown, birthday, toxicTraits, photo } = req.body;

    const newPerson = await createPerson(firstName, lastName, nameEmoji, year, hometown, birthday, toxicTraits);
    console.log("User created", newPerson);
    res.status(201).json({ message: 'Person created successfully', person: newPerson });
  } catch (error) {
    res.status(500).json({ message: 'Error creating person', error });
  }
};

const deleteUser = async (req: Request, res: Response, next: express.NextFunction) => {
  try {
    const { id } = req.params; 
    await deletePersonById(id);
    res.status(204).send();
  } catch (error) {
    next(ApiError.internal('Error deleting user'));
  }
};

export {
  getAllUsers,
  addNewUser,
  deleteUser
};