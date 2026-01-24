import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Check, ChevronRight, Leaf, MapPin, CreditCard, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { products, formatPrice, Product } from "@/data/products";

const steps = [
  { id: 1, name: "Product Summary", icon: Package },
  { id: 2, name: "Shipping Address", icon: MapPin },
  { id: 3, name: "Payment", icon: CreditCard },
];

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [addressData, setAddressData] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    const productId = searchParams.get("product");
    if (productId) {
      const foundProduct = products.find((p) => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
    localStorage.removeItem("pendingProduct");
  }, [searchParams]);

  const subtotal = product ? product.price * quantity : 0;
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your purchase. You will receive a confirmation shortly.",
      });
      navigate("/");
      setIsLoading(false);
    }, 2000);
  };

  if (!product) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">No Product Selected</h2>
            <p className="text-muted-foreground mb-4">Please select a product to checkout.</p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero p-4 py-8">
      <div className="container max-w-4xl">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-medium">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Fine</span>
          <span className="text-xl font-bold text-primary">Care</span>
        </Link>

        {/* Steps */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  currentStep >= step.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <step.icon className="w-4 h-4" />
                )}
                <span className="hidden sm:inline text-sm font-medium">{step.name}</span>
                <span className="sm:hidden text-sm font-medium">{step.id}</span>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-muted-foreground mx-1 md:mx-2" />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>
                  {currentStep === 1 && "Review Your Order"}
                  {currentStep === 2 && "Shipping Address"}
                  {currentStep === 3 && "Payment"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Step 1: Product Summary */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="flex gap-4 p-4 bg-secondary/50 rounded-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-primary">{formatPrice(product.price)}</span>
                          <div className="flex items-center gap-2">
                            <Label className="text-sm">Qty:</Label>
                            <select
                              value={quantity}
                              onChange={(e) => setQuantity(Number(e.target.value))}
                              className="border rounded px-2 py-1 text-sm"
                            >
                              {[1, 2, 3, 4, 5].map((n) => (
                                <option key={n} value={n}>{n}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => setCurrentStep(2)} className="w-full" size="lg">
                      Continue to Shipping
                    </Button>
                  </div>
                )}

                {/* Step 2: Address */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          placeholder="Enter full name"
                          value={addressData.fullName}
                          onChange={(e) => setAddressData({ ...addressData, fullName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={addressData.phone}
                          onChange={(e) => setAddressData({ ...addressData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="addressLine1">Address Line 1</Label>
                      <Input
                        id="addressLine1"
                        placeholder="House/Flat No., Building Name, Street"
                        value={addressData.addressLine1}
                        onChange={(e) => setAddressData({ ...addressData, addressLine1: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                      <Input
                        id="addressLine2"
                        placeholder="Landmark, Area"
                        value={addressData.addressLine2}
                        onChange={(e) => setAddressData({ ...addressData, addressLine2: e.target.value })}
                      />
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="City"
                          value={addressData.city}
                          onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          placeholder="State"
                          value={addressData.state}
                          onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode">PIN Code</Label>
                        <Input
                          id="pincode"
                          placeholder="6-digit PIN"
                          value={addressData.pincode}
                          onChange={(e) => setAddressData({ ...addressData, pincode: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                        Back
                      </Button>
                      <Button onClick={() => setCurrentStep(3)} className="flex-1">
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <h4 className="font-medium mb-3">Payment Options</h4>
                      <div className="space-y-3">
                        {[
                          { id: "cod", name: "Cash on Delivery", desc: "Pay when you receive" },
                          { id: "upi", name: "UPI Payment", desc: "PhonePe, GPay, Paytm" },
                          { id: "card", name: "Credit/Debit Card", desc: "Visa, Mastercard, RuPay" },
                          { id: "netbanking", name: "Net Banking", desc: "All major banks" },
                        ].map((method) => (
                          <label key={method.id} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                            <input type="radio" name="payment" value={method.id} defaultChecked={method.id === "cod"} className="text-primary" />
                            <div>
                              <p className="font-medium text-foreground">{method.name}</p>
                              <p className="text-xs text-muted-foreground">{method.desc}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                        Back
                      </Button>
                      <Button onClick={handlePlaceOrder} className="flex-1" disabled={isLoading}>
                        {isLoading ? "Processing..." : `Place Order • ${formatPrice(total)}`}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-elevated sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({quantity} item{quantity > 1 ? 's' : ''})</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-success">Free shipping on orders above ₹999!</p>
                )}
                <div className="border-t pt-4 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg text-primary">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Inclusive of all taxes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
