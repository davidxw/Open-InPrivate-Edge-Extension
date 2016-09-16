function onLinkClick(info, tab) {
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));

  var url = info.linkUrl;

  openUrl(url);

}

function onPageClick(info, tab) {
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));

  var url = info.pageUrl;

  openUrl(url);
  
}

function openUrl(url)
{
    browser.windows.getAll(
        {"populate" : false},
        function (windows) {

            var targetWindow = undefined;

            for(iwindow in windows) {
                
                var window = windows[iwindow];

                if (window.incognito)
                {
                    targetWindow = window;
                    break;
                }
            }

            if (targetWindow == undefined)
            {
            // create new window
                browser.windows.create({"url":url, "inPrivate":true});
            }
            else
            {
                browser.tabs.create({"windowId":targetWindow.id, "url":url});
                browser.windows.update(targetWindow.id, {"focused":true});
            }
        }
        );
}

var title="Open in a new InPrivate window";

var id = browser.contextMenus.create({"title": title, "contexts":["link"],
                                       "onclick": onLinkClick});

var id2 = browser.contextMenus.create({"title": title, "contexts":["page"],
                                       "onclick": onPageClick});

console.log("'" + context + "' item:" + id);