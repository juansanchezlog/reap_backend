export interface CreateFormData {
    title: string;
    description?: string;
    sections: CreateSectionData[];
}
export interface CreateSectionData {
    title: string;
    description?: string;
    order: number;
    fields: CreateFieldData[];
}
export interface CreateFieldData {
    label: string;
    type: 'TEXT' | 'NUMBER';
    required: boolean;
    order: number;
}
export interface FormSubmissionData {
    responses: {
        fieldId: string;
        value: string;
    }[];
}
export interface AuthData {
    token: string;
    user: {
        id: string;
        username: string;
    };
}
//# sourceMappingURL=index.d.ts.map