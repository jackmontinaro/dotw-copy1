<script lang="ts">
    import "$lib/assets/app.css";
    import { featureFlags } from "$lib/featureFlags";
</script>

<div class={featureFlags.dark_background ? 'bg-gray-800 min-h-screen' : 'min-h-screen'}>
    <slot />
</div>
