import React, { useState } from "react";
import sampleSchema from "./sampleSchema.json"; // Importing the JSON schema
import JSONEditor from "./components/JsonEditor";
import FormGenerator from "./components/FormGenarator";

const App = () => {
  const [schema, setSchema] = useState(JSON.stringify(sampleSchema, null, 2)); // Initialize with imported schema
  const [parsedSchema, setParsedSchema] = useState(sampleSchema);
  const [error, setError] = useState(null);

  const handleSchemaChange = (newSchema) => {
    setSchema(newSchema);
    try {
      const parsed = JSON.parse(newSchema);
      setParsedSchema(parsed);
      setError(null);
    } catch (err) {
      setParsedSchema(null);
      setError("Invalid JSON");
    }
  };

  return (
    <div className="h-screen flex">
      <div className="w-1/2 border-r">
        <JSONEditor schema={schema} setSchema={handleSchemaChange} error={error} />
      </div>
      <div className="w-1/2 p-4">
        {parsedSchema ? (
          <FormGenerator schema={parsedSchema} />
        ) : (
          <p className="text-gray-500">Awaiting valid JSON schema...</p>
        )}
      </div>
    </div>
  );
};

export default App;