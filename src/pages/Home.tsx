import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  MapPin, 
  Star, 
  Users, 
  ShoppingCart,
  TrendingUp,
  Shield,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-market.jpg";
import vegetablesImage from "@/assets/vegetables-grid.jpg";
import spicesImage from "@/assets/spices-market.jpg";

const Home = () => {
  const features = [
    {
      icon: MapPin,
      title: "Location-Based Matching",
      description: "Find the closest vendors to your location automatically",
      color: "text-primary"
    },
    {
      icon: Star,
      title: "Verified Reviews",
      description: "Read honest reviews from fellow street food vendors",
      color: "text-secondary"
    },
    {
      icon: TrendingUp,
      title: "Price Comparison",
      description: "Compare prices across multiple suppliers instantly",
      color: "text-accent"
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "All vendors are verified for quality and reliability",
      color: "text-primary"
    }
  ];

  const stats = [
    { number: "500+", label: "Verified Vendors", icon: Users },
    { number: "10K+", label: "Happy Customers", icon: Star },
    { number: "50+", label: "Cities Covered", icon: MapPin },
    { number: "24/7", label: "Support", icon: Clock }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Indian street food market"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient opacity-80" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              🚀 Now serving 50+ cities across India
            </Badge>
            
            <h1 className="text-hero mb-6 leading-tight">
              Connect with the Best
              <span className="block text-secondary"> Ingredient Suppliers</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              StreetSource helps Indian street food vendors find, compare, and connect with 
              trusted ingredient suppliers in their neighborhood.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="secondary" size="xl" className="shadow-strong hover-glow">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/vendors">
                <Button variant="hero" size="xl" className="shadow-strong hover-glow">
                  Explore Vendors
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-section mb-4 text-foreground">
              Why Choose StreetSource?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've built the most comprehensive platform for street food vendors 
              to source ingredients efficiently and cost-effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover-lift border-border shadow-soft">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${feature.color} bg-current/10`}>
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Vendors */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-section mb-4 text-foreground">
              Trending Vendors
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Most popular vendors this week based on ratings and customer reviews
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { id: "2", name: "Spice Kingdom", rating: 4.9, location: "Old Delhi", image: spicesImage },
              { id: "1", name: "Fresh Veggie Mart", rating: 4.8, location: "Sector 15, Noida", image: vegetablesImage },
              { id: "4", name: "Masala Express", rating: 4.7, location: "Chandni Chowk", image: spicesImage }
            ].map((vendor, index) => (
              <Link key={index} to={`/vendor/${vendor.id}`}>
                <Card className="overflow-hidden hover-scale cursor-pointer shadow-soft">
                  <div className="relative h-48">
                    <img 
                      src={vendor.image} 
                      alt={vendor.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      Trending
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2">{vendor.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(vendor.rating)
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-foreground">{vendor.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {vendor.location}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mb-16">
            <h2 className="text-section mb-4 text-foreground">
              Fresh Ingredients, Delivered
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From farm-fresh vegetables to aromatic spices, find everything 
              you need for authentic Indian street food.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <Card className="hover-lift shadow-medium">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">Fresh Vegetables</h3>
                      <p className="text-muted-foreground text-sm">
                        Source the freshest vegetables directly from verified local suppliers.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift shadow-medium">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">Premium Spices</h3>
                      <p className="text-muted-foreground text-sm">
                        Access high-quality spices and seasonings at competitive prices.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img
                src={vegetablesImage}
                alt="Fresh vegetables"
                className="w-full h-48 object-cover rounded-lg shadow-medium hover-lift"
              />
              <img
                src={spicesImage}
                alt="Indian spices"
                className="w-full h-48 object-cover rounded-lg shadow-medium hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-section mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of street food vendors who have already streamlined 
            their ingredient sourcing with StreetSource.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button variant="secondary" size="lg" className="shadow-strong">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;