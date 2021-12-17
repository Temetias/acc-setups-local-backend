export declare type Configuration = {
    setupsDirectoryPath: string;
};
export declare type Car = "bmw_m6_gt3" | "ferrari_488_gt3_evo" | "lexus_rc_f_gt3";
export declare type Track = "Kyalami" | "Silverstone" | "Spa";
export declare type ACCSetupFolder = Record<Car, Record<Track, string[]>>;
