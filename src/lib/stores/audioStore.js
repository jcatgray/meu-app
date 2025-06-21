import { writable } from "svelte/store";
import { alertSoundBase64 } from "$lib/audio/UI_sound";

// Inicializa a instância de áudio apenas no lado do cliente
let audio = null;
if (typeof window !== "undefined") {
  audio = new Audio(alertSoundBase64);
}

// Cria o store
export const audioStore = writable({
  playAlertSound: () => {
    if (audio) {
      audio.currentTime = 0; // Reinicia o áudio
      audio.play().catch((error) => {
        console.error("Erro ao tocar o áudio: ", error);
      });
    }
  },
});
