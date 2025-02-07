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
        InlineLoading
    } from "carbon-components-svelte";
    import {
        goto
    } from '$app/navigation';
    import { browser } from '$app/environment';

	let { data } = $props();

    import { searchFormWrap } from '$lib/search.js'
    import { getCookie } from "$lib/cookie.js";

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
            setTimeout(() => goto("/initialize-client"), 5000)
        }
    }

</script>

<Grid>
    <Row>
        <Column>
            <h1 style="padding-bottom: 40px;">Search</h1>
        </Column>
    </Row>
    <Row>
        <Column>
            <Form
                method="POST"
                onsubmit={(e) => {
                    e.preventDefault();
                    searchFormWrap(from_call, to_call, frequency, rst, freeContent, country, mode, us_canada_region, ussr_region, date_utc_start, date_utc_end);
                }}
              >
                <Row>
                    <Column>
                        <TextInput style="margin-bottom:40px;" labelText="From Call Sign" placeholder="Call sign..." id="from_call" name="from_call" bind:value={from_call}></TextInput>
                        <TextInput style="margin-bottom:40px;" labelText="To Call Sign" placeholder="Call sign..." id="to_call" name="to_call" bind:value={to_call}></TextInput>       
                        <br style="margin-top: 40px;">
                        
                        <TextInput style="margin-bottom:40px;" labelText="Contents" placeholder="73s from..." id="freeContent" name="freeContent" bind:value={freeContent}></TextInput>
 
                    </Column>

                    <Column>
                        <TextInput style="margin-bottom:40px;" labelText="Frequency" placeholder="Frequency..." id="frequency" name="frequency" bind:value={frequency}></TextInput>
                        <TextInput style="margin-bottom:40px;" labelText="RST" placeholder="RST..." id="rst" name="rst" bind:value={rst}></TextInput>

                        
                        <FormGroup legendText="Date of Contact - Range" style="margin-top: 30px;">
                            <DatePicker datePickerType="range" on:change bind:valueFrom={date_utc_start} bind:valueTo={date_utc_end}>
                                <DatePickerInput labelText="Start" placeholder="mm/dd/yyyy" id="date_utc_start" name="date_utc_start" />
                                <DatePickerInput labelText="End" placeholder="mm/dd/yyyy" id="date_utc_end" name="date_utc_end" />
                            </DatePicker>
                        </FormGroup>
        
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

                <Button type="submit">Submit</Button>
            </Form>
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

</style>
