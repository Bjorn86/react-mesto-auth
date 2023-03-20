// IMAGE POPUP COMPONENT
function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_img popup_theme_darker ${
        card ? "popup_opened" : ""
      }`}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="popup__img-container">
        <button
          type="button"
          className="popup__btn-close"
          onClick={onClose}
        ></button>
        <figure className="popup__figure-wrapper">
          <img src={card?.link} alt={card?.name} className="popup__img" />
          <figcaption className="popup__img-caption">{card?.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
