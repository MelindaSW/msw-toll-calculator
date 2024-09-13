import Holidays from 'date-holidays';
import {
  allVehicles,
  tolledVehicle,
  TolledVehicle,
  tollFreeVehicle,
  TollFreeVehicle,
  Vehicle
} from '../types/vehicleTypes';

const holidays = new Holidays('SE');

const vehicleIsValid = (vehicle: any): vehicle is Vehicle => {
  return allVehicles.includes(vehicle);
};

const vehicleIsTollFree = (vehicle: any): vehicle is TollFreeVehicle => {
  return tollFreeVehicle.includes(vehicle);
};

const vehicleIsTolled = (vehicle: any): vehicle is TolledVehicle => {
  return tolledVehicle.includes(vehicle);
};

const dateIsOnWeekend = (date: Date) => {
  const saturday = 6;
  const sunday = 0;
  return date.getDay() === saturday || date.getDay() === sunday;
};

const dateIsTollFreeHoliday = (date: Date) => {
  const isMonthOfJuly = date.getMonth() === 6;
  const isNationalHoliday = holidays.isHoliday(date) !== false;
  return isMonthOfJuly || isNationalHoliday;
};

const isCorrectDateTimeFormat = (timestamp: string) => {
  const regexISO8601 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
  return regexISO8601.test(timestamp);
};

export {
  vehicleIsValid,
  vehicleIsTollFree,
  vehicleIsTolled,
  dateIsOnWeekend,
  dateIsTollFreeHoliday,
  isCorrectDateTimeFormat
};
