import React, { useEffect, useState, useCallback } from "react";
import * as RNLocalize from 'react-native-localize'
import * as i18n from "../../utils/i18n";
import LocaleContext from "./localeContext";

const LocaleState = ({ children }) => {
  const [locale, setLocale] = useState("en");

  const localizationContext = React.useMemo(
    () => ({
        translate: (scope, options) => i18n.translate(scope, { locale, ...options }),
        locale,
        setLocale,
      }),
      [locale]
  );

  const handleLocalizationChange = useCallback(
    (newLocale) => {
      const newSetLocale = i18n.setI18nConfig(newLocale);
      setLocale(newSetLocale);
    },
    [locale]
  );

  useEffect(() => {
    handleLocalizationChange();
    RNLocalize.addEventListener("change", handleLocalizationChange);

    return () => {
      RNLocalize.removeEventListener("change", handleLocalizationChange);
    }
  }, []);

  return (
    <LocaleContext.Provider value={localizationContext}>
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleState;