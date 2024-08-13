import { FC, FormEvent } from "react";
// import { debounce } from "@/lib/utils";
import useDebounce from "@/utils/hooks/useDebounce";
import { Form, useSearchParams, useSubmit } from "react-router-dom";

export const DebouncedSearchInput: FC = () => {
  const submit = useSubmit();

  const [searchParams] = useSearchParams();

  const debounceSubmit = useDebounce(
    (form: HTMLFormElement) => submit(form),
    500
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) =>
    debounceSubmit(event.currentTarget);

  return (
    <Form method="get" onChange={handleSubmit}>
      <div className="flex justify-end dark:text-white">
        <span className="border-l border-gray-500 h-6 mr-2"></span>
        <p>search</p>
      </div>
      <input
        type="search"
        name="search"
        placeholder="Search"
        className="outline-none mt-1 text-gray-500 border-2 rounded-md px-4 py-1.5 duration-200 focus:border-primary-50"
        defaultValue={searchParams.get("search") || ""}
      />
    </Form>
  );
};
