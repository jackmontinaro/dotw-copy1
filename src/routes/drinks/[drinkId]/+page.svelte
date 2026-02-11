<script lang="ts">
    import { Heading, Li, List, P, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import type { PageData } from "./$types";
    import type { Drink } from "$lib/api/drinks";

    import { goto } from "$app/navigation";

    let { data } = $props<{ data: PageData }>();

    // svelte-ignore state_referenced_locally
    let drink: Drink = $state(data.drink);

    let recipeItems: string[] = drink.recipe?.split("\n") ?? [];
    let notes: string[] = drink.notes?.split("\n") ?? [];

    function onClick() {
        goto(`/drinks`)
    }
</script>

<div class="w-full h-full p-12 flex flex-col gap-6 items-center">
    <div class="w-3/4 flex items-center justify-between">
        <Heading tag="h1" class="text-xl font-bold text-gray-800">{drink.name}</Heading>
        <button class="cursor-pointer" onclick={onClick}>Back</button>
    </div>
    <div class="w-3/4 flex gap-4">
        <div class="flex-1 outline outline-gray-300 rounded p-2 flex flex-col">
            <Heading tag="h2" class="text-md font-semibold text-gray-700">Recipe</Heading>
            {#if recipeItems.length > 0}
                <List tag="ul" class="pl-4 text-sm list-disc text-gray-600">
                    {#each recipeItems as item}
                        <Li>{item}</Li>
                    {/each}
                </List>
            {/if}
        </div>
        <div class="flex-1 outline outline-gray-300 rounded p-2 flex flex-col">
            <Heading tag="h2" class="text-md font-semibold text-gray-700">Notes</Heading>
            {#if notes.length > 0}
                <List tag="ul" class="pl-4 text-sm list-disc text-gray-600">
                    {#each notes as item}
                        <Li>{item}</Li>
                    {/each}
                </List>
            {/if}
        </div>
    </div>
    <div class="w-3/4 flex gap-4">
        <div class="flex-1 outline outline-gray-300 rounded p-2 flex flex-col">
            <Heading tag="h2" class="text-md font-semibold text-gray-700">Scores</Heading>
            <Table class="text-left" hoverable={true}>
                <TableHead class="h-14 text-gray-700 text-sm">
                    <TableHeadCell class="w-64 pl-6">Category</TableHeadCell>
                    <TableHeadCell class="w-44">Matt</TableHeadCell>
                    <TableHeadCell class="w-44">Jack</TableHeadCell>
                    <TableHeadCell class="w-44">Hayden </TableHeadCell>
                </TableHead>
                <TableBody class="text-gray-600">
                    <TableBodyRow>
                        <TableBodyCell class="pl-6 pb-2">Ease of make</TableBodyCell>
                        <TableBodyCell>{drink.mEaseOfMake}</TableBodyCell>
                        <TableBodyCell>{drink.jEaseOfMake}</TableBodyCell>
                        <TableBodyCell>{drink.hEaseOfMake}</TableBodyCell>
                    </TableBodyRow>
                    <TableBodyRow>
                        <TableBodyCell class="pl-6 pb-2">Look</TableBodyCell>
                        <TableBodyCell>{drink.mLook}</TableBodyCell>
                        <TableBodyCell>{drink.jLook}</TableBodyCell>
                        <TableBodyCell>{drink.hLook}</TableBodyCell>
                    </TableBodyRow>
                     <TableBodyRow>
                        <TableBodyCell class="pl-6 pb-2">Would at bar?</TableBodyCell>
                        <TableBodyCell>{drink.mWouldAtBar}</TableBodyCell>
                        <TableBodyCell>{drink.jWouldAtBar}</TableBodyCell>
                        <TableBodyCell>{drink.hWouldAtBar}</TableBodyCell>
                    </TableBodyRow>
                    <TableBodyRow>
                        <TableBodyCell class="pl-6 pb-2">Taste</TableBodyCell>
                        <TableBodyCell>{drink.mTaste}</TableBodyCell>
                        <TableBodyCell>{drink.jTaste}</TableBodyCell>
                        <TableBodyCell>{drink.hTaste}</TableBodyCell>
                    </TableBodyRow>
                </TableBody>
            </Table>
        </div> 
    </div>
</div>