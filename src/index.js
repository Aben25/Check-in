const indexName = "artba_fly_in";

const search = instantsearch({
  indexName,
  searchClient: algoliasearch("SWSFY6ZO07", "286c1017af1002e899ded37866d02198"),
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: "#searchbox",
    placeholder: "Search for your name or email...",
  }),
  instantsearch.widgets.refinementList({
    container: "#brand-list",
    attribute: "CompanyName",
  }),
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      item: (hit, bindEvent) => {
        const productURL =
          "product.html?AttendeeUniqueID=" +
          hit.AttendeeUniqueID +
          "&FullName=" +
          hit.FullName +
          "&CompanyName=" +
          hit.CompanyName +
          "&Attended=" +
          hit.Attended +
          "&Email=" +
          hit.Email;

        return `
          <a class="hit-card" href="${productURL}" ${bindEvent(
          "click",
          hit,
          "Search Result Clicked"
        )}>
            <div class="hit-content">
              <div class=""><strong>${hit.FullName}</strong></div>
              <hr style="width:50%", size="1", color=black>  
              <div class="">${hit.CompanyName}</div>
              <div class="hit-name">${hit._highlightResult.Email.value}</div>

            </div>
          </a>
        `;
      },
    },
  }),
  instantsearch.widgets.pagination({
    container: "#pagination",
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 6,
  })
]);

search.start();
