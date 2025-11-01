/** @type {import('./$types').PageLoad} */

import countries from '$lib/metadata-config/countries.json';
import mode from '$lib/metadata-config/mode.json';
import bands from '$lib/metadata-config/bands.json';
import us_can_region from '$lib/metadata-config/us-can-region.json';
import usssr_region from '$lib/metadata-config/ussr-region.json';

export function load({ params }) {
	return {
		countries: {
            countries
		},
		mode: {
            mode
		},
        bands: {
            bands
        },
		us_can_region: {
            us_can_region
		},
		ussr_region: {
            usssr_region
		},
	};
}