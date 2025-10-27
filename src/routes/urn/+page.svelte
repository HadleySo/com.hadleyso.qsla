<svelte:head>
    <title>URN{currentPk} | QSL Card Archive | Hadley So</title>
</svelte:head>
<script>
    import {
        Grid,
        Row,
        Column,
        Button,
        Search,
        Modal,
        InlineLoading,
        InlineNotification,
        ImageLoader,
        CodeSnippet
    } from "carbon-components-svelte";
    import { browser } from '$app/environment';
    import { getCookie } from "$lib/cookie.js";
    import {
        goto 
    } from '$app/navigation';
    import { page } from '$app/state';
    import { multiURN } from '$lib/search.js'
	import { onMount } from 'svelte';
    import { Search as SearchIcon } from "carbon-icons-svelte";

    import sources from '$lib/metadata-config/sources.json';

    let currentPk = $state("");

    let displayCardData = $state({});
    let srcImageLoader = $state("");
    let srcFullDoc = $state("");
    let srcFullDocHold = $state("");

    let searchBarValue = $state("");
    
    let redirectModal = $state(false);


    function searchFailure() {
        console.debug("searchFailure() called in urn");
        document.getElementById("searchBar").style.display = "none";
        document.getElementById("errorMessage").style.display = "block";
        document.getElementById("infoArea").style.display = "none";
        console.log(`STATUS STYLE OF ERROR MSG: ${document.getElementById("errorMessage").style.display}`)

    }

    function searchSuccess() {
        document.getElementById("errorMessage").style.display = "none";
        document.getElementById("infoArea").style.display = "block";
    }

    function resetPage() {
        // if resetPage called by closing error message
        if (arguments.length === 1) {
            arguments[0].preventDefault();
        }
        console.debug("resetPage() called in urn");
        document.getElementById("searchBar").style.display = "block";
        document.getElementById("errorMessage").style.display = "none";
        document.getElementById("infoArea").style.display = "none";
        goto("/urn");

    }
    
    function reMountRender() {
        if (page.url.searchParams.has('pk') || arguments.length === 1) {

            
            if (page.url.searchParams.has('pk')) {
                // If function is called because of direct link
                currentPk = page.url.searchParams.get('pk');
            } else if (arguments.length === 1) {
                // If function is called because of form submit onclick
                currentPk = arguments[0];
            }
            

            // Send new promise
            const getCardPromise = new Promise((resolve, reject) => {
                try{
                    const cardData = multiURN(new Array(currentPk));
                    resolve(cardData);
                }
                catch (e) {
                    reject(e);
                }
            });

            // Handle promise return
            getCardPromise.then(
                (value) => {
                    // success
                    console.info(`getCardPromise done in reMountRender(): ${value[0]}`);
                    searchSuccess();
                    displayCardData = value[0];
                    srcImageLoader = sources.meta + "/thumbnail/" + displayCardData['thumbnail_filename'];
                    srcFullDocHold = sources.fullDoc + "/reduced-full/" + displayCardData['archive_filename'];
                },
                (reason) => {
                    // failure
                    if (redirectModal) {
                        console.info(`Ok getCardPromise fail since IndexedDB not loaded: ${reason}`);
                    } else {
                        searchFailure();
                        console.error(`getCardPromise fail: ${reason}`);
                    }
                    

                }
            );

            console.debug(`Got PK URN reMountRender()`);
        }

    }

    function searchSubmit() {
        // Send new promise
        const naviPromise = new Promise((resolve, reject) => {
            try {
                resolve(goto("/urn?pk="+searchBarValue));
            }
            catch (e) {
                reject(e);
            }
        });

        // Handle promise return
        naviPromise.then(
            (value) => {
                // success
                reMountRender(searchBarValue); 
            },
            (reason) => {
                // failure
                console.error(`searchSubmit naviPromise fail: ${reason}`);

            }
        );

        
    }

    onMount(() => {
        if (page.url.searchParams.has('pk')) {
            currentPk = page.url.searchParams.get('pk');
        } 

        if (browser) {
            if (getCookie(document.cookie, "qslArchiveDataSet") == null) {
                redirectModal = true;
                setTimeout(() => goto("/initialize-client?origin=%2Furn%3Fpk%3D"+currentPk), 5000)
            }
        }
        reMountRender();
    });

    

</script>

<Grid>
    <Row>
        <Column>
            <h1 style="padding-bottom: 40px;">Retrieve URN</h1>
        </Column>
    </Row>
    <Row id="searchBar">
        <Column>
            <Search placeholder="URN..." bind:value={searchBarValue} />
            <br>
            <Button kind="secondary" size="field" on:click={() => searchSubmit()} icon={SearchIcon} >Retrieve</Button>
        </Column>
    </Row>
    <Row id="errorMessage" style="display:none;">
        <Column>
            <InlineNotification
                title="Error:"
                subtitle="The URN you entered does not exist. {currentPk}"
                on:close={(e) => resetPage(e)}
            />
          
        </Column>
    </Row>
    <Row>
        <Column>
            <hr style="margin-top: 50px; margin-bottom: 40px;">
        </Column>
    </Row>
