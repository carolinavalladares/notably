interface ITranslations {
  english: {
    text: ITexts;
    labels: ILabels;
    placeholders: IPlaceholders;
    validation: {
      required: string;
    };
  };
  portuguese: {
    text: ITexts;
    labels: ILabels;
    placeholders: IPlaceholders;
    validation: {
      required: string;
    };
  };
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
