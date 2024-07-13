import AllPosts from "@/components/post/AllPosts";
import SuggestedUsers from "@/components/user/SuggestedUsers";
function HomePage() {
  return (
    <div className="grid grid-cols-5 w-full h-full">
      <div className="col-span-5 sm:col-span-3  w-full h-full ">
      
        <AllPosts />
      </div>
      <div className="hidden sm:block sm:col-span-2  sm:w-full sm:h-full ">
        <SuggestedUsers />
      </div>

    </div>
  );
}

export default HomePage;
