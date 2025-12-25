import { useEffect } from "react";

export const InstagramPreview = () => {
    useEffect(() => {
      // Загружаем скрипт Instagram, который превращает <blockquote> в виджет
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }, []);

  return (
    <div className="flex justify-center p-4">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/p/C1cZfFlM-qS/"
        data-instgrm-version="14"
        style={{
          background: "#fff",
          border: 0,
          margin: "1px",
          padding: 0,
          width: "100%",
          maxWidth: 400,
          minWidth: 300,
        }}
      ></blockquote>

    </div>
  );
};
