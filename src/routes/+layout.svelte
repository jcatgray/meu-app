<script>
  import '$lib/styles/global.css'; // Caminho absoluto recomendado
  import GlobalAlert from '$lib/components/GlobalAlert.svelte';
  import { SvelteToast } from '@zerodevx/svelte-toast';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('SW registrado'))
      .catch(err => console.error('Erro ao registrar SW:', err));
  }
</script>

<SvelteToast />
<main>  
  <slot />
</main>

<!-- Componente de alerta global -->
<GlobalAlert />

<style>
  main {
    min-height: 100vh;
    padding: 1rem;
  }
</style>