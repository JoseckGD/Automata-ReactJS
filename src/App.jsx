import { useEffect, useState } from "react";
import Estados from "./class/Estados";
import "./App.css";
let cont = 0;
function App() {
  const interpretar = new Estados();

  const [texto, setTexto] = useState("counter01*");
  const [error, setError] = useState(false);
  const [txtError, setTxtError] = useState("");
  const [estadoQ, setEstadoQ] = useState("Q0");
  const [caracterCheck, setCaracterCheck] = useState("");

  useEffect(() => {
    texto.length === 0 && setError(false);
  }, []);

  const handleText = (e) => {
    setTexto(e.target.value);

    interpretar.validarEspacios(e.target.value)
      ? (setError(true), setTxtError("Quita los espacios en blanco"))
      : e.target.value.length === 0
      ? (setError(true), setTxtError("Escribe algo"))
      : !interpretar.validarTodo(e.target.value)
      ? (setError(true), setTxtError("Caracter no valido"))
      : (setError(false), setTxtError(""));
  };

  const handleReset = () => {
    setTexto("");
    setTxtError("");
    setEstadoQ("Q0");
    setCaracterCheck("");
    setError(true);
    interpretar.estadoActual = "Q0";
  };

  const analizar = () => {
    let caracteres = texto.split("");

    interpretar.estadoActual !== "vacio" &&
      (setCaracterCheck(caracteres[cont]),
      interpretar.estadoActual === "Q0" &&
        (interpretar.estado_Q0(caracteres[cont]) === true
          ? ((interpretar.estadoActual = "Q1"),
            setTxtError("Entro al Automata"))
          : ((interpretar.estadoActual = "vacio"),
            setTxtError(`El estado no reconoce el token ${caracteres[cont]}`))),
      interpretar.estadoActual === "Q1" &&
        interpretar.estado_Q1(caracteres[cont]) === false &&
        (interpretar.estadoActual = "Q2"),
      interpretar.estadoActual === "Q2" &&
        interpretar.estado_Q2(caracteres[cont]) === true &&
        setTxtError("Salio del Automata"),
      setEstadoQ(interpretar.estadoActual),
      cont++,
      cont === texto.length
        ? (cont = 0)
        : setTimeout(() => {
            if (
              interpretar.estadoActual !== "vacio" ||
              interpretar.estadoActual !== "Q2"
            ) {
              analizar();
            }
          }, 1000));
  };

  return (
    <div className="App">
      {caracterCheck !== "" && (
        <div>
          <h1 style={{ color: "#fff", fontSize: "1.5rem" }}>
            Verificando el caracter {caracterCheck}
          </h1>
        </div>
      )}

      <div>
        <input
          style={{ borderColor: error === true ? "#CB4335" : "#646cff" }}
          type="text"
          placeholder="Escribe algo ..."
          value={texto}
          onChange={handleText}
        />
      </div>

      {txtError.length > 0 && (
        <div>
          <h1
            style={{
              fontSize: "1rem",
              color: "#f00",
              backgroundColor: "#FADBD8",
              padding: " 0.5rem 1rem",
              borderRadius: "0.5rem",
            }}
          >
            {txtError}
          </h1>
        </div>
      )}

      <div>
        <button onClick={() => handleReset()}>Reiniciar</button>
        <button
          className="Analizar"
          style={{
            backgroundColor: error === true ? "#393939" : "#646cff",
          }}
          disabled={error === false ? false : true}
          onClick={() => analizar()}
        >
          Analizar
        </button>
      </div>
      <div
        style={{
          height: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <div
          style={{
            width: "4rem",
            height: "2rem",
            backgroundColor: estadoQ === "Q0" ? "#646cff" : "#fff",
            borderRadius: "100rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
          }}
        >
          <h1>Q0</h1>
        </div>
        <h1>{"=>"}</h1>
        <div
          style={{
            width: "4rem",
            height: "2rem",
            backgroundColor: estadoQ === "Q1" ? "#646cff" : "#fff",
            borderRadius: "100rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
          }}
        >
          <h1>Q1</h1>
        </div>
        <h1>{"=>"}</h1>
        <div
          style={{
            width: "4rem",
            height: "2rem",
            backgroundColor: estadoQ === "Q2" ? "#646cff" : "#fff",
            borderRadius: "100rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
          }}
        >
          <h1>Q2</h1>
        </div>
      </div>
      <h1>
        {interpretar.estadoActual === "vacio"
          ? "No entro al automata"
          : interpretar.estadoActual === "Q1"
          ? "Entro al automata"
          : interpretar.estadoActual === "Q2" && "Salio del automata"}
      </h1>
    </div>
  );
}

export default App;
