<script>
    import {
        Grid,
        Row,
        Column,
        Search,
        Modal,
        InlineLoading
    } from "carbon-components-svelte";
    import { browser } from '$app/environment';
    import { getCookie } from "$lib/cookie.js";
    import {
        goto
    } from '$app/navigation';

    let redirectModal = $state(false);
    if (browser) {
        if (getCookie(document.cookie, "qslArchiveDataSet") == null) {
            redirectModal = true;
            setTimeout(() => goto("/initialize-client"), 5000)
        }
    }
</script>

<Grid>
    <Row>
        <Column>
            <h1 style="padding-bottom: 40px;">Card ID Reference</h1>
        </Column>
    </Row>
    <Row>
        <Column>
            <Search placeholder="URN / Card ID..." value="" />
        </Column>
    </Row>
</Grid> 

<Modal passiveModal preventCloseOnClickOutside bind:open={redirectModal} modalHeading="Initialization" on:open on:close>
    <p>
      The QSL Archive needs to load data before use, hang tight while we redirect you.
    </p>
    <br><br>
    <InlineLoading description="Redirecting..." />
</Modal>

<style>
    .column-text {
        max-width: 44rem;
        padding-bottom: 20px;
    }
    .section-title {
        padding-top: 50px;
        padding-bottom: 10px;
    }
</style>