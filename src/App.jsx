import { useState, useRef } from "react";
import {caesarEncrypt, caesarDecrypt, asciiShiftEncrypt, asciiShiftDecrypt,} from "./Cifrado.js";
import "./App.css";

export default function App() {


    //Lo uso para setear algunos estados que uso en la app
    const [mode, setMode] = useState("cifrar");
    const [method, setMethod] = useState("caesar");
    const [shift, setShift] = useState(3);

    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("");
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");

    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);


    //Esto es para validad el tipo de archivos (esto hay que agregar para doc y xls)
    const onFileChange = (e) => {
        setError("");
        const file = e.target.files?.[0];
        if (!file) return;

        //Aqui se agregan mas ahora solo acepta txt
        if (!file.name.toLowerCase().endsWith(".txt")) {
            setError("Solo archivos .txt :D");
            return;
        }


        //Limite de peso (talvez deberiamos quitarlo)
        if (file.size > 1024 * 1024) {
            setError("Demasiado Pesado Infeliz");
            return;
        }


        //Lectura del archivo
        //Hay que modificar esta parte para poder subir otro tipo de archivos
        //Hay diferentes librerias para poder leer estos documentos averiguas
        const reader = new FileReader();
        reader.onload = () => {
            setFileName(file.name);
            setInputText(reader.result || "");
            setOutputText("");
            if (fileInputRef.current) fileInputRef.current.value = "";
        };
        reader.onerror = () => setError("No se pudo leer el archivo :(");
        reader.readAsText(file, "UTF-8");
    };


    //Procesa del texto
    const processText = () => {
        setError("");
        setOutputText("");
        if (!inputText) {
            setError("Primero carga un archivo .txt");
            return;
        }
        const s = parseInt(shift, 10);
        if (!Number.isFinite(s)) {
            setError("Solo ingresar numeros enteros");
            return;
        }
        try {
            setBusy(true);
            let result = "";
            if (method === "caesar") {
                result =
                    mode === "cifrar"
                        ? caesarEncrypt(inputText, s)
                        : caesarDecrypt(inputText, s);
            } else if (method === "ascii") {
                result =
                    mode === "cifrar"
                        ? asciiShiftEncrypt(inputText, s)
                        : asciiShiftDecrypt(inputText, s);
            }
            setOutputText(result);
        } catch (e) {
            setError(e?.message || "Ocurrió un error al procesar el archivo");
        } finally {
            setBusy(false);
        }
    };


    // Aqui es donde se descarga el archivo TXT
    const downloadResult = () => {
        if (!outputText) return;

        //Nombre del archivo base
        const base = fileName ? fileName.replace(/\.txt$/i, "") : "resultado";
        const suffix = mode === "cifrar" ? "cifrado.txt" : "descifrado.txt";
        const downloadName = base + suffix;

        //Esto es para crear el archivo
        const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
        const a = document.createElement("a");
        a.download = downloadName;
        a.href = URL.createObjectURL(blob);
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(a.href);
        a.remove();
    };

    /*
          const downloadResult = () => {
          if (!outputText) return;

          const name = fileName || "resultado.txt";
          const base = name.replace(/\.txt(encriptado)?$/i, "");

          let downloadName;
          if (mode === "cifrar") {
            downloadName = `${base}.txtencriptado`;
          } else {
            if (/\.txtencriptado$/i.test(name)) {
              downloadName = `${base}.txt`;
            } else {
              downloadName = `${base}.txt`;
            }
          }

          const blob = new Blob([outputText], { type: "application/octet-stream" });
          const a = document.createElement("a");
          a.download = downloadName;
          a.href = URL.createObjectURL(blob);
          document.body.appendChild(a);
          a.click();
          URL.revokeObjectURL(a.href);
          a.remove();
        };

     */

    //Mas abajo hay que cambiar unas cosas en los inputs de los botone igual porque si no no lo aceptaran los archivos
    const cardCls =
        "rounded-2xl bg-[var(--card)]/50 shadow-md ring-1 ring-white/10";

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <header className="sticky top-0 z-50 backdrop-blur bg-[rgba(11,18,32,0.6)] border-b border-white/10 shrink-0">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
                        Proyecto de Sistemas - Cifrados
                    </h1>
                </div>
            </header>

            <main className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
                <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
                    <section className={`${cardCls} p-4 sm:p-6`}>
                        <h2 className="text-lg font-semibold mb-3">Modo</h2>
                        <div className="inline-flex rounded-xl overflow-hidden ring-1 ring-white/10">
                            <button
                                className={`px-4 py-2 text-sm sm:text-base transition ${
                                    mode === "cifrar"
                                        ? "bg-[var(--accent)] text-black"
                                        : "bg-transparent text-slate-200"
                                }`}
                                onClick={() => setMode("cifrar")}
                            >
                                Cifrar
                            </button>
                            <button
                                className={`px-4 py-2 text-sm sm:text-base transition ${
                                    mode === "descifrar"
                                        ? "bg-[var(--accent)] text-black"
                                        : "bg-transparent text-slate-200"
                                }`}
                                onClick={() => setMode("descifrar")}
                            >
                                Descifrar
                            </button>
                        </div>
                    </section>

                    <section
                        className={`${cardCls} p-4 sm:p-5 space-y-5 grid md:grid-cols-2 gap-6 items-center`}
                    >
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-center">Método</h2>
                            <div
                                onClick={() => setMethod("caesar")}
                                className={`flex flex-col items-center justify-center text-center p-5 rounded-xl cursor-pointer transition ${
                                    method === "caesar"
                                        ? "ring-2 ring-[var(--accent)] bg-slate-900/60"
                                        : "ring-1 ring-white/10 hover:bg-slate-900/40"
                                }`}
                            >
                                <div className="font-bold">César clásico</div>
                                <div className="text-sm text-[var(--muted)]">
                                    Solo desplaza letras A–Z.
                                </div>
                            </div>
                            <div
                                onClick={() => setMethod("ascii")}
                                className={`flex flex-col items-center justify-center text-center p-5 rounded-xl cursor-pointer transition ${
                                    method === "ascii"
                                        ? "ring-2 ring-[var(--accent)] bg-slate-900/60"
                                        : "ring-1 ring-white/10 hover:bg-slate-900/40"
                                }`}
                            >
                                <div className="font-bold">Desplazamiento ASCII</div>
                                <div className="text-sm text-[var(--muted)]">
                                    Afecta todos los caracteres ASCII (símbolos, espacios y
                                    saltos de línea).
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <label className="block text-center text-sm mb-2">
                                Desplazamiento (entero, ej. 6)
                            </label>
                            <input
                                type="number"
                                className="w-full md:w-10/12 lg:w-3/4 px-4 py-3 rounded-lg bg-slate-900/70 ring-1 ring-white/10 outline-none focus:ring-[var(--accent)]/60 text-center"
                                value={shift}
                                onChange={(e) => setShift(e.target.value)}
                                placeholder="6"
                            />
                            <p className="text-xs text-[var(--muted)] mt-3 text-center px-4">
                                Se aplica según el metodo seleccionado.
                            </p>
                        </div>
                    </section>

                    <section className={`${cardCls} p-4 sm:p-5 space-y-5`}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold">Entrada</h3>
                                    <label className="inline-flex items-center gap-2 text-sm cursor-pointer px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 ring-1 ring-white/10">
                                        <input
                                            type="file"
                                            accept=".txt, .txtencriptado"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onClick={(e) => {
                                                e.target.value = null;
                                            }}
                                            onChange={onFileChange}
                                        />
                                        <span>Subir .txt</span>
                                    </label>
                                </div>
                                {fileName && (
                                    <p className="text-xs text-[var(--muted)] mt-1">
                                        Archivo: <span className="text-slate-200">{fileName}</span>
                                    </p>
                                )}
                                <textarea
                                    className="mt-3 w-full h-40 md:h-56 resize-y px-3 py-2 rounded-lg bg-slate-900/70 ring-1 ring-white/10 outline-none focus:ring-[var(--accent)]/60"
                                    placeholder="También puedes pegar texto aquí…"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold">Resultado</h3>
                                    <button
                                        disabled={!outputText}
                                        onClick={downloadResult}
                                        className={`text-sm px-3 py-1.5 rounded-lg ring-1 transition ${
                                            outputText
                                                ? "bg-[var(--accent)] text-black ring-[var(--accent)]/50 hover:opacity-90"
                                                : "bg-white/5 text-slate-400 ring-white/10 cursor-not-allowed"
                                        }`}
                                    >
                                        Descargar .txt
                                    </button>
                                </div>
                                <textarea
                                    readOnly
                                    className="mt-3 w-full h-40 md:h-56 resize-y px-3 py-2 rounded-lg bg-slate-900/50 ring-1 ring-white/10 outline-none"
                                    placeholder="Aquí aparecerá el texto cifrado/descifrado…"
                                    value={outputText}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="px-3 py-2 rounded-lg bg-red-500/10 text-red-300 ring-1 ring-red-500/30">
                                Llamen a Dios {error}
                            </div>
                        )}

                        <div className="flex flex-wrap gap-3 mb-6">
                            <button
                                onClick={processText}
                                disabled={busy}
                                className={`px-4 py-2 rounded-xl font-medium shadow transition ${
                                    busy
                                        ? "bg-white/10 ring-1 ring-white/10 text-slate-400 cursor-wait"
                                        : "bg-[var(--accent)] text-black ring-1 ring-[var(--accent)]/50 hover:opacity-90"
                                }`}
                            >
                                {busy
                                    ? "Procesando…"
                                    : mode === "cifrar"
                                        ? "Cifrar"
                                        : "Descifrar"}
                            </button>
                            <button
                                onClick={() => {
                                    setInputText("");
                                    setOutputText("");
                                    setFileName("");
                                    setError("");
                                    if (fileInputRef.current) fileInputRef.current.value = "";
                                }}
                                className="px-4 py-2 rounded-xl font-medium bg-white/5 hover:bg-white/10 ring-1 ring-white/10"
                            >
                                Limpiar
                            </button>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
