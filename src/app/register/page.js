import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormSection } from "@/components/FormSection";
import { toast } from "sonner";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15),
  dob: z.string().min(1, "Date of birth is required"),
  college: z.string().min(2, "College name is required").max(200),
  courseYear: z.string().min(2, "Course and year is required").max(100),
  city: z.string().min(2, "City/State is required").max(100),
  gender: z.enum(["male", "female", "prefer-not-to-say"]),
  instagram: z.string().min(1, "Instagram username is required"),
  linkedin: z.string().optional(),
  instagramFollowers: z.string().min(1, "Please select a range"),
  postActivity: z.string().min(1, "Please select an option"),
  motivation: z.string().min(10, "Please provide more details (at least 10 characters)").max(500),
  previousExperience: z.enum(["yes", "no"]),
  experienceDescription: z.string().min(10, "Please provide details about your experience (at least 10 characters)").max(500),
  skills: z.array(z.string()).min(1, "Please select at least one skill"),
  responsibilities: z.array(z.string()).min(1, "Please select at least one responsibility"),
  hoursPerWeek: z.string().min(1, "Please select hours per week"),
  availability: z.string().min(1, "Please select availability"),
  studentIdCard: z.any().optional(),
  profilePhoto: z.any().optional(),
  additionalInfo: z.string().optional(),
  agreement: z.boolean().refine((val) => val === true, "You must agree to the terms"),
});

type FormData = z.infer<typeof formSchema>;

