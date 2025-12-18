"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProfileStep } from "~/components/registration/ProfileStep";
import { EducationStep } from "~/components/registration/EducationStep";
import { ShippingStep } from "~/components/registration/ShippingStep";
import { MlhStep } from "~/components/registration/MlhStep";
import { Button } from "~/components/ui/Button";
import type {
  ProfileFormData,
  EducationFormData,
  ShippingFormData,
  MlhFormData,
} from "~/utils/form-validation";

// TODO: Replace with actual data from database
const MOCK_SCHOOLS = [
  { id: "1", name: "Missouri University of Science and Technology" },
  { id: "2", name: "University of Missouri" },
  { id: "3", name: "Washington University in St. Louis" },
  { id: "4", name: "Saint Louis University" },
  { id: "5", name: "Other" },
];

const MOCK_COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "MX", name: "Mexico" },
  { code: "GB", name: "United Kingdom" },
  { code: "IN", name: "India" },
];

type Step = "profile" | "education" | "shipping" | "mlh";

const STEPS: Step[] = ["profile", "education", "shipping", "mlh"];

const STEP_TITLES = {
  profile: "Personal Information",
  education: "Education",
  shipping: "Shipping",
  mlh: "MLH Agreements",
};

export default function RegistrationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>("profile");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [profileData, setProfileData] = useState<Partial<ProfileFormData>>({});
  const [educationData, setEducationData] = useState<Partial<EducationFormData>>({});
  const [shippingData, setShippingData] = useState<Partial<ShippingFormData>>({});
  const [mlhData, setMlhData] = useState<Partial<MlhFormData>>({});

  const currentStepIndex = STEPS.indexOf(currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === STEPS.length - 1;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(STEPS[currentStepIndex + 1]!);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(STEPS[currentStepIndex - 1]!);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement actual form submission
      console.log("Submitting registration:", {
        profileData,
        educationData,
        shippingData,
        mlhData,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to success page or dashboard
      router.push("/dashboard");
    } catch (err) {
      setError("An error occurred while submitting your registration");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#e8f4e5] py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#074c72] mb-2">
            PickHacks 2025 Registration
          </h1>
          <p className="text-gray-600">
            Complete your registration to secure your spot!
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((step, index) => (
              <div key={step} className="flex-1">
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold transition ${
                      index <= currentStepIndex
                        ? "bg-[#44ab48] border-[#44ab48] text-white"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition ${
                        index < currentStepIndex
                          ? "bg-[#44ab48]"
                          : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
                <div className="text-xs text-center mt-2 text-gray-600">
                  {STEP_TITLES[step]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            {currentStep === "profile" && (
              <ProfileStep data={profileData} onChange={setProfileData} />
            )}
            {currentStep === "education" && (
              <EducationStep
                data={educationData}
                onChange={setEducationData}
                schools={MOCK_SCHOOLS}
              />
            )}
            {currentStep === "shipping" && (
              <ShippingStep
                data={shippingData}
                onChange={setShippingData}
                countries={MOCK_COUNTRIES}
              />
            )}
            {currentStep === "mlh" && (
              <MlhStep data={mlhData} onChange={setMlhData} />
            )}

            {error && (
              <div className="mt-6 rounded-md bg-red-50 p-3 text-sm text-red-800">
                {error}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={handlePrevious}
              disabled={isFirstStep}
              className={isFirstStep ? "invisible" : ""}
            >
              Previous
            </Button>

            {!isLastStep ? (
              <Button type="button" variant="primary" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? "Submitting..." : "Complete Registration"}
              </Button>
            )}
          </div>
        </form>

        {/* Help Text */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Need help?{" "}
            <a
              href="mailto:support@pickhacks.io"
              className="text-[#074c72] underline hover:text-[#44ab48]"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
