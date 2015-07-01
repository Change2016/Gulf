function SetNextPageUrl(toPage,action) {
    var index = toPage +1;
    //window.location.href = action+"?index=" + index;
    window.location.href = action + "/page/" + index;
}

function SetPrevousPageUrl(fromPage,action) {
    var index = fromPage -1;
    //window.location.href = action+"?index=" + index;
    window.location.href = action + "/page/" + index;

}

//对象模式
function Pagination(hasPrevious, hasNext, currentPage, toPage, fromPage, action) {
    this.hasPrevious = hasPrevious;
    this.hasNext = hasNext;
    this.currentPage = currentPage;
    this.fromPage = fromPage;
    this.toPage = toPage;
    this.action = action;
}
Pagination.prototype = {
    constructor: Pagination,
    getPagination: function () {
        var dom = document.getElementById("pagination");
        if (dom == null) {
            return;
        }
        var htmls = "<ul class=\"pagination\" style=\"margin-top: 0px\">";
        //前一页
        if (this.hasPrevious == "True") {
            htmls += "<li><a id=\"Previous\" onclick=\"SetPrevousPageUrl("+this.fromPage+",'"+this.action+"');\" aria-label=\"Previous\"><span aria-hidden=\"false\">&laquo;</span></a></li>";
        }
        //中间页
        for (var i = parseInt(this.fromPage) ; i <= parseInt(this.toPage); i++) {
            //htmls += "<li><a href=\"" + this.action + "?index=" + i + "\">" + i + "</a></li>";
            if (i == this.currentPage) {
                htmls += "<li class=\"active\"><a href=\"" + this.action + "/page/" + i + "\">" + i + "</a></li>";
            } else {
                htmls += "<li><a href=\"" + this.action + "/page/" + i + "\">" + i + "</a></li>";//分页
            }
            
        }
        //下一页
        if (this.hasNext == "True") {
            htmls += "<li><a onclick=\"SetNextPageUrl("+this.toPage+",'"+this.action+"')\" id=\"Next\" aria-label=\"Next\"><span aria-hidden=\"true\">&raquo;</span></a></li>";
        }
        htmls += "</ul>";
        dom.innerHTML = htmls;
    }
}


//调用
//var pagination = new Pagination("@Model.HasPrevious", "@Model.HasNext", "@Model.ToPage", "@Model.FromPage", "/Admin/Departments");
//pagination.getPagination();


