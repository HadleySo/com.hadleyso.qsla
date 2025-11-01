<svelte:head>
    <title>Metadata Contributions | QSL Card Archive | Hadley So</title>
</svelte:head>
<script>
    import { goto } from "$app/navigation";
    import {
        Grid,
        Row,
        Column,
        ButtonSet,
        Button,
        UnorderedList,
        ListItem
    } from "carbon-components-svelte";
</script>

<Grid>
    <Row>
        <Column>
            <h1 style="padding-bottom: 40px;">Metadata Contributions</h1>
            <p class="column-text">
                After QSL cards are scanned and uploaded, all metadata is keyed in manually.
                If you would like to contribute, please create an account below and contact me.
            </p>
            <p>
                Ideally you would be able to:
            </p>

            <UnorderedList style="padding-left:30px">
                <ListItem>Read cursive</ListItem>
                <ListItem>Understand HAM radio terminology</ListItem>
                <ListItem>Know basic geography</ListItem>
            </UnorderedList>
            <br style="margin-bottom: 30px;">
        </Column>
    </Row>
    <Row>
        <Column>
            <ButtonSet>
                <Button kind="primary" on:click={() => {goto("/contact")}}>Contact</Button>
                <Button kind="secondary" on:click={() => {window.location="https://bars-qsl.hadleyso.com/"}}>Metadata Keying Platform</Button>
            </ButtonSet>

        </Column>
    </Row>
</Grid> 

<style>
    .column-text {
        max-width: 44rem;
        padding-bottom: 20px;
    }
</style>