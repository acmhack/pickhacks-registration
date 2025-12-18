"use client";

import { FormInput } from "~/components/ui/FormInput";
import { Select } from "~/components/ui/Select";
import { TSHIRT_SIZE_OPTIONS } from "~/utils/form-options";
import type { ShippingFormData } from "~/utils/form-validation";

interface ShippingStepProps {
  data: Partial<ShippingFormData>;
  onChange: (data: Partial<ShippingFormData>) => void;
  countries: Array<{ code: string; name: string }>;
}

export function ShippingStep({
  data,
  onChange,
  countries,
}: ShippingStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-[#074c72] mb-2">
          Shipping Information
        </h2>
        <p className="text-gray-600 text-sm">
          Where should we send your swag?
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address Line 1 *
        </label>
        <FormInput
          type="text"
          name="addressLine1"
          value={data.addressLine1 ?? ""}
          onChange={(e) =>
            onChange({ ...data, addressLine1: e.target.value })
          }
          placeholder="123 Main St"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address Line 2 (Optional)
        </label>
        <FormInput
          type="text"
          name="addressLine2"
          value={data.addressLine2 ?? ""}
          onChange={(e) =>
            onChange({ ...data, addressLine2: e.target.value })
          }
          placeholder="Apt 4B"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City *
          </label>
          <FormInput
            type="text"
            name="city"
            value={data.city ?? ""}
            onChange={(e) => onChange({ ...data, city: e.target.value })}
            placeholder="San Francisco"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State/Province *
          </label>
          <FormInput
            type="text"
            name="state"
            value={data.state ?? ""}
            onChange={(e) => onChange({ ...data, state: e.target.value })}
            placeholder="CA"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country *
          </label>
          <Select
            name="country"
            value={data.country ?? ""}
            onChange={(value) => onChange({ ...data, country: value })}
            options={countries.map((c) => ({ value: c.code, label: c.name }))}
            placeholder="Select country"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code *
          </label>
          <FormInput
            type="text"
            name="postalCode"
            value={data.postalCode ?? ""}
            onChange={(e) =>
              onChange({ ...data, postalCode: e.target.value })
            }
            placeholder="94102"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          T-Shirt Size (Optional)
        </label>
        <Select
          name="tshirtSize"
          value={data.tshirtSize ?? ""}
          onChange={(value) => onChange({ ...data, tshirtSize: value })}
          options={TSHIRT_SIZE_OPTIONS}
          placeholder="Select size"
        />
      </div>
    </div>
  );
}
