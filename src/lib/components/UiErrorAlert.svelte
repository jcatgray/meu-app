<script>
     import { alertSoundBase64 } from '$lib/audio/sound';
     export let message = '';
     export let show = false;

     function playAlertSound() {
       const audio = new Audio(alertSoundBase64);
       audio.play().catch(error => console.error('Erro ao tocar o áudio:', error));
     }

     $: if (show && message) playAlertSound();
   </script>

   {#if show}
     <div class="error-alert">
       <p>{message}</p>
       <button on:click={() => (show = false)}>Fechar</button>
     </div>
   {/if}

   <style>
     .error-alert {
       position: fixed;
       top: 20px;
       left: 50%;
       transform: translateX(-50%);
       background: #ff4d4d;
       color: white;
       padding: 15px;
       border-radius: 8px;
       box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
       z-index: 1000;
       text-align: center;
     }
     button {
       margin-top: 10px;
       padding: 8px 16px;
       background: #fff;
       color: #ff4d4d;
       border: none;
       border-radius: 4px;
       cursor: pointer;
     }
   </style>