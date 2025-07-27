import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Plus, 
  Minus, 
  ShoppingCart,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";
import vendorProfileImage from "@/assets/vendor-profile.jpg";
import vegetablesImage from "@/assets/vegetables-grid.jpg";
import spicesImage from "@/assets/spices-market.jpg";

// Mock vendor data - same as in VendorDetails
const mockVendors = [
  {
    id: "1",
    name: "Fresh Veggie Mart",
    type: "Vegetables",
    location: "Sector 15, Noida",
    rating: 4.8,
    pricing: "₹50-200/kg",
    imageUrl: vegetablesImage,
    products: [
      { name: "Onions", price: 30, unit: "kg", inStock: true },
      { name: "Tomatoes", price: 40, unit: "kg", inStock: true },
      { name: "Carrots", price: 60, unit: "kg", inStock: true }
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
    products: [
      { name: "Cumin Powder", price: 180, unit: "kg", inStock: true },
      { name: "Turmeric", price: 120, unit: "kg", inStock: true },
      { name: "Red Chili Powder", price: 200, unit: "kg", inStock: true }
    ]
  }
];

interface CartItem {
  productName: string;
  price: number;
  quantity: number;
  unit: string;
}

const Cart = () => {
  const [searchParams] = useSearchParams();
  const vendorId = searchParams.get("vendorId");
  const [vendor, setVendor] = useState<any>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const foundVendor = mockVendors.find(v => v.id === vendorId);
    if (foundVendor) {
      setVendor(foundVendor);
      // Initialize cart with first product
      if (foundVendor.products.length > 0) {
        setCartItems([
          {
            productName: foundVendor.products[0].name,
            price: foundVendor.products[0].price,
            quantity: 1,
            unit: foundVendor.products[0].unit
          }
        ]);
      }
    }
  }, [vendorId]);

  const addToCart = (product: any) => {
    const existingItem = cartItems.find(item => item.productName === product.name);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.productName === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        productName: product.name,
        price: product.price,
        quantity: 1,
        unit: product.unit
      }]);
    }
    toast.success(`${product.name} added to cart`);
  };

  const updateQuantity = (productName: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.productName !== productName));
    } else {
      setCartItems(cartItems.map(item =>
        item.productName === productName
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleConfirmOrder = () => {
    // Save order to localStorage (in real app, send to backend)
    const order = {
      orderId: `ORD-${Date.now()}`,
      vendorId: vendor.id,
      vendorName: vendor.name,
      items: cartItems,
      totalAmount: getTotalPrice(),
      date: new Date().toISOString(),
      status: "Confirmed"
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    setOrderPlaced(true);
    toast.success("Order placed successfully!");
  };

  if (!vendor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Vendor not found</h2>
          <Link to="/vendors">
            <Button variant="outline">Back to Vendors</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto shadow-soft">
          <CardContent className="text-center p-8">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">Order Confirmed!</h2>
            <p className="text-muted-foreground mb-6">
              Your order from {vendor.name} has been placed successfully.
            </p>
            <div className="space-y-3">
              <Link to="/orders" className="block">
                <Button variant="hero" className="w-full">
                  View Order History
                </Button>
              </Link>
              <Link to="/vendors" className="block">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-4">
            <Link to={`/vendor/${vendor.id}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Vendor
              </Button>
            </Link>
          </div>
          <h1 className="text-section text-foreground">Shopping Cart</h1>
          <p className="text-muted-foreground">Order from {vendor.name}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Available Products */}
          <div className="lg:col-span-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Available Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vendor.products.map((product: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h3 className="font-medium text-foreground">{product.name}</h3>
                        <p className="text-primary font-semibold">₹{product.price}/{product.unit}</p>
                      </div>
                      <Button
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        size="sm"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cart Summary */}
          <div>
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    Your cart is empty
                  </p>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{item.productName}</p>
                          <p className="text-sm text-muted-foreground">₹{item.price}/{item.unit}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.productName, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.productName, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span className="font-medium">₹{getTotalPrice()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Delivery:</span>
                        <span className="font-medium">Free</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total:</span>
                        <span className="text-primary">₹{getTotalPrice()}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={handleConfirmOrder}
                        className="w-full"
                        variant="hero"
                        disabled={cartItems.length === 0}
                      >
                        Cash on Delivery
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        Pay when your order arrives
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;