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
import type { Booking, Therapy, Contact, InsertTherapy, Physiotherapist, InsertPhysiotherapist } from "@shared/schema";

export default function Admin() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("bookings");
  const [isAddingTherapy, setIsAddingTherapy] = useState(false);
  const [isAddingPhysiotherapist, setIsAddingPhysiotherapist] = useState(false);
  const [editingPhysiotherapist, setEditingPhysiotherapist] = useState<Physiotherapist | null>(null);
  const [newTherapy, setNewTherapy] = useState({
    name: "",
    description: "",
    priceMin: "",
    priceMax: "",
    duration: "",
  });
  const [newPhysiotherapist, setNewPhysiotherapist] = useState({
    name: "",
    role: "",
    description: "",
    image: "",
    experience: "",
    specializations: "",
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

  const { data: physiotherapists, isLoading: physiotherapistsLoading } = useQuery<Physiotherapist[]>({
    queryKey: ["/api/physiotherapists"],
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

  // Add Physiotherapist Mutation
  const addPhysiotherapistMutation = useMutation({
    mutationFn: async (data: InsertPhysiotherapist) => {
      const response = await apiRequest("POST", "/api/physiotherapists", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Physiotherapist added successfully!",
      });
      setIsAddingPhysiotherapist(false);
      setNewPhysiotherapist({
        name: "",
        role: "",
        description: "",
        image: "",
        experience: "",
        specializations: "",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/physiotherapists"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error adding physiotherapist",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update Physiotherapist Mutation
  const updatePhysiotherapistMutation = useMutation({
    mutationFn: async (data: Physiotherapist) => {
      const response = await apiRequest("PUT", `/api/physiotherapists/${data.id}`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Physiotherapist updated successfully!",
      });
      setEditingPhysiotherapist(null);
      queryClient.invalidateQueries({ queryKey: ["/api/physiotherapists"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error updating physiotherapist",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete Physiotherapist Mutation
  const deletePhysiotherapistMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/physiotherapists/${id}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Physiotherapist removed successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/physiotherapists"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error removing physiotherapist",
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

  const handleAddPhysiotherapist = (e: React.FormEvent) => {
    e.preventDefault();
    addPhysiotherapistMutation.mutate({
      name: newPhysiotherapist.name,
      role: newPhysiotherapist.role,
      description: newPhysiotherapist.description,
      image: newPhysiotherapist.image || null,
      experience: newPhysiotherapist.experience,
      specializations: newPhysiotherapist.specializations,
      isActive: true,
    });
  };

  const handleUpdatePhysiotherapist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhysiotherapist) return;
    
    updatePhysiotherapistMutation.mutate({
      id: editingPhysiotherapist.id,
      name: editingPhysiotherapist.name,
      role: editingPhysiotherapist.role,
      description: editingPhysiotherapist.description,
      image: editingPhysiotherapist.image,
      experience: editingPhysiotherapist.experience,
      specializations: editingPhysiotherapist.specializations,
      isActive: editingPhysiotherapist.isActive,
      createdAt: editingPhysiotherapist.createdAt,
    });
  };

  const handleDeletePhysiotherapist = (id: number) => {
    if (confirm("Are you sure you want to remove this physiotherapist?")) {
      deletePhysiotherapistMutation.mutate(id);
    }
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookings" className="flex items-center">
              <CalendarCheck className="mr-2 h-4 w-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="therapies" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Therapies
            </TabsTrigger>
            <TabsTrigger value="physiotherapists" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              Team
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
                      <Card key={therapy.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{therapy.name}</h3>
                          <p className="text-gray-600 text-sm mb-4">{therapy.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-medical-blue font-medium">
                              ₹{therapy.priceMin} - ₹{therapy.priceMax}
                            </span>
                            <span className="text-gray-500 text-sm">{therapy.duration} min</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="physiotherapists">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Manage Team Members
                  <Button
                    onClick={() => setIsAddingPhysiotherapist(true)}
                    className="bg-medical-blue hover:bg-medical-dark text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Member
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isAddingPhysiotherapist && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Add New Team Member</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleAddPhysiotherapist} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="physio-name">Name</Label>
                            <Input
                              id="physio-name"
                              value={newPhysiotherapist.name}
                              onChange={(e) => setNewPhysiotherapist({ ...newPhysiotherapist, name: e.target.value })}
                              required
                              placeholder="Dr. John Doe"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="physio-role">Role</Label>
                            <Input
                              id="physio-role"
                              value={newPhysiotherapist.role}
                              onChange={(e) => setNewPhysiotherapist({ ...newPhysiotherapist, role: e.target.value })}
                              required
                              placeholder="Senior Physiotherapist"
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="physio-description">Description</Label>
                          <Textarea
                            id="physio-description"
                            value={newPhysiotherapist.description}
                            onChange={(e) => setNewPhysiotherapist({ ...newPhysiotherapist, description: e.target.value })}
                            required
                            placeholder="Brief description about the physiotherapist"
                            className="mt-1"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="physio-experience">Experience</Label>
                            <Input
                              id="physio-experience"
                              value={newPhysiotherapist.experience}
                              onChange={(e) => setNewPhysiotherapist({ ...newPhysiotherapist, experience: e.target.value })}
                              required
                              placeholder="10+ years"
                              className="mt-1"
                            />
                          </div>
                          <div className="col-span-2">
                            <Label htmlFor="physio-specializations">Specializations</Label>
                            <Input
                              id="physio-specializations"
                              value={newPhysiotherapist.specializations}
                              onChange={(e) => setNewPhysiotherapist({ ...newPhysiotherapist, specializations: e.target.value })}
                              required
                              placeholder="Sports Injury, Manual Therapy, Dry Needling"
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="physio-image">Image URL (optional)</Label>
                          <Input
                            id="physio-image"
                            value={newPhysiotherapist.image}
                            onChange={(e) => setNewPhysiotherapist({ ...newPhysiotherapist, image: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                            className="mt-1"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            type="submit"
                            disabled={addPhysiotherapistMutation.isPending}
                            className="bg-medical-blue hover:bg-medical-dark text-white"
                          >
                            {addPhysiotherapistMutation.isPending ? "Adding..." : "Add Member"}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsAddingPhysiotherapist(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {editingPhysiotherapist && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Edit Team Member</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleUpdatePhysiotherapist} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="edit-physio-name">Name</Label>
                            <Input
                              id="edit-physio-name"
                              value={editingPhysiotherapist.name}
                              onChange={(e) => setEditingPhysiotherapist({ ...editingPhysiotherapist, name: e.target.value })}
                              required
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-physio-role">Role</Label>
                            <Input
                              id="edit-physio-role"
                              value={editingPhysiotherapist.role}
                              onChange={(e) => setEditingPhysiotherapist({ ...editingPhysiotherapist, role: e.target.value })}
                              required
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="edit-physio-description">Description</Label>
                          <Textarea
                            id="edit-physio-description"
                            value={editingPhysiotherapist.description}
                            onChange={(e) => setEditingPhysiotherapist({ ...editingPhysiotherapist, description: e.target.value })}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="edit-physio-experience">Experience</Label>
                            <Input
                              id="edit-physio-experience"
                              value={editingPhysiotherapist.experience}
                              onChange={(e) => setEditingPhysiotherapist({ ...editingPhysiotherapist, experience: e.target.value })}
                              required
                              className="mt-1"
                            />
                          </div>
                          <div className="col-span-2">
                            <Label htmlFor="edit-physio-specializations">Specializations</Label>
                            <Input
                              id="edit-physio-specializations"
                              value={editingPhysiotherapist.specializations}
                              onChange={(e) => setEditingPhysiotherapist({ ...editingPhysiotherapist, specializations: e.target.value })}
                              required
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="edit-physio-image">Image URL</Label>
                          <Input
                            id="edit-physio-image"
                            value={editingPhysiotherapist.image || ""}
                            onChange={(e) => setEditingPhysiotherapist({ ...editingPhysiotherapist, image: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            type="submit"
                            disabled={updatePhysiotherapistMutation.isPending}
                            className="bg-medical-blue hover:bg-medical-dark text-white"
                          >
                            {updatePhysiotherapistMutation.isPending ? "Updating..." : "Update Member"}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setEditingPhysiotherapist(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {physiotherapistsLoading ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                      <Card key={i}>
                        <CardContent className="p-6">
                          <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
                          <Skeleton className="h-6 w-32 mx-auto mb-2" />
                          <Skeleton className="h-4 w-24 mx-auto mb-4" />
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-full" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {physiotherapists?.map((physio) => (
                      <Card key={physio.id} className="text-center hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <img 
                            src={physio.image || "static/PhysioImages/matPilates.webp"}
                            alt={physio.name}
                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-medical-blue/20"
                          />
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{physio.name}</h3>
                          <p className="text-medical-blue font-medium text-sm mb-2">{physio.role}</p>
                          <p className="text-gray-600 text-xs mb-3">{physio.experience}</p>
                          <p className="text-gray-600 text-xs mb-4 line-clamp-3">{physio.description}</p>
                          <div className="flex space-x-2 justify-center">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingPhysiotherapist(physio)}
                              className="text-medical-blue border-medical-blue hover:bg-medical-blue hover:text-white"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeletePhysiotherapist(physio.id)}
                              disabled={deletePhysiotherapistMutation.isPending}
                            >
                              <X className="h-3 w-3 mr-1" />
                              Remove
                            </Button>
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
                <CardTitle>Contact Form Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                {contactsLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-4 w-48 mb-2" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                  </div>
                ) : contacts && contacts.length > 0 ? (
                  <div className="space-y-4">
                    {contacts.map((contact) => (
                      <div key={contact.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{contact.subject}</h4>
                          <span className="text-gray-500 text-sm">
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            {contact.name}
                          </p>
                          <p className="flex items-center">
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
                        <p className="text-gray-700 mt-3">{contact.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <Mail className="h-12 w-12 mx-auto mb-4" />
                    <p className="text-lg">No contact submissions found</p>
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
