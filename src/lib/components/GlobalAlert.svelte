<script lang="ts">
   import { alertStore, closeAlert } from '$lib/stores/alert';

   let timeoutId: number | undefined;

   // Reativo para auto-close
   $: if ($alertStore.show && $alertStore.autoClose) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
         handleClose();
      }, $alertStore.autoCloseDelay);
   }

   function handleClose() {
      closeAlert();
      if (timeoutId) {
         clearTimeout(timeoutId);
      }
   }

   function handleOverlayClick() {
      handleClose();
   }

   function handleKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
         handleClose();
      }
   }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $alertStore.show}
   <div 
      class="alert-overlay" 
      on:click={handleOverlayClick}
      on:keydown={handleKeydown}
      role="dialog"
      tabindex="-1"
      aria-modal="true" 
      aria-labelledby="alert-title" 
      aria-describedby="alert-message"
   >
      <div 
         class="alert-container alert-{$alertStore.type}" 
         role="alert"
         aria-live="polite"
         aria-atomic="true"
      >
         <div class="alert-header">
            <h2 id="alert-title" class="alert-title">
               {$alertStore.title}
            </h2>
         </div>

         <div class="alert-content">
            <p id="alert-message" class="alert-message">
               {$alertStore.message}
            </p>
         </div>

         <div class="alert-actions">
            <button class="alert-btn alert-btn-primary" on:click={handleClose}>
               OK
            </button>
         </div>
      </div>
   </div>
{/if}

<style>
   .alert-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      backdrop-filter: blur(2px);
   }

   .alert-container {
      background: #a4adb6;
      border-radius: 5px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
      width: 400px;
      max-width: 90vw;
      max-height: 80vh;
      overflow: hidden;
      animation: alertSlideIn 0.3s ease-out;
   }

   @keyframes alertSlideIn {
      from {
         opacity: 0;
         transform: scale(0.9) translateY(-20px);
      }
      to {
         opacity: 1;
         transform: scale(1) translateY(0);
      }
   }

   .alert-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.4rem 1.1rem 0.3rem;
   }

   .alert-title {
      font-size: 1.30rem;
      font-weight: 600;
      color: #000000ee;
   }

   .alert-content {
      padding: 1rem 1.1rem;
   }

   .alert-message {
      margin: 0;
      color: #000000ee;
   }

   .alert-actions {
      padding: 0.5rem 1.5rem 1.5rem;
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
   }

   .alert-btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 12px;
      font-weight: 475;
      font-size: 1rem;
      transition: all 0.2s ease;
      min-width: 120px;
   }

   .alert-btn-primary {
      background-color: #1d589c;
   }

   .alert-btn-primary:hover {
      background-color: #0d427e;
      color: rgb(161, 161, 161);
   }
</style>