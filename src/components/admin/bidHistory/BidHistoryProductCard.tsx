import { formatDate } from '@/utils/formatDate'
type BidDuration = {
  day: number;
  hour: number;
  minute: number;
};

type BidProductData = {
  productName: string;
  category: string;
  subCategory: string;
  basePrice: number;
  productImageUrls: string[];
  bidDuration?: BidDuration;
  createdAt: string; 
};
function BidHistoryProductCard({bidProductData}:{bidProductData:BidProductData}) {
  return (
  <>
    <div className="bg-gray-800 text-white shadow-lg border rounded-lg overflow-hidden">
        <div className="flex">
          <div className="ml-2  max-w-16 max-h-16">
            <img
              src={bidProductData.productImageUrls[0]}
              alt="Quant trident shirts"
              className="w-24 h-24 object-contain"
            />
          </div>

          <div className="p-2 flex-grow">
            <div className="flex justify-between items-start">
              <div className="text-sm">
                <h5 className="font-bold text-xl">
                  {bidProductData.productName}
                </h5>
                <p>Category : {bidProductData.category} </p>
                <p>Sub Category : {bidProductData.subCategory} </p>
              </div>
              <div className="text-right">
                <h4 className="text-xl font-bold">
                  &#x20B9; {bidProductData.basePrice}
                </h4>
                <span className="text-white-500 ">
                  bid Duration : {bidProductData.bidDuration?.day} day{" "}
                  {bidProductData.bidDuration?.hour} hour{" "}
                  {bidProductData.bidDuration?.minute} minute
                </span>
                <h6 className="text-white">
                  Requested Time : {formatDate(bidProductData.createdAt)}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
  </>
  )
}

export default BidHistoryProductCard
