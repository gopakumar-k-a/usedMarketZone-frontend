import { useEffect, useState } from "react";
import SearchInput from "@/components/user/search/SearchInput";
import FilterSelector from "@/components/user/search/FilterSelector";
import { searchOnApp } from "@/api/user";
import LoaderPost from "@/components/loader/LoaderPost";
import UserCard from "@/components/user/SuggestedUserCard";
import { FaSearch } from "react-icons/fa";
import BidCard from "@/components/post/BidCard";
import { SharePostDialogue } from "@/components/post/SharePostModal";
import ProductCard from "@/components/post/ProductCard";
function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("users");
  const [subFilter, setSubFilter] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [selectedPostIdShare, setSelectedPostIdShare] = useState("");
  //   const fetchSearchData=async()=>{}

  const handleSearch = async (query: string) => {
    // const results = await fetchSearchResults(query, filter, subFilter);
    // setSearchResults();
    try {
      if (query == null) return;
      setLoading(true);
      console.log(`query ${query}, 
    filter ${filter},
     subFilter ${subFilter}`);

      const results = await searchOnApp(query, filter, subFilter);
      setSearchResults(results.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchInputChange = (query: string) => {
    setQuery(query);
  };
  const handleFilterChange = (newFilter: string, newSubFilter?: string) => {
    setFilter(newFilter);
    setSubFilter(newSubFilter || "");
  };

  useEffect(() => {
    if (query) {
      console.log("inside useeffect in search");

      handleSearch(query);
    }
  }, [filter, subFilter]);

  const postIdCallBack = (postId: string) => {
    console.log(" postIdCallBack", postId);
    setSelectedPostIdShare(postId);
  };

  const handleShareModalClose = () => {
    setShareModalOpen(false);
  };

  return (
    <>
      <SearchInput
        onSearch={handleSearch}
        onInputChange={handleSearchInputChange}
      />
      <FilterSelector onFilterChange={handleFilterChange} />
      {isLoading ? (
        <LoaderPost />
      ) : (
        <div className="search-results flex justify-center w-full pt-4">
          <div className="sm:w-10/12 w-full  flex flex-col items-center">
            {searchResults && searchResults.length > 0 ? (
              searchResults.map((result: any) => (
                <div key={result.id} className="result-item  ">
                  {filter === "users" && (
                    <>
                      <UserCard userData={result} />
                    </>
                  )}
                  {filter === "posts" &&
                    (result.isBidding ? (
                      <>
                        <BidCard
                          key={result._id}
                          post={result}
                          setShareModalOpen={setShareModalOpen}
                          postIdCallBack={postIdCallBack}
                        />
                      </>
                    ) : (
                      <>
                        <ProductCard
                          key={result._id}
                          post={result}
                          setShareModalOpen={setShareModalOpen}
                          postIdCallBack={postIdCallBack}
                        />
                      </>
                    ))}
                </div>
              ))
            ) : query ? (
              <div>no data</div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-80 text-gray-400 gap-4">
                <FaSearch className="w-72 h-72 " />
                <h1 className="font-bold text-2xl">search user or posts</h1>
              </div>
            )}
          </div>
        </div>
      )}
      {isShareModalOpen && selectedPostIdShare && (
        <SharePostDialogue
          isOpen={isShareModalOpen}
          onClose={handleShareModalClose}
          selectedPostIdShare={selectedPostIdShare}
        />
      )}
    </>
  );
}

export default SearchPage;
