<script>
    import { authClient } from "$lib/auth-client";
    import { goto } from "$app/navigation";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import * as Card from "$lib/components/ui/card";
    import Icon from "@iconify/svelte";

    let email = "";
    let password = "";
    let loading = false;

    async function handleSubmit() {
        const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: '/dashboard'
        }, {
        onRequest: () => {
            loading = true;
        },
        onSuccess: () => {
            goto('/dashboard');
        },
        onError: (ctx) => {
            alert(ctx.error.message);
        }
        });

        loading = false;
    }

    async function handleGoogle() {
        const { data, error } = await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/dashboard'
        }, {
        onRequest: () => {
            loading = true;
        },
        onSuccess: () => {
            goto('/dashboard');
        },
        onError: (ctx) => {
            alert(ctx.error.message);
        }
        });

        loading = false;
    }

</script>

<div class="flex min-h-screen items-center justify-center">
    <Card.Root class="w-full max-w-md">
        <Card.Header>
            <Card.Title>Login</Card.Title>
            <Card.Description>Enter your email to log in</Card.Description>
        </Card.Header>
        <Card.Content class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
                <Label for="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" bind:value={email} />
            </div>
            <div class="flex flex-col gap-2">
                <Label for="password">Password</Label>
                <Input id="password" type="password" bind:value={password} />
            </div>
            <Button disabled={loading} onclick={handleSubmit} class="cursor-pointer">
                {loading ? 'Logging in...' : 'Login'}
            </Button>
            <Button variant="outline" onclick={handleGoogle} class="cursor-pointer">
                <Icon icon="flat-color-icons:google"/> Login with Google
            </Button>
            <p class="text-center text-sm text-muted-foreground">
                Don't have an account? <a href="/sign-up" class="underline">Sign up</a>
            </p>
        </Card.Content>
    </Card.Root>
</div>