<script>
    import { onMount } from "svelte";
    import { loadSettings } from "$lib/functions.js"


    let settings = {};
    let days;
    let totalAhorrado = 0;
    onMount(()=>{
        settings = loadSettings();
        if(settings.fechaInicio){
            settings.fechaInicio = new Date(settings.fechaInicio);
            let fechaHoy = new Date(new Date().toDateString());
            // let fechaHoy = new Date('06/17/2023');
            console.log(fechaHoy);
            let diferenciaDias = fechaHoy.getTime() - settings.fechaInicio.getTime();
            days = Math.ceil(diferenciaDias / (1000 * 3600 * 24));
            console.log(days)
        }
        // console.log(settings.nodata);
        // totalAhorrado = settings.nodata.reduce((resultado, dia) =>{
        //     resultado += dia || 0;
        // }, 0)
        settings.nodata.forEach((dia)=>{
            dia = dia||0;
            totalAhorrado += dia;
            if (dia > 0){
                totalAhorrado++;
            }
        })
    })

</script>
<div class="bg-[#01eefd] min-h-screen">
    <div class="text-center py-3">
        <span>
            Total ahorrado {totalAhorrado}
        </span>
    </div>
    <div class="grid grid-cols-4 gap-4">
        {#each Array(100) as _,i}
            {#if i < days+1}
                <div class="p-4 rounded-lg shadow-lg bg-fuchsia-500 aspect-square flex flex-col items-center justify-center">
                    <span>
                        {i+1}
                    </span>
                    <span>
                        {#if settings.nodata[i]}
                            {settings.nodata[i]+1}
                        {:else}
                            😢
                        {/if}
                    </span>
                </div>
            {/if}  
        {/each}   
    </div>
</div>