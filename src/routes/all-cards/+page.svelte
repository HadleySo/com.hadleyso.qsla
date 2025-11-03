<svelte:head>
    <title>View All Cards | QSL Card Archive | Hadley So</title>
</svelte:head>
<script>
    import {
        Grid,
        Row,
        Column,
        Modal,
        InlineLoading,
        ProgressBar,
        DataTable,
        ToolbarContent,
        ToolbarMenuItem,
        ToolbarMenu,
        Toolbar,
        Pagination,
        DataTableSkeleton,
        Link,
        ImageLoader,
        InlineNotification,
        Tile,
        ContentSwitcher,
        Switch,
        SkeletonPlaceholder,
        Button,

    } from "carbon-components-svelte";
    import {
        goto
    } from '$app/navigation';
    import { browser } from '$app/environment';
    import sources from '$lib/metadata-config/sources.json';

    import { getAllCards } from '$lib/search.js'
    import { getCookie } from "$lib/cookie.js";
    import { Launch } from "carbon-icons-svelte";


    let redirectModal = $state(false);
    if (browser) {
        if (getCookie(document.cookie, "qslArchiveDataSet") == null) {
            redirectModal = true;
            setTimeout(() => goto("/initialize-client?origin=%2Fall-cards"), 5000)
        } 
    }


    let step02ProgressBar = $state("active");
    let step02ProgressBarLabel = $state("Loading...");
    let pageSize = $state(15);
    let page = $state(1);
    let rows = $state([
        {
            id: "a",
            pk: "...",
            from_call: "...",
            to_call: "...",
            date_utc: "...",
            country: "...",
            us_canada_region: "...",
            thumbnail_filename: "",
        },
        {
            id: "b",
            pk: "...",
            from_call: "...",
            to_call: "...",
            date_utc: "...",
            country: "...",
            us_canada_region: "...",
            thumbnail_filename: "",
        },
        {
            id: "c",
            pk: "...",
            from_call: "...",
            to_call: "...",
            date_utc: "...",
            country: "...",
            us_canada_region: "...",
            thumbnail_filename: "",
        },
        {
            id: "d",
            pk: "...",
            from_call: "...",
            to_call: "...",
            date_utc: "...",
            country: "...",
            us_canada_region: "...",
            thumbnail_filename: "",
        },
    ]);
    
    function loadButtonWrap() {
        loadedAnyData = true;
        searchSubmit(0);
        document.getElementById("loadButton").style.display = "none";
        document.getElementById("sectionSelector").style.display = "block";
    }

    
    /**
     * @param {number} pgNumber
     */
    function searchSubmit(pgNumber) {

        // Show loading bar
        document.getElementById("step02").style.display = "block";
        document.getElementById("dataTableReal").style.display = "none";
        document.getElementById("dataTableFake").style.display = "block";

        // Send new promise
        const searchPromise = new Promise((resolve, reject) => {
            try{
                resolve(getAllCards(pgNumber, pageSize*50));
            }
            catch (e) {
                reject(e);
            }
        });

        // Handle promise return
        searchPromise.then(
            (value) => {
                // success
                console.log(`searchPromise done ${value}`);
                document.getElementById("step02").style.display = "none";
                document.getElementById("dataTableReal").style.display = "block";
                document.getElementById("dataTableFake").style.display = "none";
                rows = value;
                if (pgNumber == 0) {
                    selectedIndex = 1;
                }
            },
            (reason) => {
                // failure
                step02ProgressBar="error";
                step02ProgressBarLabel=`Error: ${reason}`

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
        }
        
    }

    function allPkPageDown() {
        allPkPage = allPkPage - 1;
        searchSubmit(allPkPage);
        page = 1;
        pageCardView = 1;
    }

    function allPkPageUp() {
        allPkPage = allPkPage + 1;
        searchSubmit(allPkPage);
        page = 1;
        pageCardView = 1;
    }

    let rowsCardView = $state([{}]);
    let pageCardView = $state(1);
    let pageSizeCardView = $state(15);
    let selectedIndex = $state(0);
    let allPkPage = $state(0);
    let loadedAnyData = $state(false);


</script>

<Grid>
    <Row>
        <Column>
            <h1 style="padding-bottom: 40px;">View All Cards</h1>
            <p id="loadButton">
                Click the button below to load cards: <br><br>
                <Button  on:click={loadButtonWrap}>Load all cards</Button>
            </p>
            <div style="display: none;" id="sectionSelector">
                <h4>
                    On section {allPkPage}
                </h4>
                <div style="padding: 10px;">
                    <Button kind={"tertiary"} on:click={allPkPageDown} disabled={allPkPage === 0}>Section Down (to {allPkPage  - 1})</Button>
                    <Button kind={"tertiary"} on:click={allPkPageUp}>Section Up (to {allPkPage + 1})</Button>
                </div>
                <br><br>
                <p>
                    Each section has 750 cards, use the page arrows on the top right of the table heading below to page through. <br>
                    To load a new section use the buttons above.
                </p>
            </div>

        </Column>
    </Row>
    <Row id="step02" style="display: none;">
        <Column>
            <ProgressBar bind:helperText={step02ProgressBarLabel} bind:status={step02ProgressBar} />
        </Column>
    </Row>
    <Row>
        <Column>
            <ContentSwitcher bind:selectedIndex={selectedIndex} on:change={() => {viewChange()}} style="margin-top: 60px; margin-bottom: 60px;">
                <Switch text="Table View" />
                <Switch text="Card View" disabled={!loadedAnyData}/>
            </ContentSwitcher>
        </Column>
    </Row>
    <Row id="tableView">
        <Column>
            <DataTable
                title="Search results"
                sortable
                expandable
                nonExpandableRowIds={["a", "b", "c", "d"]}
                headers={sources.tableHeaders}
                {pageSize}
                {page}
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
                    bind:page
                    totalItems={rows.length}
                    pageSizeInputDisabled
                />
                <svelte:fragment slot="expanded-row" let:row>
                    <div style="max-width: 80vw; overflow-x: auto; white-space: nowrap;">
                        <pre>{JSON.stringify(row, null, 2)}</pre>
                    </div>                </svelte:fragment>
                <svelte:fragment slot="cell" let:row let:cell>
                    {#if cell.key === "pk" && cell.value !== "..."}
                      <Link
                        icon={Launch}
                        href="/urn?pk={cell.value}" target="_blank">{cell.value}
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

        {#each rowsCardView.slice((pageCardView-1)*pageSizeCardView, pageCardView*pageSizeCardView) as row, i}
            {#if row['pk'] === "..."}
                <div class="cardViewTile">
                        <Tile light>
                            <SkeletonPlaceholder />

                            <p><small>Data not initialized</small></p>
                        </Tile>    
                    </div>  
            {:else}
                <div class="cardViewTile">
                    <Link href="/urn?pk={row['pk']}" target="_blank">
                        <Tile light>
                            <ImageLoader
                                fadeIn
                                src={sources.meta + "/thumbnails/" + row['thumbnail_filename']}
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
                        </Tile> &emsp13;
                    </Link>
                </div>    
            {/if}
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
    /* Global selectors to override Carbon styles inside Svelte */
    :global(.bx--link:hover) {
        text-decoration: none;
        box-shadow: none;      /* some inline variants use a shadow underline */
        border-bottom: none;   /* ensure any border-based underline is removed */
    }
</style>
