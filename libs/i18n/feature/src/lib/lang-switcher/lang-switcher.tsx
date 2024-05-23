import { useUpdateProfileMutation } from '@cnask/utils/api-client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LocaleSelect } from '@cnask/i18n/ui';

const availableLanguages = [
  { code: 'en-US', name: 'English', fallback: 'en' },
  { code: 'es-ES', name: 'Español', fallback: 'es' }
];

const getLang = (locale: string) => {
  return (
    availableLanguages.find(
      (lang) => lang.code === locale || lang.fallback === locale
    )?.code || 'en-US'
  );
};

export function LangSwitcher() {
  const { i18n, t } = useTranslation();
  const [lang, setLang] = useState(() => getLang(i18n.language));

  const [updateProfile] = useUpdateProfileMutation();

  const onChange = (value: string) => {
    if (value === lang) return;

    setLang(value);
    i18n.changeLanguage(value);

    updateProfile({
      variables: { data: { locale: value } }
    });
  };

  return (
    <LocaleSelect
      onChange={onChange}
      options={availableLanguages}
      label={t('features.language.title')}
      value={lang}
    />
  );
}

export default LangSwitcher;
