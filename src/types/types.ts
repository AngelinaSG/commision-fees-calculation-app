import {OPERATION_TYPE, USER_TYPE} from "../constants/constants";

export type ValueOf<T> = T[keyof T];

type UserType =  ValueOf<typeof USER_TYPE>;

type OperationType =  ValueOf<typeof OPERATION_TYPE>;

export interface ICashOperation {
    date: string;
    user_id: number;
    user_type: UserType;
    type: OperationType;
    operation: {
        amount: number;
        currency: string;
    }
}

export interface ICashInFee {
    percents: number;
    max: {
        amount: number;
        currency: string;
    }
}

export interface ICashOutNaturalFee {
    percents: number;
    week_limit: {
        amount: number;
        currency: string;
    }
}

export interface ICashOutJuridicalFee {
    percents: number;
    min: {
        amount: number;
        currency: string;
    }
}
