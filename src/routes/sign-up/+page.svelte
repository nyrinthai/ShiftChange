<script>
    import { authClient } from "$lib/auth-client";
    import { goto } from "$app/navigation";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import * as Card from "$lib/components/ui/card";
    import Icon from "@iconify/svelte";

    let name = "";
    let email = "";
    let password = "";
    let confirmPassword = "";
    let error = "";
    let loading = false;

    async function handleSubmit() {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }   
        const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
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
            <Card.Title>Sign Up</Card.Title>
            <Card.Description>Create a new account to get started</Card.Description>
        </Card.Header>
        <Card.Content class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
                <Label for="name">Name</Label>
                <Input id="name" type="text" placeholder="John Doe" bind:value={name} />
            </div>
            <div class="flex flex-col gap-2">
                <Label for="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" bind:value={email} />
            </div>
            <div class="flex flex-col gap-2">
                <Label for="password">Password</Label>
                <Input id="password" type="password" bind:value={password} />
            </div>
            <div class="flex flex-col gap-2">
                <Label for="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" bind:value={confirmPassword} />
            </div>
            <Button disabled={loading} onclick={handleSubmit} class="cursor-pointer">
                {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
            <Button variant="outline" onclick={handleGoogle} class="cursor-pointer">
                <Icon icon="flat-color-icons:google"/> Sign up with Google
            </Button>
            <p class="text-center text-sm text-muted-foreground">
                Already have an account? <a href="/sign-in" class="underline">Log in</a>
            </p>
        </Card.Content>
    </Card.Root>
</div>