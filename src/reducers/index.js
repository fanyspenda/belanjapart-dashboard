import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth.reducer';
import app from './app.reducer';
import admin from './admin.reducer';
import user from './user.reducer';
import atribut from './atribut.reducer';
import category from './category.reducer';
import role from './role.reducer';
import city from './city.reducer';
import district from './district.reducer';
import province from './province.reducer';
import groupcategory from './groupcategory.reducer';
import file from './file.reducer';
import fileupload from './fileupload.reducer';
import product from './product.reducer';
import secondary from './secondary.reducer';
import transaction from './transaction.reducer';
import fee from './fee.reducer';
import firebase from './firebase.reducer';
import fileLibrary from './fileLibrary.reducer';
import LogCsv from './logCsv.reducer';
import log from './log.reducer';

const rootReducer = combineReducers({
  auth,
  app,
  role,
  city,
  file,
  fileupload,
  district,
  province,
  admin,
  user,
  atribut,
  category,
  groupcategory,
  product,
  secondary,
  transaction,
  fee,
  firebase,
  fileLibrary,
  LogCsv,
  log,
  form: formReducer
});

export default rootReducer;
