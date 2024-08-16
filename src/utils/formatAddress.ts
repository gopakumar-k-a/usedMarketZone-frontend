export const formatAddress = (address:string) => {
    
    if (!address) return "";
  
    const parts = address.split(',').map(part => part.trim());
  
    const firstTwoParts = parts.slice(0, 2);
  
    return firstTwoParts.join(', ');
  };