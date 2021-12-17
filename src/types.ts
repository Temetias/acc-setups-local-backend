export type Configuration = {
  setupsDirectoryPath: string;
};

export type Car = "bmw_m6_gt3" | "ferrari_488_gt3_evo" | "lexus_rc_f_gt3";

export type Track = "Kyalami" | "Silverstone" | "Spa";

export type ACCSetupFolder = Record<Car, Record<Track, string[]>>;
