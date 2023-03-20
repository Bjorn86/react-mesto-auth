import { useEffect } from "react";
import useValidation from "../utils/useValidation";

// IMPORT COMPONENTS
import PopupWithForm from "./PopupWithForm";

// DELETE CARD POPUP COMPONENT
function DeleteCardPopup({ isOpen, onClose, onDeleteCard, onLoading, card }) {
  // VALIDATION CUSTOM HOOK
  const { isFormValid, resetValidation } = useValidation();
  // RESET INPUTS VALUE
  useEffect(() => {
    resetValidation(true);
  }, [isOpen, resetValidation]);
  // HANDLE SUBMIT
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  }
  return (
    <PopupWithForm
      name="card-delete-confirmation"
      title="Вы&nbsp;уверены?"
      buttonText={onLoading ? "Удаление..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    />
  );
}

export default DeleteCardPopup;
