<script lang="ts">
    import { goto } from "$app/navigation";
    import type { Drink } from "$lib/api/drinks";
    import { P, TableBodyCell, TableBodyRow } from "flowbite-svelte";

    interface Props {
        drink: Drink;
        user: string | undefined;
    }

    let { drink, user }: Props = $props();

    function onClick() {
        goto(`/drinks/${drink.id}`)
    }
</script>

<TableBodyRow class="border-t h-12 text-sm border-gray-300 hover:bg-gray-100" onclick={onClick}>
    {#if user === "matt"}
        <TableBodyCell class="pl-6 font-semibold">{drink.name}</TableBodyCell>
        <TableBodyCell>{drink.mOverallScore}</TableBodyCell>
        <TableBodyCell>{drink.mEaseOfMake}</TableBodyCell>
        <TableBodyCell>{drink.mLook}</TableBodyCell>
        <TableBodyCell>{drink.mWouldAtBar}</TableBodyCell>
        <TableBodyCell>{drink.mTaste}</TableBodyCell>
        <TableBodyCell>{drink.date}</TableBodyCell>
    {:else if user === "jack"}
        <TableBodyCell class="pl-6 font-semibold">{drink.name}</TableBodyCell>
        <TableBodyCell>{drink.jOverallScore}</TableBodyCell>
        <TableBodyCell>{drink.jEaseOfMake}</TableBodyCell>
        <TableBodyCell>{drink.jLook}</TableBodyCell>
        <TableBodyCell>{drink.jWouldAtBar}</TableBodyCell>
        <TableBodyCell>{drink.jTaste}</TableBodyCell>
        <TableBodyCell>{drink.date}</TableBodyCell>
    {:else if user === "hayden"}
        <TableBodyCell class="pl-6 font-semibold">{drink.name}</TableBodyCell>
        <TableBodyCell>{drink.hOverallScore}</TableBodyCell>
        <TableBodyCell>{drink.hEaseOfMake}</TableBodyCell>
        <TableBodyCell>{drink.hLook}</TableBodyCell>
        <TableBodyCell>{drink.hWouldAtBar}</TableBodyCell>
        <TableBodyCell>{drink.hTaste}</TableBodyCell>
        <TableBodyCell>{drink.date}</TableBodyCell>
    {:else}
        <P>Missing user</P>
    {/if}
</TableBodyRow>