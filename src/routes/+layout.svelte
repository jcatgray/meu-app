<script>
  import "$lib/styles/global.css"; // Caminho absoluto recomendado
  import GlobalAlert from "$lib/components/GlobalAlert.svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
</script>

<!-- Componente de alerta global -->
<GlobalAlert />

<SvelteToast />

<main>
  <slot />
</main>

<style>
  main {
    min-height: 100vh;
    padding: 1rem;
  }
</style>
