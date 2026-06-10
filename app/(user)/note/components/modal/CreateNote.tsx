import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import { useState } from "react";

interface CreateNoteProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    content: string;
    visibility: string;
  }) => void;
}
const CreateNote = ({ isOpen, onClose, onSubmit }: CreateNoteProps) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    visibility: "PUBLIC",
  });
  if (!isOpen) return null;
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
      {/* Modal Container */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all border border-gray-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 rounded-lg p-1.5 hover:bg-gray-50 transition-colors"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Create New Note
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Share your thoughts or keep them private.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Note Title */}
          <div>
            <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-1.5">
              Title
            </label>
            <Input
              type={"text"}
              name={"title"}
              placeHolder={"Note Title"}
              onChange={handleChange}
              value={formData.title}
              className="w-full"
            />
          </div>

          {/* Visibility Selector */}
          <div>
            <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-1.5">
              Visibility
            </label>
            <div className="relative">
              <select
                name="visibility"
                onChange={handleChange}
                value={formData.visibility}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3 pr-10 appearance-none transition-all outline-none"
              >
                <option value="PUBLIC">🌍 Public (Anyone can see)</option>
                <option value="PRIVATE">🔒 Private (Only you)</option>
                <option value="FRIENDS">👥 Friends (Mutuals only)</option>
              </select>
              {/* Custom Dropdown Arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <Button
              variant={"primary"}
              size={"base"}
              type="submit"
              onClick={handleSubmit}
            >
              Create Note
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateNote;
