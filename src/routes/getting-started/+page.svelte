<script>
    import {
        Button,
        Grid,
        Row,
        Column,
        StructuredListSkeleton,
        StructuredList,
        StructuredListHead,
        StructuredListRow,
        StructuredListCell,
        StructuredListBody,
    } from "carbon-components-svelte";
    import { goto } from "$app/navigation";
</script>

<Grid>
    <Row>
        <Column>
            <h1 style="padding-bottom: 40px;">Getting Started</h1>
            <p class="column-text" style="font-size: 20px; font-weight: 400;">
                Search by specific metadata or get a card by its URN. Those
                options are always available at the top menu.
            </p>
            <p class="column-text">
                The easiest way to start is to look at tags and explore cards with interesting tags.
            </p>
            <Button
                kind="primary"
                on:click={() => {
                    goto("/tags");
                }}>Explore Tags</Button
            >
            <Button
                kind="secondary"
                on:click={() => {
                    goto("/search");
                }}>Metadata Search</Button
            >
        </Column>
    </Row>
    <Row>
        <Column style="padding-top: 40px;">
            <h3>Searchable metadata:</h3>
            <!-- <StructuredListSkeleton rows={3} /> -->
        </Column>
    </Row>
    <Row>
        <Column style="padding-top: 40px;">
            <StructuredList>
                <StructuredListHead>
                    <StructuredListRow head>
                        <StructuredListCell head>Name</StructuredListCell>
                        <StructuredListCell head>Type</StructuredListCell>
                        <StructuredListCell head>Description</StructuredListCell
                        >
                    </StructuredListRow>
                </StructuredListHead>
                <StructuredListBody>
                    <StructuredListRow>
                        <StructuredListCell noWrap>From Call Sign</StructuredListCell>
                        <StructuredListCell>String</StructuredListCell>
                        <StructuredListCell>
                            The HAM Radio call sign of the individual or
                            organization sending the QSL card.
                        </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                        <StructuredListCell noWrap>To Call Sign</StructuredListCell>
                        <StructuredListCell>String</StructuredListCell>
                        <StructuredListCell>
                            The HAM Radio call sign of the individual or
                            organization receiving the QSL card. May be empty if
                            the QSL card was not sent but was added to the
                            collection.
                        </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                        <StructuredListCell noWrap>Frequency</StructuredListCell>
                        <StructuredListCell>Float</StructuredListCell>
                        <StructuredListCell>
                            Frequency listed on QSL card. Must be an exact match
                            to appear in results. Does not show in table of
                            results. Units are dependant on time period of the
                            card, older cards are in megacycles while
                            contemporary cards are in megahertz.
                        </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                        <StructuredListCell noWrap>RST</StructuredListCell>
                        <StructuredListCell>Integer</StructuredListCell>
                        <StructuredListCell>
                            RST given on QSL card. Must be an exact match
                            to appear in results. Does not show in table of
                            results. Format dependant on time period and mode.
                        </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                        <StructuredListCell noWrap>Date of Contact</StructuredListCell>
                        <StructuredListCell>Date</StructuredListCell>
                        <StructuredListCell>
                            Date of contact listed on QSL card. May be blank if 
                            date is illegible or if card was not sent but was added to the
                            collection. Range is inclusive.
                        </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                        <StructuredListCell noWrap>Countries (Current and Former)</StructuredListCell>
                        <StructuredListCell>Multiselect</StructuredListCell>
                        <StructuredListCell>
                            Country of operator. Lists all countries that existed that could have
                            had HAM radio operators.
                        </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                        <StructuredListCell noWrap>US States / Canadian Provinces</StructuredListCell>
                        <StructuredListCell>Multiselect</StructuredListCell>
                        <StructuredListCell>
                            US State of operator or Canadian Province of operator. Selecting one or more will
                            limit results to QSL cards from the United States and/or Canada.
                        </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                        <StructuredListCell noWrap>Mode</StructuredListCell>
                        <StructuredListCell>Multiselect</StructuredListCell>
                        <StructuredListCell>
                            Mode of QSO given on the QSL card. May be blank if not specified on QSL card.
                        </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                        <StructuredListCell noWrap>Union Republics, Allied, and Satellite States (USSR) </StructuredListCell>
                        <StructuredListCell>Multiselect</StructuredListCell>
                        <StructuredListCell>
                            For QSL Cards from the USSR, attempts to specify which republic. Selecting one or more will
                            limit results to QSL cards from the Union of Soviet Socialist Republics.
                        </StructuredListCell>
                    </StructuredListRow>
                </StructuredListBody>
            </StructuredList>
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
