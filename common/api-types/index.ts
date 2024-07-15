export type Subject = {
  name: string;
  blurb: string;
  contextPrompt: string;
  userPromptTemplate: string;
  unlisted: boolean;
  id: string;
};

export type SubjectListingItem = Pick<Subject, "name" | "blurb" | "id">;

export type QuizRegistration = {
  subjectId: string;
  instanceId: string;
}

export type TokenClaims = {
  subjectId: string,
  instanceId: string,
  timestamp: number,
  expires: number,
  maxAge: number,
}
