const tolledVehicle = ['Car'] as const;
const tollFreeVehicle = [
  'Tractor',
  'Diplomat',
  'Foreign',
  'Military',
  'Emergency',
  'Motorbike'
] as const;
const allVehicles = [
  'Car',
  'Tractor',
  'Diplomat',
  'Foreign',
  'Military',
  'Emergency',
  'Motorbike'
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
