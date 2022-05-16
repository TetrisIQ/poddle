<script lang="ts">
  import { users } from "../gun/User";

  let username;
  let password;
  let isLoggedIn = users.isLoggedIn();

  function login() {
    users.login(username, password);
    setTimeout(() => (isLoggedIn = users.isLoggedIn()), 1000); //this is not the best way but for now ok
  }

  function register() {
    users.register(username, password);
  }

  function logout() {
    users.logout();
    isLoggedIn = false;
  }

  function deleteAccount() {
    if (
      window.confirm(
        "Are you sure you want to delete this account? This cannot be undone."
      )
    ) {
      users.delete($username, $password);
    }
  }
</script>

{#if isLoggedIn}
  <div class="flex items-center justify-center">
    <div class="w-full max-w-md">
      <div
        class="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4"
      >
        Poddle User
      </div>
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-normal mb-2"
          for="username"
        >
          username
        </label>
        <p
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {$username}
        </p>
      </div>
      <div class="flex">
        <button
          on:click={() => logout()}
          class="px-4 py-2 rounded inline-block dark:bg-gray-800 bg-gray-100 border-0 py-1 px-3 focus:outline-none dark:hover:bg-gray-700 hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          type="button"
          >Logout
        </button>
        <button
          on:click={() => deleteAccount()}
          class="text-red-600 ml-auto inline-flex items-center dark:bg-gray-800 bg-gray-100 border-0 py-1 px-3 focus:outline-none dark:hover:bg-gray-700 hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="mr-2"
            viewBox="0 0 16 16"
          >
            <path
              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
            />
            <path
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
          Delete Account
        </button>
      </div>
    </div>
  </div>
{:else}
  <div class="flex items-center justify-center">
    <div class="w-full max-w-md">
      <div class="">
        <ul class="">
          <li class="p-2">
            Login to sync MyPolls and your settings across different browsers.
          </li>
          <li class="p-2">
            You don't need an Email address for your account so you cannot reset
            your password if you lose it. There is no way you can restore it.
          </li>
          <li class="p-2">Choose whistle!</li>
          <li class="p-2">
            User Accounts are still in development any feedback is welcome!
          </li>
        </ul>
      </div>
      <form
        on:submit|preventDefault={login}
        class="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
      >
        <div
          class="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4"
        >
          Poddle Login
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-normal mb-2"
            for="username"
          >
            username
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="username"
            type="text"
            id="username"
            required
            placeholder="username"
            bind:value={username}
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-normal mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            required
            bind:value={password}
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="px-4 py-2 rounded text-white inline-block shadow-lg bg-indigo-500 hover:bg-blue-600 focus:bg-blue-700"
            type="submit"
            >Sign In
          </button>
          <button
            on:click={() => register()}
            class="px-4 py-2 rounded inline-block dark:bg-gray-800 bg-gray-100 border-0 py-1 px-3 focus:outline-none dark:hover:bg-gray-700 hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            type="button"
            >Register
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
