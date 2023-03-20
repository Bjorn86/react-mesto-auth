import { useState, useEffect } from "react";
// IMPORT COMPONENTS
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import Preloader from "./Preloader";

// IMPORT CONTEXT
import { CurrentUserContext } from "../contexts/CurrentUserContext";

// IMPORT API CLASS INSTANCE
import { api } from "../utils/api";

// APP COMPONENT
function App() {
  // STATE VARIABLES WITH HOOKS
  const [isEditAvatarPopupOpen, setEditAvatarPopupClass] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupClass] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupClass] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupClass] = useState(false);
  const [isEditAvatarPopupOnLoading, setEditAvatarPopupButtonText] = useState(false);
  const [isEditProfilePopupOnLoading, setEditProfilePopupButtonText] = useState(false);
  const [isAddPlacePopupOnLoading, setAddPlacePopupButtonText] = useState(false);
  const [isDeleteCardPopupOnLoading, setDeleteCardPopupButtonText] = useState(false);
  const [isPreloaderActive, setPreloaderClass] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  // GETTING PRIMARY DATA FROM THE SERVER
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPreloaderClass(false);
      });
  }, []);
  // HANDLE CLOSE POPUP BY ESC BUTTON
  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }
    window.addEventListener("keydown", handleEscClose);
    return () => window.removeEventListener("keydown", handleEscClose);
  }, []);
  // HANDLE EDIT AVATAR CLICK
  function handleEditAvatarClick() {
    setEditAvatarPopupClass(true);
  }
  // HANDLE EDIT PROFILE CLICK
  function handleEditProfileClick() {
    setEditProfilePopupClass(true);
  }
  // HANDLE ADD PLACE CARD CLICK
  function handleAddPlaceClick() {
    setAddPlacePopupClass(true);
  }
  // HANDLE DELETE CLICK
  function handleDeleteClick(card) {
    setDeleteCardPopupClass(true);
    setCardToDelete(card);
  }
  // HANDLE CARD IMAGE CLICK
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  // HANDLE CLOSE ALL POPUPS
  function closeAllPopups() {
    setEditAvatarPopupClass(false);
    setEditProfilePopupClass(false);
    setAddPlacePopupClass(false);
    setDeleteCardPopupClass(false);
    setSelectedCard(null);
    setCardToDelete({});
  }
  // HANDLE CARD LIKE
  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // HANDLE CARD DELETE
  function handleCardDelete(card) {
    setDeleteCardPopupButtonText(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setDeleteCardPopupButtonText(false);
        setCardToDelete({});
      });
  }
  // HANDLE UPDATE USER
  function handleUpdateUser(userData) {
    setEditProfilePopupButtonText(true);
    api.setUserInfo(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setEditProfilePopupButtonText(false);
      });
  }
  // HANDLE UPDATE AVATAR
  function handleUpdateAvatar(avatarData) {
    setEditAvatarPopupButtonText(true);
    api.setUserAvatar(avatarData)
      .then((newAvatarData) => {
        setCurrentUser(newAvatarData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setEditAvatarPopupButtonText(false);
      });
  }
  // HANDLE ADD PLACE CARD
  function handleAddPlaceSubmit(cardData) {
    setAddPlacePopupButtonText(true);
    api.sendNewCardInfo(cardData)
      .then((newCardsData) => {
        setCards([newCardsData, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setAddPlacePopupButtonText(false);
      });
  }
  return (
    <div className="page__content">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteClick}
        />
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isEditAvatarPopupOnLoading}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isEditProfilePopupOnLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isAddPlacePopupOnLoading}
        />
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          onLoading={isDeleteCardPopupOnLoading}
          card={cardToDelete}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Preloader isActive={isPreloaderActive} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
