import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Clock, 
  ShoppingCart, 
  TrendingUp,
  MapPin,
  Star,
  Users,
  Package
} from "lucide-react";
import { Link } from "react-router-dom";
import { useVendorActions } from "@/hooks/useVendorActions";
import vendorProfileImage from "@/assets/vendor-profile.jpg";
import vegetablesImage from "@/assets/vegetables-grid.jpg";
import spicesImage from "@/assets/spices-market.jpg";

// Mock vendors data for lookup
const allVendors = [
  {
    id: "1",
    name: "Fresh Veggie Mart",
    type: "Vegetables",
    location: "Sector 15, Noida",
    rating: 4.8,
    pricing: "₹50-200/kg",
    imageUrl: vegetablesImage,
    description: "Premium fresh vegetables sourced directly from farms.",
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
    description: "Authentic Indian spices and masalas.",
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
    description: "Daily fresh vegetables with home delivery service.",
    phone: "+91 76543 21098",
    distance: "2.1 km"
  }
];

const Dashboard = () => {
  const { likedVendors, remindVendors, compareVendors } = useVendorActions();
  
  // Get vendor details from IDs
  const likedVendorDetails = allVendors.filter(vendor => likedVendors.includes(vendor.id));
  const remindVendorDetails = allVendors.filter(vendor => remindVendors.includes(vendor.id));

  const stats = [
    {
      title: "Liked Vendors",
      value: likedVendors.length.toString(),
      icon: Heart,
      color: "text-red-500",
      bgColor: "bg-red-50"
    },
    {
      title: "Reminders Set",
      value: remindVendors.length.toString(), 
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-50"
    },
    {
      title: "Total Orders",
      value: "48",
      icon: ShoppingCart,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Money Saved",
      value: "₹2,340",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-50"
    }
  ];

  const recentVendors = [
    {
      id: "1",
      name: "Fresh Veggie Mart",
      type: "Vegetables",
      rating: 4.8,
      distance: "0.8 km",
      status: "Available"
    },
    {
      id: "2", 
      name: "Spice Kingdom",
      type: "Spices",
      rating: 4.9,
      distance: "1.2 km",
      status: "Available"
    },
    {
      id: "3",
      name: "Green Harvest",
      type: "Vegetables", 
      rating: 4.6,
      distance: "2.1 km",
      status: "Busy"
    }
  ];

  const quickActions = [
    {
      title: "Find Vendors",
      description: "Discover new suppliers in your area",
      icon: Users,
      link: "/vendors",
      variant: "hero" as const
    },
    {
      title: "Compare Prices",
      description: "Compare multiple vendors side by side",
      icon: TrendingUp,
      link: "/compare",
      variant: "outline" as const
    },
    {
      title: "Order History",
      description: "View your past orders and invoices",
      icon: Package,
      link: "/orders",
      variant: "secondary" as const
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-section text-foreground mb-2">
                Welcome back, Vendor! 👋
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Your location: Delhi NCR</span>
              </div>
            </div>
            <Badge variant="secondary" className="px-4 py-2">
              Premium Member
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover-lift shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Card key={index} className="hover-lift border-border">
                        <CardContent className="p-6 text-center">
                          <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                            <Icon className="w-6 h-6" />
                          </div>
                          <h3 className="font-semibold text-foreground mb-2">
                            {action.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            {action.description}
                          </p>
                          <Link to={action.link}>
                            <Button variant={action.variant} size="sm" className="w-full">
                              Get Started
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Liked Vendors */}
          <div>
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Liked Vendors ({likedVendors.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {likedVendorDetails.length > 0 ? (
                    <>
                      {likedVendorDetails.slice(0, 3).map(vendor => (
                        <div key={vendor.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-smooth">
                          <div className="flex items-center gap-3">
                            <img 
                              src={vendor.imageUrl} 
                              alt={vendor.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <div>
                              <h4 className="font-medium text-foreground text-sm">{vendor.name}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">{vendor.type}</Badge>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                  <span className="text-xs text-muted-foreground">({vendor.rating})</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Link to={`/vendor/${vendor.id}`}>
                            <Button variant="outline" size="sm">View</Button>
                          </Link>
                        </div>
                      ))}
                      {likedVendorDetails.length > 3 && (
                        <p className="text-xs text-muted-foreground text-center">
                          +{likedVendorDetails.length - 3} more vendors
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <Heart className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No liked vendors yet</p>
                    </div>
                  )}
                </div>
                <Link to="/vendors">
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    Browse Vendors
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reminders & Activity */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                Reminders ({remindVendors.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {remindVendorDetails.length > 0 ? (
                  <>
                    {remindVendorDetails.slice(0, 3).map(vendor => (
                      <div key={vendor.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-smooth">
                        <div className="flex items-center gap-3">
                          <img 
                            src={vendor.imageUrl} 
                            alt={vendor.name}
                            className="w-8 h-8 rounded object-cover"
                          />
                          <div>
                            <h4 className="font-medium text-foreground text-sm">{vendor.name}</h4>
                            <p className="text-xs text-muted-foreground">{vendor.location}</p>
                          </div>
                        </div>
                        <Link to={`/vendor/${vendor.id}`}>
                          <Button variant="outline" size="sm">Visit</Button>
                        </Link>
                      </div>
                    ))}
                    {remindVendorDetails.length > 3 && (
                      <p className="text-xs text-muted-foreground text-center">
                        +{remindVendorDetails.length - 3} more reminders
                      </p>
                    )}
                  </>
                ) : (
                  <div className="text-center py-6">
                    <Clock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No reminders set</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Heart className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">Vendors Liked</span>
                  </div>
                  <Badge variant="default">{likedVendors.length}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-foreground">Reminders Set</span>
                  </div>
                  <Badge variant="secondary">{remindVendors.length}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm text-foreground">Comparing</span>
                  </div>
                  <Badge variant="outline">{compareVendors.length}/3</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;