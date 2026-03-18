<script lang="ts">
  import { authClient } from '$lib/auth-client';
  import { goto } from '$app/navigation';

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          goto('/sign-in');
        }
      }
    });
  }
</script>
<div>
  <h1>Dashboard</h1>
  <button on:click={handleSignOut}>Sign Out</button>
</div>

