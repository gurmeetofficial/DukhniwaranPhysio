import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/components/auth/auth-provider";
import { useLocation } from "wouter";
import { 
  CalendarCheck, 
  Settings, 
  User, 
  Mail, 
  Phone, 
  Edit, 
  X, 
  Plus,
  Clock
} from "lucide-react";
import type { Booking, Therapy, Contact, InsertTherapy } from "@shared/schema";

export default function Admin() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("bookings");
  const [isAddingTherapy, setIsAddingTherapy] = useState(false);
  const [newTherapy, setNewTherapy] = useState({
    name: "",
    description: "",
    priceMin: "",
    priceMax: "",
    duration: "",
  });

  // Redirect if not admin
  if (!user?.isAdmin) {
    setLocation("/");
    return null;
  }

  const { data: bookings, isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
  });

  const { data: therapies, isLoading: therapiesLoading } = useQuery<Therapy[]>({
    queryKey: ["/api/therapies"],
  });

  const { data: contacts, isLoading: contactsLoading } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
  });

  const updateBookingMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await apiRequest("PUT", `/api/bookings/${id}`, { status });
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

  const addTherapyMutation = useMutation({
    mutationFn: async (data: InsertTherapy) => {
      const response = await apiRequest("POST", "/api/therapies", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Therapy added successfully!",
      });
      setIsAddingTherapy(false);
      setNewTherapy({ name: "", description: "", priceMin: "", priceMax: "", duration: "" });
      queryClient.invalidateQueries({ queryKey: ["/api/therapies"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error adding therapy",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleBookingStatusUpdate = (id: number, status: string) => {
    updateBookingMutation.mutate({ id, status });
  };

  const handleAddTherapy = (e: React.FormEvent) => {
    e.preventDefault();
    addTherapyMutation.mutate({
      name: newTherapy.name,
      description: newTherapy.description,
      priceMin: parseInt(newTherapy.priceMin),
      priceMax: parseInt(newTherapy.priceMax),
      duration: parseInt(newTherapy.duration),
      isActive: true,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getTherapyName = (therapyId: number) => {
    return therapies?.find(t => t.id === therapyId)?.name || "Unknown Therapy";
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Admin Panel</h1>
          <p className="text-xl text-gray-600">Manage bookings, therapies, and contacts</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookings" className="flex items-center">
              <CalendarCheck className="mr-2 h-4 w-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="therapies" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Therapies
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              Contacts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {bookingsLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-48" />
                            <Skeleton className="h-4 w-40" />
                          </div>
                          <div className="flex space-x-2">
                            <Skeleton className="h-8 w-20" />
                            <Skeleton className="h-8 w-20" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : bookings && bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {getTherapyName(booking.therapyId)}
                            </h4>
                            <div className="text-sm text-gray-600 space-y-1 mt-2">
                              <p className="flex items-center">
                                <User className="h-4 w-4 mr-2" />
                                {booking.patientName}
                              </p>
                              <p className="flex items-center">
                                <Phone className="h-4 w-4 mr-2" />
                                {booking.patientPhone}
                              </p>
                              {booking.patientEmail && (
                                <p className="flex items-center">
                                  <Mail className="h-4 w-4 mr-2" />
                                  {booking.patientEmail}
                                </p>
                              )}
                              <p className="flex items-center">
                                <Clock className="h-4 w-4 mr-2" />
                                {new Date(booking.appointmentDate).toLocaleDateString()} at{" "}
                                {new Date(`2000-01-01T${booking.appointmentTime}`).toLocaleTimeString('en-US', { 
                                  hour: 'numeric', 
                                  minute: '2-digit', 
                                  hour12: true 
                                })}
                              </p>
                            </div>
                            <div className="mt-2">
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                            </div>
                            {booking.additionalNotes && (
                              <p className="text-sm text-gray-600 mt-2">
                                <strong>Notes:</strong> {booking.additionalNotes}
                              </p>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            {booking.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleBookingStatusUpdate(booking.id, "confirmed")}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                  disabled={updateBookingMutation.isPending}
                                >
                                  Confirm
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleBookingStatusUpdate(booking.id, "cancelled")}
                                  disabled={updateBookingMutation.isPending}
                                >
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
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="therapies">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Manage Therapies
                  <Button
                    onClick={() => setIsAddingTherapy(true)}
                    className="bg-medical-blue hover:bg-medical-dark text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Therapy
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isAddingTherapy && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Add New Therapy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleAddTherapy} className="space-y-4">
                        <div>
                          <Label htmlFor="therapy-name">Therapy Name</Label>
                          <Input
                            id="therapy-name"
                            value={newTherapy.name}
                            onChange={(e) => setNewTherapy({ ...newTherapy, name: e.target.value })}
                            required
                            placeholder="Enter therapy name"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="therapy-description">Description</Label>
                          <Textarea
                            id="therapy-description"
                            value={newTherapy.description}
                            onChange={(e) => setNewTherapy({ ...newTherapy, description: e.target.value })}
                            required
                            placeholder="Enter therapy description"
                            className="mt-1"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="price-min">Min Price (₹)</Label>
                            <Input
                              id="price-min"
                              type="number"
                              value={newTherapy.priceMin}
                              onChange={(e) => setNewTherapy({ ...newTherapy, priceMin: e.target.value })}
                              required
                              placeholder="800"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="price-max">Max Price (₹)</Label>
                            <Input
                              id="price-max"
                              type="number"
                              value={newTherapy.priceMax}
                              onChange={(e) => setNewTherapy({ ...newTherapy, priceMax: e.target.value })}
                              required
                              placeholder="1200"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="duration">Duration (minutes)</Label>
                            <Input
                              id="duration"
                              type="number"
                              value={newTherapy.duration}
                              onChange={(e) => setNewTherapy({ ...newTherapy, duration: e.target.value })}
                              required
                              placeholder="60"
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            type="submit"
                            disabled={addTherapyMutation.isPending}
                            className="bg-medical-blue hover:bg-medical-dark text-white"
                          >
                            {addTherapyMutation.isPending ? "Adding..." : "Add Therapy"}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsAddingTherapy(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {therapiesLoading ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <Card key={i}>
                        <CardContent className="p-6">
                          <Skeleton className="h-6 w-32 mb-2" />
                          <Skeleton className="h-4 w-full mb-4" />
                          <div className="flex items-center justify-between">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-8 w-16" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {therapies?.map((therapy) => (
                      <Card key={therapy.id}>
                        <CardContent className="p-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            {therapy.name}
                          </h4>
                          <p className="text-gray-600 mb-4 text-sm">{therapy.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-medical-blue font-semibold">
                              ₹{therapy.priceMin} - ₹{therapy.priceMax}
                            </span>
                            <Badge variant="outline">
                              {therapy.duration} min
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                {contactsLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <Card key={i}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-24" />
                          </div>
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-3/4" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : contacts && contacts.length > 0 ? (
                  <div className="space-y-4">
                    {contacts.map((contact) => (
                      <Card key={contact.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{contact.subject}</h4>
                            <span className="text-sm text-gray-500">
                              {new Date(contact.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            <p className="flex items-center mb-1">
                              <User className="h-4 w-4 mr-2" />
                              {contact.name}
                            </p>
                            <p className="flex items-center mb-1">
                              <Mail className="h-4 w-4 mr-2" />
                              {contact.email}
                            </p>
                            {contact.phone && (
                              <p className="flex items-center">
                                <Phone className="h-4 w-4 mr-2" />
                                {contact.phone}
                              </p>
                            )}
                          </div>
                          <p className="text-gray-700 bg-gray-50 p-3 rounded">
                            {contact.message}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <Mail className="h-12 w-12 mx-auto mb-4" />
                    <p className="text-lg">No contact messages</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
