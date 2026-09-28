import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { User, Camera, Save } from "lucide-react";
import { toast } from "sonner";
import { profileUpdateSchema, sanitizeInput } from "@/lib/validation";
import { supabase } from "@/integrations/supabase/client";
import { useOutletContext } from "react-router-dom";

interface OutletContext {
  isMobile?: boolean;
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export const ProfileSettings = () => {
  const { user } = useAuth();
  const { isMobile = false } = useOutletContext<OutletContext>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  const fallbackName = user?.user_metadata?.display_name || user?.email?.split("@")[0] || "User";
  const [formData, setFormData] = useState({
    display_name: fallbackName,
    email: user?.email || "",
    phone: "",
    bio: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const initials = (formData.display_name || fallbackName).slice(0, 2).toUpperCase();

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("display_name, phone, bio, avatar_url")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) return;
        setFormData((current) => ({
          ...current,
          display_name: data.display_name || current.display_name,
          phone: data.phone || "",
          bio: data.bio || "",
          email: user.email || "",
        }));
        setAvatarUrl(data.avatar_url || "");
      });
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);
    setErrors({});

    try {
      const validatedData = profileUpdateSchema.parse({
        display_name: sanitizeInput(formData.display_name),
        bio: formData.bio ? sanitizeInput(formData.bio) : undefined,
        phone: formData.phone ? sanitizeInput(formData.phone) : undefined,
      });

      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: validatedData.display_name,
          bio: validatedData.bio ?? "",
          phone: validatedData.phone ?? "",
        })
        .eq("user_id", user.id);

      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (error: unknown) {
      const issues = (error as { issues?: { path: (string | number)[]; message: string }[] }).issues;
      if (issues) {
        const newErrors: Record<string, string> = {};
        issues.forEach((issue) => {
          newErrors[String(issue.path[0])] = issue.message;
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
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const uploadPicture = async (file: File | undefined) => {
    if (!file || !user) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Choose an image file.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      toast.error("Image must be 5MB or smaller.");
      return;
    }

    setUploading(true);
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${user.id}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage.from("profile").upload(path, file, {
      contentType: file.type,
    });
    if (uploadError) {
      setUploading(false);
      toast.error(uploadError.message);
      return;
    }

    const { data } = supabase.storage.from("profile").getPublicUrl(path);
    const { error } = await supabase
      .from("profiles")
      .update({ avatar_url: data.publicUrl })
      .eq("user_id", user.id);
    setUploading(false);

    if (error) {
      toast.error("Picture uploaded, but the profile was not updated.");
      return;
    }

    setAvatarUrl(data.publicUrl);
    toast.success("Profile picture updated.");
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className={isMobile ? "p-4" : "p-6"}>
          <h1 className={`font-bold text-foreground ${isMobile ? "text-xl" : "text-3xl"}`}>
            Profile Settings
          </h1>
          <p className={`text-muted-foreground ${isMobile ? "mt-1 text-sm" : "mt-2"}`}>
            Manage your personal information and preferences
          </p>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto ${isMobile ? "p-4" : "p-6"}`}>
        <div className="max-w-2xl space-y-6">
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
                  <AvatarImage src={avatarUrl} alt={formData.display_name} />
                  <AvatarFallback className="text-xl">{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      uploadPicture(event.target.files?.[0]);
                      event.target.value = "";
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="mb-2"
                    disabled={uploading}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    {uploading ? "Uploading..." : "Change Picture"}
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    JPG, GIF or PNG. 5MB max.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

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
