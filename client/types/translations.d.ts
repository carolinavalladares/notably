interface ITranslations {
  english: {
    text: ITexts;
    labels: ILabels;
    placeholders: IPlaceholders;
    validation: IValidation;
  };
  portuguese: {
    text: ITexts;
    labels: ILabels;
    placeholders: IPlaceholders;
    validation: IValidation;
  };
}

interface IValidation {
  required: string;
  password: string;
}
interface ILabels {
  register: string;
  login: string;
  logout: string;
  like: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  follow: string;
  unfollow: string;
  following: string;
  edit: string;
  chooseAvatar: string;
  chooseLanguage: string;
  english: string;
  portuguese: string;
  developedBy: string;
}

interface ITexts {
  welcomeText: string;
  profile: string;
  posts: string;
  post: string;
  noPosts: string;
  loginTitle: string;
  registerTitle: string;
}

interface IPlaceholders {
  email: string;
  password: string;
  confirnPassword: string;
  unsername: string;
  post: string;
}