</Grid>
<Grid id="infoArea" style="display:none;">
    <Row>
        <Column>
            <h1>
                URN: {displayCardData['pk']}
            </h1>
            
            <p class="column-text">
                <span class="label-text">Date UTC:</span> {displayCardData['date_utc']}
            </p>
            <p class="column-text">
                <span class="label-text">Time UTC:</span> {displayCardData['time_utc']}
            </p>
            <p class="column-text">
                <span class="label-text">From:</span> {displayCardData['from_call']}
            </p>
            <p class="column-text">
                <span class="label-text">To:</span> {displayCardData['to_call']}
            </p>
            <p class="column-text">
                <span class="label-text">Country:</span> {displayCardData['country']}
            </p>
            <p class="column-text">
                <span class="label-text">US State / Canada Province:</span> {displayCardData['us_canada_region']}
            </p>
            <p class="column-text">
                <span class="label-text">Union Republics, Allied, and Satellite States (USSR) :</span> {displayCardData['ussr_region']}
            </p>
            <p class="column-text">
                <span class="label-text">RST:</span> {displayCardData['rst']}
            </p>
            <p class="column-text">
                <span class="label-text">Frequency:</span> {displayCardData['frequency']} &emsp;&emsp;<span class="label-text">Frequency Band:</span> {displayCardData['frequency_band']}
            </p>
            <p class="column-text">
                <span class="label-text">Mode:</span> {displayCardData['mode']}
            </p>
            <p class="column-text">
                <span class="label-text">Needs Processing:</span> {displayCardData['to_process']}
            </p>
            <p class="column-text" style="max-width: none;">
                <span class="label-text">thumbnail_filename:</span> <br><code style="font-size:smaller">{displayCardData['thumbnail_filename']}</code>
            </p>
            <p class="column-text" style="max-width: none;">
                <span class="label-text">archive_filename:</span> <code style="font-size:smaller">{displayCardData['archive_filename']}</code>
            </p>
            <p class="column-text" style="max-width: none;">
                <span class="label-text">OCR Content:</span> <br><code style="white-space: pre-line">{displayCardData['content']}</code>
            </p>
        </Column>
        <Column>
            <Button
                kind="ghost"
                on:click={() => {
                    document.getElementById("imageThumbnail").style.display="none";
                    document.getElementById("fullDocument").style.display="block";
                    srcFullDoc = srcFullDocHold;
                    document.getElementById("loadFullButton").style.display="none";
                }}
                id="loadFullButton"
            >
                Load full QSL Card
            </Button>
            
            <div style="height: fit-content;" id="imageThumbnail">
                <ImageLoader
                    fadeIn
                    bind:src={srcImageLoader}
                >
                    <svelte:fragment slot="loading">
                        <InlineLoading />
                      </svelte:fragment>
                      <svelte:fragment slot="error">
                        <InlineNotification
                            title="Error:"
                            subtitle="Unable to load thumbnail for QSL Card."
                        />
                      </svelte:fragment>
                </ImageLoader>
            </div>
            <div style="height: fit-content; display:none;" id="fullDocument">
                <object type="application/pdf" data="{srcFullDoc}" title="QSL Card Archive UPN {displayCardData['pk']}" width="800" height="500">
                    <InlineNotification
                        title="Error:"
                        subtitle="Unable to load QSL Card. Please check your browser permissions."
                    />
                </object>
            </div>

            <div style="padding-top: 30px;">
                <p>
                    QSL Card URN {displayCardData['pk']} may be copyright by their creator(s) in their respective countries.
                    Metadata provided may be incorrect, missing, or inaccurate and should not be used to determine copyright.
                </p>
                <br><br>
                <small>
                    <span style="font-weight: 500;">Full resolution - S3 URI (Requestor Pay Fee):</span> <br>
                </small>
                <CodeSnippet
                        code="{sources.s3}/{displayCardData['archive_filename']}"
                    />
                <h3 style="padding-top: 40px;">Reference URN {displayCardData['pk']}</h3>
                <p class="column-text">
                    MLA
                </p>
                <CodeSnippet type="single" 
                    code="So, Hadley, et al. card number/URN {displayCardData['pk']}. QSL Card Archive. 2025. QSL Card Archive of University of Wisconsin-Madison Badger Amateur Radio Society, Collection. https://qsla.hadleyso.com/urn?pk={displayCardData['pk']}. "
                />
                <p class="column-text">
                    CHICAGO
                </p>
                <CodeSnippet type="single" 
                    code='So, Hadley, Skylar Culek, and Nicholas Winer. "QSL Card Archive." Collection, QSL Card Archive of University of Wisconsin-Madison Badger Amateur Radio Society, card number/URN {displayCardData['pk']}. 2025.'
                />
                <p class="column-text">
                    APA
                </p>
                <CodeSnippet type="single" 
                    code="So, H., Culek, S., & Winer, N. (2025). QSL Card Archive [Collection]. QSL Card Archive of University of Wisconsin-Madison Badger Amateur Radio Society. card number/URN {displayCardData['pk']}. https://qsla.hadleyso.com/urn?pk={displayCardData['pk']} "
                />
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
        padding-top: 10px;
        font-size: small;
    }
    .label-text {
        font-weight: 600;
        font-size: medium;
        margin-right: 15px;
    }
</style>