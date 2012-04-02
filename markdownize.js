function findFolders(node, folders) {
  if (node.children && node.children.length > 0) {
    folders.push(node);

    for (var i = 0; i < node.children.length; i++) {
      findFolders(node.children[i], folders);
    }
  }
}

function initElement() {
  chrome.bookmarks.getTree(function(nodes) {
    var folders = [], option = '';
    
    findFolders(nodes[0], folders);
    for (var i = 0; i < folders.length; i++) {
      option += '<option value="' + folders[i].id + '">' + folders[i].title + '</option>';
    }
    $('#folder').append(option);
  });
}

function initEvent() {
  $('#folder').change(function() {
    var id = $(this).val();

    chrome.bookmarks.getChildren(id, function(nodes) {
      var str = '<pre>';

      for (var i = 0; i < nodes.length; i++) {
        str += '* [' + nodes[i].title + '](' + nodes[i].url + ')\n';
      }
      str += '</pre>';
      $('#markdown').empty().append(str);
    });
  });
}

$(function() {
  initElement();
  initEvent();
});

