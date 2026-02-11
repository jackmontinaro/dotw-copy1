<script lang="ts">
    import { type Drink } from "$lib/api/drinks";
    import AddDrinkModal from "$lib/components/AddDrinkModal.svelte";
    import BaseTable from "$lib/components/BaseTable.svelte";
    import UserTable from "$lib/components/UserTable.svelte";
    import type { PageData } from "./$types";
    import { Button, ButtonGroup, Heading } from "flowbite-svelte"; 

    let { data } = $props<{ data: PageData }>();

    // svelte-ignore state_referenced_locally
    let allDrinks: Drink[] = $state(data.drinks);

    // svelte-ignore state_referenced_locally
    let drinks: Drink[] = $state(allDrinks);

    function filterer(type: "ALL" | "TASTED" | "UNTASTED") {
        drinks = allDrinks.filter((drink: Drink) => {
            if (type === "TASTED") {
                return drink.timesDrank && drink.timesDrank > 0;
            } else if (type === "UNTASTED") {
                return !drink.timesDrank || drink.timesDrank == 0;
            }
            return true;
        })
    }
    filterer("TASTED");

    let displayedUser: string = $state("");
    let userPrefix: string = $derived(displayedUser !== "" ? displayedUser.charAt(0) : "");

    const emptyForm: Partial<Drink> = {
        name: '',
        recipe: '',
        timesDrank: 0,
        notes: '',
        overallScore: 0,
        // per-person totals (computed)
        mOverallScore: 0,
        jOverallScore: 0,
        hOverallScore: 0,
        // m-prefixed inputs
        mEaseOfMake: 0,
        mLook: 0,
        mTaste: 0,
        mWouldAtBar: 0,
        // j-prefixed inputs
        jEaseOfMake: 0,
        jLook: 0,
        jTaste: 0,
        jWouldAtBar: 0,
        // h-prefixed inputs
        hEaseOfMake: 0,
        hLook: 0,
        hTaste: 0,
        hWouldAtBar: 0,
        date: '',
    };

    let form: Partial<Drink> = $state({ ...emptyForm });
    let showModal = $state(false);

    function openModal() {
        form = { ...emptyForm };
        showModal = true;
    }
</script>

<div class="w-full h-full p-12 flex flex-col gap-6 items-center">
    <div class="w-3/4 flex items-center">
        <Heading tag="h1" class="text-xl font-bold text-gray-800">Drink of the Week</Heading>
        <div class="flex-1"></div>
        <ButtonGroup size="lg" class="flex outline outline-gray-300 rounded h-10">
            <Button class="w-24 border-none" onclick={() => filterer("TASTED")}>Tasted</Button>
            <Button class="w-24 border-none" onclick={() => filterer("UNTASTED")}>Untasted</Button>
        </ButtonGroup>
    </div>
    <div class="w-3/4">
        {#if displayedUser === ""}
            <BaseTable bind:drinks bind:displayedUser />
        {:else}
            <UserTable bind:drinks bind:displayedUser bind:userPrefix />
        {/if}
        <div class="w-full flex justify-end mt-4">
            <Button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm" onclick={openModal}>
                + Add drink
            </Button>
        </div>
    </div>
</div>

{#if showModal}
    <AddDrinkModal bind:allDrinks bind:drinks bind:showModal />
{/if}
