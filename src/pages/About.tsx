import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Users, 
  TrendingUp, 
  Shield,
  Heart,
  MapPin,
  Zap,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-market.jpg";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "Empowering street food vendors with smart sourcing solutions"
    },
    {
      icon: Shield,
      title: "Trust & Quality",
      description: "Every vendor is verified and quality-assured for your peace of mind"
    },
    {
      icon: Heart,
      title: "Community First",
      description: "Building strong connections within the street food ecosystem"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Leveraging technology to solve real-world sourcing challenges"
    }
  ];

  const achievements = [
    { number: "500+", label: "Verified Vendors", icon: Users },
    { number: "10,000+", label: "Happy Customers", icon: Heart },
    { number: "50+", label: "Cities", icon: MapPin },
    { number: "99%", label: "Satisfaction Rate", icon: Award }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src={heroImage}
            alt="About StreetSource"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary">
              About StreetSource
            </Badge>
            <h1 className="text-hero mb-6 text-foreground">
              Revolutionizing Ingredient Sourcing for 
              <span className="text-primary"> Street Food Vendors</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              StreetSource was born from a simple observation: street food vendors in India 
              spend countless hours searching for quality ingredients at fair prices. We're 
              here to change that.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-section mb-6 text-foreground">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2024, StreetSource emerged from our founders' deep 
                  understanding of the challenges faced by Indian street food vendors. 
                  After spending months talking to vendors across Delhi, Mumbai, and 
                  Bangalore, we realized the same problems kept surfacing.
                </p>
                <p>
                  Vendors were spending 3-4 hours daily just sourcing ingredients, 
                  often traveling long distances without knowing if they'd find quality 
                  products at fair prices. Many were paying inflated costs due to lack 
                  of alternatives.
                </p>
                <p>
                  We decided to build a platform that would connect vendors directly 
                  with verified suppliers, enabling price comparison, quality assurance, 
                  and location-based matching. Today, StreetSource serves over 10,000 
                  vendors across 50+ cities.
                </p>
              </div>
              <div className="mt-8">
                <Link to="/register">
                  <Button variant="hero" size="lg">
                    Join Our Community
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <Card key={index} className="text-center hover-lift shadow-medium">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {achievement.number}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {achievement.label}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-section mb-4 text-foreground">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do at StreetSource
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center hover-lift border-border shadow-soft">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-lg flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-section mb-4 text-foreground">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're a passionate team of technologists, designers, and food enthusiasts 
              dedicated to empowering street food vendors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Arjun Sharma",
                role: "Co-Founder & CEO",
                bio: "Former street food vendor turned tech entrepreneur. 10+ years in the food industry."
              },
              {
                name: "Priya Patel",
                role: "Co-Founder & CTO",
                bio: "Ex-Google engineer passionate about solving local problems with technology."
              },
              {
                name: "Raj Kumar",
                role: "Head of Operations",
                bio: "Supply chain expert with deep knowledge of Indian food distribution networks."
              }
            ].map((member, index) => (
              <Card key={index} className="text-center hover-lift shadow-medium">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-section mb-4 text-foreground">Our Impact</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real results for real people in the street food industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover-lift shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <TrendingUp className="w-5 h-5" />
                  Cost Savings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">₹1.2L+</div>
                <p className="text-muted-foreground text-sm">
                  Average annual savings per vendor through better pricing and reduced travel time
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Users className="w-5 h-5" />
                  Time Saved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">15hrs</div>
                <p className="text-muted-foreground text-sm">
                  Hours saved per week on sourcing activities, allowing vendors to focus on their business
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Shield className="w-5 h-5" />
                  Quality Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">95%</div>
                <p className="text-muted-foreground text-sm">
                  Of vendors report improved ingredient quality since joining StreetSource
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-section mb-4">Ready to Transform Your Sourcing?</h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of vendors who have already streamlined their ingredient sourcing with StreetSource.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button variant="secondary" size="lg">
                Get Started Today
              </Button>
            </Link>
            <Link to="/vendors">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Browse Vendors
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;