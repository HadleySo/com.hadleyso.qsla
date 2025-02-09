<svelte:head>
    <title>Tag{tag.replace("TAG_", " ")} | QSL Card Archive | Hadley So</title>
</svelte:head>
<script>
    import {
        Grid,
        Row,
        Column,
        Modal,
        InlineLoading,
        Toolbar,
        ToolbarContent,
        DataTable,
        DataTableSkeleton,
        Link,
        Pagination,
        ToolbarMenu,
        ToolbarMenuItem,

    } from "carbon-components-svelte";
    import { browser } from '$app/environment';
    import { getCookie } from "$lib/cookie.js";
    import {
        goto 
    } from '$app/navigation';
    import { page } from '$app/state';
	import { onMount } from 'svelte';
    import { searchByTagWrap } from '$lib/search'
    import { Launch } from "carbon-icons-svelte";
    import sources from '$lib/metadata-config/sources.json';



    let redirectModal = $state(false);
    let tag = $state("");



    onMount(() => {
        if (page.url.searchParams.has('t')) {
            tag = page.url.searchParams.get('t');
            runTagSearch();
            
        } else {
            goto("/tags");
        }
        if (browser) {
            if (getCookie(document.cookie, "qslArchiveDataSet") == null) {
                redirectModal = true;
                setTimeout(() => goto("/initialize-client?origin=%2Ftag%3Ft%3D"+tag), 5000)
            }
        }
        
    });

    function runTagSearch() {

        document.getElementById("dataTableReal").style.display = "none";
        document.getElementById("dataTableFake").style.display = "block";

        // Send new promise
        const tagRetrievePromise = new Promise((resolve, reject) => {
        try{
            resolve(searchByTagWrap(tag));
        }
        catch (e) {
            reject(e);
        }
        });

        // Handle promise return
        tagRetrievePromise.then(
            (value) => {
                // success
                document.getElementById("dataTableReal").style.display = "block";
                document.getElementById("dataTableFake").style.display = "none";

                console.log(`searchPromise done ${value}`);
                rows = value;
            },
            (reason) => {
                // failure
                // step02ProgressBar="error";
                // step02ProgressBarLabel=`Error: ${reason}`

            }
        );

    }


    let pageSize = $state(15);
    let pageStat = $state(1);
    let rows = $state([{}]);

    

</script>

<Grid>
    <Row>
        <Column>
            <h1 style="padding-bottom: 40px;">Tag: {tag.replace("TAG_", "")}</h1>
        </Column>
    </Row>
    <Row>
        <Column>
            <hr style="margin-top: 60px; margin-bottom: 60px;">
            <DataTable
                title="Search results"
                sortable
                expandable
                headers={sources.tableHeaders}
                {pageSize}
                bind:page={pageStat}
                id="dataTableReal"
                bind:rows={rows}
            >
                <Toolbar size="sm">
                    <ToolbarContent>
                    <ToolbarMenu>
                        <ToolbarMenuItem on:click={() => {goto("/getting-started")}}>Metadata Information</ToolbarMenuItem>
                    </ToolbarMenu>
                    </ToolbarContent>
                </Toolbar>
                <Pagination
                    bind:pageSize
                    bind:page={pageStat}
                    totalItems={rows.length}
                    pageSizeInputDisabled
                />
                <svelte:fragment slot="expanded-row" let:row>
                    <pre>{JSON.stringify(row, null, 2)}</pre>
                </svelte:fragment>
                <svelte:fragment slot="cell" let:row let:cell>
                    {#if cell.key === "pk" && cell.value !== "..."}
                      <Link
                        icon={Launch}
                        href="/urn?pk={cell.value}">{cell.value}
                    </Link>
                    {:else}
                      {cell.value}
                    {/if}
                  </svelte:fragment>
            </DataTable>

            <DataTableSkeleton id="dataTableFake" style="display: none;" />
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
