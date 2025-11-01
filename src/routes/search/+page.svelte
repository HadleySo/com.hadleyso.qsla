<svelte:head>
    <title>Search | QSL Card Archive | Hadley So</title>
</svelte:head>
<script>
    import {
        Button,
        Grid,
        Row,
        Column,
        Form,
        FormGroup,
        MultiSelect,
        TextInput,
        DatePicker,
        DatePickerInput,
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
        SkeletonPlaceholder
    } from "carbon-components-svelte";
    import {
        goto
    } from '$app/navigation';
    import { browser } from '$app/environment';
    import sources from '$lib/metadata-config/sources.json';

	let { data } = $props();

    import { searchFormWrap } from '$lib/search.js'
    import { getCookie } from "$lib/cookie.js";
    import { Launch, SearchAdvanced } from "carbon-icons-svelte";

    let from_call = $state("");
    let to_call = $state("");
    let frequency = $state("");
    let rst = $state("");
    let freeContent = $state("");
    /**
     * @type {never[]}
     */
    let country = $state([]);
    /**
     * @type {never[]}
     */
    let mode = $state([]);
    /**
     * @type {never[]}
     */
    let us_canada_region = $state([]);
    /**
     * @type {never[]}
     */
    let ussr_region = $state([]);
    let date_utc_start = $state("");
    let date_utc_end = $state("");


    let redirectModal = $state(false);
    if (browser) {
        if (getCookie(document.cookie, "qslArchiveDataSet") == null) {
            redirectModal = true;
            setTimeout(() => goto("/initialize-client?origin=%2Fsearch"), 5000)
        }
    }


    let step02ProgressBar = $state("active");
    let step02ProgressBarLabel = $state("Searching...");
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
    
    function searchSubmit() {

        // Show loading bar
        document.getElementById("step01").style.display = "none";
        document.getElementById("step02").style.display = "block";
        document.getElementById("dataTableReal").style.display = "none";
        document.getElementById("dataTableFake").style.display = "block";

        // Send new promise
        const searchPromise = new Promise((resolve, reject) => {
            try{
                resolve(searchFormWrap(from_call, to_call, frequency, rst, freeContent, country, mode, us_canada_region, ussr_region, date_utc_start, date_utc_end));
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
                document.getElementById("step01").style.display = "block";
                document.getElementById("step02").style.display = "none";
                document.getElementById("dataTableReal").style.display = "block";
                document.getElementById("dataTableFake").style.display = "none";
                rows = value;
                selectedIndex = 0;
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
            pageSizeCardView = 10;
        }
        
    }

    let rowsCardView = $state([{}]);
    let pageCardView = $state(1);
    let pageSizeCardView = $state(1);
    let selectedIndex = $state(0);


</script>

<Grid>
    <Row>
        <Column>
            <h1 style="padding-bottom: 30px;">Search</h1>
            <p style="padding-bottom: 40px;">
                Please note that <span style="font-weight: 700;">less than 3%</span> of cards are searchable, most cards do not have metadata.
            </p>
        </Column>
    </Row>
    <Row>
        <Column>
            <Form
                method="POST"
                onsubmit={(e) => {
                    e.preventDefault();
                    searchSubmit();
                }}
              >
                <Row>
                    <Column>
                        <TextInput style="margin-bottom:40px;" labelText="From Call Sign" placeholder="Call sign..." id="from_call" name="from_call" bind:value={from_call}></TextInput>
                        <TextInput style="margin-bottom:40px;" labelText="To Call Sign" placeholder="Call sign..." id="to_call" name="to_call" bind:value={to_call}></TextInput>       
                        
                        <FormGroup legendText="Date of Contact - Range" style="margin-top: 40px;">
                            <DatePicker datePickerType="range" on:change bind:valueFrom={date_utc_start} bind:valueTo={date_utc_end}>
                                <DatePickerInput labelText="Start" placeholder="mm/dd/yyyy" id="date_utc_start" name="date_utc_start" />
                                <DatePickerInput labelText="End" placeholder="mm/dd/yyyy" id="date_utc_end" name="date_utc_end" />
                            </DatePicker>
                        </FormGroup>
 
                    </Column>

                    <Column>
                        <TextInput style="margin-bottom:40px;" labelText="Frequency" placeholder="Frequency..." id="frequency" name="frequency" bind:value={frequency}></TextInput>
                        <TextInput style="margin-bottom:40px;" labelText="RST" placeholder="RST..." id="rst" name="rst" bind:value={rst}></TextInput>

        
                    </Column>
                
                </Row>

                <Row style="margin-top: 40px;">

                    <Column>
                        <MultiSelect   
                            titleText="Countries (Current and Former)"
                            filterable
                            items={data.countries.countries}
                            name="country"
                            bind:selectedIds={country}
                        />
                        <br style="margin-top:15px;">
                        <MultiSelect
                            titleText="US States / Canadian Provinces"
                            filterable
                            items={data.us_can_region.us_can_region}
                            name="us_canada_region"
                            bind:selectedIds={us_canada_region}
                            direction="top"
                        />
                        <br style="margin-top:15px;">
                        <MultiSelect
                            titleText="Union Republics, Allied, and Satellite States (USSR) "
                            filterable
                            items={data.ussr_region.usssr_region}
                            name="ussr_region"
                            bind:selectedIds={ussr_region}
                            direction="top"
                        />


                    </Column>
                    <Column>
                        <MultiSelect
                            titleText="Modes"
                            filterable
                            items={data.mode.mode}
                            name="mode"
                            bind:selectedIds={mode}
                        />

                    </Column>
                </Row>

                <br style="margin-top: 40px;">

                <Button type="submit" id="step01" icon={SearchAdvanced}>Search</Button>
            </Form>
        </Column>
    </Row>
    <Row id="step02" style="display: none;">
        <Column>
            <ProgressBar bind:helperText={step02ProgressBarLabel} bind:status={step02ProgressBar} />
        </Column>
    </Row>
    <Row>
        <Column>
            <hr style="margin-top: 60px; margin-bottom: 60px;">
            <ContentSwitcher bind:selectedIndex={selectedIndex} on:change={() => {viewChange()}} style="margin-top: 60px; margin-bottom: 60px;">
                <Switch text="Table View" />
                <Switch text="Card View" />
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
                    <Tile light on:click={() =>{goto("/urn?pk="+row['pk'])}}>
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
                    </Tile>    
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
</style>
