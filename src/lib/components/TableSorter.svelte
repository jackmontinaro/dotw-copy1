<script lang="ts">
    import type { Drink } from "$lib/api/drinks";
    import { AngleDownOutline, AngleUpOutline } from "flowbite-svelte-icons";

    interface Props {
        drinks: Drink[];
        field: string;
    }

    let { drinks = $bindable(), field }: Props = $props();

    function sorter(direction: "ASC" | "DESC") {
        drinks.sort((a: Drink, b: Drink) => {
            let lhs: number = 0;
            let rhs: number = 0;
            if (field === "date") {
                lhs = new Date(a[field as keyof typeof a] as string ?? "1970").getTime();
                rhs = new Date(b[field as keyof typeof b] as string ?? "1970").getTime();
            } else {
                lhs = a[field as keyof typeof a] as number ?? 0;
                rhs = b[field as keyof typeof b] as number ?? 0;
            }
            if (direction === "ASC") {
                return lhs - rhs;
            }
            return rhs - lhs;
        });
    }
</script>

<div class="flex flex-col p-4">
    <AngleUpOutline class="h-3 w-3 cursor-pointer" onclick={() => sorter("ASC")}/>
    <AngleDownOutline class="h-3 w-3 cursor-pointer" onclick={() => sorter("DESC")}/>
</div>