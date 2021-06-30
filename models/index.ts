import * as Mongoose from 'mongoose';
import databasesConfiguration from "../config/databases";
import addressesSchema, { IAddress } from '../models/addresses';
import carsSchema, { ICar } from '../models/cars';
import companiesSchema, { ICompany } from "./companies";

const connections: Record<string, Mongoose.Connection> = {};

const connection = Mongoose.createConnection(databasesConfiguration[0].connection.url, databasesConfiguration[0].connection.options);
connections[connection.name] = connection;

const Address = connection.model<IAddress>('addresses', addressesSchema, 'addresses');
const Company = connection.model<ICompany>('companies', companiesSchema, 'companies');
const Car = connection.model<ICar>('cars', carsSchema, 'cars');

export {
  Mongoose as objectMapping,
  connections,
  Address,
  Company,
  Car,
};
