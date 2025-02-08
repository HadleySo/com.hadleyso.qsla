<script>
    import { Grid, Row, Column, CodeSnippet } from "carbon-components-svelte";
</script>

<Grid>
    <Row>
        <Column>
            <h1 style="padding-bottom: 40px;">About the Project</h1>
            <p class="column-text">
                The QSL Card Archive is part of a project to archive and
                preserve the 60+ years of QSL cards received by UW-Madison's
                Badger Amateur Radio Society from around the world. This
                repository and qsla.HadleySo.com is a way to make the collection
                searchable.
                <br /><br />
                There are cards from at the 1950s and possibly earlier, and from
                countries that no longer exist.
            </p>
            <h2>How Cards are Processed</h2>
            <p class="column-text">
                Cards are fed though a duplex scanner, either a slower manual
                feed scanner for fragile cards, or a high speed batch scanner.
                Once scanned they are uploaded and metadata can be entered
                manually. We use Paperless-ngx for metadata entry. 
            </p>
            <p class="column-text">
                Every so often an export is run where all thumbnails are saved
                and data is exported to JSON. The JSON is reformatted and images
                and JSON files are uploaded. Since the process is manual, there
                is a delay between scanning in cards and their availability
                online.
            </p>
            <h2>Progress</h2>
            <p class="column-text">
                As of February 2025 we scanned in about 3,900 cards, and of
                those cards about 200 with keyed in metadata. There is an
                estimated 21,450 cards in the collection.
            </p>
            <h2>Access to Full Resolution</h2>
            <p class="column-text">
                Cards on the website are shown in lower resolution (because data
                egress fees add up). The full set of high resolution scans is
                available though an S3 bucket, the bucket is requestor pays so
                an AWS account is required.
            </p>
            <CodeSnippet
                type="single"
                code="s3://bars-qsl-requestor-p-tetirxjdzxfqwsggmro5en3nmjyfouse2b-s3alias"
            />
        </Column>
    </Row>
    <Row>
        <Column></Column>
    </Row>
</Grid>

<style>
    .column-text {
        max-width: 44rem;
        padding-bottom: 20px;
    }
</style>
