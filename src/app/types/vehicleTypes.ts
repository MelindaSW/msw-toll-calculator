const vehicleWithFees = ['Car'] as const;
const feeFreeVehicles = [
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

type VehicleWithFee = (typeof vehicleWithFees)[number];

type FeeFreeVehicle = (typeof feeFreeVehicles)[number];

type Vehicle = (typeof allVehicles)[number];

export {
  VehicleWithFee,
  FeeFreeVehicle,
  Vehicle,
  allVehicles,
  vehicleWithFees,
  feeFreeVehicles
};
