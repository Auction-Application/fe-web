import { InjectionToken } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
// import moment from 'moment';

export interface FormErrorMessages {
  [key: string]: (name: string, errors: ValidationErrors) => string;
}

// const formatDate = (date: any, format: string) => moment(date).format(format);

export const ERROR_MESSAGES: FormErrorMessages = {
  required: (name: string) => `${name} is mandatory.`,
  min: (name: string, errors: ValidationErrors) =>
    `${name} must be at least ${errors['min'].min}.`,
  max: (name: string, errors: ValidationErrors) =>
    `${name} must be at most ${errors['max'].max}.`,
  minlength: (name: string, errors: ValidationErrors) =>
    `${name} must be at least ${errors['requiredLength']} characters.`,
  maxlength: (name: string, errors: ValidationErrors) =>
    `${name} must be at most ${errors['requiredLength']} characters.`,
  pattern: (name: string) => `${name} must be valid.`,
  email: (name: string) => `${name} must be valid.`,
  dateParseError: (name: string) => `${name} should be in YYYY-MM-DD format`,
  // datePickerMax: (name: string, errors: ValidationErrors) =>
  //   `${name} is greater than ${moment(errors).format('MMM DD, yyyy')}.`,
  // datePickerMin: (name: string, errors: ValidationErrors) =>
  //   `${name} is less than ${moment(errors).format('MMM DD, yyyy')}.`,
  // nbDatepickerMax: (name: string, errors: ValidationErrors) =>
  //   `${name} is greater than ${moment(errors['max']).format('MMM DD, yyyy')}.`,
  // nbDatepickerMin: (name: string, errors: ValidationErrors) =>
  //   `${name} is less than ${moment(errors['min']).format('MMM DD, yyyy')}.`,
  notUnique: (name: string) => `${name} already exists`,
  // nbDatepickerParse: (name: string) => `Select an end date to complete the range.`,
  invalidDateFormat: (name: string, error: ValidationErrors) =>
    `${name} should be of format ${error}`,
  // minDate: (name: string, error: ValidationErrors) =>
  //   `Select ${name} starting from ${formatDate(error.date, error['minDate'].format)}`,
  // maxDate: (name: string, error: ValidationErrors) =>
  //   `Select ${name} no later than ${formatDate(error.date, error['maxDate'].format)}`,
  // minDateTime: (name: string, error: ValidationErrors) =>
  //   `Select ${name} starting from ${formatDate(error.date, error['minDateTime'].format)}`,
  // maxDateTime: (name: string, error: ValidationErrors) =>
  //   `Select ${name} no later than ${formatDate(error.date, error['maxDateTime'].format)}`,
  // minTime: (name: string, error: ValidationErrors) =>
  //   `Select ${name} greater than ${moment(error).format('HH:mm:ss')}`,
  // maxTime: (name: string, error: ValidationErrors) =>
  //   `Select ${name} no later than ${moment(error).format('HH:mm:ss')}`
};

export const VALIDATION_ERROR_MESSAGES = new InjectionToken(
  `Validation Messages`,
  {
    providedIn: 'root',
    factory: () => ERROR_MESSAGES,
  },
);
