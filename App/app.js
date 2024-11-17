var apiURL = "https://api.github.com/users/";
var main = document.querySelector("#main");

// Function to fetch user data
var getUser = async (username) => {
    try {
        var response = await fetch(apiURL + username);
        if (!response.ok) throw new Error("User not found");
        var data = await response.json();

        var card = `
      <div class="card h-full p-4 flex flex-col items-center justify-center bg-gradient-to-r from-blue-800 via-gray-950 to-pink-800 ...">
        <form id="searchForm">
          <input
            class="p-2 rounded-lg outline-none text-white bg-gray-900 mb-4 border-red-500 w-72"
            type="text"
            id="search"
            autofocus
            placeholder="Search a Github User Here"
          />
        </form>

        <img
          class="w-40 h-40 p-1 mt-4 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
          src="${data.avatar_url}"
          alt="Avatar"
        />
<h1 class="text-white mt-7 font-bold ">Name: ${data.name}</h1>
<h1 class="text-white mt-7 text-center align-baseline">Bio: ${data.bio}</h1>

        <ul class="text-white flex space-x-20 mt-5">
          <li>Followers: ${data.followers}</li>
          <li>Following: ${data.following}</li>
          <li>Repositories: ${data.public_repos}</li>
        </ul>
      </div>
    `;
        main.innerHTML = card;

        // Attach search form event listener again
        document.querySelector("#searchForm").addEventListener("submit", (e) => {
            e.preventDefault();
            var username = document.querySelector("#search").value.trim();
            if (username) getUser(username);
        });
    } catch (error) {
        main.innerHTML = `<p class="text-red-500">Error: ${error.message}</p>`;
    }
};

// Call the function for the default user
getUser("rizwanjamal");
