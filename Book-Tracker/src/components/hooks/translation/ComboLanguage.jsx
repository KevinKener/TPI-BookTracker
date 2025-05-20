import { useContext } from "react";
import { Form } from "react-bootstrap";

import { TranslationContext } from "../../services/translation.context";
import { useTranslate } from "./UseTranslate";
import "./comboLanguage.css";

const ComboLanguage = () => {
    const { language, changeLanguageHandler } = useContext(TranslationContext);

    const translate = useTranslate();

    const changeLanguage = (e) => {
        changeLanguageHandler(e.target.value);
    };

    return (
        <Form.Select
            onChange={changeLanguage}
            value={language}
            aria-label="Select Language"
            className="language"
        >
            <option value="es">{translate("spanish_lang")}</option>
            <option value="en">{translate("english_lang")}</option>
        </Form.Select>
    )
}

export default ComboLanguage;