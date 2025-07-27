import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, Trash2, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface CompareVendor {
  id: string;
  name: string;
  type: string;
  location: string;
  rating: number;
  pricing: string;
  imageUrl: string;
  phone: string;
  distance?: string;
}

const Compare = () => {
  const [compareVendors, setCompareVendors] = useState<CompareVendor[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('compareVendors');
    if (stored) {
      setCompareVendors(JSON.parse(stored));
    }
  }, []);

  const removeFromCompare = (vendorId: string) => {
    const updated = compareVendors.filter(v => v.id !== vendorId);
    setCompareVendors(updated);
    localStorage.setItem('compareVendors', JSON.stringify(updated));
    toast.success("Vendor removed from comparison");
  };

  const clearAll = () => {
    setCompareVendors([]);
    localStorage.removeItem('compareVendors');
    toast.success("Comparison cleared");
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  if (compareVendors.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">No vendors to compare</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Select vendors from the vendors page to start comparing their prices, ratings, and services.
            </p>
            <Link to="/vendors">
              <Button variant="hero">Browse Vendors</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-section text-foreground mb-2">Compare Vendors</h1>
              <p className="text-muted-foreground">
                Side-by-side comparison of {compareVendors.length} vendors
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={clearAll}>
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
              <Link to="/vendors">
                <Button variant="default">Add More Vendors</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Vendor Comparison</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">Details</th>
                      {compareVendors.map(vendor => (
                        <th key={vendor.id} className="text-center p-4 min-w-[200px]">
                          <div className="space-y-2">
                            <img 
                              src={vendor.imageUrl} 
                              alt={vendor.name}
                              className="w-16 h-16 rounded-lg object-cover mx-auto"
                            />
                            <div className="font-semibold">{vendor.name}</div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => removeFromCompare(vendor.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Type</td>
                      {compareVendors.map(vendor => (
                        <td key={vendor.id} className="text-center p-4">
                          <Badge variant="default">{vendor.type}</Badge>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Rating</td>
                      {compareVendors.map(vendor => (
                        <td key={vendor.id} className="text-center p-4">
                          <div className="flex items-center justify-center gap-1">
                            {renderStars(vendor.rating)}
                            <span className="text-sm ml-1">({vendor.rating})</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Price Range</td>
                      {compareVendors.map(vendor => (
                        <td key={vendor.id} className="text-center p-4 font-semibold text-primary">
                          {vendor.pricing}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Location</td>
                      {compareVendors.map(vendor => (
                        <td key={vendor.id} className="text-center p-4">
                          <div className="flex items-center justify-center gap-1 text-sm">
                            <MapPin className="w-3 h-3" />
                            {vendor.location}
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Distance</td>
                      {compareVendors.map(vendor => (
                        <td key={vendor.id} className="text-center p-4">
                          <Badge variant="secondary">{vendor.distance || "N/A"}</Badge>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Contact</td>
                      {compareVendors.map(vendor => (
                        <td key={vendor.id} className="text-center p-4">
                          <div className="flex items-center justify-center gap-1 text-sm">
                            <Phone className="w-3 h-3" />
                            {vendor.phone}
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Action</td>
                      {compareVendors.map(vendor => (
                        <td key={vendor.id} className="text-center p-4">
                          <Link to={`/vendor/${vendor.id}`}>
                            <Button variant="hero" size="sm" className="w-full">
                              View Details
                            </Button>
                          </Link>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-6">
          {compareVendors.map(vendor => (
            <Card key={vendor.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={vendor.imageUrl} 
                      alt={vendor.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{vendor.name}</h3>
                      <Badge variant="default" className="text-xs">{vendor.type}</Badge>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeFromCompare(vendor.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Rating:</span>
                  <div className="flex items-center gap-1">
                    {renderStars(vendor.rating)}
                    <span className="text-sm">({vendor.rating})</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Price:</span>
                  <span className="font-semibold text-primary">{vendor.pricing}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Distance:</span>
                  <Badge variant="secondary">{vendor.distance || "N/A"}</Badge>
                </div>
                <div className="pt-2">
                  <Link to={`/vendor/${vendor.id}`}>
                    <Button variant="hero" size="sm" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Compare;