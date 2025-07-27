import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Vendor {
  id: string;
  name: string;
  type: string;
  location: string;
  rating: number;
  pricing: string;
  imageUrl: string;
  description: string;
  phone: string;
  distance?: string;
}

export const useVendorActions = () => {
  const [likedVendors, setLikedVendors] = useState<string[]>([]);
  const [remindVendors, setRemindVendors] = useState<string[]>([]);
  const [compareVendors, setCompareVendors] = useState<Vendor[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const liked = localStorage.getItem('likedVendors');
    const reminded = localStorage.getItem('remindVendors');
    const compared = localStorage.getItem('compareVendors');

    if (liked) setLikedVendors(JSON.parse(liked));
    if (reminded) setRemindVendors(JSON.parse(reminded));
    if (compared) setCompareVendors(JSON.parse(compared));
  }, []);

  const handleLike = (vendorId: string) => {
    const newLiked = likedVendors.includes(vendorId)
      ? likedVendors.filter(id => id !== vendorId)
      : [...likedVendors, vendorId];
    
    setLikedVendors(newLiked);
    localStorage.setItem('likedVendors', JSON.stringify(newLiked));
    
    toast.success(
      likedVendors.includes(vendorId)
        ? "Removed from liked vendors"
        : "Added to liked vendors"
    );
  };

  const handleRemind = (vendorId: string) => {
    const newReminded = remindVendors.includes(vendorId)
      ? remindVendors.filter(id => id !== vendorId)
      : [...remindVendors, vendorId];
    
    setRemindVendors(newReminded);
    localStorage.setItem('remindVendors', JSON.stringify(newReminded));
    
    toast.success(
      remindVendors.includes(vendorId)
        ? "Removed from reminders"
        : "Added to reminders"
    );
  };

  const handleCompare = (vendor: Vendor) => {
    const isAlreadyComparing = compareVendors.some(v => v.id === vendor.id);
    
    if (isAlreadyComparing) {
      const newCompared = compareVendors.filter(v => v.id !== vendor.id);
      setCompareVendors(newCompared);
      localStorage.setItem('compareVendors', JSON.stringify(newCompared));
      toast.success("Vendor removed from comparison");
    } else if (compareVendors.length < 3) {
      const newCompared = [...compareVendors, vendor];
      setCompareVendors(newCompared);
      localStorage.setItem('compareVendors', JSON.stringify(newCompared));
      toast.success("Vendor added to comparison");
    } else {
      toast.error("You can only compare up to 3 vendors");
    }
  };

  const isLiked = (vendorId: string) => likedVendors.includes(vendorId);
  const isReminded = (vendorId: string) => remindVendors.includes(vendorId);
  const isComparing = (vendorId: string) => compareVendors.some(v => v.id === vendorId);

  return {
    likedVendors,
    remindVendors,
    compareVendors,
    handleLike,
    handleRemind,
    handleCompare,
    isLiked,
    isReminded,
    isComparing
  };
};