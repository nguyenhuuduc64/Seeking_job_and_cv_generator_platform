import type { FieldConfig } from '../../types/SchemaFormTypes';

export type FormName =
  | 'USER_FORM'
  | 'PRODUCT_FORM';

export interface OpenFormPayload {
  name: FormName;
  schema: FieldConfig[];
  defaultValues?: Record<string, any>;
  onSubmit: (data: any) => void;
}

export interface SchemaFormProps {
  name: string; 
  schema: FieldConfig[];
  onSubmit: (data: any) => void;
  className?: string;
}
export const loginSchema: FieldConfig[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    validation: { required: 'Email is required' },
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    validation: { required: 'Password is required' },
  },
];

export const registerSchema: FieldConfig[] = [
  {
    name: 'fullName',
    label: 'Fullname',
    type: 'text',
    validation: { required: 'Fullname is required' },
  },
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    validation: { required: 'Username is required' },
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    validation: { required: 'Email is required' },
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    validation: { required: 'Password is required' },
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    validation: { required: 'Confirm Password is required' },
  },
]