import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/components/auth/auth-provider";
import { Link } from "wouter";
import { SEOHead, getArticleSchema } from "@/components/seo/seo-head";
import { CalendarCheck, Clock, User, Edit, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Therapy, Booking, InsertBooking } from "@shared/schema";

export default function Booking() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
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
        title: "Appointment booked successfully!",
        description: "We'll contact you soon to confirm your appointment.",
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

  const updateBookingMutation = useMutation({
    mutationFn: async ({ id, ...data }: { id: number } & Partial<InsertBooking>) => {
      const response = await apiRequest("PUT", `/api/bookings/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking updated successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating booking",
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
    
    const bookingData: InsertBooking = {
      userId: user?.id,
      therapyId: parseInt(formData.therapyId),
      patientName: formData.patientName,
      patientPhone: formData.patientPhone,
      patientEmail: formData.patientEmail || undefined,
      patientAge: formData.patientAge ? parseInt(formData.patientAge) : undefined,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
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
    <div className="py-16 bg-white">
      <SEOHead
        title="Book Physiotherapy Appointment Online Panipat | Dukhniwaran Physiotherapy"
        description="Book your physiotherapy appointment online at Dukhniwaran Physiotherapy Panipat. Choose from cupping therapy, dry needling, IASTM, and more. Easy online booking system."
        keywords="book physiotherapy appointment Panipat, online appointment booking physiotherapy, Dukhniwaran Physiotherapy booking, physiotherapy appointment Panipat, book therapy session online"
        schema={getArticleSchema("Book Physiotherapy Appointment", "Online appointment booking for physiotherapy services in Panipat")}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Book Your Appointment
          </h1>
          <p className="text-xl text-gray-800 font-medium">
            Schedule your therapy session with our expert team
          </p>
        </div>

        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarCheck className="mr-2 h-5 w-5" />
              Appointment Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="patientName">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="patientPhone">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="patientPhone"
                    name="patientPhone"
                    type="tel"
                    value={formData.patientPhone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your phone number"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="patientEmail">Email Address</Label>
                  <Input
                    id="patientEmail"
                    name="patientEmail"
                    type="email"
                    value={formData.patientEmail}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="patientAge">Age</Label>
                  <Input
                    id="patientAge"
                    name="patientAge"
                    type="number"
                    min="1"
                    max="120"
                    value={formData.patientAge}
                    onChange={handleInputChange}
                    placeholder="Enter your age"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Therapy Selection */}
              <div>
                <Label htmlFor="therapyId">
                  Select Therapy <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.therapyId}
                  onValueChange={(value) => handleSelectChange("therapyId", value)}
                  required
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose a therapy" />
                  </SelectTrigger>
                  <SelectContent>
                    {therapiesLoading ? (
                      <div className="p-2">Loading therapies...</div>
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

              {/* Date and Time Selection */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="appointmentDate">
                    Preferred Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="appointmentDate"
                    name="appointmentDate"
                    type="date"
                    min={minDate}
                    value={formData.appointmentDate}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="appointmentTime">
                    Preferred Time <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.appointmentTime}
                    onValueChange={(value) => handleSelectChange("appointmentTime", value)}
                    required
                  >
                    <SelectTrigger className="mt-1">
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

              {/* Additional Notes */}
              <div>
                <Label htmlFor="additionalNotes">
                  Additional Notes or Symptoms
                </Label>
                <Textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Please describe your symptoms or any additional information"
                  className="mt-1"
                />
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={bookingMutation.isPending}
                  className="bg-medical-blue hover:bg-medical-dark text-white px-8 py-3"
                  size="lg"
                >
                  <CalendarCheck className="mr-2 h-5 w-5" />
                  {bookingMutation.isPending ? "Booking..." : "Book Appointment"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Booking History Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Your Booking History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!isAuthenticated ? (
              <div className="text-center text-gray-500 py-8">
                <User className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg mb-4">Please log in to view your booking history</p>
                <Link href="/login">
                  <Button className="bg-medical-blue hover:bg-medical-dark text-white">
                    Login to View History
                  </Button>
                </Link>
              </div>
            ) : bookingsLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <div className="flex space-x-2">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : bookings && bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {getTherapyName(booking.therapyId)}
                        </h4>
                        <p className="text-gray-600">
                          Date: {new Date(booking.appointmentDate).toLocaleDateString()} at{" "}
                          {new Date(`2000-01-01T${booking.appointmentTime}`).toLocaleTimeString('en-US', { 
                            hour: 'numeric', 
                            minute: '2-digit', 
                            hour12: true 
                          })}
                        </p>
                        <p className="text-gray-600">
                          Patient: {booking.patientName}
                        </p>
                        <p className="text-gray-600">
                          Status:{" "}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        {booking.status === "pending" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-medical-blue border-medical-blue hover:bg-medical-blue hover:text-white"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCancelBooking(booking.id)}
                              className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                              disabled={cancelBookingMutation.isPending}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <CalendarCheck className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg">No bookings found</p>
                <p className="text-sm">Your future appointments will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
