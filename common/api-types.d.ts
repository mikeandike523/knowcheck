export type Subject = {
    name: string;
    blurb: string;
    contextPrompt: string;
    userPromptTemplate: string;
    unlisted: boolean;
    id: string;
};
export type SubjectListingItem = Pick<Subject, "name" | "blurb" | "id">;
//# sourceMappingURL=api-types.d.ts.map