import { Link } from "react-router-dom";

interface ProductImage {
  _id: number;
  productImageUrls: string[];
}

function ProfileBottom({ postImagesList }) {
  return (
    <>
      <div className="pt-4 w-full flex justify-center">
        <div className="w-4/5 flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 ">
            {postImagesList.map((imageList: ProductImage, index: number) => (
              <Link to={"/post/post-details"} state={{pId:imageList._id}}>
                <div key={index} className="flex items-center justify-center">
                  <img
                    className="h-auto max-w-full rounded-lg"
                    src={imageList.productImageUrls[0]}
                    alt={`image ${index}`}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileBottom;
