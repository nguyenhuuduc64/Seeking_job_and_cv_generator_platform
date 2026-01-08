import React from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import type { FieldConfig, SchemaFormProps } from '../../../types/SchemaFormTypes';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { closeForm } from '../../../features/modal/formSlice';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
export const SchemaFormField: React.FC<{ field: FieldConfig; parentName?: string}> = ({
  field,
  parentName,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
 
  const fieldName = parentName ? `${parentName}.${field.name}` : field.name;
  if (field.children && field.children.length > 0) {
    return (
      <div className={`space-y-4 ${field.className || ''} border p-4 rounded-md bg-gray-50`}>
        {field.label && <h3 className="font-semibold text-lg text-gray-700 mb-2">{field.label}</h3>}
        {field.children.map((child) => (
          <SchemaFormField key={child.name} field={child} parentName={fieldName} />
        ))}
      </div>
    );
  }

  const getError = (name: string, errors: any) => {
    return name.split('.').reduce((obj, key) => obj && obj[key], errors);
  };
  
  const error = getError(fieldName, errors);
  const errorMessage = error?.message as string | undefined;

  const commonClasses = "w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";
  const errorClasses = error ? "border-red-500 focus:ring-red-500" : "border-gray-300";
  return (
    <div className={`flex flex-col gap-1 mb-3 ${field.className || ''}`}>
      {field.label && (
        <label htmlFor={fieldName} className="font-medium text-gray-700">
          {field.label}
        </label>
      )}

      {field.type === 'textarea' ? (
        <textarea
          id={fieldName}
          placeholder={field.placeholder}
          className={`${commonClasses} ${errorClasses} min-h-[100px]`}
          {...register(fieldName, field.validation)}
        />
      ) : field.type === 'select' ? (
        <select
          id={fieldName}
          className={`${commonClasses} ${errorClasses} bg-white`}
          {...register(fieldName, field.validation)}
          defaultValue=""
        >
          <option value="" disabled>
            {field.placeholder || 'Select an option'}
          </option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={fieldName}
          type={field.type || 'text'}
          placeholder={field.placeholder}
          className={`${commonClasses} ${errorClasses}`}
          {...register(fieldName, field.validation)}
        />
      )}

      {errorMessage && <span className="text-sm text-red-500">{errorMessage}</span>}
    </div>
  );
};
export const SchemaForm: React.FC<SchemaFormProps> = ({
  name,
  schema,
  onSubmit,
  className,
  children,
}) => {
  const methods = useForm();
  const dispatch = useAppDispatch();

  const openFormName = useAppSelector(
    (state) => state.form.openFormName
  );

  // 👇 Redux quyết định render hay không
  if (openFormName !== name) return null;

  const handleCloseForm = () => {
    dispatch(closeForm());
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <div className='w-screen h-screen fixed z-50 bg-black/50'>

        <form
          onSubmit={methods.handleSubmit((data) => {
            onSubmit(data);
            dispatch(closeForm());
            methods.reset();
          })}
          className={`bg-white shadow-md rounded-lg p-6 fixed z-100 w-1/3 mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${className || ''}`}
        >
          <div className="flex justify-end" onClick={handleCloseForm}>
              <FontAwesomeIcon icon={faClose} className="text-lg w-12 h-12 cursor-pointer" />
          </div>
          <div className="space-y-4">
            {schema.map((field) => (
              <SchemaFormField key={field.name} field={field} />
            ))}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
          {children}
        </form>
      </div>
    </FormProvider>
  );
};