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
        ContentSwitcher,
        Switch,
        Tile,
        ImageLoader,
        InlineNotification,
        SkeletonPlaceholder,
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
    let selectedIndex = $state(0);


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

    function viewChange() {
        console.log("CHANGE");
        console.log(selectedIndex);
        if (selectedIndex == 0) {
            document.getElementById("tableView").style.display = "block";
            document.getElementById("cardView").style.display = "none";
        } else if (selectedIndex == 1) {
            rowsCardView = rows;
            document.getElementById("tableView").style.display = "none";
            document.getElementById("cardView").style.display = "block";
            pageSizeCardView = 10;
        }
        
    }


    let pageSize = $state(15);
    let pageStat = $state(1);
    let rows = $state([{}]);

    let rowsCardView = $state([{}]);
    let pageCardView = $state(1);
    let pageSizeCardView = $state(1);

    

</script>

<Grid>
    <Row>
        <Column>
            <h1 style="padding-bottom: 40px;">Tag: {tag.replace("TAG_", "")}</h1>
        </Column>
    </Row>
    <Row>
        <Column>
            <ContentSwitcher bind:selectedIndex={selectedIndex} on:change={() => {viewChange()}}>
                <Switch text="Table View" />
                <Switch text="Card View" />
            </ContentSwitcher>
            <hr style="margin-top: 60px; margin-bottom: 60px;">
        </Column>
    </Row>
    <Row id="tableView">
        <Column>
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
                    <div style="max-width: 80vw; overflow-x: auto; white-space: nowrap;">
                        <pre>{JSON.stringify(row, null, 2)}</pre>
                    </div>
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
    <Row id="cardView" style="text-align: center;">
        <Pagination totalItems={rows.length} bind:page={pageCardView} bind:pageSize={pageSizeCardView} pageSizeInputDisabled />

        {#each rowsCardView.slice((pageCardView-1)*10, pageCardView*10) as row, i}
            <div class="cardViewTile">
                <Tile light on:click={() =>{goto("/urn?pk="+row['pk'])}}>
                    <ImageLoader
                        fadeIn
                        src={sources.meta + "/" + row['thumbnail_filename']}
                    >
                        <svelte:fragment slot="loading">
                            <SkeletonPlaceholder />
                        </svelte:fragment>
                        <svelte:fragment slot="error">
                            <InlineNotification
                                hideCloseButton
                                title="Error:"
                                subtitle="Unable to load thumbnail for QSL Card."
                            />
                        </svelte:fragment>
                    </ImageLoader>

                    <p>{row['pk']} <small>[{row['from_call']} {String(row['date_utc']).replace("Invalid Date", "")}]</small></p>
                </Tile>    
            </div>    
        {/each}
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
    .cardViewTile {
        max-width: 420px;
        padding: 20px;
        display: inline-block;
        text-align: left;
    }
</style>