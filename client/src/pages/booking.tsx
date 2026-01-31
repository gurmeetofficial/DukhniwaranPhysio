import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/components/auth/auth-provider";
import { Link } from "wouter";
import { SEOHead, getArticleSchema } from "@/components/seo/seo-head";
import { CalendarCheck, Clock, User, Edit, X, ChevronDown, ChevronUp, PhoneCall, Calendar as CalendarIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Therapy, Booking, InsertBooking } from "@shared/schema";

export default function Booking() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const [formData, setFormData] = useState({
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    patientAge: "",
    therapyId: "",
    appointmentDate: "",
    appointmentTime: "",
    additionalNotes: "",
  });

  const { data: therapies, isLoading: therapiesLoading } = useQuery<Therapy[]>({
    queryKey: ["/api/therapies"],
  });

  const { data: bookings, isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
    enabled: isAuthenticated,
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: InsertBooking) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Request Received!",
        description: formData.appointmentDate
          ? "We'll confirm your appointment shortly."
          : "Our team will call you back to schedule your appointment.",
        className: "bg-green-50 border-green-200",
      });
      setFormData({
        patientName: "",
        patientPhone: "",
        patientEmail: "",
        patientAge: "",
        therapyId: "",
        appointmentDate: "",
        appointmentTime: "",
        additionalNotes: "",
      });
      setIsAdvancedOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error booking appointment",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const cancelBookingMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/bookings/${id}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking cancelled successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error cancelling booking",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.patientPhone || !formData.therapyId) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in your Name, Phone Number, and select a Therapy.",
        variant: "destructive",
      });
      return;
    }

    const bookingData: InsertBooking = {
      userId: user?.id,
      therapyId: parseInt(formData.therapyId),
      patientName: formData.patientName,
      patientPhone: formData.patientPhone,
      patientEmail: formData.patientEmail || undefined,
      patientAge: formData.patientAge ? parseInt(formData.patientAge) : undefined,
      appointmentDate: formData.appointmentDate || undefined,
      appointmentTime: formData.appointmentTime || undefined,
      additionalNotes: formData.additionalNotes || undefined,
      status: "pending",
    };
    bookingMutation.mutate(bookingData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCancelBooking = (bookingId: number) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      cancelBookingMutation.mutate(bookingId);
    }
  };

  const getTherapyName = (therapyId: number) => {
    return therapies?.find(t => t.id === therapyId)?.name || "Unknown Therapy";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-600 bg-green-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-yellow-600 bg-yellow-100";
    }
  };

  // Set minimum date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00",
    "14:00", "15:00", "16:00", "17:00"
  ];

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <SEOHead
        title="Book Physiotherapy Appointment Online Panipat | Dukhniwaran Physiotherapy"
        description="Quick & easy appointment booking at Dukhniwaran Physiotherapy Panipat. Request a callback or schedule your specific time slot online."
        keywords="book physiotherapy appointment Panipat, online appointment booking physiotherapy, Dukhniwaran Physiotherapy booking"
        schema={getArticleSchema("Book Physiotherapy Appointment", "Online appointment booking for physiotherapy services in Panipat")}
      />
      <div className="page-container max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Book Your Appointment
          </h1>
          <p className="text-lg text-gray-600">
            Fill in your details below and we will get back to you securely.
          </p>
        </div>

        <Card className="mb-12 shadow-md border-medical-blue/20">
          <CardHeader className="bg-white border-b border-gray-100">
            <CardTitle className="flex items-center text-xl text-medical-blue">
              <CalendarCheck className="mr-2 h-6 w-6" />
              New Appointment
            </CardTitle>
            <CardDescription>
              Quick booking: Just enter your name, phone, and therapy.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Essential Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="patientName" className="font-semibold">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patientPhone" className="font-semibold">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="patientPhone"
                    name="patientPhone"
                    type="tel"
                    value={formData.patientPhone}
                    onChange={handleInputChange}
                    required
                    placeholder="+91 98765 43210"
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="therapyId" className="font-semibold">
                  Select Therapy <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.therapyId}
                  onValueChange={(value) => handleSelectChange("therapyId", value)}
                  required
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Choose a therapy..." />
                  </SelectTrigger>
                  <SelectContent>
                    {therapiesLoading ? (
                      <div className="p-2 text-center text-sm text-gray-500">Loading therapies...</div>
                    ) : (
                      therapies?.map((therapy) => (
                        <SelectItem key={therapy.id} value={therapy.id.toString()}>
                          {therapy.name} (₹{therapy.priceMin} - ₹{therapy.priceMax})
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Advanced Options Collapsible */}
              <Collapsible
                open={isAdvancedOpen}
                onOpenChange={setIsAdvancedOpen}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  {/* Keep layout clean */}
                </div>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" type="button" className="w-full flex items-center justify-between p-0 h-auto hover:bg-transparent hover:text-medical-blue text-gray-500">
                    <span className="text-sm font-medium">Add more details (Optional) - Date, Email, Notes</span>
                    {isAdvancedOpen ? (
                      <ChevronUp className="h-4 w-4 ml-2" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-2" />
                    )}
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent className="pt-4 space-y-6 animate-slide-up">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="patientEmail">Email Address</Label>
                      <Input
                        id="patientEmail"
                        name="patientEmail"
                        type="email"
                        value={formData.patientEmail}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patientAge">Age</Label>
                      <Input
                        id="patientAge"
                        name="patientAge"
                        type="number"
                        min="1"
                        max="120"
                        value={formData.patientAge}
                        onChange={handleInputChange}
                        placeholder="Age"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="appointmentDate">Preferred Date</Label>
                      <Input
                        id="appointmentDate"
                        name="appointmentDate"
                        type="date"
                        min={minDate}
                        value={formData.appointmentDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="appointmentTime">Preferred Time</Label>
                      <Select
                        value={formData.appointmentTime}
                        onValueChange={(value) => handleSelectChange("appointmentTime", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => {
                            const [hour, minute] = time.split(':');
                            const displayTime = new Date(0, 0, 0, parseInt(hour), parseInt(minute))
                              .toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true
                              });
                            return (
                              <SelectItem key={time} value={time}>
                                {displayTime}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Any specific symptoms or requests?"
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  disabled={bookingMutation.isPending}
                  className="w-full md:w-auto bg-medical-blue hover:bg-medical-dark text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all rounded-xl"
                >
                  {bookingMutation.isPending ? (
                    "Processing..."
                  ) : (
                    <>
                      {isAdvancedOpen && formData.appointmentDate ? (
                        <>
                          <CalendarIcon className="mr-2 h-5 w-5" />
                          Book Appointment
                        </>
                      ) : (
                        <>
                          <PhoneCall className="mr-2 h-5 w-5" />
                          Request Callback
                        </>
                      )}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Booking History Section */}
        {isAuthenticated && (
          <Card className="mt-8 border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Clock className="mr-2 h-5 w-5 text-gray-500" />
                Your Booking History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {bookingsLoading ? (
                <div className="space-y-4">
                  {[...Array(2)].map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              ) : bookings && bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="bg-white p-4 rounded-lg border border-gray-100 hover:border-medical-blue/30 transition-colors shadow-sm">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg">
                            {getTherapyName(booking.therapyId)}
                          </h4>
                          <div className="text-sm text-gray-500 mt-1 space-y-1">
                            <p>
                              <span className="font-medium">Date:</span> {booking.appointmentDate ? new Date(booking.appointmentDate).toLocaleDateString() : 'TBD (Callback Requested)'}
                            </p>
                            {booking.appointmentTime && (
                              <p>
                                <span className="font-medium">Time:</span> {new Date(`2000-01-01T${booking.appointmentTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                              </p>
                            )}
                            <p>
                              <span className="font-medium">Status:</span>{" "}
                              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2 w-full sm:w-auto">
                          {booking.status === "pending" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCancelBooking(booking.id)}
                              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 w-full sm:w-auto"
                              disabled={cancelBookingMutation.isPending}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <p>No past bookings found.</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
