<svelte:head>
</svelte:head>

<script>
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
        Link,
        SideNav,
        SideNavItems,
        SideNavMenuItem,
        TooltipIcon,
    } from "carbon-components-svelte";

    import { expoIn } from "svelte/easing";
    import { Launch } from "carbon-icons-svelte";

    let theme = $state("g90");
    $effect(() => {
		document.documentElement.setAttribute("theme", theme);
	});

    let isSideNavOpen = $state(true);
    let isOpen = $state(false);
    let { children } = $props();
</script>

<Header company="[Hadley So]" platformName="QSL Card Archive" bind:isSideNavOpen={isSideNavOpen} expandedByDefault={false}>
    <svelte:fragment slot="skip-to-content">
      <SkipToContent />
    </svelte:fragment>
    <HeaderNav>
        <HeaderNavItem href="/" text="/" />
        <HeaderNavItem href="/search" text="Metadata Search" />
        <HeaderNavItem href="/urn" text="Retrieve URN" />
        <HeaderNavItem href="/tags" text="Tags" />
    </HeaderNav>

    <HeaderUtilities>

        <HeaderAction bind:isOpen transition={{duration: 600, delay: 50, easing: expoIn}}>
            <div style="overflow-y: scroll; height: 100%;">
                <HeaderPanelLinks>
                    <HeaderPanelDivider>About the Project</HeaderPanelDivider>
                    <HeaderPanelLink><Link href="/about">The Project</Link></HeaderPanelLink>
                    <HeaderPanelLink><Link href="https://hadleyso.com/gxr/2024/qsl-cards.html" target="_blank">How it started &emsp13;<TooltipIcon tooltipText="Open external link."icon={Launch}/></Link></HeaderPanelLink>
                    <HeaderPanelLink><Link href="https://w9yt.rso.engr.wisc.edu/" target="_blank">UW Madison BARS  &emsp13;<TooltipIcon tooltipText="Open external link."icon={Launch}/></Link></HeaderPanelLink>
                    <HeaderPanelLink><Link href="/contact">Contact</Link></HeaderPanelLink>
                    <HeaderPanelDivider>Contribute</HeaderPanelDivider>
                    <HeaderPanelLink><Link href="/metadata-contribute">Metadata</Link></HeaderPanelLink>
                    <HeaderPanelLink><Link href="https://github.com/HadleySo/com.hadleyso.qsla">GitHub &emsp13;<TooltipIcon tooltipText="Open external link."icon={Launch}/></Link></HeaderPanelLink>
                    <HeaderPanelDivider>Credit</HeaderPanelDivider>
                    <HeaderPanelLink><Link href="https://hadleyso.com/" target="_blank">Hadley So &emsp13;<TooltipIcon tooltipText="Open external link."icon={Launch}/></Link></HeaderPanelLink>
                    <HeaderPanelLink><Link href="https://w9yt.rso.engr.wisc.edu/" target="_blank">UW Madison BARS &emsp13;<TooltipIcon tooltipText="Open external link."icon={Launch}/></Link></HeaderPanelLink>
                    <HeaderPanelLink><Link href="/cite">Cite this project</Link></HeaderPanelLink>
                    <HeaderPanelDivider>Debug</HeaderPanelDivider>
                    <HeaderPanelLink><Link href="/initialize-client?reset">Reset IndexedDB</Link></HeaderPanelLink>
                    <HeaderPanelDivider>Copyright</HeaderPanelDivider>
                    <div class="panel-footer">
                        Copyright © 2024-2025 <a href="https://hadleyso.com/" style="text-decoration: none; color: inherit;">Hadley So</a> or affiliates. All rights reserved. <br><br>
                        QSL Cards are presented for nonprofit, educational, and commentary purposes. QSL Cards may be copyright by their creator(s) in their respective countries. <br><br>
                        Attribution to University of Wisconsin-Madison Badger Amateur Radio Society. <br><br>
                        This project, site, and contents are not affiliated with the University of Wisconsin-Madison, the University of Wisconsin system, or the Badger Amateur Radio Society.
                    </div>
                    
                </HeaderPanelLinks>
            </div>
        </HeaderAction>
    </HeaderUtilities>
</Header>
<SideNav bind:isOpen={isSideNavOpen}>
    <SideNavItems>
        <SideNavMenuItem href="/" text="Home" on:click={() => {isSideNavOpen=false}} />
        <SideNavMenuItem href="/search" text="Metadata Search" on:click={() => {isSideNavOpen=false}} />
        <SideNavMenuItem href="/urn" text="Retrieve URN" on:click={() => {isSideNavOpen=false}} />
        <SideNavMenuItem href="/tags" text="Tags" on:click={() => {isSideNavOpen=false}} />
    </SideNavItems>
  </SideNav>

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




