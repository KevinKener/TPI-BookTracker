import { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { TranslationContext } from "../../services/translation.context";
import { useTranslate } from "./UseTranslate";
import { Globe } from 'react-bootstrap-icons'
import "./comboLanguage.css";

const ComboLanguage = () => {
    const { language, changeLanguageHandler } = useContext(TranslationContext);
    const translate = useTranslate();

    const handleLanguageChange = (lang) => () => changeLanguageHandler(lang);
    ;

    return (
        <div className="combo-language">
            <Dropdown align="end">
                <Dropdown.Toggle as="span" className="lang-menu clickable no-caret">
                    <Globe size={30} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item
                    onClick={handleLanguageChange("en")}
                    >
                    {translate("english_lang")}
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={handleLanguageChange("es")}
                        >
                        {translate("spanish_lang")}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default ComboLanguage;
