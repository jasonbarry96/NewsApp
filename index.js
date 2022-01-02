// import algoliasearch from 'algoliasearch';
// import instantsearch from 'instantsearch.js';
// import hits from 'instantsearch.js/es/widgets';


const searchClient = algoliasearch('RM3X4H1SHX', '9876896af399671f15e0dc5498ee0c2c');
const search = instantsearch({
  indexName: 'current_news_datetime_desc',
  searchClient,
});

var hitTemplate = '<div onclick="window.open(`{{url}}`,`_blank`);" class="hit">' +
    '<div class="hit-left">' +
        '<div class="hit-photo"><img src="{{thumbnail_standard}}"></img></div>' +
    '</div>' +
    '<div class="hit-body">' +
        '<div class="hit-title">{{title}}</div>' +
        '<div class="hit-abstract">{{abstract}}</div>' +
    '</div>'+
    '</div>';

var firstHitTemplate = '<div onclick="window.open(`{{url}}`,`_blank`);" class="first-hit">' +
    '<div class="first-hit-body">' +
        '<div class="first-hit-title">{{title}}</div>' +
        '<div class="first-hit-abstract">{{abstract}}</div>' +
    '</div>'+
    '<div class="first-hit-photo">' +
        '<div><img src="{{fullImgURL}}"></img></div>' +
    '</div>' +
    '</div>';

search.addWidgets([
    instantsearch.widgets.index({indexName:"current_news_datetime_desc"}).addWidgets([
        instantsearch.widgets.hits({
            container: "#firstHit",
            templates: {item: firstHitTemplate,}
        }),
        instantsearch.widgets.configure({
            hitsPerPage: 1,
        }),
    ]),
    instantsearch.widgets.index({indexName:"current_news_datetime_desc"}).addWidgets([
        instantsearch.widgets.hits({
            container: "#hits",
            templates: {item: hitTemplate,}
        }),
        instantsearch.widgets.configure({
            offset: 1,
            length: 20,
        }),
    ]),
    instantsearch.widgets.menu({
        container: "#sections",
        attribute: "section",
        cssClasses: {
          list: 'refinementList',
        },
        templates: {
          item: `
            <a href="{{url}}" style="{{#isRefined}}font-weight: bold{{/isRefined}}">
              <span class="refinement">{{label}}</span>
            </a>
          `,
        },
        sortBy: ['count:desc', 'name:asc'],
    }),
]);

// search.addWidgets([
//     instantsearch.widgets.hits({
//         container: "#firstHit",
//         templates: {item: hitTemplate,},
//         transformItems(items){
//             return [items[0]];
//         }
//     }),
//     instantsearch.widgets.hits({
//         container: "#relHits",
//         templates: {item: hitTemplate,},
//         //  transformItems(items){
//         //     var test = items.length;
//         //     return items.slice(1,test);
//         // }
//     }),
// ]);

search.start();
