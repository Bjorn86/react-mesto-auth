import { useState, useEffect, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

// IMPORT COMPONENTS
import AppLayout from "./AppLayout";
import Login from "./Login";
import Register from "./Register";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import InfoTooltip from "./InfoTooltip";
import Preloader from "./Preloader";
import ProtectedRouteElement from "./ProtectedRoute";

// IMPORT CONTEXT
import { CurrentUserContext } from "../contexts/CurrentUserContext";

// IMPORT API'S CLASS INSTANCE
import { api } from "../utils/api";
import * as authApi from "../utils/authApi";

// APP COMPONENT
function App() {
  // STATE VARIABLES WITH HOOKS
  const [isEditAvatarPopupOpen, setEditAvatarPopupClass] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupClass] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupClass] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupClass] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupClass] = useState(false);
  const [isHamburgerOpen, setHamburgerClass] = useState(false);
  const [isEditAvatarPopupOnLoading, setEditAvatarPopupButtonText] = useState(false);
  const [isEditProfilePopupOnLoading, setEditProfilePopupButtonText] = useState(false);
  const [isAddPlacePopupOnLoading, setAddPlacePopupButtonText] = useState(false);
  const [isDeleteCardPopupOnLoading, setDeleteCardPopupButtonText] = useState(false);
  const [isLoginOnLoading, setLoginButtonText] = useState(false);
  const [isRegistrationOnLoading, setRegistrationButtonText] = useState(false);
  const [isPreloaderActive, setPreloaderClass] = useState(true);
  const [InfoTooltipStatus, setInfoTooltipStatus] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // VARIABLES WITH HOOKS
  const navigate = useNavigate();

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

  // HANDLE EDIT AVATAR CLICK
  const handleEditAvatarClick = useCallback(() => {
    setEditAvatarPopupClass(true);
  }, []);

  // HANDLE EDIT PROFILE CLICK
  const handleEditProfileClick = useCallback(() => {
    setEditProfilePopupClass(true);
  }, []);

  // HANDLE ADD PLACE CARD CLICK
  const handleAddPlaceClick = useCallback(() => {
    setAddPlacePopupClass(true);
  }, []);

  // HANDLE DELETE CLICK
  const handleDeleteClick = useCallback((card) => {
    setDeleteCardPopupClass(true);
    setCardToDelete(card);
  }, []);

  // HANDLE CARD IMAGE CLICK
  const handleCardClick = useCallback((card) => {
    setSelectedCard(card);
  }, []);

  // HANDLE CLOSE ALL POPUPS
  const closeAllPopups = useCallback(() => {
    setEditAvatarPopupClass(false);
    setEditProfilePopupClass(false);
    setAddPlacePopupClass(false);
    setDeleteCardPopupClass(false);
    setInfoTooltipPopupClass(false);
    setSelectedCard(null);
    setCardToDelete({});
    setInfoTooltipStatus("");
  }, []);

  // HANDLE CLOSE BY CLICK ON OVERLAY
  const closeByClickOnOverlay = useCallback(
    (evt) => {
      if (evt.target === evt.currentTarget) {
        closeAllPopups();
      }
    },
    [closeAllPopups]
  );

  // HANDLE HAMBURGER CLICK
  const handleHamburgerClick = useCallback(() => {
    if (isHamburgerOpen === false) {
      setHamburgerClass(true);
    } else {
      setHamburgerClass(false);
    }
  }, [isHamburgerOpen]);

  // HANDLE CARD LIKE
  const handleCardLike = useCallback(
    (card) => {
      const isLiked = card.likes.some((item) => item._id === currentUser._id);
      api
        .changeLikeCardStatus(card._id, isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [currentUser._id]
  );

  // HANDLE CARD DELETE
  const handleCardDelete = useCallback(
    (card) => {
      setDeleteCardPopupButtonText(true);
      api
        .deleteCard(card._id)
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
    },
    [closeAllPopups]
  );

  // HANDLE UPDATE USER
  const handleUpdateUser = useCallback(
    (userData) => {
      setEditProfilePopupButtonText(true);
      api
        .setUserInfo(userData)
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
    },
    [closeAllPopups]
  );

  // HANDLE UPDATE AVATAR
  const handleUpdateAvatar = useCallback(
    (avatarData) => {
      setEditAvatarPopupButtonText(true);
      api
        .setUserAvatar(avatarData)
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
    },
    [closeAllPopups]
  );

  // HANDLE ADD PLACE CARD
  const handleAddPlaceSubmit = useCallback(
    (cardData) => {
      setAddPlacePopupButtonText(true);
      api
        .sendNewCardInfo(cardData)
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
    },
    [cards, closeAllPopups]
  );

  // HANDLE USER REGISTRATION
  const handleUserRegistration = useCallback(
    async (userData) => {
      setRegistrationButtonText(true);
      try {
        const data = await authApi.register(userData);
        if (data) {
          setInfoTooltipStatus("success");
          setInfoTooltipPopupClass(true);
          navigate("/sign-in", { replace: true });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setRegistrationButtonText(false);
      }
    },
    [navigate]
  );

  // HANDLE USER AUTHORIZATION
  const handleUserAuthorization = useCallback(
    async (userData) => {
      setLoginButtonText(true);
      try {
        const data = await authApi.authorize(userData);
        if (data.token) {
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
          setUserEmail(userData.email);
          navigate("/", { replace: true });
        }
      } catch (err) {
        console.error(err);
        setInfoTooltipStatus("fail");
        setInfoTooltipPopupClass(true);
      } finally {
        setLoginButtonText(false);
      }
    },
    [navigate]
  );

  // TOKEN CHECK
  const tokenCheck = useCallback(async () => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const user = await authApi.getContent(token);
          if (!user) {
            throw new Error("Данные пользователя отсутствует");
          }
          setUserEmail(user.data.email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        } catch (err) {
          console.error(err);
        }
      }
    }
  }, [navigate]);

  // HANDLE USER LOGIN OUT
  const handleUserLogOut = useCallback(() => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUserEmail("");
    setHamburgerClass(false);
    navigate("/sign-in", { replace: true });
  }, [navigate]);

  // CHECK USER LOGGED IN
  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  // HANDLE CLOSE POPUP BY ESC BUTTON
  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }
    window.addEventListener("keydown", handleEscClose);
    return () => window.removeEventListener("keydown", handleEscClose);
  }, [closeAllPopups]);

  return (
    <div className="page__content">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout
                email={userEmail}
                isOpen={isHamburgerOpen}
                onHamburgerClick={handleHamburgerClick}
                onLogOut={handleUserLogOut}
              />
            }
          >
            <Route
              index
              element={
                <ProtectedRouteElement
                  element={Main}
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteClick}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login
                  onLogin={handleUserAuthorization}
                  onLoading={isLoginOnLoading}
                />
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register
                  onRegistr={handleUserRegistration}
                  onLoading={isRegistrationOnLoading}
                />
              }
            />
          </Route>
        </Routes>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isEditAvatarPopupOnLoading}
          onOverlayClick={closeByClickOnOverlay}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isEditProfilePopupOnLoading}
          onOverlayClick={closeByClickOnOverlay}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isAddPlacePopupOnLoading}
          onOverlayClick={closeByClickOnOverlay}
        />
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          onLoading={isDeleteCardPopupOnLoading}
          card={cardToDelete}
          onOverlayClick={closeByClickOnOverlay}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onOverlayClick={closeByClickOnOverlay}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          status={InfoTooltipStatus}
          onOverlayClick={closeByClickOnOverlay}
        />
        <Preloader isActive={isPreloaderActive} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

/* TODO Пройтись по всем файлам Prettier */
