import BidResultMain from '@/components/post/bid/owner/BidResultMain'
import { useLocation } from 'react-router-dom'

function BidResultsPageOwner() {
    const location=useLocation()
    const {bidId}=location.state
  return (

    <>
    <BidResultMain bidId={bidId}/>
    </>
  )
}

export default BidResultsPageOwner
