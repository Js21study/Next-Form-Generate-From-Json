import React, { FC } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FormFields, FormValues, Schemas } from './types';

interface Props {
  fields: FormFields[];
}

export const GeneratedForm: FC<Props> = ({ fields }) => {
  const initialValues = fields.reduce<FormValues>((acc, field) => {
    acc[field.name] = field.default_value || '';
    return acc;
  }, {});

  const validationSchema = Yup.object().shape(
    fields.reduce<Schemas>((schema, field) => {
      if (field.type === 'text' || field.type === 'longtext') {
        schema[field.name] = Yup.string()
          .required()
          .matches(new RegExp(field.validation || ''), 'Invalid format');
      } else if (field.type === 'number') {
        schema[field.name] = Yup.number()
          .required()
          .min(field.min_value || 0, `Min value is ${field.min_value}`)
          .max(field.max_value || Infinity, `Max value is ${field.max_value}`);
      }
      return schema;
    }, {})
  );

  const handleSubmit = (values: FormValues) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={true}
      onSubmit={handleSubmit}>
      <Form className="space-y-4 p-6 bg-white rounded-lg shadow-md">
        {fields.map((field, index) => (
          <div key={index} className="flex flex-col">
            <label className="font-medium text-gray-700">{field.name}</label>
            {field.type === 'dropdown' ? (
              <Field
                as="select"
                name={field.name}
                className="mt-1 border rounded-md p-2 text-black">
                {field.options?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </Field>
            ) : (
              <Field
                as={field.type === 'longtext' ? 'textarea' : 'input'}
                type={field.type === 'number' ? 'number' : 'text'}
                name={field.name}
                className="mt-1 border rounded-md p-2 text-black"
                rows={field.type === 'longtext' ? 4 : undefined}
              />
            )}
            <ErrorMessage
              name={field.name}
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-sky-600 text-white font-semibold py-2 rounded-md hover:bg-sky-700 transition">
          Submit
        </button>
      </Form>
    </Formik>
  );
};
