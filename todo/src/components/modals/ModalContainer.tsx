import { CancelButton } from "../buttons/CancelButton";

export type ModalProps = {
  isVisible: boolean;
  title: string;
  children: JSX.Element[];
  submitButtonText: string;
  onSubmit: () => void;
  onClose: () => void;
}

export const ModalContainer = ({
  isVisible,
  title,
  children,
  submitButtonText,
  onSubmit,
  onClose,
}: ModalProps) => {
  
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed top-0 h-screen w-screen bg-black/80 flex flex-col items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-96 flex flex-col bg-white rounded-lg p-5"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="text-2xl font-medium text-center">{title}</div>
        {children}
        <div className="flex items-center gap-2">
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                onSubmit()
                onClose()
              }}
            >
              {submitButtonText}
            </button>
          </div>
          <CancelButton onClose={onClose} />
        </div>
      </div>
    </div>
  );
};
