import React, { useState } from "react";
import { request } from "express";

export const CreatePage = () => {
  const {} = useHttp();
  const [link, setLink] = useState("");
  const pressHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        data = await request("api/link/generate", "POST", { from: link });
      } catch (e) {}
    }
  };
  return (
    <div className="row">
      <input
        placeholder="Вставте ссылку"
        id="link"
        type="text"
        value={link}
        className="yellow-input"
        onChange={(e) => setLink(e.target.value)}
        onKeyPress={pressHandler}
      />
      <label htmlFor="link">Введите ссылку</label>
    </div>
  );
};
