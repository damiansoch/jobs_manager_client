import { convertToLabel } from './converters';

export const validataData = (actionName, data) => {
  console.log(actionName);
  console.log(data);
  let validationRules = {};
  const errors = [];

  switch (actionName) {
    case 'addCustomer':
      validationRules = {
        FirstName: { Required: true, MaxLength: 255 },
        LastName: { Required: true, MaxLength: 255 },
        CompanyName: { Required: true, MaxLength: 255 },
        PhoneNumber: { Required: true, MaxLength: 50 },
        PhoneNumber2: { MaxLength: 50 },
        Email: { Required: true, MaxLength: 200, EmailAddress: true },
        ExtraDetails: {},
      };
      break;
    case 'editCustomer':
      validationRules = {
        FirstName: { Required: true, MaxLength: 255 },
        LastName: { Required: true, MaxLength: 255 },
        CompanyName: { Required: true, MaxLength: 255 },
      };
      break;

    case 'editJob':
      validationRules = {
        Name: { Required: true, MaxLength: 255 },
        Description: { Required: true },
        Price: { Required: true, IsNumber: true },
        Deposit: { Required: true, IsNumber: true },
        ToBeCompleted: { Required: true, IsDate: true },
      };
      break;

    default:
      errors.push(`Action name ${actionName} not recognized in the validators`);
      break;
  }
  for (const prop in validationRules) {
    if (validationRules.hasOwnProperty(prop)) {
      const rules = validationRules[prop];
      //Requeired
      if (rules.Required && !data[prop]) {
        errors.push(`${convertToLabel(prop)} is required`);
      }
      //MaxLength
      if (
        rules.MaxLength &&
        data[prop] &&
        data[prop].length > rules.MaxLength
      ) {
        errors.push(
          `${convertToLabel(prop)} should not exeed ${
            rules.MaxLength
          } characters`
        );
      }

      //EmailAddress
      if (rules.EmailAddress && data[prop] && !isValidEmail(data[prop])) {
        errors.push(`${convertToLabel(prop)} should be a valid email address`);
      }

      //number
      if (rules.IsNumber && data[prop] && !isValidNumber(data[prop])) {
        errors.push(
          `${convertToLabel(prop)} should be a positive whole number`
        );
      }

      //date
      if (rules.IsDate && data[prop] && !isValidDate(data[prop])) {
        errors.push(`${convertToLabel(prop)} should be a valid date`);
      }
    }
  }
  return errors;
};

//helper function to check if valid email address
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

//helper function to check if valid positve whole number
const isValidNumber = (value) => {
  const positiveWholeNumberRegex = /^(0|[1-9]\d*)$/;
  return positiveWholeNumberRegex.test(value);
};

//helper function to check if valid date
const isValidDate = (dateString) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; //YYYY-MM-dd
  if (!dateRegex.test(dateString)) return false;

  const date = new Date(dateString);
  return date.toISOString().startsWith(dateString);
};
