// INFORMATION TOOLTIP COMPONENT
function InfoTooltip({ isOpen, onClose }) {
  return (
    <div
      className={`popup popup_type_info ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="popup__item-container">
        <button
          type="button"
          className="popup__btn-close"
          onClick={onClose}
        ></button>
        <div className="popup__status-wrapper">
          <div className="popup__status-icon popup__status-icon_type_success"></div>
          <p className="popup__status-text">
            Вы&nbsp;успешно зарегистрировались!
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
