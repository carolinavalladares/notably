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
  loginFailed: string;
  registerFailed: string;
  logoutFailed: string;
  registerSuccess: string;
  userEditSuccess: string;
  userEditFail: string;
  emailUnique: string;
}
interface ILabels {
  register: string;
  login: string;
  logout: string;
  like: string;
  unlike: string;
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
  post: string;
  underline: string;
  bold: string;
  italic: string;
  editProfile: string;
  save: string;
}

interface ITexts {
  welcomeText: string;
  profile: string;
  posts: string;
  post: string;
  noPosts: string;
  loginTitle: string;
  registerTitle: string;
  memberSince: string;
  myPosts: string;
  createPost: string;
  followers: string;
  following: string;
  whoToFollow: string;
  editProfile: string;
  noSuggestions: string;
  loading: string;
  allSeen: string;
  refreshTimeline: string;
}

interface IPlaceholders {
  email: string;
  password: string;
  confirnPassword: string;
  unsername: string;
  post: string;
  editPassword: string;
}
