import { useEffect, useContext } from "react";
import useValidation from "../utils/useValidation";

// IMPORT COMPONENTS
import PopupWithForm from "./PopupWithForm";

// IMPORT CONTEXT
import { CurrentUserContext } from "../contexts/CurrentUserContext";

// EDIT PROFILE POPUP COMPONENT
function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
  // VALIDATION CUSTOM HOOK
  const { values, errors, isFormValid, onChange, resetValidation } = useValidation();
  // CONTEXT VARIABLES
  const currentUser = useContext(CurrentUserContext);
  // SET USER DATA TO INPUTS FROM PROFILE
  useEffect(() => {
    resetValidation(true, currentUser);
  }, [currentUser, isOpen, resetValidation]);
  // HANDLE SUBMIT
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }
  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText={onLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label className="popup__input-wrapper">
        <input
          type="text"
          name="name"
          form="edit-profile"
          required
          placeholder="Введите ваше имя"
          minLength="2"
          maxLength="40"
          className={`popup__form-input ${
            errors.name ? "popup__form-input_type_error" : ""
          }`}
          id="name-input"
          onChange={onChange}
          value={values.name || ""}
        />
        <span
          className={`popup__form-input-error ${
            errors.name ? "popup__form-input-error_active" : ""
          }`}
        >
          {errors.name || ""}
        </span>
      </label>
      <label className="popup__input-wrapper">
        <input
          type="text"
          name="about"
          form="edit-profile"
          required
          placeholder="Опишите кто вы"
          minLength="2"
          maxLength="200"
          className={`popup__form-input ${
            errors.about ? "popup__form-input_type_error" : ""
          }`}
          id="about-input"
          onChange={onChange}
          value={values.about || ""}
        />
        <span
          className={`popup__form-input-error ${
            errors.about ? "popup__form-input-error_active" : ""
          }`}
        >
          {errors.about || ""}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
