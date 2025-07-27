import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Clock, Star, MapPin, Phone, Eye } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface VendorCardProps {
  vendor: {
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
    isLiked?: boolean;
    isReminded?: boolean;
  };
  onLike?: (vendorId: string) => void;
  onRemind?: (vendorId: string) => void;
  onSelect?: (vendorId: string) => void;
}

const VendorCard = ({ vendor, onLike, onRemind, onSelect }: VendorCardProps) => {
  const [isLiked, setIsLiked] = useState(vendor.isLiked || false);
  const [isReminded, setIsReminded] = useState(vendor.isReminded || false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.(vendor.id);
  };

  const handleRemind = () => {
    setIsReminded(!isReminded);
    onRemind?.(vendor.id);
  };

  const handleSelect = () => {
    onSelect?.(vendor.id);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className="group hover-lift overflow-hidden bg-card border border-border">
      <div className="relative">
        <img
          src={vendor.imageUrl}
          alt={vendor.name}
          className="w-full h-48 object-cover transition-smooth group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 space-y-2">
          <Button
            variant={isLiked ? "like" : "outline"}
            size="icon"
            className="shadow-medium bg-white/90 backdrop-blur-sm border-white/50"
            onClick={handleLike}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </Button>
          <Button
            variant={isReminded ? "remind" : "outline"}
            size="icon"
            className="shadow-medium bg-white/90 backdrop-blur-sm border-white/50"
            onClick={handleRemind}
          >
            <Clock className={`w-4 h-4 ${isReminded ? "fill-current" : ""}`} />
          </Button>
        </div>
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground shadow-medium">
          {vendor.type}
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-smooth">
            {vendor.name}
          </h3>
          <div className="flex items-center gap-1">
            {renderStars(vendor.rating)}
            <span className="text-sm text-muted-foreground ml-1">
              ({vendor.rating})
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {vendor.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{vendor.location}</span>
            {vendor.distance && (
              <Badge variant="secondary" className="text-xs">
                {vendor.distance}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>{vendor.phone}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-muted-foreground">Price Range:</span>
            <p className="font-semibold text-foreground">{vendor.pricing}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={handleSelect}
        >
          Select
        </Button>
        <Link to={`/vendor/${vendor.id}`} className="flex-1">
          <Button variant="default" size="sm" className="w-full">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default VendorCard;