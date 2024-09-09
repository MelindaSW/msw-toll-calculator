const tolledVehicle = ['car'] as const;
const tollFreeVehicle = [
  'tractor',
  'diplomat',
  'foreign',
  'military',
  'emergency',
  'motorbike'
] as const;
const allVehicles = [
  'car',
  'tractor',
  'diplomat',
  'foreign',
  'military',
  'emergency',
  'motorbike'
] as const;

type TolledVehicle = (typeof tolledVehicle)[number];

type TollFreeVehicle = (typeof tollFreeVehicle)[number];

type Vehicle = (typeof allVehicles)[number];

export {
  TolledVehicle,
  TollFreeVehicle,
  Vehicle,
  allVehicles,
  tolledVehicle,
  tollFreeVehicle
};
