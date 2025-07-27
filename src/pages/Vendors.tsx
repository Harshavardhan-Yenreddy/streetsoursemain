import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  MapPin, 
  SlidersHorizontal,
  Grid3X3,
  List
} from "lucide-react";
import VendorCard from "@/components/VendorCard";
import { useVendorActions } from "@/hooks/useVendorActions";
import { Link } from "react-router-dom";
import vendorProfileImage from "@/assets/vendor-profile.jpg";
import vegetablesImage from "@/assets/vegetables-grid.jpg";
import spicesImage from "@/assets/spices-market.jpg";

// Mock data - in real app this would come from your backend
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
    distance: "0.8 km"
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
    distance: "1.2 km"
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
    distance: "2.1 km"
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
    distance: "3.5 km"
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
    distance: "5.2 km"
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
    distance: "4.8 km"
  }
];

const Vendors = () => {
  const [vendors, setVendors] = useState(mockVendors);
  const [filteredVendors, setFilteredVendors] = useState(mockVendors);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);
  
  const {
    handleLike,
    handleRemind,
    handleCompare,
    isLiked,
    isReminded,
    isComparing,
    compareVendors
  } = useVendorActions();

  const vendorTypes = ["All", "Vegetables", "Spices", "Dairy", "Grains"];

  useEffect(() => {
    let filtered = vendors;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(vendor =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (selectedType !== "All") {
      filtered = filtered.filter(vendor => vendor.type === selectedType);
    }

    // Filter by price range
    filtered = filtered.filter(vendor => {
      const priceMatch = vendor.pricing.match(/₹(\d+)-(\d+)/);
      if (priceMatch) {
        const minPrice = parseInt(priceMatch[1]);
        const maxPrice = parseInt(priceMatch[2]);
        return maxPrice >= priceRange[0] && minPrice <= priceRange[1];
      }
      return true;
    });

    // Sort vendors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price_low":
          const aPriceMatch = a.pricing.match(/₹(\d+)/);
          const bPriceMatch = b.pricing.match(/₹(\d+)/);
          const aPrice = aPriceMatch ? parseInt(aPriceMatch[1]) : 0;
          const bPrice = bPriceMatch ? parseInt(bPriceMatch[1]) : 0;
          return aPrice - bPrice;
        case "price_high":
          const aPriceMatchHigh = a.pricing.match(/₹(\d+)-(\d+)/);
          const bPriceMatchHigh = b.pricing.match(/₹(\d+)-(\d+)/);
          const aPriceHigh = aPriceMatchHigh ? parseInt(aPriceMatchHigh[2]) : 0;
          const bPriceHigh = bPriceMatchHigh ? parseInt(bPriceMatchHigh[2]) : 0;
          return bPriceHigh - aPriceHigh;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredVendors(filtered);
  }, [searchTerm, selectedType, vendors, priceRange, sortBy]);

  const handleSelect = (vendorId: string) => {
    const vendor = vendors.find(v => v.id === vendorId);
    if (vendor) {
      handleCompare(vendor);
    }
  };

  const vendorsWithState = filteredVendors.map(vendor => ({
    ...vendor,
    isLiked: isLiked(vendor.id),
    isReminded: isReminded(vendor.id),
    isSelected: isComparing(vendor.id)
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-section text-foreground mb-2">Find Vendors</h1>
              <p className="text-muted-foreground">
                Discover trusted suppliers in your area
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Showing results for Delhi NCR</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <Card className="mb-8 shadow-soft">
          <CardHeader>
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search vendors, locations, or products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 shadow-soft"
                />
              </div>

              {/* Type Filter */}
              <div className="flex gap-2 flex-wrap">
                {vendorTypes.map(type => (
                  <Badge
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth"
                    onClick={() => setSelectedType(type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Selected Vendors Bar */}
        {compareVendors.length > 0 && (
          <Card className="mb-6 bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {compareVendors.length} vendor(s) selected for comparison
                  </span>
                  <Badge variant="default">{compareVendors.length}/3</Badge>
                </div>
                {compareVendors.length >= 2 && (
                  <Link to="/compare">
                    <Button variant="hero" size="sm">
                      Compare Selected
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Advanced Filters */}
        {showFilters && (
          <Card className="mb-6 shadow-soft">
            <CardHeader>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Price Range Filter */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={500}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                </div>

                {/* Sort By */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Sort By
                  </label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Highest Rating</SelectItem>
                      <SelectItem value="price_low">Price: Low to High</SelectItem>
                      <SelectItem value="price_high">Price: High to Low</SelectItem>
                      <SelectItem value="name">Name: A to Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
          </Card>
        )}

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredVendors.length} vendor(s)
          </p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            {showFilters ? "Hide Filters" : "More Filters"}
          </Button>
        </div>

        {/* Vendors Grid/List */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {vendorsWithState.map(vendor => (
            <div key={vendor.id} className={isComparing(vendor.id) ? "ring-2 ring-primary ring-offset-2 rounded-lg" : ""}>
              <VendorCard
                vendor={vendor}
                onLike={handleLike}
                onRemind={handleRemind}
                onSelect={handleSelect}
              />
            </div>
          ))}
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No vendors found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vendors;