<script>
    import {
        Button,
        Grid,
        Row,
        Column,
        StructuredList,
        StructuredListHead,
        StructuredListRow,
        StructuredListCell,
        StructuredListBody,
        StructuredListSkeleton,
        ButtonSet
    } from "carbon-components-svelte";
    import {
        goto
    } from '$app/navigation';
</script>

<Grid>
    <Row>
        <Column>
            <h1 style="padding-bottom: 40px;">Getting Started</h1>
            <p class="column-text" style="font-size: 20px; font-weight: 400;">
                Search by specific metadata or get random cards. Those options are always avalibe at the top menu.
            </p>
            <p class="column-text">
                If there is a country that you want to explore, start there!
            </p>

            <Button kind="primary" on:click={() => {goto("/search")}}>Metadata Search</Button>
            <Button kind="primary" on:click={() => {goto("/random")}}>Random Cards</Button>
        </Column>
    </Row>
    <Row>
        <Column style="padding-top: 40px;">
            <h3>Searchable metadata:</h3>
            <StructuredListSkeleton rows={3} />
        </Column>
    </Row>
</Grid> 

<style>
    .column-text {
        max-width: 44rem;
        padding-bottom: 20px;
    }
    .nested-link {
        color: inherit;
        text-decoration: inherit;
    }
</style>