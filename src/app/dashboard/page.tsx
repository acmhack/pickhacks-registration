"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ProtectedRoute } from "~/components/auth/ProtectedRoute";

export default function DashboardPage() {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch actual QR code from database
    // For now, generate a placeholder QR code using a free API
    const generateQRCode = async () => {
      try {
        // This is a placeholder - we'll replace with actual QR code from DB
        const mockData = "PICKHACKS2025-USER-12345";
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(mockData)}`;
        setQrCodeUrl(qrUrl);
      } catch (error) {
        console.error("Error generating QR code:", error);
      } finally {
        setLoading(false);
      }
    };

    void generateQRCode();
  }, []);

  return (
    <ProtectedRoute requireEmailVerification={true}>
      <div className="mx-auto max-w-5xl px-8 py-12">
        {/* Success Message */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#44ab48]">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Application Submitted
              </h1>
              <p className="mt-1 text-gray-600">
                Thank you for registering for PickHacks 2025! We&apos;ll email you
                with updates and event details.
              </p>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            Your QR Code
          </h2>
          <p className="mb-8 text-gray-500">
            Save this QR code to your phone. You&apos;ll need it to check in at the
            event and access meals and activities.
          </p>

          <div className="flex flex-col items-center">
            {loading ? (
              <div className="flex h-75 w-75 items-center justify-center rounded-xl bg-gray-50">
                <div className="text-gray-400">Loading...</div>
              </div>
            ) : (
              <>
                <div className="mb-6 rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm">
                  <Image
                    src={qrCodeUrl}
                    alt="Your PickHacks QR Code"
                    width={300}
                    height={300}
                    className="h-75 w-75"
                    unoptimized
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => window.print()}
                    className="rounded-lg bg-[#44ab48] px-6 py-3 font-medium text-white shadow-sm transition hover:bg-[#3a9c3e] hover:shadow"
                  >
                    Print QR Code
                  </button>
                  <a
                    href={qrCodeUrl}
                    download="pickhacks-qr-code.png"
                    className="rounded-lg border-2 border-[#44ab48] px-6 py-3 font-medium text-[#44ab48] transition hover:bg-[#e8f4e5]"
                  >
                    Download QR Code
                  </a>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Event Details */}
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Event Details
          </h2>
          <dl className="space-y-3">
            <div>
              <dt className="text-sm font-medium text-gray-500">Event</dt>
              <dd className="text-base text-gray-900">PickHacks 2025</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Date</dt>
              <dd className="text-base text-gray-900">TBD</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Location</dt>
              <dd className="text-base text-gray-900">
                Missouri University of Science and Technology
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Questions?</dt>
              <dd className="text-base text-gray-900">
                Reach out to us at{" "}
                <a
                  href="mailto:hello@pickhacks.io"
                  className="text-[#44ab48] hover:underline"
                >
                  hello@pickhacks.io
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </ProtectedRoute>
  );
}
