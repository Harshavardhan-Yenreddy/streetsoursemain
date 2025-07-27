import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  DollarSign, 
  MapPin, 
  AlertTriangle,
  TrendingDown,
  Users,
  ShoppingCart,
  Zap,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Problems = () => {
  const problems = [
    {
      icon: Clock,
      title: "Time Waste",
      stat: "3-4 hours daily",
      description: "Vendors spend excessive time traveling between suppliers, often without guarantee of finding what they need.",
      impact: "Lost revenue opportunity of ₹500-800 per day",
      color: "text-red-500",
      bgColor: "bg-red-50"
    },
    {
      icon: DollarSign,
      title: "Price Uncertainty",
      stat: "20-30% higher costs",
      description: "Without price comparison tools, vendors often pay inflated prices due to lack of market transparency.",
      impact: "Extra ₹15,000-25,000 spent annually",
      color: "text-orange-500",
      bgColor: "bg-orange-50"
    },
    {
      icon: MapPin,
      title: "Location Challenges",
      stat: "5-10 km travel",
      description: "Vendors travel long distances to find suppliers, increasing transportation costs and time.",
      impact: "₹200-400 daily on transport costs",
      color: "text-amber-500",
      bgColor: "bg-amber-50"
    },
    {
      icon: AlertTriangle,
      title: "Quality Issues",
      stat: "40% reject rate",
      description: "Inconsistent quality from unverified suppliers leads to food safety concerns and customer complaints.",
      impact: "Lost customers and reputation damage",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: TrendingDown,
      title: "Inventory Waste",
      stat: "15% spoilage",
      description: "Poor planning and unreliable suppliers result in overstocking or understocking of ingredients.",
      impact: "₹5,000-8,000 monthly losses",
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    },
    {
      icon: Users,
      title: "Limited Network",
      stat: "3-5 suppliers",
      description: "Most vendors rely on a small network of suppliers, limiting their bargaining power and options.",
      impact: "Missed opportunities for better deals",
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    }
  ];

  const solutions = [
    {
      problem: "Time Waste",
      solution: "Smart vendor matching based on location and requirements",
      benefit: "Save 2-3 hours daily"
    },
    {
      problem: "Price Uncertainty", 
      solution: "Real-time price comparison across multiple suppliers",
      benefit: "Save 15-25% on costs"
    },
    {
      problem: "Location Challenges",
      solution: "GPS-based vendor discovery within 2km radius",
      benefit: "Reduce travel by 70%"
    },
    {
      problem: "Quality Issues",
      solution: "Verified vendors with ratings and reviews",
      benefit: "99% quality consistency"
    },
    {
      problem: "Inventory Waste",
      solution: "Demand forecasting and order planning tools",
      benefit: "Reduce waste by 60%"
    },
    {
      problem: "Limited Network",
      solution: "Access to 500+ verified suppliers across categories",
      benefit: "10x more options"
    }
  ];

  const testimonials = [
    {
      quote: "I was spending 4 hours every morning just finding fresh vegetables. Now it takes 30 minutes to place orders through StreetSource.",
      author: "Rajesh Kumar",
      business: "Rajesh Chaat Corner, Delhi",
      savings: "Saves ₹800 daily"
    },
    {
      quote: "The price comparison feature helped me discover I was overpaying by 25%. My profit margins have improved significantly.",
      author: "Meera Devi",
      business: "Meera's Dosa Stall, Bangalore",
      savings: "₹20,000 saved annually"
    },
    {
      quote: "Finding quality spice suppliers was my biggest challenge. StreetSource connected me with verified suppliers near my location.",
      author: "Ahmed Ali",
      business: "Ali's Biryani Cart, Mumbai",
      savings: "40% less travel time"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-red-100 text-red-600">
              Critical Industry Problems
            </Badge>
            <h1 className="text-hero mb-6 text-foreground">
              The Hidden Challenges 
              <span className="text-red-500"> Every Street Food Vendor</span> Faces
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Street food vendors across India lose thousands of rupees monthly due to 
              inefficient ingredient sourcing. Here's the reality behind the scenes.
            </p>
          </div>
        </div>
      </section>

      {/* Problems Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-section mb-4 text-foreground">
              The Real Problems
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Based on our research with 1000+ street food vendors across India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <Card key={index} className="hover-lift shadow-medium border-l-4 border-l-red-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-lg ${problem.bgColor}`}>
                        <Icon className={`w-6 h-6 ${problem.color}`} />
                      </div>
                      <Badge variant="destructive" className="text-xs">
                        {problem.stat}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-foreground">
                      {problem.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {problem.description}
                    </p>
                    <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                      <p className="text-red-700 text-xs font-medium">
                        💸 Impact: {problem.impact}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solutions Comparison */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-section mb-4 text-foreground">
              How StreetSource Solves These Problems
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every problem has a solution. Here's how we're addressing each challenge.
            </p>
          </div>

          <div className="space-y-6">
            {solutions.map((item, index) => (
              <Card key={index} className="hover-lift shadow-soft">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6 items-center">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        {item.problem}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground flex-1">
                        {item.solution}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <Badge variant="default" className="bg-green-100 text-green-700">
                        {item.benefit}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-section mb-4 text-foreground">
              Real Vendors, Real Results
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what vendors are saying about their transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-lift shadow-medium">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <p className="text-muted-foreground italic leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {testimonial.business}
                    </p>
                    <Badge variant="default" className="bg-green-100 text-green-700">
                      {testimonial.savings}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-section mb-4">The Cost of Doing Nothing</h2>
            <p className="text-lg text-white/90">
              Here's what vendors lose annually by not optimizing their sourcing
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "₹1.2L", label: "Lost to inefficient sourcing" },
              { number: "1000+", label: "Hours wasted annually" },
              { number: "30%", label: "Higher costs on average" },
              { number: "40%", label: "Quality-related losses" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-white/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="shadow-strong bg-gradient-to-r from-primary to-primary-light text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-section mb-4">Ready to Solve These Problems?</h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Join StreetSource today and transform your ingredient sourcing from a daily struggle 
                into a competitive advantage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button variant="secondary" size="lg" className="shadow-strong">
                    <Zap className="w-5 h-5 mr-2" />
                    Start Solving Today
                  </Button>
                </Link>
                <Link to="/vendors">
                  <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Browse Solutions
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Problems;