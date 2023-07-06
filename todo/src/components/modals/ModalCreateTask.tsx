import React, { useState } from "react";
import { CancelButton } from "../buttons/CancelButton";
import { ModalContainer } from "./ModalContainer";

export const ModalCreateTask = ({
  isVisible,
  categories,
  onCreate,
  onClose,
}: {
  isVisible: boolean;
  categories: string[];
  onCreate: (name: string, category: string, description: string) => void;
  onClose: () => void;
}) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [suggestCategories, setSuggestCategories] = useState<string[]>([]);

  const resetForm = () => {
    setTaskName("");
    setDescription("");
    setCategory("");
  };

  const _onSubmit = () => {
    resetForm();
    onCreate(taskName, category, description);
  };

  const _onChangeCategoryInput = (e: any) => {
    const { value } = e.target;
    //destructuring
    setCategory(value);
    const newSuggestCategories = categories.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestCategories(newSuggestCategories);
  };
  if (!isVisible) {
    return null;
  }
  return (
    <ModalContainer
      isVisible={isVisible}
      onSubmit={_onSubmit}
      onClose={onClose}
      title="Create new task"
      submitButtonText="Create"
    >
      <div className="mb-4">
        <label className="bg-blue block font-bold mb-2">Task name</label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mt-2 mb-4 form-group">
        <label className="block font-bold mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mt-2 mb-4 form-group">
        <label className="block font-bold mb-2">Category</label>
        <div className="flex relative">
          <input
            type="text"
            value={category}
            onChange={_onChangeCategoryInput}
            onFocus={() => {
              const a = categories.filter((item) => item.includes(category));
              setSuggestCategories(a);
            }}
            onBlur={(e) => {
              // console.log(e.relatedTarget?.classList)
              if (
                !e.relatedTarget ||
                !e.relatedTarget.classList.contains("category-item")
                // click vô bất kỳ đâu trừ thằng category list thì set suggesst...  sẽ rỗng
              ) {
                setSuggestCategories([]);
              }
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
          />
          {suggestCategories?.length ? (
            <div className="absolute top-10 w-full bg-white shadow flex flex-col">
              {suggestCategories.map((category) => (
                <button
                  key={category}
                  className="category-item px-3 py-2 text-left hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setCategory(category);
                    setSuggestCategories([]);
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </ModalContainer>
  );
};
