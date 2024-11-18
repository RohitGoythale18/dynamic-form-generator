import React from "react";

const JSONEditor = ({ schema, setSchema, error }) => {
  return (
    <div className="h-full p-4 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">JSON Editor</h2>
      <textarea
        className="w-full h-96 p-2 border rounded-md"
        value={schema}
        onChange={(e) => setSchema(e.target.value)}
        placeholder="Enter your JSON schema here"
      />
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default JSONEditor;