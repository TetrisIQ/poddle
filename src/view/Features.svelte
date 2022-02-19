<script lang="ts">
    import {gun} from "../gun";
    import dayjs from "dayjs";
    import RelativeTime from "dayjs/plugin/relativeTime"

    dayjs.extend(RelativeTime)

    let pollCounter = -1;
    let gitStars = -1;
    let lastUpdate = dayjs();
    gun.getPollCounter().then(res => pollCounter = res)

    // Fetch github API
    fetch("https://api.github.com/repos/tetrisiq/poll-dapp", {method: 'GET', redirect: 'follow'})
        .then(response => response.json())
        .then(result => {
            gitStars = result.stargazers_count;
            lastUpdate = dayjs(result.pushed_at);
        })
        .catch(error => console.log('error', error));

</script>


<section class="dark:text-gray-400 dark:bg-gray-900 text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
        <h1 class="sm:text-3xl text-2xl font-medium title-font text-center dark:text-white text-gray-900 mb-20">
            Poll-dApp has some awesome features and options
            <br class="hidden sm:block"> everything you need to create the perfect poll
        </h1>
        <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">

            <div class="p-4 md:w-1/3 flex">
                <div class="w-12 h-12 inline-flex items-center justify-center rounded-full dark:bg-gray-800 dark:text-indigo-400 bg-indigo-100 text-indigo-500 mb-4 flex-shrink-0">
                    <svg class="w-6 h-6" viewBox="0 0 87 56" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.14062 30.3594V30.125C3.14062 26.7188 3.52344 23.6406 4.28906 20.8906C5.05469 18.125 6.03125 15.7031 7.21875 13.625C8.40625 11.5469 9.65625 9.82812 10.9688 8.46875C12.2812 7.09375 13.4922 6.10156 14.6016 5.49219L15.5156 8.35156C14.5938 9.05469 13.6562 10.0234 12.7031 11.2578C11.7656 12.4922 10.8984 14.0078 10.1016 15.8047C9.32031 17.6016 8.6875 19.6875 8.20312 22.0625C7.71875 24.4375 7.47656 27.1094 7.47656 30.0781V30.4062C7.47656 33.375 7.71875 36.0547 8.20312 38.4453C8.6875 40.8203 9.32031 42.9141 10.1016 44.7266C10.8984 46.5391 11.7656 48.0781 12.7031 49.3438C13.6562 50.625 14.5938 51.6406 15.5156 52.3906L14.6016 55.0156C13.4922 54.4062 12.2812 53.4141 10.9688 52.0391C9.65625 50.6797 8.40625 48.9609 7.21875 46.8828C6.03125 44.8203 5.05469 42.4062 4.28906 39.6406C3.52344 36.875 3.14062 33.7812 3.14062 30.3594Z"/>
                        <path d="M83.2891 30.125V30.3594C83.2891 33.7812 82.9062 36.875 82.1406 39.6406C81.375 42.4062 80.3984 44.8203 79.2109 46.8828C78.0234 48.9609 76.7734 50.6797 75.4609 52.0391C74.1484 53.4141 72.9375 54.4062 71.8281 55.0156L70.9141 52.3906C71.8359 51.6875 72.7656 50.7031 73.7031 49.4375C74.6406 48.1875 75.5078 46.6406 76.3047 44.7969C77.1016 42.9688 77.7422 40.8594 78.2266 38.4688C78.7109 36.0625 78.9531 33.375 78.9531 30.4062V30.0781C78.9531 27.1094 78.6953 24.4297 78.1797 22.0391C77.6641 19.6328 76.9922 17.5156 76.1641 15.6875C75.3516 13.8594 74.4766 12.3203 73.5391 11.0703C72.6172 9.80469 71.7422 8.82812 70.9141 8.14062L71.8281 5.49219C72.9375 6.10156 74.1484 7.09375 75.4609 8.46875C76.7734 9.82812 78.0234 11.5469 79.2109 13.625C80.3984 15.7031 81.375 18.125 82.1406 20.8906C82.9062 23.6406 83.2891 26.7188 83.2891 30.125Z"/>
                        <path d="M64.7934 9.13856C65.1284 8.77808 65.5283 8.4917 65.9696 8.2962C66.4109 8.1007 66.8847 8 67.3633 8C67.842 8 68.3158 8.1007 68.7571 8.2962C69.1984 8.4917 69.5983 8.77808 69.9333 9.13856C71.3373 10.6347 71.357 13.0522 69.9824 14.5742L40.9544 50.7603C40.6248 51.142 40.2248 51.4487 39.779 51.6617C39.3331 51.8748 38.8508 51.9896 38.3614 51.9993C37.872 52.009 37.3858 51.9133 36.9327 51.7181C36.4796 51.5228 36.069 51.2322 35.7261 50.8638L18.0628 31.9891C17.3816 31.2565 17 30.2714 17 29.2454C17 28.2194 17.3816 27.2343 18.0628 26.5017C18.3978 26.1412 18.7977 25.8548 19.239 25.6593C19.6803 25.4638 20.1541 25.3631 20.6328 25.3631C21.1114 25.3631 21.5853 25.4638 22.0265 25.6593C22.4678 25.8548 22.8677 26.1412 23.2027 26.5017L38.1856 42.5136L64.6952 9.25245C64.7257 9.21244 64.7585 9.17441 64.7934 9.13856Z"/>
                    </svg>
                </div>
                <div class="flex-grow pl-6">
                    <h2 class="dark:text-white text-gray-900 text-lg title-font font-medium mb-2">Yes, No, If needed
                        be</h2>
                    <p class="leading-relaxed text-base">You can choose between three options. Yes this option is okay
                        for me. No this is not acceptable. And if needed be.</p>
                    <!-- <a class="mt-3 dark:text-indigo-400 text-indigo-500 inline-flex items-center">Learn More
                         <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                             <path d="M5 12h14M12 5l7 7-7 7"></path>
                         </svg>
                     </a>-->
                </div>
            </div>

            <div class="p-4 md:w-1/3 flex">
                <div class="w-12 h-12 inline-flex items-center justify-center rounded-full dark:bg-gray-800 dark:text-indigo-400 bg-indigo-100 text-indigo-500 mb-4 flex-shrink-0">
                    <svg stroke="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6"
                         height="16"
                         fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"/>
                    </svg>
                </div>
                <div class="flex-grow pl-6">
                    <h2 class="dark:text-white text-gray-900 text-lg title-font font-medium mb-2">Set deadlines</h2>
                    <p class="leading-relaxed text-base">After the deadline is reached. Your Poll cannot be edited.
                        Comments are still possible. But the answers are locked.</p>
                    <!--<a class="mt-3 dark:text-indigo-400 text-indigo-500 inline-flex items-center">Learn More
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </a>-->
                </div>
            </div>
            <div class="p-4 md:w-1/3 flex">
                <div class="w-12 h-12 inline-flex items-center justify-center rounded-full dark:bg-gray-800 dark:text-indigo-400 bg-indigo-100 text-indigo-500 mb-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-6 h-6"
                         viewBox="0 0 16 16">
                        <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"/>
                    </svg>
                </div>
                <div class="flex-grow pl-6">
                    <h2 class="dark:text-white text-gray-900 text-lg title-font font-medium mb-2">Add Comments</h2>
                    <p class="leading-relaxed text-base">You can add Anonymous comments to the Poll and discuss about
                        the answers and topics.</p>
                    <!--<a class="mt-3 dark:text-indigo-400 text-indigo-500 inline-flex items-center">Learn More
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </a>-->
                </div>
            </div>
            <div class="p-4 md:w-1/3 flex">
                <div class="w-12 h-12 inline-flex items-center justify-center rounded-full dark:bg-gray-800 dark:text-indigo-400 bg-indigo-100 text-indigo-500 mb-4 flex-shrink-0">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                         stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <div class="flex-grow pl-6">
                    <h2 class="dark:text-white text-gray-900 text-lg title-font font-medium mb-2">Vote limits</h2>
                    <p class="leading-relaxed text-base">Limit the number of votes a participant has.</p>
                    <!--<a class="mt-3 dark:text-indigo-400 text-indigo-500 inline-flex items-center">Learn More
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </a>-->
                </div>
            </div>
            <div class="p-4 md:w-1/3 flex">
                <div class="w-12 h-12 inline-flex items-center justify-center rounded-full dark:bg-gray-800 dark:text-indigo-400 bg-indigo-100 text-indigo-500 mb-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-6 h-6"
                         viewBox="0 0 16 16">
                        <path d="M8 5a1 1 0 0 1 1 1v1H7V6a1 1 0 0 1 1-1zm2 2.076V6a2 2 0 1 0-4 0v1.076c-.54.166-1 .597-1 1.224v2.4c0 .816.781 1.3 1.5 1.3h3c.719 0 1.5-.484 1.5-1.3V8.3c0-.627-.46-1.058-1-1.224z"/>
                        <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
                    </svg>
                </div>
                <div class="flex-grow pl-6">
                    <h2 class="dark:text-white text-gray-900 text-lg title-font font-medium mb-2">Private answers</h2>
                    <p class="leading-relaxed text-base">If want only the creator will see the answer. Participants
                        cannot see the answers of others.</p>
                    <!--<a class="mt-3 dark:text-indigo-400 text-indigo-500 inline-flex items-center">Learn More
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </a>-->
                </div>
            </div>
            <div class="p-4 md:w-1/3 flex">
                <div class="w-12 h-12 inline-flex items-center justify-center rounded-full dark:bg-gray-800 dark:text-indigo-400 bg-indigo-100 text-indigo-500 mb-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-6 h-6"
                         viewBox="0 0 16 16">
                        <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z"/>
                    </svg>
                </div>
                <div class="flex-grow pl-6">
                    <h2 class="dark:text-white text-gray-900 text-lg title-font font-medium mb-2">First come, first
                        served</h2>
                    <p class="leading-relaxed text-base">Your participants can only vote for one option. No other
                        participant can vote for these option anymore.</p>
                    <!--<a class="mt-3 dark:text-indigo-400 text-indigo-500 inline-flex items-center">Learn More
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </a>-->
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Statistics -->
<section class="dark:text-gray-400 dark:bg-gray-900 text-gray-600 body-font">
    <div class="container px-5 py-8 mx-auto">
        <div class="flex flex-col text-center w-full mb-5">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 dark:text-white">Statistics</h1>
        </div>
        <div class="flex flex-wrap -m-3 text-center justify-center">
            <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div class="border-2 dark:border-gray-800 border-gray-200 px-4 py-6 rounded-lg"
                     on:click={() => window.open("https://github.com/tetrisiq/poll-dapp","_blank")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="dark:text-indigo-400 text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                    </svg>
                    <h2 class="title-font font-medium text-3xl dark:text-white text-gray-900">{gitStars}</h2>
                    <p class="leading-relaxed">GitHub Stars</p>
                </div>
            </div>
            <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div class="border-2 dark:border-gray-800 border-gray-200 px-4 py-6 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="dark:text-indigo-400 text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                              d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                    </svg>
                    <h2 class="title-font font-medium text-3xl dark:text-white ext-gray-900">~ {pollCounter}</h2>
                    <p class="leading-relaxed">Created Polls</p>
                </div>
            </div>
            <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div class="border-2 dark:border-gray-800 border-gray-200 px-4 py-6 rounded-lg"
                     on:click={() => window.open("https://github.com/tetrisiq/poll-dapp","_blank")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         class="dark:text-indigo-400 text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                    </svg>
                    <h2 class="title-font font-medium text-3xl dark:text-white text-gray-900">{lastUpdate.fromNow()}</h2>
                    <p class="leading-relaxed">Last update</p>
                </div>
            </div>
            <!-- <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
                 <div class="border-2 dark:border-gray-800 border-gray-200 px-4 py-6 rounded-lg">
                     <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="dark:text-indigo-400 text-indigo-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                         <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                     </svg>
                     <h2 class="title-font font-medium text-3xl dark:text-white text-gray-900">46</h2>
                     <p class="leading-relaxed">Places</p>
                 </div>
             </div>-->
        </div>
    </div>
</section>