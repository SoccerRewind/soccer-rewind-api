'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">soccer-rewind-api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PlayerCareerModule.html" data-type="entity-link">PlayerCareerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PlayerCareerModule-e7dcf54290c991ea509a1f16c0af7b4d"' : 'data-target="#xs-controllers-links-module-PlayerCareerModule-e7dcf54290c991ea509a1f16c0af7b4d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PlayerCareerModule-e7dcf54290c991ea509a1f16c0af7b4d"' :
                                            'id="xs-controllers-links-module-PlayerCareerModule-e7dcf54290c991ea509a1f16c0af7b4d"' }>
                                            <li class="link">
                                                <a href="controllers/PlayerCareerController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlayerCareerController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PlayerCareerModule-e7dcf54290c991ea509a1f16c0af7b4d"' : 'data-target="#xs-injectables-links-module-PlayerCareerModule-e7dcf54290c991ea509a1f16c0af7b4d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PlayerCareerModule-e7dcf54290c991ea509a1f16c0af7b4d"' :
                                        'id="xs-injectables-links-module-PlayerCareerModule-e7dcf54290c991ea509a1f16c0af7b4d"' }>
                                        <li class="link">
                                            <a href="injectables/PlayerCareerService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PlayerCareerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PlayerModule.html" data-type="entity-link">PlayerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PlayerModule-5d6edf124f3d4120eae916ca2023f995"' : 'data-target="#xs-controllers-links-module-PlayerModule-5d6edf124f3d4120eae916ca2023f995"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PlayerModule-5d6edf124f3d4120eae916ca2023f995"' :
                                            'id="xs-controllers-links-module-PlayerModule-5d6edf124f3d4120eae916ca2023f995"' }>
                                            <li class="link">
                                                <a href="controllers/PlayerController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlayerController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PlayerModule-5d6edf124f3d4120eae916ca2023f995"' : 'data-target="#xs-injectables-links-module-PlayerModule-5d6edf124f3d4120eae916ca2023f995"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PlayerModule-5d6edf124f3d4120eae916ca2023f995"' :
                                        'id="xs-injectables-links-module-PlayerModule-5d6edf124f3d4120eae916ca2023f995"' }>
                                        <li class="link">
                                            <a href="injectables/PlayerService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PlayerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TeamModule.html" data-type="entity-link">TeamModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TeamModule-13cc22c02488223254889ab3bd031e54"' : 'data-target="#xs-controllers-links-module-TeamModule-13cc22c02488223254889ab3bd031e54"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TeamModule-13cc22c02488223254889ab3bd031e54"' :
                                            'id="xs-controllers-links-module-TeamModule-13cc22c02488223254889ab3bd031e54"' }>
                                            <li class="link">
                                                <a href="controllers/TeamController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TeamController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TeamModule-13cc22c02488223254889ab3bd031e54"' : 'data-target="#xs-injectables-links-module-TeamModule-13cc22c02488223254889ab3bd031e54"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TeamModule-13cc22c02488223254889ab3bd031e54"' :
                                        'id="xs-injectables-links-module-TeamModule-13cc22c02488223254889ab3bd031e54"' }>
                                        <li class="link">
                                            <a href="injectables/TeamService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TeamService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/PlayerCareerController.html" data-type="entity-link">PlayerCareerController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PlayerController.html" data-type="entity-link">PlayerController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TeamController.html" data-type="entity-link">TeamController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Base.html" data-type="entity-link">Base</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePlayerCareerDto.html" data-type="entity-link">CreatePlayerCareerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePlayerCareerItemDto.html" data-type="entity-link">CreatePlayerCareerItemDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePlayerDto.html" data-type="entity-link">CreatePlayerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTeamDto.html" data-type="entity-link">CreateTeamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlayerCareerDto.html" data-type="entity-link">PlayerCareerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlayerCareerEntity.html" data-type="entity-link">PlayerCareerEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlayerCareerItemDto.html" data-type="entity-link">PlayerCareerItemDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlayerCareerRepository.html" data-type="entity-link">PlayerCareerRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlayerDto.html" data-type="entity-link">PlayerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlayerEntity.html" data-type="entity-link">PlayerEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlayerRepository.html" data-type="entity-link">PlayerRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/PlayersUtils.html" data-type="entity-link">PlayersUtils</a>
                            </li>
                            <li class="link">
                                <a href="classes/SuccessResponse.html" data-type="entity-link">SuccessResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/TeamDto.html" data-type="entity-link">TeamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TeamEntity.html" data-type="entity-link">TeamEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/TeamRepository.html" data-type="entity-link">TeamRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/TeamsUtils.html" data-type="entity-link">TeamsUtils</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePlayerCareerDto.html" data-type="entity-link">UpdatePlayerCareerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePlayerCareerItemDto.html" data-type="entity-link">UpdatePlayerCareerItemDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePlayerDto.html" data-type="entity-link">UpdatePlayerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTeamDto.html" data-type="entity-link">UpdateTeamDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/IsPlayerExistPipe.html" data-type="entity-link">IsPlayerExistPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IsTeamExistPipe.html" data-type="entity-link">IsTeamExistPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlayerCareerService.html" data-type="entity-link">PlayerCareerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlayerService.html" data-type="entity-link">PlayerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SetPlayerNamePipe.html" data-type="entity-link">SetPlayerNamePipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeamService.html" data-type="entity-link">TeamService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});