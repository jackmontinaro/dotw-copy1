<script lang="ts">
    import { Table, TableHead, TableHeadCell, P, Button, TableBody, Heading } from "flowbite-svelte";
    import TableSorter from "$lib/components/TableSorter.svelte";
    import type { Drink } from "$lib/api/drinks";
    import UserDrinkRow from "$lib/components/UserDrinkRow.svelte";

    interface Props {
        drinks: Drink[];
        displayedUser: string;
        userPrefix: string;
    }

    let { drinks = $bindable(), displayedUser = $bindable(), userPrefix = $bindable() }: Props = $props();

    function toSentenceCase(s: string): string {
        return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    }
</script>

<div class="w-full flex items-center">
    <Heading tag="h1" class="p-2 text-md font-semibold text-gray-800">{toSentenceCase(displayedUser)}</Heading>
    <div class="flex-1"></div>
    <Button class="w-24 border-none text-black cursor-pointer" onclick={() => displayedUser = ""}>Show all</Button>
</div>
<Table class="text-left outline outline-gray-300 rounded" hoverable={true}>
    <TableHead class="h-14 text-gray-800 text-sm bg-gray-100">
        <TableHeadCell class="w-64 pl-6">Name</TableHeadCell>
        <TableHeadCell class="w-44">
            <div class="flex gap-1 items-center">
                <P class="text-sm">Overall</P>
                <TableSorter bind:drinks field={`${userPrefix}OverallScore`} />
            </div>
        </TableHeadCell>
        <TableHeadCell class="w-44">
            <div class="flex gap-1 items-center">
                <P class="text-sm">Ease of make</P>
                <TableSorter bind:drinks field={`${userPrefix}EaseOfMake`} />
            </div>
        </TableHeadCell>
        <TableHeadCell class="w-44">
            <div class="flex gap-1 items-center">
                <P class="text-sm">Look</P>
                <TableSorter bind:drinks field={`${userPrefix}Look`} />
            </div>
        </TableHeadCell>
        <TableHeadCell class="w-44">
            <div class="flex gap-1 items-center">
                <P class="text-sm">Would at bar?</P>
                <TableSorter bind:drinks field={`${userPrefix}WouldAtBar`} />
            </div>
        </TableHeadCell>
        <TableHeadCell class="w-44">
            <div class="flex gap-1 items-center">
                <P class="text-sm">Taste</P>
                <TableSorter bind:drinks field={`${userPrefix}Taste`} />
            </div>
        </TableHeadCell>
        <TableHeadCell class="w-44">
            <div class="flex gap-1 items-center">
                <P class="text-sm">Date</P>
                <TableSorter bind:drinks field={"date"} />
            </div>
        </TableHeadCell>
    </TableHead>
    <TableBody class="text-gray-600">
        {#each drinks as drink}
            <UserDrinkRow {drink} user={displayedUser}/>
        {/each}
    </TableBody>
</Table>