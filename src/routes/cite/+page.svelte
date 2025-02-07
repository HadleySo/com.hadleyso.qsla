<script>
    import {
        Grid,
        Row,
        Column,
        CodeSnippet,
        OutboundLink,
    } from "carbon-components-svelte";
</script>

<Grid>
    <Row>
        <Column>
            <h1 style="padding-bottom: 40px;">Cite</h1>
            <p class="column-text">
                MLA
                <CodeSnippet type="single" 
                    code="So, Hadley, et al. QSL Card Archive. 2025. QSL Card Archive of University of Wisconsin-Madison Badger Amateur Radio Society, Collection. https://qsla.hadleyso.com. "
                />
            </p>
            <p class="column-text">
                CHICAGO
                <CodeSnippet type="single" 
                    code='So, Hadley, Skylar Culek, and Nicholas Winer. "QSL Card Archive." Collection, QSL Card Archive of University of Wisconsin-Madison Badger Amateur Radio Society, 2025.'
                />
            </p>
            <p class="column-text">
                APA
                <CodeSnippet type="single" 
                    code="So, H., Culek, S., & Winer, N. (2025). QSL Card Archive [Collection]. QSL Card Archive of University of Wisconsin-Madison Badger Amateur Radio Society. https://qsla.hadleyso.com "
                />
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
        /* max-width: 44rem; */
        padding-bottom: 20px;
    }
</style>