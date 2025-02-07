<svelte:head>
    <link rel="icon" type="image/x-icon" href="https://static.hadleyso.com/favicon/favicon.ico">
    <title>QSL Card Archive | qsla.hadleyso.com | Hadley So</title>
    <meta name="title" content="QSL Card Archive | qsla.hadleyso.com | Hadley So" />
    <meta name="description" content="QSL cards from UW-Madison Badger Amateur Radio Society" />
    <meta name="author" content="Hadley So">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://qsla.hadleyso.com/" />
    <meta property="og:title" content="QSL Card Archive | qsla.hadleyso.com | Hadley So" />
    <meta property="og:description" content="QSL cards from UW-Madison Badger Amateur Radio Society" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://qsla.hadleyso.com//" />
    <meta property="twitter:title" content="QSL Card Archive | qsla.hadleyso.com | Hadley So" />
    <meta property="twitter:description" content="QSL cards from UW-Madison Badger Amateur Radio Society" />

</svelte:head>

<script>
    // This can be false if you're using a fallback (i.e. SPA mode)
    export const prerender = true;
    export const trailingSlash = 'always';
    export const ssr = false;

    import "carbon-components-svelte/css/all.css";
    import {
        Content,
        Header,
        HeaderNav,
        HeaderNavItem,
        SkipToContent,
        HeaderUtilities,
        HeaderAction,
        HeaderPanelLinks,
        HeaderPanelLink,
        HeaderPanelDivider,
        Link
    } from "carbon-components-svelte";

    import { expoIn } from "svelte/easing";

    let theme = $state("g90");
    $effect(() => {
		document.documentElement.setAttribute("theme", theme);
	});

    let isSideNavOpen = $state(false);
    let isOpen = $state(false);
    let { children } = $props();
</script>

<Header company="[Hadley So]" platformName="QSL Card Archive" bind:isSideNavOpen>
    <svelte:fragment slot="skip-to-content">
      <SkipToContent />
    </svelte:fragment>
    <HeaderNav>
        <HeaderNavItem href="/" text="/" />
        <HeaderNavItem href="/search" text="Metadata Search" />
        <HeaderNavItem href="/urn" text="Card ID Reference" />
    </HeaderNav>

    <HeaderUtilities>

        <HeaderAction bind:isOpen transition={{duration: 600, delay: 50, easing: expoIn}}>
            <HeaderPanelLinks>
                <HeaderPanelDivider>About the Project</HeaderPanelDivider>
                <HeaderPanelLink><Link href="https://hadleyso.com/gxr/2024/qsl-cards.html" target="_blank">How it started</Link></HeaderPanelLink>
                <HeaderPanelLink><Link href="https://w9yt.rso.engr.wisc.edu/" target="_blank">UW Madison BARS</Link></HeaderPanelLink>
                <HeaderPanelLink><Link href="/contact">Contact</Link></HeaderPanelLink>
                <HeaderPanelDivider>Contribute</HeaderPanelDivider>
                <HeaderPanelLink><Link href="/metadata-contribute">Metadata</Link></HeaderPanelLink>
                <HeaderPanelLink><Link href="https://github.com/HadleySo/com.hadleyso.qsla">GitHub</Link></HeaderPanelLink>
                <HeaderPanelLink><Link href="https://buymeacoffee.com/hadleyso" target="_blank">Donate</Link></HeaderPanelLink>
                <HeaderPanelDivider>Credit</HeaderPanelDivider>
                <HeaderPanelLink><Link href="https://hadleyso.com/" target="_blank">Hadley So</Link></HeaderPanelLink>
                <HeaderPanelLink><Link href="https://w9yt.rso.engr.wisc.edu/" target="_blank">UW Madison BARS</Link></HeaderPanelLink>
                <HeaderPanelLink><Link href="/cite">Cite this project</Link></HeaderPanelLink>
                <HeaderPanelDivider>Debug</HeaderPanelDivider>
                <HeaderPanelLink><Link href="/initialize-client?reset">Reset IndexedDB</Link></HeaderPanelLink>
                <HeaderPanelDivider>Copyright</HeaderPanelDivider>
                <div class="panel-footer">
                    Copyright © 2024-2025 <a href="https://hadleyso.com/" style="text-decoration: none; color: inherit;">Hadley So</a> or affiliates. All rights reserved. <br><br>
                    Attribution to University of Wisconsin-Madison Badger Amateur Radio Society. <br><br>
                    This project, site, and contents are not affiliated with the University of Wisconsin-Madison, the University of Wisconsin system, or the Badger Amateur Radio Society.
                </div>
                
            </HeaderPanelLinks>
        </HeaderAction>
    </HeaderUtilities>
</Header>

<style>
    .panel-footer {
        padding: 16px;
        font-size: 12px;
        line-height: normal;
    }
</style>

<Content>
    {@render children()}
</Content>




