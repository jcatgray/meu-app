<script>
	import {
		showSuccess,
		showError,
		showWarning,
		showInfo,
	} from "$lib/stores/alert";
	import { alertSoundBase64 } from "$lib/audio/sound";
	import { toast } from "@zerodevx/svelte-toast";

	// Criar instância de Audio apenas no lado do cliente
	let audio;
	if (typeof window !== "undefined") {
		audio = new Audio(alertSoundBase64);
	}

	function handleSuccess() {
		showSuccess("Sucesso", "Operação realizada com sucesso!!");
	}

	function handleError() {
		showError(
			"Erro",
			"Não foi possivel alocar material no endereço 93-E-FE. Tente outro endereço!!",
		);
	}

	function handleWarning() {
		showWarning("Aviso", "Código deve ser informado!!");
	}

	function handleInfo() {
		showInfo("Informação", "Esta é uma mensagem informativa");
	}

	function handleAutoClose() {
		showSuccess("Auto Close", "Este alerta fechará automaticamente", {
			autoClose: true,
			autoCloseDelay: 2000,
		});
	}
	function alertSound() {
		// Reutiliza a instância existente
		audio.currentTime = 0; // Reinicia o áudio
		audio.play().catch((error) => alert("Erro ao tocar o áudio:"));
	}

	function pushError() {
		alertSound();

		toast.push("teste de notificacao push , 123 123 123", {
			theme: {
				"--toastBackground": "#00962b",
				"--toastBarBackground": "green",
			},
			duration: 3500,
		});
	}
</script>

<div class="menu-container">
	<h3>Menu Aplicação</h3>
	<br />
	<div class="button-container">
		<button on:click={handleSuccess}>Sucesso</button>
		<button on:click={handleError}>Erro</button>
		<button on:click={handleWarning}>Aviso</button>
		<button on:click={handleInfo}>Info</button>
		<button on:click={handleAutoClose}>Auto Close</button>
		<button on:click={alertSound}>Tocar Alerta</button>
		<button on:click={pushError}>Notificação push</button>
	</div>

	<br />
	<h6>versao-1.0004</h6>
</div>
