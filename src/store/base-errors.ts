export type ReduxRequestErrors = {
  [key: string]: string;
};

const baseErrors: ReduxRequestErrors = {
  FETCH_ERROR: "Не удаётся соединиться с сервером.",
  TIMEOUT_ERROR: "Сервер долго не отвечает, проверьте соединение с Интернетом.",
  PARSING_ERROR: "Не удалось прочитать данные, свяжитесь с разработчиками CMS.",
} as const;

export default baseErrors;
