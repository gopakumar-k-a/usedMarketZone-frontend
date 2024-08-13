import { FC } from "react";
import { Form, useSearchParams, useSubmit } from "react-router-dom";

interface SortDropdownProps {
  options: { value: string; label: string }[];
}

export const SortDropdown: FC<SortDropdownProps> = ({ options }) => {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const form = event.currentTarget.form;
    if (form) {
      submit(form);
    }
  };

  return (
    <Form method="get">
      <div className="flex justify-end dark:text-white ">
      <span className="border-l border-gray-500 h-6 mr-2"></span>
        <p>sort</p>
      </div>
      <select
        name="sort"
        className="ml-2 mt-1 text-gray-500 border-2 rounded-md px-4 py-1.5 duration-200 focus:border-primary-50"
        defaultValue={searchParams.get("sort") || ""}
        onChange={handleChange}
      >
        <option value="">Sort By</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Form>
  );
};
