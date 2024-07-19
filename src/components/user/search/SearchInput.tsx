import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoSearch } from "react-icons/io5";

interface SearchInputProps {
  onSearch: (query: string) => void;
  onInputChange: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  onInputChange,
}) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
    }
  };

  const searchInputChange=(query:string)=>{
    setSearchInput(query)
    onInputChange(query)
  }

  return (
    <div className="w-full flex justify-center">
      <div className="flex w-10/12 pt-4 items-center">
        <div className="w-full">
          <form className="form relative" onSubmit={handleSearch}>
            <button
              type="submit"
              className="absolute left-2 -translate-y-1/2 top-1/2 p-1"
            >
              <IoSearch />
            </button>
            <input
              className="input w-full rounded-full px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
              placeholder="Search..."
              type="text"
              value={searchInput}
              onChange={(e) => searchInputChange(e.target.value)}
            />
            <button
              type="reset"
              className="absolute right-3 -translate-y-1/2 top-1/2 p-1"
              onClick={() => searchInputChange("")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </form>
        </div>
        <div className="w-2/12">
          <Button
            className={`rounded-full bg-blue-600 ${!searchInput ? "bg-blue-500" : "hover:bg-blue-500"}`}
            disabled={!searchInput}
            onClick={handleSearch}
          >
            <IoSearch />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
