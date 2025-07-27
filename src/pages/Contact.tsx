import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  MessageSquare,
  Send,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: "general"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate form submission
    toast.success("Message sent successfully! We'll get back to you within 24 hours.");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      category: "general"
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: "+91 98765 43210",
      subtitle: "Mon-Sat, 9 AM - 8 PM",
      color: "text-primary"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: "support@streetsource.in",
      subtitle: "We respond within 4 hours",
      color: "text-secondary"
    },
    {
      icon: MapPin,
      title: "Head Office",
      details: "Sector 18, Noida, UP",
      subtitle: "Visit us for partnerships",
      color: "text-accent"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Sat: 9 AM - 8 PM",
      subtitle: "Sunday: 10 AM - 6 PM",
      color: "text-primary"
    }
  ];

  const faqs = [
    {
      question: "How do I verify a vendor on StreetSource?",
      answer: "All vendors are pre-verified by our team. You can check their ratings, reviews, and verification badges on their profile."
    },
    {
      question: "What if I'm not satisfied with a vendor's service?",
      answer: "You can report issues through the app, leave reviews, and our support team will help resolve any problems within 24 hours."
    },
    {
      question: "How does the price comparison feature work?",
      answer: "Our platform shows real-time prices from multiple vendors for the same products, helping you make informed decisions."
    },
    {
      question: "Is there a delivery service available?",
      answer: "Many vendors offer delivery services. You can filter by delivery availability when browsing vendors."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary">
              Get in Touch
            </Badge>
            <h1 className="text-hero mb-6 text-foreground">
              We're Here to Help
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have questions about StreetSource? Need support with your account? 
              Our team is ready to assist you.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-strong">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Send us a Message
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="vendor">Vendor Partnership</option>
                        <option value="billing">Billing Issue</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full md:w-auto">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${info.color} bg-current/10`}>
                        <Icon className={`w-5 h-5 ${info.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">
                          {info.title}
                        </h3>
                        <p className="text-foreground font-medium">
                          {info.details}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {info.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Response Time Card */}
            <Card className="shadow-medium bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold text-foreground">Quick Response</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  We typically respond to all inquiries within 4 hours during business hours.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <Badge variant="default">4 hours</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <Badge variant="default">Immediate</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Issues:</span>
                    <Badge variant="default">24 hours</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-section mb-4 text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find quick answers to common questions about StreetSource
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover-lift shadow-soft">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="mt-16">
          <Card className="shadow-strong bg-red-50 border-red-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold text-red-700 mb-4">
                Emergency Support
              </h3>
              <p className="text-red-600 mb-6">
                For urgent issues affecting your business operations, call our emergency hotline:
              </p>
              <div className="flex items-center justify-center gap-4">
                <Phone className="w-5 h-5 text-red-600" />
                <span className="text-xl font-bold text-red-700">
                  +91 98765 43210
                </span>
              </div>
              <p className="text-sm text-red-600 mt-4">
                Available 24/7 for critical issues
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Contact;