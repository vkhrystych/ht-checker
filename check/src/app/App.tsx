import { useEffect, useState } from "react";

import "./styles.css";
import { Autocomplete } from "../components/autocomplete";
import { loadPokemons } from "./load-pokemons";

export const App = () => {
  const [data, setData] = useState<string[]>([]);

  // TODO: add error handling, loading state and promise cancellation
  useEffect(() => {
    const fetchData = async () => {
      const _data = await loadPokemons();
      setData(_data.map((item) => item.name));
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Autocomplete data={data} />
    </div>
  );
};
