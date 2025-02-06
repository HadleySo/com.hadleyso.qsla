<script>
    import {
        Button,
        Grid,
        Row,
        Column,
        Tabs, Tab, TabContent,
        ButtonSet
    } from "carbon-components-svelte";
    import {
        goto
    } from '$app/navigation';
</script>

<Grid>
    <Row>
        <Column>
            <h1 style="padding-bottom: 40px;">QSL Card Archive</h1>
            <p class="column-text" style="font-size: 20px; font-weight: 400;">
                The QSL Card Archive is one of my side projects, archiving and preserving the 60+ years of QSL cards
                recived by UW-Madison's Badger Amateur Radio Society from around the world.
            </p>
            <p class="column-text">
                This is a self funded project, if you would like to donate financially or with your time, please 
                reach out, it would be much appreciated.
            </p>
            <p class="column-text">
                To learn more about this project, click the menu button in the top right corner.
            </p>
        </Column>
    </Row>
    <Row>
        <Column style="padding-top: 60px;">     
            <ButtonSet>
                <Button kind="primary" on:click={() => {goto("/search")}}>Search</Button>
                <Button kind="secondary" on:click={() => {goto("/getting-started")}}>Explore QSL Cards</Button>
                <Button kind="secondary" on:click={() => {goto("/contact")}}>Contact</Button>
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
                        <Button kind="tertiary" on:click={() => window.location.href = 'https://w9yt.rso.engr.wisc.edu/'}>BARS Website</Button>
                    </TabContent>
                    <TabContent>
                        <p class="column-text">
                            Visit our getting started page for metatdata:
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