<script lang="ts">


import PoddleLogo from "./PoddleLogo.svelte";
</script>


<footer class="dark:text-gray-400 dark:bg-gray-700 bg-gray-300 text-gray-600 body-font {$$props.class}">
    <div class="container px-5 py-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <a class="flex title-font font-medium items-center md:justify-start justify-center dark:text-white text-gray-900">
                <PoddleLogo size="40"/>
                <span class="ml-3 text-xl">Poddle</span>
            </a>
            <p class="mt-2 text-sm text-gray-500">Meetings made simple!</p>
        </div>
        <div class="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
                <a href="https://github.com/TetrisIQ/poddle" target="_blank" class="title-font font-medium dark:text-white text-gray-900 tracking-widest text-sm mb-3">
                    GitHub <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="inline" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg></a>
                <nav class="list-none mb-10">
                    <li>
                        <a href="https://github.com/TetrisIQ/poddle/blob/main/CONTRIBUTING.md" target="_blank" class="dark:text-gray-400 dark:hover:text-white text-gray-600 hover:text-gray-800">How to
                            Contribute</a>
                    </li>
                    <li>
                        <a href="https://github.com/TetrisIQ/poddle/issues/new?assignees=&labels=bug,UI&template=bug_report.md&title=" target="_blank" class="dark:text-gray-400 dark:hover:text-white text-gray-600 hover:text-gray-800">Report a bug</a>
                    </li>
                    <li>
                        <a href="https://github.com/TetrisIQ/poddle/issues/new?assignees=&labels=UI&template=feature_request.md&title=" target="_blank" class="dark:text-gray-400 dark:hover:text-white text-gray-600 hover:text-gray-800">Submit a new Feature</a>
                    </li>
                </nav>
            </div>
            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2 class="title-font font-medium dark:text-white text-gray-900 tracking-widest text-sm mb-3">
                    Wiki's</h2>
                <nav class="list-none mb-10">
                    <li>
                        <a href="https://gun.eco" target="_blank" class="dark:text-gray-400 dark:hover:text-white text-gray-600 hover:text-gray-800">About
                            gun.js</a>
                    </li>
                    <li>
                        <a href="https://github.com/TetrisIQ/poddle/wiki" target="_blank" class="dark:text-gray-400 dark:hover:text-white text-gray-600 hover:text-gray-800">Docs</a>
                    </li>
                    <li>
                        <a href="https://github.com/TetrisIQ/poddle/discussions" target="_blank" class="dark:text-gray-400 dark:hover:text-white text-gray-600 hover:text-gray-800">Discussion</a>
                    </li>
                </nav>
            </div>
            <!-- <div class="lg:w-1/4 md:w-1/2 w-full px-4">
                 <h2 class="title-font font-medium dark:text-white text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
                 <nav class="list-none mb-10">
                     <li>
                         <a class="dark:text-gray-400 dark:hover:text-white text-gray-600 hover:text-gray-800">First Link</a>
                     </li>
                     <li>
                         <a class=" dark:text-gray-400 dark:hover:text-white text-gray-600 hover:text-gray-800">Second Link</a>
                     </li>
                     <li>
                         <a class="dark:text-gray-400 dark:hover:text-white text-gray-600 hover:text-gray-800">Third Link</a>
                     </li>
                     <li>
                         <a class=" dark:text-gray-400 dark:hover:text-white text-gray-600 hover:text-gray-800">Fourth Link</a>
                     </li>
                 </nav>
             </div>
             <div class="lg:w-1/4 md:w-1/2 w-full px-4">
                 <h2 class="title-font font-medium dark:text-white text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
                 <nav class="list-none mb-10">
                     <li>
                         <a class="dark:text-gray-400 dark:hover:text-white text-gray-600 hover:text-gray-800">First Link</a>
                     </li>
                     <li>
                         <a class="dark:text-gray-400 dark:hover:text-white text-gray-600 hover:text-gray-800">Second Link</a>
                     </li>
                     <li>
                         <a class="dark:text-gray-400 dark:hover:text-white text-gray-600 hover:text-gray-800">Third Link</a>
                     </li>
                     <li>
                         <a class="dark:text-gray-400 dark:hover:text-white text-gray-600 hover:text-gray-800">Fourth Link</a>
                     </li>
                 </nav>
             </div>
         </div>-->
        </div>
        <!--<div class="bg-gray-100">
            <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                <p class="text-gray-500 text-sm text-center sm:text-left">© 2020 Tailblocks —
                    <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" class="text-gray-600 ml-1" target="_blank">@knyttneve</a>
                </p>
                <span class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a class="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a class="ml-3 text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a class="ml-3 text-gray-500">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a class="ml-3 text-gray-500">
              <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
            </div>
        -->
    </div>
</footer>