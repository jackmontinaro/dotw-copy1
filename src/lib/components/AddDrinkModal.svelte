<script lang="ts">
    import { type Drink } from "$lib/api/drinks";
    import { Button } from "flowbite-svelte"; 

    interface Props {
        allDrinks: Drink[];
        drinks: Drink[];
        showModal: boolean;
    }

    let { allDrinks = $bindable(), drinks = $bindable(), showModal = $bindable(false) }: Props = $props();

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

    function openModal() {
        form = { ...emptyForm };
        showModal = true;
    }
    function closeModal() {
        showModal = false;
    }

    async function submitForm() {
        try {
            // coerce numeric inputs
            const mEase = Number(form.mEaseOfMake ?? 0);
            const mLook = Number(form.mLook ?? 0);
            const mTaste = Number(form.mTaste ?? 0);
            const mWould = Number(form.mWouldAtBar ?? 0);
            const jEase = Number(form.jEaseOfMake ?? 0);
            const jLook = Number(form.jLook ?? 0);
            const jTaste = Number(form.jTaste ?? 0);
            const jWould = Number(form.jWouldAtBar ?? 0);
            const hEase = Number(form.hEaseOfMake ?? 0);
            const hLook = Number(form.hLook ?? 0);
            const hTaste = Number(form.hTaste ?? 0);
            const hWould = Number(form.hWouldAtBar ?? 0);

            const mOverall = mEase + mLook + mTaste + mWould;
            const jOverall = jEase + jLook + jTaste + jWould;
            const hOverall = hEase + hLook + hTaste + hWould;
            const overall = Number(((mOverall + jOverall + hOverall) / 3).toFixed(1));

            const payload = {
                name: form.name ?? '',
                recipe: form.recipe ?? '',
                notes: form.notes ?? '',
                date: form.date ?? '',
                // computed/defaults
                timesDrank: 1,
                mEaseOfMake: mEase,
                mLook: mLook,
                mTaste: mTaste,
                mWouldAtBar: mWould,
                jEaseOfMake: jEase,
                jLook: jLook,
                jTaste: jTaste,
                jWouldAtBar: jWould,
                hEaseOfMake: hEase,
                hLook: hLook,
                hTaste: hTaste,
                hWouldAtBar: hWould,
                mOverallScore: mOverall,
                jOverallScore: jOverall,
                hOverallScore: hOverall,
                overallScore: overall,
            };

            const res = await fetch('/drinks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error('failed to add drink');
            const body = await res.json();
            // optimistic add: include returned id when available
            const newDrink: Drink = { id: body?.id ? String(body.id) : undefined, ...payload } as Drink;
            allDrinks = [newDrink, ...drinks];
            drinks = [newDrink, ...drinks];
            closeModal();
        } catch (e) {
            console.error(e);
        }
    }
</script>

<div class="absolute inset-0 z-50 flex items-center justify-center">
    <Button class="absolute inset-0 bg-black/50 cursor-pointer" onclick={closeModal} />

    <div class="bg-white rounded-lg shadow-lg z-10 w-11/12 max-w-2xl p-6 text-sm">
        <div class="flex items-center justify-between mb-3">
            <h3 class="text-base font-semibold">Add new drink</h3>
            <button class="text-gray-600" onclick={closeModal}>✕</button>
        </div>

        <div class="grid grid-cols-6 gap-3 max-h-[600px] overflow-auto">
            <div class="col-span-3">
                <label for="name" class="block text-xs text-gray-700">Name</label>
                <input id="name" class="mt-0.5 w-full border rounded px-2 py-0.5" bind:value={form.name} />
            </div>
            <div class="col-span-3">
                <label for="date" class="block text-xs text-gray-700">Date</label>
                <input id="date" type="date" class="mt-0.5 w-full border rounded px-2 py-0.5" bind:value={form.date} />
            </div>

            <div class="col-span-6 font-semibold mt-2 text-xs">Ease (0-5)</div>
            <div class="col-span-2">
                <label for="mEaseOfMake" class="block text-xs text-gray-700">Matt</label>
                <input id="mEaseOfMake" type="number" min="0" max="10" class="mt-0.5 w-full border rounded px-2 py-0.5" bind:value={form.mEaseOfMake} />
            </div>
            <div class="col-span-2">
                <label for="jEaseOfMake" class="block text-xs text-gray-700">Jack</label>
                <input id="jEaseOfMake" type="number" min="0" max="10" class="mt-0.5 w-full border rounded px-2 py-0.5" bind:value={form.jEaseOfMake} />
            </div>
            <div class="col-span-2"> 
                <label for="hEaseOfMake" class="block text-xs text-gray-700">Hayden</label>
                <input id="hEaseOfMake" type="number" min="0" max="10" class="mt-0.5 w-full border rounded px-2 py-0.5" bind:value={form.hEaseOfMake} />
            </div>

            <div class="col-span-6 font-semibold mt-2 text-xs">Look (0-5)</div>
            <div class="col-span-2">
                <label for="mLook" class="block text-xs text-gray-700">Matt</label>
                <input id="mLook" type="number" min="0" max="5" class="mt-0.5 w-full border rounded px-2 py-0.5" bind:value={form.mLook} />
            </div>
            <div class="col-span-2">
                <label for="jLook" class="block text-xs text-gray-700">Jack</label>
                <input id="jLook" type="number" min="0" max="5" class="mt-0.5 w-full border rounded px-2 py-0.5" bind:value={form.jLook} />
            </div>
            <div class="col-span-2">
                <label for="hLook" class="block text-xs text-gray-700">Hayden</label>
                <input id="hLook" type="number" min="0" max="5" class="mt-0.5 w-full border rounded px-2 py-0.5" bind:value={form.hLook} />
            </div>

            <div class="col-span-6 font-semibold mt-2 text-xs">Would at bar (0-5)</div>
            <div class="col-span-2">
                <label for="mWouldAtBar" class="block text-xs text-gray-700">Matt</label>
                <input id="mWouldAtBar" type="number" min="0" max="5" class="mt-0.5 w-full border rounded px-2 py-0.5" bind:value={form.mWouldAtBar} />
            </div>
            <div class="col-span-2">
                <label for="jWouldAtBar" class="block text-xs text-gray-700">Jack</label>
                <input id="jWouldAtBar" type="number" min="0" max="5" class="mt-0.5 w-full border rounded px-2 py-0.5" bind:value={form.jWouldAtBar} />
            </div>
            <div class="col-span-2">
                <label for="hWouldAtBar" class="block text-xs text-gray-700">Hayden</label>
                <input id="hWouldAtBar" type="number" min="0" max="5" class="mt-0.5 w-full border rounded px-2 py-0.5" bind:value={form.hWouldAtBar} />
            </div>

            <div class="col-span-6 font-semibold mt-2 text-xs">Taste (0-10)</div>
            <div class="col-span-2">
                <label for="mTaste" class="block text-xs text-gray-700">Matt</label>
                <input id="mTaste" type="number" min="0" max="10" class="mt-0.5 w-full border rounded px-2 py-0.5" bind:value={form.mTaste} />
            </div>
            <div class="col-span-2">
                <label for="jTaste" class="block text-xs text-gray-700">Jack</label>
                <input id="jTaste" type="number" min="0" max="10" class="mt-0.5 w-full border rounded px-2 py-0.5" bind:value={form.jTaste} />
            </div>
            <div class="col-span-2">
                <label for="hTaste" class="block text-xs text-gray-700">Hayden</label>
                <input id="hTaste" type="number" min="0" max="10" class="mt-0.5 w-full border rounded px-2 py-0.5" bind:value={form.hTaste} />
            </div>

            <div class="col-span-6">
                <label for="recipe" class="block text-xs text-gray-700">Recipe</label>
                <textarea id="recipe" rows="3" class="mt-0.5 w-full border rounded px-2 py-0.5" bind:value={form.recipe}></textarea>
            </div>

            <div class="col-span-6">
                <label for="notes" class="block text-xs text-gray-700">Notes</label>
                <textarea id="notes" rows="2" class="mt-0.5 w-full border rounded px-2 py-0.5" bind:value={form.notes}></textarea>
            </div>
        </div>

        <div class="pt-3 flex justify-end gap-2">
            <button class="px-3 py-1 rounded border text-sm pointer-cursor" onclick={closeModal}>Cancel</button>
            <button class="px-3 py-1 rounded bg-blue-600 text-white text-sm pointer-cursor" onclick={submitForm}>Save</button>
        </div>
    </div>
</div>