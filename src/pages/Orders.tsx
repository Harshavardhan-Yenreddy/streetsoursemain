import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Package, MapPin, Phone, Star, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

interface Order {
  id: string;
  vendorName: string;
  vendorId: string;
  items: string[];
  totalAmount: number;
  date: string;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  vendorLocation: string;
  vendorPhone: string;
  vendorRating: number;
}

// Mock data - in real app this would come from backend
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    vendorName: "Fresh Veggie Mart",
    vendorId: "1",
    items: ["Tomatoes (2kg)", "Onions (3kg)", "Potatoes (5kg)"],
    totalAmount: 350,
    date: "2024-01-20",
    status: "delivered",
    vendorLocation: "Sector 15, Noida",
    vendorPhone: "+91 98765 43210",
    vendorRating: 4.8
  },
  {
    id: "ORD-002", 
    vendorName: "Spice Kingdom",
    vendorId: "2",
    items: ["Turmeric Powder (500g)", "Red Chili Powder (1kg)", "Garam Masala (250g)"],
    totalAmount: 450,
    date: "2024-01-18",
    status: "confirmed",
    vendorLocation: "Old Delhi, Delhi",
    vendorPhone: "+91 87654 32109",
    vendorRating: 4.9
  },
  {
    id: "ORD-003",
    vendorName: "Green Harvest", 
    vendorId: "3",
    items: ["Spinach (1kg)", "Carrots (2kg)", "Bell Peppers (1kg)"],
    totalAmount: 280,
    date: "2024-01-15",
    status: "pending",
    vendorLocation: "Malviya Nagar, Delhi",
    vendorPhone: "+91 76543 21098",
    vendorRating: 4.6
  }
];

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'delivered' | 'cancelled'>('all');

  useEffect(() => {
    // In real app, fetch from backend
    setOrders(mockOrders);
  }, []);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(order => order.status === filter);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-section text-foreground mb-2">Order History</h1>
              <p className="text-muted-foreground">
                Track your orders and reorder from your favorite vendors
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">{orders.length} total orders</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['all', 'pending', 'confirmed', 'delivered', 'cancelled'] as const).map(status => (
            <Badge
              key={status}
              variant={filter === status ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth capitalize"
              onClick={() => setFilter(status)}
            >
              {status === 'all' ? 'All Orders' : status}
              {status !== 'all' && (
                <span className="ml-1 text-xs">
                  ({orders.filter(o => o.status === status).length})
                </span>
              )}
            </Badge>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">No orders found</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              {filter === 'all' 
                ? "You haven't placed any orders yet. Start by browsing our vendors."
                : `No ${filter} orders found. Try selecting a different filter.`
              }
            </p>
            <Link to="/vendors">
              <Button variant="hero">Browse Vendors</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map(order => (
              <Card key={order.id} className="overflow-hidden hover-lift">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-lg">{order.vendorName}</CardTitle>
                        <div className="flex items-center gap-1">
                          {renderStars(order.vendorRating)}
                          <span className="text-sm text-muted-foreground">({order.vendorRating})</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="w-4 h-4" />
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {order.vendorLocation}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(order.status) + " border"}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Order #{order.id}</div>
                        <div className="text-lg font-semibold text-primary">₹{order.totalAmount}</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Items Ordered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {order.items.map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Vendor Contact */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      {order.vendorPhone}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reorder
                      </Button>
                      <Link to={`/vendor/${order.vendorId}`}>
                        <Button variant="default" size="sm">
                          View Vendor
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;