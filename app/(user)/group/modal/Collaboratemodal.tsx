import React, { useState } from "react";
import { X } from "lucide-react";

interface ModalProps {
  heading: string;
  first_label_name: string;
  first_placeholder: string;
  second_label_name?: string;
  second_placeholder?: string;
  onClose: () => void;
  onSubmit?: (data: { firstInput: string; secondInput: string }) => void;
}

const Modal: React.FC<ModalProps> = ({
  heading,
  first_label_name,
  first_placeholder,
  second_label_name,
  second_placeholder,
  onClose,
  onSubmit,
}) => {
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ firstInput, secondInput });
    }
    onClose();
  };

  return (
    <div className="w-100 max-w-md rounded-2xl bg-white p-6 shadow-xl border border-gray-100 transition-all">
      {/* Header */}
      <header className="flex items-center justify-between pb-4 border-b border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900">{heading}</h3>
        <button
          onClick={onClose}
          type="button"
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>
      </header>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {/* First Input Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-700">
            {first_label_name}
          </label>
          <input
            type="text"
            value={firstInput}
            onChange={(e) => setFirstInput(e.target.value)}
            placeholder={first_placeholder}
            required
            className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        {/* Second Input Field (Rendered conditionally if provided) */}
        {second_label_name && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">
              {second_label_name}
            </label>
            <input
              type="text"
              value={secondInput}
              onChange={(e) => setSecondInput(e.target.value)}
              placeholder={second_placeholder}
              className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
