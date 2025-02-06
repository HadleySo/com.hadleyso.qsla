<script>
    import {
        Grid,
        Row,
        Column,
        CodeSnippet,
        OutboundLink
    } from "carbon-components-svelte";
</script>

<Grid>
    <Row>
        <Column>
            <h1 style="padding-bottom: 40px;">Contact</h1>
            <p class="column-text">
                This project, site, and contents are not affiliated with the University of Wisconsin-Madison, 
                the University of Wisconsin system, or the Badger Amateur Radio Society.

                <br><br>
                To contact the Badger Amateur Radio Society please visit their <OutboundLink inline href="https://w9yt.rso.engr.wisc.edu/" target="_blank" style="font-size: inherit;">website</OutboundLink>.
            
                <br><br>
                Email: <CodeSnippet type="inline" code="info@qsla.hadleyso.com" />
            </p>
        </Column>
    </Row>
    <Row>
        <Column>


        </Column>
    </Row>
</Grid> 

<style>
    .column-text {
        max-width: 44rem;
        padding-bottom: 20px;
    }
</style>