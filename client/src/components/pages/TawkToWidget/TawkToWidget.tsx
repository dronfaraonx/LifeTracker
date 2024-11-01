import React, { useEffect } from "react";

const TawkToWidget: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/YOUR_PROPERTY_ID/default";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // Возвращаем null, так как компонент не отображает UI.
};

export default TawkToWidget;
