import { Model } from "../../lib/firestore";

export interface RegistrationData {
    subjectId: string;
    accessCodeHash: string;
    email: string;
    fullName: string;
    timestamp: number;
}

export const RegistrationModel = new Model<RegistrationData>("registrations");
export default RegistrationModel;