<script>
	import {
		showSuccess,
		showError,
		showWarning,
		showInfo,
	} from "$lib/stores/alert";
	import { alertSoundBase64 } from "$lib/audio/sound";
	import { toast } from "@zerodevx/svelte-toast";

	function handleSuccess() {
		showSuccess("Sucesso", "Operação realizada com sucesso!!");
	}

	function handleError() {
		showError("Erro","Não foi possivel alocar material no endereço 93-E-FE. Tente outro endereço!!");
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

	function playSound() {
		const audio = new Audio(alertSoundBase64);
		audio
			.play()
			.catch((error) => console.error("Erro ao tocar o áudio:", error));
	}

	function pushError() {
		const audio = new Audio(alertSoundBase64);
		audio
			.play()
			.catch((error) => console.error("Erro ao tocar o áudio:", error));
		toast.push("Ocorreu um erro!", {
			theme: { "--toastBackground": "#ff4d4d" },
			duration: 3000,
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
		<button on:click={playSound}>Tocar Alerta</button>
		<button on:click={pushError}>Notificação push</button>
	</div>

	<br />
	<h6>versao-1.0003</h6>
</div>
