const MSG_ERR_AUTH = 'Неправильные почта или пароль';
const MSG_ERR_INCORRECT_EMAIL = 'Неправильный формат email';
const MSG_ERR_INCORRECT_URL = 'Некорректный URL адрес';
const MSG_ERR_UNAUTH = 'Необходима авторизация!';
const MSG_ERR_NOT_FOUND_USER = 'Пользователь по указанному id не найден';
const MSG_ERR_INCORRECT_DATA = 'Неправильный, некорректный запрос';
const MSG_ERR_CONFLICT = 'Пользователь с такими данными уже зарегистрирован!';
const MSG_ERR_SERVER = 'Ошибка на сервере';
const MSG_ERR_NOT_FOUND_MOVIE = 'Фильм с указанным id не найден';
const MSG_ERR_FORBIDDEN = 'Нельзя удалять фильмы, добавленные другими пользователями!';
const MSG_DELETE_MOVIE = 'Фильм удален';
const MSG_ERR_NOT_FOUND_PAGE = 'Cтраница не найдена';
const MSG_LIMITER = 'Вы делали слишком много запросов пожалуйста подождите и повторите запрос позже';

module.exports = {
  MSG_ERR_AUTH,
  MSG_ERR_INCORRECT_URL,
  MSG_ERR_INCORRECT_EMAIL,
  MSG_ERR_UNAUTH,
  MSG_ERR_NOT_FOUND_USER,
  MSG_ERR_INCORRECT_DATA,
  MSG_ERR_CONFLICT,
  MSG_ERR_SERVER,
  MSG_ERR_NOT_FOUND_MOVIE,
  MSG_ERR_FORBIDDEN,
  MSG_DELETE_MOVIE,
  MSG_ERR_NOT_FOUND_PAGE,
  MSG_LIMITER,
};
