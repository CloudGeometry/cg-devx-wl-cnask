import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import { getLocale, getLocaleFromNavigator } from './utils';
import LanguageDetector from 'i18next-browser-languagedetector';



i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          features: {
            auth: {
              login: {
                title: 'Log into your account',
                username: 'Enter your username',
                password: 'Password',
                tenantAlias: 'Tenant alias',
                submit: 'Login'
              }
            },
            profile: {
              title: 'Profile',
              description: 'Manage your profile',
              profileUpdated: 'Profile updated',
              passwordChanged: 'Password updated',
              accountForm: {
                title: 'Update profile',
                email: 'Email',
                firstname: 'Firstname',
                lastname: 'Lastname',
                submit: 'Update profile'
              },
              passwordForm: {
                title: 'Change password',
                currentPassword: 'Current password',
                newPassword: 'New password',
                newPasswordRepeat: 'Password repeat',
                submit: 'Update password'
              }
            },
            language: {
              title: 'Language',
              description: 'Change your language'
            },
            themeSelect: {
              light: 'Light',
              dark: 'Dark',
              system: 'System',
              title: 'Theme'
            },
            todo: {
              createTitle: 'Create todo',
              editTitle: 'Edit todo',
              form: {
                title: 'Title',
                description: 'Description',
                dueDate: 'Due date',
                assignee: 'Assignee',
                createdBy: 'Author',
                submit: 'Submit'
              }
            }
          },
          menu: {
            links: {
              todo: 'Todo list',
              users: 'Users',
              components: 'Components',
              buttons: 'Buttons',
              form: 'Form',
              table: 'Table'
            }
          }
        }
      },
      es: {
        translation: {
          features: {
            auth: {
              login: {
                title: 'es Log into your account',
                username: 'es Enter your username',
                password: 'es Password',
                tenantAlias: 'es Tenant alias',
                submit: 'es Login'
              }
            },
            profile: {
              title: 'es: Profile',
              description: 'es: Manage your profile',
              profileUpdated: 'es: Profile updated',
              passwordChanged: 'es: Password updated',
              accountForm: {
                title: 'es: Update profile',
                email: 'es: Email',
                firstname: 'es: Firstname',
                lastname: 'es: Lastname',
                submit: 'es: Update profile'
              },
              passwordForm: {
                title: 'es: Change password',
                currentPassword: 'es: Current password',
                newPassword: 'es: New password',
                newPasswordRepeat: 'es: Password repeat',
                submit: 'es: Update password'
              }
            },
            language: {
              title: 'es: Language',
              description: 'es: Change your language'
            },
            themeSelect: {
              light: 'es: Light',
              dark: 'es: Dark',
              system: 'es: System',
              title: 'es: Theme'
            },
            todo: {
              createTitle: 'es: Create todo',
              editTitle: 'es: Edit todo',
              form: {
                title: 'es: Title',
                description: 'es: Description',
                dueDate: 'es: Due date',
                assignee: 'es: Assignee',
                createdBy: 'es: Author',
                submit: 'es: Submit'
              }
            }
          },
          menu: {
            links: {
              todo: 'es: Todo list',
              users: 'es: Users',
              components: 'es: Components',
              buttons: 'es: Buttons',
              form: 'es: Form',
              table: 'es: Table'
            }
          }
        }
      }
    },
    // lng: getLocale() || getLocaleFromNavigator() || 'en', // if you're using a language detector, do not define the lng option
    // fallbackLng: 'en-US',
    detection: {
      order: ['localStorage', 'htmlTag', 'cookie'],
      caches: ['localStorage', 'cookie'] // cache user language on
    },
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

export default i18n;
