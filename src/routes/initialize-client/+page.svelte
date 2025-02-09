<script>
    import {
        Button,
        Grid,
        Row,
        Column,
        ComposedModal,
        ProgressBar,
        ModalBody,
        ModalFooter,
        Checkbox,
        InlineNotification,
        InlineLoading
    } from "carbon-components-svelte";
    import { browser } from '$app/environment';
    import {
        goto
    } from '$app/navigation';

    let destinationURL = $state("/");

    let initializeDisclaimerChecked = $state(false);
    let initializeDisclaimerOpen = $state(false);

    let step02ProgressBar = $state("active");
    let step02ProgressBarLabel = $state("Loading...");

    import { initialize, loadData, resetDb } from '$lib/metadata.js'
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import { Package } from "carbon-icons-svelte";


    function disclaimerApproved() {
        // Close modal
        initializeDisclaimerOpen = false;
        initializeDisclaimerChecked = false;

        // Send new promise
        const initializePromise = new Promise((resolve, reject) => {
            try{
                resolve(initialize());
            }
            catch (e) {
                reject(e);
            }
        });

        // Show loading bar
        document.getElementById("step01").style.display = "none";
        document.getElementById("step02").style.display = "block";

        // Handle promise return
        initializePromise.then(
            (value) => {
                // success
                console.log(`IndexedDB initialize() done. Does data need loading: ${value}`)
                if (value) {
                    fireLoadData();
                } else {
                    finishExit();
                }
            },
            (reason) => {
                // failure
                step02ProgressBar="error";
                step02ProgressBarLabel=`Error: ${reason}`

            }
        );
    }

    function fireLoadData() {
        // Send new promise
        const loadDataPromise = new Promise((resolve, reject) => {
            try{
                resolve(loadData());
            }
            catch (e) {
                reject(e);
            }
        });

        // Handle promise return
        loadDataPromise.then(
            (value) => {
                // success
                console.log(`loadData() done.`);
                finishExit();
            },
            (reason) => {
                // failure
                step02ProgressBar="error";
                step02ProgressBarLabel=`Error: Done init db, data load in progress -: ${reason}`;

            }
        );

    }

    function finishExit() {
        step02ProgressBar="finished";
        step02ProgressBarLabel="Initialized";
        if (browser) {
            // Build the expiration date string:
            var expiration_date = new Date();
            expiration_date.setFullYear(expiration_date.getFullYear() + 1);
            document.cookie = "qslArchiveDataSet=true; path=/; expires=" + expiration_date.toUTCString();
        }
        document.getElementById("stepRedirect").style.display = "block";
        setTimeout(() => goto(destinationURL), 5000)

    }



    function checkParams() {
        if (page.url.searchParams.has('origin')) {
            destinationURL = decodeURI(page.url.searchParams.get('origin'));
            console.debug(`New post initialize destination set ${destinationURL}`);
        }

        if (page.url.searchParams.has('reset')) {
            console.debug("/initialize-client?reset requested full IndexedDb reset");

            // Send new promise
            const resetPromise = new Promise((resolve, reject) => {
            try{
                // Reset db
                resetDb();

                // Rest cookie
                document.cookie = 'qslArchiveDataSet=; Max-Age=0';

                // Reset page
                initializeDisclaimerOpen = false;
                initializeDisclaimerChecked = false;
                document.getElementById("step01").style.display = "block";
                document.getElementById("step02").style.display = "none";

                resolve("OK");
            }
            catch (e) {
                reject(e);
            }
        });

        // Handle promise return
        resetPromise.then(
            (value) => {
                // success
                goto("/initialize-client");
                console.log(`resetDb() done.`);
            },
            (reason) => {
                // failure
                step02ProgressBar="error";
                step02ProgressBarLabel=`Error: Unable to reset IndexedDB, trying clearing browser data -  ${reason}`;

            }
        );

        }   
    }


    onMount(() => {
        checkParams();
    });


</script>

<Grid>
    <Row>
        <Column>
            <h1 style="padding-bottom: 40px;">Initialize Client</h1>
        </Column>
    </Row>
    <Row id="step01">
        <Column>
            <p class="column-text">
                The QSL Archive site is a client side application and requires loading 
                <span style="font-weight:600;">2.3 MB</span> of data to your browser.
                It is not recommended to use this site on mobile devices.
            </p>
            <p class="column-text">
                You're currently using about <output id="percent"> </output>% of your
                estimated storage quota (<output id="quota"></output>).
            </p>
            <p class="column-text">
                To begin, click the button below.
            </p>
            <Button kind="tertiary" on:click={() => {initializeDisclaimerOpen = true}} icon={Package}>Load & Initialize</Button>

        </Column>
    </Row>
    <Row id="step02" style="display: none;">
        <Column>
            <ProgressBar bind:helperText={step02ProgressBarLabel} bind:status={step02ProgressBar} />
        </Column>
    </Row>
    <Row id="stepRedirect" style="display:none; margin-top: 20px;">
        <InlineLoading description="Redirecting..." /> 
    </Row>
</Grid>
<span>
    <script>
        navigator.storage.estimate().then((estimate) => {
        document.getElementById("percent").value = (
            (estimate.usage / estimate.quota) *
            100
        ).toFixed(2);
        document.getElementById("quota").value =
            (estimate.quota / 1024 / 1024).toFixed(2) + "MB";
        });

    </script>
</span>

<!--  initialize Disclaimer -->
<ComposedModal bind:open={initializeDisclaimerOpen} on:submit={() => (disclaimerApproved())}>
    <ModalBody hasForm>
        <InlineNotification
            lowContrast
            hideCloseButton
            kind="warning"
            title="Viewer Discretion:"
            subtitle="sensitive content."
            style="margin-bottom: 20px;"
        />
        <p>
            The QSL Archive site may contain imagery and references associated with Nazi Germany. 
            These materials are presented for educational and historical purposes only. 
        </p>
        <p>
            This project, site, and contents are not affiliated with the University of Wisconsin-Madison or the University of Wisconsin system.
        </p>
        <p>
            Viewer discretion is advised. The content within this collection may be disturbing or triggering to some individuals.
            Content may be incorrectly tagged and labeled.
        </p>
        <br>
      <Checkbox labelText="I understand" bind:checked={initializeDisclaimerChecked} />
    </ModalBody>
    <ModalFooter 
        primaryButtonText="Proceed" 
        primaryButtonDisabled={!initializeDisclaimerChecked} 
    />
</ComposedModal>

<style>
    .column-text {
        max-width: 44rem;
        padding-bottom: 20px;
    }
    p {
        padding-bottom: 15px;
    }
</style>