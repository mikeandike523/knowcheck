import { Model } from "../../lib/firestore";

export interface SubjectData {
  name: string;
  blurb: string;
  unlisted: boolean;
}

export const SubjectModel = new Model<SubjectData>("subjects");
export default SubjectModel;
