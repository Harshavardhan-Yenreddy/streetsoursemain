import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Star, 
  MapPin, 
  Phone, 
  Clock, 
  Heart, 
  Bell, 
  ShoppingCart,
  ArrowLeft
} from "lucide-react";
import { useVendorActions } from "@/hooks/useVendorActions";
import { toast } from "sonner";
import vendorProfileImage from "@/assets/vendor-profile.jpg";
import vegetablesImage from "@/assets/vegetables-grid.jpg";
import spicesImage from "@/assets/spices-market.jpg";

// Mock vendor data - same as in Vendors.tsx
const mockVendors = [
  {
    id: "1",
    name: "Fresh Veggie Mart",
    type: "Vegetables",
    location: "Sector 15, Noida",
    rating: 4.8,
    pricing: "₹50-200/kg",
    imageUrl: vegetablesImage,
    description: "Premium fresh vegetables sourced directly from farms. Specializing in organic produce for street food vendors.",
    phone: "+91 98765 43210",
    distance: "0.8 km",
    openHours: "6:00 AM - 8:00 PM",
    products: [
      { name: "Onions", price: "₹30/kg", inStock: true },
      { name: "Tomatoes", price: "₹40/kg", inStock: true },
      { name: "Potatoes", price: "₹25/kg", inStock: false },
      { name: "Carrots", price: "₹60/kg", inStock: true }
    ]
  },
  {
    id: "2", 
    name: "Spice Kingdom",
    type: "Spices",
    location: "Old Delhi, Delhi",
    rating: 4.9,
    pricing: "₹100-500/kg",
    imageUrl: spicesImage,
    description: "Authentic Indian spices and masalas. Over 100 varieties available with quality guarantee.",
    phone: "+91 87654 32109",
    distance: "1.2 km",
    openHours: "7:00 AM - 9:00 PM",
    products: [
      { name: "Cumin Powder", price: "₹180/kg", inStock: true },
      { name: "Turmeric", price: "₹120/kg", inStock: true },
      { name: "Red Chili Powder", price: "₹200/kg", inStock: true },
      { name: "Garam Masala", price: "₹300/kg", inStock: true }
    ]
  },
  {
    id: "3",
    name: "Green Harvest",
    type: "Vegetables",
    location: "Malviya Nagar, Delhi",
    rating: 4.6,
    pricing: "₹40-180/kg",
    imageUrl: vendorProfileImage,
    description: "Daily fresh vegetables with home delivery service. Best prices in the area.",
    phone: "+91 76543 21098",
    distance: "2.1 km",
    openHours: "5:30 AM - 7:30 PM",
    products: [
      { name: "Spinach", price: "₹20/kg", inStock: true },
      { name: "Cabbage", price: "₹25/kg", inStock: true },
      { name: "Cauliflower", price: "₹35/kg", inStock: true }
    ]
  },
  {
    id: "4",
    name: "Masala Express",
    type: "Spices",
    location: "Chandni Chowk, Delhi",
    rating: 4.7,
    pricing: "₹80-400/kg",
    imageUrl: spicesImage,
    description: "Traditional spice merchants since 1950. Premium quality spices at wholesale rates.",
    phone: "+91 65432 10987",
    distance: "3.5 km",
    openHours: "8:00 AM - 8:00 PM",
    products: [
      { name: "Cardamom", price: "₹800/kg", inStock: true },
      { name: "Black Pepper", price: "₹400/kg", inStock: true },
      { name: "Cinnamon", price: "₹250/kg", inStock: false }
    ]
  },
  {
    id: "5",
    name: "Farm Direct",
    type: "Vegetables",
    location: "Gurgaon, Haryana",
    rating: 4.5,
    pricing: "₹35-150/kg",
    imageUrl: vegetablesImage,
    description: "Direct from farm to your kitchen. Pesticide-free vegetables at affordable prices.",
    phone: "+91 54321 09876",
    distance: "5.2 km",
    openHours: "6:00 AM - 6:00 PM",
    products: [
      { name: "Broccoli", price: "₹80/kg", inStock: true },
      { name: "Bell Peppers", price: "₹120/kg", inStock: true }
    ]
  },
  {
    id: "6",
    name: "Spice Garden",
    type: "Spices",
    location: "Lajpat Nagar, Delhi",
    rating: 4.4,
    pricing: "₹90-450/kg",
    imageUrl: vendorProfileImage,
    description: "Wide variety of whole and ground spices. Custom spice blends available on request.",
    phone: "+91 43210 98765",
    distance: "4.8 km",
    openHours: "7:30 AM - 8:30 PM",
    products: [
      { name: "Cloves", price: "₹600/kg", inStock: true },
      { name: "Fennel Seeds", price: "₹150/kg", inStock: true }
    ]
  }
];

const VendorDetails = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState<any>(null);
  const {
    handleLike,
    handleRemind,
    isLiked,
    isReminded
  } = useVendorActions();

  useEffect(() => {
    const foundVendor = mockVendors.find(v => v.id === id);
    setVendor(foundVendor);
  }, [id]);

  if (!vendor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Vendor not found</h2>
          <p className="text-muted-foreground mb-4">The vendor you're looking for doesn't exist.</p>
          <Link to="/vendors">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Vendors
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "fill-primary text-primary"
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  const handleBuyNow = () => {
    // Navigate to cart with vendor data
    window.location.href = `/cart?vendorId=${vendor.id}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/vendors">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Vendors
              </Button>
            </Link>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Vendor Image */}
            <div className="relative">
              <img
                src={vendor.imageUrl}
                alt={vendor.name}
                className="w-full h-80 object-cover rounded-lg shadow-soft"
              />
              <Badge className="absolute top-4 left-4">
                {vendor.type}
              </Badge>
            </div>

            {/* Vendor Info */}
            <div>
              <h1 className="text-section text-foreground mb-2">{vendor.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(vendor.rating)}
                  <span className="text-sm text-foreground ml-1">{vendor.rating}</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{vendor.distance}</span>
              </div>

              <p className="text-muted-foreground mb-6">{vendor.description}</p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-foreground">{vendor.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-foreground">{vendor.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-foreground">{vendor.openHours}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleBuyNow}
                  className="flex-1"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Buy Now
                </Button>
                <Button
                  variant={isLiked(vendor.id) ? "like" : "outline"}
                  size="lg"
                  onClick={() => handleLike(vendor.id)}
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Button
                  variant={isReminded(vendor.id) ? "remind" : "outline"}
                  size="lg"
                  onClick={() => handleRemind(vendor.id)}
                >
                  <Bell className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-8">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Available Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vendor.products.map((product: any, index: number) => (
                <div
                  key={index}
                  className="border border-border rounded-lg p-4 hover:shadow-soft transition-smooth"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-foreground">{product.name}</h3>
                    <Badge variant={product.inStock ? "default" : "outline"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                  <p className="text-lg font-semibold text-primary">{product.price}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorDetails;