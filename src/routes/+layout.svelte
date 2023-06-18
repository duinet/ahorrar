<script>
    import { onMount } from "svelte";
  import "../app.postcss";
  onMount(()=>{
    if ('serviceWorker' in navigator) {
      // Scope will be restricted to the path where the service-worker-example.js file is located
      navigator.serviceWorker.register('/sw.js', {scope: '/'}).then(registration => {
        console.log('Service Worker registered: ', registration)
      }).catch(registrationError => {
        console.log('Service Worker registration failed: ', registrationError)
      })
    }
  })
</script>
<svelte:head>
    <link rel="manifest" href="/manifest.json">
</svelte:head>
<slot />

