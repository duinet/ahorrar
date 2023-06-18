<script>
    import { onMount } from "svelte";
    import { saveSettings, loadSettings } from "$lib/functions.js";

    let settings = {};
    let randomNumber;
    let animationNumberStop = false;
    let canTirar = true;

    onMount(() => {
        settings = loadSettings();
        if (!settings.data) {
            settings.data = [];
            for (let i = 0; i < 100; i++) {
                settings.data[i] = i;
            }
            settings.nodata = [];
            saveSettings(settings);
        }

        setInterval(() => {
            if (animationNumberStop == false) {
                randomNumber =
                    settings.data[
                        Math.floor(Math.random() * settings.data.length)
                    ];
            }
        }, 200);
    });

    async function ahorro() {
        animationNumberStop = true;
        if (!settings.fechaInicio) {
            settings.fechaInicio = new Date(new Date().toDateString());
        } else {
            // lo volvemos a dejar en formato fecha para el getDay
            settings.fechaInicio = new Date(settings.fechaInicio);
        }
        let index = settings.data.indexOf(randomNumber);
        if (index > -1) {
            settings.data.splice(index, 1);
            let fechaHoy = new Date(new Date().toDateString());
            let diferenciaDias =
                fechaHoy.getTime() - settings.fechaInicio.getTime();
            var days = Math.ceil(diferenciaDias / (1000 * 3600 * 24));
            settings.nodata[days] = randomNumber;
            settings.lastTirada = new Date();
            saveSettings(settings);
        }
        console.log(settings.data);
        console.log(settings.nodata);

        const reg = await navigator.serviceWorker.getRegistration();
        Notification.requestPermission().then((permission) => {
            if (permission !== "granted") {
                alert("Makina si no aceptas no sabras cuando hay que tirar");
            } else {
                // const timestamp = new Date().getTime() + 5 * 1000; // now plus 5000ms
                const timestamp = new Date().getTime() + 24 * 60 * 60 * 1000; // now plus 5000ms
                reg.showNotification("AHORRA MAKINOLA", {
                    tag: timestamp, // a unique ID
                    body: "Ya puedes tirar makina", // content of the push notification
                    showTrigger: new TimestampTrigger(timestamp), // set the time for the push notification
                    data: {
                        url: window.location.href, // pass the current url to the notification
                    },
                    badge: "/images/purquet.png",
                    icon: "/images/purquet.png",
                });
            }
            canTirar = false;
        });
    }
</script>

<div class="flex flex-col w-full items-center justify-between py-[90px] bg-[#01eefd] min-h-screen">
    <span class="text-[25px]">
        Te quedan {settings?.data?.length} días makina
    </span>
    <span class="text-[200px]" id="cantidad">
        {++randomNumber}
    </span>
    {#if canTirar}
        <button type="button" id="tirada" on:click={ahorro} class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-xl px-28 py-6 text-center mr-2 mb-2">¡AHORRA!</button>
    {:else}
        <a href="/app" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-xl px-28 py-6 text-center mr-2 mb-2">Vuelve maniana maskina</a>
    {/if}
</div>