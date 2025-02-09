<script>
    import {
        Grid,
        Row,
        Column,
        ClickableTile,
        SkeletonText,
        Modal,
        InlineLoading
    } from "carbon-components-svelte";
    import { getTags } from '$lib/search.js'
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment";
    import { getCookie } from "$lib/cookie.js";

    var tagList = $state([])
    let redirectModal = $state(false);

    if (browser) {
        if (getCookie(document.cookie, "qslArchiveDataSet") == null) {
            redirectModal = true;
            setTimeout(() => goto("/initialize-client"), 5000)
        }
    }
    // Send new promise
    const tagsPromise = new Promise((resolve, reject) => {
        try{
            resolve(getTags());
        }
        catch (e) {
            reject(e);
        }
    });

    // Handle promise return
    tagsPromise.then(
        (value) => {
            // success
            tagList = value;

            document.getElementById("SeletonLoad").style.display = "none";
            document.getElementById("tagArea").style.display = "block";
        },
        (reason) => {
            // failure
            console.error(`Unable to getTags() ${reason}`)
        }
    );

</script>

<Grid>
    <Row>
        <Column>
            <h1 style="padding-bottom: 40px;">Tags</h1>
            <p class="column-text">
                QSL Cards may have tag assigned to them, even before they are processed. Below is a list of available tags. 
                Click on a tag to view cards with that tag.
            </p>
        </Column>
    </Row>
    <Row>
        <Column>

            <SkeletonText paragraph width="50%" id="SeletonLoad" />

            <div class="column-text" id="tagArea" style="display: none;;">

                {#each tagList as tag}
                    <ClickableTile href="/tag?t={tag}" style="margin-bottom: 30px;">
                        {tag.replace("TAG_", "")}
                    </ClickableTile>
                {/each}
            </div>

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
</style>