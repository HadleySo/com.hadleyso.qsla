<svelte:head>
    <title>Cite | QSL Card Archive | Hadley So</title>
</svelte:head>
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
            <h1 style="padding-bottom: 20px;">Cite</h1>
            <p class="column-text">
                MLA
            </p>
            <CodeSnippet type="single" 
                code="So, Hadley, et al. QSL Card Archive. 2025. QSL Card Archive of University of Wisconsin-Madison Badger Amateur Radio Society, Collection. https://qsla.hadleyso.com. "
            />
            <p class="column-text">
                CHICAGO
            </p>
            <CodeSnippet type="single" 
                code='So, Hadley, Skylar Culek, and Nicholas Winer. "QSL Card Archive." Collection, QSL Card Archive of University of Wisconsin-Madison Badger Amateur Radio Society, 2025.'
            />

            <p class="column-text">
                APA
            </p>
            <CodeSnippet type="single" 
                code="So, H., Culek, S., & Winer, N. (2025). QSL Card Archive [Collection]. QSL Card Archive of University of Wisconsin-Madison Badger Amateur Radio Society. https://qsla.hadleyso.com "
            />


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
        padding-bottom: 10px;
        padding-top: 50px;

    }
</style>