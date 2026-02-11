<script lang="ts">
    import { goto } from "$app/navigation";
    import type { Drink } from "$lib/api/drinks";
    import { TableBodyCell, TableBodyRow } from "flowbite-svelte";

    interface Props {
        drink: Drink;
    }

    let { drink }: Props = $props();

    function onClick() {
        goto(`/drinks/${drink.id}`)
    }
</script>

<TableBodyRow class="border-t h-12 text-sm border-gray-300 hover:bg-gray-100" onclick={onClick}>
    <TableBodyCell class="pl-6 font-semibold">{drink.name}</TableBodyCell>
    <TableBodyCell>{drink.overallScore}</TableBodyCell>
    <TableBodyCell>{drink.mOverallScore}</TableBodyCell>
    <TableBodyCell>{drink.jOverallScore}</TableBodyCell>
    <TableBodyCell>{drink.hOverallScore}</TableBodyCell>
    <TableBodyCell>{drink.date}</TableBodyCell>
</TableBodyRow>