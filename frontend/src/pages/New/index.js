import React, { useState, useMemo } from "react";
import api from "../../services/api";

import camera from "../../assets/camera.svg";

import "./styles.css";

export default function New({ history }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handlesSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem("user");

    data.append("thumbnail", thumbnail);
    data.append("company", company);
    data.append("techs", techs);
    data.append("price", price);

    await api.post("/spots", data, {
      headers: { user_id }
    });

    history.push("/dashboard");
  }

  return (
    <form onSubmit={handlesSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? "has-thumbnail" : ""}
      >
        <input
          type="file"
          onChange={event => setThumbnail(event.target.files[0])}
        />
        <img src={camera} alt="Select img" />
      </label>

      <label htmlfor="company">EMPRESA *</label>
      <input
        id="company"
        placeholder="Sua empresa incrível"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />

      <label htmlfor="techs">
        CATEGORIA *<span>(separadas por vírgula)</span>
      </label>
      <input
        id="techs"
        placeholder="Tipo de categoria?"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />

      <label htmlfor="price">
        VALOR DA DIÁRIA *<span>(em branco para GRATUITO</span>
      </label>
      <input
        id="price"
        placeholder="valor cobrado por dia"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />
      <button type="submit" className="btn">
        Cadastrar
      </button>
    </form>
  );
}
