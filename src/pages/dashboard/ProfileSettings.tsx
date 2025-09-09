import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { User, Camera, Save } from "lucide-react";
import { toast } from "sonner";
import { profileUpdateSchema, sanitizeInput, type ProfileUpdateData } from "@/lib/validation";
import { supabase } from "@/integrations/supabase/client";
import { useOutletContext } from "react-router-dom";

interface OutletContext {
  isMobile?: boolean;
}

export const ProfileSettings = () => {
  const { user } = useAuth();
  const { isMobile = false } = useOutletContext<OutletContext>();
  const [isLoading, setIsLoading] = useState(false);
  
  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || "User";
  const initials = displayName.slice(0, 2).toUpperCase();

  const [formData, setFormData] = useState({
    display_name: displayName,
    email: user?.email || "",
    phone: "",
    bio: "",
    location: "",
    website: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // Sanitize inputs
      const sanitizedData = {
        display_name: sanitizeInput(formData.display_name),
        bio: formData.bio ? sanitizeInput(formData.bio) : undefined,
        phone: formData.phone ? sanitizeInput(formData.phone) : undefined,
        website: formData.website ? sanitizeInput(formData.website) : undefined,
        location: formData.location ? sanitizeInput(formData.location) : undefined,
      };

      // Validate data
      const validatedData = profileUpdateSchema.parse(sanitizedData);

      // Update profile in database
      const { error } = await supabase
        .from('profiles')
        .update(validatedData)
        .eq('user_id', user?.id);

      if (error) throw error;

      toast.success("Profile updated successfully!");
    } catch (error: any) {
      if (error.issues) {
        // Zod validation errors
        const newErrors: Record<string, string> = {};
        error.issues.forEach((issue: any) => {
          newErrors[issue.path[0]] = issue.message;
        });
        setErrors(newErrors);
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header - Mobile responsive */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className={isMobile ? 'p-4' : 'p-6'}>
          <h1 className={`font-bold text-foreground ${isMobile ? 'text-xl' : 'text-3xl'}`}>
            Profile Settings
          </h1>
          <p className={`text-muted-foreground ${isMobile ? 'mt-1 text-sm' : 'mt-2'}`}>
            Manage your personal information and preferences
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto ${isMobile ? 'p-4' : 'p-6'}`}>
        <div className="max-w-2xl space-y-6">
          {/* Profile Picture */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profile Picture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="" alt={displayName} />
                  <AvatarFallback className="text-xl">{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="mb-2">
                    <Camera className="h-4 w-4 mr-2" />
                    Change Picture
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    JPG, GIF or PNG. 1MB max.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={formData.display_name}
                      onChange={(e) => handleInputChange("display_name", e.target.value)}
                      placeholder="Enter your display name"
                      className={errors.display_name ? "border-destructive" : ""}
                    />
                    {errors.display_name && (
                      <p className="text-sm text-destructive">{errors.display_name}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      disabled
                      placeholder="Enter your email"
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter your phone number"
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Enter your location"
                      className={errors.location ? "border-destructive" : ""}
                    />
                    {errors.location && (
                      <p className="text-sm text-destructive">{errors.location}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    placeholder="https://your-website.com"
                    className={errors.website ? "border-destructive" : ""}
                  />
                  {errors.website && (
                    <p className="text-sm text-destructive">{errors.website}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    className={errors.bio ? "border-destructive" : ""}
                  />
                  {errors.bio && (
                    <p className="text-sm text-destructive">{errors.bio}</p>
                  )}
                </div>

                <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};