import { render, screen } from "@testing-library/react";
import FormGenerator from "../components/FormGenerator";

test("renders form fields correctly", () => {
  const mockSchema = {
    title: "Test Form",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "age", label: "Age", type: "number" },
    ],
  };

  render(<FormGenerator schema={mockSchema} />);
  expect(screen.getByLabelText("Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Age")).toBeInTheDocument();
});