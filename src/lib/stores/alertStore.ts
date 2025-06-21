import { writable } from "svelte/store";

// 1. Definimos os tipos para garantir a consistência
export type AlertType = "info" | "success" | "error" | "warning";

export interface AlertState {
  show: boolean;
  title: string;
  message: string;
  type: AlertType;
  autoClose: boolean;
  autoCloseDelay: number;
}

export interface AlertOptions {
  autoClose?: boolean; // '?' torna a propriedade opcional
  autoCloseDelay?: number;
}

// 2. Tipamos a store para que ela só aceite o formato `AlertState`
export const alertStore = writable<AlertState>({
  show: false,
  title: "",
  message: "",
  type: "info",
  autoClose: false,
  autoCloseDelay: 3000,
});

// 3. Tipamos os parâmetros da função e definimos um valor padrão para `options`
export function showAlert(
  title: string,
  message: string,
  type: AlertType = "info",
  options: AlertOptions = {} // <-- A GRANDE MUDANÇA: garante que `options` nunca seja undefined
) {
  alertStore.set({
    show: true,
    title,
    message,
    type,
    autoClose: options.autoClose ?? false, // Usamos `??` para checar null/undefined
    autoCloseDelay: options.autoCloseDelay ?? 3000,
  });
}

// Função para fechar alerta (nenhuma mudança necessária, mas se beneficia da tipagem da store)
export function closeAlert() {
  alertStore.update((state) => ({
    ...state,
    show: false,
  }));
}

// 4. As funções de conveniência agora também têm os parâmetros tipados
export const showSuccess = (
  title: string,
  message: string,
  options?: AlertOptions
) => showAlert(title, message, "success", options);

export const showError = (
  title: string,
  message: string,
  options?: AlertOptions
) => showAlert(title, message, "error", options);

export const showWarning = (
  title: string,
  message: string,
  options?: AlertOptions
) => showAlert(title, message, "warning", options);

export const showInfo = (
  title: string,
  message: string,
  options?: AlertOptions
) => showAlert(title, message, "info", options);
