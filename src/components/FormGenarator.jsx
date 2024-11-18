import React from "react";
import { useForm } from "react-hook-form";

const FormGenerator = ({ schema }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    alert("Form submitted successfully!");
  };

  if (!schema || !schema.fields) {
    return <p>No valid schema provided.</p>;
  }

  return (
    <form
      className="p-4 bg-white shadow-md rounded-md space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-bold mb-2">{schema.formTitle}</h2>
      {schema.formDescription && (
        <p className="text-gray-600 mb-4">{schema.formDescription}</p>
      )}
      {schema.fields.map((field, index) => (
        <div key={index} className="flex flex-col">
          <label className="font-medium mb-2">{field.label}</label>
          {field.type === "select" ? (
            <select
              className="p-2 border rounded-md"
              {...register(field.id, { required: field.required })}
            >
              <option value="">--Select--</option>
              {field.options?.map((option, idx) => (
                <option key={idx} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === "radio" ? (
            field.options.map((option, idx) => (
              <label key={idx} className="inline-flex items-center space-x-2">
                <input
                  type="radio"
                  value={option.value}
                  {...register(field.id, { required: field.required })}
                />
                <span>{option.label}</span>
              </label>
            ))
          ) : field.type === "textarea" ? (
            <textarea
              className="p-2 border rounded-md"
              placeholder={field.placeholder}
              {...register(field.id)}
            />
          ) : (
            <input
              type={field.type}
              placeholder={field.placeholder}
              className="p-2 border rounded-md"
              {...register(field.id, {
                required: field.required,
                pattern: field.validation?.pattern
                  ? new RegExp(field.validation.pattern)
                  : undefined,
              })}
            />
          )}
          {errors[field.id] && (
            <p className="text-red-600 text-sm mt-1">
              {errors[field.id].type === "pattern"
                ? field.validation?.message
                : `${field.label} is required.`}
            </p>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default FormGenerator;