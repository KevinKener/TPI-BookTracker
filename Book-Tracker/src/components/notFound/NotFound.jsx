import { useTranslate } from '../hooks/translation/UseTranslate';

const NotFound = () => {

  const translate = useTranslate();

  return (
    <div className="notFound-container">
      <h1>404</h1>
      <h4>{translate("not_found")}</h4>
    </div>
  )
}

export default NotFound