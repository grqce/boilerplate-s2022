import express from 'express';
import crypto from 'crypto';
import ApiError from '../util/apiError';
import StatusCode from '../util/statusCode';
import { IToxic } from '../models/toxicuser.model';
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

  const addUser = async (
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
  
  export {
    getAllUsers,
    addUser
  };