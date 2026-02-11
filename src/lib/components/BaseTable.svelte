<script lang="ts">
    import { Table, TableHead, TableHeadCell, P, Button, TableBody } from "flowbite-svelte";
    import DrinkRow from "$lib/components/DrinkRow.svelte";
    import TableSorter from "$lib/components/TableSorter.svelte";
    import type { Drink } from "$lib/api/drinks";

    interface Props {
        drinks: Drink[];
        displayedUser: string;
    }

    let { drinks = $bindable(), displayedUser = $bindable() }: Props = $props();

    function onUserClick(user: string) {
        displayedUser = user;
    }
</script>

<Table class="text-left outline outline-gray-300 rounded" hoverable={true}>
    <TableHead class="h-14 text-gray-800 text-sm bg-gray-100">
        <TableHeadCell class="w-64 pl-6">Name</TableHeadCell>
        <TableHeadCell class="w-44">
            <div class="flex gap-1 items-center">
                <P class="text-sm">Overall</P>
                <TableSorter bind:drinks field={"overallScore"} />
            </div>
        </TableHeadCell>
        <TableHeadCell class="w-44">
            <div class="flex gap-1 items-center">
                <Button onclick={() => onUserClick("matt")}>
                    <P class="text-black text-sm cursor-pointer">Matt</P>
                </Button>
                <TableSorter bind:drinks field={"mOverallScore"} />
            </div>
        </TableHeadCell>
        <TableHeadCell class="w-44">
            <div class="flex gap-1 items-center">
                <Button onclick={() => onUserClick("jack")}>
                    <P class="text-black text-sm cursor-pointer">Jack</P>
                </Button>
                <TableSorter bind:drinks field={"jOverallScore"} />
            </div>
        </TableHeadCell>
        <TableHeadCell class="w-44">
            <div class="flex gap-1 items-center">
                <Button onclick={() => onUserClick("hayden")}>
                    <P class="text-black text-sm cursor-pointer">Hayden</P>
                </Button>
                <TableSorter bind:drinks field={"hOverallScore"} />
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
            <DrinkRow {drink}/>
        {/each}
    </TableBody>
</Table>