const Index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: [],
      responsibilities: [],
      agreement: false,
    },
  });

  const selectedSkills = watch("skills") || [];
  const selectedResponsibilities = watch("responsibilities") || [];

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    toast.success("Application submitted successfully!");
  };

  const toggleSkill = (skill: string) => {
    const current = selectedSkills;
    const updated = current.includes(skill)
      ? current.filter((s) => s !== skill)
      : [...current, skill];
    setValue("skills", updated);
  };

  const toggleResponsibility = (responsibility: string) => {
    const current = selectedResponsibilities;
    const updated = current.includes(responsibility)
      ? current.filter((r) => r !== responsibility)
      : [...current, responsibility];
    setValue("responsibilities", updated);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            InnovateX Campus Ambassador Application
          </h1>
          <p className="text-muted-foreground mb-8">
            Fill out the details below to apply as a Campus Ambassador for the InnovateX hackathon.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Section 1: Personal Details */}
            <FormSection
              title="Section 1: Personal Details"
              description="Tell us a bit about yourself and your college information."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <p className="text-destructive text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+91-XXXXX-XXXXX"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="dob">
                    Date of Birth <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="dob"
                    type="date"
                    placeholder="dd-mm-yyyy"
                    {...register("dob")}
                  />
                  {errors.dob && (
                    <p className="text-destructive text-sm mt-1">{errors.dob.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="college">
                    College / Institute Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="college"
                    placeholder="Enter your college or institute"
                    {...register("college")}
                  />
                  {errors.college && (
                    <p className="text-destructive text-sm mt-1">{errors.college.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="courseYear">
                    Course & Year <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="courseYear"
                    placeholder="e.g., B.Voc - 1st Year"
                    {...register("courseYear")}
                  />
                  {errors.courseYear && (
                    <p className="text-destructive text-sm mt-1">{errors.courseYear.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="city">City / State</Label>
                  <Input
                    id="city"
                    placeholder="Enter your city and state"
                    {...register("city")}
                  />
                  {errors.city && (
                    <p className="text-destructive text-sm mt-1">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <Label>Gender</Label>
                  <RadioGroup
                    onValueChange={(value) => setValue("gender", value as any)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="font-normal">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="font-normal">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                      <Label htmlFor="prefer-not-to-say" className="font-normal">Prefer not to say</Label>
                    </div>
                  </RadioGroup>
                  {errors.gender && (
                    <p className="text-destructive text-sm mt-1">{errors.gender.message}</p>
                  )}
                </div>
              </div>
            </FormSection>

            {/* Section 2: Social Media Presence */}
            <FormSection
              title="Section 2: Social Media Presence"
              description="Share your online presence so we can understand your outreach."
            >
              <div>
                <Label htmlFor="instagram">Instagram Username</Label>
                <Input
                  id="instagram"
                  placeholder="@username"
                  {...register("instagram")}
                />
                <p className="text-muted-foreground text-xs mt-1">
                  We may reach out or view your profile to understand your content style.
                </p>
                {errors.instagram && (
                  <p className="text-destructive text-sm mt-1">{errors.instagram.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="linkedin">LinkedIn Profile (optional)</Label>
                <Input
                  id="linkedin"
                  placeholder="https://www.linkedin.com/in/your-profile"
                  {...register("linkedin")}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="instagramFollowers">Instagram Followers (approx.)</Label>
                  <Select onValueChange={(value) => setValue("instagramFollowers", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-500">0-500</SelectItem>
                      <SelectItem value="500-1000">500-1,000</SelectItem>
                      <SelectItem value="1000-5000">1,000-5,000</SelectItem>
                      <SelectItem value="5000+">5,000+</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.instagramFollowers && (
                    <p className="text-destructive text-sm mt-1">{errors.instagramFollowers.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="postActivity">Do you post actively on social media?</Label>
                  <Select onValueChange={(value) => setValue("postActivity", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="sometimes">Sometimes</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.postActivity && (
                    <p className="text-destructive text-sm mt-1">{errors.postActivity.message}</p>
                  )}
                </div>
              </div>
            </FormSection>

            {/* Section 3: Skills & Experience */}
            <FormSection
              title="Section 3: Skills & Experience"
              description="Tell us why you are a good fit for this Ambassador role."
            >
              <div>
                <Label htmlFor="motivation">
                  Why do you want to become ambassadors? <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="motivation"
                  placeholder="Share your motivation, what excites you about this role, and how you plan to contribute."
                  rows={4}
                  {...register("motivation")}
                />
                <p className="text-muted-foreground text-xs mt-1">
                  A few short paragraphs are enough. Be specific and concise.
                </p>
                {errors.motivation && (
                  <p className="text-destructive text-sm mt-1">{errors.motivation.message}</p>
                )}
              </div>

              <div>
                <Label>Previous ambassador/leadership experience?</Label>
                <RadioGroup
                  onValueChange={(value) => setValue("previousExperience", value as any)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="exp-yes" />
                    <Label htmlFor="exp-yes" className="font-normal">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="exp-no" />
                    <Label htmlFor="exp-no" className="font-normal">No</Label>
                  </div>
                </RadioGroup>
                {errors.previousExperience && (
                  <p className="text-destructive text-sm mt-1">{errors.previousExperience.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="experienceDescription">
                  Reason why you applied for ambassadors <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="experienceDescription"
                  placeholder="Mention any ambassador, club leadership, or event organizing experience."
                  rows={3}
                  {...register("experienceDescription")}
                />
                {errors.experienceDescription && (
                  <p className="text-destructive text-sm mt-1">{errors.experienceDescription.message}</p>
                )}
              </div>

              <div>
                <Label>Skills (select all that apply)</Label>
                <div className="mt-2 space-y-2">
                  {[
                    "Communication",
                    "Social Media Marketing",
                    "Public Speaking",
                    "Designing (Canva/Figma)",
                    "Team Leadership",
                    "Event Management",
                  ].map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={skill}
                        checked={selectedSkills.includes(skill)}
                        onCheckedChange={() => toggleSkill(skill)}
                      />
                      <Label htmlFor={skill} className="font-normal">
                        {skill}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.skills && (
                  <p className="text-destructive text-sm mt-1">{errors.skills.message}</p>
                )}
              </div>
            </FormSection>

            {/* Section 4: Responsibilities & Availability */}
            <FormSection
              title="Section 4: Responsibilities & Availability"
              description="Help us understand how you can support the campaign."
            >
              <div>
                <Label>Willing to do the following?</Label>
                <div className="mt-2 space-y-2">
                  {[
                    "Promote on social media",
                    "Share in WhatsApp groups",
                    "Help students register",
                    "Represent the hackathon in your class",
                    "Give feedback to organizers",
                  ].map((responsibility) => (
                    <div key={responsibility} className="flex items-center space-x-2">
                      <Checkbox
                        id={responsibility}
                        checked={selectedResponsibilities.includes(responsibility)}
                        onCheckedChange={() => toggleResponsibility(responsibility)}
                      />
                      <Label htmlFor={responsibility} className="font-normal">
                        {responsibility}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.responsibilities && (
                  <p className="text-destructive text-sm mt-1">{errors.responsibilities.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hoursPerWeek">Hours per week commitment</Label>
                  <Select onValueChange={(value) => setValue("hoursPerWeek", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3">1-3 hours</SelectItem>
                      <SelectItem value="3-5">3-5 hours</SelectItem>
                      <SelectItem value="5-10">5-10 hours</SelectItem>
                      <SelectItem value="10+">10+ hours</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.hoursPerWeek && (
                    <p className="text-destructive text-sm mt-1">{errors.hoursPerWeek.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="availability">Available till the event completes?</Label>
                  <Select onValueChange={(value) => setValue("availability", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="maybe">Maybe</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.availability && (
                    <p className="text-destructive text-sm mt-1">{errors.availability.message}</p>
                  )}
                </div>
              </div>
            </FormSection>

            {/* Section 5: Uploads & Agreement */}
            <FormSection
              title="Section 5: Uploads & Agreement"
              description="Add your documents and accept the terms of the program."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="studentIdCard">Upload Student ID Card (optional)</Label>
                  <Input
                    id="studentIdCard"
                    type="file"
                    accept="image/*,.pdf"
                    {...register("studentIdCard")}
                    className="cursor-pointer"
                  />
                </div>

                <div>
                  <Label htmlFor="profilePhoto">
                    Upload Profile Photo <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="profilePhoto"
                    type="file"
                    accept="image/*"
                    {...register("profilePhoto")}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="additionalInfo">Any additional information (optional)</Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Add anything else you would like us to know (availability, special constraints, ideas, etc.)."
                  rows={3}
                  {...register("additionalInfo")}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreement"
                    checked={watch("agreement")}
                    onCheckedChange={(checked) => setValue("agreement", checked as boolean)}
                  />
                  <Label htmlFor="agreement" className="font-normal text-sm leading-relaxed">
                    <span className="text-destructive">*</span> I confirm that the information provided is
                    true and I agree to follow the rules of the Campus Ambassador program.
                  </Label>
                </div>
                {errors.agreement && (
                  <p className="text-destructive text-sm">{errors.agreement.message}</p>
                )}
                <p className="text-muted-foreground text-xs">
                  By submitting, you apply for the InnovateX Campus Ambassador role.
                </p>
              </div>
            </FormSection>

            <div className="flex justify-end">
              <Button type="submit" size="lg" className="px-8">
                Submit Application
              </Button>
            </div>

            <p className="text-muted-foreground text-xs text-center">
              Please review your details before submitting. Fields marked with{" "}
              <span className="text-destructive">*</span> are required.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;