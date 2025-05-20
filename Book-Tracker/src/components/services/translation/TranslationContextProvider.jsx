import { useState } from "react";
import { TranslationContext } from "../translation.context"

const tValue = localStorage.getItem("translation");

const TranslationContextProvider = ({children}) => {
    const [language, setLanguage] = useState(tValue ?? "en");

    const changeLanguageHandler = (newLanguage) => {
        localStorage.setItem("translation", newLanguage);
        setLanguage(newLanguage);
    };

    return (
        <TranslationContext value={{ language, changeLanguageHandler }} >
            {children}
        </TranslationContext>
    )
}

export default TranslationContextProvider;