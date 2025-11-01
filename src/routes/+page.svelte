<svelte:head>
    <title>QSL Card Archive | Hadley So</title>
</svelte:head>
<script>
    import {
        Button,
        Grid,
        Row,
        Column,
        Tabs, 
        Tab, 
        TabContent,
        ButtonSet,
        Tooltip,
    } from "carbon-components-svelte";
    import {
        goto
    } from '$app/navigation';
    import { SearchAdvanced, NotebookReference, Launch, DocumentMultiple_01} from "carbon-icons-svelte";
</script>

<Grid>
    <Row>
        <Column>
            <h1 style="padding-bottom: 40px;">QSL Card Archive</h1>
            <p class="column-text" style="font-size: 20px; font-weight: 400;">
                The QSL Card Archive is a project archiving, preserving, and documenting the 17,000 plus 
                 QSL cards received by UW-Madison's Badger Amateur Radio Society over the past 60
                 years from around the world.
            </p>
            <p class="column-text">
                To learn more about this project or to contribute, open the menu in the top right.
            </p>
        </Column>
    </Row>
    <Row>
        <Column style="padding-top: 60px;">     
            <ButtonSet>
                <Button kind="primary" on:click={() => {goto("/all-cards")}} icon={DocumentMultiple_01}>View All Cards</Button>
                <Button kind="secondary" on:click={() => {goto("/search")}} icon={SearchAdvanced}>Search</Button>
                <!-- <Button kind="secondary" on:click={() => {goto("/getting-started")}}>Explore QSL Cards</Button> -->
                <Button kind="secondary" on:click={() => {goto("/cite")}} icon={NotebookReference}>Credit / Cite this</Button>
            </ButtonSet>


        </Column>
    </Row>
    <Row>
        <Column style="padding-top: 40px;">
            <Tabs autoWidth>
                <Tab label="What are QSL Cards?" />
                <Tab label="Who is the Badger Amateur Radio Society?" />
                <Tab label="What Metadata is Avalible?" />
                <svelte:fragment slot="content">
                    <TabContent>
                        <Tooltip triggerText="Wikipedia contributors" align="start">
                            <p>
                                Wikipedia contributors. (2024, May 11). QSL card. In Wikipedia, The Free Encyclopedia. Retrieved February 2025, from https://en.wikipedia.org/w/index.php?title=QSL_card&oldid=1223324139 
                            </p>
                        </Tooltip>
                        <p class="column-text">
                            Amateur radio operators exchange QSL cards to confirm two-way radio contact between stations. 
                            Each card contains details about one or more contacts, the station and its operator.<br>
                        </p>
                        <p class="column-text">
                            QSL card derived its name from the Q code "QSL".  In this case, 'QSL' (without a question mark) means 
                            "I confirm receipt of your transmission."
                        </p>
                    </TabContent>
                    <TabContent>
                        <p class="column-text">
                            The Badger Amateur Radio Society - W9YT - is the amateur radio club at the University of Wisconsin-Madison.  
                            The FCC-issued callsign, W9YT, now held by the Badger Amateur Radio Society (aka BARS) has been in use at the 
                            University of Wisconsin-Madison since 1930.
                        </p>
                        <Button kind="tertiary" on:click={() => window.location.href = 'https://w9yt.rso.engr.wisc.edu/'} icon={Launch}>BARS Website</Button>
                    </TabContent>
                    <TabContent>
                        <p class="column-text">
                            Visit our info page for metatdata:
                        </p>
                        <Button kind="tertiary"><a href="/getting-started" class="nested-link">Metadata Info</a></Button>
                    </TabContent>
                </svelte:fragment>
            </Tabs>

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