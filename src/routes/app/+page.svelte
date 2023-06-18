<script>
    import { loadSettings } from "$lib/functions.js"
    import { onMount } from "svelte";

    let settings;
    let showTirada = false;
    onMount(()=>{
        settings=loadSettings();
        if(settings.lastTirada){
            let lastDay = new Date(settings.lastTirada);
            let nextDay= new Date(lastDay.getTime() + 60 * 60 * 24 * 1000);
            showTirada = nextDay.getTime() < new Date();
        }else{
            showTirada = true;
        }
        
    })


</script>
<div class="flex flex-col w-full items-center justify-center py-[100px] gap-[30px] bg-[#01eefd] min-h-screen">
    {#if showTirada}
        <a href="/app/tirada/" type="button" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-xl px-28 py-6 text-center mr-2 mb-2">Tirada loco</a>
    {:else}
        <p class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-xl px-28 py-6 text-center mr-2 mb-2">
            No seas ansias makinola
        </p>
    {/if}
    <a href="/app/consulta/" type="button" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-xl px-28 py-6 text-center mr-2 mb-2">Consulta nen</a>
</div>